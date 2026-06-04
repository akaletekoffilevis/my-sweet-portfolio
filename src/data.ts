/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Skill, Project, ApiEndpoint } from "./types";

export const JOHN_DOE_PROFILE = {
  name: "Koffi Levis",
  title: "Développeur Fullstack Junior",
  location: "Abidjan, Côte d'Ivoire / Télétravail complet",
  bio: "Développeur Fullstack Junior passionné par l'écosystème web moderne, en particulier TypeScript (React, Node.js), Tailwind CSS et PostgreSQL. Rigoureux et curieux, j'aime concevoir des applications web interactives propres, bien documentées, et optimiser le code pour offrir des expériences fluides et accessibles.",
  avatarUrl: "/src/assets/images/koffi_avatar_1780568229358.png", // Newly generated professional portrait avatar
  socials: {
    github: "https://github.com/koffilevis",
    linkedin: "https://linkedin.com/in/koffi-levis",
    email: "koffilevis21@gmail.com",
    gpgKey: "9A3C 41B1 E09D A7CF C209 EF1A B23D"
  },
  metrics: [
    { label: "Projets Réalisés", value: "8+", desc: "Fiches académiques & projets personnels complets" },
    { label: "Technologies", value: "10+", desc: "Outils web maîtrisés au quotidien" },
    { label: "Activité GitHub", value: "150+", desc: "Commits réguliers cette année pour perfectionnement" },
    { label: "Veille Active", value: "2h/jour", desc: "Lecture technique et entraînements algorithmiques" }
  ]
};

