// Define types for education and experience data

export interface Background {
  image: string;
  isParallax?: boolean;
  isAnimated?: boolean;
}

export interface AcademicItem {
  degree: string;
  fieldOfStudy: string;
  school: string;
  dateRange: string;
  tags: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
}

export interface EducationData {
  heading: string;
  subheading: string;
  background?: Background;
  academics: AcademicItem[];
  certifications: CertificationItem[];
}

export interface HeroData {
  heading: string;
  greeting: string;
  titles: string[];
  scrollText: string;
  flipAnimationDuration: number;
  titleChangeInterval: number;
  backgroundImage?: string;
  background?: Background;
}

export interface ExperienceData {
  heading: string;
  subheading: string;
  jobs: JobItem[];
  background?: Background;
}

export interface JobItem {
  title: string;
  company: string;
  employmentType: string;
  dateRange: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface AboutItem {
  heading: string;
  subheading: string;
  imageUrl: string;
  contactButtonText: string;
  resumeUrl: string;
  resumeButtonText: string;
  titleTags: string[];
  aboutContent: string;
  linkedin?: string;
  github?: string;
  codepen?: string;
  whatsappNumber?: string;
  whatsappMessage?: string;
}

export interface SkillItem {
  title: string;
  percentage: number;
  subtitle: string;
  description?: string;
  iconSrc?: string;
}

export interface SkillsData {
  heading: string;
  subheading: string;
  items: SkillItem[];
}

export interface SeoData {
  title: string;
  description: string;
  keywords: string;
  author: string;
  ogImage: string;
  twitterHandle: string;
}

export interface ContactData {
  heading: string;
  subheading: string;
  getInTouchHeading: string;
  getInTouchText: string;
  email: string;
  phone?: string;
  location?: string;
  formLabels: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  formButtons: {
    submit: string;
    sending: string;
  };
  formMessages: {
    success: {
      title: string;
      text: string;
    };
    error: {
      title: string;
      text: string;
    };
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isHidden?: boolean;
}
// Define the context type
export interface DataContextType {
  navigation: NavigationItem[];
  education: EducationData;
  experience: ExperienceData;
  about: AboutItem;
  hero: HeroData;
  skills: SkillItem[];
  skillsSection?: SkillsData;
  contact: ContactData;
  seo: SeoData;
  loading: boolean;
  error: string | null;
} 