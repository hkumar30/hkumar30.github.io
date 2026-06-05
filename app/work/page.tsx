import { PageTransition, SectionTransition } from '@/components/PageTransition';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import { workExperience } from '@/data/experience';
import { routeLabels } from '@/data/siteContent';

export default function WorkPage() {
  return (
    <PageTransition className="page-shell">
      <section className="route-intro">
        <p className="section-label bilingual-label">
          <span>{routeLabels.work.en}</span>
          <span className="font-hindi" lang="hi">
            {routeLabels.work.hi}
          </span>
        </p>
        <h1 className="route-heading work-heading">
          {routeLabels.work.en} <sup className="route-count">{workExperience.length}</sup>
        </h1>
        <p className="route-copy">
          Experience timeline focused on production outcomes, reliability improvements, and shipped
          systems.
        </p>
      </section>

      <SectionTransition>
        <ExperienceTimeline items={workExperience} />
      </SectionTransition>
    </PageTransition>
  );
}
