/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Skill, Project, ApiEndpoint } from "./types";

export const JOHN_DOE_PROFILE = {
  name: "John Doe",
  title: "Développeur Backend & Architecte Cloud Êlite",
  location: "Paris, France / Télétravail complet",
  bio: "Passionné par l'ingénierie système robuste, la scalabilité et les architectures distribuées à haute disponibilité. Je conçois des APIs ultrarapides, mets en place des pipelines de données asynchrones hautement performants et orchestre des infrastructures cloud scalables et sécurisées.",
  avatarUrl: "/src/assets/images/john_doe_avatar_1780522980244.png", // Exact generated image path
  socials: {
    github: "https://github.com/john-doe-backend",
    linkedin: "https://linkedin.com/in/john-doe-backend",
    email: "john.doe.dev@example.com",
    gpgKey: "8FBF BCD2 9E80 1AD3 45EB 98E0 FC0B DE8F"
  },
  metrics: [
    { label: "SLA Moyenne", value: "99.99%", desc: "Sur les microservices gérés" },
    { label: "Volumétrie Max", value: "15M+", desc: "Requêtes quotidiennes traitées" },
    { label: "Temps de Réponse", value: "<15ms", desc: "Médiane p95 sur endpoints clés" },
    { label: "Expérience SecOps", value: "6+ Ans", desc: "Pratiques SecOps, OAuth2, OWASP" }
  ]
};

