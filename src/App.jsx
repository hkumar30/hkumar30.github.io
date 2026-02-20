import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Notebook from './components/Notebook';
import PageFlipper from './components/PageFlipper';
import ThemeToggle from './components/ThemeToggle';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

const TABS = [
  { id: 'home', label: 'Home', short: 'H' },
  { id: 'projects', label: 'Projects', short: 'P' },
  { id: 'workedu', label: 'Work & Edu', short: 'W' },
  { id: 'blog', label: 'Blog', short: 'B' },
  { id: 'contact', label: 'Say Hi', short: '✉' },
];

const PAGES = {
  home: HomePage,
  projects: ProjectsPage,
  workedu: SkillsPage,
  blog: BlogPage,
  contact: ContactPage,
};

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [direction, setDirection] = useState(0);

  const navigateTo = useCallback(
    (pageId) => {
      if (pageId === activePage) return;
      const currentIdx = TABS.findIndex((t) => t.id === activePage);
      const nextIdx = TABS.findIndex((t) => t.id === pageId);
      setDirection(nextIdx > currentIdx ? 1 : -1);
      setActivePage(pageId);
    },
    [activePage],
  );

  const PageComponent = PAGES[activePage];

  return (
    <>
      {/* Global SVG filters for ink-bleed / chalk effect */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="inkBleed">
            <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="chalkDust">
            <feTurbulence type="turbulence" baseFrequency="0.035" numOctaves="3" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <Notebook tabs={TABS} activePage={activePage} onNavigate={navigateTo}>
        <ThemeToggle />
        <AnimatePresence mode="wait" custom={direction}>
          <PageFlipper key={activePage} direction={direction}>
            <PageComponent />
          </PageFlipper>
        </AnimatePresence>
      </Notebook>
    </>
  );
}
