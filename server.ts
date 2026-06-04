import express from "express";
import path from "path";
import fs from "fs";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { createServer as createViteServer } from "vite";

// Fallbacks inline to avoid loading raw client TS files directly inside node process
const DEFAULT_PROFILE = {
  name: "Koffi Lévis Akalete",
  title: "Développeur Backend Junior",
  location: "Niamey, Niger / Télétravail possible",
  bio: "Étudiant en informatique orienté développement backend avec une solide base en C#/.NET et en développement web côté serveur. Habitué aux projets concrets, à l'autoformation active et aux environnements de développement modernes.",
  avatarUrl: "/src/assets/images/koffi_avatar_1780568229358.png",
  github: "https://github.com/akaletekoffilevis",
  linkedin: "https://linkedin.com/in/akalete-koffi-levis",
  email: "koffilevis21@gmail.com",
  gpgKey: "9A3C 41B1 E09D A7CF C209 EF1A B23D"
};

const DEFAULT_SKILLS = [
  { name: "C#", category: "languages", level: 80, experienceYears: 1.5, icon: "Code2", description: "Langage principal utilisé pour la programmation orientée objet, le développement console et les architectures d'APIs." },
  { name: "SQL", category: "languages", level: 75, experienceYears: 1.5, icon: "Database", description: "Bases de données relationnelles, requêtes de tri, structuration de bases MySQL, SQLite et SQL Server." },
  { name: "JavaScript / Python / PHP", category: "languages", level: 70, experienceYears: 1, icon: "SquareTerminal", description: "Intégration d'éléments interactifs, scripts utilitaires locaux et serveurs élémentaires dynamiques." },
  { name: "HTML5 / CSS3", category: "languages", level: 82, experienceYears: 1.5, icon: "Terminal", description: "Intégration d'interfaces web réactives, structuration sémantique et mise en page responsive fluide." },
  { name: "Go / C", category: "languages", level: 55, experienceYears: 0.5, icon: "Cpu", description: "Notions algorithmiques de base pour la manipulation de structures de données et de la mémoire." },
  { name: ".NET / ASP.NET", category: "frameworks", level: 78, experienceYears: 1.5, icon: "Layers", description: "Création d'APIs RESTful saines, contrôleurs réutilisables, séparation MVC et connexion aux bases de données." },
  { name: "Blazor", category: "frameworks", level: 72, experienceYears: 1, icon: "Zap", description: "Mise au point de composants web interactifs en C# côté client pour un écosystème réactif Single Page." },
  { name: "MySQL & SQLite", category: "databases", level: 76, experienceYears: 1.5, icon: "Database", description: "Conception, requêtes de requêtes CRUD de base, création de modèles et persistance de données embarquées ou distantes." },
  { name: "OOP & MVC (Concepts)", category: "databases", level: 80, experienceYears: 1.5, icon: "Shuffle", description: "Solide appréciation des concepts de l'encapsulation, polymorphisme, héritage et de l'architecture découplée." },
  { name: "Git / GitHub / VS Code", category: "devops", level: 85, experienceYears: 2, icon: "GitBranch", description: "Branchements réactifs de versioning de code, gestion de dépôts en ligne et maîtrise de l'éditeur de code au quotidien." }
];