export const SKILLS_DATA: Skill[] = [
  // Langages
  {
    name: "Go (Golang)",
    category: "languages",
    level: 92,
    experienceYears: 4,
    icon: "SquareTerminal",
    description: "Langage de prédilection pour les microservices hautement concurrents et de faible latence. Concurrence native (goroutines & channels)."
  },
  {
    name: "TypeScript / Node.js",
    category: "languages",
    level: 95,
    experienceYears: 6,
    icon: "Code2",
    description: "Développement d'APIs typées et services Backend à forte I/O au sein de l'écosystème JS moderne (NestJS, Fastify)."
  },
  {
    name: "Python",
    category: "languages",
    level: 80,
    experienceYears: 5,
    icon: "Terminal",
    description: "Scripting avancé, pipelines de traitement de données asynchrones avec FastAPI et Celery."
  },
  {
    name: "Rust",
    category: "languages",
    level: 65,
    experienceYears: 2,
    icon: "Cpu",
    description: "Développement de modules natifs de haute performance et utilitaires CLI légers nécessitant sécurité mémoire absolue et zéro GC."
  },
  // Frameworks
  {
    name: "NestJS",
    category: "frameworks",
    level: 94,
    experienceYears: 5,
    icon: "Layers",
    description: "Architecture modulaire solide inspirée d'Angular facilitant la maintainabilité des grands projets d'entreprise."
  },
  {
    name: "Gin Gonic",
    category: "frameworks",
    level: 88,
    experienceYears: 3,
    icon: "Zap",
    description: "Framework HTTP ultra-rapide en Go utilisé pour la construction de passerelles d'APIs et de routeurs de flux de données."
  },
  {
    name: "gRPC & Protocol Buffers",
    category: "frameworks",
    level: 90,
    experienceYears: 4,
    icon: "Network",
    description: "Communication inter-services de haute performance via HTTP/2 avec schémas de typage stricts et générés."
  },
  // Databases
  {
    name: "PostgreSQL (Réplication)",
    category: "databases",
    level: 90,
    experienceYears: 6,
    icon: "Database",
    description: "Modélisation relationnelle complexe, optimisation de requêtes (EXPLAIN ANALYZE), sharding et réplication Streaming Primary-Replica."
  },
  {
    name: "Redis (Cache & Pub-Sub)",
    category: "databases",
    level: 92,
    experienceYears: 5,
    icon: "Activity",
    description: "Mise en cache intelligente de sessions, structures de données complexes en mémoire, et queues de messages temps-réel légères."
  },
  {
    name: "Apache Kafka",
    category: "databases",
    level: 85,
    experienceYears: 3,
    icon: "Shuffle",
    description: "Log de commit distribué pour les architectures événementielles (Event Sourcing) et messagerie asynchrone haut débit."
  },
  // DevOps
  {
    name: "Docker & Kubernetes",
    category: "devops",
    level: 88,
    experienceYears: 5,
    icon: "Boxes",
    description: "Orchestration, déploiements déclaratifs de clusters microservices avec Helm et auto-healing."
  },
  {
    name: "Terraform (IaC)",
    category: "devops",
    level: 85,
    experienceYears: 3,
    icon: "FileCode",
    description: "Automatisation complète d'environnements cloud multi-régions (AWS/GCP), versioning de l'infrastructure."
  },
  {
    name: "CI/CD & GitHub Actions",
    category: "devops",
    level: 90,
    experienceYears: 5,
    icon: "GitBranch",
    description: "Création de pipelines de build automatisés, validations, tests d'intégration, linting et déploiement continu sans interruption."
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "aerotransit",
    title: "AeroTransit - Distributeur de flux IoT temps réel",
    period: "2024 - 2025",
    shortDescription: "Système d'ingestion et de routage de données IoT aéronautiques transmettant plus de 15 000 payloads de télémétrie par seconde.",
    fullDescription: "AeroTransit est un pipeline d'ingestion de données et d'analyse en continu conçu pour un fournisseur de logistique aéronautique. Le projet résout le problème de décodage des trames binaires provenant d'avions en plein vol et la redistribution à latence sub-milliseconde vers de multiples clients abonnés.",
    techStack: ["Go", "Apache Kafka", "Redis Cluster", "PostgreSQL", "InfluxDB", "Docker K8s"],
    metrics: [
      { label: "Latence d'ingestion", value: "< 8ms" },
      { label: "Simultanéité", value: "15,000 req/sec" },
      { label: "Disponibilité garantie", value: "99.995%" }
    ],
    architectureSummary: "Les sockets UDP poussent le flux crypté vers un cluster d'ingestion Go. Les trames décodées sont poussées sur un bus Apache Kafka à partitions multiples. Un worker Go s'occupe de l'écriture en batch dans InfluxDB pour l'historique et Redis pour le state client temps-réel servi via WebSockets.",
    challenges: [
      "Optimisation mémoire au niveau byte-level en Go pour éviter l'intervention fréquente du Garbage Collector sous des charges de pointe de 25k req/sec.",
      "Mise en place de mécanismes de backpressure intelligents pour protéger l'infrastructure en cas de latence réseau temporaire des brokers Kafka."
    ],
    architectureDiagram: [
      { id: "client_iot", title: "Balises IoT Avioniques", subtitle: "UDP Sockets", type: "client", description: "Envoûtent des trames compressées chiffrées en continu.", connections: ["ingestor"] },
      { id: "ingestor", title: "Cluster Ingestion Go", subtitle: "Fast Ingest Engine", type: "service", description: "Reçoit les paquets UDP, décrypte et parse le binaire à la volée.", metric: "9.2MB/s", connections: ["kafka", "redis_status"] },
      { id: "kafka", title: "Apache Kafka Cluster", subtitle: "Message Bus", type: "queue", description: "Trafic distribué sur 12 partitions thématiques.", connections: ["workers"] },
      { id: "redis_status", title: "Redis Cache State", subtitle: "Activité Instantanée", type: "cache", description: "Enregistre la dernière position connue de chaque avion pour lectures instantanées.", metric: "0.2ms latency", connections: [] },
      { id: "workers", title: "Analytics Workers Go", subtitle: "Processors", type: "service", description: "Consomment Kafka, appliquent des calculs géographiques et des alertes.", connections: ["postgres"] },
      { id: "postgres", title: "PostgreSQL Master DB", subtitle: "Storage Relationnel", type: "database", description: "Persistance froide des données consolidées de vol et contrats.", metric: "40GB/Mois", connections: [] }
    ]
  },
  {
    id: "hypercache",
    title: "HyperCache - Proxy d'optimisation en Rust",
    period: "2023 - 2024",
    shortDescription: "Proxy réseau de mise en cache ultra-léger évitant la surcharge des bases de données de production legacy.",
    fullDescription: "Développé pour répondre à l'engorgement récurrent d'un vieil ERP d'entreprise dont la base de données relationnelle Oracle ne supportait pas les accès concurrents. HyperCache s'interpose comme une couche d'abstraction réseau intelligente effectuant des interceptions en amont.",
    techStack: ["Rust", "Tokio", "gRPC", "Redis", "Prometheus", "Grafana"],
    metrics: [
      { label: "Charge DB Oracle", value: "-65%" },
      { label: "p99 Temps Réponse", value: "1.2ms" },
      { label: "Cache Hit Ratio", value: "88.4%" }
    ],
    architectureSummary: "Développé sur le runtime Tokio asynchrone sécurisé, HyperCache gère les requêtes clientes via TLS. Il consulte d'abord un dictionnaire Redis distribué en lecture seule de ultra-haute vitesse. En cas de cache miss, la requête est parallélisée, exécutée, indexée dans le cache, et retournée.",
    challenges: [
      "Prise en main d'une invalidation de cache granulaire pour s'assurer que les données financières ne soient jamais périmées de plus de 5 secondes.",
      "Garantie de sûreté mémoire stricte sans 'NullPointerExceptions' ou 'Data Races' grâce aux garanties du compilateur Rust."
    ],
    architectureDiagram: [
      { id: "auth_proxy", title: "User Gateway App", subtitle: "Frontends/SDKs", type: "client", description: "Exécutent des rapports ou accèdent aux données d'inventaires.", connections: ["hypercache_engine"] },
      { id: "hypercache_engine", title: "HyperCache Single Binary", subtitle: "Rust Service", type: "service", description: "Intercepte, authentifie gRPC, résout localement.", metric: "CPU < 5%", connections: ["redis_internal", "legacy_db"] },
      { id: "redis_internal", title: "Redis Cluster", subtitle: "Dictionnaire en cache", type: "cache", description: "Stocke les résultats sérialisés en Protobuf.", metric: "110k IOPS", connections: [] },
      { id: "legacy_db", title: "Base de données Enterprise", subtitle: "Legacy Database", type: "database", description: "Base relationnelle lourde saturée d'anciennes procédures stockées.", connections: [] }
    ]
  },
  {
    id: "coresphere",
    title: "CoreSphere - Framework distributed IAM asymétrique",
    period: "2023",
    shortDescription: "Système de contrôle d'accès sécurisé distribuant des tokens JWT auto-validables sans appel centralisé.",
    fullDescription: "Service d'authentification centralisé d'identité pour une architecture microservices d'envergure. Il s'appuie sur le standard OAuth2 standard et OpenID Connect en distribuant des clés publiques tournantes asymétriques pour décharger le routage centralisé.",
    techStack: ["TypeScript", "NestJS", "PostgreSQL", "Redis Rate-Limiting", "Kubernetes", "JWKS"],
    metrics: [
      { label: "Vérification Token", value: "0ms réseau" },
      { label: "Rate-Limit Blocage", value: "99.8%" },
      { label: "Utilisateurs Actifs", value: "150,000+" }
    ],
    architectureSummary: "Le service d'identité distribue des JWT signés avec des clés secrètes régénérées toutes les 24h. Chaque microservice récupère et garde en cache via l'URI /.well-known/jwks.json la clé publique pour valider cryptographiquement les requêtes de manière décentralisée, assurant une latence nulle.",
    challenges: [
      "Sécurisation contre les attaques de force brute et le scraping via un limiteur de débit Token Bucket distribué basé sur Redis (REDIS LUA Scripting).",
      "Assurer une haute résilience en concevant des clés rotatives sans déconnecter les sessions actives lors d'une transition."
    ],
    architectureDiagram: [
      { id: "client_web", title: "Web & Apps Mobiles", subtitle: "Utilisateurs", type: "client", description: "Effectuent des requêtes avec en-tête d'Authorization Bearer Token.", connections: ["ingress_routing"] },
      { id: "ingress_routing", title: "Kong API Gateway", subtitle: "Microservices Router", type: "gateway", description: "Transfère directement vers les sous-services sans valider centralement car il utilise l'antémémoire.", connections: ["payment_service", "billing_service", "coresphere_auth"] },
      { id: "coresphere_auth", title: "CoreSphere Auth Server", subtitle: "IAM Service", type: "service", description: "Serveur centralisé requis uniquement pour le login, la distribution JWKS et le refresh.", metric: "Active instances: 3", connections: ["postgres_users", "redis_tokens"] },
      { id: "redis_tokens", title: "Redis Blocklist", subtitle: "Revocation Store", type: "cache", description: "Stocke l'empreinte JTI des jetons bannis avant expiration pour blocage instantané.", connections: [] },
      { id: "postgres_users", title: "PostgreSQL DB Chiffrée", subtitle: "Crédentiels", type: "database", description: "Mappe les mots de passe hachés avec de l'Argon2id avec sel cryptographique.", connections: [] },
      { id: "payment_service", title: "Payment microservice", subtitle: "gRPC Receiver", type: "service", description: "Valide le token lui-même à l'aide de la clé publique de l'antémémoire.", connections: [] },
      { id: "billing_service", title: "Billing microservice", subtitle: "gRPC Receiver", type: "service", description: "Valide le token lui-même à l'aide de la clé publique de l'antémémoire.", connections: [] }
    ]
  }
];

