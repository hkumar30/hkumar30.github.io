import { PageTransition, SectionTransition } from '@/components/PageTransition';
import WorkGrid from '@/components/WorkGrid';
import { projects } from '@/data/projects';

export default function WorkPage() {
  return (
    <PageTransition className="page-shell">
      <section className="route-intro">
        <span className="section-label">Case Studies & Projects</span>
        <h1 className="route-heading work-heading">
          Work <sup className="work-count">{projects.length}</sup>
        </h1>
      </section>

      <SectionTransition>
        <WorkGrid />
      </SectionTransition>
    </PageTransition>
  );
}
