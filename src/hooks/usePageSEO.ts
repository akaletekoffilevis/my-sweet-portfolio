import { useEffect } from "react";

/**
 * SEO par page : met à jour <title>, meta description et les balises
 * Open Graph au chargement d'une page. `title`/`description` sont les
 * chaînes déjà dans la langue courante (via useT()).
 */
export function usePageSEO(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const set = (selector: string, attr: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    set('meta[name="description"]', "content", description);
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", description);
    set('meta[name="twitter:title"]', "content", title);
    set('meta[name="twitter:description"]', "content", description);
  }, [title, description]);
}
