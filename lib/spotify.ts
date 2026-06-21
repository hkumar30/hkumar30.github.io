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
    const missing = [];
    if (!clientId) missing.push('SPOTIFY_CLIENT_ID');
    if (!clientSecret) missing.push('SPOTIFY_CLIENT_SECRET');
    if (!refreshToken) missing.push('SPOTIFY_REFRESH_TOKEN');

    console.warn(
      `[Spotify] Credentials missing: ${missing.join(', ')}\n` +
      `To fix this:\n` +
      `1. Local dev: Add to .env.local (see .env.example)\n` +
      `2. Production: Add to GitHub Secrets (Settings > Secrets and variables > Actions)\n`
    );
    return null;
  }

  try {
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
      const errorText = await response.text();
      console.error('[Spotify] Token fetch failed:', errorText);

      // Check for specific error types
      if (errorText.includes('invalid_grant')) {
        console.error(
          '[Spotify] Your refresh token has expired or been revoked.\n' +
          'To fix: Run `node scripts/refresh-spotify-token.mjs` locally to get a new token,\n' +
          'then update SPOTIFY_REFRESH_TOKEN in your .env.local and GitHub Secrets.'
        );
      }
      return null;
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    // Network errors (e.g., in sandboxed environments) will gracefully fail
    // and the component will show the fallback "Recently enjoyed" state
    console.error('[Spotify] Network error fetching token:', error);
    return null;
  }
}

export async function getCurrentTrack(): Promise<SpotifyTrack | null> {
  try {
    const token = await getToken();

    if (!token) {
      // Credentials not configured - return null to trigger fallback
      return null;
    }

    // Try currently playing first
    console.log('[Spotify] Fetching currently playing track...');
    const nowPlaying = await fetch(SPOTIFY_NOW_PLAYING_URL, {
      headers: { 'Authorization': `Bearer ${token}` },
      next: { revalidate: 60 }, // Check every minute
    });

    if (nowPlaying.status === 200) {
      const data = await nowPlaying.json();
      if (data?.item) {
        console.log(`[Spotify] Now playing: ${data.item.name} by ${data.item.artists[0]?.name}`);
        return {
          id: data.item.id,
          name: data.item.name,
          artist: data.item.artists.map((a: { name: string }) => a.name).join(', '),
          album: data.item.album.name,
          albumArt: data.item.album.images[0]?.url || '',
          isPlaying: data.is_playing,
        };
      }
    } else if (nowPlaying.status === 204) {
      console.log('[Spotify] Nothing currently playing, checking recently played...');
    } else if (nowPlaying.status === 401) {
      console.error('[Spotify] Authentication expired. Token needs refresh.');
      return null;
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
        console.log(`[Spotify] Recently played: ${track.name} by ${track.artists[0]?.name}`);
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

    console.log('[Spotify] No tracks found');
    return null;
  } catch (error) {
    // Network errors (e.g., in sandboxed environments) will gracefully fail
    // and the component will show the fallback "Recently enjoyed" state
    console.error('[Spotify] Error fetching track:', error);
    return null;
  }
}

// Test function to verify Spotify setup
export async function testSpotifyConnection(): Promise<{ success: boolean; message: string }> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    const missing = [];
    if (!clientId) missing.push('SPOTIFY_CLIENT_ID');
    if (!clientSecret) missing.push('SPOTIFY_CLIENT_SECRET');
    if (!refreshToken) missing.push('SPOTIFY_REFRESH_TOKEN');
    
    return {
      success: false,
      message: `Missing credentials: ${missing.join(', ')}`,
    };
  }

  try {
    const token = await getToken();
    if (!token) {
      return {
        success: false,
        message: 'Failed to get access token. Check your credentials.',
      };
    }

    const track = await getCurrentTrack();
    if (track) {
      return {
        success: true,
        message: `Connected! Found: "${track.name}" by ${track.artist}`,
      };
    }

    return {
      success: true,
      message: 'Connected but no recent tracks found. Try playing something on Spotify.',
    };
  } catch (error) {
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
