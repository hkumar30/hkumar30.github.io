import type { Project } from '@/data/types';

type ProjectCardProps = {
  project: Project;
  index: number;
};

function getPrimaryProjectLink(project: Project) {
  if (project.links.live) return { label: 'Live', href: project.links.live };
  if (project.links.github) return { label: 'GitHub', href: project.links.github };
  if (project.links.devpost) return { label: 'Devpost', href: project.links.devpost };
  return null;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const order = String(index + 1).padStart(2, '0');
  const primaryLink = getPrimaryProjectLink(project);
  const techSummary = project.tech.slice(0, 3).join(' / ');

  return (
    <article className="project-card">
      <div className="project-card-row">
        <span className="project-card-number">{order}</span>

        <div className="project-card-body">
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-copy">{project.tagline}</p>
        </div>

        <div className="project-card-meta-right">
          <span className="project-card-tech">{techSummary}</span>
          {project.award ? (
            <span className="project-card-award-token">{project.award.place}</span>
          ) : null}
        </div>

        <div className="project-card-year-col">
          <span className="project-card-year">{project.year}</span>
          {primaryLink ? (
            <a
              href={primaryLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
              onClick={(e) => e.stopPropagation()}
            >
              {primaryLink.label} →
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
