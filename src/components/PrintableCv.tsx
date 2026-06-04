/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Phone, Mail, MapPin, Github, Linkedin, ExternalLink, Award, BookOpen, Globe } from "lucide-react";

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
    <div className="bg-white text-slate-800 font-sans p-6 md:p-8 max-w-[210mm] min-h-[297mm] mx-auto flex flex-col justify-between box-border">
      <div>
        {/* Core Header styling - Clean professional row */}
        <div className="border-b-2 border-slate-900 pb-5 mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            {profile.avatarUrl && (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shadow-sm print:shadow-none"
                referrerPolicy="no-referrer"
              />
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {profile.name}
              </h1>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-600 mt-1">
                {profile.title} • Étudiant en Informatique
              </p>
            </div>
          </div>
          
          {/* Actionable contact parameters */}
          <div className="text-right text-[10px] text-slate-600 space-y-1 font-mono leading-tight sm:self-center self-start">
            <div className="flex items-center sm:justify-end gap-1.5 font-bold text-slate-900">
              <Mail className="w-3 h-3 text-slate-500" />
              <span>{profile.socials.email}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5 font-bold text-slate-900">
              <Phone className="w-3 h-3 text-slate-500" />
              <span>+227 91 53 52 20</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5">
              <MapPin className="w-3 h-3 text-slate-500" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5 text-slate-700">
              <Github className="w-3 h-3 text-slate-500" />
              <span>{profile.socials.github.replace("https://", "")}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5 text-slate-700">
              <Linkedin className="w-3 h-3 text-slate-500" />
              <span>{profile.socials.linkedin.replace("https://", "")}</span>
            </div>
            <div className="flex items-center sm:justify-end gap-1.5 text-teal-600 font-extrabold mt-1">
              <Globe className="w-3 h-3 text-teal-600 animate-pulse" />
              <span>{portfolioUrl}</span>
            </div>
          </div>
        </div>

        {/* 2 Column balanced grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* LEFT Sidebar Column - Contact, Formations, Langues & Soft Skills */}
          <div className="md:col-span-1 space-y-5 border-r md:border-slate-100 pr-0 md:pr-4">
            
            {/* Bio summary */}
            <div className="space-y-1">
              <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-teal-600" />
                À propos
              </h3>
              <p className="text-[10.5px] text-slate-600 leading-relaxed text-justify">
                {profile.bio}
              </p>
            </div>

            {/* Formations Module */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <Award className="w-3 h-3 text-teal-600" />
                Formations
              </h3>
              <div className="space-y-2">
                {formations.map((f, index) => (
                  <div key={index} className="text-[10px]">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{f.degree}</span>
                      <span className="text-teal-600 font-mono text-[9px]">{f.year}</span>
                    </div>
                    <p className="text-slate-500 text-[9px] mt-0.5 leading-tight">
                      {f.institution} {f.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Competences Certifications */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <Award className="w-3 h-3 text-teal-600" />
                Certifications
              </h3>
              <div className="space-y-1">
                {certifications.map((c, index) => (
                  <div key={index} className="text-[10px] leading-snug">
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-slate-500 text-[9px] font-mono">{c.provider}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Langues Module */}
            <div className="space-y-1.5">
              <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                Langues
              </h3>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                {languages.map((l, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="font-bold text-slate-900">{l.name}</span>
                    <span className="text-slate-500 text-[8.5px] font-mono">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualités Panel */}
            <div className="space-y-1.5">
              <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                Qualités
              </h3>
              <ul className="list-disc list-inside text-[9.5px] text-slate-600 space-y-0.5 leading-tight">
                {softSkills.map((s, index) => (
                  <li key={index} className="font-medium text-slate-700">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* RIGHT Main Content Column - Expertises & Projects */}
          <div className="md:col-span-2 space-y-5">
            
            {/* Technical expertises categorized */}
            <div>
              <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                Expertises Techniques
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {["languages", "frameworks", "databases", "devops"].map((catKey) => {
                  const catSkills = skills
                    .filter((s) => s.category === catKey)
                    .map((s) => s.name);
                  
                  const categoryLabels: { [key: string]: string } = {
                    languages: "Langages de programmation",
                    frameworks: "Frameworks & Librairies",
                    databases: "Bases de données",
                    devops: "Environnement & Outils"
                  };

                  if (catSkills.length === 0) return null;

                  return (
                    <div key={catKey} className="text-[10px] leading-relaxed">
                      <span className="font-extrabold text-slate-900 block text-[9.5px] uppercase tracking-wider text-teal-600 mb-0.5">
                        {categoryLabels[catKey] || catKey}
                      </span>
                      <span className="text-slate-600 font-medium">{catSkills.join(", ")}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Experience / Projects section */}
            <div>
              <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                Projets & Expériences Pratiques
              </h3>
              
              <div className="space-y-3">
                {projects.map((proj, pIdx) => (
                  <div key={pIdx} className="text-[10px] border-b border-slate-100 last:border-b-0 pb-2.5 last:pb-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-extrabold text-slate-900 text-[11px]">
                        {proj.title}
                      </span>
                      <span className="text-[8.5px] font-mono text-slate-500 shrink-0 uppercase">
                        {proj.period}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 text-[10px] mt-0.5 leading-relaxed text-justify">
                      {proj.shortDescription || proj.fullDescription.slice(0, 160) + "..."}
                    </p>

                    {/* Tech stack & indicators */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="bg-slate-50 text-slate-600 text-[8px] font-mono tracking-tight px-1.5 py-0.5 rounded border border-slate-200/50">
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
      <div className="mt-6 pt-3 border-t border-slate-200 text-center text-[8.5px] text-slate-400 font-mono flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>Portfolio en ligne de {profile.name} • contact@koffilevis.dev</span>
        <span className="uppercase tracking-widest font-bold text-slate-500">Document généré automatiquement à l'échelle A4</span>
      </div>
    </div>
  );
}
