/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import PrintableCv from "./PrintableCv";
import { Send, FileText, Printer, CheckCircle2, Mail, Briefcase, Award, Globe, Link2, ExternalLink, X, Eye, Maximize2 } from "lucide-react";

export default function ContactAndResume() {
  const { profile, skills, projects, addMessage, messages, isCvModalOpen, setIsCvModalOpen } = usePortfolio();
  
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
                  CURRICULUM_VITAE : GENERATOR
                </h3>
              </div>

              <p className="text-xs text-app-text-soft leading-relaxed select-none">
                Ce service d'ingénierie génère en temps réel votre curriculum vitae au format PDF de qualité professionnelle. Veuillez cliquer sur le bouton ci-dessous pour ouvrir l'aperçu du document interactif et accéder aux fonctionnalités d'impression et d'export PDF.
              </p>

              {/* Graphical CV Mockup Card representing the blueprint of the A4 paper to tap before modal opens */}
              <div 
                onClick={() => setIsCvModalOpen(true)}
                className="border border-app-border-subtle bg-app-card-sec hover:bg-app-text-white/[0.02] p-6 text-left relative overflow-hidden transition-all duration-300 group cursor-pointer shadow-lg hover:border-app-text-white flex flex-col justify-between min-h-[220px]"
              >
                {/* Visual accents simulating code template binder */}
                <div className="absolute top-0 left-0 w-1 bg-app-text-white/40 group-hover:bg-app-text-white h-full transition-colors" />
                <div className="absolute top-4 right-4 text-app-text-muted group-hover:text-app-text-white transition-colors">
                  <Maximize2 className="h-4 w-4" />
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    {/* Tiny avatar mockup space */}
                    <div className="w-12 h-12 bg-app-text-white/10 flex items-center justify-center font-mono text-[10px] text-app-text-muted select-none">
                      PDF_A4
                    </div>
                    <div>
                      <h4 className="text-sm font-sans font-extrabold text-app-text-white tracking-tight uppercase">
                        CV_{profile.name.replace(/\s+/g, "_").toUpperCase()}
                      </h4>
                      <p className="text-[10px] font-mono text-app-text-muted mt-0.5 tracking-wider uppercase">
                        {profile.title}
                      </p>
                      <p className="text-[9px] font-mono text-app-text-muted-xs">
                        {profile.location} • {profile.socials.email}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-app-border-subtle/50 pt-3 select-none">
                    <div className="grid grid-cols-2 gap-2 text-[9px] text-app-text-soft font-mono uppercase">
                      <div>• PROFILE COMPLET CONFORME</div>
                      <div>• {skills.length} EXPERTISES CARTOGRAPHIÉES</div>
                      <div>• SYNCHRONISATION EN DIRECT</div>
                      <div>• PRÊT POUR TÉLÉCHARGEMENT</div>
                    </div>
                  </div>

                  <p className="text-[11px] text-app-text-muted italic line-clamp-2 pt-2">
                    "{profile.bio}"
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-app-border-subtle/30 flex items-center justify-center">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#22c55e] uppercase flex items-center gap-1.5 group-hover:underline">
                    <Eye className="h-3.5 w-3.5" />
                    CLIQUEZ POUR CONFIGURER & TÉLÉCHARGER LE CV
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
