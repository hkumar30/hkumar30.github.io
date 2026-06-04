'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { projectFilters, projects, type ProjectFilterId } from '@/data/projects';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease,
    },
  },
};

export default function WorkGrid() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((project) => project.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div className="work-grid-shell">
      <div className="work-filter-bar" role="tablist" aria-label="Project categories">
        {projectFilters.map((filter) => {
          const active = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              className={`work-filter-button ${active ? 'active-nav-link' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
              role="tab"
              aria-selected={active}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeFilter}
        className="project-grid"
        variants={listVariants}
        initial="hidden"
        animate="show"
      >
        {filteredProjects.map((project, index) => (
          <motion.div key={`${activeFilter}-${project.id}`} variants={itemVariants}>
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
