import { PageTransition } from '@/components/PageTransition';
import { profile, socialLinks } from '@/data/profile';

const textLinks = socialLinks.filter((item) => item.label === 'GitHub' || item.label === 'LinkedIn');

export default function ContactPage() {
  return (
    <PageTransition className="page-shell contact-page-shell">
      <section className="contact-box" aria-label="Contact details">
        <a className="contact-box-email text-link font-garamond" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <div className="contact-box-links">
          {textLinks.map((item) => (
            <a
              key={item.label}
              className="text-link contact-box-link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          ))}
          <a
            className="text-link contact-box-link"
            href={profile.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
