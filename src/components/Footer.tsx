import { usePortfolio } from "../context/PortfolioContext";

export default function Footer() {
  const { profile } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-app-rule py-8 sm:py-10 print:hidden" id="portfolio-footer">
      <div className="wrap">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="folio order-3 md:order-1">
            &copy; {currentYear} {profile.name}
          </p>
          <p className="folio order-1 md:order-2 tabular-nums">13.5127° N, 2.1128° E — Niamey</p>
          <div className="flex items-center gap-5 order-2 md:order-3">
            <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${profile.name}`} className="folio hover:text-app-accent transition-colors">
              github
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn de ${profile.name}`} className="folio hover:text-app-accent transition-colors">
              linkedin
            </a>
            <a href={`mailto:${profile.socials.email}`} aria-label={`Envoyer un email à ${profile.name}`} className="folio hover:text-app-accent transition-colors">
              email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
