'use client';

import Link from 'next/link';
import { navItems } from '@/data/siteContent';

// Icon SVG components
const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const FlaskIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v7.31"/>
    <path d="M14 2v7.31"/>
    <path d="M8.5 9.5l-2.5 7.5h12l-2.5-7.5"/>
    <path d="M6 17h12"/>
    <path d="M7 22h10"/>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const icons = [FolderIcon, BriefcaseIcon, FlaskIcon, MailIcon];
const initials = ['P', 'W', 'L', 'C'];

interface CompactNavProps {
  className?: string;
}

export default function CompactNav({ className = '' }: CompactNavProps) {
  return (
    <nav 
      className={`compact-nav ${className}`} 
      aria-label="Primary navigation compact"
    >
      {navItems.map((item, index) => {
        const Icon = icons[index];
        const initial = initials[index];
        return (
          <Link
            key={item.href}
            href={item.href}
            className="compact-nav-link"
            aria-label={item.label}
            title={item.label}
          >
            <span className="compact-nav-icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="compact-nav-initial">{initial}</span>
            <span className="compact-nav-hi font-hindi" lang="hi">
              {item.labelHi.charAt(0)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
