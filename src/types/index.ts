export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  avatar?: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface WhatIBring {
  id: string;
  title: string;
  description: string;
  icon: string;
  algorithm: string;
  tech: string[];
}

export interface Language {
  id: string;
  name: string;
  description: string;
  icon: string;
  useCase: string;
  yearsOfExp: number;
}

export interface Framework {
  id: string;
  name: string;
  description: string;
  icon: string;
  performance: string;
  bestFor: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  whyCool: string;
}

export interface Algorithm {
  id: string;
  name: string;
  description: string;
  complexity: string;
  realWorldUse: string;
  implemented: boolean;
}

export interface TechStack {
  languages: Language[];
  frameworks: Framework[];
  tools: Tool[];
  algorithms: Algorithm[];
}

export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  icon: string;
  pricing?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
  status?: "unread" | "read" | "replied";
}

export interface LanguageOption {
  code: "es" | "en";
  name: string;
  flag: string;
}

export interface Translation {
  [key: string]: {
    es: string;
    en: string;
  };
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface AnimationVariants {
  initial?: object;
  animate?: object;
  exit?: object;
  transition?: object;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error?: string;
}

export interface ThemeState {
  isDark: boolean;
  toggle: () => void;
}

export interface LanguageState {
  currentLanguage: LanguageOption["code"];
  setLanguage: (lang: LanguageOption["code"]) => void;
  t: (key: string) => string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: Education[];
  whatIBring: WhatIBring[];
  techStack: TechStack;
  projects: Project[];
  services?: Service[];
  socialLinks: SocialLink[];
}
