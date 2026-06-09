import { Skill, Project } from "./types";

export const JOHN_DOE_PROFILE = {
  name: "Koffi Lévis Akalete",
  title: "Développeur Backend/Full-Stack Junior",
  location: "Niamey, Niger / Télétravail possible",
  bio: "Passionné par l'architecture des systèmes et la logique, je suis actuellement étudiant en Mathématiques-Informatique à l'Université Abdou Moumouni de Niamey. Mon objectif est clair : devenir un expert en développement Backend capable de bâtir les infrastructures numériques de demain. Admis au sein de l'association 10000 Codeurs, je cultive les Soft Skills et l'éthique professionnelle pour transformer l'écosystème numérique africain. Spécialisé dans l'univers .NET (ASP.NET Core), je conçois des API REST performantes, sécurisées (JWT) et documentées (Swagger). Stack : .NET Core, C#, SQL Server, PostgreSQL, Docker, Git.",
  avatarUrl: "/images/koffi_avatar_1780568229358.png",
  phone: "+227 91 53 52 20",
  socials: {
    github: "https://github.com/akaletekoffilevis",
    linkedin: "https://linkedin.com/in/akalete-koffi-levis",
    email: "koffilevis21@gmail.com",
    whatsapp: "+227 91 53 52 20"
  },
  metrics: [
    { label: "Projets", value: "8+", desc: "APIs, Web, Mobile, CLI, Console" },
    { label: "Formation", value: "Licence (En cours)", desc: "Informatique — Université Abdou Moumouni" },
    { label: "Certification", value: "Microsoft", desc: "C# Foundational — FreeCodeCamp" }
  ]
};

export const SKILLS_DATA: Skill[] = [
  {
    name: "C#",
    category: "languages",
    level: 82,
    experienceYears: 2,
    icon: "Code2",
    description: "Langage principal : POO, APIs REST, applications console, architectures microservices."
  },
  {
    name: "SQL",
    category: "languages",
    level: 75,
    experienceYears: 2,
    icon: "Database",
    description: "Requêtes relationnelles, modélisation de données, SQLite, SQL Server, MySQL."
  },
  {
    name: "Python",
    category: "languages",
    level: 65,
    experienceYears: 1,
    icon: "SquareTerminal",
    description: "Scripts, automatisation, formation pédagogique."
  },
  {
    name: "JavaScript / TypeScript",
    category: "languages",
    level: 60,
    experienceYears: 1,
    icon: "Terminal",
    description: "Interaction frontend, React, Node.js basique."
  },
  {
    name: "PHP",
    category: "languages",
    level: 55,
    experienceYears: 0.5,
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
    experienceYears: 2,
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
    name: "SQLite / EF Core",
    category: "databases",
    level: 78,
    experienceYears: 2,
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
    title: "Bible Louis Segond — PWA Blazor",
    period: "2025 - En cours",
    description: "Application PWA complète développée en Blazor WebAssembly .NET 9 avec MudBlazor 8.x. Elle embarque les 66 livres de la Bible avec chargement paresseux, recherche plein texte avec index inversé (modes AND/OR/exact), lecture audio verset par verset (Web Speech API), génération d'images de versets (Canvas API, 12 palettes), export PDF par chapitre, quiz biblique, suivi de progression, plans de lecture sur 1 an, et thème sombre/clair. Entièrement fonctionnelle hors-ligne grâce au service worker PWA.",
    techStack: ["C#", ".NET 9", "Blazor WebAssembly", "MudBlazor 8", "IndexedDB", "PWA"],
    githubUrl: "https://github.com/akaletekoffilevis/Bible",
    demoUrl: "https://bibeli.vercel.app"
  },
  {
    id: "scaffolder-cli",
    title: "Scaffolder CLI",
    period: "2025 - En cours",
    description: "CLI universel écrit en C# .NET 9 avec System.CommandLine pour générer des projets dans plus de 20 langages via 40+ commandes. Compilé en binaire natif AOT (12MB) multi-plateforme. Dispose d'une intégration IA (OpenAI, Claude, Gemini) pour suggérer des architectures, de plugins extensibles, et de commandes pour Docker, CI/CD et déploiement.",
    techStack: ["C#", ".NET 9", "System.CommandLine", "Native AOT", "OpenAI/Claude API"],
    githubUrl: "https://github.com/akaletekoffilevis/Scaffolder-CLI",
    demoUrl: "https://scaffolder-cli.vercel.app"
  },
  {
    id: "todos-api",
    title: "Todos API — API REST sécurisée",
    period: "2025",
    description: "API REST robuste avec ASP.NET Core 9 et Entity Framework Core. Implémente l'authentification JWT avec enregistrement et connexion utilisateurs, isolation des données par utilisateur via les claims JWT, hash PBKDF2 (100K itérations) pour les mots de passe, CRUD complet pour les tâches, et documentation Swagger interactive.",
    techStack: ["C#", "ASP.NET Core 9", "Entity Framework Core", "SQLite", "JWT Bearer", "Swagger"],
    githubUrl: "https://github.com/akaletekoffilevis/todosapi"
  },
  {
    id: "student-console-manager",
    title: "Student Console Manager",
    period: "2025",
    description: "Application console en C# .NET 9 permettant la gestion CRUD complète d'un registre d'étudiants avec persistance JSON. Fonctionnalités : ajout, modification, listage, suppression, recherche par numéro d'étudiant, suppression protégée par mot de passe.",
    techStack: ["C#", ".NET 9", "JSON"],
    githubUrl: "https://github.com/akaletekoffilevis/studentconsolemanager"
  },
  {
    id: "nextdev-blazor",
    title: "NextDev Blazor App",
    period: "2025",
    description: "Application Blazor WebAssembly .NET 9 — site vitrine pour le groupe Dan Kassawoua (MSA Niger — NextDev). Affiche les membres de l'équipe avec profils détaillés, routage Blazor, données JSON statiques, design responsive.",
    techStack: ["C#", ".NET 9", "Blazor WebAssembly", "HTML", "CSS"],
    githubUrl: "https://github.com/akaletekoffilevis/nextdevblazor-app",
    demoUrl: "http://dankassawa.runasp.net"
  },
  {
    id: "scholl-api",
    title: "SchollApi — API de gestion scolaire",
    period: "2025",
    description: "API REST avec ASP.NET Core 9 pour la gestion des cours scolaires. Opérations CRUD complètes avec Entity Framework Core et base SQLite.",
    techStack: ["C#", ".NET 9", "ASP.NET Core", "Entity Framework Core", "SQLite"],
    githubUrl: "https://github.com/akaletekoffilevis/SchollApi"
  }
];
