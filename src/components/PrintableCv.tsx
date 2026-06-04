import React from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Phone, Mail, MapPin, Github, Linkedin, Award, BookOpen, Globe, Terminal, Cpu, Database, Code2 } from "lucide-react";

export default function PrintableCv() {
  const { profile, skills, projects } = usePortfolio();

  // Robust default data from Koffi's real CV screenshot
  const formations = [
    {
      year: "2025",
      degree: "Licence 2 en Mathématiques / Informatique",
      status: "(En cours)",
      institution: "Université Abdou Moumouni de Niamey"
    },
    {
      year: "2024",
      degree: "Baccalauréat Général",
      status: "",
      institution: "Csp Assifa"
    },
    {
      year: "2023",
      degree: "BEPC",
      status: "",
      institution: "Csp Assifa"
    }
  ];

  const softSkills = [
    "Rigueur et logique",
    "Capacité d'analyse et persévérance",
    "Esprit d'équipe et organisation",
    "Adaptabilité et autonomie",
    "Résolution de problèmes complexes"
  ];

  const languages = [
    { name: "Français", level: "Maternelle" },
    { name: "Haoussa", level: "Courant" },
    { name: "Zarma", level: "Intermédiaire" },
    { name: "Anglais", level: "Débutant" }
  ];

  const certifications = [
    { name: "C# Free Foundation", provider: "FreeCodeCamp & Microsoft" }
  ];

  // Dynamic portfolio url
  const portfolioUrl = window.location.origin.replace(/^https?:\/\//, "");

  return (
    <div className="bg-white text-slate-800 font-sans p-7 md:p-9 max-w-[210mm] min-h-[297mm] mx-auto flex flex-col justify-between box-border border-4 border-slate-900/5 select-text">
      <div>
        {/* Decorative Top Bar resembling Code terminal window */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4 text-[9px] font-mono text-slate-400 select-none">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-2.5 h-2.5 bg-slate-300 rounded-full inline-block"></span>
            <span className="w-2.5 h-2.5 bg-slate-200 rounded-full inline-block"></span>
            <span className="w-2.5 h-2.5 bg-slate-150 rounded-full inline-block"></span>
            <span className="text-slate-500 ml-1">SYS_A4_COMPILE // LIVE_EXPORT</span>
          </div>
          <div>STATUS: COMPILATION_SUCCESS (200 OK)</div>
        </div>

        {/* Core Header styling - Clean professional row */}
        <div className="border border-slate-900 p-4 mb-5 flex flex-col sm:flex-row justify-between items-start gap-4 bg-slate-50 relative">
          {/* Subtle console corner absolute accent */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-slate-900"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-slate-900"></div>

          <div className="flex items-center gap-4">
            {profile.avatarUrl && (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-14 h-14 rounded-none object-cover border-2 border-slate-900 shrink-0 print:border-slate-900"
                referrerPolicy="no-referrer"
              />
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-mono uppercase">
                {profile.name}
              </h1>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-600 mt-1 font-mono">
                &gt; {profile.title}
              </p>
              <span className="inline-block mt-1 text-[8.5px] bg-slate-900 text-white font-mono uppercase px-1.5 py-0.5 font-bold tracking-widest">
                ÉDITION CLAIRE
              </span>
            </div>
          </div>
          
          {/* Actionable contact parameters */}
          <div className="text-right text-[10px] text-slate-600 space-y-1 font-mono leading-tight sm:self-center self-start w-full sm:w-auto border-t sm:border-t-0 border-slate-200 pt-2 sm:pt-0">
            <div className="flex items-center sm:justify-end gap-1.5 font-bold text-slate-900">
              <Mail className="w-3 h-3 text-teal-600" />
              <span>{profile.socials.email}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5 font-bold text-slate-900">
              <Phone className="w-3 h-3 text-teal-600" />
              <span>+227 91 53 52 20</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5 text-slate-700">
              <Github className="w-3 h-3 text-slate-400" />
              <span>{profile.socials.github.replace("https://", "")}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5 text-slate-700">
              <Linkedin className="w-3 h-3 text-slate-400" />
              <span>{profile.socials.linkedin.replace("https://", "")}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5 text-teal-600 font-extrabold mt-1">
              <Globe className="w-3 h-3 text-teal-600 shrink-0" />
              <span>{portfolioUrl}</span>
            </div>
          </div>
        </div>

        {/* 2 Column balanced grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          
          {/* LEFT Sidebar Column - Contact, Formations, Langues & Soft Skills */}
          <div className="md:col-span-1 space-y-4 border-r border-transparent md:border-slate-200 pr-0 md:pr-4">
            
            {/* Bio summary */}
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 flex items-center gap-1.5 font-mono">
                // 01_À PROPOS
              </h3>
              <p className="text-[10px] text-slate-600 leading-relaxed text-justify">
                {profile.bio}
              </p>
            </div>

            {/* Formations Module */}
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 flex items-center gap-1.5 font-mono">
                // 02_FORMATIONS
              </h3>
              <div className="space-y-2">
                {formations.map((f, index) => (
                  <div key={index} className="text-[10px] border-l-2 border-slate-300 pl-2">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{f.degree}</span>
                    </div>
                    <p className="text-slate-500 text-[9px] mt-0.5 leading-tight font-mono">
                      {f.institution} <span className="text-teal-600 font-bold">{f.year}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Competences Certifications */}
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 flex items-center gap-1.5 font-mono">
                // 03_CERTIFS
              </h3>
              <div className="space-y-1">
                {certifications.map((c, index) => (
                  <div key={index} className="text-[10px] leading-snug border-l-2 border-slate-300 pl-2">
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-slate-500 text-[8.5px] font-mono">{c.provider}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Langues Module */}
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 flex items-center gap-1.5 font-mono">
                // 04_LANGUES
              </h3>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                {languages.map((l, index) => (
                  <div key={index} className="flex flex-col bg-slate-50 p-1 border border-slate-200">
                    <span className="font-bold text-slate-900 text-[9.5px]">{l.name}</span>
                    <span className="text-teal-600 text-[8px] font-mono font-bold">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualités Panel */}
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 flex items-center gap-1.5 font-mono">
                // 05_SOFT_SKILLS
              </h3>
              <ul className="text-[9.5px] text-slate-600 space-y-1 leading-tight">
                {softSkills.map((s, index) => (
                  <li key={index} className="font-mono text-slate-700 flex items-start gap-1">
                    <span className="text-teal-600 font-extrabold shrink-0">*</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* RIGHT Main Content Column - Expertises & Projects */}
          <div className="md:col-span-2 space-y-4">
            
            {/* Technical expertises categorized */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2 font-mono">
                // 06_MAP_D_EXPERTISES_TECHNIQUES
              </h3>
              
              <div className="grid grid-cols-2 gap-2.5">
                {["languages", "frameworks", "databases", "devops"].map((catKey) => {
                  const catSkills = skills
                    .filter((s) => s.category === catKey)
                    .map((s) => s.name);
                  
                  const categoryLabels: { [key: string]: string } = {
                    languages: "Langages primaires & scripts",
                    frameworks: "Moteurs & Frameworks",
                    databases: "Persistence & Schémas",
                    devops: "Environnements & Versioning"
                  };

                  if (catSkills.length === 0) return null;

                  return (
                    <div key={catKey} className="text-[10px] p-2 border border-slate-200 bg-slate-50/50">
                      <span className="font-extrabold text-[#0d9488] block text-[9.5px] uppercase tracking-wider font-mono mb-1">
                        &gt; {categoryLabels[catKey] || catKey}
                      </span>
                      <span className="text-slate-800 font-medium">{catSkills.join(", ")}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Experience / Projects section */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2 font-mono">
                // 07_REALISATIONS_PRATIQUES_&_PROJETS
              </h3>
              
              <div className="space-y-2.5">
                {projects.map((proj, pIdx) => (
                  <div key={pIdx} className="text-[10px] border border-slate-200 bg-white hover:border-slate-400 p-2.5 transition-colors">
                    <div className="flex justify-between items-baseline gap-2 border-b border-slate-100 pb-1 mb-1">
                      <span className="font-black text-slate-900 text-[10.5px] font-mono">
                        {proj.title}
                      </span>
                      <span className="text-[8px] font-mono text-teal-600 shrink-0 font-bold uppercase">
                        [{proj.period}]
                      </span>
                    </div>
                    
                    <p className="text-slate-600 text-[9.5px] mt-0.5 leading-relaxed text-justify">
                      {proj.shortDescription || proj.fullDescription.slice(0, 160) + "..."}
                    </p>

                    {/* Tech stack & indicators */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="bg-slate-100 text-slate-700 text-[7.5px] font-mono tracking-tight px-1 py-0.5 rounded border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Synchronized Footer */}
      <div className="mt-5 pt-2 border-t border-slate-900 text-center text-[8px] text-slate-500 font-mono flex flex-col sm:flex-row justify-between items-center gap-1">
        <span>SYS_REGISTRY // EXPORT PAR COFFI LÉVIS // Niamey, Niger</span>
        <span className="uppercase tracking-widest font-extrabold text-slate-700">DOCUMENT CONSOLÉ AUTOMATISÉ ÉCHELLE A4</span>
      </div>
    </div>
  );
}
