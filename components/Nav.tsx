'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { profile } from '@/data/profile';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
];

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export default function Nav() {
  const pathname = usePathname() ?? '/';

  return (
    <>
      <header className="site-nav">
        <div className="site-nav-inner">
          <Link href="/" className="site-logo font-garamond">
            {profile.name}
          </Link>

          <nav className="site-nav-links" aria-label="Primary navigation">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`site-nav-link ${active ? 'active-nav-link' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <nav className="site-bottom-nav" aria-label="Mobile navigation">
        {navItems.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <Link
              key={`mobile-${item.href}`}
              href={item.href}
              className={`site-bottom-link ${active ? 'active-nav-link' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
