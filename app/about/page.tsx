import Link from 'next/link';
import { PageTransition, SectionTransition } from '@/components/PageTransition';
import SectionDivider from '@/components/SectionDivider';
import { education } from '@/data/experience';
import { profile } from '@/data/profile';
import { routeLabels } from '@/data/siteContent';

export default function AboutPage() {
  return (
    <PageTransition className="page-shell">
      <section className="route-intro about-intro">
        <p className="section-label bilingual-label">
          <span>{routeLabels.about.en}</span>
          <span className="font-hindi" lang="hi">
            {routeLabels.about.hi}
          </span>
        </p>
        <h1 className="route-heading">{routeLabels.about.en}</h1>
        {profile.aboutShortBio.map((paragraph) => (
          <p key={paragraph} className="route-copy">
            {paragraph}
          </p>
        ))}
        <Link href="/work" className="text-link font-garamond about-work-link">
          <span>Work experience -&gt;</span>
          <span className="font-hindi" lang="hi">
            अनुभव देखें -&gt;
          </span>
        </Link>
      </section>

      <SectionTransition>
        <SectionDivider label={`Currently / ${routeLabels.currently.hi}`} />
        <section className="currently-grid">
          <article className="currently-item">
            <h3 className="section-label">Building</h3>
            <p className="route-copy">{profile.currently.building}</p>
          </article>
          <article className="currently-item">
            <h3 className="section-label">Reading</h3>
            <p className="route-copy">{profile.currently.reading}</p>
          </article>
          <article className="currently-item">
            <h3 className="section-label">Listening</h3>
            <p className="route-copy">{profile.currently.listening}</p>
          </article>
        </section>
      </SectionTransition>

      <SectionTransition>
        <SectionDivider label={`Education / ${routeLabels.education.hi}`} />
        <details className="education-collapse">
          <summary className="education-collapse-summary">
            View education details / शिक्षा देखें
          </summary>
          <div className="timeline-list">
            {education.map((item) => (
              <article key={item.id} className="timeline-item">
                <h3>{item.degree}</h3>
                <p>{item.institution}</p>
                <p className="timeline-meta">
                  {item.period} - {item.location}
                </p>
                <p className="timeline-meta">GPA: {item.gpa}</p>
                <ul className="timeline-highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </details>
      </SectionTransition>
    </PageTransition>
  );
}
