/**
 * Codebase PDF CV Generator using PDFKit
 * Generates an ultra-premium, high-fidelity single A4 page CV for Koffi Lévis Akalete.
 */
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generatePdf() {
  // Ensure both public and assets directories exist
  const assetsDir = path.join(__dirname, "../src/assets");
  const publicDir = path.join(__dirname, "../public");
  
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, "cv-koffi-levis.pdf");
  const fallbackPath = path.join(assetsDir, "cv-koffi-levis.pdf");
  console.log("Generating high-fidelity PDF CV to:", outputPath);
  console.log("Generating high-fidelity PDF CV to:", outputPath);

  // A4 dimensions: 595.28 x 841.89 points
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 35, bottom: 35, left: 35, right: 35 },
    bufferPages: true
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Palette colors matching the minimalist high-contrast dark-mode theme & console accent lines
  const COLOR_DARK = "#0f172a";      // Deep Slate text
  const COLOR_MUTED = "#475569";     // Grey slate
  const COLOR_TEAL = "#0d9488";      // Accent teal
  const COLOR_LIGHT_BG = "#f8fafc";  // Very light grey for blocks
  const COLOR_BORDER = "#cbd5e1";    // Soft grey border
  const COLOR_BLACK_BORDER = "#0f172a";

  // --- HEADER SECTION (Width: 525.28 pt) ---
  const headerX = 35;
  const headerY = 35;
  const headerWidth = 525;
  const headerHeight = 75;

  // Box Background
  doc.rect(headerX, headerY, headerWidth, headerHeight)
     .fillAndStroke(COLOR_LIGHT_BG, COLOR_BLACK_BORDER);

  // Top Accent bar
  doc.rect(headerX, headerY, headerWidth, 6).fill(COLOR_TEAL);

  // Koffi Lévis name
  doc.fillColor(COLOR_DARK)
     .font("Helvetica-Bold")
     .fontSize(20)
     .text("KOFFI LÉVIS AKALETE", headerX + 15, headerY + 18);

  // Title & Subtitle line
  doc.fillColor(COLOR_TEAL)
     .font("Helvetica-Bold")
     .fontSize(10)
     .text("> DÉVELOPPEUR BACKEND JUNIOR  •  Licence 2 Mathématiques & Informatique", headerX + 15, headerY + 42);

  // Contact header details (compact layout on the right)
  const contactText = "Email: koffilevis21@gmail.com\n" +
                      "Tél: +227 91 53 52 20\n" +
                      "GitHub: github.com/akaletekoffilevis\n" +
                      "LinkedIn: linkedin.com/in/akalete-koffi-levis\n" +
                      "Adresse: Niamey, Niger / Distanciel";

  doc.fillColor(COLOR_DARK)
     .font("Helvetica")
     .fontSize(7.5)
     .text(contactText, headerX + 320, headerY + 16, {
       width: 190,
       align: "right",
       lineGap: 2.2
     });

  // --- GRID LAYOUT SETUP ---
  const leftColX = 35;
  const leftColWidth = 165;
  const rightColX = 215;
  const rightColWidth = 345;
  let leftY = 125;
  let rightY = 125;

  function drawSectionTitle(title, x, y, width) {
    doc.fillColor(COLOR_DARK)
       .font("Helvetica-Bold")
       .fontSize(10.5)
       .text(title, x, y);
    
    // Line underneath
    doc.moveTo(x, y + 14)
       .lineTo(x + width, y + 14)
       .strokeColor(COLOR_DARK)
       .lineWidth(1.5)
       .stroke();
       
    return y + 22;
  }

  // ==================== LEFT COLUMN CONTENT ====================

  // // 01_À propos
  leftY = drawSectionTitle("// 01_À propos", leftColX, leftY, leftColWidth);
  const bioText = "Étudiant en informatique orienté développement backend avec une solide base en C#/.NET et en développement web côté serveur. Habitué aux projets concrets, à l'autoformation active et aux environnements de développement modernes.";
  doc.fillColor(COLOR_MUTED)
     .font("Helvetica")
     .fontSize(8.5)
     .text(bioText, leftColX, leftY, {
       width: leftColWidth,
       align: "justify",
       lineGap: 2.5
     });
  leftY += 80;

  // // 02_Formations
  leftY = drawSectionTitle("// 02_Formations", leftColX, leftY, leftColWidth);
  
  // Formation items
  doc.fillColor(COLOR_DARK)
     .font("Helvetica-Bold")
     .fontSize(8.5)
     .text("Licence 2 Mathématiques-Info", leftColX, leftY);
  doc.fillColor(COLOR_TEAL)
     .font("Helvetica")
     .fontSize(8)
     .text("UAM de Niamey | En cours (2025)", leftColX, leftY + 11);
  leftY += 28;

  doc.fillColor(COLOR_DARK)
     .font("Helvetica-Bold")
     .fontSize(8.5)
     .text("Baccalauréat Général Réussi", leftColX, leftY);
  doc.fillColor(COLOR_MUTED)
     .font("Helvetica")
     .fontSize(8)
     .text("CSP Assifa | 2024", leftColX, leftY + 11);
  leftY += 28;

  doc.fillColor(COLOR_DARK)
     .font("Helvetica-Bold")
     .fontSize(8.5)
     .text("Diplôme du BEPC", leftColX, leftY);
  doc.fillColor(COLOR_MUTED)
     .font("Helvetica")
     .fontSize(8)
     .text("CSP Assifa | 2023", leftColX, leftY + 11);
  leftY += 32;

  // // 03_Certifications
  leftY = drawSectionTitle("// 03_Certifications", leftColX, leftY, leftColWidth);
  doc.fillColor(COLOR_DARK)
     .font("Helvetica-Bold")
     .fontSize(8.5)
     .text("C# Foundational Certification", leftColX, leftY);
  doc.fillColor(COLOR_MUTED)
     .font("Helvetica")
     .fontSize(8)
     .text("Microsoft & FreeCodeCamp (2024)", leftColX, leftY + 11);
  leftY += 32;

  // // 04_Langues
  leftY = drawSectionTitle("// 04_Langues", leftColX, leftY, leftColWidth);
  const languagesList = "• Français : Maternelle\n" +
                        "• Haoussa : Courant\n" +
                        "• Zarma : Intermédiaire\n" +
                        "• Anglais : Débutant (Autoformation)";
  doc.fillColor(COLOR_MUTED)
     .font("Helvetica")
     .fontSize(8.5)
     .text(languagesList, leftColX, leftY, {
       lineGap: 3
     });
  leftY += 58;

  // // 05_Qualités
  leftY = drawSectionTitle("// 05_Qualités", leftColX, leftY, leftColWidth);
  const softSkills = "• Rigueur & logique mathématique\n" +
                     "• Capacité d'analyse technique\n" +
                     "• Esprit d'équipe & persévérance\n" +
                     "• Adaptabilité aux technologies";
  doc.fillColor(COLOR_MUTED)
     .font("Helvetica")
     .fontSize(8.5)
     .text(softSkills, leftColX, leftY, {
       lineGap: 3
     });

  // ==================== RIGHT COLUMN CONTENT ====================

  // // 06_Expertises
  rightY = drawSectionTitle("// 06_Expertises Techniques", rightColX, rightY, rightColWidth);
  
  // Format grid-like items for technical skills
  const skillsData = [
    { title: "Langages de Base", content: "C#, SQL, HTML5, CSS3, JavaScript, Python" },
    { title: "Frameworks principaux", content: ".NET / ASP.NET MVC, Blazor Components" },
    { title: "Bases de Données", content: "MySQL, SQLite, SQL Server (architecture relationnelle)" },
    { title: "Outils & Méthodes", content: "Git, GitHub Version Control, OOP Principles, VPCs" }
  ];

  skillsData.forEach((skill, index) => {
    const itemX = rightColX + (index % 2) * 172;
    const itemY = rightY + Math.floor(index / 2) * 36;
    
    doc.fillColor(COLOR_TEAL)
       .font("Helvetica-Bold")
       .fontSize(8.5)
       .text(`> ${skill.title}`, itemX, itemY);
       
    doc.fillColor(COLOR_MUTED)
       .font("Helvetica")
       .fontSize(8)
       .text(skill.content, itemX + 5, itemY + 11, {
         width: 160,
         lineGap: 1.5
       });
  });
  rightY += 80;

  // // 07_Expériences & Projets
  rightY = drawSectionTitle("// 07_Projets Réels & Pratiques", rightColX, rightY, rightColWidth);

  const projects = [
    {
      title: "DotnetNiger API - Projet Communautaire",
      period: "2024 - En cours",
      desc: "API de pilotage technique pour un collectif nigérien .NET. Gestion d'intégration continue, validation de requêtes REST et connexion SQL Server centralisée avec Entity Framework.",
      techStack: "Stack: C#, .NET, ASP.NET Core, SQL Server, GitHub Actions"
    },
    {
      title: "Next Dev Blazor App - Formation NextDev",
      period: "2024",
      desc: "Composants d'interface interactifs réutilisables, état partagé robuste et base SQLite embarquée sans requérir JavaScript pour les liaisons de formulaires directes.",
      techStack: "Stack: C#, Blazor Server, .NET, HTML5/CSS3, SQLite"
    },
    {
      title: "Student Manager Console - Projet Académique",
      period: "2024",
      desc: "Application console de bureau démontrant l'algorithmique POO avancée (encapsulation, héritage) pour la gestion d'un registre d'étudiants persisté avec écriture SQLite.",
      techStack: "Stack: C#, .NET Compiler, SQLite, OOP Principles"
    },
    {
      title: "My Todos App - Pratique Personnelle",
      period: "2023",
      desc: "Gestion de tâches ménagères et scolaires réactives, synchronisation côté serveur utilisant le rendu MVC classique et scripts clients interactifs de base.",
      techStack: "Stack: C#, ASP.NET Core, CSS sémantique, JS"
    }
  ];

  projects.forEach((proj, idx) => {
    // Project title and period
    doc.fillColor(COLOR_DARK)
       .font("Helvetica-Bold")
       .fontSize(9.5)
       .text(proj.title, rightColX, rightY);
    
    // Period block aligned to the right side of right column
    doc.fillColor(COLOR_TEAL)
       .font("Helvetica-Bold")
       .fontSize(8)
       .text(`[ ${proj.period} ]`, rightColX, rightY, {
         width: rightColWidth,
         align: "right"
       });
    
    rightY += 13;

    // Body descriptive text
    doc.fillColor(COLOR_MUTED)
       .font("Helvetica")
       .fontSize(8)
       .text(proj.desc, rightColX + 5, rightY, {
         width: rightColWidth - 5,
         align: "justify",
         lineGap: 2.2
       });
    
    rightY += 28;

    // Tech stack summary
    doc.fillColor(COLOR_DARK)
       .font("Helvetica-Bold")
       .fontSize(7.5)
       .text(proj.techStack, rightColX + 5, rightY);
       
    // Separator line between projects except the last one
    if (idx < projects.length - 1) {
      rightY += 15;
      doc.moveTo(rightColX, rightY)
         .lineTo(rightColX + rightColWidth, rightY)
         .strokeColor(COLOR_BORDER)
         .lineWidth(0.5)
         .stroke();
      rightY += 8;
    } else {
      rightY += 15;
    }
  });

  // Vertical Separator Line between left and right column
  doc.moveTo(200, 125)
     .lineTo(200, 800)
     .strokeColor(COLOR_BORDER)
     .lineWidth(0.7)
     .stroke();

  // Footer / Synchronisation marker at the bottom
  const footerText = "DOCUMENT OFFICIELEMENT GÉNÉRÉ ET SYNCHRONISÉ PAR LE PORTFOLIO WEB DE KOFFI LÉVIS AKALETE\n" +
                     "ACCÈS EN LIGNE AUX PROJETS DISPONIBLES EN DIRECT SUR LE COMPTE GITHUB";
  doc.fillColor(COLOR_MUTED)
     .font("Helvetica")
     .fontSize(6)
     .text(footerText, 35, 810, {
       width: 525,
       align: "center",
       lineGap: 2
     });

  // End and output file
  doc.end();

  stream.on("finish", () => {
    console.log("PDF generated successfully at:", outputPath);
    try {
      fs.copyFileSync(outputPath, fallbackPath);
      console.log("Successfully copied PDF to assets folder:", fallbackPath);
    } catch (e) {
      console.error("Failed to copy PDF to fallback assets path:", e);
    }
  });
}

generatePdf();
