export type NavItem = {
  href: string;
  label: string;
};

export const navItems: NavItem[] = [
  { href: '/projects', label: 'Projects' },
  { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
];

export const heroContent = {
  intro:
    'Building production RAG systems that ship reliably, fail gracefully, and behave predictably under real load.',
  location: 'Redmond, WA',
};

export const routeLabels = {
  projects: { en: 'Projects', hi: 'परियोजनाएं' },
  work: { en: 'Work', hi: 'कार्य' },
  writing: { en: 'Writing', hi: 'लेखन' },
  contact: { en: 'Contact', hi: 'संपर्क' },
  currently: { en: 'Currently', hi: 'अभी' },
  education: { en: 'Education', hi: 'शिक्षा' },
} as const;
