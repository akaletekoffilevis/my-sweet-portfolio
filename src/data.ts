import { Skill, Project, Service, Certification, TimelineEntry, MethodStep, SoftSkill } from "./types";

export const PROFILE_DATA = {
  name: "Koffi Lévis Akalete",
  title: "Ambassadeur 10000 CODEURS | Développeur Full Stack Junior",
  location: "Niamey, Niger / Télétravail possible",
  bio: "Étudiant en Mathématiques-Informatique à l'Université Abdou Moumouni de Niamey et Ambassadeur 10000 CODEURS. Développeur junior full stack, encore en apprentissage : j'affine mes compétences au quotidien sur C#, .NET (ASP.NET Core, Blazor) et les APIs REST sécurisées (JWT, Swagger), avec des bases en React et Flutter. Participant au FlutterSummerCamp, j'apprends en construisant des projets concrets — sites web, applications mobiles et outils — toujours avec l'envie de progresser.",
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
    { label: "Certifications", value: "10+", desc: "Microsoft, Flutter, .NET, web" }
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
    name: "Dart",
    category: "languages",
    level: 76,
    experienceYears: 0.5,
    icon: "Code2",
    description: "Langage principal utiliser par flutter pour les applications mobiles, desktop et web multiplatforme"
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
    name: "Flutter",
    category: "frameworks",
    level: 72,
    experienceYears: 0.5,
    icon: "Layers",
    description: "Mobile, Desktop, Web and Mutli Platform"
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
    name: "Next.js",
    category: "frameworks",
    level: 60,
    experienceYears: 0.5,
    icon: "Atom",
    description: "Next.js 16 (App Router), React 19, Tailwind v4, Prisma — boutiques, sites bilingues FR/EN."
  },
  {
    name: "Firebase",
    category: "databases",
    level: 55,
    experienceYears: 0.5,
    icon: "Database",
    description: "Authentification Google, Cloud Firestore, backends temps réel pour applications mobiles."
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
    id: "ecommerce-connected",
    category: "mobile",
    title: "E-commerce Connected — Flutter + DummyJSON",
    period: "2026",
    description: "Application mobile e-commerce Flutter connectée à une API réelle (DummyJSON) suivant une architecture Clean. Authentification JWT avec refresh token automatique, cache local Hive (produits, catégories, panier), mode hors-ligne avec bascule automatique sur le cache via le suivi réseau (Connectivity), navigation go_router, intercepteurs Dio (auth + gestion d'erreurs), stockage de tokens, Repository Pattern (interface domaine + implémentation data), gestion d'erreurs centralisée (Failures/Exceptions) et tests de repository avec mocktail.",
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
    id: "taskly",
    category: "mobile",
    title: "Taskly — Gestion de tâches Flutter",
    period: "2026",
    description: "Application de gestion de tâches production-ready développée pour le programme 10000CODEURS. Architecture clean par features avec BLoC/Cubit, backend réel Firebase (authentification Google + Cloud Firestore) complété par un cache local Hive pour le mode hors-ligne, navigation go_router, internationalisation FR/EN (fichiers ARB), design premium inspiré d'iOS, écrans Focus et Statistiques, accessibilité (labels sémantiques) et suite de tests complète (unit, widget, integration_test) avec pipeline GitHub Actions.",
    techStack: ["Flutter", "Dart", "BLoC", "Firebase", "Hive", "go_router"],
    githubUrl: "https://github.com/akaletekoffilevis/todo_pro"
  },
  {
    id: "task-manager-cli",
    category: "outils",
    title: "Task Manager — CLI Dart",
    period: "2026",
    description: "Application de gestion de tâches en ligne de commande écrite en Dart pur, sans Flutter. Démonstration d'orienté objet avancé : classes abstraites, héritage (tâches régulières et urgentes), factory pattern, génériques, couche repository, exceptions personnalisées, parsing d'arguments (package args) et persistance JSON. Équipée d'une suite de tests unitaires.",
    techStack: ["Dart", "CLI", "JSON", "args"],
    githubUrl: "https://github.com/akaletekoffilevis/task_manager"
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
    id: "flutterfirecamp",
    issuer: "FlutterFire Camp",
    title: "FlutterFire Summeer Camp",
    date: "23 Octobre 2026",
    kind: "image",
    file: "/images/certificat-ffsc-ffc-2026-lrn-ptqatt-koffi-l-vis-akalete.png",
    url: "https://flutterfirecamp.dev/verify/FFC-2026-LRN-PTQATT"
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
    id: "elearning-web-mobile",
    issuer: "E-LEARNING POUR TOUS",
    title: "CERTIFICAT DE FORMATION - Développement Web et Mobile",
    date: "25 Septembre 2026",
    kind: "pdf",
    file: "/images/certificat_developpement_web_mgcconsulting.pdf"
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
  },
  {
    id: "agrhymet-climat",
    issuer: "CILSS / Centre Régional AGRHYMET",
    title: "Intégration du changement climatique dans les politiques nationales, locales et sectorielles",
    date: "28 Septembre 2026",
    kind: "pdf",
    file: "/images/attestation-agrhymet-cilss.pdf"
  },
  {
    id: "badge-ambassadeur-10000codeurs",
    issuer: "10000 CODEURS",
    title: "Badge Ambassadeur — 10000 CODEURS",
    date: "Juin 2026",
    kind: "pdf",
    file: "/images/badge-ambassadeur-10000codeurs.pdf"
  },
  {
    id: "flufithon26",
    issuer: "FlutterHackathon 26",
    title: "Participant — FlutterHackathon 26",
    date: "Septembre 2026",
    kind: "image",
    file: "/images/certificat-flufithon26.webp"
  }
];

