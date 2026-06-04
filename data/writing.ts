import type { WritingPost } from './types';

export const writingPosts: WritingPost[] = [
  {
    id: 'splay-trees-explained',
    title: 'Splay Trees — Why Self-Adjusting BSTs Are Underrated',
    date: '2026-02-10',
    tags: ['algorithms', 'data-structures'],
    excerpt:
      'A deep dive into amortized analysis, rotations, and why splay trees deserve more love in competitive programming.',
    body: null,
    readingTime: '6 min read',
  },
  {
    id: 'zero-downtime-migrations',
    title: 'Zero-Downtime Database Migrations in Production',
    date: '2026-01-28',
    tags: ['backend', 'databases', 'devops'],
    excerpt:
      'Lessons learned from migrating an Aurora PostgreSQL database with zero deltas and zero downtime.',
    body: null,
    readingTime: '5 min read',
  },
  {
    id: 'gamifying-education',
    title: 'Gamifying Education — Lessons from Building SparkyAI',
    date: '2025-12-15',
    tags: ['web-dev', 'ai', 'hackathons'],
    excerpt:
      'How gamification and AI feedback loops can transform the way students approach writing.',
    body: null,
    readingTime: '4 min read',
  },
];

export const writingTags = [
  'all',
  'algorithms',
  'data-structures',
  'backend',
  'databases',
  'devops',
  'web-dev',
  'ai',
  'hackathons',
] as const;
