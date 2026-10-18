import { useT } from "../i18n";
import { usePageSEO } from "../hooks/usePageSEO";
import PageHero from "../components/PageHero";
import ContactAndResume from "../components/ContactAndResume";

export default function Contact() {
  const t = useT();
  usePageSEO(t.contactPage.seoTitle, t.contactPage.seoDesc);

  return (
    <>
      <PageHero title={t.contactPage.heroTitle} />

      <ContactAndResume />
    </>
  );
}