export const SERVICES_DATA: Service[] = [
  {
    title: "Développement d'APIs REST",
    icon: "Server",
    desc: "Je crée le moteur invisible derrière vos applications : échanges sécurisés entre votre site, votre app mobile et vos données. Comptes utilisateurs, paiements, tout ce qui doit être protégé l'est.",
    tech: "C# / .NET 9",
  },
  {
    title: "Applications web & PWA",
    icon: "Globe",
    desc: "Sites et applications qui fonctionnent même sans connexion, se chargent vite et s'installent comme une app sur le téléphone. Idéal pour des outils utilisés au quotidien.",
    tech: "Blazor .NET 9",
  },
  {
    title: "Applications mobiles Flutter",
    icon: "Smartphone",
    desc: "Applications iOS et Android à partir d'un seul code : interface fluide, fonctionnement hors-ligne, connexion à vos services. Un seul développement, deux plateformes.",
    tech: "Flutter / Dart",
  },
  {
    title: "Outils CLI & Automatisation",
    icon: "SquareTerminal",
    desc: "Petits programmes qui font le travail répétitif à votre place : génération de projets, traitements de fichiers, automatisation de tâches. Un clic et c'est fait.",
    tech: "C# / .NET 9",
  },
  {
    title: "Bases de données",
    icon: "Database",
    desc: "Organisation et optimisation de vos données pour qu'elles soient rapides, fiables et sécurisées. Je conçois la structure, la fais évoluer et la garde performante.",
    tech: "SQL / EF Core",
  },
  {
    title: "Sites web & interfaces React",
    icon: "PanelTop",
    desc: "Sites vitrines, pages de présentation et interfaces interactives, adaptés à tous les écrans. Modernes, rapides et faciles à mettre à jour.",
    tech: "React / HTML / CSS",
  },
  {
    title: "Maintenance & évolution",
    icon: "Wrench",
    desc: "Reprise de projets existants : corrections de bugs, modernisation, ajout de fonctionnalités et amélioration des performances. Votre application reste à jour et fiable.",
    tech: "C# / .NET",
  },
  {
    title: "Déploiement & CI/CD",
    icon: "Rocket",
    desc: "Mise en ligne automatisée et fiable de vos applications : hébergement, mise à jour en un clic, sauvegardes. Vous vous concentrez sur votre métier, je gère la technique.",
    tech: "Docker / GitHub Actions",
  },
  {
    title: "Tests & qualité logicielle",
    icon: "FlaskConical",
    desc: "Vérification que votre application fonctionne correctement dans tous les cas, y compris les imprévus. Livraison d'un rapport clair des problèmes trouvés.",
    tech: "Tests automatisés",
  },
  {
    title: "Formation & initiation au codage",
    icon: "GraduationCap",
    desc: "Initiation à la programmation pour débutants : HTML, CSS, logique, Git, C# et .NET. Accompagnement pas à pas, adapté à votre rythme.",
    tech: "HTML / CSS / C#",
  },
  {
    title: "Intégration IA",
    icon: "Sparkles",
    desc: "Ajout d'intelligence artificielle à vos applications : assistants qui répondent à vos questions, recherche dans vos documents, automatisation de tâches. Multi-fournisseurs (Gemini, GPT).",
    tech: "IA / RAG",
  },
  {
    title: "Sites bilingues FR / EN",
    icon: "Languages",
    desc: "Sites disponibles en plusieurs langues avec bascule instantanée et détection automatique de la langue du visiteur. Idéal pour toucher un public international.",
    tech: "i18n / React",
  },
  {
    title: "Micro-SaaS de bout en bout",
    icon: "ShoppingBag",
    desc: "Application en ligne complète et prête à vendre : comptes utilisateurs, paiement, base de données, hébergement. De l'idée au premier client.",
    tech: "Next.js / Supabase / Stripe",
  },
  {
    title: "Installation & maintenance informatique",
    icon: "Laptop",
    desc: "Installation de systèmes et logiciels, mise à jour de PC, dépannage et optimisation — pour particuliers et professionnels à Niamey.",
    tech: "Windows / Linux",
  },
  {
    title: "Maintenance & mise à jour de sites web",
    icon: "RefreshCw",
    desc: "Entretien de votre site existant : mises à jour de contenu, correctifs de sécurité, sauvegardes et améliorations. Votre site reste actif et sécurisé.",
    tech: "Audit / Monitoring",
  },
  {
    title: "Tests d'applications & parcours",
    icon: "ClipboardCheck",
    desc: "Vérification de vos applications sur de vrais scénarios utilisateur : je teste les parcours importants et vous livre un rapport de bugs priorisé.",
    tech: "Tests E2E",
  },
  {
    title: "Publication de logiciels",
    icon: "PackageCheck",
    desc: "Mise en distribution de vos applications sur les plateformes officielles (Microsoft Store, Homebrew…) : installateurs multi-plateformes et mises à jour.",
    tech: "winget / Scoop / Homebrew",
  },
];

