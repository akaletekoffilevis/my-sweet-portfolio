/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { usePortfolio } from "../context/PortfolioContext";
import { Project } from "../types";
import { Terminal, ShieldAlert, Github, ExternalLink } from "lucide-react";

export default function ProjectsSection() {
  const { projects } = usePortfolio();
  
  return (
    <section className="py-16 px-6 border-b border-app-border-subtle bg-app-bg transition-colors duration-200" id="projects-section">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <span className="text-[10px] font-mono text-app-text-muted uppercase tracking-[0.2em] block font-bold">// PRODUCTION ARCHIVES</span>
          <h2 className="text-4xl font-serif text-app-text-white font-normal mt-1">
            Projets & Réalisations Majeures
          </h2>
          <p className="text-app-text-soft text-sm max-w-xl font-light">
            Rapports de déploiement et études de cas réels. Chaque projet représente une réponse agile à un besoin critique de performance système.
          </p>
        </div>

        {/* Projects Timeline/Grid */}
        <div className="space-y-12">
          {projects.map((project: Project, index: number) => (
            <div
              key={project.id}
              className="group relative bg-app-card border border-app-border-subtle rounded-none p-6 lg:p-8 hover:border-app-border-strong transition-all duration-300"
            >
              {/* Highlight ribbon */}
              <div className="absolute top-0 left-0 w-[2px] h-full bg-app-text-white/10 group-hover:bg-app-text-white transition-all"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Profile descriptive (Left) */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex flex-wrap items-center gap-3 select-none">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-app-text-soft bg-app-bg px-2.5 py-1 rounded-none border border-app-border-sec">
                      {project.period}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-app-text-white bg-app-text-white/5 px-2.5 py-1 rounded-none border border-app-border-subtle">
                      SYS_PROD_STABLE
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-normal text-app-text-white group-hover:text-app-text-white/80 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-app-text-main leading-relaxed font-sans font-light">
                    {project.fullDescription}
                  </p>

                  {/* Challenges Section */}
                  <div className="space-y-3 bg-app-text-white/[0.01] p-5 rounded-none border border-app-border-subtle">
                    <h4 className="font-mono text-[10px] font-bold text-app-text-muted uppercase tracking-[0.15em] flex items-center gap-2">
                      <ShieldAlert className="h-3.5 w-3.5 text-app-text-muted" />
                      Défis d'ingénierie & résolutions
                    </h4>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, cIdx) => (
                        <li key={cIdx} className="text-xs text-app-text-soft flex items-start gap-2 leading-relaxed font-light">
                          <span className="text-app-text-muted font-mono mt-0.5">▸</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack pills */}
                  <div className="space-y-2.5">
                    <span className="text-[9px] font-mono text-app-text-muted uppercase tracking-[0.15em] block font-bold">STACK TECHNIQUE UTILISÉ</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] px-2.5 py-1 rounded-none bg-app-bg text-app-text-soft border border-app-border-subtle group-hover:border-app-border-strong transition duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key Metrics and Architecture Link (Right) */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  
                  {/* Performance metrics boxes */}
                  <div className="space-y-3">
                    <span className="text-[9px] font-mono text-app-text-muted uppercase tracking-[0.15em] block font-bold">MÉTRIQUES DE SUCCÈS</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                      {project.metrics.map((metric, mIdx) => (
                        <div
                          key={mIdx}
                          className="bg-app-bg border border-app-border-subtle p-4 rounded-none flex items-center justify-between group-hover:border-app-border-sec transition duration-200"
                        >
                          <span className="text-xs text-app-text-muted font-mono uppercase tracking-wider pr-2 font-bold">{metric.label}</span>
                          <span className="font-mono font-bold text-xs text-app-text-white bg-app-text-white/5 px-2.5 py-1 rounded-none border border-app-border-subtle">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Interactions Actions */}
                  <div className="bg-app-bg border border-app-border-subtle p-6 rounded-none space-y-4">
                    <div className="flex items-center gap-2 text-app-text-muted">
                      <Terminal className="h-4 w-4 text-app-text-muted" />
                      <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-app-text-soft">Ressources & Déploiement</span>
                    </div>
                    <p className="text-[11px] text-app-text-soft leading-relaxed font-sans font-light">
                      Accédez au code source audité sur GitHub ou consultez le service web actif pour tester les intégrations de démonstration.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-none font-mono text-[10px] uppercase font-bold tracking-widest text-app-bg bg-app-text-white hover:opacity-90 transition-all cursor-pointer shadow-md border border-transparent text-center"
                        >
                          <Github className="h-3.5 w-3.5" />
                          VOIR SUR GITHUB
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-none font-mono text-[10px] uppercase font-bold tracking-widest text-app-text-white bg-app-bg hover:bg-app-card transition-all cursor-pointer shadow-md border border-app-border-strong text-center"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          DÉMO EN LIGNE
                        </a>
                      )}
                    </div>
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
