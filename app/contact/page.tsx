import AvailabilityStatus from '@/components/AvailabilityStatus';
import { PageTransition, SectionTransition } from '@/components/PageTransition';
import SectionDivider from '@/components/SectionDivider';
import { profile, socialLinks } from '@/data/profile';

const textLinks = socialLinks.filter((item) => item.label !== 'Email');

export default function ContactPage() {
  return (
    <PageTransition className="page-shell">
      <section className="contact-hero">
        <h1 className="display-title hero-title contact-heading">Let&apos;s work together.</h1>
        <p className="route-copy">{profile.contactIntro}</p>
      </section>

      <SectionTransition className="contact-stack">
        <SectionDivider label="Email" />
        <a className="contact-email text-link font-garamond" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </SectionTransition>

      <SectionTransition className="contact-stack">
        <SectionDivider label="Elsewhere" />
        <div className="contact-socials">
          {textLinks.map((item) => (
            <a
              key={item.label}
              className="text-link contact-social-link"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          ))}
        </div>
      </SectionTransition>

      <SectionTransition className="contact-stack">
        <AvailabilityStatus />
      </SectionTransition>
    </PageTransition>
  );
}
