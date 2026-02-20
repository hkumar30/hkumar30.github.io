import { RoughBox } from './RoughBox';
import './ProjectCard.css';

function AwardBadge({ award }) {
  if (!award) return null;

  return (
    <div className="award-badge">
      <span className="award-star" aria-hidden="true">★</span>
      <span className="award-text">
        {award.place}
        {award.prize && ` · ${award.prize}`}
      </span>
      <span className="award-event">{award.event}</span>
    </div>
  );
}

export default function ProjectCard({ project, onClick }) {
  return (
    <RoughBox
      className="project-card"
      roughness={1.4}
      seed={project.id.length + 1}
      padding={0}
      style={{ cursor: 'pointer' }}
    >
      <div className="project-card-inner" onClick={() => onClick?.(project)} role="button" tabIndex={0}>
        <AwardBadge award={project.award} />

        <h3 className="project-title">{project.title}</h3>
        <p className="project-tagline">{project.tagline}</p>

        <div className="project-tech">
          {project.tech.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>

        <div className="project-links">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              onClick={(e) => e.stopPropagation()}
            >
              Live ↗
            </a>
          )}
          {project.links.devpost && (
            <a
              href={project.links.devpost}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              onClick={(e) => e.stopPropagation()}
            >
              Devpost ↗
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </RoughBox>
  );
}
