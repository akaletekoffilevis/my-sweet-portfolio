import React, { createContext, useContext, useEffect, useState } from "react";

export type Lang = "fr" | "en";

/* ═══ Détection : localStorage > navigateur (fr → FR, tout autre → EN) ═══ */
function detectLang(): Lang {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "fr" || saved === "en") return saved;
  } catch {
    // stockage indisponible
  }
  const nav = typeof navigator !== "undefined" ? navigator.language || "" : "";
  return nav.toLowerCase().startsWith("fr") ? "fr" : "en";
}

/* ═══ Contexte langue ═══ */
interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const SEO: Record<Lang, { title: string; description: string }> = {
  fr: {
    title: "Koffi Lévis Akalete — Développeur Full Stack Junior | C#, .NET, Blazor | Portfolio",
    description:
      "Portfolio de Koffi Lévis Akalete, développeur full stack junior basé à Niamey, Niger. C#, .NET, ASP.NET Core, Blazor — APIs REST sécurisées, applications web et mobiles. Ambassadeur 10000 CODEURS.",
  },
  en: {
    title: "Koffi Lévis Akalete — Full Stack Junior Developer | C#, .NET, Blazor | Portfolio",
    description:
      "Portfolio of Koffi Lévis Akalete, junior full stack developer based in Niamey, Niger. C#, .NET, ASP.NET Core, Blazor — secure REST APIs, web and mobile applications. 10000 CODEURS Ambassador.",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      // stockage indisponible
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = SEO[lang].title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", SEO[lang].description);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within a LanguageProvider");
  return ctx;
}

