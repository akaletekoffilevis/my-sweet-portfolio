/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import React, { useState } from "react";
import Header from "./components/Header";
import BioSection from "./components/BioSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactAndResume from "./components/ContactAndResume";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import LoginModal from "./components/LoginModal";
import PrintableCv from "./components/PrintableCv";
import { PortfolioProvider, usePortfolio } from "./context/PortfolioContext";
import { Terminal, FileText, Printer, X } from "lucide-react";

function AppContent() {
  const { isAdminMode, setIsAdminMode } = usePortfolio();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Check if we are in direct CV preview tab
  const isCvPreviewTab = typeof window !== "undefined" && window.location.search.includes("cv=preview");

  if (isCvPreviewTab) {
    return (
      <div className="bg-[#f8fafc] min-h-screen p-4 sm:p-8 flex justify-center items-start print:p-0 select-text">
        <div className="w-full max-w-[210mm] min-h-[297mm] shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-slate-200 bg-white print:shadow-none print:border-none">
          <PrintableCv />
        </div>
        
        {/* Print / Close controls floating at side of screen, hidden when printed */}
        <div className="fixed bottom-6 right-6 flex flex-col xs:flex-row gap-3 print:hidden z-50">
          <button
            onClick={() => window.print()}
            className="bg-slate-900 border border-slate-800 text-white font-mono text-[11px] uppercase tracking-widest px-5 py-3 font-extrabold hover:bg-slate-800 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Printer className="w-4 h-4 text-teal-400" />
            Imprimer / PDF
          </button>
          <button
            onClick={() => window.close()}
            className="bg-white border border-slate-300 text-slate-800 font-mono text-[11px] uppercase tracking-widest px-5 py-3 font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <X className="w-4 h-4 text-slate-500" />
            Fermer l'onglet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Normal Website Viewport (hidden entirely during printing) */}
      <div id="app-viewport" className="min-h-screen bg-app-bg text-app-text-main flex flex-col font-sans selection:bg-app-text-white/20 selection:text-app-text-white scroll-smooth pb-0 transition-colors duration-200 print:hidden font-sans">
        
        {/* Admin Mode Top Indicator Banner */}
        {isAdminMode && (
          <div className="bg-app-text-white text-app-bg px-6 py-2 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase z-50 sticky top-0 border-b border-app-border-strong select-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
              <span className="font-bold">Mode Éditeur : Portfolio Dynamique Actif</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAdminMode(false)}
                className="px-2 py-0.5 border border-app-bg/20 hover:border-app-bg/80 transition font-bold cursor-pointer"
              >
                QUITTER_L_EDITION
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Header */}
        <Header />

        {/* Main Container */}
        <main className="flex-grow relative">
          
          {/* Decorative Grid Background Accent */}
          <div className="absolute top-0 left-0 w-full h-[600px] bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0 transition-opacity"></div>

          <div className="relative z-10">
            
            {/* Quick Access Anchor Rail - Sophisticated developer rail */}
            <div className="bg-app-bg/80 border-b border-app-border-subtle sticky top-[73px] z-30 backdrop-blur-md hidden md:block">
              <div className="mx-auto max-w-7xl px-6 py-2.5 flex justify-between items-center text-[10px] font-mono tracking-widest text-app-text-muted uppercase">
                <span className="flex items-center gap-1.5 font-bold">
                  <Terminal className="h-3.5 w-3.5 text-app-text-muted" />
                  SYS_LOCATE:
                </span>
                <div className="flex gap-6">
                  <a href="#bio-section" className="hover:text-app-text-white border-b border-transparent hover:border-app-border-strong pb-0.5 transition">01_IDENTITÉ</a>
                  <span className="text-app-text-muted-xs">/</span>
                  <a href="#skills-section" className="hover:text-app-text-white border-b border-transparent hover:border-app-border-strong pb-0.5 transition">02_COMPÉTENCES</a>
                  <span className="text-app-text-muted-xs">/</span>
                  <a href="#projects-section" className="hover:text-app-text-white border-b border-transparent hover:border-app-border-strong pb-0.5 transition">03_PROJETS</a>
                  <span className="text-app-text-muted-xs">/</span>
                  <a href="#contact-resume-section" className="hover:text-app-text-white border-b border-transparent hover:border-app-border-strong pb-0.5 transition">04_CONTACT_&_CV</a>
                </div>
                <div className="flex items-center gap-2 font-mono text-app-text-muted-xs text-[9px]">
                  <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full shadow-[0_0_6px_rgba(34,197,94,0.8)] animate-pulse"></div>
                  <span>SECURE_CONNECTION</span>
                </div>
              </div>
            </div>

            {/* Intro Hero Section & Bio Details */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BioSection />
            </motion.div>

            {/* Technical Skills Overview */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SkillsSection />
            </motion.div>

            {/* Full Production Projects casework */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <ProjectsSection />
            </motion.div>
            {/* Formulaire de Contact & Exporter CV en PDF */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <ContactAndResume />
            </motion.div>
            
          </div>
        </main>

        {/* Corporate License & Footnotes */}
        <Footer onManageClick={() => setIsLoginModalOpen(true)} />

        {/* Login Authentication Modal */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSuccess={() => setIsAdminMode(true)}
        />

        {/* Lateral sliding AdminPanel overlay */}
        {isAdminMode && <AdminPanel onClose={() => setIsAdminMode(false)} />}
      </div>

      {/* Raw Print Sheet Target: Unconditionally rendered and optimized exclusively for media print */}
      <div id="print-cv-target" className="hidden print:block">
        <PrintableCv />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
