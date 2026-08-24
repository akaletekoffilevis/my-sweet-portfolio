import { useState, useEffect, useRef } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { useTheme } from "../hooks/useTheme";
import { Menu, X, Sun, Moon } from "lucide-react";

const NAV_LINKS = [
  { href: "#bio-section", label: "Accueil" },
  { href: "#projects-section", label: "Projets" },
  { href: "#services-section", label: "Services" },
  { href: "#skills-section", label: "Compétences" },
  { href: "#certifications-section", label: "Certifications" },
  { href: "#contact-resume-section", label: "Contact" },
];

const SECTION_IDS = NAV_LINKS.map(l => l.href.slice(1));

export default function Header() {
  const { profile } = usePortfolio();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const initials = profile.name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("");

  return (
    <>
      <header className={`sticky top-0 z-40 w-full bg-app-bg/90 backdrop-blur-md transition-colors duration-300 ${scrolled ? "border-b border-app-hairline" : "border-b border-transparent"}`}>
        <div className="wrap flex items-center justify-between py-4">
          <a href="#bio-section" className="flex items-center gap-3 group">
            <span className="w-8 h-8 flex items-center justify-center bg-app-accent text-app-bg font-mono text-[13px] font-bold tracking-tight shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5">
              {initials}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-app-text-white tracking-tight">{profile.name}</span>
              <span className="folio hidden sm:block">Développeur Full Stack</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a key={link.href} href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative pb-1 text-[13px] font-medium tracking-wide transition-colors ${
                    isActive
                      ? "text-app-text-white"
                      : "text-app-text-muted hover:text-app-text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-[2px] bg-app-accent transition-all duration-300 ${isActive ? "w-full" : "w-0"}`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 border border-app-hairline text-app-text-muted hover:text-app-accent hover:border-app-accent transition cursor-pointer"
              aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 border border-app-hairline text-app-text-muted hover:text-app-accent hover:border-app-accent transition cursor-pointer ${isMenuOpen ? "fixed top-4 right-4 z-[60] bg-app-bg" : ""}`}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div ref={menuRef} className="fixed inset-0 z-50 md:hidden flex flex-col bg-app-bg transition-colors duration-300">
          <div className="wrap flex items-center justify-between py-4 border-b border-app-hairline">
            <span className="kicker">Navigation</span>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 border border-app-hairline text-app-text-muted hover:text-app-accent hover:border-app-accent transition cursor-pointer"
                aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 border border-app-hairline text-app-text-muted hover:text-app-accent hover:border-app-accent transition cursor-pointer"
                aria-label="Fermer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          <nav className="flex-1 flex flex-col items-start justify-center wrap gap-7" aria-label="Navigation mobile">
            {NAV_LINKS.map((link, i) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-semibold tracking-tight transition flex items-baseline gap-3 ${
                    isActive ? "text-app-accent" : "text-app-text-white"
                  }`}
                >
                  <span className="font-mono text-xs text-app-text-muted tabular-nums">0{i + 1}</span> {link.label}
                </a>
              );
            })}
          </nav>
          <div className="wrap py-6 border-t border-app-hairline">
            <span className="folio">{profile.location}</span>
          </div>
        </div>
      )}
    </>
  );
}
