import { skillRows } from '../data/skills';
import SkillIcon from './SkillIcons';
import './SkillMarquee.css';

function SkillPill({ skill }) {
  return (
    <span className="skill-pill" aria-label={skill}>
      <SkillIcon name={skill} />
      <span className="skill-name">{skill}</span>
    </span>
  );
}

function MarqueeRow({ row }) {
  const doubled = [...row.skills, ...row.skills];

  return (
    <div className="marquee-row" data-direction={row.direction}>
      <div className="marquee-track">
        {doubled.map((skill, i) => (
          <SkillPill key={`${skill}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

export default function SkillMarquee() {
  return (
    <div className="skill-marquee">
      {skillRows.map((row) => (
        <MarqueeRow key={row.id} row={row} />
      ))}
    </div>
  );
}
