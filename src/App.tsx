import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "motion/react";
import { usePortfolio } from "./context/PortfolioContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import { LanguageProvider, useT } from "./i18n";
import { PortfolioProvider } from "./context/PortfolioContext";
import { useOpticalAlign } from "./hooks/useOpticalAlign";

const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Remonte en haut de page à chaque changement de route. */
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  useOpticalAlign(location.pathname);
  const t = useT();

  return (
    <div className="relative">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-app-accent focus:text-white focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
      >
        {t.skipLink}
      </a>

      <RouteEffects />

      <div id="app-viewport" className="min-h-screen bg-app-bg text-app-text-main flex flex-col font-sans transition-colors duration-300">
        <Header />

        <main id="main-content" className="flex-grow relative">
          <AnimatePresence mode="wait">
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/projets" element={<PageTransition><Projects /></PageTransition>} />
              <Route path="/a-propos" element={<PageTransition><About /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </Suspense>
        </AnimatePresence>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioProvider>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </MotionConfig>
      </PortfolioProvider>
    </LanguageProvider>
  );
}
