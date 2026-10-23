'use client';

import Link from 'next/link';
import { navItems } from '@/data/siteContent';

interface CompactNavProps {
  className?: string;
}

export default function CompactNav({ className = '' }: CompactNavProps) {
  return (
    <nav
      className={`compact-nav ${className}`}
      aria-label="Primary navigation compact"
    >
      {navItems.map((item, index) => (
        <Link key={item.href} href={item.href} className="compact-nav-link">
          <span className="compact-nav-num" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="compact-nav-label">{item.label}</span>
          <span className="compact-nav-hi font-hindi" lang="hi" aria-hidden="true">
            {item.labelHi}
          </span>
        </Link>
      ))}
    </nav>
  );
}
