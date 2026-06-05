'use client';

import { profile } from '@/data/profile';
import { motion } from 'framer-motion';

export default function MusicWidget() {
  const { currentTrack } = profile;

  return (
    <motion.section 
      className="music-widget-brutalist"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Currently Listening"
    >
      <div className="music-row">
        <div className="music-status">
          <div className="music-indicator"></div>
          <span className="music-label">Playing</span>
        </div>
        
        <div className="music-track-info">
          <h3 className="music-title">{currentTrack.title}</h3>
          <span className="music-artist">{currentTrack.artist}</span>
        </div>

        <div className="music-progress-container">
          <span className="music-time">01:24</span>
          <div className="music-progress-bar">
            <div className="music-progress-fill"></div>
          </div>
          <span className="music-time">-03:06</span>
        </div>
      </div>
    </motion.section>
  );
}
