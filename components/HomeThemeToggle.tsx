'use client';

import { useEffect, useState } from 'react';

type HomeTheme = 'dark' | 'light';

const STORAGE_KEY = 'home-theme-v2';
const THEME_BACKGROUNDS: Record<HomeTheme, string> = {
  dark: '#011993',
  light: '#fcf0ec',
};

const FOOTER_ICON_COLORS: Record<HomeTheme, string> = {
  dark: '#f5f0e8',
  light: '#ef3c3c',
};

function applyHomeTheme(theme: HomeTheme) {
  document.documentElement.dataset.homeTheme = theme;
  document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
  document.body.style.backgroundColor = THEME_BACKGROUNDS[theme];

  const homeShell = document.querySelector<HTMLElement>('.home-shell');
  if (homeShell) {
    homeShell.style.backgroundColor = THEME_BACKGROUNDS[theme];
  }

  document
    .querySelectorAll<SVGElement>('.home-footer-icon-fill')
    .forEach((icon) => {
      icon.style.fill = FOOTER_ICON_COLORS[theme];
    });

  document
    .querySelectorAll<SVGElement>('.home-footer-icon-stroke')
    .forEach((icon) => {
      icon.style.stroke = FOOTER_ICON_COLORS[theme];
    });
}

export default function HomeThemeToggle() {
  const [theme, setTheme] = useState<HomeTheme>('light');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    const initialTheme: HomeTheme = savedTheme === 'dark' ? 'dark' : 'light';

    setTheme(initialTheme);
    applyHomeTheme(initialTheme);

    return () => {
      delete document.documentElement.dataset.homeTheme;
      document.documentElement.style.colorScheme = '';
      document.body.style.backgroundColor = '';

      const homeShell = document.querySelector<HTMLElement>('.home-shell');
      if (homeShell) {
        homeShell.style.backgroundColor = '';
      }

      document
        .querySelectorAll<SVGElement>('.home-footer-icon-fill')
        .forEach((icon) => {
          icon.style.fill = '';
        });

      document
        .querySelectorAll<SVGElement>('.home-footer-icon-stroke')
        .forEach((icon) => {
          icon.style.stroke = '';
        });
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyHomeTheme(nextTheme);
  };

  return (
    <button
      type="button"
      className="home-theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-pressed={theme === 'dark'}
    >
      <span className={theme === 'dark' ? 'is-active' : ''}>Blue</span>
      <span className={theme === 'light' ? 'is-active' : ''}>Light</span>
    </button>
  );
}
