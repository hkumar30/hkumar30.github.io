export type TeachingItem = {
  role: string;
  organization: string;
  period: string;
  description: string;
  logo: string;
  logoAlt: string;
  screenshot: string;
  screenshotAlt: string;
};

export const teachingIntro =
  'Still learning, sometimes from the front of the room. These days that means a small Code in Place section on Zoom; earlier, it meant rooms at ASU where web dev, algorithms, Git, and beginner CS had to become less intimidating.';

export const teachingItems: TeachingItem[] = [
  {
    role: 'Section Leader',
    organization: 'Stanford Code in Place',
    period: '2025 — 2026',
    description:
      'Led a 10-15 student remote section for Stanford Code in Place, walking Python from problem statement to readable code. The work was less about perfect syntax and more about making errors feel traceable, fixable, and ordinary.',
    logo: '/images/stanford-logo.jpg',
    logoAlt: 'Stanford University logo',
    screenshot: '/images/teaching-code-in-place.png',
    screenshotAlt: 'Harsh leading a Code in Place section on Zoom',
  },
  {
    role: 'Technical Development Director',
    organization: 'Software Developers Association (SoDA), ASU',
    period: '2021 — 2022',
    description:
      'As Technical Development Director for SoDA, I helped lead the technical programming and ran weekly workshops for the ASU community. Competitive programming, web dev, interview prep, tooling, beginner CS — the room mattered because learning felt easier when people showed up together.',
    logo: '/images/ASU-logo.png',
    logoAlt: 'Arizona State University logo',
    screenshot: '/images/teaching-soda-workshops.png',
    screenshotAlt: 'Harsh speaking during a SoDA workshop at ASU',
  },
];
