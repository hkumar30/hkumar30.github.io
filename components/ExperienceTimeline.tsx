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
          <span className="experience-number">{String(i + 1).padStart(2, '0')}</span>
          <div className="experience-body">
            <h2 className="experience-company-name">{item.company}</h2>
            <p className="experience-role-row">
              <span>{item.role}</span>
              <span className="experience-sep">·</span>
              <span>{item.location}</span>
              <span className="experience-sep">·</span>
              <span>{item.period}</span>
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