const DEFAULT_PROJECTS = [
  {
    id: "dotnetniger-api",
    title: "DotnetNiger API - Projet Communautaire",
    period: "2024 - En cours",
    shortDescription: "API de pilotage technique pour un projet communautaire de développeurs .NET visant à concevoir et améliorer des solutions.",
    fullDescription: "DotnetNiger API est un projet de collaboration communautaire qui réunit des passionnés du framework .NET au Niger. Dans ce cadre, j'assure le pilotage technique, concevant des solutions backend réutilisables pour la communauté et optimisant les processus d'intégration continue.",
    techStack: "C#, .NET, ASP.NET Core, SQL Server, GitHub Actions",
    githubUrl: "https://github.com/akaletekoffilevis/dotnetniger-api",
    demoUrl: ""
  },
  {
    id: "nextdev-blazor",
    title: "Next Dev Blazor App",
    period: "2024 (Formation NextDev)",
    shortDescription: "Application web interactive développée dans le cadre de la formation intensive NextDev.",
    fullDescription: "Next Dev Blazor App est une application moderne démontrant l'utilisation du framework Blazor de Microsoft. Elle implémente la création de composants interactifs réutilisables, un state management réactif et la liaison de données bidirectionnelle sans requérir de JavaScript.",
    techStack: "C#, Blazor, .NET, HTML5, CSS3, SQLite",
    githubUrl: "https://github.com/akaletekoffilevis/nextdev-blazor",
    demoUrl: "https://blazor-demo.example.com"
  },
  {
    id: "student-manager",
    title: "Student Manager Console",
    period: "2024 (Projet Académique)",
    shortDescription: "Application de bureau en console permettant la gestion CRUD d'un registre d'étudiants avec persistance SQLite.",
    fullDescription: "Conçu pour valider les concepts essentiels de la Programmation Orientée Objet (POO) et de la persistance de données, Student Manager Console permet d'ajouter, modifier, lister et supprimer des fiches d'étudiants à travers un menu interactif structuré en console C#.",
    techStack: "C#, .NET, SQLite, OOP Principles",
    githubUrl: "https://github.com/akaletekoffilevis/student-manager",
    demoUrl: ""
  },
  {
    id: "my-todos-app",
    title: "My Todos App",
    period: "2023",
    shortDescription: "Application web de gestion des tâches quotidienne conçue pour s'approprier les concepts fondamentaux de l'écosystème .NET.",
    fullDescription: "My Todos App est un projet personnel unissant ASP.NET et le langage C#. Cette application permet aux utilisateurs de créer, catégoriser, éditer et marquer des tâches ménagères ou professionnelles comme complétées, avec une interface simplifiée.",
    techStack: "C#, ASP.NET Core, CSS3, JavaScript",
    githubUrl: "https://github.com/akaletekoffilevis/my-todos-app",
    demoUrl: ""
  }
];

