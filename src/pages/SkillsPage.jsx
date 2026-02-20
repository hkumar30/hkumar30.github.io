import SkillMarquee from '../components/SkillMarquee';
import Timeline from '../components/Timeline';
import { RoughLine } from '../components/RoughBox';
import { workExperience, education, volunteer } from '../data/experience';
import { DoodleSpiral } from '../components/Doodles';
import './SkillsPage.css';

export default function SkillsPage() {
  return (
    <div className="skills-page">
      <section>
        <h2>Work & Education</h2>
      </section>

      {/* ── Skills ── */}
      <section className="skills-section">
        <div className="skills-heading-row">
          <h3>Skills</h3>
          <DoodleSpiral size={22} style={{ opacity: 0.4, marginLeft: 8 }} />
        </div>
        <p className="skills-subtitle text-pencil">
          Hover a row to pause · hover a skill to highlight
        </p>
        <SkillMarquee />
      </section>

      <RoughLine seed={14} />

      {/* ── Experience ── */}
      <section className="experience-section">
        <Timeline title="Work Experience" items={workExperience} />

        <div className="education-block">
          <Timeline title="Education" items={education} />
        </div>
      </section>

      <RoughLine seed={18} />

      {/* ── Volunteer ── */}
      <section className="volunteer-section">
        <Timeline title="Volunteer Experience" items={volunteer} />
      </section>
    </div>
  );
}
