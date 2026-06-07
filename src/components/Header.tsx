import { useState, useEffect } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Menu, X, Terminal } from "lucide-react";

const NAV_LINKS = [
  { href: "#bio-section", label: "about" },
  { href: "#skills-section", label: "skills" },
  { href: "#services-section", label: "services" },
  { href: "#projects-section", label: "projects" },
  { href: "#contact-resume-section", label: "contact" },
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
      <header className="sticky top-0 z-40 w-full border-b border-app-border-subtle bg-app-bg/95 backdrop-blur-md px-6 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Terminal className="h-4 w-4 text-app-accent hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-mono text-sm font-semibold text-app-text-white">
                <span className="text-app-text-muted hidden sm:inline">$ </span>
                {profile.name}
              </span>
              <span className="text-[10px] font-mono text-app-text-muted hidden sm:block">{profile.title}</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}
                className="px-3 py-1.5 rounded-md text-[11px] font-mono text-app-text-muted hover:text-app-accent hover:bg-app-accent/5 transition">
                <span className="text-app-accent/50">$ </span>{link.label}
              </a>
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
          <div className="flex justify-between items-center p-6 border-b border-app-border-subtle">
            <span className="text-xs font-mono text-app-text-muted">[menu] $</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg border border-app-border-subtle text-app-text-soft hover:text-app-accent hover:border-app-accent transition cursor-pointer"
              aria-label="Fermer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-8 -mt-20">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-mono text-app-text-white hover:text-app-accent transition flex items-center gap-2"
              >
                <span className="text-app-text-muted text-sm">$</span> {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
