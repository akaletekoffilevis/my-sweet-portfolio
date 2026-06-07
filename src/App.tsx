import { motion } from "motion/react";
import Header from "./components/Header";
import BioSection from "./components/BioSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactAndResume from "./components/ContactAndResume";
import Footer from "./components/Footer";
import PrintableCv from "./components/PrintableCv";
import { PortfolioProvider } from "./context/PortfolioContext";
import { Printer, X } from "lucide-react";

function AppContent() {
  const isCvPreviewTab = typeof window !== "undefined" && window.location.search.includes("cv=preview");

  if (isCvPreviewTab) {
    return (
      <div className="bg-[#f8fafc] min-h-screen p-4 sm:p-8 flex justify-center items-start print:p-0 select-text">
        <div className="w-full max-w-[210mm] min-h-[297mm] shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-slate-200 bg-white print:shadow-none print:border-none">
          <PrintableCv />
        </div>
        <div className="fixed bottom-6 right-6 flex flex-col xs:flex-row gap-3 print:hidden z-50">
          <button
            onClick={() => window.print()}
            className="bg-slate-900 border border-slate-800 text-white font-mono text-[11px] uppercase tracking-widest px-5 py-3 font-extrabold hover:bg-slate-800 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Printer className="w-4 h-4" />
            Imprimer / PDF
          </button>
          <button
            onClick={() => window.close()}
            className="bg-white border border-slate-300 text-slate-800 font-mono text-[11px] uppercase tracking-widest px-5 py-3 font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <X className="w-4 h-4 text-slate-500" />
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div id="app-viewport" className="min-h-screen bg-app-bg text-app-text-main flex flex-col font-sans selection:bg-app-text-white/20 selection:text-app-text-white scroll-smooth pb-0 transition-colors duration-200 print:hidden">
        <Header />

        <main className="flex-grow relative">
          <div className="absolute top-0 left-0 w-full h-[600px] bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0 transition-opacity"></div>

          <div className="relative z-10">
            <div className="bg-app-bg/85 border-b border-app-border-subtle sticky top-[64px] z-30 backdrop-blur-md hidden md:block select-none">
              <div className="mx-auto max-w-7xl px-6 py-2.5 flex justify-center items-center gap-6 text-sm text-app-text-muted">
                <a href="#bio-section" className="hover:text-app-accent border-b border-transparent hover:border-app-accent pb-0.5 transition font-medium">Présentation</a>
                <a href="#skills-section" className="hover:text-app-accent border-b border-transparent hover:border-app-accent pb-0.5 transition font-medium">Compétences</a>
                <a href="#projects-section" className="hover:text-app-accent border-b border-transparent hover:border-app-accent pb-0.5 transition font-medium">Projets</a>
                <a href="#contact-resume-section" className="hover:text-app-accent border-b border-transparent hover:border-app-accent pb-0.5 transition font-medium">Contact & CV</a>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <BioSection />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.1 }}>
              <SkillsSection />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }}>
              <ProjectsSection />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }}>
              <ContactAndResume />
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>

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
