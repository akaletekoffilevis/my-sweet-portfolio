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
  isCvModalOpen: boolean;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setTheme: (theme: "dark" | "light") => void;
  toggleTheme: () => void;
  setIsAdminMode: (isAdmin: boolean) => void;
  setIsCvModalOpen: (isOpen: boolean) => void;
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
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name === "John Doe" || !parsed.name) {
          return JOHN_DOE_PROFILE;
        }
        return parsed;
      } catch (e) {
        return JOHN_DOE_PROFILE;
      }
    }
    return JOHN_DOE_PROFILE;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const savedProfile = localStorage.getItem("portfolio_profile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        if (parsedProfile.name === "John Doe" || !parsedProfile.name) {
          return SKILLS_DATA;
        }
      } catch (e) {}
    }
    const saved = localStorage.getItem("portfolio_skills");
    return saved ? JSON.parse(saved) : SKILLS_DATA;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProfile = localStorage.getItem("portfolio_profile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        if (parsedProfile.name === "John Doe" || !parsedProfile.name) {
          return PROJECTS_DATA;
        }
      } catch (e) {}
    }
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

  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);

  const [messages, setMessages] = useState<any[]>(() => {
    const saved = localStorage.getItem("portfolio_messages");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: "sys-seed-1",
        name: "Marc Dubreuil",
        email: "marc.d@techstartups.com",
        subject: "Poste de Développeur Fullstack Junior",
        message: "Bonjour Koffi, j'ai vu votre portfolio en ligne. Votre profil de développeur junior nous intéresse beaucoup pour notre équipe produit.",
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
      }
    ];
  });

  // Load all records from actual SQLite DB on mount
  useEffect(() => {
    async function loadPortfolioFromSQLite() {
      try {
        const response = await fetch("/api/portfolio");
        const json = await response.json();
        if (json.success) {
          if (json.profile) setProfile(json.profile);
          if (json.skills) setSkills(json.skills);
          if (json.projects) setProjects(json.projects);
        }
      } catch (err) {
        console.warn("Could not load from SQLite API. Running with local fallback.", err);
      }
    }
    loadPortfolioFromSQLite();
  }, []);

  // Sync messages list dynamically when admin connects
  useEffect(() => {
    async function loadMessagesFromSQLite() {
      if (!isAdminMode) return;
      try {
        const response = await fetch("/api/messages");
        const json = await response.json();
        if (json.success && json.messages) {
          setMessages(json.messages);
        }
      } catch (err) {
        console.warn("Could not load messages from SQLite", err);
      }
    }
    loadMessagesFromSQLite();
  }, [isAdminMode]);

  // Keep LocalStorage synced as robust offline/resilient storage
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

  const resetToDefault = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser toutes les données du portfolio aux valeurs par défaut ?")) {
      setProfile(JOHN_DOE_PROFILE);
      setSkills(SKILLS_DATA);
      setProjects(PROJECTS_DATA);
      localStorage.removeItem("portfolio_profile");
      localStorage.removeItem("portfolio_skills");
      localStorage.removeItem("portfolio_projects");
      
      // Update SQLite DB
      try {
        await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(JOHN_DOE_PROFILE)
        });
      } catch (e) {
        console.error("Failed to reset DB profile to default", e);
      }
    }
  };

  const updateProfile = async (updated: Partial<ProfileData>) => {
    const nextProfile = { ...profile, ...updated };
    if (updated.socials) {
      nextProfile.socials = { ...profile.socials, ...updated.socials };
    }
    setProfile(nextProfile);

    try {
      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextProfile)
      });
    } catch (err) {
      console.error("SQLite profile update request failed:", err);
    }
  };

  const addSkill = async (newSkill: Skill) => {
    setSkills((prev) => [...prev, newSkill]);
    try {
      await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkill)
      });
    } catch (err) {
      console.error("SQLite skill insert failed:", err);
    }
  };

  const updateSkill = async (oldName: string, updatedSkill: Skill) => {
    setSkills((prev) => prev.map((s) => (s.name === oldName ? updatedSkill : s)));
    try {
      await fetch(`/api/skills/${encodeURIComponent(oldName)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSkill)
      });
    } catch (err) {
      console.error("SQLite skill update failed:", err);
    }
  };

  const deleteSkill = async (name: string) => {
    setSkills((prev) => prev.filter((s) => s.name !== name));
    try {
      await fetch(`/api/skills/${encodeURIComponent(name)}`, {
        method: "DELETE"
      });
    } catch (err) {
      console.error("SQLite skill delete failed:", err);
    }
  };

  const addProject = async (newProject: Project) => {
    setProjects((prev) => [...prev, newProject]);
    try {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProject,
          techStack: newProject.techStack.join(", ")
        })
      });
    } catch (err) {
      console.error("SQLite project insert failed:", err);
    }
  };

  const updateProject = async (id: string, updatedProject: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? updatedProject : p)));
    try {
      await fetch(`/api/projects/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedProject,
          techStack: updatedProject.techStack.join(", ")
        })
      });
    } catch (err) {
      console.error("SQLite project update failed:", err);
    }
  };

  const deleteProject = async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    try {
      await fetch(`/api/projects/${encodeURIComponent(id)}`, {
        method: "DELETE"
      });
    } catch (err) {
      console.error("SQLite project delete failed:", err);
    }
  };

  const addMessage = async (msg: { name: string; email: string; subject: string; message: string }) => {
    const tempId = "msg-" + Math.floor(Math.random() * 899999 + 100000);
    const mockMsg = { ...msg, id: tempId, timestamp: new Date().toISOString() };
    
    // Add optimism local state
    setMessages((prev) => [mockMsg, ...prev]);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg)
      });
      const data = await response.json();
      if (data.success && data.data) {
        setMessages((prev) => prev.map(m => m.id === tempId ? data.data : m));
        return data.data;
      }
    } catch (err) {
      console.error("SQLite direct save failed, staying fallback:", err);
    }
    return mockMsg;
  };

  const clearMessages = async () => {
    setMessages([]);
    try {
      await fetch("/api/messages", {
        method: "DELETE"
      });
    } catch (err) {
      console.error("SQLite message clearing failed:", err);
    }
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
        isCvModalOpen,
        setProfile,
        setSkills,
        setProjects,
        setTheme,
        toggleTheme,
        setIsAdminMode,
        setIsCvModalOpen,
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
