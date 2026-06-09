'use client';

import { useEffect, useState } from 'react';

type HomeTheme = 'dark' | 'light';

const STORAGE_KEY = 'home-theme';
const THEME_BACKGROUNDS: Record<HomeTheme, string> = {
  dark: '#011993',
  light: '#fcf0ec',
};

function applyHomeTheme(theme: HomeTheme) {
  document.documentElement.dataset.homeTheme = theme;
  document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
  document.body.style.backgroundColor = THEME_BACKGROUNDS[theme];

  const homeShell = document.querySelector<HTMLElement>('.home-shell');
  if (homeShell) {
    homeShell.style.backgroundColor = THEME_BACKGROUNDS[theme];
  }
}

export default function HomeThemeToggle() {
  const [theme, setTheme] = useState<HomeTheme>('dark');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);
    const initialTheme: HomeTheme = savedTheme === 'light' ? 'light' : 'dark';

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
