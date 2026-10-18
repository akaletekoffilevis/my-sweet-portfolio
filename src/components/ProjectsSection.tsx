import { useState, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import { useT } from "../i18n";
import { ProjectCard, ProjectModal } from "./projects/ProjectParts";
import type { Project, ProjectCategory } from "../types";

type FilterId = ProjectCategory | "all";

export default function ProjectsSection() {
  const { projects } = usePortfolio();
  const t = useT();
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const FILTERS: { id: FilterId; label: string }[] = [
    { id: "all", label: t.projects.filters.all },
    { id: "web", label: t.projects.filters.web },
    { id: "mobile", label: t.projects.filters.mobile },
    { id: "api", label: t.projects.filters.api },
    { id: "outils", label: t.projects.filters.outils },
    { id: "desktop", label: t.projects.filters.desktop },
  ];

  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  const countFor = useCallback(
    (id: FilterId) => (id === "all" ? projects.length : projects.filter((p) => p.category === id).length),
    [projects],
  );

  const closeModal = useCallback(() => setSelected(null), []);

  const selIdx = selected ? filtered.findIndex((p) => p.id === selected.id) : -1;
  const goPrev = selIdx > 0 ? () => setSelected(filtered[selIdx - 1]) : undefined;
  const goNext = selIdx >= 0 && selIdx < filtered.length - 1 ? () => setSelected(filtered[selIdx + 1]) : undefined;

  return (
    <section className="py-12 sm:py-16 border-b border-app-hairline relative">
      <div className="wrap relative">
        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-10 sm:mb-12" role="tablist" aria-label={t.projects.filterAria}>
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
        {selected && <ProjectModal project={selected} onClose={closeModal} onPrev={goPrev} onNext={goNext} />}
      </AnimatePresence>
    </section>
  );
}
