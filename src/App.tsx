import { motion } from "motion/react";
import Header from "./components/Header";
import BioSection from "./components/BioSection";
import SkillsSection from "./components/SkillsSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactAndResume from "./components/ContactAndResume";
import Footer from "./components/Footer";
import { PortfolioProvider } from "./context/PortfolioContext";

function AppContent() {


  return (
    <div className="relative">
      <div id="app-viewport" className="min-h-screen bg-app-bg text-app-text-main flex flex-col font-sans selection:bg-app-text-white/20 selection:text-app-text-white scroll-smooth pb-0 transition-colors duration-200 print:hidden">
        <Header />

        <main className="flex-grow relative">
          <div className="absolute top-0 left-0 w-full h-[600px] bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0 transition-opacity"></div>

          <div className="relative z-10">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <BioSection />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.1 }}>
              <SkillsSection />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.1 }}>
              <ServicesSection />
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
