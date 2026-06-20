'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { profile, socialLinks } from '@/data/profile';

export default function HomeFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="home-footer-closing" data-cursor-accent="--signature-blue" aria-label="Footer">
      <span className="section-marker is-right">अंत</span>
      
      <div className="footer-closing-content">
        <motion.blockquote 
          className="footer-quote"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>&ldquo;I care more about how things break than how they look in the demo.&rdquo;</p>
          <cite>— from the monologue you just read</cite>
        </motion.blockquote>
        
        <div className="footer-meta">
          <div className="footer-location">
            <span className="footer-label">Currently in</span>
            <span className="footer-value">{profile.currently.building.split(' at ')[1] || 'Redmond, WA'}</span>
          </div>
          
          <div className="footer-time">
            <span className="footer-label">Local time</span>
            <span className="footer-value">PST (UTC-8)</span>
          </div>
        </div>
        
        <div className="footer-links">
          {socialLinks.map((link) => (
            <Link 
              key={link.label}
              href={link.href}
              className="footer-link-box"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="footer-link-label">{link.label}</span>
              <span className="footer-link-arrow">→</span>
            </Link>
          ))}
          <Link href={profile.resumeHref} className="footer-link-box">
            <span className="footer-link-label">Resume</span>
            <span className="footer-link-arrow">↓</span>
          </Link>
        </div>
      </div>
      
      <div className="footer-copyright">
        <p>© {currentYear} {profile.name}. All rights reserved.</p>
        <p className="footer-credits">
          Designed with <span className="footer-heart">♥</span> and a lot of coffee.
        </p>
      </div>
    </footer>
  );
}
