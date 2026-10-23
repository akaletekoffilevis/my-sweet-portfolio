import { Skill, Project, Service, Certification, TimelineEntry, MethodStep, SoftSkill } from "./types";

export const PROFILE_DATA = {
  name: "Koffi Lévis Akalete",
  title: "10000 CODEURS Ambassador | Full Stack Junior Developer",
  location: "Niamey, Niger / Remote work available",
  bio: "Math & CS student at Abdou Moumouni University in Niamey and 10000 CODEURS Ambassador. Junior full stack developer, still learning: I sharpen my skills every day on C#, .NET (ASP.NET Core, Blazor) and secure REST APIs (JWT, Swagger), with foundations in React and Flutter. FlutterSummerCamp participant, I learn by building concrete projects — websites, mobile apps and tools — always eager to improve.",
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
    { label: "Projects", value: "20+", desc: "APIs, Web, Mobile, CLI, Desktop" },
    { label: "Education", value: "Bachelor's (In progress)", desc: "Math & CS — Abdou Moumouni University" },
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
    description: "Main language: OOP, REST APIs, console applications, microservice architectures."
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
    description: "Relational queries, data modeling, SQLite, SQL Server, MySQL."
  },
  {
    name: "Python",
    category: "languages",
    level: 65,
    experienceYears: 1,
    icon: "SquareTerminal",
    description: "Scripts, automation, GTK3, teaching."
  },
  {
    name: "JavaScript / TypeScript",
    category: "languages",
    level: 60,
    experienceYears: 1.5,
    icon: "Terminal",
    description: "React frontend, Node.js, Socket.io, Vite."
  },
  {
    name: "PHP",
    category: "languages",
    level: 55,
    experienceYears: 1,
    icon: "Terminal",
    description: "OOP, MVC, database interactions, backend web development."
  },
  {
    name: "Go",
    category: "languages",
    level: 20,
    experienceYears: 0.5,
    icon: "Terminal",
    description: "Fundamentals, getting started."
  },
  {
    name: "HTML5 / CSS3",
    category: "languages",
    level: 78,
    experienceYears: 2,
    icon: "Layout",
    description: "Responsive interface integration with Tailwind CSS."
  },
  {
    name: ".NET / ASP.NET Core",
    category: "frameworks",
    level: 80,
    experienceYears: 1.5,
    icon: "Layers",
    description: "RESTful APIs, Minimal APIs, MVC, Entity Framework Core, JWT."
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
    description: "Blazor WebAssembly, MudBlazor, PWA, interactive components."
  },
  {
    name: "React",
    category: "frameworks",
    level: 55,
    experienceYears: 0.5,
    icon: "Terminal",
    description: "Interactive sites, Socket.io, Vite, Tailwind CSS."
  },
  {
    name: "Next.js",
    category: "frameworks",
    level: 60,
    experienceYears: 0.5,
    icon: "Atom",
    description: "Next.js 16 (App Router), React 19, Tailwind v4, Prisma — stores, bilingual FR/EN sites."
  },
  {
    name: "Firebase",
    category: "databases",
    level: 55,
    experienceYears: 0.5,
    icon: "Database",
    description: "Google authentication, Cloud Firestore, real-time backends for mobile apps."
  },
  {
    name: "SQLite / EF Core",
    category: "databases",
    level: 78,
    experienceYears: 1.5,
    icon: "Database",
    description: "Entity Framework Core ORM, migrations, data persistence."
  },
  {
    name: "MySQL",
    category: "databases",
    level: 60,
    experienceYears: 1,
    icon: "Database",
    description: "Queries, schema design, relations, joins."
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
    description: "Basic containerization, docker-compose."
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "bible-pwa",
    category: "web",
    title: "Bible Louis Segond — PWA Blazor",
    period: "2025 - Ongoing",
    description: "Complete PWA built with Blazor WebAssembly .NET 9 and MudBlazor 8.x. It bundles all 66 books of the Bible with lazy loading, full-text search with inverted index (AND/OR/exact modes), verse-by-verse audio reading (Web Speech API), verse image generation (Canvas API, 12 palettes), PDF export per chapter, Bible quizzes, progress tracking, 1-year reading plans, and dark/light theme. Fully functional offline thanks to the PWA service worker.",
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
    description: "Blazor WebAssembly .NET 9 application — showcase site for the Dan Kassawoua group (MSA Niger — NextDev). Displays team members with detailed profiles, Blazor routing, static JSON data, responsive design.",
    techStack: ["C#", ".NET 9", "Blazor WebAssembly", "HTML", "CSS"],
    githubUrl: "https://github.com/akaletekoffilevis/nextdevblazor-app",
    demoUrl: "http://dankassawa.runasp.net",
    liveUrl: "http://dankassawa.runasp.net"
  },
  {
    id: "scaffolder-cli",
    category: "outils",
    title: "Scaffolder CLI",
    period: "2025 - Ongoing",
    description: "Universal CLI written in C# .NET 9 with System.CommandLine that generates projects in 20+ languages via 40+ commands. Compiled to a native AOT binary (12MB) for multiple platforms. Includes AI integration (OpenAI, Claude, Gemini) to suggest architectures, extensible plugins, and commands for Docker, CI/CD and deployment.",
    techStack: ["C#", ".NET 9", "System.CommandLine", "Native AOT", "OpenAI/Claude API"],
    githubUrl: "https://github.com/akaletekoffilevis/Scaffolder-CLI",
    demoUrl: "https://scaffolder-cli.vercel.app",
    liveUrl: "https://scaffolder-cli.vercel.app"
  },
  {
    id: "yt-downloader-docs",
    category: "web",
    title: "YT Downloader — Documentation Site",
    period: "2026",
    description: "Official documentation site for YT Downloader, a desktop app for downloading YouTube videos. Presents features (queue, quality selection, light/dark theme, bilingual FR/EN), multi-platform downloads (Windows, Linux, macOS) and screenshots. Deployed on Vercel.",
    techStack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/akaletekoffilevis/youtube-downloader",
    liveUrl: "https://yt-downloader-docs.vercel.app/"
  },
  {
    id: "hair-salon-tp",
    category: "web",
    title: "Hair Salon — Web Integration Assignment",
    period: "2026",
    description: "Small assignment: responsive showcase site for a hair salon. HTML/CSS integration with a modern responsive design, deployed on GitHub Pages.",
    techStack: ["HTML", "CSS"],
    githubUrl: "https://github.com/akaletekoffilevis/hair-salon-tp",
    liveUrl: "https://akaletekoffilevis.github.io/hair-salon-tp/"
  },
  {
    id: "dotnetniger",
    category: "api",
    title: "DotnetNiger — .NET Community API",
    period: "2026",
    description: "ASP.NET Core 9 API for the community platform of .NET developers in Niger. REST API development with authentication, member management, posts, events and resources. SQL Server with Entity Framework Core. Open-source collaborative project with the DotnetNiger community.",
    techStack: ["C#", ".NET 9", "ASP.NET Core", "ASP.NET Identity", "Entity Framework Core", "SQL Server"],
    githubUrl: "https://github.com/DelaliAbel/DotnetNiger"
  },
  {
    id: "todos-api",
    category: "api",
    title: "Todos API — Secure REST API",
    period: "2025",
    description: "Robust REST API built with ASP.NET Core 9 and Entity Framework Core. Implements JWT authentication with user registration and login, per-user data isolation via JWT claims, PBKDF2 password hashing (100K iterations), full CRUD for tasks, and interactive Swagger documentation.",
    techStack: ["C#", "ASP.NET Core 9", "Entity Framework Core", "SQLite", "JWT Bearer", "Swagger"],
    githubUrl: "https://github.com/akaletekoffilevis/todosapi"
  },
  {
    id: "student-console-manager",
    category: "outils",
    title: "Student Console Manager",
    period: "2025",
    description: "C# .NET 9 console application providing full CRUD management of a student registry with JSON persistence. Features: add, edit, list, delete, search by student number, password-protected deletion.",
    techStack: ["C#", ".NET 9", "JSON"],
    githubUrl: "https://github.com/akaletekoffilevis/studentconsolemanager"
  },
  {
    id: "scholl-api",
    category: "api",
    title: "SchollApi — School Management API",
    period: "2025",
    description: "REST API built with ASP.NET Core 9 for school course management. Full CRUD operations with Entity Framework Core and a SQLite database.",
    techStack: ["C#", ".NET 9", "ASP.NET Core", "Entity Framework Core", "SQLite"],
    githubUrl: "https://github.com/akaletekoffilevis/SchollApi"
  },
  {
    id: "challenge-dotnet-niger",
    category: "desktop",
    title: "Challenge .NET Niger — Hosting & Infrastructure",
    period: "2026",
    description: "Infrastructure deployment project for the Challenge NextDev. Set up an Ubuntu server with BIND9 DNS, DHCP, Apache2 as reverse proxy, and deployment of .NET 9 applications (Razor Pages + Minimal API) with a SQLite database. Automation scripts and full documentation.",
    techStack: [".NET 9", "Apache", "BIND9", "Linux", "Python", "Bash"],
    githubUrl: "https://github.com/akaletekoffilevis/challenge-dotnet-niger"
  },
  {
    id: "mytodosapp",
    category: "web",
    title: "MyTodosApp — ASP.NET Core Task Manager",
    period: "2026",
    description: "Modern task management web application built with ASP.NET Core 9 and Entity Framework Core. Full CRUD, smart sorting by creation date, server-side validation, responsive Bootstrap 5 design, persistent SQLite database.",
    techStack: ["C#", "ASP.NET Core 9", "Entity Framework Core", "SQLite", "Bootstrap 5", "jQuery"],
    githubUrl: "https://github.com/akaletekoffilevis/mytodosapp"
  },
  {
    id: "nextdev-api",
    category: "api",
    title: "NextDev API — Minimal API .NET 9",
    period: "2026",
    description: "ASP.NET Core 9 Minimal API for managing DANKASSAWA team members. Complete CRUD endpoints, interactive Swagger documentation, SQLite database with Entity Framework Core. Lightweight, performant RESTful architecture.",
    techStack: ["C#", ".NET 9", "ASP.NET Core Minimal API", "Entity Framework Core", "SQLite", "Swagger"],
    githubUrl: "https://github.com/akaletekoffilevis/nextdevapi"
  },
  {
    id: "ecommerce-connected",
    category: "mobile",
    title: "E-commerce Connected — Flutter + DummyJSON",
    period: "2026",
    description: "Flutter mobile e-commerce application connected to a real API (DummyJSON) following a Clean Architecture. JWT authentication with automatic refresh token, local Hive cache (products, categories, cart), offline mode with automatic cache fallback via network tracking (Connectivity), go_router navigation, Dio interceptors (auth + error handling), token storage, Repository Pattern (domain interface + data implementation), centralized error handling (Failures/Exceptions) and repository tests with mocktail.",
    techStack: ["Flutter", "Dart", "Clean Architecture", "Riverpod", "Hive", "Dio", "JWT"],
    githubUrl: "https://github.com/akaletekoffilevis/ecommerce-connected"
  },
  {
    id: "ecommerce-app",
    category: "mobile",
    title: "E-commerce App — Flutter + Riverpod",
    period: "2026",
    description: "Complete mobile e-commerce application with Riverpod as the single state management solution (7+ providers). Product catalogue in a responsive grid, cart with quantity and total management, persisted favorites (SharedPreferences), category filtering, sorting and text search, editable user profile, 4-tab navigation with cart badge and animations.",
    techStack: ["Flutter", "Dart", "Riverpod", "SharedPreferences"],
    githubUrl: "https://github.com/akaletekoffilevis/ecommerce_app"
  },
  {
    id: "whatsapp-clone",
    category: "mobile",
    title: "WhatsApp Clone — Flutter Interface",
    period: "2026",
    description: "WhatsApp interface clone built with Flutter. Faithful reproduction of the messaging app's screens and navigation: chat list, tab view, down to the characteristic UI elements. A learning project dedicated to mastering Flutter layout and mobile app design.",
    techStack: ["Flutter", "Dart"],
    githubUrl: "https://github.com/akaletekoffilevis/whatsapp_clone"
  },
  {
    id: "recettes-app",
    category: "mobile",
    title: "Recipes App — Flutter",
    period: "2026",
    description: "Multi-screen Flutter app about cooking: recipe list with search, category filtering and deletion (long press + confirmation), detail screen with ingredients and steps, validated add form with 4 fields and settings with a saved light/dark theme toggle (SharedPreferences). Responsive: list on mobile, grid on tablet.",
    techStack: ["Flutter", "Dart", "SharedPreferences"],
    githubUrl: "https://github.com/akaletekoffilevis/recettes_app"
  },
  {
    id: "taskly",
    category: "mobile",
    title: "Taskly — Flutter Task Management",
    period: "2026",
    description: "Production-ready task management application built for the 10000CODEURS program. Clean feature-based architecture with BLoC/Cubit, a real Firebase backend (Google authentication + Cloud Firestore) complemented by a local Hive cache for offline mode, go_router navigation, FR/EN internationalization (ARB files), premium iOS-inspired design, Focus and Stats screens, accessibility (semantic labels) and a complete test suite (unit, widget, integration_test) with a GitHub Actions pipeline.",
    techStack: ["Flutter", "Dart", "BLoC", "Firebase", "Hive", "go_router"],
    githubUrl: "https://github.com/akaletekoffilevis/todo_pro"
  },
  {
    id: "task-manager-cli",
    category: "outils",
    title: "Task Manager — Dart CLI",
    period: "2026",
    description: "Command-line task management application written in pure Dart, without Flutter. Advanced OOP demonstration: abstract classes, inheritance (regular and urgent tasks), factory pattern, generics, repository layer, custom exceptions, argument parsing (args package) and JSON persistence. Comes with a unit test suite.",
    techStack: ["Dart", "CLI", "JSON", "args"],
    githubUrl: "https://github.com/akaletekoffilevis/task_manager"
  }
];

