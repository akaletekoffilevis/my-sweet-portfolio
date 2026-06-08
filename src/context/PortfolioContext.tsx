import React, { createContext, useContext } from "react";
import { JOHN_DOE_PROFILE, SKILLS_DATA, PROJECTS_DATA } from "../data";
import { Skill, Project } from "../types";

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  bio: string;
  phone?: string;
  avatarUrl: string;
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
  addMessage: (msg: { name: string; email: string; subject: string; message: string; whatsapp?: string }) => Promise<any>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const profile = JOHN_DOE_PROFILE;
  const skills = SKILLS_DATA;
  const projects = PROJECTS_DATA;

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
    } catch (err) {
      console.error("API message send failed:", err);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        skills,
        projects,
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
