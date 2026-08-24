import { Skill, Project, Service, Certification } from "./types";

export const PROFILE_DATA = {
  name: "Koffi Lévis Akalete",
  title: "Ambassadeur 10000 CODEURS | Développeur Full Stack Junior",
  location: "Niamey, Niger / Télétravail possible",
  bio: "Étudiant en Mathématiques-Informatique à l'Université Abdou Moumouni de Niamey. Ambassadeur 10000 CODEURS — formation aux Soft Skills et éthique professionnelle pour transformer l'écosystème numérique africain. Spécialisé .NET (ASP.NET Core, Blazor, MAUI), je conçois des APIs REST performantes, sécurisées (JWT) et documentées (Swagger), Des Sites Web, Appli Mobile et Logiciel Sur Mesure. En formation Flutter/Firebase via le FlutterFireSummerCamp. Stack : C#, .NET, Blazor, SQL Server, Docker, Git, React.",
  avatarUrl: "/images/koffi_avatar_1780568229358.webp",
  phone: "+227 91 53 52 20",
  socials: {
    github: "https://github.com/akaletekoffilevis",
    linkedin: "https://linkedin.com/in/akalete-koffi-levis",
    email: "koffilevis21@gmail.com",
    whatsapp: "+227 91 53 52 20"
  },
  certUrl: "https://www.freecodecamp.org/certification/akalete_koffi_levis/foundational-c-sharp-with-microsoft",
  metrics: [
    { label: "Projets", value: "15+", desc: "APIs, Web, Mobile, CLI, Desktop" },
    { label: "Formation", value: "Licence (En cours)", desc: "Math-Info — Université Abdou Moumouni" },
    { label: "Certifications", value: "5", desc: "Microsoft, Flutter, .NET, web" }
  ]
};

