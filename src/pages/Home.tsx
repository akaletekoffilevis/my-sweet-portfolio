import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, FileDown } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { useT, tpl } from "../i18n";
import { usePageSEO } from "../hooks/usePageSEO";
import MagneticButton from "../components/MagneticButton";
import TiltCard from "../components/TiltCard";
import SectionHead from "../components/SectionHead";
import { ProjectCard, ProjectModal } from "../components/projects/ProjectParts";
import type { Project } from "../types";

const FEATURED_IDS = ["scaffolder-cli", "nextdev-blazor", "dotnetniger", "yt-downloader-docs", "ecommerce-app", "recettes-app"];

export default function Home() {
  const { profile, projects } = usePortfolio();
  const t = useT();
  const [selected, setSelected] = useState<Project | null>(null);
  usePageSEO(t.home.seoTitle, t.home.seoDesc);

  const featured = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is Project => !!p,
  );

  const selIdx = selected ? featured.findIndex((p) => p.id === selected.id) : -1;
  const goPrev = selIdx > 0 ? () => setSelected(featured[selIdx - 1]) : undefined;
  const goNext = selIdx >= 0 && selIdx < featured.length - 1 ? () => setSelected(featured[selIdx + 1]) : undefined;

  return (
    <>
      {/* ── Hero ── */}
      <section className="border-b border-app-hairline">
        <div className="wrap flex flex-col justify-center py-20 sm:py-24 lg:min-h-[74vh]">
          <div className="grid12 items-center gap-y-14">
            {/* Colonne texte */}
            <div className="col-span-full lg:col-span-7 lg:pr-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-7"
              >
                <span className="h-px w-10 bg-app-accent shrink-0" aria-hidden="true" />
                <span className="kicker">{t.home.kicker}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="display-hero text-app-text-white"
                data-optical
              >
                {profile.name.split(" ")[0]}{" "}
                <span className="text-app-accent">{profile.name.split(" ").slice(1).join(" ")}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="mt-7 text-lg sm:text-xl text-app-text-body max-w-xl leading-relaxed"
              >
                {t.home.leadBefore}
                <span className="text-app-accent">C#, .NET, Blazor</span>
                {t.home.leadAfter}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <MagneticButton>
                  <Link
                    to="/projets"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-app-accent text-app-bg text-sm font-semibold tracking-wide hover:bg-app-accent-dark transition-colors"
                  >
                    {t.home.ctaProjects} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 border border-app-border-sec text-app-text-white text-sm font-semibold tracking-wide hover:border-app-accent hover:text-app-accent transition-colors"
                  >
                    {t.home.ctaContact}
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href="/cv_koffi_levis_akalete.pdf"
                    download
                    className="inline-flex items-center gap-2 px-6 py-3.5 border border-app-accent/60 text-app-accent text-sm font-semibold tracking-wide hover:bg-app-accent hover:text-app-bg transition-colors"
                    aria-label={t.home.ctaCv}
                  >
                    <FileDown className="w-4 h-4" aria-hidden="true" /> {t.home.ctaCv}
                  </a>
                </MagneticButton>
                <span className="flex items-center gap-2 folio">
                  <span className="w-1.5 h-1.5 rounded-full bg-alert-ok animate-pulse" aria-hidden="true" />
                  {t.bio.available}
                </span>
              </motion.div>
            </div>

            {/* Portrait */}
            <motion.figure
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-full lg:col-span-4 lg:col-start-9 w-full max-w-[340px] lg:max-w-none mx-auto lg:mx-0 lg:justify-self-end"
            >
              <div className="border border-app-hairline bg-app-card p-2">
                <img
                  src={profile.avatarUrl}
                  alt={tpl(t.bio.portraitAlt, { name: profile.name })}
                  className="w-full aspect-square object-cover"
                />
              </div>
              <figcaption className="folio mt-2.5 flex justify-between">
                <span>{t.bio.figPortrait}</span>
                <span>Niamey, NE</span>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ── Fiche technique ── */}
      <section className="border-b border-app-hairline">
        <div className="wrap py-10 sm:py-12">
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-8">
            <div className="border-t border-app-hairline pt-4">
              <dt className="kicker">{profile.metrics[0].label}</dt>
              <dd className="mt-2.5 text-base sm:text-lg font-semibold tracking-tight text-app-text-white">
                <Link to="/projets" className="hover:text-app-accent transition-colors">{profile.metrics[0].value}</Link>
              </dd>
              <dd className="folio mt-1.5">{profile.metrics[0].desc}</dd>
            </div>
            <div className="border-t border-app-hairline pt-4">
              <dt className="kicker">{profile.metrics[1].label}</dt>
              <dd className="mt-2.5 text-base sm:text-lg font-semibold tracking-tight text-app-text-white">
                <Link to="/a-propos" className="hover:text-app-accent transition-colors">{profile.metrics[1].value}</Link>
              </dd>
              <dd className="folio mt-1.5">{profile.metrics[1].desc}</dd>
            </div>
            <div className="border-t border-app-hairline pt-4">
              <dt className="kicker">{profile.metrics[2].label}</dt>
              <dd className="mt-2.5 text-base sm:text-lg font-semibold tracking-tight text-app-text-white">
                <Link to="/a-propos#certifications-section" className="hover:text-app-accent transition-colors">{profile.metrics[2].value}</Link>
              </dd>
              <dd className="folio mt-1.5">{profile.metrics[2].desc}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── Projets vedettes ── */}
      <section className="py-20 sm:py-28 border-b border-app-hairline">
        <div className="wrap">
          <SectionHead num="01" title={t.home.featuredTitle} meta={t.home.featuredMeta} />
          <div className="grid12 row-gap-12">
            {featured.map((project, idx) => (
              <ProjectCard key={project.id} project={project} idx={idx} onOpen={() => setSelected(project)} />
            ))}
          </div>
          <div className="mt-12">
            <MagneticButton>
              <Link
                to="/projets"
                className="inline-flex items-center gap-2 text-sm font-semibold text-app-accent hover:gap-3 transition-all"
              >
                {t.home.featuredAll} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ── Services (aperçu) ── */}
      <section className="py-20 sm:py-28 border-b border-app-hairline">
        <div className="wrap">
          <SectionHead num="02" title={t.nav.services} meta={t.services.meta} />
          <div className="grid12">
            {[
              { n: "01", title: t.home.svcWebTitle, desc: t.home.svcWebDesc },
              { n: "02", title: t.home.svcMobileTitle, desc: t.home.svcMobileDesc },
              { n: "03", title: t.home.svcCustomTitle, desc: t.home.svcCustomDesc },
            ].map((svc, i) => (
              <div
                key={svc.title}
                className={`col-span-full sm:col-span-6 xl:col-span-4 py-6 ${
                  i > 0 ? "xl:border-l xl:border-app-hairline xl:pl-8" : ""
                }`}
              >
                <span className="folio text-app-accent">S.{svc.n}</span>
                <h3 className="text-lg font-semibold tracking-tight text-app-text-white mt-3">{svc.title}</h3>
                <p className="text-[13px] leading-relaxed text-app-text-muted mt-2">{svc.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <MagneticButton>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-app-accent hover:gap-3 transition-all"
              >
                {t.home.servicesAll} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ── Appel au contact ── */}
      <section className="py-16 sm:py-20 border-b border-app-hairline">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t-2 border-app-rule pt-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-app-text-white" data-optical>
                {t.home.ctaBandTitle}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-app-text-muted">{t.home.ctaBandDesc}</p>
              <Link
                to="/a-propos#certifications-section"
                className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-app-accent hover:gap-3 transition-all"
              >
                {t.home.certsLink} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <MagneticButton>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-app-accent text-app-bg text-sm font-semibold tracking-wide hover:bg-app-accent-dark transition-colors whitespace-nowrap"
              >
                {t.home.ctaBandBtn} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} onPrev={goPrev} onNext={goNext} />}
      </AnimatePresence>
    </>
  );
}
