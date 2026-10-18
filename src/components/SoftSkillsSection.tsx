import { motion } from "motion/react";
import { Users, Lightbulb, MessageSquare, Puzzle, Shuffle, Flag, type LucideIcon } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { useT } from "../i18n";
import TiltCard from "./TiltCard";
import SectionHead from "./SectionHead";

const ICONS: Record<string, LucideIcon> = { Users, Lightbulb, MessageSquare, Puzzle, Shuffle, Flag };

/** Qualités humaines & transversales — cartes en tilt 3D. */
export default function SoftSkillsSection() {
  const { softSkills } = usePortfolio();
  const t = useT();

  return (
    <section className="py-20 sm:py-28 border-b border-app-hairline scroll-mt-20 relative">
      <div className="wrap relative">
        <SectionHead num="02" title={t.about.softTitle} meta={t.about.softMeta} />
        <div className="grid12">
          {softSkills.map((skill, i) => {
            const Icon = ICONS[skill.icon] ?? Lightbulb;
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="col-span-full sm:col-span-6 xl:col-span-4 flex"
              >
                <TiltCard className="border border-app-hairline hover:border-app-accent/30 transition-colors p-6 flex flex-col h-full w-full">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 flex items-center justify-center border border-app-hairline bg-app-darker shrink-0">
                      <Icon className="h-5 w-5 text-app-accent" aria-hidden="true" />
                    </span>
                    <span className="folio text-app-text-muted/70">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-app-text-white mt-4">{skill.title}</h3>
                  <p className="text-[13px] leading-relaxed text-app-text-muted mt-2">{skill.desc}</p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
