import { usePortfolio } from "../context/PortfolioContext";

export default function Footer() {
  const { profile } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-app-darker border-t border-app-border-subtle py-12 px-6" id="portfolio-footer">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <p className="text-sm text-app-text-white font-medium">{profile.name}</p>
          <p className="text-xs text-app-text-muted">
            &copy; {currentYear} {profile.name}. Tous droits réservés.
          </p>
        </div>

        <div className="flex items-center gap-5 text-xs text-app-text-soft">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="hover:text-app-accent transition">GitHub</a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-app-accent transition">LinkedIn</a>
          <a href={`mailto:${profile.socials.email}`} className="hover:text-app-accent transition">Email</a>
        </div>
      </div>
    </footer>
  );
}
