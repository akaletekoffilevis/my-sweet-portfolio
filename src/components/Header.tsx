import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#bio-section", label: "À propos" },
  { href: "#skills-section", label: "Compétences" },
  { href: "#projects-section", label: "Projets" },
  { href: "#contact-resume-section", label: "Contact" },
];

export default function Header() {
  const { profile } = usePortfolio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-app-border-subtle bg-app-bg/90 backdrop-blur-md px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-app-text-white">{profile.name}</span>
          <span className="text-xs text-app-text-muted">{profile.title}</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-app-text-muted">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-app-accent transition">{link.label}</a>
          ))}
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-app-border-subtle text-app-text-soft hover:text-app-accent hover:border-app-accent transition cursor-pointer"
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-50 bg-app-bg/98 backdrop-blur-xl md:hidden flex flex-col">
          <nav className="flex flex-col items-center justify-center gap-8 h-full">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-xl text-app-text-white font-medium hover:text-app-accent transition"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
