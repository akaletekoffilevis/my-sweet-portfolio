import { motion, MotionConfig } from "motion/react";
import Header from "./components/Header";
import BioSection from "./components/BioSection";
import ProjectsSection from "./components/ProjectsSection";
import ServicesSection from "./components/ServicesSection";
import SkillsSection from "./components/SkillsSection";
import CertificationsSection from "./components/CertificationsSection";
import ContactAndResume from "./components/ContactAndResume";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { PortfolioProvider } from "./context/PortfolioContext";
import { useOpticalAlign } from "./hooks/useOpticalAlign";

function AppContent() {
  useOpticalAlign();

  return (
    <div className="relative">
      <a href="#bio-section" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-app-accent focus:text-white focus:px-4 focus:py-2 focus:font-mono focus:text-sm">Aller au contenu</a>
      <div id="app-viewport" className="min-h-screen bg-app-bg text-app-text-main flex flex-col font-sans scroll-smooth pb-0 transition-colors duration-300 print:hidden">
        <Header />

        <main className="flex-grow relative">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <BioSection />
          </motion.div>

          <ProjectsSection />
          <ServicesSection />
          <SkillsSection />
          <CertificationsSection />
          <ContactAndResume />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <MotionConfig reducedMotion="user">
        <AppContent />
      </MotionConfig>
    </PortfolioProvider>
  );
}
