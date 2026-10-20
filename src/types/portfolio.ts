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
  stats?: { label: string; value: string }[];
  type: 'finpilot' | 'rag' | 'orvexa' | 'standard';
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  points: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
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
