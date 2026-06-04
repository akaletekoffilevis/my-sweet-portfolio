# 🚀 Portfolio d'Ingénierie de Haute Performance & Console d'Administration Dynamique

Bienvenue dans ce template de portfolio professionnel conçu spécifiquement pour les développeurs **Backend, DevOps, et Architectes Systèmes**. Alliant un design de console réseau brut et élégant avec des fonctionnalités d'édition en temps réel, ce portfolio démontre une excellence technique tant sur le plan fonctionnel qu'esthétique.

---

## 🎨 Caractéristiques Clés du Projet

### 1. Design & Expérience Utilisateur Haute Densité (Aesthetic Console)
* **Thème Nuit Profonde (Cosmic Slate)** : Fond sombre épuré, typographie technique soignée avec les fontes *Inter* et *JetBrains Mono*, et bordures fines pour accentuer l'aspect professionnel et la lisibilité du code.
* **Système Réactif Fluide** : Entièrement responsive avec transition douce entre les thèmes clair et sombre, et animations fluides à l'ouverture des sections.

### 2. Base de Données & Persistence Locale de l'Éditeur
* **Moteur Local DB** : Les sections majeures (Profil, Expériences, Compétences Techniques, Projets) s'appuient sur un state synchronisé bidirectionnel avec le `localStorage` de votre navigateur. Tout ajout, modification ou suppression persiste sans latence ni besoin de configuration complexe de serveurs distants.
* **Console d'Administration** : Accessible via le bouton d'administration en pied de page. Elle permet :
  * La mise à jour en direct de l'identité, de l'avatar et du résumé biographique.
  * L'administration totale de la matrice de compétences (Langages, Frameworks, Bases de Données, DevOps).
  * L'ajout et l'édition dynamique de fiches de projets avec spécification de métriques de performance de production.
  * La lecture des messages entrants soumis par les formulaires de contact.

### 3. Solution d'Impression Certifiée A4 (Single-Page CV)
* **Single-Page Printer Engine** : Un bouton d'action dédié **"VOIR MON CV"** ou **"Télécharger CV en PDF"** ouvre un modal de prévisualisation interactif complet de votre curriculum vitae.
* **Mise en page CSS `@media print` hermétique** : Lors de l'envoi vers l'imprimante ou l'export PDF via le navigateur (`CTRL+P` ou bouton "IMPRIMER") :
  * Le site web complet, la barre de navigation, les boutons d'action et les overlays de modal complexes sont temporairement masqués de l'arbre DOM.
  * Seule la structure sémantique du CV est extraite et mise en valeur sur un fond blanc rétro, ajusté avec rigueur aux dimensions exactes d'une feuille A4 portrait (210mm x 297mm).
  * La structure du CV est garantie sans dépassement ni coupure intempestive de page, restant sur une **page unique professionnelle**.

### 4. Ressources de Liens & Déploiements Fiables
* **Boutons d'Action Fonctionnels** : Remplacement des liens d'architecture vides génériques par deux boutons robustes et interactifs :
  1. **VOIR SUR GITHUB** : Lien direct menant vers le dépôt Git audité du projet.
  2. **DÉMO EN LIGNE** : Accès direct à l'environnement interactif hébergé (facultatif, configuré lors de la création d'un projet de type frontend/fullstack).

---

## 🛠️ Structure de l'Architecture Technique

L'arbre des répertoires respecte les orientations de modularité et de typage strict de TypeScript :
* `/src/types.ts` : Déclaration des interfaces et modèles de données (`Project`, `Skill`, `ProfileData`, etc.).
* `/src/data.ts` : Payload JSON de secours réinjecté lors d'une réinitialisation d'usine totale.
* `/src/context/PortfolioContext.tsx` : Moteur de persistance local gérant les flux de données et la synchronisation réactive.
* `/src/components/PrintableCv.tsx` : Composant exclusif pour le rendu sémantique propre du CV professionnel.
* `/src/index.css` : Configuration globale de Tailwind CSS et feuille de configuration isolée `@media print`.

---

## 💻 Instructions de Développement Local

Pour démarrer votre serveur de développement local et valider vos changements :

```bash
# Instauration des dépendances
npm install

# Lancement du serveur d'aperçu dynamique
npm run dev

# Exécution du validateur de typage et linter strict
npm run lint

# Compilation pour la production
npm run build
```

Pour réinitialiser toutes les données de simulation aux valeurs d'usine par défaut, cliquez simplement sur le bouton **"Réinitialiser le Portfolio"** dans la console d'administration.
