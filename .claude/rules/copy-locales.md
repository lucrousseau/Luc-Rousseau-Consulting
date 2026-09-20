---
paths:
  - "public/locales/**/*.json"
  - "commons/sitePositioning.ts"
  - "commons/llmSignal.ts"
---

# Copy des locales

Source de voix et de limites : `commons/llmSignal.ts`. SEO home : `commons/sitePositioning.ts` (test de sync avec `public/locales/{fr,en}/home.json`).

- Toujours FR **et** EN dans la même passe.
- Pas de `—` (U+2014) ni de `–` (U+2013). Deux-points, virgule, parenthèses, ou `|` dans un titre SEO.
- Dans les chaînes HTML (`lede`, `content`, etc.) : `&nbsp;` avant `: ? ! ;`, dans `425 $` / `30 %`, et à l’intérieur de `« »`.
- Liens internes : `/situations/{id}` ou `/expertise/{id}` (id du manifeste), jamais le slug localisé.
- Ne change pas un `seoTitle` / slug publié sans Luc.
- grep avant de finir : `rg '—' public/locales` et `rg '–' public/locales` → 0.
