import { useState, useEffect, useRef } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { useTheme } from "../hooks/useTheme";
import { Menu, X, Terminal, Sun, Moon } from "lucide-react";

const NAV_LINKS = [
  { href: "#bio-section", label: "accueil" },
  { href: "#projects-section", label: "projets" },
  { href: "#services-section", label: "services" },
  { href: "#skills-section", label: "compétences" },
  { href: "#contact-resume-section", label: "contact" },
];

const SECTION_IDS = NAV_LINKS.map(l => l.href.slice(1));

export default function Header() {
  const { profile } = usePortfolio();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    if (isMenuOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector("a") as HTMLElement;
      firstLink?.focus();
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>("a, button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
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
      <header className="sticky top-0 z-40 w-full border-b border-app-border-subtle bg-app-bg/95 backdrop-blur-md px-4 sm:px-6 py-4 transition-colors duration-300">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Terminal className="h-5 w-5 text-app-accent hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-mono text-sm sm:text-base font-semibold text-app-text-white">
                <span className="text-app-text-muted hidden sm:inline">$ </span>
                {profile.name}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-app-text-muted leading-tight">{profile.title}</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a key={link.href} href={link.href}
                  className={`px-3 py-1.5 text-sm font-mono transition ${
                    isActive
                      ? "text-app-accent bg-app-accent/10"
                      : "text-app-text-muted hover:text-app-accent hover:bg-app-accent/5"
                  }`}>
                  <span className="text-app-accent/50">$ </span>{link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 border border-app-border-subtle text-app-text-soft hover:text-app-accent hover:border-app-accent transition cursor-pointer"
              aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 border border-app-border-subtle text-app-text-soft hover:text-app-accent hover:border-app-accent transition cursor-pointer ${isMenuOpen ? "fixed top-4 right-4 z-[60]" : ""}`}
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div ref={menuRef} className="fixed inset-0 z-50 md:hidden flex flex-col bg-app-bg transition-colors duration-300">
          <div className="flex items-center justify-between p-4 border-b border-app-border-subtle">
            <span className="text-sm font-mono text-app-text-muted">[menu] $</span>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 border border-app-border-subtle text-app-text-soft hover:text-app-accent hover:border-app-accent hover:bg-app-accent/10 transition cursor-pointer"
                aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 border border-app-border-subtle text-app-text-soft hover:text-app-accent hover:border-app-accent hover:bg-app-accent/10 transition cursor-pointer"
                aria-label="Fermer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-xl font-mono transition flex items-center gap-2 ${
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
