'use client';

import { motion } from 'framer-motion';
import type { WorkExperienceItem } from '@/data/types';

type ExperienceTimelineProps = {
  items: WorkExperienceItem[];
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <div className="experience-list">
      {items.map((item, i) => (
        <motion.article
          key={item.id}
          className="experience-item"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: i * 0.07, ease }}
        >
          <div className="experience-body">
            <h2 className="experience-role">{item.role}</h2>
            <p className="experience-meta-row">
              <span className="experience-company">{item.company}</span>
              <span className="experience-sep">—</span>
              <span className="timeline-meta">{item.period}</span>
              <span className="experience-sep">·</span>
              <span className="timeline-meta">{item.location}</span>
            </p>
            <ul className="timeline-highlights">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
