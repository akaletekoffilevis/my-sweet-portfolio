import type { ReactNode } from "react";
import { motion } from "motion/react";

/**
 * En-tête commun des sous-pages : filet d'accent + titre + accroche + badge optionnel.
 * Pas d'« eyebrow » : le titre suffit (évite de répéter le nom de la section).
 */
export default function PageHero({
  title,
  lead,
  badge,
}: {
  title: string;
  lead?: string;
  badge?: ReactNode;
}) {
  return (
    <section className="relative pt-14 sm:pt-20 pb-12 sm:pb-16 border-b border-app-hairline">
      <div className="wrap relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block h-px w-12 bg-app-accent mb-6" aria-hidden="true" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-app-text-white" data-optical>
            {title}
          </h1>
          {lead && <p className="mt-5 max-w-2xl text-base sm:text-lg text-app-text-muted leading-relaxed">{lead}</p>}
          {badge && <div className="mt-6">{badge}</div>}
        </motion.div>
      </div>
    </section>
  );
}
