import { getCurrentTrack } from '@/lib/spotify';
import Image from 'next/image';

export default async function SpotifyNowPlaying() {
  const track = await getCurrentTrack();
  
  if (!track) {
    return (
      <div className="spotify-box">
        <div className="spotify-artwork" style={{ background: '#f0f0f0' }} />
        <div className="spotify-info">
          <p className="spotify-muted">Silence is golden (or Spotify API is napping)</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="spotify-box">
      {track.albumArt && (
        <div className="spotify-artwork">
          <Image 
            src={track.albumArt} 
            alt={`${track.album} cover`}
            width={56}
            height={56}
          />
          {track.isPlaying && <span className="spotify-playing-indicator" />}
        </div>
      )}
      <div className="spotify-info">
        <p className="spotify-label">
          {track.isPlaying ? 'Currently playing' : 'Recently played'}
        </p>
        <p className="spotify-track" title={track.name}>{track.name}</p>
        <p className="spotify-artist" title={track.artist}>{track.artist}</p>
      </div>
    </div>
  );
}
