import { usePortfolio } from "../context/PortfolioContext";
import { Github, ExternalLink, Folder } from "lucide-react";

export default function ProjectsSection() {
  const { projects } = usePortfolio();

  return (
    <section className="py-20 px-6 border-b border-app-border-subtle" id="projects-section">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title mb-2">Projets</h2>
        <p className="section-subtitle mb-10">Réalisations et études de cas</p>

        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-app-bg border border-app-border-subtle rounded-xl overflow-hidden hover:border-app-accent/20 transition-all duration-300">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-app-darker border-b border-app-border-subtle">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" aria-hidden="true" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" aria-hidden="true" />
                <Folder className="h-3.5 w-3.5 text-app-accent ml-2" />
                <span className="text-xs font-mono text-app-text-muted">{project.id}/</span>
                <span className="text-sm font-mono text-app-text-muted ml-auto">{project.period}</span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-base font-mono font-semibold text-app-text-white">{project.title}</h3>
                </div>
                <p className="text-sm font-mono text-app-text-body leading-relaxed mb-5">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(Array.isArray(project.techStack) ? project.techStack : project.techStack.split(",")).map((tech: string) => (
                    <span key={tech.trim()} className="text-xs font-mono bg-app-accent/10 text-app-accent border border-app-accent/10 px-2.5 py-1 rounded-md">
                      <span className="text-app-text-muted">$</span> {tech.trim()}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2.5">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`Code source de ${project.title} sur GitHub`}
                      className="flex items-center gap-1.5 px-4 py-2 bg-app-accent/10 border border-app-accent/20 rounded-lg text-sm font-mono text-app-accent hover:bg-app-accent/20 transition">
                      <Github className="w-3.5 h-3.5" aria-hidden="true" /> <span className="text-app-text-muted">$</span> code-source
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Démo en ligne de ${project.title}`}
                      className="flex items-center gap-1.5 px-4 py-2 border border-app-border-subtle rounded-lg text-sm font-mono text-app-text-soft hover:border-app-accent/30 hover:text-app-accent transition">
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> <span className="text-app-text-muted">$</span> demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
