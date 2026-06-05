import { PageTransition, SectionTransition } from '@/components/PageTransition';
import ProjectGrid from '@/components/ProjectGrid';
import { projects } from '@/data/projects';
import { routeLabels } from '@/data/siteContent';

export default function ProjectsPage() {
  return (
    <PageTransition className="page-shell">
      <section className="route-intro">
        <p className="section-label bilingual-label">
          <span>{routeLabels.projects.en}</span>
          <span className="font-hindi" lang="hi">
            {routeLabels.projects.hi}
          </span>
        </p>
        <h1 className="route-heading work-heading">
          {routeLabels.projects.en} <sup className="route-count">{projects.length}</sup>
        </h1>
        <p className="route-copy">
          Four focused builds. Each one prioritizes clarity, measurable outcomes, and practical
          engineering tradeoffs.
        </p>
      </section>

      <SectionTransition>
        <ProjectGrid />
      </SectionTransition>
    </PageTransition>
  );
}
