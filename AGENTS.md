# lucrousseau.com (Luc Rousseau Consulting)

Site marketing de Luc Rousseau, Product Builder / consultant externe solo (Québec).
Français par défaut, anglais en `/en`. Pas une agence, pas un shop WordPress, pas ellr, pas lucrousseau.ca.

## Lire, ne pas recopier

Ces fichiers font foi. Si un agent file et eux se contredisent, c’est eux qui ont raison.

| Sujet                                | Source                                               |
| ------------------------------------ | ---------------------------------------------------- |
| Identité, limites d’offre, index LLM | `commons/llmSignal.ts`, `commons/sitePositioning.ts` |
| Stack, scripts, dossiers             | `README.md`                                          |
| CTA DRY, copy                        | `CONTRIBUTING.md`                                    |
| CSP, HTML, API                       | `docs/SECURITY.md`                                   |

Ne reconstruis pas le positionnement à partir du site « comme tu le vois ». Ne publie pas de grille tarifaire. Ne décris pas Luc comme une agence, un pigiste à la journée, ou de la maintenance WordPress.

## Périmètre

- Ce dépôt : Next.js **Pages Router** → [lucrousseau.com](https://lucrousseau.com).
- **lucrousseau.ca** est le site photographe (WordPress). Les redirects `/zines` vers `.ca` sont voulus.
- Ne migre pas vers App Router. N’ajoute pas Tailwind. Le style est SCSS modulaire.

## Commandes

Node 22 (`.nvmrc`). Avant de déclarer un travail fini : `npm run validate`.

```bash
nvm use
npm run dev          # :3000
npm run typecheck
npm test
npm run validate     # lint + format + stylelint + scss-functions + typecheck + test
```

Pas de GitHub Actions. Le filet qualité est Husky (`pre-commit` lint-staged, `pre-push` = `validate`). Une PR ouvre une preview Vercel.

## Architecture (pièges)

- **Pages Router** : `pages/`, `getStaticProps` / `getStaticPaths`, ISR `revalidate: 86400`.
- i18n : `useTranslation` depuis `next-i18next/pages`. `serverSideTranslations` **uniquement** via `commons/serverSideTranslations` (pas l’import next-i18next direct : ça casse le bundle Vercel).
- Locale par défaut `fr`, `localeDetection: false`. Slugs FR/EN distincts.
- Texte métier dans `public/locales/{fr,en}/`. Composants génériques ; sections = composition + i18n. Documente les namespaces requis en JSDoc de section.
- Liens internes dans le JSON : `/situations/{id}` ou `/expertise/{id}` (id canonique, pas le slug localisé). Résolus au render par `commons/siteRoutes.ts`.
- HTML des locales : `parseHtmlContent` seulement. Pas de HTML CMS non sanitisé.
- CTA calendrier : `components/SectionCta` ou `components/Buy`. Pas de `Button` + `ContactAlternates` collés.
- Props de sections : `commons/sectionTypes.ts`.
- `proxy.ts` (Next 16, ex-middleware) : canonicalisation des slugs de situations + négociation `Accept: text/markdown`.
- Paires de slugs edge : `commons/situationSlugRoutes.mjs` **en plus** de `commons/situationsManifest.ts` (test de sync).
- SCSS colocated (`style.scss` dans le dossier) **et** déclaré dans `styles/main.scss` (Next n’accepte le CSS global que depuis `_app`).
- Images : `components/Picture` (`next/image`). Ne recadre pas les photos de Luc.
- Pages CV (`/cvs`) : noindex, analytics désactivés. Calculateur `/cout-reel-jour` : noindex, partage privé.
- API : GET/HEAD seulement (`utils/apiRequireGet.ts`), origine allowlistée (`utils/siteOrigin.ts`).

## TypeScript / tests

- Code applicatif en `.ts` / `.tsx`, `tsc` strict (`npm run typecheck`).
- Tests Jest + Testing Library : colocated `*.test.ts(x)`, API sous `__tests__/`.
- Prettier : 2 espaces, double quotes, `printWidth` 100, `semi` true. Ne réécris pas le style à la main.

## Git

- Branche depuis `main`, PR (template `.github/pull_request_template.md`).
- Luc peut pousser sur `main`. Un agent, jamais : pas de push, merge, deploy, force-push, ni `--no-verify`, sauf demande explicite.
- Ne commite que si Luc le demande. Jamais de secret (`.env*`, `.npmrc.local`).
- Ne change pas un slug ou une URL déjà publiée sans lui demander (SEO + `hreflang`).

## Copy

- Les deux langues dans la même passe (`public/locales/fr` et `en`).
- Pas de tiret cadratin (`—`, U+2014) ni demi-cadratin (`–`) dans le copy visible. Détail : `.cursor/rules/copywriting-no-em-dash.mdc`.
- Voix : directe, concrète, québécoise. Ponctuation haute et montants : espace insécable `&nbsp;` dans les chaînes HTML des locales.
- Ne refonds pas le contenu « pour le SEO » : le canal faible de ce business n’est pas le site.

## UI

- Réutilise `Container`, `Row`, `SectionIntro`, tokens dans `styles/abstracts/_variables.scss`.
- Sobriété : typo et blanc portent la page, pas la décoration. Un geste de mouvement par section, s’il explique quelque chose.
- Pas de refonte visuelle globale. Un défaut mesuré se corrige ; le reste attend qu’on y touche pour une autre raison.
- Changement d’UI : vérifier en navigateur, FR et EN, et mobile si le layout bouge. En-têtes / meta / CSP : `curl`, pas un fetch d’agent.

## Vérif avant de conclure

1. `npm run validate`
2. `rg '—' public/locales` → 0
3. Parcours réel de la page touchée (`npm run dev`), pas seulement un screenshot
