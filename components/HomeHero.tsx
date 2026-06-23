'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { profile } from '@/data/profile';
import PhoenixDateTime from '@/components/PhoenixDateTime';
import CompactNav from '@/components/CompactNav';
import { heroContent, navItems } from '@/data/siteContent';

// Letter animation component
function AnimatedName({ text, prefersReducedMotion, delay = 0 }: { 
  text: string; 
  prefersReducedMotion: boolean | null;
  delay?: number;
}) {
  const letters = text.toUpperCase().split('');
  
  return (
    <motion.span className="home-hero-name-letters">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="home-hero-name-letter"
          initial={prefersReducedMotion ? false : { 
            opacity: 0, 
            y: 50,
            scale: 0.5 
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1 
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + (index * 0.04),
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const [firstName, lastName = ''] = profile.name.split(' ');

  return (
    <section
      ref={sectionRef}
      className="home-hero-split"
      aria-label="Introduction hero"
    >
      <div className="home-hero-left">
        <div className="home-hero-heading-wrap">
          <h1 className="home-hero-name" aria-label={profile.name}>
            <AnimatedName 
              text={firstName} 
              prefersReducedMotion={prefersReducedMotion} 
              delay={0.1}
            />
          </h1>

          <h1 className="home-hero-name" aria-hidden="true">
            <AnimatedName 
              text={lastName} 
              prefersReducedMotion={prefersReducedMotion}
              delay={0.3}
            />
          </h1>

          <p className="home-hero-intro is-sr-only">{heroContent.intro}</p>
        </div>

        <nav className="home-hero-index-nav" aria-label="Primary navigation">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="home-hero-index-link"
              aria-label={item.label}
            >
              <span className="home-hero-index-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="home-hero-index-label">{item.label}</span>
              <span className="home-hero-index-hi font-hindi" lang="hi">
                {item.labelHi}
              </span>
              <span className="home-hero-index-arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          ))}
        </nav>

        <CompactNav />

        {/* <div className="home-hero-meta-boxed">
          <p className="home-hero-tagline">
            Systems that ship reliably, fail gracefully
          </p>
        </div> */}

        <p className="home-hero-meta">
          <span>{heroContent.location.toUpperCase()}</span>
          <PhoenixDateTime />
        </p>
      </div>

      <motion.div
        className="home-hero-right"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="home-hero-image-motion"
          style={prefersReducedMotion ? undefined : { y: imageY }}
        >
          <Image
            src={profile.heroImage}
            alt="Harsh Kumar portrait"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className={`home-hero-image ${imageLoaded ? 'is-loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
