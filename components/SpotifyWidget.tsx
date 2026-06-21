'use client';

import { SpotifyTrack } from '@/lib/spotify';
import Image from 'next/image';

interface SpotifyWidgetProps {
  track: SpotifyTrack | null;
}

export default function SpotifyWidget({ track }: SpotifyWidgetProps) {
  if (!track) {
    return (
      <div className="spotify-box">
        <div className="spotify-artwork" style={{ background: '#f0f0f0' }} />
        <div className="spotify-info">
          <p className="spotify-muted">Silence is golden</p>
          <p className="spotify-muted" style={{ fontSize: '0.75rem' }}>
            (Last checked: {new Date().toLocaleTimeString()})
          </p>
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
            unoptimized
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
        <p className="spotify-muted" style={{ fontSize: '0.65rem', marginTop: '0.25rem' }}>
          Updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
