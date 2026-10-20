export interface Project {
  id: string;
  number: string;
  tagline: string;
  title: string;
  description: string;
  category: 'Featured' | 'Web Apps' | 'AI & ML' | 'Backend' | 'Tools';
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  problem: string;
  solution: string;
  whatILearned: string;
  stats?: { label: string; value: string }[];
  highlights: string[];
  imageSrc?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
}

export interface ContributionItem {
  id: string;
  title: string;
  organization: string;
  type: 'Open Source' | 'Hackathon' | 'Technical Article';
  period: string;
  description: string;
  link?: string;
  metrics?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  points: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
  grade?: string;
}

export interface BuildNote {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  tags: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; proficiency?: string; highlight?: boolean }[];
}

export interface VibePromptBlueprint {
  overallTheme: string;
  colorPalette: {
    name: string;
    hex: string;
    role: string;
    percentage: string;
  }[];
  layoutStructure: string[];
  navigationStyle: string[];
  typographyPreferences: {
    role: string;
    fontFamily: string;
    usage: string;
    weights: string;
  }[];
  keySections: {
    sectionNumber: string;
    title: string;
    purpose: string;
    keyElements: string[];
  }[];
  specificVisualElements: string[];
  targetAudience: string[];
  vibeCodingGuidelines: string[];
}
