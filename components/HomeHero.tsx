'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { profile } from '@/data/profile';
import PhoenixDateTime from '@/components/PhoenixDateTime';
import { heroContent } from '@/data/siteContent';

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
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
            className="home-hero-image"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
