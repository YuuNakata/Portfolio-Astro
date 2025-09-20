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

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  metrics?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'programming' | 'database' | 'framework' | 'tool' | 'language';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
  status?: 'unread' | 'read' | 'replied';
}

export interface Language {
  code: 'es' | 'en';
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
  currentLanguage: Language['code'];
  setLanguage: (lang: Language['code']) => void;
  t: (key: string) => string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: Education[];
  achievements: Achievement[];
  skills: Skill[];
  projects: Project[];
  socialLinks: SocialLink[];
}
