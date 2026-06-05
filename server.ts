import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

// Fallbacks inline to avoid loading raw client TS files directly inside node process
const DEFAULT_PROFILE = {
  name: "Koffi Lévis Akalete",
  title: "Développeur Backend Junior",
  location: "Niamey, Niger / Télétravail possible",
  bio: "Étudiant en informatique orienté développement backend avec une solide base en C#/.NET et en développement web côté serveur. Habitué aux projets concrets, à l'autoformation active et aux environnements de développement modernes.",
  avatarUrl: "/src/assets/images/koffi_avatar_1780568229358.png",
  github: "https://github.com/akaletekoffilevis",
  linkedin: "https://linkedin.com/in/akalete-koffi-levis",
  email: "kiffilevis21@gmail.com",
  gpgKey: "9A3C 41B1 E09D A7CF C209 EF1A B23D",
  whatsapp: "+227 91 53 52 20"
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

const DB_FILE = path.join(process.cwd(), "portfolio_db.json");

interface DbSchema {
  profile: typeof DEFAULT_PROFILE;
  skills: typeof DEFAULT_SKILLS;
  projects: typeof DEFAULT_PROJECTS;
  messages: typeof DEFAULT_MESSAGES;
}

// Assure static folder creation for database if needed
async function readDb(): Promise<DbSchema> {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = await fs.promises.readFile(DB_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn("Unable to read local database portfolio_db.json", err);
  }
  const initialDb: DbSchema = {
    profile: DEFAULT_PROFILE,
    skills: DEFAULT_SKILLS,
    projects: DEFAULT_PROJECTS,
    messages: DEFAULT_MESSAGES
  };
  await writeDb(initialDb);
  return initialDb;
}

async function writeDb(data: DbSchema): Promise<void> {
  try {
    await fs.promises.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Unable to write file to storage", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  console.log("Configured Portable JSON Storage engine at:", DB_FILE);

  // Synchronise Initial Db
  await readDb();

  // --- API ROUTING KEY ---

  // GET /api/portfolio - Load full synced package
  app.get("/api/portfolio", async (req, res) => {
    try {
      const db = await readDb();
      const dbProfile = db.profile || DEFAULT_PROFILE;

      const profile = {
        name: dbProfile.name,
        title: dbProfile.title,
        location: dbProfile.location,
        bio: dbProfile.bio,
        avatarUrl: dbProfile.avatarUrl,
        socials: {
          github: dbProfile.github,
          linkedin: dbProfile.linkedin,
          email: dbProfile.email,
          gpgKey: dbProfile.gpgKey,
          whatsapp: dbProfile.whatsapp || DEFAULT_PROFILE.whatsapp
        },
        metrics: [
          { label: "Projets Pratiques", value: `${db.projects.length}+`, desc: "Applications réelles C#/.NET, Web et Console" },
          { label: "Formation", value: "Licence", desc: "Informatique & Développement Logiciel" },
          { label: "Certification", value: "Microsoft", desc: "C# Free Foundation par FreeCodeCamp" },
          { label: "Langues", value: "4", desc: "Français, Haoussa, Zarma, Anglais" }
        ]
      };

      const skills = db.skills.map(skill => ({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        experienceYears: skill.experienceYears,
        icon: skill.icon,
        description: skill.description
      }));

      const projects = db.projects.map(project => {
        const stackArray = typeof project.techStack === "string"
          ? project.techStack.split(",").map((s: string) => s.trim()).filter(Boolean)
          : project.techStack;

        return {
          id: project.id,
          title: project.title,
          period: project.period,
          shortDescription: project.shortDescription,
          fullDescription: project.fullDescription,
          techStack: stackArray,
          githubUrl: project.githubUrl || "",
          demoUrl: project.demoUrl || "",
          metrics: [
            { label: "Compilateur", value: "C# .NET" },
            { label: "État", value: "Production" }
          ],
          challenges: [
            "Optimisation continue de l'intégration dans des pipelines distants.",
            "Sécurisation des transactions de requêtes vis-à-vis du serveur SQL."
          ]
        };
      });

      res.json({ success: true, profile, skills, projects });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // PUT /api/profile - Update main metadata
  app.put("/api/profile", async (req, res) => {
    try {
      const { name, title, location, bio, socials } = req.body;
      const db = await readDb();

      db.profile = {
        name: name || db.profile.name,
        title: title || db.profile.title,
        location: location || db.profile.location,
        bio: bio || db.profile.bio,
        avatarUrl: db.profile.avatarUrl || DEFAULT_PROFILE.avatarUrl,
        github: socials?.github || db.profile.github,
        linkedin: socials?.linkedin || db.profile.linkedin,
        email: socials?.email || db.profile.email,
        gpgKey: socials?.gpgKey || db.profile.gpgKey,
        whatsapp: socials?.whatsapp || db.profile.whatsapp || DEFAULT_PROFILE.whatsapp
      };

      await writeDb(db);
      res.json({ success: true, message: "Profile mis à jour dans le stockage JSON." });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // CRUD Skills:
  app.post("/api/skills", async (req, res) => {
    try {
      const { name, category, level, experienceYears, icon, description } = req.body;
      const db = await readDb();

      // Avoid duplication
      db.skills = db.skills.filter(s => s.name !== name);
      db.skills.push({
        name,
        category,
        level: Number(level) || 80,
        experienceYears: Number(experienceYears) || 1.0,
        icon: icon || "Code2",
        description: description || ""
      });

      await writeDb(db);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.put("/api/skills/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const { category, level, experienceYears, icon, description } = req.body;
      const db = await readDb();

      let found = false;
      db.skills = db.skills.map(s => {
        if (s.name === name) {
          found = true;
          return {
            name,
            category: category || s.category,
            level: level !== undefined ? Number(level) : s.level,
            experienceYears: experienceYears !== undefined ? Number(experienceYears) : s.experienceYears,
            icon: icon || s.icon,
            description: description || s.description
          };
        }
        return s;
      });

      if (!found) {
        db.skills.push({
          name,
          category: category || "languages",
          level: Number(level) || 80,
          experienceYears: Number(experienceYears) || 1.0,
          icon: icon || "Code2",
          description: description || ""
        });
      }

      await writeDb(db);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete("/api/skills/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const db = await readDb();

      db.skills = db.skills.filter(s => s.name !== name);

      await writeDb(db);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // CRUD Projects:
  app.post("/api/projects", async (req, res) => {
    try {
      const { id, title, period, shortDescription, fullDescription, techStack, githubUrl, demoUrl } = req.body;
      const db = await readDb();

      db.projects = db.projects.filter(p => p.id !== id);
      db.projects.push({
        id,
        title,
        period,
        shortDescription,
        fullDescription,
        techStack: Array.isArray(techStack) ? techStack.join(", ") : (techStack || ""),
        githubUrl: githubUrl || "",
        demoUrl: demoUrl || ""
      });

      await writeDb(db);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, period, shortDescription, fullDescription, techStack, githubUrl, demoUrl } = req.body;
      const db = await readDb();

      let found = false;
      db.projects = db.projects.map(p => {
        if (p.id === id) {
          found = true;
          return {
            id,
            title: title || p.title,
            period: period || p.period,
            shortDescription: shortDescription || p.shortDescription,
            fullDescription: fullDescription || p.fullDescription,
            techStack: techStack !== undefined
              ? (Array.isArray(techStack) ? techStack.join(", ") : techStack)
              : p.techStack,
            githubUrl: githubUrl !== undefined ? githubUrl : p.githubUrl,
            demoUrl: demoUrl !== undefined ? demoUrl : p.demoUrl
          };
        }
        return p;
      });

      if (!found) {
        db.projects.push({
          id,
          title: title || "",
          period: period || "",
          shortDescription: shortDescription || "",
          fullDescription: fullDescription || "",
          techStack: Array.isArray(techStack) ? techStack.join(", ") : (techStack || ""),
          githubUrl: githubUrl || "",
          demoUrl: demoUrl || ""
        });
      }

      await writeDb(db);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const db = await readDb();

      db.projects = db.projects.filter(p => p.id !== id);

      await writeDb(db);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // GET /api/messages - Admin read
  app.get("/api/messages", async (req, res) => {
    try {
      const db = await readDb();
      res.json({ success: true, messages: db.messages });
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
      const db = await readDb();

      const newId = "msg-" + Math.floor(Math.random() * 899999 + 100000);
      const timestamp = new Date().toISOString();

      const newMessage = {
        id: newId,
        name,
        email,
        subject: subject || "Sans sujet",
        message,
        timestamp
      };

      db.messages.unshift(newMessage);
      await writeDb(db);

      let emailSent = false;
      let emailStatusDetail = "";

      const gmailUser = process.env.GMAIL_USER || "kiffilevis21@gmail.com";
      const gmailAppPass = process.env.GMAIL_APP_PASSWORD;

      if (gmailAppPass) {
        try {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: gmailUser,
              pass: gmailAppPass
            }
          });

          const mailOptions = {
            from: `"${name} (Contact Portfolio)" <${gmailUser}>`,
            to: "kiffilevis21@gmail.com",
            replyTo: email,
            subject: `Portfolio: ${subject || "Nouveau message de contact"}`,
            text: `Nouveau message de contact recu de ${name} (${email}):\n\nSujet: ${subject}\n\nMessage:\n${message}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #1e293b;">
                <h2 style="color: #0f766e; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-top: 0;">Nouveau Message Portfolio</h2>
                <p>Vous avez reçu un nouveau message de contact depuis votre site portfolio officiel.</p>
                
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                  <tr style="background-color: #f8fafc;">
                    <td style="padding: 10px; font-weight: bold; width: 120px; border: 1px solid #e2e8f0;">Expéditeur:</td>
                    <td style="padding: 10px; border: 1px solid #e2e8f0;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Email:</td>
                    <td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="mailto:${email}" style="color: #0f766e; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr style="background-color: #f8fafc;">
                    <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0;">Sujet:</td>
                    <td style="padding: 10px; border: 1px solid #e2e8f0;">${subject || "Sans sujet"}</td>
                  </tr>
                </table>

                <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #0f766e; font-style: italic; white-space: pre-wrap;">${message}</div>

                <p style="font-size: 11px; color: #64748b; margin-top: 30px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                  Ce message a été envoyé de manière synchrone via votre moteur de portfolio.
                </p>
              </div>
            `
          };

          await transporter.sendMail(mailOptions);
          emailSent = true;
          emailStatusDetail = "Sent successfully via Gmail SMTP Gateway.";
          console.log(`Email successfully forwarded to kiffilevis21@gmail.com from ${email}`);
        } catch (mailErr: any) {
          console.error("Failed to dispatcher SMTP mail real-time:", mailErr);
          emailStatusDetail = `Failed to send email: ${mailErr.message}`;
        }
      } else {
        console.info("GMAIL_APP_PASSWORD is not configured in .env. Skip SMTP flow. Local JSON storage success.");
        emailStatusDetail = "Notification email was not dispatched because GMAIL_APP_PASSWORD is not configured. Saved in JSON database successfully.";
      }

      res.status(201).json({
        success: true,
        message: "Message enregistré avec succès.",
        emailSent,
        emailStatusDetail,
        data: {
          id: newId,
          name,
          email,
          subject: subject || "Sans sujet",
          message,
          timestamp,
          receiptId: "job-ack-" + Math.floor(Math.random() * 89999 + 10000),
          dispatchedTo: emailSent ? "Gmail SMTP + JSON local" : "JSON Engine: messages_relation",
          syncStatus: "saved"
        }
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // DELETE /api/messages - Clear database
  app.delete("/api/messages", async (req, res) => {
    try {
      const db = await readDb();
      db.messages = [];
      await writeDb(db);
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
