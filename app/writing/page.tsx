import { PageTransition, SectionTransition } from '@/components/PageTransition';
import { writingPlaceholder } from '@/data/writing';

import { routeLabels } from '@/data/siteContent';

export default function WritingPage() {
  return (
    <PageTransition className="page-shell">
      <section className="route-intro">
        <p className="section-label bilingual-label">
          <span>{routeLabels.writing.en}</span>
          <span className="font-hindi" lang="hi">
            {routeLabels.writing.hi}
          </span>
        </p>
        <h1 className="route-heading">Writing</h1>
        <p className="route-copy">Thoughts on algorithms, engineering, and building things.</p>
      </section>

      <SectionTransition className="writing-placeholder-shell">
        <div className="writing-placeholder-box">
          <p className="section-label">Coming Soon</p>
          <h2 className="writing-title font-garamond">{writingPlaceholder.heading}</h2>
          <p className="route-copy">{writingPlaceholder.supportingLine}</p>
          <p className="writing-placeholder-title">{writingPlaceholder.sampleTitle}</p>
        </div>
      </SectionTransition>
    </PageTransition>
  );
}