export const CERTS_DATA: Certification[] = [
  {
    id: "freecodecamp-csharp",
    issuer: "freeCodeCamp / Microsoft",
    title: "Foundational C# with Microsoft",
    date: "January 2026",
    kind: "image",
    file: "/images/Certificat FreecodeCamp.webp",
    url: "https://www.freecodecamp.org/certification/akalete_koffi_levis/foundational-c-sharp-with-microsoft"
  }, {
    id: "flutterfirecamp",
    issuer: "FlutterFire Camp",
    title: "FlutterFire Summeer Camp",
    date: "October 23, 2026",
    kind: "image",
    file: "/images/certificat-ffsc-ffc-2026-lrn-ptqatt-koffi-l-vis-akalete.png",
    url: "https://flutterfirecamp.dev/verify/FFC-2026-LRN-PTQATT"
  },
  {
    id: "nextflutter",
    issuer: "NextFlutter",
    title: "Advanced Dart — Flutter Developer Certification",
    date: "July 27, 2026",
    kind: "image",
    file: "/images/certificat-nextflutter.png",
    url: "https://nextflutter.com/certifications/verify/NF-2026-4481DECA"
  },
  {
    id: "nextflutter-routing",
    issuer: "NextFlutter",
    title: "Navigation & Routing — Flutter Developer Certification",
    date: "August 11, 2026",
    kind: "image",
    file: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fnextflutter.com%2Fcertifications%2Fverify%2FNF-2026-8369F553?w=800&h=510",
    url: "https://nextflutter.com/certifications/verify/NF-2026-8369F553"
  },
  {
    id: "nextflutter-riverpod",
    issuer: "NextFlutter",
    title: "State Management with Riverpod — Flutter Developer Certification",
    date: "August 19, 2026",
    kind: "image",
    file: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fnextflutter.com%2Fcertifications%2Fverify%2FNF-2026-4454D89B?w=800&h=510",
    url: "https://nextflutter.com/certifications/verify/NF-2026-4454D89B"
  },
  {
    id: "nextflutter-api",
    issuer: "NextFlutter",
    title: "Network Calls & APIs — Flutter Developer Certification",
    date: "August 19, 2026",
    kind: "image",
    file: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fnextflutter.com%2Fcertifications%2Fverify%2FNF-2026-AC344062?w=800&h=510",
    url: "https://nextflutter.com/certifications/verify/NF-2026-AC344062"
  },
  {
    id: "nextflutter-tests",
    issuer: "NextFlutter",
    title: "Testing in Flutter — Flutter Developer Certification",
    date: "September 5, 2026",
    kind: "image",
    file: "https://s0.wp.com/mshots/v1/https%3A%2F%2Fnextflutter.com%2Fcertifications%2Fverify%2FNF-2026-C2140A80?w=800&h=510",
    url: "https://nextflutter.com/certifications/verify/NF-2026-C2140A80"
  },
  {
    id: "gabera",
    issuer: "Gabera Foundation",
    title: "Certificate of Participation — .NET, Artificial Intelligence & Robotics",
    date: "August 3-7, 2026",
    kind: "image",
    file: "/images/attestation-gabera.jpeg"
  },
  {
    id: "elearning-web-mobile",
    issuer: "E-LEARNING POUR TOUS",
    title: "TRAINING CERTIFICATE - Web and Mobile Development",
    date: "September 25, 2026",
    kind: "pdf",
    file: "/images/certificat_developpement_web_mgcconsulting.pdf"
  },
  {
    id: "mille-codeurs",
    issuer: "10000 CODEURS",
    title: "Digital Passport",
    date: "March 28, 2026",
    kind: "pdf",
    file: "/images/certificat-10000codeurs.pdf"
  },
  {
    id: "simplilearn",
    issuer: "Simplilearn",
    title: "Boost your Web Development Career: Introduction to C#",
    date: "August 13, 2026",
    kind: "pdf",
    file: "/images/certificat-simplilearn.pdf"
  },
  {
    id: "agrhymet-climat",
    issuer: "CILSS / Centre Régional AGRHYMET",
    title: "Integrating climate change into national, local and sectoral policies",
    date: "September 28, 2026",
    kind: "pdf",
    file: "/images/attestation-agrhymet-cilss.pdf"
  },
  {
    id: "badge-ambassadeur-10000codeurs",
    issuer: "10000 CODEURS",
    title: "Ambassador Badge — 10000 CODEURS",
    date: "June 2026",
    kind: "pdf",
    file: "/images/badge-ambassadeur-10000codeurs.pdf"
  },
  {
    id: "flufithon26",
    issuer: "FlutterHackathon 26",
    title: "Participant — FlutterHackathon 26",
    date: "September 2026",
    kind: "image",
    file: "/images/certificat-flufithon26.webp"
  }
];

