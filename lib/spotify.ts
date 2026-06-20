const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const SPOTIFY_RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  isPlaying: boolean;
  playedAt?: string;
}

async function getToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    console.warn('Spotify credentials not configured - skipping track fetch');
    return null;
  }
  
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    next: { revalidate: 3300 }, // Token lasts 3600s, refresh at 3300s
  });
  
  if (!response.ok) {
    console.error('Token fetch failed:', await response.text());
    return null;
  }
  const data = await response.json();
  return data.access_token;
}

export async function getCurrentTrack(): Promise<SpotifyTrack | null> {
  try {
    const token = await getToken();

    if (!token) {
      // Credentials not configured - return null silently
      return null;
    }

    // Try currently playing
    const nowPlaying = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: { 'Authorization': `Bearer ${token}` },
      next: { revalidate: 60 }, // Check every minute
    });
    
    if (nowPlaying.status === 200) {
      const data = await nowPlaying.json();
      if (data?.item) {
        return {
          id: data.item.id,
          name: data.item.name,
          artist: data.item.artists.map((a: { name: string }) => a.name).join(', '),
          album: data.item.album.name,
          albumArt: data.item.album.images[0]?.url || '',
          isPlaying: data.is_playing,
        };
      }
    }
    
    // Fall back to recently played
    const recent = await fetch(SPOTIFY_RECENT_URL, {
      headers: { 'Authorization': `Bearer ${token}` },
      next: { revalidate: 300 }, // Cache recent for 5 minutes
    });
    
    if (recent.ok) {
      const data = await recent.json();
      if (data.items?.[0]) {
        const track = data.items[0].track;
        return {
          id: track.id,
          name: track.name,
          artist: track.artists.map((a: { name: string }) => a.name).join(', '),
          album: track.album.name,
          albumArt: track.album.images[0]?.url || '',
          isPlaying: false,
          playedAt: data.items[0].played_at,
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Spotify error:', error);
    return null;
  }
}
