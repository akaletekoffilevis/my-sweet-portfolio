# Portfolio — Koffi Lévis Akalete

Portfolio professionnel — Ambassadeur 10000 CODEURS, Développeur Full Stack Junior.

Site **bilingue FR / EN** : détection automatique de la langue du navigateur (toute langue autre que `fr` → anglais), sélecteur FR/EN dans l'en-tête, persistance dans `localStorage` et mise à jour dynamique de `<html lang>` + du SEO (title/description).

## 5 pages + effets 3D

| Route | Contenu |
|---|---|
| `/` | Hero « constellation de code » 3D interactive, nom qui se décode, compteurs animés (20+ projets, 10+ certifs), projets vedettes, marquee tech, teaser services |
| `/projets` | 23 projets avec filtres par catégorie, aperçus live, modale avec navigation ←/→ |
| `/a-propos` | Bio + formes filaires 3D flottantes, timeline du parcours (GSAP ScrollTrigger), soft skills, compétences, certifications |
| `/services` | 17 services en tilt 3D + méthode de travail en 6 étapes |
| `/contact` | Formulaire d'email + CV + réseaux, fond de particules 3D |

## Technologies

- React 19 + TypeScript
- Vite 6 + Tailwind CSS v4
- react-router-dom (routing SPA)
- Three.js / @react-three/fiber / @react-three/drei (scènes 3D, lazy-loaded)
- GSAP + ScrollTrigger (timeline)
- Motion (transitions de pages, révélations)
- Express (dev) / Vercel Serverless (prod)
- Nodemailer (envoi d'emails)
- Lucide React (icons)

## Effets & animations

- Boot loader terminal (1× par session, barre de progression)
- Scène 3D « constellation de code » qui suit le curseur (accueil)
- Formes filaires 3D flottantes (à propos), champ de particules (projets/services/contact)
- Tilt 3D + halo lumineux sur toutes les cartes (projets, services, soft skills, certifications, CV, réseaux)
- Titre qui se décode (effet scramble), compteurs animés au scroll
- Transitions de pages, révélations GSAP/motion, marquee tech
- Boutons magnétiques, curseur personnalisé mix-blend
- Lightbox certificats (image ou PDF intégré, navigation ←/→)
- Garde-fous `prefers-reduced-motion` partout

## Fonctionnalites

- Presentation personnelle avec avatar et bio
- Timeline du parcours + soft skills (travail d'équipe, autodidacte, communication…)
- Grille de competences interactive avec filtres
- Liste de 23 projets avec liens GitHub et liens live
- Formulaire de contact avec envoi d'email (template e-mail épuré)
- Telechargement du CV (PDF)
- 13 certifications (Microsoft/freeCodeCamp, NextFlutter x5, 10000 CODEURS, AGRHYMET/CILSS, FlutterHackathon 26…)
- Bilinguisme FR/EN (detection navigateur + selecteur)
- Menu drawer mobile plein ecran, design responsive, coins carres, dark theme terminal

## Developpement

```bash
npm install
npm run dev   # http://localhost:3000
```

## Production

```bash
npm run build
```

### Deploiement Vercel

1. Pousser le depot sur GitHub
2. Connecter le projet sur Vercel (`vercel.json` gère le fallback SPA)
3. Ajouter les variables d'environnement :
   - `GMAIL_USER` = koffilevis21@gmail.com
   - `GMAIL_APP_PASSWORD` = mot de passe d'application Gmail
4. Deployer

## Architecture

```
src/
  pages/          # Accueil, Projets, À propos, Services, Contact, 404
  components/     # Header, Footer, sections, effets (BootLoader, Marquee…)
  three/          # Scènes 3D (Constellation, ParticleField, WireframeCluster)
  hooks/          # useTheme, useOpticalAlign, useTilt, usePageSEO
  context/        # PortfolioContext (donnees statiques + envoi message)
  data.ts         # Donnees du portfolio en francais (editer ici pour mettre a jour)
  data.en.ts      # Miroir anglais des donnees
  i18n.tsx        # LanguageProvider + chaines de traduction (FR/EN)
  types.ts        # Interfaces TypeScript
  index.css       # Styles Tailwind + theme sombre
api/
  messages.ts     # Fonction serverless Vercel pour l'envoi d'emails
public/
  cv_koffi_levis_akalete.pdf
  images/
```

Les donnees du portfolio sont dans `src/data.ts` (francais) et `src/data.en.ts` (anglais). Pour mettre a jour les competences ou projets, editer ces deux fichiers ; les textes d'interface (nav, formulaires, sections) vivent dans `src/i18n.tsx`.
