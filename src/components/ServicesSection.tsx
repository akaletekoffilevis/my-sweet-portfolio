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
];

export default function ServicesSection() {
  return (
    <section className="py-20 px-6 border-b border-app-border-subtle" id="services-section">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-app-text-white mb-2">Services</h2>
        <p className="text-app-text-soft mb-10">Ce que je peux faire pour vous</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, idx) => (
            <div key={idx} className="bg-app-card border border-app-border-subtle rounded-xl p-6 hover:border-app-accent/30 transition">
              <div className="text-xs font-mono text-app-accent mb-3 tracking-wider uppercase">
                {svc.tech}
              </div>
              <h3 className="font-semibold text-app-text-white mb-2">{svc.title}</h3>
              <p className="text-sm text-app-text-soft leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