export const TIMELINE_DATA: TimelineEntry[] = [
  {
    period: "2024",
    title: "Premiers pas dans la programmation",
    desc: "Découverte de la programmation avec HTML/CSS et Python : premiers sites statiques, exercices d'algorithmique et logique de résolution de problèmes. Le déclic : comprendre qu'un logiciel s'écrit ligne par ligne.",
    tags: ["HTML/CSS", "Python", "Algorithmique"],
  },
  {
    period: "2025",
    title: "Cap sur C# et l'écosystème .NET",
    desc: "Approfondissement du C#, de l'orienté objet et des APIs REST avec ASP.NET Core. Premières API sécurisées (JWT, Swagger), applications Blazor WebAssembly, outils CLI et premiers déploiements en production.",
    tags: ["C#", ".NET", "ASP.NET Core", "Blazor", "REST"],
  },
  {
    period: "Janvier 2026",
    title: "Certification Microsoft (freeCodeCamp)",
    desc: "Obtention du certificat « Foundational C# with Microsoft » — validation officielle des fondamentaux du langage : POO, gestion des exceptions, collections, LINQ.",
    tags: ["Certification", "Microsoft", "freeCodeCamp"],
  },
  {
    period: "Mars 2026",
    title: "Passeport Numérique & Ambassadeur 10000 CODEURS",
    desc: "Rejoint la communauté 10000 CODEURS, obtient le Passeport Numérique puis le titre d'Ambassadeur. Transmission aux autres apprenants, participation aux événements et projets collaboratifs.",
    tags: ["10000 CODEURS", "Ambassadeur", "Communauté"],
  },
  {
    period: "Été 2026",
    title: "Bascule mobile Flutter",
    desc: "Participation au FlutterSummerCamp, puis 5 certifications NextFlutter (Dart, Routing, Riverpod, APIs, Tests). Développement d'applications mobiles complètes : e-commerce, gestion de tâches, interfaces clonées. Formation Gabera (.NET, IA & Robotique).",
    tags: ["Flutter", "Dart", "Riverpod", "Firebase", "Tests"],
  },
  {
    period: "Septembre 2026",
    title: "Consolidation & ouverture",
    desc: "Attestation CILSS/AGRHYMET (intégration du changement climatique dans les politiques), participation au FlutterHackathon 26, applications en mode production-ready avec CI/CD et architecture clean. Aujourd'hui : monter en compétences sur Next.js et les micro-SaaS.",
    tags: ["AGRHYMET", "FlutterHackathon", "CI/CD", "Next.js"],
    current: true,
  },
];

