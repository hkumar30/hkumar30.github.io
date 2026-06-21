'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { profile, socialLinks } from '@/data/profile';

const footerIcons: Record<string, JSX.Element> = {
  GitHub: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  Resume: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  ),
  Link: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
};

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
        
        <div className="footer-links">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="footer-link-box"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              <span className="footer-link-icon" aria-hidden="true">
                {footerIcons[link.label] ?? footerIcons.Link}
              </span>
              <span className="footer-link-label">{link.label}</span>
            </Link>
          ))}
          <Link href={profile.resumeHref} className="footer-link-box" aria-label="Resume">
            <span className="footer-link-icon" aria-hidden="true">{footerIcons.Resume}</span>
            <span className="footer-link-label">Resume</span>
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
