export type ProjectCategory = 'frontend' | 'full-stack' | 'open-source';

export type ProjectAward = {
  place: string;
  prize?: string;
  event: string;
};

export type ProjectLinks = {
  live?: string;
  github?: string;
  devpost?: string;
};

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  award: ProjectAward | null;
  links: ProjectLinks;
  featured: boolean;
  categories: ProjectCategory[];
  year: string;
};

export type WritingPost = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  body: string | null;
  readingTime: string;
};

export type WorkExperienceItem = {
  id: string;
  role: string;
  company: string;
  companyLogo: string;
  location: string;
  period: string;
  highlights: string[];
};

export type EducationItem = {
  id: string;
  institution: string;
  logo: string;
  degree: string;
  gpa: string;
  period: string;
  location: string;
  highlights: string[];
};

export type VolunteerItem = {
  id: string;
  role: string;
  organization: string;
  logo: string;
  period: string;
  highlights: string[];
};

export type SkillRow = {
  id: string;
  direction: 'left' | 'right';
  skills: string[];
};

export type SocialLink = {
  label: string;
  href: string;
};
