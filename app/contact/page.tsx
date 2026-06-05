import { PageTransition } from '@/components/PageTransition';
import { profile, socialLinks } from '@/data/profile';
import { routeLabels } from '@/data/siteContent';

const textLinks = socialLinks.filter((item) => item.label === 'GitHub' || item.label === 'LinkedIn');

function ContactIcon({ kind }: { kind: 'email' | 'github' | 'linkedin' | 'resume' }) {
  if (kind === 'email') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-link-icon-svg">
        <path d="M3 5h18v14H3V5Zm2 2v1.2l7 4.4 7-4.4V7l-7 4.3L5 7Z" fill="currentColor" />
      </svg>
    );
  }

  if (kind === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-link-icon-svg">
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.88c-2.78.61-3.37-1.34-3.37-1.34-.45-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.6.07-.6 1 .07 1.54 1.04 1.54 1.04.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.38-1.97 1.02-2.67-.1-.25-.45-1.27.1-2.65 0 0 .83-.27 2.73 1.02a9.4 9.4 0 0 1 4.98 0c1.9-1.3 2.73-1.02 2.73-1.02.55 1.38.2 2.4.1 2.65.63.7 1.02 1.58 1.02 2.67 0 3.84-2.34 4.69-4.57 4.93.36.31.68.9.68 1.82v2.7c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
        />
      </svg>
    );
  }

  if (kind === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-link-icon-svg">
        <path
          fill="currentColor"
          d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm7 0h3.84v1.64h.05c.54-1.02 1.86-2.1 3.82-2.1 4.08 0 4.84 2.69 4.84 6.18V21h-4v-5.56c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.15 1.45-2.15 2.95V21h-4V9Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="contact-link-icon-svg">
      <path
        fill="currentColor"
        d="M7 3h10v2H7V3Zm10 6h2v12H5V9h2v10h10V9ZM9 7h6v7H9V7Zm2 2v3h2V9h-2Z"
      />
    </svg>
  );
}

export default function ContactPage() {
  const contactMethods = [
    { kind: 'email' as const, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    ...textLinks.map((item) => ({
      kind: item.label.toLowerCase() as 'github' | 'linkedin',
      label: item.label,
      value: item.href.replace(/^https?:\/\//, ''),
      href: item.href,
    })),
    {
      kind: 'resume' as const,
      label: 'Resume',
      value: 'Harsh Kumar CV',
      href: profile.resumeHref,
    },
  ];

  return (
    <PageTransition className="contact-page-shell">
      <section className="contact-card" aria-label="Contact details">
        <p className="section-label">{routeLabels.contact.en}</p>
        <h1 className="contact-card-title font-garamond">Let&apos;s build something useful.</h1>
        <p className="contact-card-subtitle font-hindi" lang="hi">
          चलिए कुछ सार्थक बनाते हैं।
        </p>

        <div className="contact-card-links">
          {contactMethods.map((method) => (
            <a
              key={method.label}
              className="contact-card-link"
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-link-icon">
                <ContactIcon kind={method.kind} />
              </span>
              <span className="contact-link-copy">
                <span className="contact-link-label">{method.label}</span>
                <span className="contact-link-value">{method.value}</span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
