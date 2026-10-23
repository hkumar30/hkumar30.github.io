'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/data/siteContent';
import { HKLogo } from '@/components/HKLogo';

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export default function Nav() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerNavRef = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (wasOpen.current && !open) {
      menuButtonRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    drawerNavRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (pathname === '/') return null;

  return (
    <>
      <header className="site-nav">
        <div className="site-nav-inner">
          <Link href="/" className="site-logo" aria-label="Home">
            <HKLogo className="hk-logo-nav" />
          </Link>

          <nav className="site-nav-links-desktop" aria-label="Primary navigation">
            {navItems.map((item, index) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`site-nav-link ${active ? 'is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="site-nav-num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="site-nav-label">{item.label}</span>
                  <span className="site-nav-hi font-hindi" lang="hi" aria-hidden="true">
                    {item.labelHi}
                  </span>
                </Link>
              );
            })}
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            className="menu-toggle-mobile"
            aria-expanded={open}
            aria-controls="global-nav-drawer"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {open ? (
        <>
          <div className="menu-overlay open" onClick={() => setOpen(false)} />
          <aside
            id="global-nav-drawer"
            className="menu-drawer open"
            aria-label="Global navigation"
          >
            <nav ref={drawerNavRef} className="menu-drawer-nav" aria-label="Primary navigation">
              {navItems.map((item, index) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`menu-drawer-link ${active ? 'is-active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className="menu-drawer-num" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="menu-drawer-label">{item.label}</span>
                    <span className="menu-drawer-hi font-hindi" lang="hi" aria-hidden="true">
                      {item.labelHi}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </>
      ) : null}
    </>
  );
}
