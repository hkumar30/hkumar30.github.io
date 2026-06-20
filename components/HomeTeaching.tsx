'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Suspense } from 'react';
import SpotifyNowPlaying from './SpotifyNowPlaying';

const teachingItems = [
  {
    role: 'Section Leader',
    organization: 'Stanford Code in Place',
    period: '2023 — 2024',
    description:
      'Led weekly sections for 30+ students learning Python. Focus on debugging mindset and code readability.',
    image: '/images/teaching-placeholder-1.jpg',
    hindi: 'वर्ग अग्रणी',
  },
  {
    role: 'Workshop Instructor',
    organization: 'Internal & Community',
    period: '2022 — Present',
    description:
      'Hands-on sessions on production RAG systems, vector database design, and AI infrastructure.',
    image: '/images/teaching-placeholder-2.jpg',
    hindi: 'कार्यशाला प्रशिक्षक',
  },
];

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
          <p className="home-teaching-intro">
            <span className="teaching-strike">Not a professor.</span> Just someone 
            who learns better by <em>explaining</em> things.{' '}
            <strong>Section leading</strong> at Stanford, running{' '}
            <strong>workshops</strong> on systems I&apos;ve actually shipped.
          </p>
        </div>

        {/* Teaching Items — Boxed Style */}
        <div className="teaching-items">
          {teachingItems.map((item, index) => (
            <motion.article
              key={item.role}
              className="teaching-box"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="teaching-box-image">
                <Image
                  src={item.image}
                  alt={`${item.role} at ${item.organization}`}
                  fill
                  className="teaching-image"
                />
                <span className="teaching-image-hindi">{item.hindi}</span>
              </div>
              
              <div className="teaching-box-content">
                <div className="teaching-box-meta">
                  <span className="teaching-period">{item.period}</span>
                  <h3 className="teaching-role">{item.role}</h3>
                </div>
                <p className="teaching-org">{item.organization}</p>
                <p className="teaching-desc">{item.description}</p>
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
          
          <Suspense fallback={
            <div className="spotify-box">
              <p className="spotify-muted">Loading playlist...</p>
            </div>
          }>
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
