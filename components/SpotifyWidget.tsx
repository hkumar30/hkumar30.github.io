'use client';

import { SpotifyTrack } from '@/lib/spotify';
import Image from 'next/image';

interface SpotifyWidgetProps {
  track: SpotifyTrack | null;
}

export default function SpotifyWidget({ track }: SpotifyWidgetProps) {
  const isPlaying = Boolean(track?.isPlaying);

  return (
    <div className="spotify-frame">
    <div
      className="spotify-card"
      data-playing={isPlaying ? 'true' : 'false'}
      data-empty={track ? 'false' : 'true'}
    >
      <div className="spotify-card-main">
        {/* Disc: vinyl record peeking from behind the cover */}
        <div className="spotify-card-disc">
          <span className="spotify-card-vinyl" aria-hidden="true">
            <span className="spotify-card-vinyl-label" />
          </span>
          <div className="spotify-card-cover">
            {track?.albumArt ? (
              <Image
                src={track.albumArt}
                alt={`${track.album} cover`}
                width={96}
                height={96}
                unoptimized
                className="spotify-card-image"
              />
            ) : (
              <span className="spotify-card-cover-empty" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* Track metadata */}
        <div className="spotify-card-body">
          <div className="spotify-card-status">
            <span className="spotify-card-eq" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
            <span className="spotify-card-status-text">
              {track ? (isPlaying ? 'Now playing' : 'Recently played') : 'Silence is golden'}
            </span>
          </div>

          {track ? (
            <>
              <p className="spotify-card-title" title={track.name}>
                {track.name}
              </p>
              <p className="spotify-card-artist" title={track.artist}>
                {track.artist}
              </p>
            </>
          ) : (
            <p className="spotify-card-artist spotify-card-artist--muted">
              Debugging requires silence.
            </p>
          )}
        </div>
      </div>

      {/* Spotify attribution / CTA */}
      <a
        href={track ? `https://open.spotify.com/track/${track.id}` : 'https://open.spotify.com'}
        target="_blank"
        rel="noopener noreferrer"
        className="spotify-card-cta"
        aria-label={track ? `Open ${track.name} on Spotify` : 'Open Spotify'}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="spotify-card-logo" aria-hidden="true">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <span className="spotify-card-cta-text">
          {track ? 'Open Spotify' : 'Get Spotify'}
        </span>
        <span className="spotify-card-cta-arrow" aria-hidden="true">&rarr;</span>
      </a>
    </div>
    </div>
  );
}
