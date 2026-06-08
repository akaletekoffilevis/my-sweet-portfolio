import { usePortfolio } from "../context/PortfolioContext";
import { Terminal } from "lucide-react";

export default function Footer() {
  const { profile } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-app-darker border-t border-app-border-subtle py-10 px-6" id="portfolio-footer">
      <div className="mx-auto max-w-7xl">
        <div className="bg-app-bg border border-app-border-subtle rounded-xl overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-2 bg-app-darker border-b border-app-border-subtle">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <Terminal className="h-3 w-3 text-app-accent ml-2" />
            <span className="text-xs font-mono text-app-text-muted">footer</span>
          </div>
          <div className="p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs font-mono text-app-text-white">
                <span className="text-app-text-muted">$</span> <span className="text-app-accent">echo</span> <span className="text-green-400/80">"&copy; {currentYear} {profile.name}"</span>
              </p>
              <p className="text-xs font-mono text-app-text-muted mt-0.5"># Tous droits réservés.</p>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-app-text-muted hover:text-app-accent transition">
                <span className="text-app-accent/50">$</span> github
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-app-text-muted hover:text-app-accent transition">
                <span className="text-app-accent/50">$</span> linkedin
              </a>
              <a href={`mailto:${profile.socials.email}`} className="text-app-text-muted hover:text-app-accent transition">
                <span className="text-app-accent/50">$</span> email
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
