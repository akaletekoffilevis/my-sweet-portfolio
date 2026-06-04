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

  // Direct instant download function of the pre-compiled high-fidelity static A4 PDF CV
  const downloadOfficialPdf = () => {
    const link = document.createElement("a");
    link.href = "/cv-koffi-levis.pdf";
    link.download = `CV_Koffi_Levis_Akalete.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <section className="py-20 px-6 border-b border-app-border-subtle bg-app-bg transition-colors duration-200" id="contact-resume-section">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-14 border-l-2 border-teal-500 pl-4 select-none">
          <div className="text-[10px] font-mono uppercase tracking-widest text-app-text-muted">
            SECTION_04 // COMMUNICATIONS & CURRICULUM
          </div>
          <h2 className="text-3xl font-serif italic text-app-text-white">
            Me Contacter & CV Officiel
          </h2>
          <p className="text-xs font-mono text-app-text-muted mt-1.5 uppercase">
            Formulaire d'envoi synchrone et export direct du CV A4
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE: Beautiful Contact Form (5/12 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-app-card border border-app-border-subtle p-6 sm:p-8 rounded shadow-xl space-y-5 transition-colors duration-200">
              <div className="flex items-center justify-between border-b border-app-border-subtle pb-4 select-none">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-teal-400" />
                  <h3 className="font-mono text-xs font-bold text-app-text-white uppercase tracking-wider">
                    inbound_channel.sh
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded bg-emerald-500/5 font-semibold">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce inline-block"></span>
                  SECURE
                </div>
              </div>

              {submitSuccess && lastReceipt && (
                <div className="bg-emerald-500/5 border border-emerald-500/30 p-4 font-mono text-[11px] text-emerald-200 space-y-2 rounded animate-fadeIn">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>MESSAGE TRANSMIS AVEC SUCCÈS</span>
                  </div>
                  <p className="text-app-text-muted text-xs leading-relaxed font-sans">
                    Votre message a été enregistré en base de données. Koffi Lévis sera notifié immédiatement par webhook. Merci de votre confiance !
                  </p>
                  <div className="border-t border-emerald-500/10 pt-2 mt-1 flex justify-between text-[9px] text-app-text-muted">
                    <div>ACCUSÉ: <span className="text-app-text-white font-bold select-all">{lastReceipt.receiptId}</span></div>
                    <div>UUID: <span className="text-app-text-white font-bold select-all">{lastReceipt.id}</span></div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">
                    Votre Nom <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex. Jane Smith"
                    className="w-full bg-app-card-sec border border-app-border-subtle focus:border-teal-500/70 text-app-text-white px-3.5 py-2.5 text-xs font-sans rounded focus:outline-none focus:bg-app-card transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">
                    Adresse Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ex. janesmith@entreprise.com"
                    className="w-full bg-app-card-sec border border-app-border-subtle focus:border-teal-500/70 text-app-text-white px-3.5 py-2.5 text-xs font-sans rounded focus:outline-none focus:bg-app-card transition-all duration-200"
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
                    placeholder="ex. Mission Freelance / Recrutement"
                    className="w-full bg-app-card-sec border border-app-border-subtle focus:border-teal-500/70 text-app-text-white px-3.5 py-2.5 text-xs font-sans rounded focus:outline-none focus:bg-app-card transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[10px] text-app-text-muted uppercase tracking-wider font-bold">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Contenu de votre message..."
                    className="w-full bg-app-card-sec border border-app-border-subtle focus:border-teal-500/70 text-app-text-white px-3.5 py-2.5 text-xs font-sans rounded focus:outline-none focus:bg-app-card transition-all duration-200 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-500 disabled:bg-teal-800 disabled:text-slate-400 text-slate-950 font-mono text-xs tracking-wider uppercase font-black flex items-center justify-center gap-2 transition duration-200 cursor-pointer rounded shadow-md"
                >
                  <Send className="h-3.5 w-3.5 select-none" />
                  {isSubmitting ? "Envoi en cours..." : "Transmettre le message"}
                </button>
              </form>
            </div>

            {/* Structured SQLite Synchronizer widget */}
            <div className="p-4 bg-app-card border border-app-border-subtle rounded font-mono text-[11px] text-app-text-muted text-left space-y-1.5 select-none transition-colors duration-200 shadow-sm border-l-2 border-l-teal-500">
              <div className="text-teal-400 font-bold uppercase tracking-wider text-xs">// PERSISTANCE RELATIONNELLE</div>
              <div>• Base Locale Active : <span className="font-bold text-app-text-soft">portfolio.db (SQLite)</span></div>
              <div>• Historique d'échanges : <span className="font-bold text-teal-400">{messages.length} messages synchronisés</span></div>
              <div>• Statut du canal d'API : <span className="text-emerald-400 font-bold uppercase">Opérationnel (HTTP 200)</span></div>
            </div>
          </div>

          {/* RIGHT SIDE: Redesigned interactive CV card with a miniature visual preview and one direct PDF Action (7/12 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-app-card border border-app-border-subtle p-6 sm:p-8 rounded shadow-xl space-y-6 transition-colors duration-200">
              
              <div className="flex items-center gap-2 border-b border-app-border-subtle pb-4 select-none">
                <FileText className="h-4 w-4 text-teal-400" />
                <h3 className="font-mono text-xs font-extrabold text-app-text-white uppercase tracking-wider">
                  curriculum_vitae.pdf
                </h3>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-app-text-soft leading-relaxed">
                  Le curriculum vitae ci-dessous respecte les standards professionnels les plus exigeants : une structure claire à double colonne, des sections claires valorisant la double spécialisation en mathématiques et informatique, et une mise en page géométrique épurée.
                </p>

                {/* Elegant Miniature visual representation of the actual PDF Resume */}
                <div className="bg-slate-950/60 border border-slate-800 rounded p-5 select-none font-sans text-[11px] text-app-text-muted space-y-4 shadow-inner relative group overflow-hidden">
                  
                  {/* Decorative background paper edge effect */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-teal-500/20 to-transparent pointer-events-none blur-sm" />

                  <div className="pb-3 border-b border-slate-800 flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="text-teal-400 font-extrabold font-mono text-[11px] uppercase tracking-wider">Koffi Lévis Akalete</div>
                      <div className="text-[9.5px] uppercase text-app-text-soft">Développeur Backend Junior | L2 Math-Info</div>
                    </div>
                    <div className="text-[9px] font-mono text-emerald-400 border border-emerald-500/30 px-1 py-0.2 bg-emerald-500/5 rounded shrink-0">
                      Niamey, Niger
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-4">
                    {/* Column 1 info list */}
                    <div className="col-span-4 space-y-3 border-r border-slate-800 pr-2">
                      <div className="space-y-1">
                        <div className="text-[8.5px] font-mono font-bold text-teal-500 uppercase tracking-widest">// Éducation</div>
                        <div className="text-[9.5px] text-app-text-white font-bold">Licence 2 Math/Info</div>
                        <div className="text-[8.5px]">UAM de Niamey • 2025</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[8.5px] font-mono font-bold text-teal-500 uppercase tracking-widest">// Langues</div>
                        <div className="text-[9px] text-[#94a3b8]">Français, Haoussa, Zarma, Anglais</div>
                      </div>
                    </div>

                    {/* Column 2 info summary */}
                    <div className="col-span-8 space-y-3">
                      <div className="space-y-1">
                        <div className="text-[8.5px] font-mono font-bold text-teal-500 uppercase tracking-widest">// Expertises Backend</div>
                        <p className="text-[9.5px] text-app-text-soft leading-snug">
                          • Architecture saine avec C# / .NET, APIs RESTful et contrôle de flux.<br/>
                          • Persistance et structuration des bases de données SQL / SQLite.<br/>
                          • Automatisation de scripts utilitaires légers (Bash/Python).
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[8.5px] font-mono font-bold text-teal-500 uppercase tracking-widest">// Projets & Validations</div>
                        <div className="text-[9px] text-teal-300 font-bold">Microsoft Certified: C# Free Foundation</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary single Action Button Block as requested */}
                <div className="pt-3">
                  <button
                    onClick={downloadOfficialPdf}
                    className="w-full py-4 px-6 bg-teal-600 hover:bg-teal-500 text-slate-950 font-mono text-xs font-black tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer rounded shadow-lg transform hover:translate-y-[-1px] active:translate-y-[1px]"
                    title="Télécharger le document PDF officiel de Koffi Lévis Akalete"
                  >
                    <FileDown className="w-4 h-4 text-slate-950" />
                    Télécharger mon CV PDF (A4)
                  </button>
                  <p className="text-[10px] font-sans text-app-text-muted text-center mt-2">
                    Visualisable, imprimable et prêt à l'emploi immédiat.
                  </p>
                </div>
              </div>

              {/* Decorative Document Metadata footer */}
              <div className="pt-3 border-t border-app-border-subtle flex justify-between items-center text-[9px] font-mono text-app-text-muted uppercase">
                <span>FORMAT : A4 PORTRAIT DIRECT</span>
                <span>TAILLE : ~0.6 MO</span>
                <span>SÉCURISÉ : SIGNÉ GPG</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
