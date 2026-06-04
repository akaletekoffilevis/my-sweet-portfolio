/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { JOHN_DOE_PROFILE, SKILLS_DATA, PROJECTS_DATA } from "../data";
import { Skill, Project, ApiEndpoint } from "../types";

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  bio: string;
  avatarUrl: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
    gpgKey: string;
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
  theme: "dark" | "light";
  isAdminMode: boolean;
  messages: any[];
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;
  setIsAdminMode: (isAdmin: boolean) => void;
  resetToDefault: () => void;
  updateProfile: (updated: Partial<ProfileData>) => void;
  addSkill: (newSkill: Skill) => void;
  updateSkill: (oldName: string, updatedSkill: Skill) => void;
  deleteSkill: (name: string) => void;
  addProject: (newProject: Project) => void;
  updateProject: (id: string, updatedProject: Project) => void;
  deleteProject: (id: string) => void;
  addMessage: (msg: { name: string; email: string; subject: string; message: string }) => any;
  clearMessages: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem("portfolio_profile");
    return saved ? JSON.parse(saved) : JOHN_DOE_PROFILE;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem("portfolio_skills");
    return saved ? JSON.parse(saved) : SKILLS_DATA;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("portfolio_projects");
    return saved ? JSON.parse(saved) : PROJECTS_DATA;
  });

  const [theme, setThemeState] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("portfolio_theme");
    return (saved as "dark" | "light") || "dark";
  });

  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("portfolio_admin_mode");
    return saved === "true";
  });

  const [messages, setMessages] = useState<any[]>(() => {
    const saved = localStorage.getItem("portfolio_messages");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "sys-seed-1",
        name: "Alexandre Martin",
        email: "alex@techcorp.io",
        subject: "Mission Freelance Go/gRPC",
        message: "Salut John, besoin d'un renfort architecture microservices sur 3 mois denses.",
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
      }
    ];
  });

  // Keep localStorage synced
  useEffect(() => {
    localStorage.setItem("portfolio_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("portfolio_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("portfolio_skills", JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("portfolio_theme", theme);
    // Apply styling class to body / HTML element
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("portfolio_admin_mode", String(isAdminMode));
  }, [isAdminMode]);

  const setTheme = (newTheme: "dark" | "light") => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const resetToDefault = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser toutes les données du portfolio aux valeurs par défaut ?")) {
      setProfile(JOHN_DOE_PROFILE);
      setSkills(SKILLS_DATA);
      setProjects(PROJECTS_DATA);
      localStorage.removeItem("portfolio_profile");
      localStorage.removeItem("portfolio_skills");
      localStorage.removeItem("portfolio_projects");
    }
  };

  const updateProfile = (updated: Partial<ProfileData>) => {
    setProfile((prev) => {
      const copy = { ...prev, ...updated };
      if (updated.socials) {
        copy.socials = { ...prev.socials, ...updated.socials };
      }
      return copy;
    });
  };

  const addSkill = (newSkill: Skill) => {
    setSkills((prev) => [...prev, newSkill]);
  };

  const updateSkill = (oldName: string, updatedSkill: Skill) => {
    setSkills((prev) => prev.map((s) => (s.name === oldName ? updatedSkill : s)));
  };

  const deleteSkill = (name: string) => {
    setSkills((prev) => prev.filter((s) => s.name !== name));
  };

  const addProject = (newProject: Project) => {
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = (id: string, updatedProject: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? updatedProject : p)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const addMessage = (msg: { name: string; email: string; subject: string; message: string }) => {
    const newMessage = {
      ...msg,
      id: "msg-" + Math.floor(Math.random() * 899999 + 100000),
      timestamp: new Date().toISOString()
    };
    setMessages((prev) => [newMessage, ...prev]);
    return newMessage;
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        skills,
        projects,
        theme,
        isAdminMode,
        messages,
        setProfile,
        setSkills,
        setProjects,
        setTheme,
        toggleTheme,
        setIsAdminMode,
        resetToDefault,
        updateProfile,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        addMessage,
        clearMessages,
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
