import type { SocialLink } from './types';

export const profile = {
  name: 'Harsh Kumar',
  descriptor: 'AI Engineer',
  heroImage: '/images/hero-portrait.png',
  aboutShortBio: [
    'I started tinkering with old computers at age five, editing configs and drivers just to get games running on my potato PC.',
    'Today I build production RAG systems and AI infrastructure — the kind that has to hold up when real users depend on it, not just pass a demo.',
  ],
  aboutTeaser:
    'I build AI systems that have to work in production — RAG pipelines, prompt infrastructure, and the tooling that keeps them from quietly going wrong.',
  currently: {
    building: 'Prompt reliability systems and RAG pipelines at Mindspark that handle real traffic without hallucinating.',
    reading: 'Designing Data-Intensive Applications by Kleppmann, and whatever distributed systems paper I can get through on a Sunday.',
    listening: 'Four Tet, Jon Hopkins, and anything that sounds like it was made in a basement at 2am.',
  },
  resumeHref: '/Harsh-Kumar-Resume.pdf',
  email: 'harshku5488@gmail.com',
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/hkumar30' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hkumar30' },
];

export const seo = {
  title: 'Harsh Kumar',
  description:
    'AI Engineer based in Redmond, WA. I build production RAG systems and AI infrastructure that ship reliably.',
  ogDescription: 'AI Engineer — production RAG systems, prompt reliability, and AI infrastructure.',
  siteUrl: 'https://hkumar30.github.io',
  noscript: 'Harsh Kumar — AI Engineer. Enable JavaScript to view this site.',
};