export const SERVICES_DATA: Service[] = [
  {
    title: "REST API Development",
    icon: "Server",
    desc: "I build the invisible engine behind your apps: secure data exchange between your website, mobile app and your data. User accounts, payments — everything that must be protected is.",
    tech: "C# / .NET 9",
  },
  {
    title: "Web & PWA Applications",
    icon: "Globe",
    desc: "Sites and apps that work even offline, load fast and install like an app on the phone. Ideal for tools used daily.",
    tech: "Blazor .NET 9",
  },
  {
    title: "Flutter Mobile Applications",
    icon: "Smartphone",
    desc: "iOS and Android apps from a single codebase: smooth UI, offline support, connection to your services. One development, two platforms.",
    tech: "Flutter / Dart",
  },
  {
    title: "CLI Tools & Automation",
    icon: "SquareTerminal",
    desc: "Small programs that do repetitive work for you: project generators, file processing, task automation. One click and it's done.",
    tech: "C# / .NET 9",
  },
  {
    title: "Databases",
    icon: "Database",
    desc: "Organizing and optimizing your data so it's fast, reliable and secure. I design the structure, evolve it and keep it performant.",
    tech: "SQL / EF Core",
  },
  {
    title: "Websites & React Interfaces",
    icon: "PanelTop",
    desc: "Showcase sites, landing pages and interactive interfaces, adapted to all screens. Modern, fast and easy to update.",
    tech: "React / HTML / CSS",
  },
  {
    title: "Maintenance & Evolution",
    icon: "Wrench",
    desc: "Taking over existing projects: bug fixes, modernization, new features and performance improvements. Your app stays up to date and reliable.",
    tech: "C# / .NET",
  },
  {
    title: "Deployment & CI/CD",
    icon: "Rocket",
    desc: "Automated and reliable deployment of your apps: hosting, one-click updates, backups. You focus on your business, I handle the tech.",
    tech: "Docker / GitHub Actions",
  },
  {
    title: "Testing & Software Quality",
    icon: "FlaskConical",
    desc: "Checking that your app works correctly in all cases, including edge cases. Delivery of a clear report of issues found.",
    tech: "Automated tests",
  },
  {
    title: "Training & Coding Basics",
    icon: "GraduationCap",
    desc: "Introduction to programming for beginners: HTML, CSS, logic, Git, C# and .NET. Step-by-step support, adapted to your pace.",
    tech: "HTML / CSS / C#",
  },
  {
    title: "AI Integration",
    icon: "Sparkles",
    desc: "Adding artificial intelligence to your apps: assistants that answer your questions, search in your documents, task automation. Multi-provider (Gemini, GPT).",
    tech: "AI / RAG",
  },
  {
    title: "Bilingual FR / EN Websites",
    icon: "Languages",
    desc: "Sites available in several languages with instant switching and automatic visitor language detection. Ideal to reach an international audience.",
    tech: "i18n / React",
  },
  {
    title: "End-to-End Micro-SaaS",
    icon: "ShoppingBag",
    desc: "Complete online app ready to sell: user accounts, payment, database, hosting. From idea to first customer.",
    tech: "Next.js / Supabase / Stripe",
  },
  {
    title: "Computer Installation & Maintenance",
    icon: "Laptop",
    desc: "OS and software installation, PC updates, troubleshooting and optimization — for individuals and professionals in Niamey.",
    tech: "Windows / Linux",
  },
  {
    title: "Website Maintenance & Updates",
    icon: "RefreshCw",
    desc: "Maintaining your existing site: content updates, security patches, backups and improvements. Your site stays active and secure.",
    tech: "Audit / Monitoring",
  },
  {
    title: "App & User-Journey Testing",
    icon: "ClipboardCheck",
    desc: "Testing your apps on real user scenarios: I test the important flows and deliver a prioritized bug report.",
    tech: "E2E tests",
  },
  {
    title: "Software Distribution",
    icon: "PackageCheck",
    desc: "Distributing your apps on official platforms (Microsoft Store, Homebrew…): multi-platform installers and updates.",
    tech: "winget / Scoop / Homebrew",
  },
];

