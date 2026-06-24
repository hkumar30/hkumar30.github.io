export type TeachingItem = {
  role: string;
  organization: string;
  period: string;
  description: string;
  logo: string;
  /** Optional theme-specific variant shown in blue/dark mode (e.g. white knockout). */
  logoDark?: string;
  logoAlt: string;
  screenshot: string;
  screenshotAlt: string;
};

export const teachingIntro =
  'Still learning, sometimes from the front of the room. These days that means a small Code in Place section on Zoom; earlier, it meant classrooms at ASU where the goal was to make web dev, algorithms, Git, and beginner CS less intimidating.';

export const teachingItems: TeachingItem[] = [
  {
    role: 'Section Leader',
    organization: 'Stanford Code in Place',
    period: '2025 - 2026',
    description:
      'Led a 10-15 student remote section for Stanford Code in Place, walking Python from problem statement to readable code. Main focus on making decisions under uncertainty and treating bugs as information, not just perfect syntax.',
    logo: '/images/stanford-logo.svg',
    logoAlt: 'Stanford University wordmark',
    screenshot: '/images/teaching-code-in-place.png',
    screenshotAlt: 'Harsh leading a Code in Place section on Zoom',
  },
  {
    role: 'Technical Development Director',
    organization: 'Software Developers Association (SoDA), ASU',
    period: '2021 - 2022',
    description:
      'As Technical Development Director for SoDA, I led a team of 5 to design and run weekly workshops for 90-100 ASU students - competitive programming, web dev, interview prep, tooling, beginner CS - and ran live coding sessions for our Leetcode meetings. I also spearheaded the 2022 Annual Coding Bootcamp, a 2-hour hands-on seminar in Kotlin, XML, and Android Studio for 150 participants, where 92% successfully built and deployed their first Android app."',
    logo: '/images/asu-logo.svg',
    logoDark: '/images/asu-logo-dark.svg',
    logoAlt: 'Arizona State University logo',
    screenshot: '/images/teaching-soda-workshops.png',
    screenshotAlt: 'Harsh speaking during a SoDA workshop at ASU',
  },
];
