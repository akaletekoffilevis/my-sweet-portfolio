import { motion } from "motion/react";

interface SectionHeadProps {
  num: string;
  title: string;
  meta?: string;
}

export default function SectionHead({ num, title, meta }: SectionHeadProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className="mb-10 sm:mb-14"
    >
      <div className="border-t-2 border-app-rule pt-3 flex items-baseline gap-3 sm:gap-5">
        <span className="font-mono text-xs sm:text-sm font-semibold text-app-accent tabular-nums">{num}</span>
        <h2 className="h-section text-app-text-white" data-optical>{title}</h2>
        {meta && (
          <span className="folio ml-auto hidden sm:block shrink-0">{meta}</span>
        )}
      </div>
    </motion.div>
  );
}
