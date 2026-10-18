import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import { useT, tpl } from "../i18n";
import { MapPin, ArrowRight } from "lucide-react";

/**
 * En-tête de la page À propos : titre + biographie + portrait.
 * Volontairement distinct du hero d'accueil : ni CTA, ni réseaux, ni tagline
 * dupliqués (ceux-ci vivent sur l'accueil, le header et la page contact).
 */
export default function BioSection() {
  const { profile } = usePortfolio();
  const t = useT();

  return (
    <section className="pt-14 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 border-b border-app-hairline scroll-mt-20" id="bio-section">
      <div className="wrap">
        <div className="grid12 gap-y-12">
          <motion.figure
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="col-span-full md:col-span-4 w-full max-w-[340px] md:max-w-none md:justify-self-start"
          >
            <div className="border border-app-hairline bg-app-card p-2">
              <img
                src={profile.avatarUrl}
                alt={tpl(t.bio.portraitAlt, { name: profile.name })}
                className="w-full aspect-square object-cover grayscale-[35%]"
              />
            </div>
            <figcaption className="folio mt-2.5 flex justify-between">
              <span>{t.bio.figPortrait}</span>
              <span>Niamey, NE</span>
            </figcaption>
          </motion.figure>

          <div className="col-span-full md:col-span-8 md:col-start-5 text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="block h-px w-12 bg-app-accent mb-6 mx-auto"
              aria-hidden="true"
            />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-app-text-white"
              data-optical
            >
              {t.about.heroTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-[1.8] text-app-text-body"
            >
              {t.about.bioLead}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="folio mt-8 flex items-center justify-center gap-1.5"
            >
              <MapPin className="w-3 h-3 text-app-accent/70 shrink-0" aria-hidden="true" /> {profile.location}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.32 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="#skills-section"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-app-accent text-app-bg text-sm font-semibold tracking-wide hover:bg-app-accent-dark transition-colors min-h-11"
              >
                {t.nav.skills} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#certifications-section"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-app-border-sec text-app-text-white text-sm font-semibold tracking-wide hover:border-app-accent hover:text-app-accent transition-colors min-h-11"
              >
                {t.home.certsLink} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
