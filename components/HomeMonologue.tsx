'use client';

import { useEffect, useRef } from 'react';
import { monologue } from '@/data/monologue';
import { createNewsprintTexture } from '@/lib/newsprintTexture';

export default function HomeMonologue() {
  const sectionRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let textureUrl: string | null = null;
    let cancelled = false;

    createNewsprintTexture().then((url) => {
      if (!url) return;
      if (cancelled) {
        URL.revokeObjectURL(url);
        return;
      }
      textureUrl = url;
      storyRef.current?.style.setProperty('--mono-newsprint-texture', `url(${url})`);
    });

    return () => {
      cancelled = true;
      if (textureUrl) URL.revokeObjectURL(textureUrl);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="home-monologue"
      aria-label="About"
    >
      <div className="home-monologue-frame">
        <div className="home-monologue-copy">
          <p className="home-monologue-block home-monologue-intro">
            {monologue.intro}{' '}
            <span className="home-monologue-strong">{monologue.introHighlight}</span>
            {monologue.introSuffix}
          </p>

          <p ref={storyRef} className="home-monologue-block home-monologue-story">
            {monologue.story}
          </p>

          <div className="home-monologue-block">
            <p className="home-monologue-list-lead">{monologue.listLead}</p>
            <ul className="home-monologue-list">
              {monologue.items.map((item) => (
                <li key={item} className="home-monologue-list-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="home-monologue-block home-monologue-closing">
            {monologue.closing}{' '}
            <span className="home-monologue-strong">
              {monologue.closingHighlight}
            </span>
            {monologue.closingSuffix}
          </p>
        </div>
      </div>
    </section>
  );
}
