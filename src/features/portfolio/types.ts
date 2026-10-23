export interface Profile {
  name: string;
  initials: string;
  role: string;
  location: string;
  timezone: string;
  email: string;
  available: boolean;
  availability: string;
  headline: [string, string];
  introduction: string;
  about: string[];
  interests: string[];
  currently: string;
  cv: { url: string | null; filename: string };
  socials: {
    label: string;
    url: string;
    icon: 'github' | 'linkedin' | 'website';
  }[];
}

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  year: string;
  role: string;
  tags: string[];
  image: string | null;
  links: { live: string | null; source: string | null };
  overview: string;
  highlights: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  current: boolean;
  description: string;
  tags: string[];
}

export interface Education {
  id: string;
  qualification: string;
  institution: string;
  location: string;
  period?: string | null;
}

export interface PortfolioData {
  profile: Profile;
  education?: Education[];
  projectDisplay?: { initialCount: number; increment: number };
  projects: Project[];
  expertise: {
    title: string;
    description: string;
    icon: 'code' | 'server' | 'cloud' | 'sparkles';
    skills: string[];
  }[];
  experience: Experience[];
  contact: { heading: string; description: string; subject: string };
}

export interface PortfolioResponse {
  success: true;
  data: PortfolioData;
}
