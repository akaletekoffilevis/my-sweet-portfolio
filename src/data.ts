/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Skill, Project, ApiEndpoint } from "./types";

export const JOHN_DOE_PROFILE = {
  name: "Koffi Lévis Akalete",
  title: "Développeur Backend Junior",
  location: "Niamey, Niger / Télétravail possible",
  bio: "Étudiant en informatique orienté développement backend avec une solide base en C#/.NET et en développement web côté serveur. Habitué aux projets concrets, à l'autoformation active et aux environnements de développement modernes.",
  avatarUrl: "/src/assets/images/koffi_avatar_1780568229358.png", // Newly generated professional portrait avatar
  socials: {
    github: "https://github.com/akaletekoffilevis",
    linkedin: "https://linkedin.com/in/akalete-koffi-levis",
    email: "kiffilevis21@gmail.com",
    gpgKey: "9A3C 41B1 E09D A7CF C209 EF1A B23D",
    whatsapp: "+227 91 53 52 20"
  },
  metrics: [
    { label: "Projets Pratiques", value: "5+", desc: "Applications réelles C#/.NET, Web et Console" },
    { label: "Formation", value: "Licence", desc: "Informatique & Développement Logiciel" },
    { label: "Certification", value: "Microsoft", desc: "C# Free Foundation par FreeCodeCamp" },
    { label: "Langues", value: "4", desc: "Français, Haoussa, Zarma, Anglais" }
  ]
};

