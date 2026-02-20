import { useState, useCallback } from 'react';
import NameAnimation from '../components/NameAnimation';
import TitleCycle from '../components/TitleCycle';
import SocialLinks from '../components/SocialLinks';
import RoughButton from '../components/RoughButton';
import { RoughLine } from '../components/RoughBox';
import { DoodleLightbulb, DoodleArrow, DoodlePaperclip } from '../components/Doodles';
import './HomePage.css';

export default function HomePage() {
  const [nameComplete, setNameComplete] = useState(
    () => sessionStorage.getItem('hk-name-animated') === '1',
  );

  const handleNameComplete = useCallback(() => {
    setNameComplete(true);
  }, []);

  return (
    <div className="home-page">
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-doodle-left">
          <DoodleArrow direction="right" size={20} />
        </div>

        <NameAnimation onComplete={handleNameComplete} />
        <TitleCycle active={nameComplete} />

        <div className="hero-social">
          <SocialLinks />
        </div>
      </section>

      <RoughLine seed={7} />

      {/* ── About ── */}
      <section className="about-section">
        <div className="about-grid">
          <div className="about-photo-wrapper">
            <div className="about-photo-frame">
              <div className="photo-tape top-left" />
              <div className="photo-tape top-right" />
              <img
                src="/images/profile.jpg"
                alt="Harsh Kumar"
                className="about-photo"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'flex';
                }}
              />
              <div className="about-photo-placeholder" style={{ display: 'none' }}>
                <span>📷</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--pencil)' }}>Photo goes here</span>
              </div>
            </div>
          </div>

          <div className="about-content">
            <div className="about-doodle">
              <DoodleLightbulb size={24} />
            </div>
            <p className="about-bio">
              My journey as a developer began at age five — tinkering with old computers,
              installing drivers, and editing configuration files to make games work on my
              &quot;potato&quot; PC. I fell in love with customization and, by ten, was already
              dreaming of building my own games.
            </p>
            <p className="about-bio">
              That curiosity became a passion for programming. Today, I build modern web apps,
              specialize in backend engineering, and love diving into the theoretical side of
              computer science. Solving algorithmic problems, optimizing code, and exploring
              proofs and complexities are what keep me up at night.
            </p>

            <div className="about-role">
              <span>AI Engineer at </span>
              <img
                src="/images/mindspark-logo.png"
                alt="Mindspark"
                className="mindspark-logo"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="mindspark-text">Mindspark</span>
            </div>

            <div className="about-resume">
              <DoodlePaperclip size={28} style={{ marginRight: 4, flexShrink: 0 }} />
              <RoughButton
                href="/Harsh-Kumar-Resume.pdf"
                target="_blank"
                seed={11}
                style={{ fontSize: '0.95rem' }}
              >
                Download Resume
              </RoughButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
