---
paths:
  - "commons/situationsManifest.ts"
  - "commons/expertiseManifest.ts"
  - "commons/situationSlugRoutes.mjs"
  - "commons/situationSeoMeta.ts"
  - "commons/situationsQuiz.ts"
  - "commons/llmSignal.ts"
  - "pages/situations/**"
  - "pages/expertise/**"
  - "public/locales/**/situation-*.json"
  - "public/locales/**/expertise-*.json"
---

# Situations et pages expertise

Patron existant : `pages/situations/[slug].tsx` + `commons/slugPageStaticProps.ts`. Ne recrée pas un `getStaticProps` ad hoc.

## Nouvelle situation

1. Entrée dans `commons/situationsManifest.ts` (`id`, `slugFr`, `slugEn`, `namespace`, `publishedAt`).
2. **Même paire** dans `commons/situationSlugRoutes.mjs` (edge + redirects). Le test `situationSlugRoutes.test.ts` exige l’égalité.
3. Locales FR et EN : `public/locales/{fr,en}/situation-{id}.json` (même forme qu’une fiche voisine : hero, quote, blocks, SEO).
4. Imports statiques allowlistés dans `commons/situationSeoMeta.ts` (pas de chemin dynamique).
5. Branche du quiz si ça doit matcher : `commons/situationsQuiz.ts` + clés dans `situations-index`.
6. Maillage : liens en `/situations/{id}` dans le JSON.

## Nouvelle page expertise (SEO, hors quiz)

Même logique via `commons/expertiseManifest.ts`. Ces pages sont dans le sitemap, **pas** dans le hub Situations ni le quiz. Ne les vends pas comme l’offre principale.

Ne renomme pas un slug déjà en ligne sans Luc (canonical + hreflang + `proxy.ts`).
