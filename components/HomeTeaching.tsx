'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Suspense } from 'react';
import SpotifyNowPlaying from './SpotifyNowPlaying';
import { teachingIntro, teachingItems } from '@/data/teaching';

export default function HomeTeaching() {
  return (
    <section
      className="home-teaching"
      data-cursor-accent="--home-accent"
      aria-label="Teaching"
    >
      <span className="section-marker is-left">शिक्षण</span>

      <div className="home-teaching-content">
        {/* Header */}
        <div className="home-teaching-header">
          <p className="home-teaching-kicker">I teach</p>
          <p className="home-teaching-intro">{teachingIntro}</p>
        </div>

        {/* Teaching Items — Cartesian Grid Cards */}
        <div className="teaching-grid">
          {teachingItems.map((item, index) => (
            <motion.article
              key={item.role}
              className="teaching-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Logo at top */}
              <div className="teaching-card-logo">
                <Image
                  src={item.logo}
                  alt={item.logoAlt}
                  width={120}
                  height={120}
                  className="teaching-logo-image"
                />
              </div>

              {/* Text content in middle */}
              <div className="teaching-card-content">
                <div className="teaching-card-meta">
                  <span className="teaching-period">{item.period}</span>
                  <h3 className="teaching-role">{item.role}</h3>
                </div>
                <p className="teaching-org">{item.organization}</p>
                <p className="teaching-desc">{item.description}</p>
              </div>

              {/* Screenshot below */}
              <div className="teaching-card-screenshot">
                <Image
                  src={item.screenshot}
                  alt={item.screenshotAlt}
                  width={400}
                  height={225}
                  className="teaching-screenshot-image"
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Spotify + Closing */}
        <div className="teaching-closing">
          <p className="teaching-closing-text">
            <span className="teaching-asterisk">*</span> When not debugging,
            probably listening to:
          </p>

          <Suspense
            fallback={
              <div className="spotify-box">
                <p className="spotify-muted">Loading playlist...</p>
              </div>
            }
          >
            <SpotifyNowPlaying />
          </Suspense>

          <p className="teaching-footnote">
            <span className="teaching-asterisk">**</span> Or silence.
            Debugging requires silence.
          </p>
        </div>
      </div>
    </section>
  );
}
