---
paths:
  - "**/*.scss"
  - "styles/**/*.scss"
---

# SCSS

- Pas de Tailwind. Tokens et grille : `styles/abstracts/_variables.scss`.
- Nouveau fichier : le créer à côté du composant/section **et** l’ajouter dans `styles/main.scss` (`@use ".../style" as alias`). Sans ça, rien ne s’applique.
- `@use`, pas `@import`.
- Fonctions Sass : casse exacte, `getPrefix` et `findPreviousBreakepoint` (jamais en minuscules). `npm run lint:scss-functions` le vérifie.
- Un BEM simple (`section-about`, `about__cta`) comme le code existant. Pas de nouvelle famille de classes.
- Mouvement : un geste par section, s’il explique ; sinon on coupe.
