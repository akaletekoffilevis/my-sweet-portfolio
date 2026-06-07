import { usePortfolio } from "../context/PortfolioContext";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectsSection() {
  const { projects } = usePortfolio();

  return (
    <section className="py-20 px-6 border-b border-app-border-subtle" id="projects-section">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title mb-2">Projets</h2>
        <p className="section-subtitle mb-10">Réalisations et études de cas</p>

        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-app-card card-glow rounded-2xl p-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-app-text-muted bg-app-bg px-3 py-1 rounded-lg border border-app-border-subtle">
                  {project.period}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-app-text-white mb-3">{project.title}</h3>
              <p className="text-app-text-body leading-relaxed mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {(Array.isArray(project.techStack) ? project.techStack : project.techStack.split(",")).map((tech: string) => (
                  <span key={tech.trim()} className="text-xs bg-app-accent-light text-app-accent px-3 py-1 rounded-lg font-medium">
                    {tech.trim()}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-app-accent text-white rounded-lg text-sm font-medium hover:bg-app-accent-dark transition">
                    <Github className="w-4 h-4" /> Code source
                  </a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-app-accent text-app-accent rounded-lg text-sm font-medium hover:bg-app-accent-light transition">
                    <ExternalLink className="w-4 h-4" /> Démo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