export const SKILLS_DATA: Skill[] = [
  {
    name: "C#",
    category: "languages",
    level: 82,
    experienceYears: 1.5,
    icon: "Code2",
    description: "Langage principal : POO, APIs REST, applications console, architectures microservices."
  },
  {
    name: "SQL",
    category: "languages",
    level: 75,
    experienceYears: 1.5,
    icon: "Database",
    description: "Requêtes relationnelles, modélisation de données, SQLite, SQL Server, MySQL."
  },
  {
    name: "Python",
    category: "languages",
    level: 65,
    experienceYears: 1,
    icon: "SquareTerminal",
    description: "Scripts, automatisation, GTK3, formation pédagogique."
  },
  {
    name: "JavaScript / TypeScript",
    category: "languages",
    level: 60,
    experienceYears: 1.5,
    icon: "Terminal",
    description: "Frontend React, Node.js, Socket.io, Vite."
  },
  {
    name: "PHP",
    category: "languages",
    level: 55,
    experienceYears: 1,
    icon: "Terminal",
    description: "POO, MVC, interactions avec bases de données, développement web backend."
  },
  {
    name: "Go",
    category: "languages",
    level: 20,
    experienceYears: 0.5,
    icon: "Terminal",
    description: "Notions de base, initiation."
  },
  {
    name: "HTML5 / CSS3",
    category: "languages",
    level: 78,
    experienceYears: 2,
    icon: "Layout",
    description: "Intégration d'interfaces responsives avec Tailwind CSS."
  },
  {
    name: ".NET / ASP.NET Core",
    category: "frameworks",
    level: 80,
    experienceYears: 1.5,
    icon: "Layers",
    description: "APIs RESTful, Minimal APIs, MVC, Entity Framework Core, JWT."
  },
  {
    name: "Blazor",
    category: "frameworks",
    level: 75,
    experienceYears: 1.5,
    icon: "Zap",
    description: "Blazor WebAssembly, MudBlazor, PWA, composants interactifs."
  },
  {
    name: "React",
    category: "frameworks",
    level: 55,
    experienceYears: 0.5,
    icon: "Terminal",
    description: "Sites interactifs, Socket.io, Vite, Tailwind CSS."
  },
  {
    name: "SQLite / EF Core",
    category: "databases",
    level: 78,
    experienceYears: 1.5,
    icon: "Database",
    description: "ORM Entity Framework Core, migrations, persistance de données."
  },
  {
    name: "MySQL",
    category: "databases",
    level: 60,
    experienceYears: 1,
    icon: "Database",
    description: "Requêtes, conception de schémas, relations, jointures."
  },
  {
    name: "Git / GitHub",
    category: "devops",
    level: 85,
    experienceYears: 2,
    icon: "GitBranch",
    description: "Versioning, branches, pull requests, GitHub Actions."
  },
  {
    name: "Docker",
    category: "devops",
    level: 50,
    experienceYears: 0.5,
    icon: "Boxes",
    description: "Conteneurisation de base, docker-compose."
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "bible-pwa",
    category: "web",
    title: "Bible Louis Segond — PWA Blazor",
    period: "2025 - En cours",
    description: "Application PWA complète développée en Blazor WebAssembly .NET 9 avec MudBlazor 8.x. Elle embarque les 66 livres de la Bible avec chargement paresseux, recherche plein texte avec index inversé (modes AND/OR/exact), lecture audio verset par verset (Web Speech API), génération d'images de versets (Canvas API, 12 palettes), export PDF par chapitre, quiz biblique, suivi de progression, plans de lecture sur 1 an, et thème sombre/clair. Entièrement fonctionnelle hors-ligne grâce au service worker PWA.",
    techStack: ["C#", ".NET 9", "Blazor WebAssembly", "MudBlazor 8", "IndexedDB", "PWA"],
    githubUrl: "https://github.com/akaletekoffilevis/Bible",
    demoUrl: "https://bibeli.vercel.app",
    liveUrl: "https://bibeli.vercel.app"
  },
  {
    id: "portfolio",
    category: "web",
    title: "Mon Portfolio — React + Vite + Tailwind",
    period: "2026",
    description: "Portfolio développeur personnel conçu avec React 19, Vite 6 et Tailwind CSS v4. Design terminal dark/light, screenshots live via mShots, formulaire de contact avec envoi email SMTP, responsive mobile-first. Déployé sur Vercel.",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS v4", "Nodemailer"],
    githubUrl: "https://github.com/akaletekoffilevis/my-sweet-portfolio",
    liveUrl: "https://akaletekoffilevis.vercel.app"
  },
  {
    id: "minichat-realtime",
    category: "web",
    title: "Discutons — Chat Temps-Réel",
    period: "2026",
    description: "Application de chat temps-réel avec React et Socket.io. Fonctionnalités : messagerie instantanée sans création de compte, envoi de stickers, messages audio, partage de fichiers, interface moderne et responsive.",
    techStack: ["React", "Socket.io", "CSS", "JavaScript"],
    githubUrl: "https://github.com/akaletekoffilevis/minichat-realtime",
    liveUrl: "https://discutons.vercel.app"
  },
  {
    id: "nextdev-blazor",
    category: "web",
    title: "NextDev Blazor App",
    period: "2025",
    description: "Application Blazor WebAssembly .NET 9 — site vitrine pour le groupe Dan Kassawoua (MSA Niger — NextDev). Affiche les membres de l'équipe avec profils détaillés, routage Blazor, données JSON statiques, design responsive.",
    techStack: ["C#", ".NET 9", "Blazor WebAssembly", "HTML", "CSS"],
    githubUrl: "https://github.com/akaletekoffilevis/nextdevblazor-app",
    demoUrl: "http://dankassawa.runasp.net",
    liveUrl: "http://dankassawa.runasp.net"
  },
  {
    id: "scaffolder-cli",
    category: "outils",
    title: "Scaffolder CLI",
    period: "2025 - En cours",
    description: "CLI universel écrit en C# .NET 9 avec System.CommandLine pour générer des projets dans plus de 20 langages via 40+ commandes. Compilé en binaire natif AOT (12MB) multi-plateforme. Dispose d'une intégration IA (OpenAI, Claude, Gemini) pour suggérer des architectures, de plugins extensibles, et de commandes pour Docker, CI/CD et déploiement.",
    techStack: ["C#", ".NET 9", "System.CommandLine", "Native AOT", "OpenAI/Claude API"],
    githubUrl: "https://github.com/akaletekoffilevis/Scaffolder-CLI",
    demoUrl: "https://scaffolder-cli.vercel.app",
    liveUrl: "https://scaffolder-cli.vercel.app"
  },
  {
    id: "yt-downloader-docs",
    category: "web",
    title: "YT Downloader — Site de Documentation",
    period: "2026",
    description: "Site de documentation officielle pour YT Downloader, application de bureau pour télécharger des vidéos YouTube. Présente les fonctionnalités (file d'attente, choix de qualité, thème clair/sombre, bilingue FR/EN), les téléchargements multi-plateformes (Windows, Linux, macOS) et les captures d'écran. Déployé sur Vercel.",
    techStack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/akaletekoffilevis/youtube-downloader",
    liveUrl: "https://yt-downloader-docs.vercel.app/"
  },
  {
    id: "hair-salon-tp",
    category: "web",
    title: "Hair Salon — TP Intégration Web",
    period: "2026",
    description: "Petit projet de TP : site vitrine responsive pour salon de coiffure. Intégration HTML/CSS avec design moderne et responsive, déployé sur GitHub Pages.",
    techStack: ["HTML", "CSS"],
    githubUrl: "https://github.com/akaletekoffilevis/hair-salon-tp",
    liveUrl: "https://akaletekoffilevis.github.io/hair-salon-tp/"
  },
  {
    id: "lumin-site-test",
    category: "web",
    title: "Lumin — TP Présentation",
    period: "2026",
    description: "Petit projet de TP : site de présentation déployé sur GitHub Pages. Design responsive avec animations.",
    techStack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/akaletekoffilevis/lumin-site-test",
    liveUrl: "https://akaletekoffilevis.github.io/lumin-site-test/"
  },
  {
    id: "dotnetniger",
    category: "api",
    title: "DotnetNiger — API Communautaire .NET",
    period: "2026",
    description: "API ASP.NET Core 9 pour la plateforme communautaire des développeurs .NET au Niger. Développement de l'API REST avec authentification , gestion des membres, posts, événements et ressources. SQL Server avec Entity Framework Core. Projet open-source collaboratif avec La Communauter DotnetNiger.",
    techStack: ["C#", ".NET 9", "ASP.NET Core", "ASP.NET Identity", "Entity Framework Core", "SQL Server"],
    githubUrl: "https://github.com/DelaliAbel/DotnetNiger"
  },
  {
    id: "todos-api",
    category: "api",
    title: "Todos API — API REST sécurisée",
    period: "2025",
    description: "API REST robuste avec ASP.NET Core 9 et Entity Framework Core. Implémente l'authentification JWT avec enregistrement et connexion utilisateurs, isolation des données par utilisateur via les claims JWT, hash PBKDF2 (100K itérations) pour les mots de passe, CRUD complet pour les tâches, et documentation Swagger interactive.",
    techStack: ["C#", "ASP.NET Core 9", "Entity Framework Core", "SQLite", "JWT Bearer", "Swagger"],
    githubUrl: "https://github.com/akaletekoffilevis/todosapi"
  },
  {
    id: "student-console-manager",
    category: "outils",
    title: "Student Console Manager",
    period: "2025",
    description: "Application console en C# .NET 9 permettant la gestion CRUD complète d'un registre d'étudiants avec persistance JSON. Fonctionnalités : ajout, modification, listage, suppression, recherche par numéro d'étudiant, suppression protégée par mot de passe.",
    techStack: ["C#", ".NET 9", "JSON"],
    githubUrl: "https://github.com/akaletekoffilevis/studentconsolemanager"
  },
  {
    id: "scholl-api",
    category: "api",
    title: "SchollApi — API de gestion scolaire",
    period: "2025",
    description: "API REST avec ASP.NET Core 9 pour la gestion des cours scolaires. Opérations CRUD complètes avec Entity Framework Core et base SQLite.",
    techStack: ["C#", ".NET 9", "ASP.NET Core", "Entity Framework Core", "SQLite"],
    githubUrl: "https://github.com/akaletekoffilevis/SchollApi"
  },
  {
    id: "smart-downloader",
    category: "desktop",
    title: "SmartDownloader — Téléchargeur YouTube Desktop",
    period: "2026",
    description: "Application desktop Python avec interface GTK3 pour télécharger des vidéos et playlists YouTube via yt-dlp. Interface dark moderne, sélection de qualité (4K, 1080p, 720p, MP3), détection automatique des médias, suivi de progression en temps réel, téléchargement par lots et annulation.",
    techStack: ["Python", "GTK3", "yt-dlp", "PyGObject"],
    githubUrl: "https://github.com/akaletekoffilevis/SmartDownloader"
  },
  {
    id: "challenge-dotnet-niger",
    category: "desktop",
    title: "Challenge .NET Niger — Hébergement & Infrastructure",
    period: "2026",
    description: "Projet de déploiement d'infrastructure complète pour le Challenge NextDev. Mise en place d'un serveur Ubuntu avec DNS BIND9, DHCP, Apache2 en reverse proxy, et déploiement d'applications .NET 9 (Razor Pages + Minimal API) avec base SQLite. Scripts d'automatisation et documentation complète.",
    techStack: [".NET 9", "Apache", "BIND9", "Linux", "Python", "Bash"],
    githubUrl: "https://github.com/akaletekoffilevis/challenge-dotnet-niger"
  },
  {
    id: "mytodosapp",
    category: "web",
    title: "MyTodosApp — Gestion de Tâches ASP.NET Core",
    period: "2026",
    description: "Application web de gestion de tâches moderne avec ASP.NET Core 9 et Entity Framework Core. CRUD complet, tri intelligent par date de création, validation serveur, design responsive Bootstrap 5, base SQLite persistante.",
    techStack: ["C#", "ASP.NET Core 9", "Entity Framework Core", "SQLite", "Bootstrap 5", "jQuery"],
    githubUrl: "https://github.com/akaletekoffilevis/mytodosapp"
  },
  {
    id: "nextdev-api",
    category: "api",
    title: "NextDev API — Minimal API .NET 9",
    period: "2026",
    description: "API Minimal ASP.NET Core 9 pour la gestion des membres de l'équipe DANKASSAWA. Endpoints CRUD complets, documentation Swagger interactive, base SQLite avec Entity Framework Core. Architecture RESTful légère et performante.",
    techStack: ["C#", ".NET 9", "ASP.NET Core Minimal API", "Entity Framework Core", "SQLite", "Swagger"],
    githubUrl: "https://github.com/akaletekoffilevis/nextdevapi"
  },
  {
    id: "homebrew-scaffolder",
    category: "outils",
    title: "Homebrew Tap — Scaffolder",
    period: "2026",
    description: "Formulaire Homebrew pour installer Scaffolder-CLI via le gestionnaire de paquets macOS. Permet l'installation via 'brew install akaletekoffilevis/scaffolder/scaffolder'.",
    techStack: ["Ruby", "Homebrew"],
    githubUrl: "https://github.com/akaletekoffilevis/homebrew-scaffolder"
  }
];

