import Link from 'next/link';
import { projects } from '@/data/projects';
import { workExperience } from '@/data/experience';
import { homeCultureModules, homeIndexIntro, homePrimaryModules } from '@/data/siteContent';

function IndexLabel({ label }: { label: string }) {
  return <p className="section-label">{label}</p>;
}

function IndexLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-link home-index-cta">
      <span>{label}</span>
    </Link>
  );
}

export default function HomeIndex() {
  const projectsModule = homePrimaryModules.find((module) => module.id === 'projects');
  const workModule = homePrimaryModules.find((module) => module.id === 'work');

  return (
    <section className="home-index-shell" aria-label="Index modules">
      <article className="home-index-module home-index-intro">
        <IndexLabel label={homeIndexIntro.label.en} />
        <h2 className="home-index-heading font-garamond">{homeIndexIntro.heading}</h2>
        <p className="home-index-copy">{homeIndexIntro.copy}</p>
        <p className="home-index-meta">{homeIndexIntro.location}</p>
      </article>

      <div className="home-index-grid">
        {projectsModule ? (
          <article className="home-index-module">
            <IndexLabel label={projectsModule.label.en} />
            <h3 className="home-index-title font-garamond">{projectsModule.heading}</h3>
            <p className="home-index-copy">{projectsModule.description}</p>
            <ul className="home-index-list">
              {projects.slice(0, 3).map((project) => (
                <li key={project.id} className="home-index-item">
                  <span className="home-index-item-title">{project.title}</span>
                  <span className="home-index-item-meta">{project.year}</span>
                </li>
              ))}
            </ul>
            {projectsModule.cta ? (
              <IndexLink href={projectsModule.cta.href} label={projectsModule.cta.label.en} />
            ) : null}
          </article>
        ) : null}

        {workModule ? (
          <article className="home-index-module">
            <IndexLabel label={workModule.label.en} />
            <h3 className="home-index-title font-garamond">{workModule.heading}</h3>
            <p className="home-index-copy">{workModule.description}</p>
            <ul className="home-index-list">
              {workExperience.slice(0, 3).map((item) => (
                <li key={item.id} className="home-index-item">
                  <span className="home-index-item-title">{item.role}</span>
                  <span className="home-index-item-meta">{item.period}</span>
                </li>
              ))}
            </ul>
            {workModule.cta ? (
              <IndexLink href={workModule.cta.href} label={workModule.cta.label.en} />
            ) : null}
          </article>
        ) : null}

        {homeCultureModules.map((module) => (
          <article key={module.id} className="home-index-module">
            <IndexLabel label={module.label.en} />
            <h3 className="home-index-title font-garamond">{module.heading}</h3>
            <p className="home-index-copy">{module.description}</p>
            <ul className="home-index-list">
              {module.items.map((item) => (
                <li key={item.id} className="home-index-item">
                  <span className="home-index-item-title">{item.title}</span>
                  {item.meta ? <span className="home-index-item-meta">{item.meta}</span> : null}
                  {item.note ? <span className="home-index-item-note">{item.note}</span> : null}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
