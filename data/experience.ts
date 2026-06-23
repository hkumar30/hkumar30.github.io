import type { EducationItem, WorkExperienceItem } from './types';

export const workExperience: WorkExperienceItem[] = [
  {
    id: 'mindspark-ai',
    role: 'AI Engineer',
    company: 'Mindspark',
    companyLogo: '/images/mindspark-logo.png',
    location: 'Remote',
    period: 'Aug 2025 - Present',
    highlights: [
      'Engineered a zero-downtime production data migration for the Kairos Aurora PostgreSQL database with 0 deltas across 18 tables.',
      'Built and refined prompts used by six different OpenAI models, raising system reliability to 95%.',
      'Authored the Migration Runbook and automated end-to-end deployment via CI/CD pipelines.',
      'Delivered scalable React components integrated with the existing CMS, improving user retention by 18%.',
      'Integrated REST APIs on AWS Lambda into distributed front-end workflows, reducing load times by 35%.',
    ],
  },
  {
    id: 'velocity',
    role: 'Full-Stack Engineer Intern',
    company: 'Velocity Tech Inc.',
    companyLogo: '/images/velocity-tech-logo.png',
    location: 'Remote',
    period: 'Jan 2024 - Dec 2024',
    highlights: [
      'Delivered ERP Contract Management System to streamline contractor hiring pipeline.',
      'Automated resume parsing with Express + OpenAI API, reducing manual data entry by 60%.',
      'Designed scalable PostgreSQL + Amazon S3 integration for secure document storage.',
    ],
  },
];

export const education: EducationItem[] = [
  {
    id: 'asu',
    institution: 'Arizona State University',
    logo: '/images/ASU-logo.png',
    degree: 'Bachelor of Science in Computer Science',
    gpa: '4.0',
    period: 'Aug 2021 - May 2025',
    location: 'Tempe, AZ',
    highlights: ['Moeur Award Recipient', "Dean's List - eight consecutive semesters"],
  },
];