export const TIMELINE_DATA: TimelineEntry[] = [
  {
    period: "2024",
    title: "First steps in programming",
    desc: "Discovered programming with HTML/CSS and Python: first static websites, algorithm exercises and problem-solving logic. The spark: realizing software is written line by line.",
    tags: ["HTML/CSS", "Python", "Algorithms"],
  },
  {
    period: "2025",
    title: "Focus on C# and the .NET ecosystem",
    desc: "Deepened C#, object-oriented programming and REST APIs with ASP.NET Core. First secure APIs (JWT, Swagger), Blazor WebAssembly applications, CLI tools and first production deployments.",
    tags: ["C#", ".NET", "ASP.NET Core", "Blazor", "REST"],
  },
  {
    period: "January 2026",
    title: "Microsoft certification (freeCodeCamp)",
    desc: "Earned the “Foundational C# with Microsoft” certificate — official validation of the language fundamentals: OOP, exception handling, collections, LINQ.",
    tags: ["Certificate", "Microsoft", "freeCodeCamp"],
  },
  {
    period: "March 2026",
    title: "Digital Passport & 10000 CODEURS Ambassador",
    desc: "Joined the 10000 CODEURS community, earned the Digital Passport and then the Ambassador title. Mentoring other learners, taking part in events and collaborative projects.",
    tags: ["10000 CODEURS", "Ambassador", "Community"],
  },
  {
    period: "Summer 2026",
    title: "Switch to Flutter mobile",
    desc: "Took part in the FlutterSummerCamp, then earned 5 NextFlutter certifications (Dart, Routing, Riverpod, APIs, Tests). Built complete mobile apps: e-commerce, task management, UI clones. Gabera training (.NET, AI & Robotics).",
    tags: ["Flutter", "Dart", "Riverpod", "Firebase", "Tests"],
  },
  {
    period: "September 2026",
    title: "Consolidation & opening up",
    desc: "CILSS/AGRHYMET certificate (integrating climate change into policies), FlutterHackathon 26, production-ready apps with CI/CD and clean architecture. Today: leveling up on Next.js and micro-SaaS.",
    tags: ["AGRHYMET", "FlutterHackathon", "CI/CD", "Next.js"],
    current: true,
  },
];

