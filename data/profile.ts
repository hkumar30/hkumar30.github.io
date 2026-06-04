import type { SocialLink } from './types';

export const profile = {
  name: 'Harsh Kumar',
  descriptor: 'Frontend & full-stack developer. Building things that feel human.',
  legacyTitles: ['Cloud Developer', 'Fullstack Developer', 'C++ Developer'],
  bioParagraphs: [
    'My journey as a developer began at age five — tinkering with old computers, installing drivers, and editing configuration files to make games work on my "potato" PC. I fell in love with customization and, by ten, was already dreaming of building my own games.',
    'That curiosity became a passion for programming. Today, I build modern web apps, specialize in backend engineering, and love diving into the theoretical side of computer science. Solving algorithmic problems, optimizing code, and exploring proofs and complexities are what keep me up at night.',
  ],
  role: {
    title: 'AI Engineer',
    company: 'Mindspark',
    companyLogo: '/images/mindspark-logo.png',
    impact: ['6 prompting systems', '95% reliability'],
  },
  pullQuote:
    'My journey as a developer began at age five — tinkering with old computers, installing drivers, and editing configuration files to make games work on my "potato" PC.',
  aboutTeaser:
    'I build modern web apps, specialize in backend engineering, and love diving into the theoretical side of computer science.',
  aboutTeaserSecondary:
    'Solving algorithmic problems, optimizing code, and exploring proofs and complexities are what keep me up at night.',
  currently: {
    building:
      'Prompting systems and reliability tooling for production AI workflows at Mindspark.',
    reading: 'Research papers and long-form essays on algorithms, complexity, and distributed systems.',
    listening: 'Lo-fi focus playlists, ambient instrumentals, and interviews with builders.',
  },
  resumeHref: '/Harsh-Kumar-Resume.pdf',
  contactIntro:
    "Have a question, an idea, or just want to chat? Drop me a message and I'll get back to you.",
  availabilityLabelPrefix: 'Available for work —',
  email: 'harshku5488@gmail.com',
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/hkumar30' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hkumar30' },
  { label: 'Email', href: 'mailto:harshku5488@gmail.com' },
];

export const seo = {
  title: 'Harsh Kumar - Portfolio',
  description:
    'Harsh Kumar - Developer. Building modern web apps, backend systems, and diving deep into computer science.',
  ogDescription: 'Developer portfolio - web apps, backend engineering, and CS projects.',
  siteUrl: 'https://hkumar30.github.io',
  noscript: 'Harsh Kumar - Developer Portfolio. Enable JavaScript to view this site.',
};
