import { skillRows } from '@/data/skills';

type MarqueeProps = {
  className?: string;
};

export default function Marquee({ className = '' }: MarqueeProps) {
  return (
    <section className={`skill-marquee ${className}`.trim()} aria-label="Technology skills">
      {skillRows.map((row) => (
        <div key={row.id} className="marquee-row paper-panel layout-rule">
          <div className={`marquee-track ${row.direction === 'right' ? 'reverse' : ''}`}>
            {[...row.skills, ...row.skills].map((skill, index) => (
              <span key={`${row.id}-${skill}-${index}`} className="marquee-skill">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