export const METHOD_DATA: MethodStep[] = [
  {
    step: "01",
    title: "Discussion & scoping",
    desc: "We talk about your need, your goals and your constraints. No unnecessary jargon: I explain what is feasible, how, and how long it takes.",
  },
  {
    step: "02",
    title: "Proposal & free quote",
    desc: "You get a clear proposal: scope, technologies, timeline and a fixed price agreed upfront. No surprises along the way.",
  },
  {
    step: "03",
    title: "Transparent development",
    desc: "Clean, commented code, dedicated GitHub repos, visible progress. You follow every step and give feedback.",
  },
  {
    step: "04",
    title: "Testing & acceptance",
    desc: "Automated tests (unit, integration) and key user-journey checks with you. We fix everything together before going live.",
  },
  {
    step: "05",
    title: "Go live",
    desc: "Deployment on Vercel, a VPS or Docker depending on the project. Domain, emails, HTTPS: everything configured and verified.",
  },
  {
    step: "06",
    title: "Follow-up & maintenance",
    desc: "Fixes, new features, backups and monitoring. Let's stay in touch: a project lives on after delivery.",
  },
];

export const SOFT_SKILLS_DATA: SoftSkill[] = [
  {
    icon: "Users",
    title: "Teamwork",
    desc: "Collaborative open-source projects (DotnetNiger, Challenge NextDev) and community programs (10000 CODEURS, FlutterSummerCamp): shared git, pull requests, code reviews and mutual help.",
  },
  {
    icon: "Lightbulb",
    title: "Self-taught & curious",
    desc: "C#, Blazor, Flutter, Dart, Python, PHP… most of my skills come from official documentation, certifications and personal projects. I learn by building.",
  },
  {
    icon: "MessageSquare",
    title: "Communication",
    desc: "Explaining technical concepts to beginners (HTML, CSS, Git), writing clear READMEs and documentation, presenting my projects to the community.",
  },
  {
    icon: "Puzzle",
    title: "Problem solving",
    desc: "Systematic method: reproduce, isolate, find the root cause, fix, test. Persistence on the stubbornest bugs and careful reading of error messages.",
  },
  {
    icon: "Shuffle",
    title: "Adaptability",
    desc: "Switching web → mobile (Flutter), C# → Dart, Python or PHP depending on the project's needs. Every new project is a chance to adopt a new stack without losing quality.",
  },
  {
    icon: "Flag",
    title: "Leadership & mentoring",
    desc: "10000 CODEURS Ambassador: guiding, motivating and helping other learners. Teaching forces you to solidify and share what you know.",
  },
];
