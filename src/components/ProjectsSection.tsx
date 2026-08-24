import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import { Github, ExternalLink, Globe, X, FolderGit2 } from "lucide-react";
import SectionHead from "./SectionHead";
import type { Project, ProjectCategory } from "../types";

const FILTERS: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "Tout" },
  { id: "web", label: "Web & PWA" },
  { id: "api", label: "APIs" },
  { id: "outils", label: "Outils & CLI" },
  { id: "desktop", label: "Desktop & Infra" },
];

function SitePreview({ liveUrl, title }: { liveUrl: string; title: string }) {
  const [imgError, setImgError] = useState(false);
  const screenshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(liveUrl)}?w=800&h=510`;

  if (imgError) {
    return (
      <div className="relative overflow-hidden">
        <div className="flex flex-col items-center justify-center h-44 sm:h-56 bg-app-darker gap-2.5 border border-app-hairline">
          <Globe className="h-8 w-8 text-app-accent/40" aria-hidden="true" />
          <p className="folio text-center px-4 max-w-[260px]">{title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group/preview relative overflow-hidden border border-app-hairline bg-app-darker">
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-app-hairline">
        <Globe className="h-3 w-3 text-app-accent shrink-0" aria-hidden="true" />
        <span className="folio !text-[10px] truncate">{liveUrl.replace(/^https?:\/\//, "")}</span>
      </div>
      <img
        src={screenshotUrl}
        alt={`Aperçu de ${title}`}
        className="w-full h-40 sm:h-48 object-cover object-top transition-transform duration-500 group-hover/preview:scale-[1.03]"
        loading="lazy"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

function ProjectCard({ project, idx, onOpen }: { key?: string | number; project: Project; idx: number; onOpen: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
      className="col-span-full md:col-span-6 xl:col-span-4 flex flex-col group cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-app-accent"
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Voir les détails du projet ${project.title}`}
    >
      {project.liveUrl ? (
        <SitePreview liveUrl={project.liveUrl} title={project.title} />
      ) : (
        <div className="border border-app-hairline bg-app-darker h-40 sm:h-48 flex items-center justify-center mb-0">
          <FolderGit2 className="h-9 w-9 text-app-text-muted/70" aria-hidden="true" />
        </div>
      )}

      <div className="pt-4 pb-6 flex flex-col flex-1">
        <div className="folio flex items-baseline justify-between mb-2">
          <span className="text-app-accent">{String(idx + 1).padStart(2, "0")}</span>
          <span>{project.period}</span>
        </div>
        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-app-text-white leading-snug group-hover:text-app-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-[13px] leading-relaxed text-app-text-muted mt-2 line-clamp-2 flex-none">
          {project.description}
        </p>
        <div className="mt-auto pt-4 flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="folio">{tech}</span>
            ))}
            {project.techStack.length > 3 && (
              <span className="folio">+{project.techStack.length - 3}</span>
            )}
          </div>
          <span className="folio !text-app-accent shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
            détail →
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const links = [
    ...(project.liveUrl ? [{ href: project.liveUrl, label: "Voir en ligne", icon: ExternalLink }] : []),
    ...(project.demoUrl && project.demoUrl !== project.liveUrl ? [{ href: project.demoUrl, label: "Démo", icon: ExternalLink }] : []),
    ...(project.githubUrl ? [{ href: project.githubUrl, label: "Code source", icon: Github }] : []),
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Détails du projet ${project.title}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full sm:max-w-2xl lg:max-w-3xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto bg-app-bg border border-app-border-sec shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 sm:px-7 py-3.5 bg-app-bg/95 backdrop-blur-sm border-b border-app-hairline">
          <span className="kicker">{project.id} — {project.period}</span>
          <button
            ref={closeRef}
            onClick={onClose}
            className="p-1.5 -mr-1.5 border border-app-hairline text-app-text-muted hover:text-app-accent hover:border-app-accent transition cursor-pointer"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {project.liveUrl && (
          <div className="px-5 sm:px-7 pt-5">
            <SitePreview liveUrl={project.liveUrl} title={project.title} />
          </div>
        )}

        <div className="px-5 sm:px-7 py-6">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-app-text-white leading-tight" data-optical>
            {project.title}
          </h3>

          <p className="mt-4 text-sm leading-[1.85] text-app-text-body">
            {project.description}
          </p>

          <div className="mt-6 pt-4 border-t border-app-hairline">
            <span className="kicker block mb-3">Technologies</span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="font-mono text-[11px] border border-app-hairline px-2.5 py-1 text-app-text-body">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {links.map((link) => {
                const Icon = link.icon;
                const isPrimary = link.label !== "Code source";
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
                      isPrimary
                        ? "bg-app-accent text-app-bg hover:bg-app-accent-dark"
                        : "border border-app-border-sec text-app-text-white hover:border-app-accent hover:text-app-accent"
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" /> {link.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const { projects } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = activeFilter === "all" ? projects : projects.filter(p => p.category === activeFilter);

  const countFor = useCallback(
    (id: ProjectCategory | "all") =>
      id === "all" ? projects.length : projects.filter(p => p.category === id).length,
    [projects]
  );

  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section className="py-20 sm:py-28 border-b border-app-hairline scroll-mt-20 relative" id="projects-section">
      <div className="wrap relative">
        <SectionHead num="01" title="Projets" meta={`${projects.length} réalisations — open source`} />

        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-10 sm:mb-12" role="tablist" aria-label="Filtrer les projets par catégorie">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(f.id)}
                className={`pb-1 text-[13px] font-medium tracking-wide transition-colors cursor-pointer border-b-2 ${
                  isActive
                    ? "text-app-text-white border-app-accent"
                    : "text-app-text-muted border-transparent hover:text-app-text-white"
                }`}
              >
                {f.label} <span className="font-mono text-[10px] text-app-text-muted tabular-nums">{countFor(f.id)}</span>
              </button>
            );
          })}
        </div>

        <div className="grid12 row-gap-12">
          {filtered.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} onOpen={() => setSelected(project)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  );
}
