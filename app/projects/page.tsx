import { PageTransition, SectionTransition } from '@/components/PageTransition';
import ProjectGrid from '@/components/ProjectGrid';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <PageTransition className="page-shell">
      <section className="route-intro">
        <span className="section-label">Portfolio</span>
        <h1 className="route-heading work-heading">
          Projects <sup className="work-count">{projects.length}</sup>
        </h1>
      </section>

      <SectionTransition>
        <ProjectGrid />
      </SectionTransition>
    </PageTransition>
  );
}
