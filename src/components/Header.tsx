/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Server, Shield, Radio, Sun, Moon } from "lucide-react";

export default function Header() {
  const { profile, theme, toggleTheme } = usePortfolio();
  const [latency, setLatency] = useState(14);
  const [time, setTime] = useState("");

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "JD";

  // Simulated server dynamic properties
  useEffect(() => {
    // Clock
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);

    // Random latency flicker
    const latencyInterval = setInterval(() => {
      setLatency((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next > 6 ? (next < 25 ? next : 18) : 8;
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(latencyInterval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-app-border-subtle bg-app-bg/85 backdrop-blur-md px-6 py-4 transition-colors duration-200" id="portfolio-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Brand/Logo (Sophisticated Brand) */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-app-text-white flex items-center justify-center rounded-sm text-app-bg font-extrabold text-xs select-none">
            {initials}
          </div>
          <div className="hidden xs:block select-none">
            <span className="font-mono text-xs tracking-[0.15em] text-app-text-soft uppercase">{profile.title || "Systems Architect"}</span>
            <span className="ml-2 font-mono text-[9px] text-[#22c55e] border border-[#22c55e]/30 px-1 py-[1px] rounded bg-[#22c55e]/5 font-semibold">ONLINE</span>
          </div>
        </div>

        {/* Live system monitoring (Aesthetic variation & professional backend vibe) */}
        <div className="hidden md:flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-app-text-soft select-none">
          <div className="flex items-center gap-2 pr-5 border-r border-app-border-subtle">
            <Server className="h-3 w-3 text-app-text-muted" />
            <span>Uptime: <strong className="text-app-text-white font-bold">99.998%</strong></span>
          </div>
          <div className="flex items-center gap-2 pr-5 border-r border-app-border-subtle">
            <Radio className="h-3 w-3 text-app-text-muted" />
            <span>Latency: <strong className="text-app-text-white font-bold">{latency}ms</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-3 w-3 text-app-text-muted" />
            <span>Env: <strong className="text-app-text-white font-bold">PROD</strong></span>
          </div>
        </div>

        {/* Actions or CTA badge */}
        <div className="flex items-center gap-4">
          {/* Quick light/dark toggle */}
          <button
            onClick={toggleTheme}
            className="p-1 px-2 border border-app-border-subtle text-app-text-soft hover:text-app-text-white transition duration-150 cursor-pointer flex items-center gap-1 text-[10px] font-mono tracking-wider"
            title={theme === "dark" ? "Mode clair" : "Mode sombre"}
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-3.5 w-3.5 text-yellow-500" />
                <span className="hidden sm:inline">CLAIR</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-indigo-500" />
                <span className="hidden sm:inline">SOMBRE</span>
              </>
            )}
          </button>

          <div className="text-right hidden sm:block select-none">
            <div className="text-[10px] font-mono text-app-text-muted uppercase tracking-widest">SYS_TIME</div>
            <div className="text-xs font-mono font-medium text-app-text-white">{time || "21:42:14"}</div>
          </div>
          
          <a
            href="#contact-resume-section"
            className="border border-app-border-sec px-3.5 py-1.5 text-[10px] tracking-widest uppercase font-bold text-app-text-white hover:bg-app-text-white hover:text-app-bg hover:border-transparent transition-all cursor-pointer font-bold font-mono"
          >
            VOIR_MON_CV
          </a>
        </div>
      </div>
    </header>
  );
}