/* ═══ Chaînes d'interface (hors contenu data.ts) ═══ */
const frStrings = {
  nav: {
    home: "Accueil",
    projects: "Projets",
    about: "À propos",
    services: "Services",
    skills: "Compétences",
    certifications: "Certifications",
    contact: "Contact",
    mainAria: "Navigation principale",
    mobileAria: "Navigation mobile",
    menu: "Menu",
    close: "Fermer",
    navigation: "Navigation",
    role: "Développeur Full Stack Junior",
  },
  home: {
    kicker: "Développeur Full Stack Junior — Niamey, Niger",
    leadBefore: "Je développe des APIs sécurisées, des applications web et mobiles — avec ",
    leadAfter: " : un code propre, livré à temps.",
    ctaProjects: "Voir mes projets",
    ctaContact: "Me contacter",
    ctaCv: "Télécharger mon CV",
    featuredTitle: "Projets vedettes",
    featuredMeta: "Une sélection — le reste sur la page projets",
    featuredAll: "Voir tous les projets",
    servicesAll: "Tous les services",
    svcWebTitle: "Site web",
    svcWebDesc: "Vitrines, landing pages, applications interactives et sites bilingues — responsive, rapides, déployés.",
    svcMobileTitle: "Application mobile",
    svcMobileDesc: "Apps Flutter natives iOS/Android : e-commerce, gestion, clones et interfaces soignées.",
    svcCustomTitle: "Logiciel sur mesure",
    svcCustomDesc: "APIs, outils CLI, desktop et SaaS — de l'idée au déploiement, code propre et maintenable.",
    ctaBandTitle: "Un projet en tête ?",
    ctaBandDesc: "API, site web, application mobile ou outil sur mesure — parlons-en, devis gratuit.",
    ctaBandBtn: "Démarrer un projet",
    certsLink: "Voir mes certifications",
    seoTitle: "Koffi Lévis Akalete — Développeur Full Stack Junior | C#, .NET, Blazor | Portfolio",
    seoDesc:
      "Portfolio de Koffi Lévis Akalete, développeur full stack junior à Niamey : 20+ projets, 10+ certifications. C#, .NET, Blazor, Flutter — APIs REST sécurisées, web et mobile. Ambassadeur 10000 CODEURS.",
  },
  projetsPage: {
    lead: "Projets web, mobiles, APIs, outils et infrastructure — open source, la plupart en ligne.",
    seoTitle: "Projets — 20+ réalisations | Koffi Lévis Akalete",
    seoDesc:
      "20+ réalisations open source : Blazor WebAssembly, ASP.NET Core, Flutter, Next.js, CLI .NET. Aperçus live et code source sur GitHub.",
  },
  about: {
    heroTitle: "À propos de Koffi Lévis",
    bioLead: "Étudiant en Mathématiques-Informatique à Niamey, ambassadeur 10000 CODEURS, en apprentissage continu depuis 2024.",
    timelineTitle: "Parcours",
    timelineMeta: "De la première ligne de code à l'Ambassadeur",
    present: "Aujourd'hui",
    softTitle: "Qualités & soft skills",
    softMeta: "Ce que j'apporte au-delà du code",
    seoTitle: "À propos — Parcours & compétences | Koffi Lévis Akalete",
    seoDesc:
      "Parcours de Koffi Lévis Akalete : de HTML/CSS en 2024 à C#/.NET, Flutter et l'Ambassadeur 10000 CODEURS. Soft skills, certifications et timeline complète.",
  },
  servicesPage: {
    lead: "Du développement à la mise en ligne — une méthode claire, un prix fixé à l'avance.",
    methodTitle: "Ma méthode de travail",
    methodMeta: "Du premier échange à la maintenance",
    seoTitle: "Services — Développement web, mobile & APIs | Koffi Lévis Akalete",
    seoDesc:
      "APIs ASP.NET Core, applications Blazor, apps Flutter, sites Next.js, CI/CD Docker, tests et maintenance. Devis gratuit, réponse rapide.",
    ctaTitle: "Un besoin précis ?",
    ctaDesc: "Décrivez votre projet en quelques lignes — je vous réponds avec une proposition claire.",
    ctaBtn: "Demander un devis",
  },
  contactPage: {
    heroTitle: "Contact",
    availability: "Disponible pour missions & alternance",
    lead: "Une question, un projet, une opportunité ? Écrivez-moi — je réponds rapidement.",
    seoTitle: "Contact — Devis gratuit | Koffi Lévis Akalete",
    seoDesc:
      "Contactez Koffi Lévis Akalete à Niamey : formulaire, WhatsApp, LinkedIn. Réponse rapide, devis gratuit pour vos projets web, mobile et APIs.",
  },
  theme: { light: "Passer en mode clair", dark: "Passer en mode sombre" },
  langLabel: "Langue du site",
  skipLink: "Aller au contenu",
  scrollToTop: "Retour en haut",
  bio: {
    available: "Disponible pour missions",
    contact: "Me contacter",
    downloadCv: "Télécharger le CV",
    portraitAlt: "Portrait de {name}, développeur Full Stack Junior basé à Niamey",
    figPortrait: "fig. 01 — portrait",
    tagline:
      "Développeur Full Stack Junior — {stack}. Ambassadeur 10000 CODEURS, étudiant en Mathématiques-Informatique à Niamey, en apprentissage continu.",
  },
  projects: {
    filters: {
      all: "Tout",
      web: "Web & PWA",
      mobile: "Mobile",
      api: "APIs",
      outils: "Outils & CLI",
      desktop: "Desktop & Infra",
    },
    filterAria: "Filtrer les projets par catégorie",
    detail: "détail →",
    openAria: "Voir les détails du projet {title}",
    live: "Voir en ligne",
    demo: "Démo",
    source: "Code source",
    tech: "Technologies",
    close: "Fermer",
    prev: "Projet précédent",
    next: "Projet suivant",
    previewAlt: "Aperçu de {title}",
  },
  services: { meta: "Ce que je peux faire pour vous" },
  skills: {
    meta: "{n} technologies",
    filterAria: "Filtrer les compétences par catégorie",
    all: "Tout",
    languages: "Langages",
    frameworks: "Frameworks",
    databases: "Bases de données",
    devops: "DevOps",
    catLabels: { languages: "langage", frameworks: "framework", databases: "database", devops: "devops" },
    years: "an(s)",
    progressAria: "{name} — niveau {level}%",
  },
  certs: {
    meta: "10+ certifications — vérifiables en ligne",
    alt: "Certificat {title} — {issuer}",
    previewUnavailable: "Aperçu indisponible",
    openCertAria: "Ouvrir le certificat {title}",
    verify: "Vérifier le certificat",
    viewPdf: "Voir le PDF",
    lightboxTitle: "Certificat",
    lightboxClose: "Fermer l'aperçu",
    prev: "Certificat précédent",
    next: "Certificat suivant",
  },
  contact: {
    form: "Formulaire",
    details: "Coordonnées",
    socials: "Réseaux",
    formTitle: "Décrivez votre projet",
    formHint: "Les champs marqués d'un astérisque (*) sont obligatoires.",
    phone: "Téléphone",
    replyTime: "Réponse rapide",
    timezone: "Niamey · GMT+1",
    whatsappMsg: "Bonjour Koffi, je vous contacte depuis votre portfolio. J'aimerais discuter d'un projet.",
    copy: "Copier",
    copied: "Copié",
    nextTitle: "Ce qui se passe ensuite",
    nextSteps: [
      "Je reçois et lis votre message",
      "Je vous réponds avec une proposition claire",
      "On planifie un appel si besoin",
    ],
    errName: "Votre nom est requis.",
    errEmail: "Votre email est requis.",
    errEmailInvalid: "Format d'email invalide.",
    errMessage: "Votre message est requis.",
    messageMax: "600 caractères max",
    successTitle: "Message envoyé avec succès.",
    successSub: "Je vous répondrai dès que possible.",
    errorSub: "Veuillez réessayer.",
    netError: "Erreur réseau. Vérifiez votre connexion et réessayez.",
    fallbackError: "Une erreur est survenue. Réessayez.",
    honeypotLabel: "Ne pas remplir",
    name: "Nom",
    email: "Email",
    whatsapp: "WhatsApp",
    optional: "(optionnel)",
    subject: "Sujet",
    message: "Message",
    chooseSubject: "Choisissez un sujet",
    yourName: "Votre nom",
    yourEmail: "votre@email.com",
    yourWhatsapp: "+227 XX XX XX XX",
    yourMessage: "Décrivez votre projet, votre besoin ou votre question…",
    sending: "Envoi en cours…",
    send: "Envoyer le message",
    cvTitle: "Curriculum Vitae — PDF",
    cvDesc: "Parcours complet, formations et projets",
    download: "Télécharger",
    subjects: [
      "Collaboration / Projet",
      "Offre de stage / Emploi",
      "Mission Freelance",
      "Demande d'information",
      "Soutien technique / Bug",
      "Proposition de partenariat",
      "Review de code",
      "Contribution open-source",
      "Mentorat / Coaching",
      "Invitation à un événement",
      "Autre",
    ],
  },
  footer: { githubAria: "GitHub de {name}", linkedinAria: "LinkedIn de {name}", emailAria: "Envoyer un email à {name}", whatsappAria: "WhatsApp de {name}" },
};

