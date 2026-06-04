/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Cpu, Settings2 } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

interface FooterProps {
  onManageClick: () => void;
}

export default function Footer({ onManageClick }: FooterProps) {
  const { profile } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-app-darker border-t border-app-border-subtle py-12 px-6 transition-colors duration-200" id="portfolio-footer">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Branding & license */}
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-[10px] uppercase font-bold text-app-text-muted tracking-widest select-none">
            <Cpu className="h-4 w-4 text-app-text-muted/70" />
            {profile.name} <span className="text-app-text-muted/40">// BACKEND ENGINEER</span>
          </div>
          <p className="text-[11px] text-app-text-muted font-light font-sans select-none">
            © {currentYear} {profile.name}. Licencié sous Apache-2.0. Conçu avec React & Tailwind.
          </p>
        </div>

        {/* Security / Health disclaimer label & Manage button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 select-none">
          <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 bg-app-card border border-app-border-subtle font-mono text-[9px] text-app-text-muted tracking-wider font-bold">
            <ShieldCheck className="h-3.5 w-3.5 text-app-text-muted/65" />
            <span>SECUR_PROTOCOLS: ENFORCED (TLS_1.3)</span>
          </div>

          <button
            onClick={onManageClick}
            className="flex items-center gap-1.5 px-4 py-2 bg-app-text-white/5 border border-app-border-sec hover:border-app-border-strong text-app-text-main hover:text-app-text-white text-[10.5px] font-mono tracking-widest uppercase transition-all cursor-pointer font-bold"
            id="toggle-admin-panel"
          >
            <Settings2 className="h-3.5 w-3.5" />
            GÉRER_LE_PORTFOLIO
          </button>
        </div>

        {/* Foot links */}
        <div className="flex items-center gap-5 text-[10px] uppercase tracking-wider font-mono text-app-text-soft">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-app-text-white transition"
          >
            GITHUB
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-app-text-white transition"
          >
            LINKEDIN
          </a>
          <a
            href={`mailto:${profile.socials.email}`}
            className="hover:text-app-text-white transition"
          >
            EMAIL_CONTACT
          </a>
        </div>

      </div>
    </footer>
  );
}

