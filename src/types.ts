export interface Skill {
  name: string;
  category: "languages" | "frameworks" | "databases" | "devops";
  level: number;
  experienceYears: number;
  icon: string;
  description: string;
}

export type ProjectCategory = "web" | "api" | "outils" | "desktop";

export interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  techStack: string[];
  category?: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
}

export interface Service {
  title: string;
  desc: string;
  tech: string;
  icon?: string;
}

export interface Certification {
  id: string;
  issuer: string;
  title: string;
  date: string;
  kind: "image" | "pdf";
  file: string;
  url?: string;
}
