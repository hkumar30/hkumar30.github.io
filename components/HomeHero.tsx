'use client';

import Image from 'next/image';
import { profile } from '@/data/profile';
import PhoenixDateTime from '@/components/PhoenixDateTime';
import { heroContent } from '@/data/siteContent';

export default function HomeHero() {
  const [firstName, lastName = ''] = profile.name.split(' ');

  return (
    <section className="home-hero-split" aria-label="Introduction hero">
      <div className="home-hero-left">
        <div className="home-hero-heading-wrap">
          <h1 className="home-hero-name" aria-label={profile.name}>
            <span>{firstName.toUpperCase()}</span>
            <span>{lastName.toUpperCase()}</span>
          </h1>
          <p className="home-hero-intro">{heroContent.intro}</p>
        </div>

        <p className="home-hero-meta">
          <span>{heroContent.location.toUpperCase()}</span>
          <PhoenixDateTime />
        </p>
      </div>

      <div className="home-hero-right">
        <Image
          src={profile.heroImage}
          alt="Harsh Kumar portrait"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="home-hero-image"
        />
      </div>
    </section>
  );
}
