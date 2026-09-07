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
    { label: "Projets", value: "20+", desc: "APIs, Web, Mobile, CLI, Desktop" },
    { label: "Formation", value: "Licence (En cours)", desc: "Math-Info — Université Abdou Moumouni" },
    { label: "Certifications", value: "9", desc: "Microsoft, Flutter, .NET, web" }
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
  },
  {
    id: "ecommerce-connected",
    category: "mobile",
    title: "E-commerce Connected — Flutter + DummyJSON",
    period: "2026",
    description: "Application mobile e-commerce Flutter connectée à une API réelle (DummyJSON) suivant une architecture Clean. Authentification JWT avec refresh token automatique, cache local Hive (produits, catégories, panier), mode hors-ligne avec bascule automatique sur le cache via le suivi réseau (Connectivity), Repository Pattern (interface domaine + implémentation data), gestion d'erreurs centralisée et 3 tests de repository avec mocktail.",
    techStack: ["Flutter", "Dart", "Clean Architecture", "Riverpod", "Hive", "Dio", "JWT"],
    githubUrl: "https://github.com/akaletekoffilevis/ecommerce-connected"
  },
  {
    id: "ecommerce-app",
    category: "mobile",
    title: "E-commerce App — Flutter + Riverpod",
    period: "2026",
    description: "Application mobile e-commerce complète avec Riverpod comme unique solution de state management (7+ providers). Catalogue produits en grille responsive, panier avec gestion des quantités et total, favoris persistés (SharedPreferences), filtrage par catégorie, tri et recherche texte, profil utilisateur éditable, navigation à 4 onglets avec badge panier et animations.",
    techStack: ["Flutter", "Dart", "Riverpod", "SharedPreferences"],
    githubUrl: "https://github.com/akaletekoffilevis/ecommerce_app"
  },
  {
    id: "whatsapp-clone",
    category: "mobile",
    title: "WhatsApp Clone — Interface Flutter",
    period: "2026",
    description: "Clone de l'interface de WhatsApp réalisé avec Flutter. Reproduction fidèle des écrans et de la navigation de l'application de messagerie : liste de discussions, Vue des onglets, jusqu'aux éléments d'interface caractéristiques. Projet d'apprentissage dédié à la maîtrise du layout Flutter et du design d'applications mobiles.",
    techStack: ["Flutter", "Dart"],
    githubUrl: "https://github.com/akaletekoffilevis/whatsapp_clone"
  },
  {
    id: "recettes-app",
    category: "mobile",
    title: "Recettes App — Flutter",
    period: "2026",
    description: "Application Flutter multi-écrans sur le thème de la cuisine : liste de recettes avec recherche, filtrage par catégorie et suppression (appui long + confirmation), écran de détail avec ingrédients et étapes, formulaire d'ajout validé sur 4 champs et réglages avec bascule thème clair/sombre sauvegardée (SharedPreferences). Responsive : liste sur mobile, grille sur tablette.",
    techStack: ["Flutter", "Dart", "SharedPreferences"],
    githubUrl: "https://github.com/akaletekoffilevis/recettes_app"
  },
  {
    id: "yt-downloader-landing",
    category: "web",
    title: "YT Downloader — Landing Page",
    period: "2026",
    description: "Landing page bilingue FR/EN pour YouTube Downloader, l'application de téléchargement de vidéos. Présente les pages Fonctionnalités, Téléchargement et FAQ, avec un formulaire de contact alimenté par Nodemailer. Design responsive et déployé sur Vercel.",
    techStack: ["HTML", "CSS", "JavaScript", "Nodemailer"],
    githubUrl: "https://github.com/akaletekoffilevis/ytdownloader-landing",
    liveUrl: "https://ytdownloader-gamma-two.vercel.app"
  },
  {
    id: "scaffold-docs",
    category: "web",
    title: "Scaffolder — Site de Documentation",
    period: "2026",
    description: "Site de documentation du CLI Scaffolder : référence des 40+ commandes de génération de projets, guide d'installation et intégration IA. Construit en TypeScript avec build statique dans dist/, déployé sur Vercel.",
    techStack: ["TypeScript", "HTML", "CSS"],
    githubUrl: "https://github.com/akaletekoffilevis/scaffold-docs",
    liveUrl: "https://scaffold-docs.vercel.app"
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
    file: "/images/certificat-nextflutter.png",
    url: "https://nextflutter.com/certifications/verify/NF-2026-4481DECA"
  },
  {
    id: "nextflutter-routing",
    issuer: "NextFlutter",
    title: "Navigation et Routing — Certification Flutter Developer",
    date: "11 Août 2026",
    kind: "image",
    file: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fnextflutter.com%2Fcertifications%2Fverify%2FNF-2026-8369F553?w=800&h=510",
    url: "https://nextflutter.com/certifications/verify/NF-2026-8369F553"
  },
  {
    id: "nextflutter-riverpod",
    issuer: "NextFlutter",
    title: "State Management avec Riverpod — Certification Flutter Developer",
    date: "19 Août 2026",
    kind: "image",
    file: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fnextflutter.com%2Fcertifications%2Fverify%2FNF-2026-4454D89B?w=800&h=510",
    url: "https://nextflutter.com/certifications/verify/NF-2026-4454D89B"
  },
  {
    id: "nextflutter-api",
    issuer: "NextFlutter",
    title: "Appels Réseau et APIs — Certification Flutter Developer",
    date: "19 Août 2026",
    kind: "image",
    file: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fnextflutter.com%2Fcertifications%2Fverify%2FNF-2026-AC344062?w=800&h=510",
    url: "https://nextflutter.com/certifications/verify/NF-2026-AC344062"
  },
  {
    id: "nextflutter-tests",
    issuer: "NextFlutter",
    title: "Tests en Flutter — Certification Flutter Developer",
    date: "5 Septembre 2026",
    kind: "image",
    file: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fnextflutter.com%2Fcertifications%2Fverify%2FNF-2026-C2140A80?w=800&h=510",
    url: "https://nextflutter.com/certifications/verify/NF-2026-C2140A80"
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
    title: "Développement d'APIs REST",
    icon: "Server",
    desc: "Conception et construction d'APIs REST performantes et sécurisées avec ASP.NET Core 9 : authentification JWT, validation des données, documentation interactive Swagger et isolation des données par utilisateur.",
    tech: "C# / .NET 9",
  },
  {
    title: "Applications web & PWA",
    icon: "Globe",
    desc: "Développement d'applications web interactives en Blazor WebAssembly : fonctionnement hors-ligne, recherche plein texte, stockage local IndexedDB, composants MudBlazor et thème sombre/clair.",
    tech: "Blazor .NET 9",
  },
  {
    title: "Applications mobiles Flutter",
    icon: "Smartphone",
    desc: "Création d'applications iOS et Android avec Flutter et Dart : state management Riverpod, cache local Hive, appels réseau aux APIs et mode hors-ligne, avec une architecture Clean, testable et maintenable.",
    tech: "Flutter / Dart / Riverpod",
  },
  {
    title: "Outils CLI & Automatisation",
    icon: "SquareTerminal",
    desc: "Développement d'outils en ligne de commande pour automatiser vos workflows : générateurs de projets, scripts de gestion, compilation native AOT et exécutables multi-plateformes.",
    tech: "C# / .NET 9",
  },
  {
    title: "Bases de données",
    icon: "Database",
    desc: "Conception et optimisation de bases de données : modélisation des schémas, migrations Entity Framework Core, requêtes SQL performantes et persistance fiable avec SQLite, SQL Server et MySQL.",
    tech: "SQL / EF Core",
  },
  {
    title: "Sites web & interfaces React",
    icon: "PanelTop",
    desc: "Création de sites vitrines, landing pages et applications interactives : intégration responsive, Tailwind CSS, composants React, connexion à des APIs et déploiement statique.",
    tech: "React / HTML / CSS",
  },
  {
    title: "Maintenance & évolution",
    icon: "Wrench",
    desc: "Reprise et modernisation de vos projets : refactoring, montée de version vers .NET 9, correction de bugs, ajout de tests et amélioration des performances et de la sécurité.",
    tech: "C# / .NET",
  },
  {
    title: "Déploiement & CI/CD",
    icon: "Rocket",
    desc: "Mise en production automatisée et fiable : conteneurisation Docker, pipelines GitHub Actions, hébergement sur Vercel ou vos serveurs, supervision des déploiements.",
    tech: "Docker / GitHub Actions",
  },
  {
    title: "Tests & qualité logicielle",
    icon: "FlaskConical",
    desc: "Mise en place de stratégies de test pour fiabiliser vos applications : tests unitaires et de repository (mocktail), ainsi que d'intégration sur Flutter, Dart et .NET.",
    tech: "Flutter Test / xUnit",
  },
  {
    title: "Formation & accompagnement",
    icon: "GraduationCap",
    desc: "Accompagnement et montée en compétence de vos équipes : formations pratiques sur .NET, Blazor, Flutter et Dart, revue de code et bonnes pratiques d'architecture.",
    tech: "Mentorat / Soft Skills",
  },
];
