import { useT } from "../i18n";
import { usePageSEO } from "../hooks/usePageSEO";
import BioSection from "../components/BioSection";
import Timeline from "../components/Timeline";
import SoftSkillsSection from "../components/SoftSkillsSection";
import SkillsSection from "../components/SkillsSection";
import CertificationsSection from "../components/CertificationsSection";

export default function About() {
  const t = useT();
  usePageSEO(t.about.seoTitle, t.about.seoDesc);

  return (
    <>
      {/* Hero « À propos » : portrait, bio, formes filaires 3D en fond */}
      <BioSection />
      <Timeline />
      <SoftSkillsSection />
      <SkillsSection />
      <CertificationsSection />
    </>
  );
}
