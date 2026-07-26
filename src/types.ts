export interface Skill {
  name: string;
  category: "languages" | "frameworks" | "databases" | "devops";
  level: number;
  experienceYears: number;
  icon: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Service {
  title: string;
  desc: string;
  tech: string;
}
