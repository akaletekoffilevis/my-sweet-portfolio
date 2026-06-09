import { useState, type ReactNode } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Code2, Database, Layers, Terminal, Boxes, Layout, Zap, GitBranch, SquareTerminal } from "lucide-react";

const iconMap: Record<string, ReactNode> = {
  Code2: <Code2 className="h-4 w-4" />,
  Database: <Database className="h-4 w-4" />,
  Layers: <Layers className="h-4 w-4" />,
  Terminal: <Terminal className="h-4 w-4" />,
  Boxes: <Boxes className="h-4 w-4" />,
  Layout: <Layout className="h-4 w-4" />,
  Zap: <Zap className="h-4 w-4" />,
  GitBranch: <GitBranch className="h-4 w-4" />,
  SquareTerminal: <SquareTerminal className="h-4 w-4" />,
};

const categories = [
  { id: "all", label: "all" },
  { id: "languages", label: "languages" },
  { id: "frameworks", label: "frameworks" },
  { id: "databases", label: "databases" },
  { id: "devops", label: "devops" },
];

export default function SkillsSection() {
  const { skills } = usePortfolio();
  const [activeTab, setActiveTab] = useState("all");

  const filtered = skills.filter(s => activeTab === "all" || s.category === activeTab);

  return (
    <section className="py-20 px-6 border-b border-app-border-subtle" id="skills-section">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title mb-2">Compétences</h2>
        <p className="section-subtitle mb-8">Technologies et outils maîtrisés</p>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-mono border transition ${
                activeTab === cat.id
                  ? "bg-app-accent/10 border-app-accent/30 text-app-accent"
                  : "bg-app-bg border-app-border-subtle text-app-text-muted hover:border-app-accent/30"
              }`}
            >
              <span className="text-app-text-muted">$ </span>{cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill, idx) => (
            <div key={idx} className="bg-app-bg border border-app-border-subtle rounded-xl overflow-hidden hover:border-app-accent/20 transition-all duration-300">
              <div className="flex items-center gap-1.5 px-4 py-2 bg-app-darker border-b border-app-border-subtle">
                <span className="w-2 h-2 rounded-full bg-red-500/60" aria-hidden="true" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/60" aria-hidden="true" />
                <span className="w-2 h-2 rounded-full bg-green-500/60" aria-hidden="true" />
                <span className="text-xs font-mono text-app-text-muted ml-2">{skill.name.toLowerCase().replace(/\s+/g, "-")}.conf</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-1.5 rounded-md bg-app-accent/10 text-app-accent">
                    {iconMap[skill.icon] || <Code2 className="h-4 w-4" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-mono font-semibold text-app-text-white">{skill.name}</h3>
                    <span className="text-xs font-mono text-app-text-muted">{skill.experienceYears} an(s)</span>
                  </div>
                </div>
                <p className="text-sm font-mono text-app-text-soft leading-relaxed">{skill.description}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-mono text-app-text-muted mb-1.5">
                    <span>level</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-app-border-subtle rounded-full overflow-hidden">
                    <div className="h-full bg-app-accent rounded-full transition-all" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