export const MOCK_API_ENDPOINTS: ApiEndpoint[] = [
  {
    method: "GET",
    path: "/api/v1/profile",
    description: "Récupère les informations publiques professionnelles de John Doe, incluant son statut, ses indicateurs clés et de contact.",
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
    description: "Obtient les fiches d'architecture, défis et métriques des projets distribués conçus et maintenus par John Doe.",
    defaultResponse: JSON.stringify(PROJECTS_DATA, null, 2)
  },
  {
    method: "POST",
    path: "/api/v1/contact",
    description: "Soumet un message de prise de contact à l'API de John Doe. En production, valide le schéma, journalise via Kafka et notifie sur Slack.",
    params: [
      { name: "name", type: "string", required: true, description: "Nom complet du recruteur ou collaborateur" },
      { name: "email", type: "string", required: true, description: "Adresse e-mail de contact valide" },
      { name: "subject", type: "string", required: false, description: "Sujet du message ou opportunité" },
      { name: "message", type: "string", required: true, description: "Détails de l'opportunité de poste, mission ou message" }
    ],
    defaultResponse: JSON.stringify({
      status: "success",
      message: "Message enregistré avec succès dans la base de données de John.",
      data: {
        receiptId: "job-ack-" + Math.floor(Math.random() * 89999 + 10000),
        dispatchedTo: "Kafka Topic: contact_notifications",
        slackWebhookStatus: "delivered",
        timestamp: new Date().toISOString()
      }
    }, null, 2)
  }
];
