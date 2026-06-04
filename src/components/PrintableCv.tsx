/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

export default function PrintableCv() {
  const { profile, skills, projects } = usePortfolio();

  // Pick top 3 projects to ensure single page constraints are strictly respected
  const cvProjects = projects.slice(0, 3);

  return (
    <div className="flex flex-col justify-between h-full bg-white text-[#0f172a] font-sans">
      <div>
        {/* CV Top Accent Line */}
        <div className="w-full h-1 bg-[#1e293b] mb-4" />

        {/* Header Block: 2 Columns */}
        <div className="border-b border-[#e2e8f0] pb-4 mb-4 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold font-serif tracking-tight text-[#0f172a]">
              {profile.name}
            </h1>
            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#475569] mt-1">
              {profile.title}
            </p>
            <p className="text-[10px] text-[#64748b] mt-0.5 font-medium">
              {profile.location}
            </p>
          </div>
          
          <div className="text-right text-[10px] text-[#475569] font-mono leading-relaxed select-all">
            <div className="font-semibold text-[#1e293b]">{profile.socials.email}</div>
            <div>{profile.socials.linkedin || "linkedin.com/in/" + profile.name.toLowerCase().replace(/\s+/g, "")}</div>
            <div>github.com/{profile.socials.github.split("/").pop()}</div>
          </div>
        </div>

        {/* Content Modules */}
        <div className="space-y-4">
          
          {/* Module 01: Profile statement */}
          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0f172a] border-b border-[#e2e8f0] pb-1 mb-2">
              01 // PROFIL PROFESSIONNEL
            </h4>
            <p className="text-[11px] text-[#334155] leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* Module 02: Skills Matrix */}
          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0f172a] border-b border-[#e2e8f0] pb-1 mb-2">
              02 // EXPERTISES TECHNIQUES
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-1">
              {["languages", "frameworks", "databases", "devops"].map((catKey) => {
                const catSkills = skills
                  .filter((s) => s.category === catKey)
                  .map((s) => s.name);
                
                const categoryLabels: { [key: string]: string } = {
                  languages: "Langages",
                  frameworks: "Frameworks & Libs",
                  databases: "Bases de données / MD",
                  devops: "DevOps & Cloud"
                };

                if (catSkills.length === 0) return null;

                return (
                  <div key={catKey} className="text-[10px] text-[#334155]">
                    <span className="font-bold underline text-[#0f172a] font-mono mr-1.5">
                      {categoryLabels[catKey] || catKey} :
                    </span>
                    <span>{catSkills.join(", ")}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Module 03: Projects & Engineering accomplishments */}
          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0f172a] border-b border-[#e2e8f0] pb-1 mb-2">
              03 // PROJETS MAJEURS & RÉALISATIONS TECHNIQUES
            </h4>
            <div className="space-y-3 mt-1">
              {cvProjects.map((proj, pIdx) => (
                <div key={pIdx} className="text-[10px]">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[#0f172a] text-[11px]">
                      {proj.title}
                    </span>
                    <span className="text-[9px] font-mono text-[#64748b]">
                      ST_ID: {proj.id?.toUpperCase() || `PRJ_0${pIdx+1}`} • {proj.period}
                    </span>
                  </div>
                  <p className="text-[#475569] text-[10px] mt-0.5 leading-relaxed">
                    {proj.shortDescription || proj.fullDescription.slice(0, 160) + "..."}
                  </p>
                  
                  {/* Dynamic Technical badges & main metric */}
                  <div className="flex items-center justify-between mt-1 border-t border-[#f1f5f9] pt-1">
                    <div className="flex flex-wrap gap-1 font-mono text-[8px] text-[#475569]">
                      {proj.techStack.slice(0, 5).map((tech, tIdx) => (
                        <span key={tIdx} className="bg-[#f1f5f9] px-1 py-0.5 rounded border border-[#e2e8f0]/40">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {proj.metrics && proj.metrics.length > 0 && (
                      <span className="text-[9px] font-mono font-bold text-[#0f172a]">
                        METRIC: <span className="underline">{proj.metrics[0].value} {proj.metrics[0].label}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Signature & Sync Ledger Footer */}
      <div className="mt-4 pt-3 border-t border-[#e2e8f0] text-center text-[8px] text-[#94a3b8] font-mono uppercase tracking-wider">
        Portfolio de {profile.name} • Sync ID: {Math.floor(Date.now() / 1000).toString(16).toUpperCase()} • Rendu certifié A4 unique
      </div>
    </div>
  );
}