export const CERTS_DATA: Certification[] = [
  {
    id: "freecodecamp-csharp",
    issuer: "freeCodeCamp / Microsoft",
    title: "Foundational C# with Microsoft",
    date: "Janvier 2026",
    kind: "image",
    file: "/images/Certificat FreecodeCamp.webp",
    url: "https://www.freecodecamp.org/certification/akalete_koffi_levis/foundational-c-sharp-with-microsoft"
  },
  {
    id: "nextflutter",
    issuer: "NextFlutter",
    title: "Dart Avancé — Certification Flutter Developer",
    date: "27 Juillet 2026",
    kind: "image",
    file: "/images/certificat-nextflutter.png"
  },
  {
    id: "gabera",
    issuer: "Gabera Foundation",
    title: "Certificat de Participation — .NET, Intelligence Artificielle & Robotique",
    date: "3 - 7 Août 2026",
    kind: "image",
    file: "/images/attestation-gabera.jpeg"
  },
  {
    id: "mille-codeurs",
    issuer: "10000 CODEURS",
    title: "Passeport Numérique",
    date: "28 Mars 2026",
    kind: "pdf",
    file: "/images/certificat-10000codeurs.pdf"
  },
  {
    id: "simplilearn",
    issuer: "Simplilearn",
    title: "Boost your Web Development Career: Introduction to C#",
    date: "13 Août 2026",
    kind: "pdf",
    file: "/images/certificat-simplilearn.pdf"
  }
];

