/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Skill, Project, ArchitectureComponent } from "../types";
import { 
  User, 
  Layers, 
  Cpu, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  RotateCcw, 
  X, 
  ShieldAlert, 
  Check, 
  PlusCircle, 
  Network, 
  Layout, 
  Sun, 
  Moon,
  Info
} from "lucide-react";

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const {
    profile,
    skills,
    projects,
    theme,
    setTheme,
    resetToDefault,
    updateProfile,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<"profile" | "skills" | "projects">("profile");

  // Profile Temp State
  const [profileForm, setProfileForm] = useState({
    name: profile.name,
    title: profile.title,
    location: profile.location,
    bio: profile.bio,
    github: profile.socials.github,
    linkedin: profile.socials.linkedin,
    email: profile.socials.email,
    gpgKey: profile.socials.gpgKey,
    metric0: profile.metrics[0] || { label: "", value: "", desc: "" },
    metric1: profile.metrics[1] || { label: "", value: "", desc: "" },
    metric2: profile.metrics[2] || { label: "", value: "", desc: "" },
    metric3: profile.metrics[3] || { label: "", value: "", desc: "" },
  });

  // Skills Temp State
  const [editingSkillName, setEditingSkillName] = useState<string | null>(null);
  const [skillForm, setSkillForm] = useState<Skill>({
    name: "",
    category: "languages",
    level: 80,
    experienceYears: 3,
    icon: "Cpu",
    description: ""
  });

  // Projects Temp State
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Project>({
    id: "",
    title: "",
    period: "",
    shortDescription: "",
    fullDescription: "",
    techStack: [],
    metrics: [],
    architectureSummary: "",
    architectureDiagram: [],
    challenges: []
  });

  // Temp string inputs for array tags in project
  const [techInput, setTechInput] = useState("");
  const [metricLabel, setMetricLabel] = useState("");
  const [metricVal, setMetricVal] = useState("");
  const [challengeInput, setChallengeInput] = useState("");

  // Temp input for architecture diagram node
  const [nodeForm, setNodeForm] = useState<{
    id: string;
    title: string;
    subtitle: string;
    type: "gateway" | "service" | "cache" | "database" | "queue" | "client";
    description: string;
    metric?: string;
    connections: string;
  }>({
    id: "",
    title: "",
    subtitle: "",
    type: "service",
    description: "",
    metric: "",
    connections: ""
  });

  // --- Actions ---

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileForm.name,
      title: profileForm.title,
      location: profileForm.location,
      bio: profileForm.bio,
      socials: {
        github: profileForm.github,
        linkedin: profileForm.linkedin,
        email: profileForm.email,
        gpgKey: profileForm.gpgKey
      },
      metrics: [
        profileForm.metric0,
        profileForm.metric1,
        profileForm.metric2,
        profileForm.metric3
      ]
    });
    alert("Profil sauvegardé et synchronisé avec succès !");
  };

  const handleAddOrUpdateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name.trim()) return;

    if (editingSkillName) {
      updateSkill(editingSkillName, skillForm);
      setEditingSkillName(null);
      alert("Compétence mise à jour !");
    } else {
      if (skills.some(s => s.name.toLowerCase() === skillForm.name.toLowerCase())) {
        alert("Une compétence portant ce nom existe déjà.");
        return;
      }
      addSkill(skillForm);
      alert("Nouvelle compétence ajoutée !");
    }

    // Reset Form
    setSkillForm({
      name: "",
      category: "languages",
      level: 80,
      experienceYears: 3,
      icon: "Cpu",
      description: ""
    });
  };

  const handleEditSkillClick = (skill: Skill) => {
    setEditingSkillName(skill.name);
    setSkillForm(skill);
  };

  const handleDeleteSkillClick = (name: string) => {
    if (window.confirm(`Voulez-vous vraiment supprimer "${name}" ?`)) {
      deleteSkill(name);
    }
  };

  // -- Project operations --

  const handleAddTechTag = () => {
    if (techInput.trim() && !projectForm.techStack.includes(techInput.trim())) {
      setProjectForm(prev => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()]
      }));
      setTechInput("");
    }
  };

  const handleRemoveTechTag = (tag: string) => {
    setProjectForm(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tag)
    }));
  };

  const handleAddProjMetric = () => {
    if (metricLabel.trim() && metricVal.trim()) {
      setProjectForm(prev => ({
        ...prev,
        metrics: [...prev.metrics, { label: metricLabel.trim(), value: metricVal.trim() }]
      }));
      setMetricLabel("");
      setMetricVal("");
    }
  };

  const handleRemoveProjMetric = (idx: number) => {
    setProjectForm(prev => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== idx)
    }));
  };

  const handleAddProjChallenge = () => {
    if (challengeInput.trim()) {
      setProjectForm(prev => ({
        ...prev,
        challenges: [...prev.challenges, challengeInput.trim()]
      }));
      setChallengeInput("");
    }
  };

  const handleRemoveProjChallenge = (idx: number) => {
    setProjectForm(prev => ({
      ...prev,
      challenges: prev.challenges.filter((_, i) => i !== idx)
    }));
  };

  // Node Diagram logic
  const handleAddNode = () => {
    if (!nodeForm.id.trim() || !nodeForm.title.trim()) {
      alert("ID Nodule et Titre requis");
      return;
    }
    const connectionsArray = nodeForm.connections
      ? nodeForm.connections.split(",").map(c => c.trim()).filter(Boolean)
      : [];
    
    const newNode: ArchitectureComponent = {
      id: nodeForm.id.trim(),
      title: nodeForm.title.trim(),
      subtitle: nodeForm.subtitle.trim(),
      type: nodeForm.type,
      description: nodeForm.description.trim(),
      connections: connectionsArray
    };
    if (nodeForm.metric?.trim()) {
      newNode.metric = nodeForm.metric.trim();
    }

    setProjectForm(prev => {
      // Avoid duplicate IDs
      const filtered = prev.architectureDiagram.filter(n => n.id !== newNode.id);
      return {
        ...prev,
        architectureDiagram: [...filtered, newNode]
      };
    });

    // Reset node form
    setNodeForm({
      id: "",
      title: "",
      subtitle: "",
      type: "service",
      description: "",
      metric: "",
      connections: ""
    });
  };

  const handleRemoveNode = (nodeId: string) => {
    setProjectForm(prev => ({
      ...prev,
      architectureDiagram: prev.architectureDiagram.filter(n => n.id !== nodeId)
    }));
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.id.trim() || !projectForm.title.trim()) {
      alert("ID unique et Titre projet requis.");
      return;
    }

    if (editingProjectId) {
      updateProject(editingProjectId, projectForm);
      setEditingProjectId(null);
      alert("Projet d'ingénierie mis à jour !");
    } else {
      if (projects.some(p => p.id === projectForm.id)) {
        alert("Un projet avec cet ID unique existe déjà.");
        return;
      }
      addProject(projectForm);
      alert("Nouveau projet d'ingénierie ajouté !");
    }

    // Reset
    setProjectForm({
      id: "",
      title: "",
      period: "",
      shortDescription: "",
      fullDescription: "",
      techStack: [],
      metrics: [],
      architectureSummary: "",
      architectureDiagram: [],
      challenges: []
    });
  };

  const handleEditProjectClick = (proj: Project) => {
    setEditingProjectId(proj.id);
    setProjectForm(proj);
  };

  const handleDeleteProjectClick = (id: string) => {
    if (window.confirm(`Sûr de vouloir supprimer le projet ID: "${id}" ?`)) {
      deleteProject(id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-md flex justify-end select-none">
      <div className="w-full max-w-4xl bg-app-card text-app-text-main h-full flex flex-col border-l border-app-border-strong shadow-2xl transition duration-300">
        
        {/* Header workspace */}
        <div className="p-4 px-6 border-b border-app-border-sec bg-app-card-sec flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-app-text-white/5 border border-app-border-strong">
              <Layout className="h-5 w-5 text-app-text-white" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-app-text-white tracking-wide uppercase flex items-center gap-2">
                Console d'administration
                <span className="text-[9px] font-mono font-bold bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 px-1.5 py-[1px]">DYNAMIQUE</span>
              </h2>
              <p className="text-[10px] font-mono text-app-text-muted uppercase tracking-widest mt-0.5">Edit State Engine / LocalStorage Persisted</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle inside Admin */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-app-text-white/5 cursor-pointer border border-app-border-subtle hover:border-app-border-strong text-app-text-white flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider"
              title="Changer de thème"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-3.5 w-3.5" /> Thème Clair
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5" /> Thème Sombre
                </>
              )}
            </button>

            {/* Reset Defaults button */}
            <button
              onClick={resetToDefault}
              className="px-2.5 py-1.5 border border-red-500/30 hover:border-red-500 hover:bg-red-500/5 text-red-400 font-mono text-[9px] uppercase tracking-widest flex items-center gap-1 transition cursor-pointer font-bold"
              title="Effacer le stockage personnalisé"
            >
              <RotateCcw className="h-3 w-3" />
              Réinitialiser
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-app-text-white/5 rounded-none text-app-text-muted hover:text-app-text-white border border-app-border-subtle cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Navigation Rails */}
        <div className="flex bg-app-card-sec border-b border-app-border-subtle font-mono text-[10px] tracking-wider uppercase select-none">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-3 text-center border-b-2 font-bold cursor-pointer ${
              activeTab === "profile"
                ? "border-app-text-white text-app-text-white bg-app-card"
                : "border-transparent text-app-text-muted hover:text-app-text-white hover:bg-app-text-white/[0.01]"
            }`}
          >
            <User className="h-3.5 w-3.5 inline mr-1.5" /> 01_PROFIL
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`flex-1 py-3 text-center border-b-2 font-bold cursor-pointer ${
              activeTab === "skills"
                ? "border-app-text-white text-app-text-white bg-app-card"
                : "border-transparent text-app-text-muted hover:text-app-text-white hover:bg-app-text-white/[0.01]"
            }`}
          >
            <Cpu className="h-3.5 w-3.5 inline mr-1.5" /> 02_COMPÉTENCES
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 py-3 text-center border-b-2 font-bold cursor-pointer ${
              activeTab === "projects"
                ? "border-app-text-white text-app-text-white bg-app-card"
                : "border-transparent text-app-text-muted hover:text-app-text-white hover:bg-app-text-white/[0.01]"
            }`}
          >
            <Layers className="h-3.5 w-3.5 inline mr-1.5" /> 03_PROJETS_INGÉNIERIE
          </button>
        </div>

        {/* Scrollable Work area selection */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 select-text">
          
          {/* PROFILE EDITOR */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="bg-[#22c55e]/5 border border-[#22c55e]/20 p-4 font-mono text-[11px] leading-relaxed flex items-start gap-2.5 text-app-text-main">
                <Info className="h-4.5 w-4.5 text-[#22c55e] shrink-0 mt-0.5" />
                <span>
                  Modifiez les informations d'identité du portfolio. Les changements s'appliqueront instantanément sur la page principale et sur la console API interactive !
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">Nom Complet</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm(v => ({ ...v, name: e.target.value }))}
                    className="w-full bg-app-card-sec border border-app-border-strong text-app-text-white px-3.5 py-2 text-xs font-mono rounded-none focus:outline-none focus:border-app-text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">Titre Professionnel</label>
                  <input
                    type="text"
                    required
                    value={profileForm.title}
                    onChange={(e) => setProfileForm(v => ({ ...v, title: e.target.value }))}
                    className="w-full bg-app-card-sec border border-app-border-strong text-app-text-white px-3.5 py-2 text-xs font-mono rounded-none focus:outline-none focus:border-app-text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">Localisation géographique</label>
                <input
                  type="text"
                  required
                  value={profileForm.location}
                  onChange={(e) => setProfileForm(v => ({ ...v, location: e.target.value }))}
                  className="w-full bg-app-card-sec border border-app-border-strong text-app-text-white px-3.5 py-2 text-xs font-mono rounded-none focus:outline-none focus:border-app-text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">Texte de biographie / Manifesto</label>
                <textarea
                  rows={4}
                  required
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm(v => ({ ...v, bio: e.target.value }))}
                  className="w-full bg-app-card-sec border border-app-border-strong text-app-text-white px-3.5 py-2 text-xs font-sans rounded-none focus:outline-none focus:border-app-text-white leading-relaxed"
                />
              </div>

              <div className="border-t border-app-border-subtle pt-5 space-y-4">
                <h4 className="font-mono text-[11px] text-app-text-white uppercase tracking-widest font-bold">// Coordonnées & Réseaux</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">Email professionnel</label>
                    <input
                      type="email"
                      required
                      value={profileForm.email}
                      onChange={(e) => setProfileForm(v => ({ ...v, email: e.target.value }))}
                      className="w-full bg-app-card-sec border border-app-border-strong text-app-text-white px-3.5 py-2 text-xs font-mono rounded-none focus:outline-none focus:border-app-text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">Lien GitHub</label>
                    <input
                      type="url"
                      required
                      value={profileForm.github}
                      onChange={(e) => setProfileForm(v => ({ ...v, github: e.target.value }))}
                      className="w-full bg-app-card-sec border border-app-border-strong text-app-text-white px-3.5 py-2 text-xs font-mono rounded-none focus:outline-none focus:border-app-text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">Lien LinkedIn</label>
                    <input
                      type="url"
                      required
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm(v => ({ ...v, linkedin: e.target.value }))}
                      className="w-full bg-app-card-sec border border-app-border-strong text-app-text-white px-3.5 py-2 text-xs font-mono rounded-none focus:outline-none focus:border-app-text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">Signature / Empreinte Clé GPG</label>
                    <input
                      type="text"
                      required
                      value={profileForm.gpgKey}
                      onChange={(e) => setProfileForm(v => ({ ...v, gpgKey: e.target.value }))}
                      className="w-full bg-app-card-sec border border-[#ff3366]/20 text-app-text-white px-3.5 py-2 text-xs font-mono bg-[#ff3366]/2 tracking-widest rounded-none focus:outline-none focus:border-app-text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Metrics */}
              <div className="border-t border-app-border-subtle pt-5 space-y-4">
                <h4 className="font-mono text-[11px] text-app-text-white uppercase tracking-widest font-bold">// Indicateurs de Performance (4 Cases Bio)</h4>
                
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="bg-app-card-sec border border-app-border-subtle p-4 space-y-3">
                    <span className="font-mono text-[9px] text-[#22c55e] font-bold">INDICATEUR_#0{idx + 1}</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-app-text-muted uppercase tracking-wider">Libellé</label>
                        <input
                          type="text"
                          required
                          value={(profileForm as any)[`metric${idx}`].label}
                          onChange={(e) => {
                            const val = e.target.value;
                            setProfileForm(v => ({
                              ...v,
                              [`metric${idx}`]: { ...(v as any)[`metric${idx}`], label: val }
                            }));
                          }}
                          className="w-full bg-app-card border border-app-border-strong text-app-text-white px-2.5 py-1.5 text-xs font-mono rounded-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-app-text-muted uppercase tracking-wider">Valeur mesurée</label>
                        <input
                          type="text"
                          required
                          value={(profileForm as any)[`metric${idx}`].value}
                          onChange={(e) => {
                            const val = e.target.value;
                            setProfileForm(v => ({
                              ...v,
                              [`metric${idx}`]: { ...(v as any)[`metric${idx}`], value: val }
                            }));
                          }}
                          className="w-full bg-app-card border border-app-border-strong text-app-text-white px-2.5 py-1.5 text-xs font-mono rounded-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-app-text-muted uppercase tracking-wider">Déscription / Contexte</label>
                        <input
                          type="text"
                          required
                          value={(profileForm as any)[`metric${idx}`].desc}
                          onChange={(e) => {
                            const val = e.target.value;
                            setProfileForm(v => ({
                              ...v,
                              [`metric${idx}`]: { ...(v as any)[`metric${idx}`], desc: val }
                            }));
                          }}
                          className="w-full bg-app-card border border-app-border-strong text-app-text-white px-2.5 py-1.5 text-xs font-sans rounded-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-app-border-subtle pt-5 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-app-text-white hover:opacity-90 text-app-bg text-xs font-mono tracking-widest font-bold uppercase flex items-center gap-2 cursor-pointer transition-all border border-app-text-white"
                >
                  <Save className="h-4 w-4" />
                  Sauvegarder les modifications
                </button>
              </div>

            </form>
          )}

          {/* SKILLS EDITOR */}
          {activeTab === "skills" && (
            <div className="space-y-8">
              
              {/* Add & Edit form */}
              <form onSubmit={handleAddOrUpdateSkill} className="bg-app-card-sec border border-app-border-strong p-5 space-y-4">
                <h4 className="font-mono text-[11px] text-app-text-white uppercase tracking-widest font-bold border-b border-app-border-subtle pb-2">
                  {editingSkillName ? `[EDITION] Modifier : ${editingSkillName}` : `+ Ajouter une compétence technique`}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider">Nom du Langage / Outil</label>
                    <input
                      type="text"
                      required
                      placeholder="ex: Go, Rust, AWS..."
                      value={skillForm.name}
                      onChange={(e) => setSkillForm(s => ({ ...s, name: e.target.value }))}
                      className="w-full bg-app-card border border-app-border-strong text-app-text-white px-3 py-1.5 text-xs font-mono rounded-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider">Secteur / Catégorie</label>
                    <select
                      value={skillForm.category}
                      onChange={(e) => setSkillForm(s => ({ ...s, category: e.target.value as any }))}
                      className="w-full bg-app-card border border-app-border-strong text-app-text-white px-3 py-1.5 text-xs font-mono rounded-none"
                    >
                      <option value="languages">Langage ou runtime</option>
                      <option value="frameworks">Framework & protocole</option>
                      <option value="databases">Bases de données & messages</option>
                      <option value="devops">DevOps & Cloud architecture</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider">
                      Niveau d'expertise ({skillForm.level}%)
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={skillForm.level}
                      onChange={(e) => setSkillForm(s => ({ ...s, level: parseInt(e.target.value) }))}
                      className="w-full accent-app-text-white cursor-pointer py-1"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider">Années de pratique / d'XP</label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="40"
                      value={skillForm.experienceYears}
                      onChange={(e) => setSkillForm(s => ({ ...s, experienceYears: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-app-card border border-app-border-strong text-app-text-white px-3 py-1.5 text-xs font-mono rounded-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider">Brève description de votre utilisation</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Utilisation, cadre applicatif et forces concrètes..."
                    value={skillForm.description}
                    onChange={(e) => setSkillForm(s => ({ ...s, description: e.target.value }))}
                    className="w-full bg-app-card border border-app-border-strong text-app-text-white px-3 py-1.5 text-xs font-sans rounded-none"
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  {editingSkillName && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSkillName(null);
                        setSkillForm({
                          name: "",
                          category: "languages",
                          level: 80,
                          experienceYears: 3,
                          icon: "Cpu",
                          description: ""
                        });
                      }}
                      className="px-4 py-2 border border-app-border-strong hover:bg-app-text-white/5 text-app-text-main text-[11px] font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Annuler
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2 bg-app-text-white text-app-bg text-[11px] font-mono uppercase font-bold tracking-widest flex items-center gap-1.5 cursor-pointer"
                  >
                    {editingSkillName ? <Save className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    {editingSkillName ? "Valider modifications" : "Ajouter au profil"}
                  </button>
                </div>
              </form>

              {/* Skills List */}
              <div className="space-y-3">
                <h4 className="font-mono text-[11px] text-app-text-white uppercase tracking-widest font-bold">// Compétences existantes ({skills.length})</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {skills.map((s) => (
                    <div key={s.name} className="bg-app-card-sec border border-app-border-subtle p-4 flex justify-between gap-4 items-start hover:border-app-border-strong transition">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-app-text-white">{s.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-none bg-app-card text-app-text-muted-xs border border-app-border-subtle">
                            {s.category.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-[10px] text-app-text-muted font-mono">{s.experienceYears} Ans d'expérience • Niveau: {s.level}%</p>
                        <p className="text-xs text-app-text-soft font-light line-clamp-2 mt-1">{s.description}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleEditSkillClick(s)}
                          className="p-1.5 border border-app-border-subtle hover:border-app-text-white text-app-text-muted hover:text-app-text-white cursor-pointer"
                          title="Modifier"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSkillClick(s.name)}
                          className="p-1.5 border border-app-border-subtle hover:border-red-500 text-app-text-muted hover:text-red-400 cursor-pointer"
                          title="Supprimer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* PROJECTS EDITOR */}
          {activeTab === "projects" && (
            <div className="space-y-8">
              <form onSubmit={handleSaveProjectForm} className="bg-app-card-sec border border-app-border-strong p-5 space-y-4">
                <h4 className="font-mono text-[11px] text-app-text-white uppercase tracking-widest font-bold border-b border-app-border-subtle pb-2">
                  {editingProjectId ? `[ÉDITION PROJECT] Modifier : ${editingProjectId}` : `+ Ajouter un projet d'ingénierie`}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider">ID Unique URL/Clé</label>
                    <input
                      type="text"
                      required
                      placeholder="ex: my-project-id"
                      disabled={!!editingProjectId}
                      value={projectForm.id}
                      onChange={(e) => setProjectForm(p => ({ ...p, id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "") }))}
                      className="w-full bg-app-card border border-app-border-strong text-app-text-white px-3 py-1.5 text-xs font-mono rounded-none disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider">Titre du Projet</label>
                    <input
                      type="text"
                      required
                      placeholder="ex: AeroTransit"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm(p => ({ ...p, title: e.target.value }))}
                      className="w-full bg-app-card border border-app-border-strong text-app-text-white px-3 py-1.5 text-xs font-mono rounded-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider">Durée / Période</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: 2024 - 2025 ou En cours"
                    value={projectForm.period}
                    onChange={(e) => setProjectForm(p => ({ ...p, period: e.target.value }))}
                    className="w-full bg-app-card border border-app-border-strong text-app-text-white px-3 py-1.5 text-xs font-mono rounded-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider">Slogan de présentation (Court)</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Système d'ingestion et de routage de données IoT aéronautiques..."
                    value={projectForm.shortDescription}
                    onChange={(e) => setProjectForm(p => ({ ...p, shortDescription: e.target.value }))}
                    className="w-full bg-app-card border border-app-border-strong text-app-text-white px-3 py-1.5 text-xs font-sans rounded-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider">Description architecturale Détaillée (Longue)</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Détails complets de la solution, problématiques, résolutions..."
                    value={projectForm.fullDescription}
                    onChange={(e) => setProjectForm(p => ({ ...p, fullDescription: e.target.value }))}
                    className="w-full bg-app-card border border-app-border-strong text-app-text-white px-3 py-1.5 text-xs font-sans rounded-none leading-relaxed"
                  />
                </div>

                {/* Tech Tags */}
                <div className="space-y-2 border-t border-app-border-subtle pt-3.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">Stack Déploiement / Tech Stack</label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {projectForm.techStack.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 font-mono text-[9px] px-2 py-0.5 bg-app-card text-app-text-white border border-app-border-strong">
                        {tag}
                        <button type="button" onClick={() => handleRemoveTechTag(tag)} className="text-red-400 hover:text-red-500 ml-1 font-bold">×</button>
                      </span>
                    ))}
                    {projectForm.techStack.length === 0 && (
                      <span className="text-[10px] font-mono text-app-text-muted block">Aucun tag</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ajouter une tech (ex: Go, Docker...)"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      className="bg-app-card border border-app-border-strong px-2.5 py-1 text-xs font-mono text-app-text-white flex-1 rounded-none outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddTechTag}
                      className="px-3.5 bg-app-text-white text-app-bg text-[10px] font-mono uppercase font-bold cursor-pointer"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-2 border-t border-app-border-subtle pt-3.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">Métriques du projet (ex: SLA 99%)</label>
                  <div className="space-y-1.5 mb-2">
                    {projectForm.metrics.map((m, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-app-card border border-app-border-subtle p-2 text-xs font-mono">
                        <span>{m.label} : <strong className="text-app-text-white">{m.value}</strong></span>
                        <button type="button" onClick={() => handleRemoveProjMetric(idx)} className="text-red-400 hover:text-red-500 font-bold px-1 text-sm">×</button>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Libellé (ex: Latence)"
                      value={metricLabel}
                      onChange={(e) => setMetricLabel(e.target.value)}
                      className="bg-app-card border border-app-border-strong px-2.5 py-1 text-xs font-mono text-app-text-white rounded-none outline-none"
                    />
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Valeur (ex: <8ms)"
                        value={metricVal}
                        onChange={(e) => setMetricVal(e.target.value)}
                        className="bg-app-card border border-app-border-strong px-2.5 py-1 text-xs font-mono text-app-text-white rounded-none flex-1 outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddProjMetric}
                        className="px-3.5 bg-app-text-white text-app-bg text-[10px] font-mono uppercase font-bold cursor-pointer"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>

                {/* Challenges */}
                <div className="space-y-2 border-t border-app-border-subtle pt-3.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">Défis & Solutions d'ingénierie</label>
                  <div className="space-y-1.5 mb-2">
                    {projectForm.challenges.map((chal, idx) => (
                      <div key={idx} className="flex justify-between items-start gap-4 bg-app-card border border-app-border-subtle p-2.5 text-xs text-app-text-soft">
                        <p className="flex-1 leading-relaxed"><span className="text-app-text-muted font-bold mr-1.5 font-mono">#{idx+1}</span>{chal}</p>
                        <button type="button" onClick={() => handleRemoveProjChallenge(idx)} className="text-red-400 hover:text-red-500 font-bold px-1 text-sm shrink-0">×</button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <textarea
                      placeholder="Ajouter un défi structurel levé..."
                      value={challengeInput}
                      onChange={(e) => setChallengeInput(e.target.value)}
                      className="bg-app-card border border-app-border-strong px-2.5 py-1 text-xs text-app-text-white flex-1 rounded-none outline-none font-sans leading-relaxed"
                    />
                    <button
                      type="button"
                      onClick={handleAddProjChallenge}
                      className="px-3.5 bg-app-text-white text-app-bg text-[10px] font-mono uppercase font-bold cursor-pointer self-end py-2"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>

                {/* Architecture Diagram Nodes Creator */}
                <div className="space-y-3 border-t border-app-border-subtle pt-3.5">
                  <div className="flex items-center justify-between border-b border-app-border-subtle pb-1">
                    <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">
                      Nodules d'architecture topologique ({projectForm.architectureDiagram.length})
                    </label>
                    <span className="text-[9px] font-mono text-[#22c55e] font-bold">DYNAMIC PROTOCOLS</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-1.5">
                    {projectForm.architectureDiagram.map(node => (
                      <div key={node.id} className="bg-app-card border border-app-border-subtle p-2.5 relative group">
                        <div className="text-[10px] font-mono font-bold text-app-text-white truncate uppercase">{node.title}</div>
                        <div className="text-[9px] font-mono text-app-text-muted truncate mt-0.5">{node.id} ({node.type})</div>
                        <button
                          type="button"
                          onClick={() => handleRemoveNode(node.id)}
                          className="absolute top-1.5 right-1.5 text-red-400 hover:text-red-500 bg-red-950/10 px-1 py-0 rounded-none border border-red-900/30 font-bold text-xs cursor-pointer"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {projectForm.architectureDiagram.length === 0 && (
                      <span className="text-[10px] font-mono text-app-text-muted block py-2">Aucun nodule d'infrastructure défini. Ajoutez des nodules ci-dessous.</span>
                    )}
                  </div>

                  <div className="bg-app-card border border-app-border-subtle p-3.5 space-y-3.5">
                    <span className="font-mono text-[9px] text-app-text-white/40 font-bold leading-none uppercase tracking-widest block">+ Construire un module d'infrastructure</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-app-text-muted uppercase">ID unique Nodule</label>
                        <input
                          type="text"
                          placeholder="ex: ingestor"
                          value={nodeForm.id}
                          onChange={(e) => setNodeForm(n => ({ ...n, id: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "") }))}
                          className="w-full bg-app-card border border-app-border-strong text-app-text-white px-2.5 py-1 text-xs font-mono rounded-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-app-text-muted uppercase">Titre Public</label>
                        <input
                          type="text"
                          placeholder="ex: Cluster Ingestion Go"
                          value={nodeForm.title}
                          onChange={(e) => setNodeForm(n => ({ ...n, title: e.target.value }))}
                          className="w-full bg-app-card border border-app-border-strong text-app-text-white px-2.5 py-1 text-xs font-mono rounded-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-app-text-muted uppercase">Framework, Lib ou Soft</label>
                        <input
                          type="text"
                          placeholder="ex: Fast Ingest Engine"
                          value={nodeForm.subtitle}
                          onChange={(e) => setNodeForm(n => ({ ...n, subtitle: e.target.value }))}
                          className="w-full bg-app-card border border-app-border-strong text-app-text-white px-2.5 py-1 text-xs font-mono rounded-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-app-text-muted uppercase">Type de Nœud</label>
                        <select
                          value={nodeForm.type}
                          onChange={(e) => setNodeForm(n => ({ ...n, type: e.target.value as any }))}
                          className="w-full bg-app-card border border-app-border-strong text-app-text-white px-2.5 py-1 text-xs font-mono rounded-none"
                        >
                          <option value="client">Client App / IoT</option>
                          <option value="gateway">API Gateway / Proxy</option>
                          <option value="service">Microservice / Workers</option>
                          <option value="queue">Queue / Message Bus</option>
                          <option value="cache">Cache / In-Memory Store</option>
                          <option value="database">Base de données DB</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-app-text-muted uppercase">Indicateur Perf (Optionnel)</label>
                        <input
                          type="text"
                          placeholder="ex: 110k IOPS ou Median: 0.2ms"
                          value={nodeForm.metric}
                          onChange={(e) => setNodeForm(n => ({ ...n, metric: e.target.value }))}
                          className="w-full bg-app-card border border-app-border-strong text-app-text-white px-2.5 py-1 text-xs font-mono rounded-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-app-text-muted uppercase">Description / DevOps Role</label>
                        <input
                          type="text"
                          placeholder="Décrire son rôle d'infrastructure..."
                          value={nodeForm.description}
                          onChange={(e) => setNodeForm(n => ({ ...n, description: e.target.value }))}
                          className="w-full bg-app-card border border-app-border-strong text-app-text-white px-2.5 py-1 text-xs font-sans rounded-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono text-app-text-muted uppercase">Liaisons Outbound (Séparés par virgules)</label>
                        <input
                          type="text"
                          placeholder="ex: kafka, redis_status"
                          value={nodeForm.connections}
                          onChange={(e) => setNodeForm(n => ({ ...n, connections: e.target.value }))}
                          className="w-full bg-app-card border border-app-border-strong text-app-text-white px-2.5 py-1 text-xs font-mono rounded-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={handleAddNode}
                        className="px-4 py-1.5 bg-app-text-white text-app-bg text-[9px] font-mono uppercase tracking-widest font-bold cursor-pointer"
                      >
                        + Ajouter Nodule
                      </button>
                    </div>
                  </div>
                </div>

                {/* Overall summary paragraph */}
                <div className="space-y-1.5 border-t border-app-border-subtle pt-3.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">Résumé global du projet (Une Citation court)</label>
                  <input
                    type="text"
                    required
                    placeholder='ex: "Développé sur le runtime Tokio asynchrone sécurisé..."'
                    value={projectForm.architectureSummary}
                    onChange={(e) => setProjectForm(p => ({ ...p, architectureSummary: e.target.value }))}
                    className="w-full bg-app-card border border-app-border-strong text-app-text-white px-3 py-1.5 text-xs font-serif italic rounded-none"
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  {editingProjectId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProjectId(null);
                        setProjectForm({
                          id: "",
                          title: "",
                          period: "",
                          shortDescription: "",
                          fullDescription: "",
                          techStack: [],
                          metrics: [],
                          architectureSummary: "",
                          architectureDiagram: [],
                          challenges: []
                        });
                      }}
                      className="px-4 py-2 border border-app-border-strong hover:bg-app-text-white/5 text-app-text-main text-[11px] font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Annuler
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-app-text-white text-app-bg text-[11px] font-mono uppercase font-bold tracking-widest flex items-center gap-1.5 cursor-pointer"
                  >
                    {editingProjectId ? <Save className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    {editingProjectId ? "Valider modifications" : "Créer le projet"}
                  </button>
                </div>
              </form>

              {/* Projects List */}
              <div className="space-y-3">
                <h4 className="font-mono text-[11px] text-app-text-white uppercase tracking-widest font-bold">// Projets d'architecture existants ({projects.length})</h4>
                
                <div className="space-y-2.5">
                  {projects.map((p) => (
                    <div key={p.id} className="bg-app-card-sec border border-app-border-subtle p-4 flex justify-between gap-4 items-start hover:border-app-border-strong transition">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-serif text-sm font-bold text-app-text-white">{p.title}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-none bg-app-card text-app-text-muted font-bold uppercase tracking-wider border border-app-border-subtle">
                            ID: {p.id}
                          </span>
                        </div>
                        <p className="text-[10px] text-app-text-muted font-mono">{p.period} • {p.techStack.length} Techs • {p.architectureDiagram.length} Nodules d'infrastructure</p>
                        <p className="text-xs text-app-text-soft font-light line-clamp-2 leading-relaxed">{p.shortDescription}</p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleEditProjectClick(p)}
                          className="p-2 border border-app-border-subtle hover:border-app-text-white text-app-text-muted hover:text-app-text-white cursor-pointer"
                          title="Modifier"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProjectClick(p.id)}
                          className="p-2 border border-app-border-subtle hover:border-red-500 text-app-text-muted hover:text-red-400 cursor-pointer"
                          title="Supprimer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer info inside menu */}
        <div className="p-3 bg-app-card-sec border-t border-app-border-subtle px-6 text-center select-none font-mono text-[9px] text-app-text-muted-xs uppercase tracking-widest">
          Portfolio Control System v2.1.4 • Host port: 0.0.0.0:3000 • Secured with TLS
        </div>

      </div>
    </div>
  );
}
