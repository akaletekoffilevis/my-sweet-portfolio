import { Link } from "react-router-dom";
import { useT, useLang } from "../i18n";
import { usePageSEO } from "../hooks/usePageSEO";
import { ArrowLeft } from "lucide-react";

const COPY = {
  fr: { kicker: "Erreur 404", title: "Page introuvable", lead: "La page demandée n'existe pas ou a été déplacée.", back: "Retour à l'accueil" },
  en: { kicker: "Error 404", title: "Page not found", lead: "The page you asked for does not exist or has moved.", back: "Back to home" },
};

export default function NotFound() {
  const { lang } = useLang();
  const t = useT();
  const c = COPY[lang];
  usePageSEO(`${c.kicker} — ${c.title}`, c.lead);

  return (
    <section className="relative py-28 sm:py-40">
      <div className="wrap">
        <span className="kicker block mb-4">{c.kicker}</span>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-app-text-white" data-optical>
          {c.title}
        </h1>
        <p className="mt-5 max-w-xl text-app-text-muted">{c.lead}</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 bg-app-accent text-app-bg text-sm font-semibold tracking-wide hover:bg-app-accent-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> {c.back}
        </Link>
        <p className="folio mt-8">{t.nav.role}</p>
      </div>
    </section>
  );
}