export const METHOD_DATA: MethodStep[] = [
  {
    step: "01",
    title: "Échange & cadrage",
    desc: "On discute de votre besoin, de vos objectifs et de vos contraintes. Pas de jargon inutile : je vous explique ce qui est faisable, comment, et en combien de temps.",
  },
  {
    step: "02",
    title: "Proposition & devis gratuit",
    desc: "Vous recevez une proposition claire : périmètre, technologies, calendrier et prix fixé à l'avance. Aucune surprise en cours de route.",
  },
  {
    step: "03",
    title: "Développement transparent",
    desc: "Code propre et commenté, dépôts GitHub dédiés, avancement visible. Vous suivez l'avancement à chaque étape et donnez votre retour.",
  },
  {
    step: "04",
    title: "Tests & recette",
    desc: "Tests automatisés (unit, intégration) et vérification des parcours clés avec vous. On corrige ensemble avant la mise en ligne.",
  },
  {
    step: "05",
    title: "Mise en ligne",
    desc: "Déploiement sur Vercel, VPS ou Docker selon le projet. Nom de domaine, e-mails, HTTPS : tout est configuré et vérifié.",
  },
  {
    step: "06",
    title: "Suivi & maintenance",
    desc: "Corrections, évolutions, sauvegardes et monitoring. Restons en contact : un projet vit après sa livraison.",
  },
];

export const SOFT_SKILLS_DATA: SoftSkill[] = [
  {
    icon: "Users",
    title: "Travail d'équipe",
    desc: "Projets collaboratifs open-source (DotnetNiger, Challenge NextDev) et programmes communautaires (10000 CODEURS, FlutterSummerCamp) : git partagé, pull requests, revues de code et entraide.",
  },
  {
    icon: "Lightbulb",
    title: "Autodidacte & curieux",
    desc: "C#, Blazor, Flutter, Dart, Python, PHP… la plupart de mes compétences viennent de la documentation officielle, de certifications et de projets personnels. J'apprends en construisant.",
  },
  {
    icon: "MessageSquare",
    title: "Communication",
    desc: "Expliquer des concepts techniques à des débutants (HTML, CSS, Git), rédiger des README et documentations claires, présenter mes projets à la communauté.",
  },
  {
    icon: "Puzzle",
    title: "Résolution de problèmes",
    desc: "Méthode systématique : reproduire, isoler, comprendre la cause racine, corriger, tester. Persévérance sur les bugs les plus têtus et lecture attentive des messages d'erreur.",
  },
  {
    icon: "Shuffle",
    title: "Adaptabilité",
    desc: "Bascule web → mobile (Flutter), C# → Dart, Python ou PHP selon le besoin du projet. Chaque nouveau projet est une occasion d'adopter une nouvelle stack sans perdre en qualité.",
  },
  {
    icon: "Flag",
    title: "Leadership & transmission",
    desc: "Ambassadeur 10000 CODEURS : accompagner, motiver et orienter les autres apprenants. Le fait d'enseigner force à solidifier et à partager ce que je sais.",
  },
];
