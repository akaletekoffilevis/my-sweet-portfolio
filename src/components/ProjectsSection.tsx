import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Github, ExternalLink, Folder, Globe } from "lucide-react";

function SitePreview({ liveUrl, title }: { liveUrl: string; title: string }) {
  const [imgError, setImgError] = useState(false);
  const screenshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(liveUrl)}?w=800&h=510`;

  return (
    <div className="mb-4 border border-app-border-subtle overflow-hidden group/preview">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-app-darker border-b border-app-border-subtle">
        <Globe className="h-3 w-3 text-app-accent" />
        <span className="text-[10px] font-mono text-app-accent truncate max-w-[200px]">{liveUrl.replace(/^https?:\/\//, "")}</span>
        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-app-text-muted hover:text-app-accent ml-auto transition shrink-0">
          ouvrir ↗
        </a>
      </div>
      {!imgError ? (
        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden cursor-pointer">
          <img
            src={screenshotUrl}
            alt={`Aperçu de ${title}`}
            className="w-full h-48 sm:h-72 object-cover object-top bg-app-darker transition-transform duration-500 group-hover/preview:scale-[1.02]"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-app-bg/80 via-transparent to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="flex items-center gap-1.5 px-4 py-2 bg-app-accent/20 border border-app-accent/40 text-xs font-mono text-app-accent backdrop-blur-sm">
              <ExternalLink className="w-3 h-3" /> ouvrir le site
            </span>
          </div>
        </a>
      ) : (
        <a href={liveUrl} target="_blank" rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-48 sm:h-72 bg-app-darker gap-3 hover:bg-app-accent/5 transition-colors">
          <Globe className="h-10 w-10 text-app-accent/30" />
          <p className="text-xs font-mono text-app-text-muted text-center px-4 max-w-[260px]">{title}</p>
          <span className="flex items-center gap-1.5 px-4 py-2 border border-app-accent/30 text-xs font-mono text-app-accent hover:bg-app-accent/10 transition">
            <ExternalLink className="w-3 h-3" /> ouvrir le site ↗
          </span>
        </a>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const { projects } = usePortfolio();

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 border-b border-app-border-subtle scroll-mt-20" id="projects-section">
      <div className="mx-auto max-w-screen-2xl">
        <h2 className="section-title mb-2">Projets</h2>
        <p className="section-subtitle mb-6 sm:mb-10">Réalisations et études de cas</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {projects.map((project) => (
            <div key={project.id} className="bg-app-bg border border-app-border-subtle hover:border-app-accent/20 transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-app-darker border-b border-app-border-subtle">
                <span className="w-1.5 h-1.5 bg-red-500/60" aria-hidden="true" />
                <span className="w-1.5 h-1.5 bg-yellow-500/60" aria-hidden="true" />
                <span className="w-1.5 h-1.5 bg-green-500/60" aria-hidden="true" />
                <Folder className="h-3 w-3 text-app-accent ml-1.5" />
                <span className="text-[10px] sm:text-xs font-mono text-app-text-muted">{project.id}/</span>
                <span className="text-[10px] sm:text-xs font-mono text-app-text-muted ml-auto">{project.period}</span>
              </div>
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h3 className="text-sm sm:text-base font-mono font-semibold text-app-text-white mb-2">{project.title}</h3>
                <p className="text-[11px] sm:text-xs font-mono text-app-text-body leading-relaxed mb-3 line-clamp-4">{project.description}</p>

                {project.liveUrl && (
                  <SitePreview liveUrl={project.liveUrl} title={project.title} />
                )}

                <div className="flex flex-wrap gap-1.5 mb-3 mt-auto">
                  {(Array.isArray(project.techStack) ? project.techStack : project.techStack.split(",")).map((tech: string) => (
                    <span key={tech.trim()} className="text-[10px] sm:text-[11px] font-mono bg-app-accent/10 text-app-accent border border-app-accent/10 px-2 py-0.5">
                      <span className="text-app-text-muted">$</span> {tech.trim()}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-app-accent/10 border border-app-accent/20 text-xs sm:text-sm font-mono text-app-accent hover:bg-app-accent/20 transition">
                      <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="text-app-text-muted">$</span> code-source
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-app-accent/40 text-xs sm:text-sm font-mono text-app-accent hover:bg-app-accent/10 transition">
                      <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="text-app-text-muted">$</span> voir-en-ligne
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
