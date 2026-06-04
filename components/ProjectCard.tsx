import type { Project } from '@/data/types';

type ProjectCardProps = {
  project: Project;
  index: number;
};

function getPrimaryProjectLink(project: Project) {
  if (project.links.live) return { label: 'View Live', href: project.links.live };
  if (project.links.github) return { label: 'View GitHub', href: project.links.github };
  if (project.links.devpost) return { label: 'View Devpost', href: project.links.devpost };
  return null;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const order = String(index + 1).padStart(2, '0');
  const primaryLink = getPrimaryProjectLink(project);
  const techSummary = project.tech.slice(0, 3).join(' / ');

  return (
    <article className="project-card project-card-brutal">
      <p className="project-card-order section-label">{order}</p>
      <h3 className="project-card-title font-garamond">{project.title}</h3>
      <p className="project-card-copy">{project.tagline}</p>

      <div className="project-card-footer">
        <span className="project-card-year section-label">{project.year}</span>
        <span className="project-card-tech">{techSummary}</span>
      </div>

      {primaryLink ? (
        <div className="project-card-links">
          <a
            href={primaryLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            {primaryLink.label}
          </a>
        </div>
      ) : null}
    </article>
  );
}
