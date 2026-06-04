/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Mail, Linkedin, Github, Key, Check, Copy, Terminal } from "lucide-react";

export default function BioSection() {
  const { profile } = usePortfolio();
  const [copiedKey, setCopiedKey] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const copyGpgKey = () => {
    navigator.clipboard.writeText(profile.socials.gpgKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <section className="py-16 px-6 border-b border-app-border-subtle bg-app-bg transition-colors duration-200" id="bio-section">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Avatar and Info Block */}
          <div className="lg:col-span-4 flex flex-col items-center text-center lg:text-left lg:items-start space-y-6">
            <div className="relative group self-center lg:self-start">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#22c55e]/20 to-app-text-white/10 opacity-60 group-hover:opacity-100 transition duration-300 blur-lg"></div>
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-[340px] lg:h-[340px] rounded-3xl object-cover border-2 border-app-border-strong shadow-2xl transition-all duration-500 bg-app-card-sec scale-100 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-3 right-3 flex h-4 w-4 z-20">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
              </span>
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 select-none">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="text-[10px] font-mono tracking-widest text-[#22c55e] font-extrabold font-bold uppercase">DISPONIBLE POUR MISSIONS</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-serif italic text-app-text-white leading-none">
                {profile.name}
              </h1>
              <p className="text-app-text-soft font-mono text-xs tracking-widest uppercase">
                {profile.title}
              </p>
              <p className="text-app-text-muted text-xs font-mono tracking-wider">
                {profile.location}
              </p>
            </div>

            {/* Socials & Comm Channel */}
            <div className="flex items-center gap-2.5 pt-2 w-full justify-center lg:justify-start select-none">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-app-text-white/5 border border-app-border-sec text-app-text-soft hover:text-app-text-white hover:border-app-border-strong transition-all cursor-pointer"
                title="Github"
                id="social-github"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-app-text-white/5 border border-app-border-sec text-app-text-soft hover:text-app-text-white hover:border-app-border-strong transition-all cursor-pointer"
                title="Linkedin"
                id="social-linkedin"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${profile.socials.email}`}
                className="py-2 px-4 bg-app-text-white/5 border border-app-border-sec text-app-text-main hover:bg-app-text-white hover:text-app-bg hover:border-transparent transition-all font-mono text-[10px] tracking-widest uppercase font-bold flex items-center gap-2 cursor-pointer"
                title="Email"
                id="social-email"
              >
                <Mail className="h-4 w-4" />
                <span>ME_CONTACTER</span>
              </a>
            </div>
          </div>

          {/* Description & Technical Standout Bio */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-app-text-muted font-mono text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 font-bold">
                <Terminal className="h-3.5 w-3.5 text-app-text-muted" />
                $ cat MANIFESTO.md
              </h2>
              
              <p className="text-lg lg:text-xl text-app-text-body leading-relaxed font-sans max-w-3xl font-light">
                {profile.bio}
              </p>
            </div>

            {/* Structured Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
              {profile.metrics.map((m, idx) => (
                <div key={idx} className="bg-app-text-white/[0.02] border border-app-border-subtle p-5 hover:border-app-border-strong transition duration-300">
                  <div className="text-[10px] font-mono text-app-text-muted tracking-widest uppercase italic">{m.label}</div>
                  <div className="text-3xl font-serif text-app-text-white mt-1.5 font-normal">{m.value}</div>
                  <div className="text-[11px] font-sans text-app-text-soft mt-1">{m.desc}</div>
                </div>
              ))}
            </div>

            {/* Extras: SSH / GPG Key Badge */}
            <div className="pt-2">
              <button
                onClick={() => setShowKey(!showKey)}
                className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-app-text-muted hover:text-app-text-soft transition duration-200 cursor-pointer"
              >
                <Key className="h-3.5 w-3.5" />
                {showKey ? "Masquer la clé GPG publique" : "Afficher la signature GPG d'intégrité"}
              </button>
              
              {showKey && (
                <div className="mt-3 bg-app-text-white/[0.02] border border-app-border-sec rounded-none p-4 max-w-lg font-mono text-xs flex items-center justify-between">
                  <div className="overflow-hidden mr-4">
                    <span className="text-app-text-muted block mb-1 text-[9px] tracking-wider uppercase font-bold">GPG SIGNATURE KEY</span>
                    <code className="text-app-text-soft select-all break-all">{profile.socials.gpgKey}</code>
                  </div>
                  <button
                    onClick={copyGpgKey}
                    className="p-1.5 bg-app-text-white/5 text-app-text-muted hover:text-app-text-white border border-app-border-sec hover:border-app-border-strong transition shrink-0 cursor-pointer"
                    title="Copier l'empreinte de la clé"
                  >
                    {copiedKey ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
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
