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
  const [showNav, setShowNav] = useState(pathname !== '/');
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerNavRef = useRef<HTMLElement | null>(null);
  const wasDrawerVisible = useRef(false);
  const isDrawerVisible = open && showNav;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') {
      setShowNav(true);
      return;
    }

    const updateVisibility = () => {
      const threshold = window.innerHeight;
      const shouldShow = window.scrollY >= threshold;
      setShowNav(shouldShow);
      if (!shouldShow) {
        setOpen(false);
      }
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, [pathname]);

  useEffect(() => {
    if (wasDrawerVisible.current && !isDrawerVisible && showNav) {
      menuButtonRef.current?.focus();
    }
    wasDrawerVisible.current = isDrawerVisible;
  }, [isDrawerVisible, showNav]);

  useEffect(() => {
    if (!isDrawerVisible) {
      document.body.style.overflow = '';
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    drawerNavRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isDrawerVisible]);

  return (
    <>
      {showNav ? (
        <header className="site-nav">
          <div className="site-nav-inner">
            <Link href="/" className="site-logo" aria-label="Home">
              <HKLogo className="hk-logo-nav" />
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              className="menu-toggle"
              aria-expanded={isDrawerVisible}
              aria-controls="global-nav-drawer"
              onClick={() => setOpen((prev) => !prev)}
            >
              {isDrawerVisible ? 'Close' : 'Menu'}
            </button>
          </div>
        </header>
      ) : null}

      {isDrawerVisible ? (
        <>
          <div className="menu-overlay open" onClick={() => setOpen(false)} />
          <aside id="global-nav-drawer" className="menu-drawer open" aria-label="Global navigation">
            <nav ref={drawerNavRef} className="menu-drawer-nav" aria-label="Primary navigation">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`menu-drawer-link ${active ? 'active-nav-link' : ''}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
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