const enStrings: typeof frStrings = {
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    services: "Services",
    skills: "Skills",
    certifications: "Certifications",
    contact: "Contact",
    mainAria: "Main navigation",
    mobileAria: "Mobile navigation",
    menu: "Menu",
    close: "Close",
    navigation: "Navigation",
    role: "Junior Full Stack Developer",
  },
  home: {
    kicker: "Junior Full Stack Developer — Niamey, Niger",
    leadBefore: "I build secure APIs, web and mobile apps — with ",
    leadAfter: " : clean code, delivered on time.",
    ctaProjects: "View my projects",
    ctaContact: "Get in touch",
    ctaCv: "Download my CV",
    featuredTitle: "Featured projects",
    featuredMeta: "A selection — the rest on the projects page",
    featuredAll: "View all projects",
    servicesAll: "All services",
    svcWebTitle: "Website",
    svcWebDesc: "Showcases, landing pages, interactive apps and bilingual sites — responsive, fast, deployed.",
    svcMobileTitle: "Mobile app",
    svcMobileDesc: "Native iOS/Android Flutter apps: e-commerce, management, clones and polished UIs.",
    svcCustomTitle: "Custom software",
    svcCustomDesc: "APIs, CLI tools, desktop and SaaS — from idea to deployment, clean maintainable code.",
    ctaBandTitle: "Got a project in mind?",
    ctaBandDesc: "API, website, mobile app or custom tool — let's talk, free quote.",
    ctaBandBtn: "Start a project",
    certsLink: "View my certifications",
    seoTitle: "Koffi Lévis Akalete — Junior Full Stack Developer | C#, .NET, Blazor | Portfolio",
    seoDesc:
      "Portfolio of Koffi Lévis Akalete, junior full stack developer in Niamey: 20+ projects, 10+ certifications. C#, .NET, Blazor, Flutter — secure REST APIs, web and mobile. 10000 CODEURS Ambassador.",
  },
  projetsPage: {
    lead: "Web, mobile, API, tooling and infrastructure projects — mostly open source, most of them live.",
    seoTitle: "Projects — 20+ builds | Koffi Lévis Akalete",
    seoDesc:
      "20+ open source builds: Blazor WebAssembly, ASP.NET Core, Flutter, Next.js, .NET CLI. Live previews and source code on GitHub.",
  },
  about: {
    heroTitle: "About Koffi Lévis",
    bioLead: "Math & CS student in Niamey, 10000 CODEURS ambassador, learning continuously since 2024.",
    timelineTitle: "Journey",
    timelineMeta: "From the first line of code to Ambassador",
    present: "Today",
    softTitle: "Qualities & soft skills",
    softMeta: "What I bring beyond the code",
    seoTitle: "About — Journey & skills | Koffi Lévis Akalete",
    seoDesc:
      "The journey of Koffi Lévis Akalete: from HTML/CSS in 2024 to C#/.NET, Flutter and 10000 CODEURS Ambassador. Soft skills, certifications and full timeline.",
  },
  servicesPage: {
    lead: "From development to go-live — a clear method, price fixed upfront.",
    methodTitle: "How I work",
    methodMeta: "From first chat to maintenance",
    seoTitle: "Services — Web, mobile & API development | Koffi Lévis Akalete",
    seoDesc:
      "ASP.NET Core APIs, Blazor apps, Flutter apps, Next.js sites, Docker CI/CD, testing and maintenance. Free quote, fast reply.",
    ctaTitle: "Got a specific need?",
    ctaDesc: "Describe your project in a few lines — I'll reply with a clear proposal.",
    ctaBtn: "Request a quote",
  },
  contactPage: {
    heroTitle: "Contact",
    availability: "Available for missions & internships",
    lead: "A question, a project, an opportunity? Write to me — I reply fast.",
    seoTitle: "Contact — Free quote | Koffi Lévis Akalete",
    seoDesc:
      "Contact Koffi Lévis Akalete in Niamey: form, WhatsApp, LinkedIn. Fast reply, free quote for your web, mobile and API projects.",
  },
  theme: { light: "Switch to light mode", dark: "Switch to dark mode" },
  langLabel: "Site language",
  skipLink: "Skip to content",
  scrollToTop: "Back to top",
  bio: {
    available: "Available for work",
    contact: "Contact me",
    downloadCv: "Download résumé",
    portraitAlt: "Portrait of {name}, Junior Full Stack developer based in Niamey",
    figPortrait: "fig. 01 — portrait",
    tagline:
      "Full Stack Junior Developer — {stack}. 10000 CODEURS Ambassador, Math & CS student in Niamey, always learning.",
  },
  projects: {
    filters: {
      all: "All",
      web: "Web & PWA",
      mobile: "Mobile",
      api: "APIs",
      outils: "Tools & CLI",
      desktop: "Desktop & Infra",
    },
    filterAria: "Filter projects by category",
    detail: "detail →",
    openAria: "View details of project {title}",
    live: "View live",
    demo: "Demo",
    source: "Source code",
    tech: "Technologies",
    close: "Close",
    prev: "Previous project",
    next: "Next project",
    previewAlt: "Preview of {title}",
  },
  services: { meta: "What I can do for you" },
  skills: {
    meta: "{n} technologies",
    filterAria: "Filter skills by category",
    all: "All",
    languages: "Languages",
    frameworks: "Frameworks",
    databases: "Databases",
    devops: "DevOps",
    catLabels: { languages: "language", frameworks: "framework", databases: "database", devops: "devops" },
    years: "yr(s)",
    progressAria: "{name} — level {level}%",
  },
  certs: {
    meta: "10+ certifications — verifiable online",
    alt: "Certificate {title} — {issuer}",
    previewUnavailable: "Preview unavailable",
    openCertAria: "Open certificate {title}",
    verify: "Verify certificate",
    viewPdf: "View PDF",
    lightboxTitle: "Certificate",
    lightboxClose: "Close preview",
    prev: "Previous certificate",
    next: "Next certificate",
  },
  contact: {
    form: "Form",
    details: "Contact details",
    socials: "Social links",
    formTitle: "Describe your project",
    formHint: "Fields marked with an asterisk (*) are required.",
    phone: "Phone",
    replyTime: "Fast reply",
    timezone: "Niamey · GMT+1",
    whatsappMsg: "Hi Koffi, I'm reaching out from your portfolio. I'd like to discuss a project.",
    copy: "Copy",
    copied: "Copied",
    nextTitle: "What happens next",
    nextSteps: [
      "I receive and read your message",
      "I reply with a clear proposal",
      "We schedule a call if needed",
    ],
    errName: "Your name is required.",
    errEmail: "Your email is required.",
    errEmailInvalid: "Invalid email format.",
    errMessage: "Your message is required.",
    messageMax: "600 characters max",
    successTitle: "Message sent successfully.",
    successSub: "I will get back to you as soon as possible.",
    errorSub: "Please try again.",
    netError: "Network error. Check your connection and try again.",
    fallbackError: "Something went wrong. Please try again.",
    honeypotLabel: "Do not fill in",
    name: "Name",
    email: "Email",
    whatsapp: "WhatsApp",
    optional: "(optional)",
    subject: "Subject",
    message: "Message",
    chooseSubject: "Choose a subject",
    yourName: "Your name",
    yourEmail: "your@email.com",
    yourWhatsapp: "+227 XX XX XX XX",
    yourMessage: "Describe your project, your need or your question…",
    sending: "Sending…",
    send: "Send message",
    cvTitle: "Résumé — PDF",
    cvDesc: "Full background, training and projects",
    download: "Download",
    subjects: [
      "Collaboration / Project",
      "Internship / Job offer",
      "Freelance mission",
      "Information request",
      "Technical support / Bug",
      "Partnership proposal",
      "Code review",
      "Open-source contribution",
      "Mentoring / Coaching",
      "Event invitation",
      "Other",
    ],
  },
  footer: { githubAria: "{name}'s GitHub", linkedinAria: "{name}'s LinkedIn", emailAria: "Send an email to {name}", whatsappAria: "{name}'s WhatsApp" },
};

export const STRINGS: Record<Lang, typeof frStrings> = { fr: frStrings, en: enStrings };

/** Raccourci : chaînes UI dans la langue courante. */
export function useT(): typeof frStrings {
  const { lang } = useLang();
  return STRINGS[lang];
}

/** Remplace {placeholder} par la valeur donnée. */
export function tpl(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
}
