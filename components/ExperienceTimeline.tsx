import Image from 'next/image';
import type { WorkExperienceItem } from '@/data/types';

type ExperienceTimelineProps = {
  items: WorkExperienceItem[];
};

export default function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <div className="experience-list">
      {items.map((item) => (
        <article key={item.id} className="experience-item">
          <div className="experience-logo-wrap">
            <Image
              src={item.companyLogo}
              alt={`${item.company} logo`}
              width={64}
              height={64}
              className="experience-logo"
            />
          </div>
          <div className="experience-body">
            <h2 className="experience-role font-garamond">{item.role}</h2>
            <p className="experience-company">{item.company}</p>
            <p className="timeline-meta">
              {item.period} — {item.location}
            </p>
            <ul className="timeline-highlights">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
