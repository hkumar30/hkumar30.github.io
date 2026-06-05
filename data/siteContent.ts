import type { BilingualLabel } from './types';

export type NavItem = {
  href: string;
  label: string;
};

export type HomeIndexItem = {
  id: string;
  title: string;
  meta?: string;
  note?: string;
  href?: string;
  external?: boolean;
};

export type HomeIndexModule = {
  id: string;
  label: BilingualLabel;
  heading: string;
  description: string;
  items: HomeIndexItem[];
  cta?: {
    href: string;
    label: BilingualLabel;
  };
};

export const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
];

export const heroContent = {
  intro:
    'Designing and shipping production RAG systems that improve reliability, reduce latency, and keep AI behavior grounded in real-world constraints.',
  location: 'Tempe, AZ',
};

export const homeIndexIntro = {
  label: { en: 'Index', hi: 'सूची' },
  heading: 'Designing and shipping reliable AI products with editorial clarity.',
  copy: 'This homepage is an index. It points to project deep dives, work outcomes, and the signals that shape how I build.',
  location: 'Tempe, AZ / Remote',
};

export const homePrimaryModules: Omit<HomeIndexModule, 'items'>[] = [
  {
    id: 'projects',
    label: { en: 'Projects', hi: 'परियोजनाएं' },
    heading: 'Selected technical builds',
    description: 'Four focused builds with clear constraints, tradeoffs, and outcomes.',
    cta: {
      href: '/projects',
      label: { en: 'Open projects', hi: 'प्रोजेक्ट्स देखें' },
    },
  },
  {
    id: 'work',
    label: { en: 'Work', hi: 'अनुभव' },
    heading: 'Professional experience',
    description: 'Production delivery, migration reliability, and AI system hardening work.',
    cta: {
      href: '/work',
      label: { en: 'Open work', hi: 'अनुभव देखें' },
    },
  },
];

export const homeCultureModules: HomeIndexModule[] = [
  {
    id: 'shows',
    label: { en: 'I Watch', hi: 'मैं देखता हूं' },
    heading: 'Stories that stay with me',
    description: 'Visual storytelling influences how I structure software narratives and product flow.',
    items: [
      {
        id: 'eeaao',
        title: 'Everything Everywhere All at Once',
        meta: 'Film',
        note: 'Chaos with emotional precision.',
      },
      {
        id: 'studio',
        title: 'The Studio',
        meta: 'TV Series',
        note: 'Great pacing and framing decisions.',
      },
      {
        id: 'pluribus',
        title: 'Pluribus',
        meta: 'TV Series',
        note: 'Weird in the best possible way.',
      },
    ],
  },
  {
    id: 'music',
    label: { en: 'I Listen', hi: 'मैं सुनता हूं' },
    heading: 'Playlists while building',
    description: 'Sound helps me hold deep-focus states during implementation and debugging.',
    items: [
      { id: 'focus', title: 'Lo-fi focus sets', meta: 'Deep work' },
      { id: 'ambient', title: 'Ambient instrumentals', meta: 'Architecture thinking' },
      { id: 'interviews', title: 'Builder interviews', meta: 'Commute notes' },
    ],
  },
  {
    id: 'qa',
    label: { en: 'Q&A', hi: 'प्रश्नोत्तर' },
    heading: 'How I think about craft',
    description: 'A compact view into design, engineering habits, and personal taste.',
    items: [
      {
        id: 'q1',
        title: 'What makes strong product design?',
        note: 'Clarity for real users before visual cleverness.',
      },
      {
        id: 'q2',
        title: 'What keeps me improving?',
        note: 'Shipping, feedback loops, and ruthless postmortems.',
      },
      {
        id: 'q3',
        title: 'What do I optimize for?',
        note: 'Reliability, readability, and long-term maintainability.',
      },
    ],
  },
];

export const routeLabels = {
  projects: { en: 'Projects', hi: 'परियोजनाएं' },
  work: { en: 'Work', hi: 'कार्य' },
  about: { en: 'About', hi: 'परिचय' },
  writing: { en: 'Writing', hi: 'लेखन' },
  contact: { en: 'Contact', hi: 'संपर्क' },
  currently: { en: 'Currently', hi: 'अभी' },
  education: { en: 'Education', hi: 'शिक्षा' },
} as const;
