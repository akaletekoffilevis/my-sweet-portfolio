import { usePortfolio } from "../context/PortfolioContext";

export default function Footer() {
  const { profile } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-app-darker border-t border-app-border-subtle py-8 sm:py-10 px-4 sm:px-6" id="portfolio-footer">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-app-text-muted">
            &copy; {currentYear} {profile.name} — Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 sm:gap-5 text-xs sm:text-sm font-mono">
            <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${profile.name}`} className="text-app-text-muted hover:text-app-accent transition">
              github
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn de ${profile.name}`} className="text-app-text-muted hover:text-app-accent transition">
              linkedin
            </a>
            <a href={`mailto:${profile.socials.email}`} aria-label={`Envoyer un email à ${profile.name}`} className="text-app-text-muted hover:text-app-accent transition">
              email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
