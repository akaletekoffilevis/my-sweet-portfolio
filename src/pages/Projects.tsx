import { useT } from "../i18n";
import { usePageSEO } from "../hooks/usePageSEO";
import PageHero from "../components/PageHero";
import ProjectsSection from "../components/ProjectsSection";

export default function Projects() {
  const t = useT();
  usePageSEO(t.projetsPage.seoTitle, t.projetsPage.seoDesc);

  return (
    <>
      <PageHero title={t.nav.projects} lead={t.projetsPage.lead} />

      <ProjectsSection />
    </>
  );
}
