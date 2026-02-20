import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import RoughButton from '../components/RoughButton';
import { RoughBox } from '../components/RoughBox';
import { projects } from '../data/projects';
import { DoodleStar } from '../components/Doodles';
import './ProjectsPage.css';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('featured');
  const [selected, setSelected] = useState(null);

  const filtered = filter === 'featured' ? projects.filter((p) => p.featured) : projects;

  if (selected) {
    return (
      <div className="projects-page">
        <button className="back-btn" onClick={() => setSelected(null)}>
          ← Back to projects
        </button>
        <ProjectDetail project={selected} />
      </div>
    );
  }

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h2>
          Projects{' '}
          <DoodleStar size={20} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 4 }} />
        </h2>
      </div>

      <div className="projects-filter">
        <RoughButton
          seed={20}
          active={filter === 'featured'}
          onClick={() => setFilter('featured')}
        >
          Featured
        </RoughButton>
        <RoughButton
          seed={21}
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          All
        </RoughButton>
      </div>

      <div className="projects-grid">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={setSelected} />
        ))}
      </div>
    </div>
  );
}

function ProjectDetail({ project }) {
  return (
    <div className="project-detail">
      <h2>{project.title}</h2>
      {project.award && (
        <div className="detail-award">
          <span className="highlighter-pink">
            ★ {project.award.place} — {project.award.event}
            {project.award.prize && ` · ${project.award.prize}`}
          </span>
        </div>
      )}
      <p className="detail-description">{project.description}</p>

      <div className="detail-tech">
        <h4>Tech Stack</h4>
        <div className="detail-tech-tags">
          {project.tech.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>

      <RoughBox seed={project.id.length + 10} padding={16} roughness={1.2}>
        <div className="detail-links">
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
              View Live ↗
            </a>
          )}
          {project.links.devpost && (
            <a href={project.links.devpost} target="_blank" rel="noopener noreferrer">
              Devpost ↗
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          )}
        </div>
      </RoughBox>
    </div>
  );
}
