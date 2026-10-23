export type NavItem = {
  href: string;
  label: string;
  labelHi: string;
};

export const navItems: NavItem[] = [
  { href: '/projects', label: 'Projects', labelHi: 'परियोजनाएं' },
  { href: '/work', label: 'Work', labelHi: 'कार्य' },
  { href: '/contact', label: 'Contact', labelHi: 'संपर्क' },
];

export const heroContent = {
  intro:
    'Building production RAG systems that ship reliably, fail gracefully, and behave predictably under real load.',
};

export const routeLabels = {
  projects: { en: 'Projects', hi: 'परियोजनाएं' },
  work: { en: 'Work', hi: 'कार्य' },
  writing: { en: 'Writing', hi: 'लेखन' },
  contact: { en: 'Contact', hi: 'संपर्क' },
  currently: { en: 'Currently', hi: 'अभी' },
  education: { en: 'Education', hi: 'शिक्षा' },
} as const;