const DEFAULT_MESSAGES = [
  {
    id: "sys-seed-1",
    name: "Marc Dubreuil",
    email: "marc.d@techstartups.com",
    subject: "Poste de Développeur Fullstack Junior",
    message: "Bonjour Koffi, j'ai vu votre portfolio en ligne. Votre profil de développeur junior nous intéresse beaucoup pour notre équipe produit.",
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Setup SQLite database
  const dbPath = path.join(process.cwd(), "portfolio.db");
  console.log("Connecting SQLite database.db at:", dbPath);
  
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Enable foreign keys
  await db.get("PRAGMA foreign_keys = ON");

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      location TEXT NOT NULL,
      bio TEXT NOT NULL,
      avatarUrl TEXT,
      github TEXT,
      linkedin TEXT,
      email TEXT,
      gpgKey TEXT
    );

    CREATE TABLE IF NOT EXISTS skills (
      name TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      level INTEGER NOT NULL,
      experienceYears REAL NOT NULL,
      icon TEXT NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      period TEXT NOT NULL,
      shortDescription TEXT NOT NULL,
      fullDescription TEXT NOT NULL,
      techStack TEXT NOT NULL,
      githubUrl TEXT,
      demoUrl TEXT
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      timestamp TEXT NOT NULL
    );
  `);

  // Seed data if empty
  const profileCount = await db.get("SELECT COUNT(*) as count FROM profile");
  if (profileCount.count === 0) {
    console.log("Seeding SQLite profile table with default data");
    await db.run(
      `INSERT INTO profile (name, title, location, bio, avatarUrl, github, linkedin, email, gpgKey) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        DEFAULT_PROFILE.name,
        DEFAULT_PROFILE.title,
        DEFAULT_PROFILE.location,
        DEFAULT_PROFILE.bio,
        DEFAULT_PROFILE.avatarUrl,
        DEFAULT_PROFILE.github,
        DEFAULT_PROFILE.linkedin,
        DEFAULT_PROFILE.email,
        DEFAULT_PROFILE.gpgKey
      ]
    );
  }

  const skillsCount = await db.get("SELECT COUNT(*) as count FROM skills");
  if (skillsCount.count === 0) {
    console.log("Seeding SQLite skills table with default data");
    for (const skill of DEFAULT_SKILLS) {
      await db.run(
        `INSERT INTO skills (name, category, level, experienceYears, icon, description) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [skill.name, skill.category, skill.level, skill.experienceYears, skill.icon, skill.description]
      );
    }
  }

  const projectsCount = await db.get("SELECT COUNT(*) as count FROM projects");
  if (projectsCount.count === 0) {
    console.log("Seeding SQLite projects table with default data");
    for (const project of DEFAULT_PROJECTS) {
      await db.run(
        `INSERT INTO projects (id, title, period, shortDescription, fullDescription, techStack, githubUrl, demoUrl) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          project.id,
          project.title,
          project.period,
          project.shortDescription,
          project.fullDescription,
          project.techStack,
          project.githubUrl,
          project.demoUrl
        ]
      );
    }
  }

  const msgCount = await db.get("SELECT COUNT(*) as count FROM messages");
  if (msgCount.count === 0) {
    console.log("Seeding SQLite messages table with default data");
    for (const msg of DEFAULT_MESSAGES) {
      await db.run(
        `INSERT INTO messages (id, name, email, subject, message, timestamp) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [msg.id, msg.name, msg.email, msg.subject, msg.message, msg.timestamp]
      );
    }
  }

  // --- API ROUTING KEY ---

  // GET /api/portfolio - Load full synced package
  app.get("/api/portfolio", async (req, res) => {
    try {
      const profileRow = await db.get("SELECT * FROM profile ORDER BY id DESC LIMIT 1");
      const skillsRows = await db.all("SELECT * FROM skills");
      const projectsRows = await db.all("SELECT * FROM projects");

      // Format for react expectation
      const profile = profileRow ? {
        name: profileRow.name,
        title: profileRow.title,
        location: profileRow.location,
        bio: profileRow.bio,
        avatarUrl: profileRow.avatarUrl,
        socials: {
          github: profileRow.github,
          linkedin: profileRow.linkedin,
          email: profileRow.email,
          gpgKey: profileRow.gpgKey
        },
        metrics: [
          { label: "Projets Pratiques", value: `${projectsRows.length}+`, desc: "Applications réelles C#/.NET, Web et Console" },
          { label: "Formation", value: "Licence", desc: "Informatique & Spécialisation Mathématiques" },
          { label: "Certification", value: "Microsoft", desc: "C# Free Foundation par FreeCodeCamp" },
          { label: "Langues", value: "4", desc: "Français, Haoussa, Zarma, Anglais" }
        ]
      } : DEFAULT_PROFILE;

      const skills = skillsRows.map(row => ({
        name: row.name,
        category: row.category,
        level: row.level,
        experienceYears: row.experienceYears,
        icon: row.icon,
        description: row.description
      }));

      const projects = projectsRows.map(row => ({
        id: row.id,
        title: row.title,
        period: row.period,
        shortDescription: row.shortDescription,
        fullDescription: row.fullDescription,
        techStack: row.techStack.split(",").map((s: string) => s.trim()).filter(Boolean),
        githubUrl: row.githubUrl || "",
        demoUrl: row.demoUrl || "",
        metrics: [
          { label: "Compilateur", value: "C# .NET" },
          { label: "État", value: "Production" }
        ],
        challenges: [
          "Optimisation continue de l'intégration dans des pipelines distants.",
          "Sécurisation des transactions de requêtes vis-à-vis du serveur SQL."
        ]
      }));

      res.json({ success: true, profile, skills, projects });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // PUT /api/profile - Update main metadata
  app.put("/api/profile", async (req, res) => {
    try {
      const { name, title, location, bio, socials } = req.body;
      const existing = await db.get("SELECT id FROM profile ORDER BY id DESC LIMIT 1");
      const id = existing ? existing.id : 1;

      if (existing) {
        await db.run(
          `UPDATE profile 
           SET name = ?, title = ?, location = ?, bio = ?, github = ?, linkedin = ?, email = ?, gpgKey = ?
           WHERE id = ?`,
          [
            name || DEFAULT_PROFILE.name,
            title || DEFAULT_PROFILE.title,
            location || DEFAULT_PROFILE.location,
            bio || DEFAULT_PROFILE.bio,
            socials?.github || DEFAULT_PROFILE.github,
            socials?.linkedin || DEFAULT_PROFILE.linkedin,
            socials?.email || DEFAULT_PROFILE.email,
            socials?.gpgKey || DEFAULT_PROFILE.gpgKey,
            id
          ]
        );
      } else {
        await db.run(
          `INSERT INTO profile (name, title, location, bio, avatarUrl, github, linkedin, email, gpgKey) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            name || DEFAULT_PROFILE.name,
            title || DEFAULT_PROFILE.title,
            location || DEFAULT_PROFILE.location,
            bio || DEFAULT_PROFILE.bio,
            DEFAULT_PROFILE.avatarUrl,
            socials?.github || DEFAULT_PROFILE.github,
            socials?.linkedin || DEFAULT_PROFILE.linkedin,
            socials?.email || DEFAULT_PROFILE.email,
            socials?.gpgKey || DEFAULT_PROFILE.gpgKey
          ]
        );
      }
      res.json({ success: true, message: "Profile mis à jour dans SQLite." });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // CRUD Skills:
  app.post("/api/skills", async (req, res) => {
    try {
      const { name, category, level, experienceYears, icon, description } = req.body;
      await db.run(
        `INSERT INTO skills (name, category, level, experienceYears, icon, description) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, category, level || 80, experienceYears || 1.0, icon || "Code2", description || ""]
      );
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.put("/api/skills/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const { category, level, experienceYears, icon, description } = req.body;
      await db.run(
        `UPDATE skills 
         SET category = ?, level = ?, experienceYears = ?, icon = ?, description = ?
         WHERE name = ?`,
        [category, level, experienceYears, icon, description, name]
      );
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete("/api/skills/:name", async (req, res) => {
    try {
      const { name } = req.params;
      await db.run("DELETE FROM skills WHERE name = ?", [name]);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // CRUD Projects:
  app.post("/api/projects", async (req, res) => {
    try {
      const { id, title, period, shortDescription, fullDescription, techStack, githubUrl, demoUrl } = req.body;
      const stackStr = Array.isArray(techStack) ? techStack.join(", ") : techStack;
      await db.run(
        `INSERT INTO projects (id, title, period, shortDescription, fullDescription, techStack, githubUrl, demoUrl) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, title, period, shortDescription, fullDescription, stackStr || "", githubUrl || "", demoUrl || ""]
      );
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, period, shortDescription, fullDescription, techStack, githubUrl, demoUrl } = req.body;
      const stackStr = Array.isArray(techStack) ? techStack.join(", ") : techStack;
      await db.run(
        `UPDATE projects 
         SET title = ?, period = ?, shortDescription = ?, fullDescription = ?, techStack = ?, githubUrl = ?, demoUrl = ?
         WHERE id = ?`,
        [title, period, shortDescription, fullDescription, stackStr, githubUrl, demoUrl, id]
      );
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db.run("DELETE FROM projects WHERE id = ?", [id]);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // GET /api/messages - Admin read
  app.get("/api/messages", async (req, res) => {
    try {
      const rows = await db.all("SELECT * FROM messages ORDER BY timestamp DESC");
      res.json({ success: true, messages: rows });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // POST /api/messages - Recruiters contact Koffi
  app.post("/api/messages", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "Champs requis manquants." });
      }
      const newId = "msg-" + Math.floor(Math.random() * 899999 + 100000);
      const timestamp = new Date().toISOString();
      await db.run(
        `INSERT INTO messages (id, name, email, subject, message, timestamp) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [newId, name, email, subject || "Sans sujet", message, timestamp]
      );

      res.status(201).json({
        success: true,
        message: "Message enregistré avec succès dans SQLite.",
        data: {
          id: newId,
          name,
          email,
          subject: subject || "Sans sujet",
          message,
          timestamp,
          receiptId: "job-ack-" + Math.floor(Math.random() * 89999 + 10000),
          dispatchedTo: "SQLite Engine: messages_relation",
          sqliteSyncStatus: "synced"
        }
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // DELETE /api/messages - Clear database
  app.delete("/api/messages", async (req, res) => {
    try {
      await db.run("DELETE FROM messages");
      res.json({ success: true, message: "Tous les messages ont été supprimés." });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite development integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express custom server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start fullstack server:", err);
});
