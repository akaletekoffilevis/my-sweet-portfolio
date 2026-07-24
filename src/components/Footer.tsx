import { usePortfolio } from "../context/PortfolioContext";
import { Terminal } from "lucide-react";

export default function Footer() {
  const { profile } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-app-darker border-t border-app-border-subtle py-8 sm:py-10 px-4 sm:px-6" id="portfolio-footer">
      <div className="mx-auto max-w-screen-2xl">
        <div className="bg-app-bg border border-app-border-subtle overflow-hidden">
          <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-app-darker border-b border-app-border-subtle">
            <span className="w-2 h-2 bg-red-500/60" aria-hidden="true" />
            <span className="w-2 h-2 bg-yellow-500/60" aria-hidden="true" />
            <span className="w-2 h-2 bg-green-500/60" aria-hidden="true" />
            <Terminal className="h-3 w-3 text-app-accent ml-1.5" />
            <span className="text-[10px] sm:text-xs font-mono text-app-text-muted">footer</span>
          </div>
          <div className="p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
            <div className="text-center md:text-left">
              <p className="text-[11px] sm:text-xs font-mono text-app-text-white">
                <span className="text-app-text-muted">$</span> <span className="text-app-accent">echo</span> <span className="text-green-400/80">"&copy; {currentYear} {profile.name}"</span>
              </p>
              <p className="text-[10px] sm:text-xs font-mono text-app-text-muted mt-0.5"># Tous droits réservés.</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] font-mono">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${profile.name}`} className="text-app-text-muted hover:text-app-accent transition">
                <span className="text-app-accent/50">$</span> github
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn de ${profile.name}`} className="text-app-text-muted hover:text-app-accent transition">
                <span className="text-app-accent/50">$</span> linkedin
              </a>
              <a href={`mailto:${profile.socials.email}`} aria-label={`Envoyer un email à ${profile.name}`} className="text-app-text-muted hover:text-app-accent transition">
                <span className="text-app-accent/50">$</span> email
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
