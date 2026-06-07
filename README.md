# Portfolio - Koffi Levis Akalete

Portfolio professionnel pour développeur backend. Site statique avec formulaire de contact et envoi d'emails.

## Technologies

- React 19 + TypeScript
- Vite 6
- Tailwind CSS v4
- Express (dev) / Vercel Serverless (prod)
- Nodemailer (envoi d'emails)
- Lucide React (icons)
- Motion (animations)

## Fonctionnalites

- Presentation personnelle
- Grille de competences interactive
- Liste de projets avec liens GitHub
- Formulaire de contact avec envoi d'email
- Telechargement du CV (PDF)
- Contact direct via WhatsApp
- CV consultable et imprimable

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
  contact.ts      # Fonction serverless Vercel pour l'envoi d'emails
public/
  cv-koffi-levis.pdf
  images/
```

Les donnees du portfolio sont dans `src/data.ts`. Pour mettre a jour les competences ou projets, editer ce fichier.
