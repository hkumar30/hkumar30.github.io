'use client';

import { motion } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease,
    },
  },
};

export default function ProjectGrid() {
  return (
    <motion.div
      className="projects-grid"
      variants={listVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {projects.slice(0, 4).map((project, index) => (
        <motion.div key={project.id} variants={itemVariants} className="project-grid-item">
          <ProjectCard project={project} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
}
