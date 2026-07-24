# Portfolio — Koffi Lévis Akalete

Portfolio professionnel — Ambassadeur 10000 CODEURS, Développeur Backend Junior.

## Technologies

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4
- Express (dev) / Vercel Serverless (prod)
- Nodemailer (envoi d'emails)
- Lucide React (icons)
- Motion (animations)

## Fonctionnalites

- Presentation personnelle avec avatar et bio
- Grille de competences interactive avec filtres
- Liste de 18 projets avec liens GitHub et liens live
- Formulaire de contact avec envoi d'email
- Telechargement du CV (PDF)
- Certificat Foundational C# Microsoft (freeCodeCamp)
- Contact direct via WhatsApp
- Menu drawer mobile plein ecran
- Design responsive avec coins carres
- Dark theme terminal

## Developpement

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
```

### Deploiement Vercel

1. Pousser le depot sur GitHub
2. Connecter le projet sur Vercel
3. Ajouter les variables d'environnement :
   - `GMAIL_USER` = koffilevis21@gmail.com
   - `GMAIL_APP_PASSWORD` = mot de passe d'application Gmail
4. Deployer

## Architecture

```
src/
  components/     # Composants React (Header, BioSection, SkillsSection, etc.)
  context/        # PortfolioContext (donnees statiques + envoi message)
  data.ts         # Donnees du portfolio (editer ici pour mettre a jour)
  types.ts        # Interfaces TypeScript
  index.css       # Styles Tailwind + theme sombre
api/
  messages.ts     # Fonction serverless Vercel pour l'envoi d'emails
public/
  cv_koffi_levis_akalete.pdf
  images/
```

Les donnees du portfolio sont dans `src/data.ts`. Pour mettre a jour les competences ou projets, editer ce fichier.