export const SKILLS_DATA: Skill[] = [
  // Langages
  {
    name: "C#",
    category: "languages",
    level: 80,
    experienceYears: 1.5,
    icon: "Code2",
    description: "Langage principal utilisé pour la programmation orientée objet, le développement console et les architectures d'APIs."
  },
  {
    name: "SQL",
    category: "languages",
    level: 75,
    experienceYears: 1.5,
    icon: "Database",
    description: "Bases de données relationnelles, requêtes de tri, structuration de bases MySQL, SQLite et SQL Server."
  },
  {
    name: "JavaScript / Python / PHP",
    category: "languages",
    level: 70,
    experienceYears: 1,
    icon: "SquareTerminal",
    description: "Intégration d'éléments interactifs, scripts utilitaires locaux et serveurs élémentaires dynamiques."
  },
  {
    name: "HTML5 / CSS3",
    category: "languages",
    level: 82,
    experienceYears: 1.5,
    icon: "Terminal",
    description: "Intégration d'interfaces web réactives, structuration sémantique et mise en page responsive fluide."
  },
  {
    name: "Go / C",
    category: "languages",
    level: 55,
    experienceYears: 0.5,
    icon: "Cpu",
    description: "Notions algorithmiques de base pour la manipulation de structures de données et gestion mémoire élémentaire."
  },
  // Frameworks
  {
    name: ".NET / ASP.NET",
    category: "frameworks",
    level: 78,
    experienceYears: 1.5,
    icon: "Layers",
    description: "Création d'APIs RESTful saines, contrôleurs réutilisables, séparation MVC et connexion aux bases de données."
  },
  {
    name: "Blazor",
    category: "frameworks",
    level: 72,
    experienceYears: 1,
    icon: "Zap",
    description: "Mise au point de composants web interactifs en C# côté client pour un écosystème réactif Single Page."
  },
  // Databases / Méthodologies
  {
    name: "MySQL & SQLite",
    category: "databases",
    level: 76,
    experienceYears: 1.5,
    icon: "Database",
    description: "Conception, requêtes de requêtes CRUD de base, création de modèles et persistance de données embarquées ou distantes."
  },
  {
    name: "OOP & MVC (Concepts)",
    category: "databases",
    level: 80,
    experienceYears: 1.5,
    icon: "Shuffle",
    description: "Solide appréciation des concepts de l'encapsulation, polymorphisme, héritage et de l'architecture découplée."
  },
  // DevOps
  {
    name: "Git / GitHub / VS Code",
    category: "devops",
    level: 85,
    experienceYears: 2,
    icon: "GitBranch",
    description: "Branchements réactifs de versioning de code, gestion de dépôts en ligne et maîtrise de l'éditeur de code au quotidien."
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "dotnetniger-api",
    title: "DotnetNiger API - Projet Communautaire",
    period: "2024 - En cours",
    shortDescription: "API de pilotage technique pour un projet communautaire de développeurs .NET visant à concevoir et améliorer des solutions.",
    fullDescription: "DotnetNiger API est un projet de collaboration communautaire qui réunit des passionnés du framework .NET au Niger. Dans ce cadre, j'assure le pilotage technique, concevant des solutions backend réutilisables pour la communauté et optimisant les processus d'intégration continue.",
    techStack: ["C#", ".NET", "ASP.NET Core", "SQL Server", "GitHub Actions"],
    metrics: [
      { label: "Membres actifs", value: "30+" },
      { label: "Endpoints API", value: "12+" }
    ],
    architectureSummary: "Entièrement codé en ASP.NET Core MVC avec Entity Framework Core pour le mappage relationnel et SQL Server comme base de données centralisée.",
    challenges: [
      "Orchestration des contributions d'une équipe ouverte de développeurs bénévoles.",
      "Mise en place de tests unitaires pour stabiliser les routes clés de l'API."
    ],
    githubUrl: "https://github.com/akaletekoffilevis/dotnetniger-api",
    architectureDiagram: [
      { id: "community_devs", title: "Développeurs de la Communauté", subtitle: "REST Requests", type: "client", description: "Consomment l'API ou partagent de nouvelles fonctionnalités.", connections: ["dotnet_api_server"] },
      { id: "dotnet_api_server", title: "API DotnetNiger Core", subtitle: "ASP.NET Core Server", type: "service", description: "Vérifie les requêtes, orchestre les modules métier.", metric: "REST Core", connections: ["mssql_db"] },
      { id: "mssql_db", title: "SQL Server Centralisé", subtitle: "Microsoft SQL Server", type: "database", description: "Enregistre l'ensemble des données d'utilisateurs et des contributions.", metric: "Relational DB", connections: [] }
    ]
  },
  {
    id: "nextdev-blazor",
    title: "Next Dev Blazor App",
    period: "2024 (Formation NextDev)",
    shortDescription: "Application web interactive développée dans le cadre de la formation intensive NextDev.",
    fullDescription: "Next Dev Blazor App est une application moderne démontrant l'utilisation du framework Blazor de Microsoft. Elle implémente la création de composants interactifs réutilisables, un state management réactif et la liaison de données bidirectionnelle sans require d'échanges lourds côté JavaScript.",
    techStack: ["C#", "Blazor", ".NET", "HTML5", "CSS3", "SQLite"],
    metrics: [
      { label: "Temps de chargement", value: "< 1.5s" },
      { label: "Composants réutilisés", value: "15+" }
    ],
    architectureSummary: "Le frontend tire pleinement profit du modèle d'assembly Blazor WebAssembly ou Blazor Server pour exécuter du code C# de façon fluide.",
    challenges: [
      "Assurer une réactivité optimale des formulaires et liaisons de saisies de données.",
      "Prise en main de l'architecture de composants Blazor."
    ],
    githubUrl: "https://github.com/akaletekoffilevis/nextdev-blazor",
    demoUrl: "https://blazor-demo.example.com",
    architectureDiagram: [
      { id: "browser_client", title: "Navigateur Client WebAssembly", subtitle: "Blazor Interactif", type: "client", description: "Gère les interactions utilisateur en code C# pré-compilé.", connections: ["sqlite_embedded"] },
      { id: "sqlite_embedded", title: "Fichier de Base SQLite", subtitle: "SQLite Database", type: "database", description: "Base relationnelle locale embarquée légère pour conserver l'état des exercices.", connections: [] }
    ]
  },
  {
    id: "student-manager",
    title: "Student Manager Console",
    period: "2024 (Projet Académique)",
    shortDescription: "Application de bureau en console permettant la gestion CRUD d'un registre d'étudiants avec persistance SQLite.",
    fullDescription: "Conçu pour valider les concepts essentiels de la Programmation Orientée Objet (POO) et de la persistance de données, Student Manager Console permet d'ajouter, modifier, lister et supprimer des fiches d'étudiants à travers un menu interactif structuré en console C#.",
    techStack: ["C#", ".NET", "SQLite", "OOP Principles"],
    metrics: [
      { label: "Vitesse d'accès SQLite", value: "< 2ms" },
      { label: "Classes structurées", value: "8" }
    ],
    architectureSummary: "L'application console encapsule les entités d'étudiant selon le modèle Domain-Driven Design de base, avec un adaptateur d'accès aux données SQLite.",
    challenges: [
      "Sécurisation des opérations de saisie de l'utilisateur contre les crashes (Exceptions d'entrées).",
      "Établissement d'une connexion SQL fluide en C# natif sans ORM lourd."
    ],
    githubUrl: "https://github.com/akaletekoffilevis/student-manager",
    architectureDiagram: [
      { id: "terminal_input", title: "Entrée Console Standard", subtitle: "Menu Interactif C#", type: "client", description: "L'utilisateur interagit via des indices numériques dans l'invite de commande.", connections: ["crud_engine"] },
      { id: "crud_engine", title: "Moteur CRUD Etudiants", subtitle: "C# Class Logic", type: "service", description: "Parse les entrées, applique l'architecture objet et valide les données.", connections: ["sqlite_db"] },
      { id: "sqlite_db", title: "Base SQLite Locale", subtitle: "SQLite DB Engine", type: "database", description: "Enregistre les données des étudiants dans un fichier de base léger et local.", connections: [] }
    ]
  },
  {
    id: "my-todos-app",
    title: "My Todos App",
    period: "2023",
    shortDescription: "Application web de gestion des tâches quotidienne conçue pour s'approprier les concepts fondamentaux de l'écosystème .NET.",
    fullDescription: "My Todos App est un projet personnel unissant ASP.NET et le langage C#. Cette application permet aux utilisateurs de créer, catégoriser, éditer et marquer des tâches ménagères ou professionnelles comme complétées, avec une interface simplifiée.",
    techStack: ["C#", "ASP.NET Core", "CSS3", "JavaScript"],
    metrics: [
      { label: "Indexation de tâches", value: "Instant" },
      { label: "Satisfaction", value: "Stable" }
    ],
    architectureSummary: "Application web classique gérée côté serveur avec rendu HTML dynamique des formulaires et stockage direct.",
    architectureDiagram: [],
    challenges: [
      "Prise en main du cycle de vie des requêtes HTTP POST et GET en ASP.NET.",
      "Design d'interfaces adaptables à l'aide de CSS natif et de JavaScript minimaliste."
    ],
    githubUrl: "https://github.com/akaletekoffilevis/my-todos-app"
  }
];

