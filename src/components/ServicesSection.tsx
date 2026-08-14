import { motion } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";

export default function ServicesSection() {
  const { services } = usePortfolio();
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 border-b border-app-border-subtle scroll-mt-20" id="services-section">
      <div className="mx-auto max-w-screen-2xl">
        <h2 className="section-title mb-2">Services</h2>
        <p className="section-subtitle mb-6 sm:mb-10">Ce que je peux faire pour vous</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (idx % 3) * 0.07 }}
              className="bg-app-bg border border-app-border-subtle hover:border-app-accent/20 transition-all duration-300"
            >
              <div className="p-4 sm:p-5">
                <div className="text-[10px] sm:text-xs font-mono text-app-accent mb-2 sm:mb-3 tracking-wider uppercase">
                  {svc.tech}
                </div>
                <h3 className="text-xs sm:text-sm font-mono font-semibold text-app-text-white mb-2">{svc.title}</h3>
                <p className="text-[11px] sm:text-sm text-app-text-soft leading-relaxed">{svc.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
