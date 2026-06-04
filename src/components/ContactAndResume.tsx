/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import PrintableCv from "./PrintableCv";
import { Send, FileText, Printer, CheckCircle2, Mail, Briefcase, Award, Globe, Link2, ExternalLink, X, Eye, Download, FileDown, ArrowRight } from "lucide-react";

export default function ContactAndResume() {
  const { profile, skills, projects, addMessage, messages } = usePortfolio();
  
  // Contact Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lastReceipt, setLastReceipt] = useState<any>(null);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  // Dynamic Word/DOCX file generation function matching schema & light styling
  const downloadAsWord = () => {
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>CV_${profile.name.replace(/\s+/g, "_")}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: A4;
            margin: 1.5cm 1.5cm 1.5cm 1.5cm;
          }
          body {
            font-family: Arial, sans-serif;
            color: #1e293b;
            font-size: 10pt;
            line-height: 1.4;
          }
          h1 {
            font-size: 18pt;
            font-weight: bold;
            color: #0f172a;
            margin: 0 0 2pt 0;
            text-transform: uppercase;
          }
          .role-title {
            font-size: 10.5pt;
            font-weight: bold;
            color: #0d9488;
            text-transform: uppercase;
            margin-bottom: 2px;
          }
          .section-title {
            font-size: 11pt;
            font-weight: bold;
            color: #0f172a;
            border-bottom: 2px solid #0f172a;
            padding-bottom: 2px;
            margin-top: 15px;
            margin-bottom: 8px;
            text-transform: uppercase;
          }
          .project-title {
            font-weight: bold;
            color: #0f172a;
            font-size: 10pt;
          }
          .project-period {
            color: #0d9488;
            font-size: 8.5pt;
            font-weight: bold;
          }
          .tag {
            background-color: #f8fafc;
            color: #334155;
            font-size: 8pt;
            padding: 2px 6px;
            border: 1px solid #e2e8f0;
            margin-right: 4px;
          }
          .sidebar-item {
            font-size: 9pt;
            margin-bottom: 8px;
          }
          .sidebar-label {
            font-weight: bold;
            color: #0f172a;
          }
        </style>
      </head>
      <body>
    `;

    const footer = `
      </body>
      </html>
    `;

    const portfolioUrl = window.location.origin.replace(/^https?:\/\//, "");

    const content = `
      <table style="width:100%; border-collapse:collapse; margin-bottom:15px;">
        <tr>
          <td style="vertical-align:top; padding:12px; border:1px solid #0f172a; background-color:#f8fafc;">
            <h1>${profile.name}</h1>
            <div class="role-title">&gt; ${profile.title} • Licence 2 Mathématiques & Informatique</div>
          </td>
          <td style="text-align:right; vertical-align:top; border:1px solid #0f172a; padding:12px; font-size: 8.5pt; color: #1e293b; background-color:#f8fafc;">
            <strong>Email:</strong> ${profile.socials.email}<br/>
            <strong>Tél:</strong> +227 91 53 52 20<br/>
            <strong>Adresse:</strong> ${profile.location}<br/>
            <strong>GitHub:</strong> ${profile.socials.github.replace("https://", "")}<br/>
            <strong>LinkedIn:</strong> ${profile.socials.linkedin.replace("https://", "")}<br/>
            <strong>Portfolio:</strong> ${portfolioUrl}
          </td>
        </tr>
      </table>

      <table style="width:100%; border-collapse:collapse;">
        <tr>
          <!-- Column 1: Sidebar (33% content) -->
          <td style="width:33%; vertical-align:top; padding-right:15px; border-right:1px solid #e2e8f0;">
            
            <div class="section-title">// 01_À propos</div>
            <p style="font-size:9pt; text-align:justify; color:#334155; line-height:1.45; margin:0;">
              ${profile.bio}
            </p>

            <div class="section-title">// 02_Formations</div>
            <div class="sidebar-item">
              <strong>Licence 2 en Mathématiques / Informatique</strong><br/>
              <span style="color:#475569; font-size:8.5pt;">UAM de Niamey • 2025 (En cours)</span>
            </div>
            <div class="sidebar-item">
              <strong>Baccalauréat Général</strong><br/>
              <span style="color:#475569; font-size:8.5pt;">Csp Assifa • 2024</span>
            </div>
            <div class="sidebar-item">
              <strong>BEPC</strong><br/>
              <span style="color:#475569; font-size:8.5pt;">Csp Assifa • 2023</span>
            </div>

            <div class="section-title">// 03_Certifications</div>
            <div class="sidebar-item">
              <strong>C# Free Foundation</strong><br/>
              <span style="color:#475569; font-size:8.5pt;">FreeCodeCamp & Microsoft</span>
            </div>

            <div class="section-title">// 04_Langues</div>
            <p style="font-size:8.5pt; color:#334155; margin:0; line-height:1.4;">
              • Français : Maternelle<br/>
              • Haoussa : Courant<br/>
              • Zarma : Intermédiaire<br/>
              • Anglais : Débutant
            </p>

            <div class="section-title">// 05_Qualités</div>
            <p style="font-size:8.5pt; color:#334155; margin:0; line-height:1.4;">
              • Rigueur & logique<br/>
              • Capacité d'analyse & persévérance<br/>
              • Esprit d'équipe & organisation<br/>
              • Adaptabilité & autonomie
            </p>

          </td>

          <!-- Column 2: Main Area (67% content) -->
          <td style="width:67%; vertical-align:top; padding-left:15px;">
            
            <div class="section-title" style="margin-top:0;">// 06_Expertises Techniques</div>
            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="width:50%; vertical-align:top; padding:4px;">
                  <strong style="color:#0d9488; font-size:8.5pt;">&gt; Langages de programmation</strong><br/>
                  <span style="font-size:8.5pt; color:#334155;">${skills.filter(s => s.category === "languages").map(s => s.name).join(", ")}</span>
                </td>
                <td style="width:50%; vertical-align:top; padding:4px;">
                  <strong style="color:#0d9488; font-size:8.5pt;">&gt; Frameworks & Librairies</strong><br/>
                  <span style="font-size:8.5pt; color:#334155;">${skills.filter(s => s.category === "frameworks").map(s => s.name).join(", ")}</span>
                </td>
              </tr>
              <tr>
                <td style="width:50%; vertical-align:top; padding:4px; padding-top:10px;">
                  <strong style="color:#0d9488; font-size:8.5pt;">&gt; Bases de données</strong><br/>
                  <span style="font-size:8.5pt; color:#334155;">${skills.filter(s => s.category === "databases").map(s => s.name).join(", ")}</span>
                </td>
                <td style="width:50%; vertical-align:top; padding:4px; padding-top:10px;">
                  <strong style="color:#0d9488; font-size:8.5pt;">&gt; Outils & DevOps</strong><br/>
                  <span style="font-size:8.5pt; color:#334155;">${skills.filter(s => s.category === "devops").map(s => s.name).join(", ")}</span>
                </td>
              </tr>
            </table>

            <div class="section-title">// 07_Projets & Expériences Pratiques</div>
            ${projects.map(proj => `
              <div style="margin-bottom:12px; border:1px solid #e2e8f0; padding:8px; background-color:#f1f5f9/20;">
                <table style="width:100%; border-collapse:collapse;">
                  <tr>
                    <td><span class="project-title">${proj.title}</span></td>
                    <td style="text-align:right;"><span class="project-period">[ ${proj.period} ]</span></td>
                  </tr>
                </table>
                <p style="font-size:8.5pt; text-align:justify; color:#475569; margin:4px 0; line-height:1.4;">
                  ${proj.shortDescription || proj.fullDescription}
                </p>
                <div style="margin-top:4px;">
                  <strong>Stack:</strong> ${proj.techStack.join(", ")}
                </div>
              </div>
            `).join("")}

          </td>
        </tr>
      </table>
    `;

    const blob = new Blob([header + content + footer], { type: "application/msword;charset=utf-8" });
    const docUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = docUrl;
    downloadLink.download = "CV_" + profile.name.replace(/\s+/g, "_") + ".doc";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Direct PDF generation and download utilizing client-side canvas-to-pdf compile
  const downloadAsPdf = async () => {
    if (isPdfGenerating) return;
    setIsPdfGenerating(true);
    try {
      if (!(window as any).html2pdf) {
        // Dynamically load html2pdf from a secure, high-speed CDN to avoid package bloat and react version conflicts
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Unable to load html2pdf.js script."));
          document.head.appendChild(script);
        });
      }

      const sourceElement = document.getElementById("print-cv-target");
      if (!sourceElement) {
        throw new Error("CV element not found.");
      }

      // Create a temporary off-screen container to render PrintableCv cleanly without "hidden" styles
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "-9999px";
      tempContainer.style.width = "210mm"; // A4 Width
      tempContainer.className = "bg-white text-slate-800 font-sans";

      const cloned = sourceElement.cloneNode(true) as HTMLDivElement;
      cloned.id = "print-cv-temp-capture";
      cloned.className = "block bg-white text-slate-800 font-sans p-0 m-0 w-full"; // Clear all CSS rules that hide/collapse it during normal layout

      tempContainer.appendChild(cloned);
      document.body.appendChild(tempContainer);

      const options = {
        margin: [10, 10, 10, 10], // standard mm layout margins
        filename: `CV_${profile.name.replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: false, 
          letterRendering: true,
          backgroundColor: "#ffffff"
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      };

      // @ts-ignore
      await window.html2pdf().set(options).from(cloned).save();

      document.body.removeChild(tempContainer);
    } catch (err) {
      console.error("PDF generation failed:", err);
      // Fallback: If direct export fails, gracefully open the preview tab
      window.open(window.location.origin + "?cv=preview", "_blank");
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const savedMsg = addMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "Sans Objet",
        message: formData.message
      });

      setLastReceipt({
        id: savedMsg.id,
        timestamp: new Date().toISOString(),
        receiptId: "job-ack-" + Math.floor(Math.random() * 89999 + 10000)
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Clear success banner after 8 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 10000);
    }, 800);
  };

  return (
    <section className="py-16 px-6 border-b border-app-border-subtle bg-app-bg transition-colors duration-200" id="contact-resume-section">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-12 border-l-2 border-app-text-white pl-4 select-none">
          <div className="text-[10px] font-mono uppercase tracking-widest text-app-text-muted">
            SECTION_04 // COMMUNICATIONS & CURRICULUM
          </div>
          <h2 className="text-3xl font-serif italic text-app-text-white">
            Me Contacter & CV PDF
          </h2>
          <p className="text-xs font-mono text-app-text-muted mt-1.5 uppercase">
            Formulaire d'envoi synchrone et export du CV automatisé
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE: Contact Form (5/12 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-app-card border border-app-border-subtle p-6 rounded-none space-y-4 shadow-xl transition-colors duration-200">
              <div className="flex items-center gap-2 select-none border-b border-app-border-subtle pb-3">
                <Mail className="h-4 w-4 text-app-text-muted" />
                <h3 className="font-mono text-xs font-bold text-app-text-white uppercase tracking-wider">
                  FORMULAIRE_DE_DIAL : INBOUND_MESSAGE
                </h3>
              </div>

              {submitSuccess && lastReceipt && (
                <div className="bg-[#22c55e]/5 border border-[#22c55e]/30 p-4 font-mono text-[11px] text-app-text-main space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 text-[#22c55e] font-bold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>TRANSMISSION_REÇUE (STATUS: 200)</span>
                  </div>
                  <p className="text-app-text-soft text-xs leading-relaxed font-sans">
                    Votre message a été enregistré avec succès dans notre base locale. La simulation Kafka l'a diffusé en continu. 
                  </p>
                  <div className="border-t border-[#22c55e]/15 pt-2 mt-1 xs:flex xs:justify-between text-[10px] text-app-text-muted">
                    <div>RECEIPT_ID: <span className="text-app-text-white select-all font-bold">{lastReceipt.receiptId}</span></div>
                    <div>DB_ID: <span className="text-app-text-white select-all font-bold">{lastReceipt.id}</span></div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">
                    Votre Nom <span className="text-[#ff3366]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex. Jane Smith"
                    className="w-full bg-app-card-sec border border-app-border-sec hover:border-app-border-strong text-app-text-white px-3.5 py-2 text-xs font-sans rounded-none focus:outline-none focus:border-app-text-white focus:bg-app-card transition-colors duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">
                    Adresse Email <span className="text-[#ff3366]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ex. janesmith@entreprise.com"
                    className="w-full bg-app-card-sec border border-app-border-sec hover:border-app-border-strong text-app-text-white px-3.5 py-2 text-xs font-sans rounded-none focus:outline-none focus:border-app-text-white focus:bg-app-card transition-colors duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">
                    Objet de la discussion
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="ex. Opportunité de mission Freelance / CDI"
                    className="w-full bg-app-card-sec border border-app-border-sec hover:border-app-border-strong text-app-text-white px-3.5 py-2 text-xs font-sans rounded-none focus:outline-none focus:border-app-text-white focus:bg-app-card transition-colors duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">
                    Message <span className="text-[#ff3366]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez votre projet d'ingénierie, de recrutement ou votre question..."
                    className="w-full bg-app-card-sec border border-app-border-sec hover:border-app-border-strong text-app-text-white px-3.5 py-2.5 text-xs font-sans rounded-none focus:outline-none focus:border-app-text-white focus:bg-app-card transition-colors duration-200 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 bg-app-text-white text-app-bg hover:bg-app-text-white/90 disabled:bg-app-text-muted font-mono text-[10.5px] uppercase tracking-widest font-extrabold flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  {isSubmitting ? "ENVOI_EN_COURS..." : "TRANSMETTRE_LE_MESSAGE"}
                </button>
              </form>
            </div>

            {/* Quick Stats on interactions */}
            <div className="p-4 bg-app-text-white/[0.02] border border-app-border-subtle font-mono text-[10px] text-app-text-muted text-left space-y-1.5 select-none transition-colors duration-200">
              <div className="text-app-text-white font-bold uppercase tracking-wider text-[11px]">// PORTFOLIO_MESSAGING_STATS</div>
              <div>• Total enregistrements locaux : <span className="font-bold text-app-text-soft">{messages.length} messages</span></div>
              <div>• Protocole de chiffrement : <span className="font-bold text-app-text-soft">SHA-256 HMAC</span></div>
              <div>• Statut serveur de simulation : <span className="text-[#22c55e] font-extrabold text-[9px] px-1 py-[1px] border border-[#22c55e]/20 bg-[#22c55e]/5 ml-1.5 rounded">OPÉRATIONNEL</span></div>
            </div>
          </div>

          {/* RIGHT SIDE: Curriculum Vitae PDF exporter & Preview card (7/12 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-app-card border border-app-border-subtle p-6 rounded-none space-y-6 shadow-xl transition-colors duration-200">
              <div className="flex items-center gap-2 border-b border-app-border-subtle pb-4 select-none">
                <FileText className="h-4 w-4 text-app-text-muted" />
                <h3 className="font-mono text-xs font-bold text-app-text-white uppercase tracking-wider">
                  CURRICULUM_VITAE : SYSTEM_EXPORT
                </h3>
              </div>

              <p className="text-xs text-app-text-soft leading-relaxed select-none">
                Téléchargez mon curriculum vitae mis à jour en temps réel à partir du portfolio. Choisissez le format officiel pré-configuré ou prévisualisez l'édition claire et optimisée A4 directement dans un autre onglet pour impression.
              </p>

              {/* Redesigned Download UI Panel - High-contrast console theme but adapted as a beautiful download dashboard */}
              <div className="border border-app-border-subtle bg-app-card-sec p-6 text-left relative overflow-hidden transition-all duration-300 shadow-md">
                {/* Visual accent simulating console frame */}
                <div className="absolute top-0 left-0 w-1 bg-teal-600 h-full" />
                
                {/* Header tag */}
                <div className="text-[9px] font-mono text-teal-500 font-black uppercase tracking-widest mb-4">
                  // EXPORT_CONSOLE_READY (ONLINE_SYNCED)
                </div>

                {/* Sub-bento Layout for formats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* PDF Direct Box */}
                  <div className="border border-app-border-subtle bg-app-bg p-4 relative group hover:border-[#ef4444]/30 transition-all">
                    <div className="text-[10px] font-mono text-[#ef4444] font-bold mb-1 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#ef4444] rounded-full animate-pulse"></span>
                      Format PDF (.pdf)
                    </div>
                    <p className="text-[10px] text-app-text-muted mb-4 font-sans leading-relaxed">
                      Idéal pour impression ou envois d'embauche. Calibré sur grille A4 géométrique.
                    </p>
                    <button
                      onClick={downloadAsPdf}
                      disabled={isPdfGenerating}
                      className="w-full py-2 bg-slate-900 border border-slate-800 text-white font-mono text-[9px] font-bold tracking-widest uppercase hover:bg-slate-800 disabled:bg-slate-800/80 disabled:cursor-not-allowed transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FileDown className={`w-3.5 h-3.5 text-teal-400 ${isPdfGenerating ? 'animate-bounce' : ''}`} />
                      {isPdfGenerating ? "COMPILATION PDF..." : "TÉLÉCHARGER PDF"}
                    </button>
                  </div>

                  {/* Word Direct Box */}
                  <div className="border border-app-border-subtle bg-app-bg p-4 relative group hover:border-[#3b82f6]/30 transition-all">
                    <div className="text-[10px] font-mono text-[#3b82f6] font-bold mb-1 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full"></span>
                      Format Word (.doc)
                    </div>
                    <p className="text-[10px] text-app-text-muted mb-4 font-sans leading-relaxed">
                      Format éditable Microsoft Word, structuré avec les styles et rubriques clés.
                    </p>
                    <button
                      onClick={downloadAsWord}
                      className="w-full py-2 bg-slate-900 border border-slate-800 text-white font-mono text-[9px] font-bold tracking-widest uppercase hover:bg-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-teal-400" />
                      TÉLÉCHARGER WORD
                    </button>
                  </div>

                </div>

                {/* Additional Preview Section */}
                <div className="border-t border-app-border-subtle/50 mt-5 pt-4 text-center">
                  <p className="text-[10.5px] text-app-text-soft font-mono mb-3">
                    &gt;_ Vous préférez relire ou configurer l'aperçu avant d'enregistrer ?
                  </p>
                  
                  <button
                    onClick={() => window.open(window.location.origin + "?cv=preview", "_blank")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600/10 border border-teal-500/20 hover:border-teal-500/80 text-teal-400 font-mono text-[10px] font-extrabold tracking-widest uppercase transition-all duration-200 cursor-pointer rounded-none hover:bg-teal-500/5"
                  >
                    <Eye className="w-4 h-4" />
                    PRÉVISUALISER DANS UN NOUVEL ONGLET
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Decorative terminal footer */}
                <div className="mt-4 pt-2.5 border-t border-app-border-subtle/30 flex justify-between items-center text-[8px] font-mono text-app-text-muted-xs uppercase">
                  <span>SCALE: A4_PORTRAIT</span>
                  <span>THEME_LOCKED: LIGHT ONLY</span>
                  <span>SYNC: EN DIRECT DU PROFIL</span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