export const SERVICES_DATA: Service[] = [
  {
    title: "APIs REST sur mesure",
    icon: "Server",
    desc: "Développement d'APIs avec ASP.NET Core 9 : JWT, Minimal APIs, documentation Swagger, Entity Framework Core, validation, isolation utilisateur.",
    tech: "C# / .NET 9",
  },
  {
    title: "Applications Blazor / PWA",
    icon: "Globe",
    desc: "Applications web interactives en Blazor WebAssembly, PWA hors-ligne, MudBlazor, recherche plein texte, IndexedDB, génération d'images côté client.",
    tech: "Blazor .NET 9",
  },
  {
    title: "Outils CLI & Console",
    icon: "SquareTerminal",
    desc: "Générateurs de projets, applications console de gestion, System.CommandLine, compilation Native AOT, exécutables multi-plateforme.",
    tech: "C# / .NET 9",
  },
  {
    title: "Bases de données",
    icon: "Database",
    desc: "Conception de schémas, migrations Entity Framework Core, requêtes SQL, persistance avec SQLite, SQL Server et MySQL.",
    tech: "SQL / EF Core",
  },
  {
    title: "Maintenance & évolution",
    icon: "Wrench",
    desc: "Reprise de projets .NET existants, refactoring, mise à jour vers .NET 9, ajout de tests, amélioration des performances.",
    tech: "C# / .NET",
  },
  {
    title: "Déploiement & CI/CD",
    icon: "Rocket",
    desc: "Configuration Docker, docker-compose, pipelines GitHub Actions, déploiement sur Vercel, hébergement d'APIs et sites statiques.",
    tech: "Docker / GitHub Actions",
  },
  {
    title: "Sites web & Applications React",
    icon: "PanelTop",
    desc: "Développement de sites vitrines, landing pages, applications interactives avec React, HTML5, CSS3, Tailwind CSS, intégration d'APIs.",
    tech: "React / HTML / CSS / JS",
  },
  {
    title: "Applications mobiles",
    icon: "Smartphone",
    desc: "Développement d'applications mobiles avec React Native (cross-platform) et C#/.NET MAUI (native), interfaces modernes et connexion aux APIs.",
    tech: "React Native / C# MAUI",
  },
];
