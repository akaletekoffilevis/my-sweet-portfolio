/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Skill } from "../types";
import { Terminal, Database, Layers, Network, Command, Code2, Cpu, Zap, Activity, Shuffle, Boxes, FileCode, GitBranch } from "lucide-react";

export default function SkillsSection() {
  const { skills } = usePortfolio();
  const [activeTab, setActiveTab] = useState<"all" | "languages" | "frameworks" | "databases" | "devops">("all");

  const categories = [
    { id: "all", label: "Toutes", icon: Command },
    { id: "languages", label: "Langages", icon: Code2 },
    { id: "frameworks", label: "Frameworks & APIs", icon: Layers },
    { id: "databases", label: "Bases de données & Message Brokers", icon: Database },
    { id: "devops", label: "Infrastructures & DevOps", icon: CloudIcon } // Custom mock cloud icon using Boxes or layers
  ];

  function CloudIcon() {
    return <Boxes className="h-4 w-4 text-app-text-white" />;
  }

  const getCategoryColor = (cat: string) => {
    return "text-app-text-white bg-app-text-white/5 border-app-border-sec";
  };

  const getProgressColor = (cat: string) => {
    return "bg-app-text-white";
  };

  // Helper matching string map to Lucide icons
  const renderSkillIcon = (iconName: string) => {
    const props = { className: "h-5 w-5" };
    switch (iconName) {
      case "SquareTerminal": return <Terminal {...props} className="h-5 w-5 text-emerald-400" />;
      case "Code2": return <Code2 {...props} className="h-5 w-5 text-emerald-400" />;
      case "Terminal": return <Terminal {...props} className="h-5 w-5 text-yellow-400" />;
      case "Cpu": return <Cpu {...props} className="h-5 w-5 text-amber-500" />;
      case "Layers": return <Layers {...props} className="h-5 w-5 text-blue-400" />;
      case "Zap": return <Zap {...props} className="h-5 w-5 text-yellow-300 animate-pulse" />;
      case "Network": return <Network {...props} className="h-5 w-5 text-teal-400" />;
      case "Database": return <Database {...props} className="h-5 w-5 text-purple-400" />;
      case "Activity": return <Activity {...props} className="h-5 w-5 text-red-400" />;
      case "Shuffle": return <Shuffle {...props} className="h-5 w-5 text-violet-400" />;
      case "Boxes": return <Boxes {...props} className="h-5 w-5 text-indigo-400" />;
      case "FileCode": return <FileCode {...props} className="h-5 w-5 text-cyan-400" />;
      case "GitBranch": return <GitBranch {...props} className="h-5 w-5 text-orange-400" />;
      default: return <Command {...props} className="h-5 w-5 text-slate-400" />;
    }
  };

  const filteredSkills = skills.filter(
    (skill) => activeTab === "all" || skill.category === activeTab
  );

  return (
    <section className="py-16 px-6 border-b border-app-border-subtle bg-app-bg transition-colors duration-200" id="skills-section">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-app-text-muted uppercase tracking-[0.2em] block font-bold">// TECHNOLOGIES MASTERED</span>
            <h2 className="text-4xl font-serif text-app-text-white font-normal mt-1">
              Espace de Compétences Techniques
            </h2>
            <p className="text-app-text-soft text-sm max-w-xl font-light">
              Spécialisé dans le développement systèmes, la gestion d'infrastructures élastiques et la conception de bases de données haut débit.
            </p>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-app-border-subtle pb-4 select-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-none text-[10px] font-mono tracking-widest uppercase font-bold border transition-all cursor-pointer ${
                  isActive
                    ? "bg-app-text-white border-app-text-white text-app-bg"
                    : "bg-transparent border-app-border-sec text-app-text-muted hover:border-app-border-strong hover:text-app-text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill: Skill, idx: number) => (
            <div
              key={idx}
              className="group relative bg-app-card border border-app-border-subtle rounded-none p-6 hover:border-app-border-strong transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card top */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-none bg-app-text-white/[0.02] border border-app-border-subtle">
                      {renderSkillIcon(skill.icon)}
                    </div>
                    <div>
                      <h3 className="font-bold text-app-text-white text-sm tracking-wide font-mono group-hover:text-app-text-white/80 transition-colors">
                        {skill.name}
                      </h3>
                      <span className={`inline-block translate-y-0.5 text-[8px] font-mono font-semibold px-2 py-0.5 rounded-none border uppercase mt-0.5 ${getCategoryColor(skill.category)}`}>
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-mono text-app-text-muted uppercase tracking-wider font-bold">EXPÉRIENCE</div>
                    <div className="text-[11px] font-mono font-medium text-app-text-main">{skill.experienceYears} Ans</div>
                  </div>
                </div>

                <p className="text-app-text-soft text-xs leading-relaxed font-sans min-h-[48px] font-light">
                  {skill.description}
                </p>
              </div>

              {/* Slider meter */}
              <div className="mt-5 space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-mono text-app-text-muted tracking-wider font-semibold select-none">
                  <span>MAÎTRISE TECHNIQUE</span>
                  <span className="text-app-text-main">{skill.level}%</span>
                </div>
                <div className="w-full bg-app-text-white/5 h-[3px] rounded-none overflow-hidden border border-app-border-subtle">
                  <div
                    className={`h-full rounded-none transition-all duration-500 ${getProgressColor(skill.category)}`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
