import { useState, type ReactNode } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Code2, Database, Layers, Terminal, Boxes, Layout, Zap, GitBranch, SquareTerminal } from "lucide-react";

const iconMap: Record<string, ReactNode> = {
  Code2: <Code2 className="h-5 w-5 text-app-accent" />,
  Database: <Database className="h-5 w-5 text-app-accent" />,
  Layers: <Layers className="h-5 w-5 text-app-accent" />,
  Terminal: <Terminal className="h-5 w-5 text-app-accent" />,
  Boxes: <Boxes className="h-5 w-5 text-app-accent" />,
  Layout: <Layout className="h-5 w-5 text-app-accent" />,
  Zap: <Zap className="h-5 w-5 text-app-accent" />,
  GitBranch: <GitBranch className="h-5 w-5 text-app-accent" />,
  SquareTerminal: <SquareTerminal className="h-5 w-5 text-app-accent" />,
};

const categories = [
  { id: "all", label: "Toutes" },
  { id: "languages", label: "Langages" },
  { id: "frameworks", label: "Frameworks" },
  { id: "databases", label: "Bases de données" },
  { id: "devops", label: "DevOps" },
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

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                activeTab === cat.id
                  ? "bg-app-accent text-white border-app-accent"
                  : "bg-app-card border-app-border-subtle text-app-text-muted hover:border-app-accent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((skill, idx) => (
            <div key={idx} className="bg-app-card card-glow p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-app-accent-light">
                  {iconMap[skill.icon] || <Code2 className="h-5 w-5 text-app-accent" />}
                </div>
                <div>
                  <h3 className="font-semibold text-app-text-white">{skill.name}</h3>
                  <span className="text-xs text-app-text-muted">{skill.experienceYears} an(s)</span>
                </div>
              </div>
              <p className="text-sm text-app-text-soft leading-relaxed">{skill.description}</p>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-app-text-muted mb-1">
                  <span>Maîtrise</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-2 bg-app-border-subtle rounded-full overflow-hidden">
                  <div className="h-full bg-app-accent rounded-full transition-all" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
