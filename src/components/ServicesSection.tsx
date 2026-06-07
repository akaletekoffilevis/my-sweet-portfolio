import { Terminal } from "lucide-react";

const services = [
  {
    title: "APIs REST sur mesure",
    desc: "Développement d'APIs avec ASP.NET Core 9 : JWT, Minimal APIs, documentation Swagger, Entity Framework Core, validation, isolation utilisateur.",
    tech: "C# / .NET 9",
  },
  {
    title: "Applications Blazor / PWA",
    desc: "Applications web interactives en Blazor WebAssembly, PWA hors-ligne, MudBlazor, recherche plein texte, IndexedDB, génération d'images côté client.",
    tech: "Blazor .NET 9",
  },
  {
    title: "Outils CLI & Console",
    desc: "Générateurs de projets, applications console de gestion, System.CommandLine, compilation Native AOT, exécutables multi-plateforme.",
    tech: "C# / .NET 9",
  },
  {
    title: "Bases de données",
    desc: "Conception de schémas, migrations Entity Framework Core, requêtes SQL, persistance avec SQLite, SQL Server et MySQL.",
    tech: "SQL / EF Core",
  },
  {
    title: "Maintenance & évolution",
    desc: "Reprise de projets .NET existants, refactoring, mise à jour vers .NET 9, ajout de tests, amélioration des performances.",
    tech: "C# / .NET",
  },
  {
    title: "Déploiement & CI/CD",
    desc: "Configuration Docker, docker-compose, pipelines GitHub Actions, déploiement sur Vercel, hébergement d'APIs et sites statiques.",
    tech: "Docker / GitHub Actions",
  },
  {
    title: "Sites web & Applications React",
    desc: "Développement de sites vitrines, landing pages, applications interactives avec React, HTML5, CSS3, Tailwind CSS, intégration d'APIs.",
    tech: "React / HTML / CSS / JS",
  },
  {
    title: "Applications mobiles",
    desc: "Développement d'applications mobiles avec React Native (cross-platform) et C#/.NET MAUI (native), interfaces modernes et connexion aux APIs.",
    tech: "React Native / C# MAUI",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 px-6 border-b border-app-border-subtle" id="services-section">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title mb-2">Services</h2>
        <p className="section-subtitle mb-10">Ce que je peux faire pour vous</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc, idx) => (
            <div key={idx} className="bg-app-bg border border-app-border-subtle rounded-xl overflow-hidden hover:border-app-accent/20 transition-all duration-300">
              <div className="flex items-center gap-1.5 px-4 py-2 bg-app-darker border-b border-app-border-subtle">
                <span className="w-2 h-2 rounded-full bg-red-500/60" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                <span className="w-2 h-2 rounded-full bg-green-500/60" />
                <Terminal className="h-3 w-3 text-app-accent ml-2" />
                <span className="text-[10px] font-mono text-app-text-muted">service-{idx + 1}</span>
              </div>
              <div className="p-5">
                <div className="text-[10px] font-mono text-app-accent mb-3 tracking-wider uppercase">
                  <span className="text-app-text-muted">$ </span>{svc.tech}
                </div>
                <h3 className="text-sm font-mono font-semibold text-app-text-white mb-2">{svc.title}</h3>
                <p className="text-xs font-mono text-app-text-soft leading-relaxed">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
