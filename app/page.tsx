import Link from 'next/link';
import Marquee from '@/components/Marquee';
import { PageTransition, SectionTransition } from '@/components/PageTransition';
import ProjectCard from '@/components/ProjectCard';
import SectionDivider from '@/components/SectionDivider';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';

const selectedProjects = projects.slice(0, 3);

export default function HomePage() {
  return (
    <PageTransition className="page-shell">
      <section className="home-hero">
        <span className="section-label">Home</span>
        <h1 className="display-title hero-title">{profile.name}</h1>
        <p className="home-descriptor route-copy">{profile.descriptor}</p>
        <p className="home-role-line">
          <span>{profile.role.title}</span>
          <span> at {profile.role.company}</span>
          <span> - {profile.role.impact.join(' - ')}</span>
        </p>
        <p className="home-legacy-titles section-label">{profile.legacyTitles.join(' - ')}</p>
      </section>

      <SectionTransition className="home-skills">
        <SectionDivider label="Skills & Stack" />
        <Marquee />
      </SectionTransition>

      <SectionTransition className="home-work" delay={0.04}>
        <div className="route-intro">
          <span className="section-label">Selected Work</span>
          <h2 className="route-heading">Projects</h2>
        </div>
        <div className="project-grid">
          {selectedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <Link href="/work" className="text-link font-garamond home-more-link">
          View all work -&gt;
        </Link>
      </SectionTransition>

      <SectionTransition className="home-about" delay={0.08}>
        <SectionDivider label="About" />
        <div className="home-about-teaser paper-panel">
          <p className="route-copy">{profile.aboutTeaser}</p>
          <p className="route-copy">{profile.aboutTeaserSecondary}</p>
          <Link href="/about" className="text-link font-garamond home-more-link">
            Read more -&gt;
          </Link>
        </div>
      </SectionTransition>
    </PageTransition>
  );
}
