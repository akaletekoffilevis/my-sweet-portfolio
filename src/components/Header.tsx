import { useState, useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#bio-section", label: "À propos" },
  { href: "#skills-section", label: "Compétences" },
  { href: "#services-section", label: "Services" },
  { href: "#projects-section", label: "Projets" },
  { href: "#contact-resume-section", label: "Contact" },
];

export default function Header() {
  const { profile } = usePortfolio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
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
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-app-bg">
          <div className="flex justify-end p-6">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg border border-app-border-subtle text-app-text-soft hover:text-app-accent hover:border-app-accent transition cursor-pointer"
              aria-label="Fermer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-10 -mt-20">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl text-app-text-white font-medium hover:text-app-accent transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