export const MOCK_API_ENDPOINTS: ApiEndpoint[] = [
  {
    method: "GET",
    path: "/api/v1/profile",
    description: "Récupère les informations publiques professionnelles de Koffi Levis, incluant son statut, ses indicateurs clés et de contact.",
    defaultResponse: JSON.stringify(JOHN_DOE_PROFILE, null, 2)
  },
  {
    method: "GET",
    path: "/api/v1/skills",
    description: "Retourne la liste exhaustive des langages, bases de données, frameworks et outils DevOps maîtrisés avec niveau et années d'exercice.",
    params: [
      { name: "category", type: "string", required: false, description: "Filtre les compétences : 'languages', 'frameworks', 'databases', 'devops'" }
    ],
    defaultResponse: JSON.stringify(SKILLS_DATA, null, 2)
  },
  {
    method: "GET",
    path: "/api/v1/projects",
    description: "Obtient les fiches d'architecture, défis et métriques des projets distribués conçus et maintenus par Koffi Levis.",
    defaultResponse: JSON.stringify(PROJECTS_DATA, null, 2)
  },
  {
    method: "POST",
    path: "/api/v1/contact",
    description: "Soumet un message de prise de contact à l'API de Koffi Levis. En production, valide le schéma, journalise et notifie.",
    params: [
      { name: "name", type: "string", required: true, description: "Nom complet du recruteur ou collaborateur" },
      { name: "email", type: "string", required: true, description: "Adresse e-mail de contact valide" },
      { name: "subject", type: "string", required: false, description: "Sujet du message ou opportunité" },
      { name: "message", type: "string", required: true, description: "Détails de l'opportunité de poste, mission ou message" }
    ],
    defaultResponse: JSON.stringify({
      status: "success",
      message: "Message enregistré avec succès dans la base de données de Koffi Levis.",
      data: {
        receiptId: "job-ack-" + Math.floor(Math.random() * 89999 + 10000),
        dispatchedTo: "Kafka Topic: contact_notifications",
        slackWebhookStatus: "delivered",
        timestamp: new Date().toISOString()
      }
    }, null, 2)
  }
];
