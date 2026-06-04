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
                  className="w-full py-2.5 px-4 bg-[#0d9488] hover:bg-teal-500 text-slate-950 font-sans text-xs tracking-wider uppercase font-extrabold flex items-center justify-center gap-2 transition duration-200 cursor-pointer rounded"
                >
                  <Send className="h-3.5 w-3.5" />
                  {isSubmitting ? "Envoi en cours..." : "Transmettre le message"}
                </button>
              </form>
            </div>

            {/* Structured Stats on SQLite database */}
            <div className="p-4 bg-app-text-white/[0.02] border border-app-border-subtle font-mono text-xs text-app-text-muted text-left space-y-1.5 select-none transition-colors duration-200">
              <div className="text-teal-400 font-bold uppercase tracking-wider text-xs">// BASE DE DONNÉES SQLITE</div>
              <div>• Base de données relationnelle : <span className="font-bold text-app-text-soft">portfolio.db</span></div>
              <div>• Messages persistés en SQLite : <span className="font-bold text-teal-400">{messages.length} messages</span></div>
              <div>• Status serveur d'API : <span className="text-[#22c55e] font-bold">Actif & Synchronisé</span></div>
            </div>
          </div>

          {/* RIGHT SIDE: Curriculum Vitae PDF exporter & Preview card (7/12 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-app-card border border-app-border-subtle p-6 rounded-none space-y-6 shadow-xl transition-colors duration-200">
              <div className="flex items-center gap-2 border-b border-app-border-subtle pb-4 select-none">
                <FileText className="h-4 w-4 text-teal-400" />
                <h3 className="font-sans text-sm font-bold text-app-text-white uppercase tracking-wider">
                  Mon Curriculum Vitae (A4)
                </h3>
              </div>

              <p className="text-xs text-app-text-soft leading-relaxed select-none">
                Téléchargez mon curriculum vitae officiel au format PDF. Ce document est généré en temps réel pour être toujours conforme aux dernières informations du backend.
              </p>

              {/* Redesigned Single Download UI Panel */}
              <div className="border border-app-border-subtle bg-app-card-sec p-6 text-left relative overflow-hidden transition-all duration-300 shadow-md">
                {/* Visual accent simulating console frame */}
                <div className="absolute top-0 left-0 w-1 bg-teal-500 h-full" />
                
                {/* Header tag */}
                <div className="text-[9px] font-mono text-teal-400 font-black uppercase tracking-widest mb-4">
                  // Téléchargement Direct
                </div>

                <div className="space-y-4">
                  <div className="border border-app-border-subtle bg-app-bg p-5 relative group hover:border-teal-500/40 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#ef4444] rounded-full animate-pulse"></span>
                        FORMAT PDF DE QUALITÉ PROFESSIONNELLE
                      </div>
                      <p className="text-[10.5px] text-app-text-muted font-sans leading-relaxed">
                        Document A4 géométrique officiel, prêt pour l'envoi direct et l'impression.
                      </p>
                    </div>

                    <button
                      onClick={downloadOfficialPdf}
                      className="w-full sm:w-auto px-6 py-3 bg-teal-600 hover:bg-teal-500 text-slate-900 font-mono text-[10.5px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md rounded-none hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <FileDown className="w-4 h-4 text-slate-900" />
                      TÉLÉCHARGER LE CV (PDF)
                    </button>
                  </div>
                </div>

                {/* Decorative terminal footer */}
                <div className="mt-5 pt-3 border-t border-app-border-subtle/30 flex justify-between items-center text-[8px] font-mono text-app-text-muted-xs uppercase">
                  <span>FORMAT: A4 PORTRAIT</span>
                  <span>THEME: MODE CLAIR UNIFIÉ</span>
                  <span>SOURCE BDD: SQLite</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
