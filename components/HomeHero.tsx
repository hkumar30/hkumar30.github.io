'use client';

import Image from 'next/image';
import { profile } from '@/data/profile';

export default function HomeHero() {
  return (
    <section className="home-hero-raw" aria-label="Introduction">
      <div className="home-portrait-wrap-raw">
        <Image
          src={profile.heroImage}
          alt="Harsh Kumar portrait"
          width={900}
          height={1200}
          priority
          className="home-portrait-image"
        />
      </div>
      <h1 className="display-title home-hero-name-raw signature-ink">{profile.name}</h1>
    </section>
  );
}
