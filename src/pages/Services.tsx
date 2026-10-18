import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { useT } from "../i18n";
import { usePageSEO } from "../hooks/usePageSEO";
import PageHero from "../components/PageHero";
import ServicesSection from "../components/ServicesSection";
import MagneticButton from "../components/MagneticButton";
import TiltCard from "../components/TiltCard";

export default function Services() {
  const { method } = usePortfolio();
  const t = useT();
  usePageSEO(t.servicesPage.seoTitle, t.servicesPage.seoDesc);

  return (
    <>
      <PageHero title={t.nav.services} lead={t.servicesPage.lead} />

      <ServicesSection />

      {/* Méthode de travail */}
      <section className="py-20 sm:py-28 border-b border-app-hairline relative">
        <div className="wrap">
          <div className="mb-10 sm:mb-14">
            <div className="border-t-2 border-app-rule pt-3 flex items-baseline gap-3 sm:gap-5">
              <span className="font-mono text-xs sm:text-sm font-semibold text-app-accent tabular-nums">01</span>
              <h2 className="h-section text-app-text-white" data-optical>
                {t.servicesPage.methodTitle}
              </h2>
              <span className="folio ml-auto hidden sm:block shrink-0">{t.servicesPage.methodMeta}</span>
            </div>
          </div>

          <div className="grid12">
            {method.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="col-span-full sm:col-span-6 xl:col-span-4 flex"
              >
                <TiltCard className="border border-app-hairline hover:border-app-accent/30 transition-colors p-6 flex flex-col h-full w-full">
                  <span className="font-mono text-2xl font-bold text-app-accent/80 tabular-nums">{step.step}</span>
                  <h3 className="text-base font-semibold tracking-tight text-app-text-white mt-3">{step.title}</h3>
                  <p className="text-[13px] leading-relaxed text-app-text-muted mt-2">{step.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 border-b border-app-hairline">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t-2 border-app-rule pt-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-app-text-white" data-optical>
                {t.servicesPage.ctaTitle}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-app-text-muted">{t.servicesPage.ctaDesc}</p>
            </div>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-app-accent text-app-bg text-sm font-semibold tracking-wide hover:bg-app-accent-dark transition-colors whitespace-nowrap"
              >
                {t.servicesPage.ctaBtn} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
