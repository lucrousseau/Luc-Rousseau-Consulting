---
paths:
  - "pages/**/*.tsx"
  - "sections/**/*.tsx"
  - "commons/serverSideTranslations.ts"
  - "commons/sectionTypes.ts"
---

# Pages et sections

- Pages Router : `getStaticProps` / `getStaticPaths`, pas de `app/`.
- `serverSideTranslations` depuis `commons/serverSideTranslations` seulement.
- Namespaces passés à `getStaticProps` = ceux documentés en JSDoc de chaque section montée.
- Sous la ligne de flottaison : `next/dynamic` (voir `pages/index.tsx`).
- CTA : `SectionCta` / `Buy` + `getScheduleCta`. Props typées via `commons/sectionTypes.ts`.
- Nouvelle section : dossier `sections/Nom/index.tsx` + `style.scss`, enregistrer le SCSS dans `styles/main.scss`.
