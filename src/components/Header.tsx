/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { usePortfolio } from "../context/PortfolioContext";
import { Sun, Moon, FileText } from "lucide-react";

export default function Header() {
  const { profile, theme, toggleTheme, setIsCvModalOpen } = usePortfolio();

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "KA";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-app-border-subtle bg-app-bg/90 backdrop-blur-md px-6 py-4.5 transition-colors duration-200" id="portfolio-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 select-none">
          <div className="w-9 h-9 bg-teal-600 flex items-center justify-center rounded text-white font-black text-sm">
            {initials}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-app-text-white">{profile.name}</span>
            <span className="text-[10px] text-app-text-muted tracking-wider font-mono uppercase">{profile.title || "Développeur Backend"}</span>
          </div>
        </div>

        {/* Professional Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-wider text-app-text-muted">
          <a href="#bio-section" className="hover:text-teal-400 font-semibold transition">01_À propos</a>
          <a href="#skills-section" className="hover:text-teal-400 font-semibold transition">02_Compétences</a>
          <a href="#projects-section" className="hover:text-teal-400 font-semibold transition">03_Projets</a>
          <a href="#contact-resume-section" className="hover:text-teal-400 font-semibold transition">04_Contact</a>
        </nav>

        {/* Actions Button */}
        <div className="flex items-center gap-3">
          {/* Quick theme selector */}
          <button
            onClick={toggleTheme}
            className="p-2 border border-app-border-subtle hover:border-app-text-muted text-app-text-soft hover:text-app-text-white transition cursor-pointer rounded bg-app-card/30 flex items-center justify-center"
            title={theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-emerald-400" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-500" />
            )}
          </button>

          <a
            href="/cv-koffi-levis.pdf"
            download="CV_Koffi_Levis_Akalete.pdf"
            className="flex items-center gap-2 border border-teal-500 bg-teal-500/10 hover:bg-teal-500 hover:text-slate-900 px-4 py-2 text-xs tracking-wider uppercase font-extrabold text-teal-400 transition-all cursor-pointer rounded font-mono"
          >
            <FileText className="w-3.5 h-3.5" />
            Mon CV
          </a>
        </div>
      </div>
    </header>
  );
}
