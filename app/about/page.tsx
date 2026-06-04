import Link from 'next/link';
import { PageTransition, SectionTransition } from '@/components/PageTransition';
import SectionDivider from '@/components/SectionDivider';
import { education, volunteer, workExperience } from '@/data/experience';
import { profile } from '@/data/profile';

export default function AboutPage() {
  return (
    <PageTransition className="page-shell">
      <section className="about-editorial">
        <div className="about-quote-column">
          <p className="pull-quote">{profile.pullQuote}</p>
        </div>
        <div className="about-bio-column">
          <span className="section-label">About Me</span>
          {profile.bioParagraphs.map((paragraph) => (
            <p key={paragraph} className="route-copy">
              {paragraph}
            </p>
          ))}
          <p className="route-copy">
            {profile.role.title} at {profile.role.company} - {profile.role.impact.join(' - ')}
          </p>
          <Link href={profile.resumeHref} target="_blank" className="text-link font-garamond home-more-link">
            Download Resume -&gt;
          </Link>
        </div>
      </section>

      <SectionTransition>
        <SectionDivider label="Experience" />
        <div className="about-timeline-grid">
          <section>
            <h2 className="route-heading timeline-heading">Work Experience</h2>
            <div className="timeline-list">
              {workExperience.map((item) => (
                <article key={item.id} className="timeline-item">
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                  <p className="timeline-meta">
                    {item.period} - {item.location}
                  </p>
                  <ul className="timeline-highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="route-heading timeline-heading">Education</h2>
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
          </section>

          <section>
            <h2 className="route-heading timeline-heading">Volunteer Experience</h2>
            <div className="timeline-list">
              {volunteer.map((item) => (
                <article key={item.id} className="timeline-item">
                  <h3>{item.role}</h3>
                  <p>{item.organization}</p>
                  <p className="timeline-meta">{item.period}</p>
                  <ul className="timeline-highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </div>
      </SectionTransition>

      <SectionTransition>
        <SectionDivider label="Currently" />
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
    </PageTransition>
  );
}
