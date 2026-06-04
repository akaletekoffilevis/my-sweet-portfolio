/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Mail, Linkedin, Github, Key, Check, Copy, Terminal, Code2, BookOpen, MapPin, Sparkles } from "lucide-react";

export default function BioSection() {
  const { profile } = usePortfolio();
  const [copiedKey, setCopiedKey] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [activeTab, setActiveTab] = useState<"about" | "philosophy" | "math_info">("about");

  const copyGpgKey = () => {
    navigator.clipboard.writeText(profile.socials.gpgKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <section className="py-20 px-6 border-b border-app-border-subtle bg-app-bg transition-colors duration-200" id="bio-section">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT PANEL: Professional Portrait & Quick Status info (4/12 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-8">
            <div className="relative group self-center lg:self-start w-full max-w-[340px]">
              {/* Outer soft reactive ambient glow */}
              <div className="absolute -inset-2.5 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/10 opacity-75 group-hover:opacity-100 transition duration-500 blur-xl"></div>
              
              <div className="relative overflow-hidden rounded-2xl border border-app-border-strong bg-slate-900/60 shadow-2xl">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-auto aspect-square object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] filter grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                
                {/* Active Availability Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md border border-teal-500/30 px-3.5 py-2.5 flex items-center justify-between rounded shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-teal-300 font-extrabold uppercase select-none">
                      Disponible
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-app-text-muted uppercase select-none">Niamey / Remote</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <div className="space-y-1.5">
                <h1 className="text-4xl lg:text-5xl font-black font-sans tracking-tight text-app-text-white">
                  {profile.name}
                </h1>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <span className="text-teal-400 font-mono text-xs font-bold tracking-wider uppercase">
                    {profile.title}
                  </span>
                  <span className="text-app-text-muted text-xs">|</span>
                  <span className="text-app-text-soft font-mono text-[11px] uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-teal-400" /> Niger
                  </span>
                </div>
              </div>

              {/* Direct Social Channels Row */}
              <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-2 select-none">
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-app-card border border-app-border-subtle hover:border-teal-500/50 text-app-text-soft hover:text-teal-400 rounded transition-all cursor-pointer shadow-sm"
                  title="Consulter mon GitHub"
                  id="hero-github"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-app-card border border-app-border-subtle hover:border-teal-500/50 text-app-text-soft hover:text-teal-400 rounded transition-all cursor-pointer shadow-sm"
                  title="Me suivre sur LinkedIn"
                  id="hero-linkedin"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`mailto:${profile.socials.email}`}
                  className="py-2.5 px-4 bg-teal-600 border border-transparent text-slate-950 font-mono text-xs tracking-wider uppercase font-black hover:bg-teal-500 transition-all flex items-center gap-2 cursor-pointer rounded shadow-md"
                  title="Envoyer un email direct"
                  id="hero-email"
                >
                  <Mail className="h-4 w-4 shrink-0 text-slate-950" />
                  <span>Me Contacter</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Redesigned interactive console-style presentation tabs (8/12 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-app-card border border-app-border-subtle rounded shadow-xl overflow-hidden">
              
              {/* Card Window Bar */}
              <div className="bg-app-card-sec border-b border-app-border-subtle px-5 py-3 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-teal-400" />
                  <span className="font-mono text-xs text-app-text-muted uppercase tracking-wider">
                    system_presentation.sh
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800/85"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800/85"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500/40"></span>
                </div>
              </div>

              {/* Console Navigation Tabs */}
              <div className="flex border-b border-app-border-subtle bg-app-bg/50 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab("about")}
                  className={`px-5 py-3.5 font-mono text-xs tracking-wider uppercase border-r border-app-border-subtle font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                    activeTab === "about"
                      ? "bg-app-card text-teal-400 border-b-2 border-b-teal-500"
                      : "text-app-text-muted hover:text-app-text-white bg-transparent"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 shrink-0" />
                  01_Mon Parcours
                </button>
                <button
                  onClick={() => setActiveTab("philosophy")}
                  className={`px-5 py-3.5 font-mono text-xs tracking-wider uppercase border-r border-app-border-subtle font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                    activeTab === "philosophy"
                      ? "bg-app-card text-teal-400 border-b-2 border-b-teal-500"
                      : "text-app-text-muted hover:text-app-text-white bg-transparent"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  02_Philosophie
                </button>
                <button
                  onClick={() => setActiveTab("math_info")}
                  className={`px-5 py-3.5 font-mono text-xs tracking-wider uppercase border-r border-app-border-subtle font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                    activeTab === "math_info"
                      ? "bg-app-card text-teal-400 border-b-2 border-b-teal-500"
                      : "text-app-text-muted hover:text-app-text-white bg-transparent"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  03_Maths & Logique
                </button>
              </div>

              {/* Dynamic Content Body based on tab */}
              <div className="p-6 lg:p-8 space-y-6">
                {activeTab === "about" && (
                  <div className="space-y-4 animate-fadeIn">
                    <p className="text-[14.5px] lg:text-[15.5px] text-app-text-body font-normal leading-relaxed">
                      {profile.bio}
                    </p>
                    <p className="text-[14px] text-app-text-soft leading-relaxed">
                      Passionné par l'ingénierie logicielle et le développement côté serveur, je consacre mon temps à concevoir des APIs REST robustes, documentées et testées. Mon parcours est marqué par une recherche constante de qualité, d'autoformation méthodique et d'écriture de code propre et testable.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 rounded uppercase font-bold tracking-wider">
                        #Csharp_Developer
                      </span>
                      <span className="px-2.5 py-1 text-[10px] font-mono text-teal-400 bg-teal-500/10 rounded uppercase font-bold tracking-wider">
                        #Backend_Oriented
                      </span>
                      <span className="px-2.5 py-1 text-[10px] font-mono text-yellow-400 bg-yellow-500/10 rounded uppercase font-bold tracking-wider">
                        #Autodidact_Active
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === "philosophy" && (
                  <div className="space-y-4 animate-fadeIn">
                    <h3 className="text-sm font-mono text-teal-300 uppercase font-black tracking-widest">// ARCHITECTURE & ROBUSTESSE</h3>
                    <p className="text-[14px] text-app-text-body leading-relaxed">
                      Pour moi, le backend est la colonne vertébrale de toute application. Je privilégie les structures saines, la séparation des responsabilités (Patterson / MVC), l'indépendance de la base de données (SQLite/PostgreSQL) et la sécurisation des connexions d'API.
                    </p>
                    <div className="bg-app-bg/60 p-4 border border-app-border-subtle rounded space-y-2">
                      <div className="text-[11px] font-mono text-teal-400 font-bold uppercase">&gt; Principes de codification appliqués :</div>
                      <ul className="text-xs text-app-text-soft space-y-1.5 list-disc pl-5">
                        <li><strong>SOLID & KISS</strong> : Maintenir la simplicité clinique du code.</li>
                        <li><strong>Performance SQL</strong> : Indexation saine et requêtes optimisées en écriture et lecture.</li>
                        <li><strong>Tests unitaires</strong> : Validation systématique du comportement critique des APIs.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "math_info" && (
                  <div className="space-y-4 animate-fadeIn">
                    <h3 className="text-sm font-mono text-teal-300 uppercase font-black tracking-widest flex items-center gap-2">// COMPILER LOGIC & MATHS STRUCTURE</h3>
                    <p className="text-[14px] text-app-text-body leading-relaxed">
                      Actuellement en <strong>Licence 2 de Mathématiques & Informatique</strong> à l'Université Abdou Moumouni de Niamey. Cette double compétence me confère une rigueur analytique renforcée et des bases solides pour appréhender l'ingénierie des données et la logique algorithmique complexe.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="border border-app-border-subtle p-3 rounded bg-app-bg/30">
                        <div className="text-[10px] font-mono font-bold text-teal-400 uppercase">Mathématiques pures</div>
                        <p className="text-xs text-app-text-muted mt-1 leading-relaxed">Algèbre linéaire, structures algébriques discrètes et calculs de probabilités.</p>
                      </div>
                      <div className="border border-app-border-subtle p-3 rounded bg-app-bg/30">
                        <div className="text-[10px] font-mono font-bold text-teal-400 uppercase">Algorithmique pure</div>
                        <p className="text-xs text-app-text-muted mt-1 leading-relaxed">Arbres, graphes, structuration de données complexes et structures mémoires du processeur.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Repositioned & Redesigned Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {profile.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-app-card border border-app-border-subtle hover:border-teal-500/40 p-5 rounded transition duration-300 shadow-sm flex flex-col justify-between"
                >
                  <div className="text-[10px] font-mono text-app-text-muted tracking-widest uppercase italic">{m.label}</div>
                  <div className="text-3xl font-serif text-teal-400 mt-2 font-normal">{m.value}</div>
                  <div className="text-[11px] font-sans text-app-text-soft mt-1 leading-snug">{m.desc}</div>
                </div>
              ))}
            </div>

            {/* Beautiful, responsive GPG signing & cryptographical integrity check */}
            <div className="p-4 bg-app-card border border-app-border-subtle rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-500/10 rounded text-teal-400">
                  <Key className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-teal-300 font-bold block">// INTEGRITY VERIFIED</span>
                  <p className="text-xs text-app-text-muted">Signature d'authenticité et clé publique d'empreinte GPG.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="px-3 py-1.5 bg-app-card-sec border border-app-border-subtle rounded hover:text-teal-400 text-xs font-mono select-none transition cursor-pointer"
                >
                  {showKey ? "Masquer la clé" : "Révéler la clé"}
                </button>
              </div>

              {showKey && (
                <div className="w-full sm:absolute sm:mt-16 sm:left-auto sm:right-6 sm:max-w-md bg-slate-900 border border-teal-500/30 p-4 rounded shadow-2xl z-20 font-mono text-[10px] flex items-center justify-between gap-3 animate-fadeIn">
                  <div className="overflow-hidden">
                    <span className="text-teal-400 block mb-1 text-[9px] tracking-wider uppercase font-black">GPG KEYFINGERPRINT</span>
                    <code className="text-emerald-300 select-all break-all">{profile.socials.gpgKey}</code>
                  </div>
                  <button
                    onClick={copyGpgKey}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-app-text-soft hover:text-teal-400 border border-app-border-subtle hover:border-teal-500/40 rounded transition shrink-0 cursor-pointer"
                    title="Copier l'empreinte GPG"
                  >
                    {copiedKey ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
