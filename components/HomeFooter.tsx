import { profile, socialLinks } from '@/data/profile';

type HomeFooterIconKind = 'github' | 'linkedin' | 'resume';

const footerLinks: {
  kind: HomeFooterIconKind;
  label: string;
  href: string;
}[] = [
  {
    kind: 'github',
    label: 'GitHub',
    href:
      socialLinks.find((link) => link.label.toLowerCase() === 'github')?.href ??
      '#',
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    href:
      socialLinks.find((link) => link.label.toLowerCase() === 'linkedin')
        ?.href ?? '#',
  },
  {
    kind: 'resume',
    label: 'Resume',
    href: profile.resumeHref,
  },
];

function HomeFooterIcon({ kind }: { kind: HomeFooterIconKind }) {
  if (kind === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          className="home-footer-icon-fill"
          d="M12 2.6c-5.35 0-9.7 4.35-9.7 9.72 0 4.28 2.78 7.91 6.64 9.19.48.09.66-.21.66-.47v-1.81c-2.7.59-3.27-1.16-3.27-1.16-.44-1.12-1.08-1.42-1.08-1.42-.88-.6.07-.59.07-.59.98.07 1.49 1.01 1.49 1.01.86 1.48 2.27 1.05 2.82.8.09-.63.34-1.05.62-1.29-2.16-.25-4.43-1.08-4.43-4.8 0-1.06.38-1.93 1-2.61-.1-.25-.43-1.24.1-2.58 0 0 .82-.26 2.67 1a9.25 9.25 0 0 1 4.86 0c1.85-1.26 2.67-1 2.67-1 .53 1.34.2 2.33.1 2.58.62.68 1 1.55 1 2.61 0 3.73-2.27 4.55-4.44 4.79.35.31.66.9.66 1.82v2.71c0 .26.17.56.67.46a9.74 9.74 0 0 0 6.63-9.18c0-5.37-4.35-9.72-9.7-9.72Z"
        />
      </svg>
    );
  }

  if (kind === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          className="home-footer-icon-fill"
          d="M5.25 8.9h3.23v10.35H5.25V8.9Zm1.62-5.15a1.88 1.88 0 1 1 0 3.75 1.88 1.88 0 0 1 0-3.75Zm5.18 5.15h3.09v1.41h.04c.43-.82 1.48-1.69 3.05-1.69 3.26 0 3.86 2.15 3.86 4.94v5.69h-3.22v-5.04c0-1.2-.02-2.75-1.67-2.75-1.68 0-1.94 1.31-1.94 2.66v5.13h-3.21V8.9Z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        className="home-footer-icon-stroke"
        d="M7 3.5h6.25L18 8.25V20.5H7V3.5Z"
        fill="none"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        className="home-footer-icon-stroke"
        d="M13.25 3.5v5h5M9.45 12.05h5.9M9.45 15.25h5.9"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function HomeFooter() {
  return (
    <footer className="home-footer" aria-label="Footer">
      <p className="home-footer-copy">&copy; 2026 Harsh Kumar</p>
      <nav className="home-footer-links" aria-label="Social links">
        {footerLinks.map((link) => (
          <a
            key={link.kind}
            className="home-footer-link"
            href={link.href}
            aria-label={link.label}
            target="_blank"
            rel="noreferrer"
          >
            <HomeFooterIcon kind={link.kind} />
          </a>
        ))}
      </nav>
    </footer>
  );
}