export const SKILLS_DATA: Skill[] = [
  // Langages
  {
    name: "TypeScript / JavaScript",
    category: "languages",
    level: 85,
    experienceYears: 2,
    icon: "Code2",
    description: "Développement d'applications Web typées et d'APIs structurées. Maîtrise d'ES6, du typage avancé et des hooks asynchrones."
  },
  {
    name: "HTML5 / CSS3 / Tailwind CSS",
    category: "languages",
    level: 88,
    experienceYears: 2,
    icon: "Terminal",
    description: "Intégration d'interfaces élégantes, réactives et accessibles avec le framework Tailwind CSS. Souci du détail et du responsive."
  },
  {
    name: "Python",
    category: "languages",
    level: 72,
    experienceYears: 1,
    icon: "SquareTerminal",
    description: "Scripting de scripts automatisés, manipulation de données locales et création d'APIs légères avec FastAPI."
  },
  {
    name: "Go (Golang)",
    category: "languages",
    level: 60,
    experienceYears: 1,
    icon: "Cpu",
    description: "Bases solides de programmation backend avec Go. Compréhension de la concurrence de base et développement d'APIs REST simples."
  },
  // Frameworks
  {
    name: "React (Vite)",
    category: "frameworks",
    level: 82,
    experienceYears: 2,
    icon: "Layers",
    description: "Développement de SPA scalables avec une gestion d'état propre, hooks personnalisés et animations interactives fluides."
  },
  {
    name: "NestJS / Express",
    category: "frameworks",
    level: 78,
    experienceYears: 1.5,
    icon: "Zap",
    description: "Conception de serveurs HTTP d'APIs RESTful avec NestJS (architecture modulaire) ou Express (approche minimalist)."
  },
  // Databases
  {
    name: "PostgreSQL",
    category: "databases",
    level: 75,
    experienceYears: 1.5,
    icon: "Database",
    description: "Modélisation relationnelle de bases de données, clés étrangères, jointures complexes et requêtes optimisées."
  },
  {
    name: "Redis (Cache de base)",
    category: "databases",
    level: 65,
    experienceYears: 1,
    icon: "Activity",
    description: "Utilisation pratique pour la gestion de cache ou la configuration de session express."
  },
  {
    name: "MongoDB",
    category: "databases",
    level: 78,
    experienceYears: 1.5,
    icon: "Shuffle",
    description: "Conception et manipulation de bases de données NoSQL de documents avec Mongoose."
  },
  // DevOps
  {
    name: "Git / GitHub Desktop",
    category: "devops",
    level: 85,
    experienceYears: 2,
    icon: "GitBranch",
    description: "Suivi de version de code rigoureux, travail collaboratif avec pull requests et gestion de conflits."
  },
  {
    name: "Docker (Containers)",
    category: "devops",
    level: 70,
    experienceYears: 1,
    icon: "Boxes",
    description: "Création d'images de microservices unifiées et orchestration locale simple avec docker-compose."
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "devconnect",
    title: "DevConnect - Réseau d'échange pour Développeurs",
    period: "2024 (Projet Personnel)",
    shortDescription: "Réseau social d'entraide permettant aux développeurs de partager des tutoriels, des projets et d'interagir par pôle technique.",
    fullDescription: "DevConnect est une plateforme web moderne conçue pour résorber l'isolement des juniors. Les utilisateurs peuvent trier les publications par tags, soumettre leurs portfolios individuels pour audit, et recevoir des commentaires constructifs. L'architecture sépare proprement la gestion des requêtes.",
    techStack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { label: "Couverture de tests", value: "82%" },
      { label: "Composants UI réutilisables", value: "35+" },
      { label: "Uptime démo", value: "99.9%" }
    ],
    architectureSummary: "Frontend interactif codé en React tirant profit des hooks asynchrones pour le rafraîchissement d'état. Le backend Express gère l'authentification sécurisée par JWT, consigne les logs système de requêtes régulières et stocke l'historique dans PostgreSQL.",
    challenges: [
      "Gestion d'une interface responsive hautement personnalisée pour assurer un affichage impeccable sur petits écrans mobiles.",
      "Prise en main d'un système de jetons JWT sécurisé avec des cookies HttpOnly pour écarter les attaques XSS."
    ],
    githubUrl: "https://github.com/koffilevis/devconnect",
    demoUrl: "https://devconnect-demo.example.com",
    architectureDiagram: [
      { id: "client_web", title: "Interface Client SPA", subtitle: "React / Vite App", type: "client", description: "Expérience utilisateur interactive avec gestion d'état locale.", connections: ["express_api"] },
      { id: "express_api", title: "API Backend Express", subtitle: "REST Server Node.js", type: "service", description: "Intercepte, authentifie les JWT et traite les fonctions CRUD.", metric: "Express Router", connections: ["postgres_db", "redis_cache"] },
      { id: "redis_cache", title: "Cache local d'API", subtitle: "Redis Store", type: "cache", description: "Conserve temporairement le catalogue pour soulager la base principale.", connections: [] },
      { id: "postgres_db", title: "Bases de Données", subtitle: "PostgreSQL Store", type: "database", description: "Stocke les utilisateurs et leurs posts techniques.", metric: "Relational DB", connections: [] }
    ]
  },
  {
    id: "taskflow",
    title: "TaskFlow - Tableau Kanban Collaboratif Temps Réel",
    period: "2024 (Projet Académique)",
    shortDescription: "Gestionnaire de tâches de style Kanban avec synchronisation instantanée entre collaborateurs.",
    fullDescription: "TaskFlow est une application ergonomique de gestion de sprints d'équipe. Dès qu'un collaborateur glisse-dépose une tâche, les écrans de tous les autres membres de l'équipe changent de statut immédiatement et sans latence, évitant les surcharges d'appels répétitifs de rafraîchissement.",
    techStack: ["React", "NestJS", "Socket.io", "MongoDB", "Tailwind CSS"],
    metrics: [
      { label: "Délai de Sync", value: "< 75ms" },
      { label: "Temps d'Uptime", value: "99.9%" }
    ],
    architectureSummary: "Un frontend en React avec un glisser-déposer intuitif s'appuie sur une connexion WebSocket persistante avec le package Socket.io-client. Le serveur NestJS valide les événements de mouvement de cartes et écrit la structure BSON dans une base MongoDB.",
    challenges: [
      "Maintien des connexions WebSocket unifiées en cas de déconnexions internet impromptues avec gestion de reconnexion automatique.",
      "Calcul efficace des priorités de tâches pour de gros volumes de cartes modifiées simultanément."
    ],
    githubUrl: "https://github.com/koffilevis/taskflow",
    architectureDiagram: [
      { id: "front_web", title: "Application Client React", subtitle: "React Router & Hooks", type: "client", description: "Composants graphiques réactifs de glisser-déposer.", connections: ["nestjs_back"] },
      { id: "nestjs_back", title: "Serveur NestJS App", subtitle: "NestJS / Socket.io GATEWAY", type: "service", description: "Gère les namespaces WebSocket de room d'équipes et valide les requêtes.", connections: ["mongo_store"] },
      { id: "mongo_store", title: "Base de Documents", subtitle: "MongoDB Engine", type: "database", description: "Persiste l'ordonnancement séquentiel des tickets d'équipes.", metric: "NoSQL DB", connections: [] }
    ]
  },
  {
    id: "notesphere",
    title: "NoteSphere - Bloc-notes Markdown Intelligent",
    period: "2023 (Projet Personnel)",
    shortDescription: "Application web d'édition de notes Markdown avec dossiers hiérarchiques et persistance locale de secours.",
    fullDescription: "NoteSphere résout le défi de l'indisponibilité réseau lors de déplacements. L'utilisateur édite en syntaxe Markdown classique et bénéficie d'une prévisualisation HTML instantanée. Tout document reste accessible en local grâce à IndexedDB et se synchronise dès le retour du réseau.",
    techStack: ["TypeScript", "Next.js", "Tailwind CSS", "IndexedDB", "PostgreSQL"],
    metrics: [
      { label: "Accès Local", value: "< 5ms" },
      { label: "Export PDF/HTML", value: "100%" }
    ],
    architectureSummary: "Conçu en Next.js pour de superbes chargements initiaux. Utilise un wrapper IndexedDB personnalisé sur le navigateur pour lire et écrire instantanément de manière décentralisée. Une table PostgreSQL centralisée assure la sauvegarde finale lors de la réactivation réseau.",
    challenges: [
      "Résolution de conflits de versions de notes lors d'une synchronisation simultanée après une longue période de travail hors-ligne.",
      "Parsing propre et sécurisé du Markdown brut en HTML pour endiguer les attaques d'injection de script (XSS)."
    ],
    githubUrl: "https://github.com/koffilevis/notesphere",
    demoUrl: "https://notesphere.koffilevis.dev",
    architectureDiagram: [
      { id: "next_client", title: "Client Next.js App", subtitle: "Page Router SPA", type: "client", description: "Éditeur WYSIWYG de documents interactifs.", connections: ["local_idb", "next_server"] },
      { id: "local_idb", title: "IndexedDB Locale", subtitle: "Stockage Client Navigateur", type: "cache", description: "Assure la fluidité d'écriture instantanée hors-ligne.", connections: [] },
      { id: "next_server", title: "Server Routes Core", subtitle: "API Endpoints Serverless", type: "service", description: "Prend en charge la comparaison différentielle intelligente pour la sauvegarde.", connections: ["postgres_cloud"] },
      { id: "postgres_cloud", title: "PostgreSQL Cloud Database", subtitle: "Centralized SQL Storage", type: "database", description: "Enregistre la référence maître synchronisée de chaque document.", metric: "Cloud DB", connections: [] }
    ]
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
