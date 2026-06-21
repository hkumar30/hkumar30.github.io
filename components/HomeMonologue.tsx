'use client';

import { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function HomeMonologue() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="home-monologue"
      aria-label="About"
    >
      <div className="home-monologue-copy">
        {/* Opening with asterisk */}
        <p className="home-monologue-block">
          According to <span className="home-monologue-strong">official records</span>
          <span className="home-monologue-asterisk">*</span>, I am a
          software engineer based in Redmond, WA.
        </p>

        {/* Identity with strikethrough */}
        <p className="home-monologue-block">
          <span className="home-monologue-strike">Just another</span> Not your typical{' '}
          <span className="home-monologue-strong">backend developer</span>.
        </p>

        {/* Expertise list */}
        <div className="home-monologue-block">
          Known to colleagues for:
          <ul className="home-monologue-list">
            <li className="home-monologue-list-item">
              <span className="home-monologue-strong">production RAG systems</span>
              <span className="home-monologue-list-note">that actually work</span>
            </li>
            <li className="home-monologue-list-item">
              <span className="home-monologue-strong">fault-tolerant architecture</span>
              <span className="home-monologue-list-note">because failures happen</span>
            </li>
            <li className="home-monologue-list-item">
              <span className="home-monologue-strong">thinking in systems</span>
              <span className="home-monologue-list-note">not just code</span>
            </li>
          </ul>
        </div>

        {/* Philosophy with footnote */}
        <p className="home-monologue-block">
          I care more about how things break than how they look in the demo
          <span className="home-monologue-asterisk">*</span>.
        </p>
        <p className="home-monologue-footnote">
          * Yes, this is true.
        </p>

        {/* Closing */}
        <p className="home-monologue-block home-monologue-closing">
          Currently accepting <span className="home-monologue-strong">interesting problems</span>{' '}
          and strong coffee.
        </p>
      </div>
    </section>
  );
}
