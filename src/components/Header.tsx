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

const SECTION_IDS = NAV_LINKS.map(l => l.href.slice(1));

export default function Header() {
  const { profile } = usePortfolio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    }
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-app-border-subtle bg-app-bg/95 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Terminal className="h-5 w-5 text-app-accent hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-mono text-base font-semibold text-app-text-white">
                <span className="text-app-text-muted hidden sm:inline">$ </span>
                {profile.name}
              </span>
              <span className="text-xs font-mono text-app-text-muted hidden sm:block">{profile.title}</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a key={link.href} href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-mono transition ${
                    isActive
                      ? "text-app-accent bg-app-accent/10"
                      : "text-app-text-muted hover:text-app-accent hover:bg-app-accent/5"
                  }`}>
                  <span className="text-app-accent/50">$ </span>{link.label}
                </a>
              );
            })}
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
            <span className="text-sm font-mono text-app-text-muted">[menu] $</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg border border-app-border-subtle text-app-text-soft hover:text-app-accent hover:border-app-accent transition cursor-pointer"
              aria-label="Fermer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-8 -mt-20">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-mono transition flex items-center gap-2 ${
                    isActive ? "text-app-accent" : "text-app-text-white hover:text-app-accent"
                  }`}
                >
                  <span className="text-app-text-muted text-sm">$</span> {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
