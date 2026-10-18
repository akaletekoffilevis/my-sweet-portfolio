import { motion } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import { useT } from "../i18n";
import SectionHead from "./SectionHead";

/**
 * Parcours en timeline : entrées qui alternent gauche/droite d'une année
 * à l'autre, avec un point par année — pas de fil droit.
 */
export default function Timeline() {
  const { timeline } = usePortfolio();
  const t = useT();

  return (
    <section className="py-20 sm:py-28 border-b border-app-hairline scroll-mt-20 relative">
      <div className="wrap relative">
        <SectionHead num="01" title={t.about.timelineTitle} meta={t.about.timelineMeta} />

        <div className="relative space-y-10 sm:space-y-14">
          {timeline.map((entry, i) => {
            const isRight = i % 2 === 1;
            return (
              <motion.div
                key={entry.period}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`relative ${isRight ? "md:ml-auto md:w-1/2 md:pl-8" : "md:w-1/2 md:pr-8"}`}
              >
                <span
                  className={`absolute top-2 w-[9px] h-[9px] bg-app-accent ${isRight ? "-left-1" : "-right-1 md:-right-1"}`}
                  aria-hidden="true"
                />
                <div className={`folio flex items-baseline gap-3 mb-2 ${isRight ? "justify-start" : "justify-end"}`}>
                  <span className="text-app-accent tabular-nums">{entry.period}</span>
                  {entry.current && (
                    <span className="border border-alert-ok-border text-alert-ok px-2 py-0.5">
                      {t.about.present}
                    </span>
                  )}
                </div>
                <h3 className={`text-lg sm:text-xl font-semibold tracking-tight text-app-text-white ${isRight ? "text-left" : "text-right"}`}>
                  {entry.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed text-app-text-muted ${isRight ? "text-left" : "text-right"}`}>
                  {entry.desc}
                </p>
                <div className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 ${isRight ? "justify-start" : "justify-end"}`}>
                  {entry.tags.map((tag) => (
                    <span key={tag} className="folio">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
