import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import {
  FileCode2, Database, Terminal, Braces, Code2, SquareTerminal, Layout,
  Layers, Zap, Atom, Container, GitBranch, Boxes,
} from "lucide-react";
import SectionHead from "./SectionHead";

const iconMap: Record<string, ReactNode> = {
  "C#": <FileCode2 className="h-4 w-4" />,
  SQL: <Database className="h-4 w-4" />,
  Python: <Terminal className="h-4 w-4" />,
  "JavaScript / TypeScript": <Braces className="h-4 w-4" />,
  PHP: <Code2 className="h-4 w-4" />,
  Go: <SquareTerminal className="h-4 w-4" />,
  "HTML5 / CSS3": <Layout className="h-4 w-4" />,
  ".NET / ASP.NET Core": <Layers className="h-4 w-4" />,
  Blazor: <Zap className="h-4 w-4" />,
  React: <Atom className="h-4 w-4" />,
  "SQLite / EF Core": <Database className="h-4 w-4" />,
  MySQL: <Database className="h-4 w-4" />,
  "Git / GitHub": <GitBranch className="h-4 w-4" />,
  Docker: <Container className="h-4 w-4" />,
};

const fallbackIcons = [FileCode2, Database, Layers];

const categories = [
  { id: "all", label: "Tout" },
  { id: "languages", label: "Langages" },
  { id: "frameworks", label: "Frameworks" },
  { id: "databases", label: "Bases de données" },
  { id: "devops", label: "DevOps" },
];

const CATEGORY_LABELS: Record<string, string> = {
  languages: "langage",
  frameworks: "framework",
  databases: "database",
  devops: "devops",
};

export default function SkillsSection() {
  const { skills } = usePortfolio();
  const [activeTab, setActiveTab] = useState("all");

  const filtered = skills.filter(s => activeTab === "all" || s.category === activeTab);

  return (
    <section className="py-20 sm:py-28 border-b border-app-hairline scroll-mt-20 relative" id="skills-section">
      <div className="wrap relative">
        <SectionHead num="03" title="Compétences" meta={`${skills.length} technologies`} />

        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-10 sm:mb-12" role="tablist" aria-label="Filtrer les compétences par catégorie">
          {categories.map(cat => {
            const isActive = activeTab === cat.id;
            const count = cat.id === "all" ? skills.length : skills.filter(s => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(cat.id)}
                className={`pb-1 text-[13px] font-medium tracking-wide transition-colors cursor-pointer border-b-2 ${
                  isActive
                    ? "text-app-text-white border-app-accent"
                    : "text-app-text-muted border-transparent hover:text-app-text-white"
                }`}
              >
                {cat.label} <span className="font-mono text-[10px] text-app-text-muted tabular-nums">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="grid12">
          {filtered.map((skill, idx) => {
            const FallbackIcon = fallbackIcons[idx % fallbackIcons.length];
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: (idx % 3) * 0.06 }}
                className={`col-span-full sm:col-span-6 xl:col-span-4 py-7 ${
                  idx % 3 !== 0 ? "xl:border-l xl:border-app-hairline xl:pl-8" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 flex items-center justify-center border border-app-hairline text-app-accent bg-app-card">
                      {iconMap[skill.name] || <FallbackIcon className="h-4 w-4" />}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold tracking-tight text-app-text-white leading-tight">{skill.name}</h3>
                      <span className="folio block mt-0.5">{CATEGORY_LABELS[skill.category]} · {skill.experienceYears} an(s)</span>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-semibold text-app-text-white tabular-nums">{skill.level}<span className="text-app-text-muted text-xs">%</span></span>
                </div>

                <p className="text-[13px] leading-relaxed text-app-text-muted mt-3.5 min-h-[2.6em]">{skill.description}</p>

                <div
                  className="mt-3 h-[3px] bg-app-hairline overflow-hidden"
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.name} — niveau ${skill.level}%`}
                >
                  <motion.div
                    className="h-full bg-app-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 + (idx % 3) * 0.08 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
