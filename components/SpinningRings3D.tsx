'use client';

import type { CSSProperties } from 'react';

type RibbonSpec = {
  className: string;
  phrase: string;
  minCharacters: number;
};

type LetterStyle = CSSProperties & {
  '--angle': string;
};

const RIBBONS: RibbonSpec[] = [
  {
    className: 'spinning-rings-band-dev',
    phrase: 'HARSHK.DEV',
    minCharacters: 76,
  },
  {
    className: 'spinning-rings-band-rag',
    phrase: 'RAG SYSTEMS',
    minCharacters: 76,
  },
];

function buildRibbonCharacters(phrase: string, minCharacters: number) {
  const segment = `${phrase} \u2022 `;
  const repeatCount = Math.ceil(minCharacters / segment.length);

  return Array.from(segment.repeat(repeatCount));
}

export default function SpinningRings3D() {
  return (
    <section
      className="spinning-rings"
      aria-label="Rotating text rings reading HarshK dot dev and RAG Systems"
    >
      <span className="spinning-rings-sr">HARSHK.DEV. RAG SYSTEMS.</span>

      <div className="spinning-rings-stage" aria-hidden="true">
        {RIBBONS.map((ribbon) => {
          const letters = buildRibbonCharacters(
            ribbon.phrase,
            ribbon.minCharacters,
          );

          return (
            <div
              key={ribbon.phrase}
              className={`spinning-rings-band ${ribbon.className}`}
            >
              <div className="spinning-rings-track">
                {letters.map((letter, index) => {
                  const angle = `${(360 / letters.length) * index}deg`;

                  return (
                    <span
                      key={`${ribbon.phrase}-${index}`}
                      className="spinning-rings-letter"
                      style={{ '--angle': angle } as LetterStyle}
                    >
                      {letter === ' ' ? '\u00a0' : letter}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="spinning-rings-static" aria-hidden="true">
        <span className="spinning-rings-static-row spinning-rings-static-dev">
          HARSHK.DEV
        </span>
        <span className="spinning-rings-static-row spinning-rings-static-rag">
          RAG SYSTEMS
        </span>
      </div>
    </section>
  );
}
