import type { SocialLink } from './types';

export const profile = {
  name: 'Harsh Kumar',
  descriptor: 'AI Engineer',
  heroImage: '/images/hero-portrait.png',
  aboutShortBio: [
    'I started tinkering with old computers at age five, editing configs and drivers just to get games running on my potato PC.',
    'Today I build modern web apps, specialize in backend engineering, and enjoy algorithmic and systems-heavy work.',
  ],
  aboutTeaser:
    'I build modern web apps, specialize in backend engineering, and love diving into the theoretical side of computer science.',
  currently: {
    building:
      'Prompting systems and reliability tooling for production AI workflows at Mindspark.',
    reading: 'Research papers and long-form essays on algorithms, complexity, and distributed systems.',
    listening: 'Lo-fi focus playlists, ambient instrumentals, and interviews with builders.',
  },
  resumeHref: '/Harsh-Kumar-Resume.pdf',
  email: 'harshku5488@gmail.com',
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/hkumar30' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hkumar30' },
];

export const seo = {
  title: 'Harsh Kumar - Portfolio',
  description:
    'Harsh Kumar - Developer. Building modern web apps, backend systems, and diving deep into computer science.',
  ogDescription: 'Developer portfolio - web apps, backend engineering, and CS projects.',
  siteUrl: 'https://hkumar30.github.io',
  noscript: 'Harsh Kumar - Developer Portfolio. Enable JavaScript to view this site.',
};
