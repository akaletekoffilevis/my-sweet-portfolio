import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import { useTheme } from "../hooks/useTheme";
import { useLang, useT, type Lang } from "../i18n";
import { Menu, X, Sun, Moon, Globe, ChevronDown } from "lucide-react";

/** Cible tactile ≥ 44px + anneau de focus visible (accessibilité). */
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-accent";

const BTN =
  "flex items-center justify-center min-h-12 min-w-12 border border-app-hairline text-app-text-muted hover:text-app-accent hover:border-app-accent transition cursor-pointer " +
  FOCUS;

/** Sélecteur de langue FR / EN (détection navigateur à l'entrée, persistance localStorage). */
function LangSelect({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const t = useT();
  return (
    <div
      className={`relative flex items-center border border-app-hairline bg-app-bg text-app-text-muted hover:text-app-accent hover:border-app-accent transition-colors ${FOCUS} ${className}`}
    >
      <Globe className="pointer-events-none absolute left-3 h-5 w-5" aria-hidden="true" />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
        aria-label={t.langLabel}
        className={`appearance-none bg-transparent min-h-12 pl-11 pr-10 font-mono text-sm font-medium uppercase tracking-wider cursor-pointer focus:outline-none ${FOCUS}`}
      >
        <option value="fr" className="bg-app-bg text-app-text-main">
          FR
        </option>
        <option value="en" className="bg-app-bg text-app-text-main">
          EN
        </option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4" aria-hidden="true" />
    </div>
  );
}

export default function Header() {
  const { profile } = usePortfolio();
  const { isDark, toggleTheme } = useTheme();
  const t = useT();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const NAV_LINKS = [
    { to: "/", label: t.nav.home, end: true },
    { to: "/projets", label: t.nav.projects },
    { to: "/a-propos", label: t.nav.about },
    { to: "/services", label: t.nav.services },
    { to: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    if (isMenuOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector("a") as HTMLElement;
      firstLink?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>("a, button, select");
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

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-app-bg/95 backdrop-blur-md transition-colors duration-300 ${
          scrolled ? "border-b border-app-hairline" : "border-b border-transparent"
        }`}
      >
        <div className="wrap flex items-center justify-between gap-4 py-4 sm:py-5">
          <Link
            to="/"
            className="flex items-center gap-3 group shrink-0"
            aria-label={`${profile.name} — ${t.nav.home}`}
          >
            <span className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-app-accent text-app-bg font-mono text-[15px] font-bold tracking-tight shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5">
              {initials}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[15px] sm:text-base font-semibold text-app-text-white tracking-tight">
                {profile.name}
              </span>
              <span className="folio hidden sm:block">{t.nav.role}</span>
            </span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-7 lg:gap-9"
            aria-label={t.nav.mainAria}
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `relative inline-block py-1.5 text-[15px] font-medium tracking-wide transition-colors ${FOCUS} ${
                    isActive ? "text-app-text-white" : "text-app-text-muted hover:text-app-text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-[3px] bg-app-accent transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                      aria-hidden="true"
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LangSelect className="hidden sm:flex" />

            <button
              onClick={toggleTheme}
              className={BTN}
              aria-label={isDark ? t.theme.light : t.theme.dark}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${BTN} md:hidden ${isMenuOpen ? "fixed top-4 right-4 z-[60] bg-app-bg" : ""}`}
              aria-label={isMenuOpen ? t.nav.close : t.nav.menu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-nav"
          className="fixed inset-0 z-50 md:hidden flex flex-col bg-app-bg transition-colors duration-300"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.mobileAria}
        >
          <div className="wrap flex items-center justify-between py-4 border-b border-app-hairline">
            <span className="kicker">{t.nav.navigation}</span>
            <div className="flex items-center gap-2">
              <LangSelect />
              <button
                onClick={toggleTheme}
                className={BTN}
                aria-label={isDark ? t.theme.light : t.theme.dark}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button onClick={() => setIsMenuOpen(false)} className={BTN} aria-label={t.nav.close}>
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <nav
            className="flex-1 flex flex-col items-start justify-center wrap gap-6 sm:gap-8"
            aria-label={t.nav.mobileAria}
          >
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `relative text-3xl sm:text-4xl font-semibold tracking-tight transition flex items-baseline gap-4 py-1 ${FOCUS} ${
                    isActive ? "text-app-accent" : "text-app-text-white"
                  }`
                }
              >
                <span className="font-mono text-sm text-app-text-muted tabular-nums">
                  0{i + 1}
                </span>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="wrap py-6 border-t border-app-hairline">
            <span className="folio">{profile.location}</span>
          </div>
        </div>
      )}
    </>
  );
}
