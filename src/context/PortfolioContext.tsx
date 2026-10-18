import React, { createContext, useContext } from "react";
import * as DATA_FR from "../data";
import * as DATA_EN from "../data.en";
import { useLang } from "../i18n";
import { Skill, Project, Service, Certification, TimelineEntry, MethodStep, SoftSkill } from "../types";

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  bio: string;
  phone?: string;
  avatarUrl: string;
  certUrl?: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
    whatsapp?: string;
  };
  metrics: {
    label: string;
    value: string;
    desc: string;
  }[];
}

interface PortfolioContextType {
  profile: ProfileData;
  skills: Skill[];
  projects: Project[];
  services: Service[];
  certifications: Certification[];
  timeline: TimelineEntry[];
  method: MethodStep[];
  softSkills: SoftSkill[];
  addMessage: (msg: { name: string; email: string; subject: string; message: string; whatsapp?: string }) => Promise<any>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();
  const data = lang === "fr" ? DATA_FR : DATA_EN;
  const profile = data.PROFILE_DATA;
  const skills = data.SKILLS_DATA;
  const projects = data.PROJECTS_DATA;
  const services = data.SERVICES_DATA;
  const certifications = data.CERTS_DATA;
  const timeline = data.TIMELINE_DATA;
  const method = data.METHOD_DATA;
  const softSkills = data.SOFT_SKILLS_DATA;

  const addMessage = async (msg: { name: string; email: string; subject: string; message: string; whatsapp?: string }) => {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg)
      });
      const data = await response.json();
      if (data.success && data.data) {
        return data.data;
      }
    } catch {
      // silent
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        skills,
        projects,
        services,
        certifications,
        timeline,
        method,
        softSkills,
        addMessage,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
