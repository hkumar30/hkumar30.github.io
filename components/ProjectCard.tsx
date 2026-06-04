import type { Project } from '@/data/types';

type ProjectCardProps = {
  project: Project;
  index: number;
};

function buildProjectLinks(project: Project) {
  const links: Array<{ label: string; href: string }> = [];
  if (project.links.live) links.push({ label: 'Live', href: project.links.live });
  if (project.links.github) links.push({ label: 'GitHub', href: project.links.github });
  if (project.links.devpost) links.push({ label: 'Devpost', href: project.links.devpost });
  return links;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const order = String(index + 1).padStart(2, '0');
  const links = buildProjectLinks(project);

  return (
    <article className="project-card paper-panel">
      <p className="project-card-order section-label">{order}</p>
      <h3 className="project-card-title font-garamond">{project.title}</h3>
      <p className="project-card-copy">{project.tagline}</p>

      {project.award ? (
        <p className="project-card-award section-label">
          {project.award.place} - {project.award.event}
        </p>
      ) : null}

      <div className="project-card-footer">
        <span className="project-card-year section-label">{project.year}</span>
        <span className="project-card-tech">{project.tech.join(' - ')}</span>
      </div>

      {links.length > 0 ? (
        <div className="project-card-links">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}
