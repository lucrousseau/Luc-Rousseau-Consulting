# lucrousseau (frontend)

Site Next.js 16 (Pages Router) avec i18n (en/fr) et architecture SCSS modulaire.

## Stack (juillet 2026)

| Outil             | Version                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| Next.js           | 16.2.x                                                                                                       |
| React             | 19.2.x                                                                                                       |
| Langage           | JavaScript (ESM) annoté JSDoc                                                                                |
| Typage            | `tsc --checkJs` sur tout le code source (`commons/`, `utils/`, `lib/`, `components/`, `sections/`, `pages/`) |
| ESLint            | 9.x (flat config) + `eslint-plugin-security`                                                                 |
| html-react-parser | 6.x                                                                                                          |
| Styles            | SCSS modulaire (pas de Tailwind)                                                                             |
| Tests             | Jest 30 + Testing Library                                                                                    |

> Le code est écrit en JavaScript moderne annoté avec JSDoc (props de sections
> documentées dans `commons/sectionTypes.js`). **L'intégralité du code source**
> (`commons/`, `utils/`, `lib/`, `components/`, `sections/`, `pages/`) est
> **typée et vérifiée** avec TypeScript en mode `checkJs` via `npm run typecheck`
> (config `tsconfig.typecheck.json`), intégré à `npm run validate` et au hook
> pre-push. Les pages Next.js typent leur `getStaticProps`/`getStaticPaths` et
> leurs props ; les routes API typent `req`/`res` (`NextApiRequest`/`NextApiResponse`).

## Points forts d'ingénierie

- **SEO complet** : JSON-LD (`Person`, `ProfessionalService`, `WebSite`, plus un schéma par page), balises `canonical` et `hreflang` (fr / en / x-default), `sitemap.xml` dynamique avec `lastmod` et ciblage géo, `robots.txt`, `llms.txt` / `llms-full.txt` / `humans.txt`.
- **Sécurité** : CSP complète (distincte dev/prod), `X-Frame-Options`, `Permissions-Policy`, `Referrer-Policy`, `nosniff` (`lib/securityHeaders.mjs`) ; liens externes durcis (`rel="noopener noreferrer"`) ; allowlist d'hôtes sur les routes API. Détails dans [`docs/SECURITY.md`](docs/SECURITY.md).
- **i18n** : slugs localisés par page, manifeste centralisé (`commons/situationsManifest.js`), canonicalisation des URLs via `proxy.js` (redirections 308).
- **Performance** : rendu statique + ISR (`getStaticProps` + `revalidate`), `next/image` (AVIF/WebP), préchargement des polices, analytics chargés en dynamique (`ssr: false`).
- **Qualité** : lint propre, types vérifiés (`npm run typecheck`), suite Jest verte (voir `npm run test`), hooks Husky pre-commit / pre-push, build de production vert.

## Prérequis

- **Node.js** 22.x (voir `.nvmrc`)

## Installation

```bash
nvm use   # ou node 22
npm install
```

## Scripts

| Commande               | Description                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`          | Serveur de dev (port 3000)                                                                                                            |
| `npm run build`        | Build de production (précédé de `typecheck` : un build échoue sur toute erreur de type)                                               |
| `npm run start`        | Démarrer le build en prod                                                                                                             |
| `npm run lint`         | Lint ESLint + règles sécurité                                                                                                         |
| `npm run lint:fix`     | Lint avec correctifs automatiques                                                                                                     |
| `npm run format`       | Prettier (formatage)                                                                                                                  |
| `npm run stylelint`    | Lint SCSS avec correctifs                                                                                                             |
| `npm run typecheck`    | Vérification des types (`tsc --checkJs`) sur tout le code source (`commons/`, `utils/`, `lib/`, `components/`, `sections/`, `pages/`) |
| `npm run fix`          | format + lint:fix + stylelint                                                                                                         |
| `npm run audit`        | Audit des vulnérabilités (dépendances)                                                                                                |
| `npm run audit:fix`    | Correction auto des vulnérabilités                                                                                                    |
| `npm run fix:security` | audit:fix + lint:fix                                                                                                                  |
| `npm run analyze`      | Build + analyse du bundle                                                                                                             |
| `npm run test`         | Tests unitaires (Jest)                                                                                                                |
| `npm run test:watch`   | Tests en mode watch                                                                                                                   |
| `npm run validate`     | Lint + format:check + stylelint:check + typecheck + test                                                                              |

Les images sont servies au format d’origine (JPEG/PNG) ; Next.js et Vercel (`/_next/image`) gèrent WebP/AVIF à la volée.

### Audit de sécurité

- **`npm run audit`** : liste les vulnérabilités connues dans les dépendances.
- **`npm run audit:fix`** : met à jour les dépendances pour corriger ce qui peut l’être sans changement majeur.
- **`npm run fix:security`** : lance `audit:fix` puis `lint:fix` (règles ESLint sécurité).
- **ESLint** : le plugin `eslint-plugin-security` ajoute des règles (eval, buffer, injection, etc.) ; les alertes s’affichent en warning au lint.
- **Contenu HTML** : les textes rendus via `html-react-parser` viennent uniquement des locales (`public/locales/`) ; voir `docs/SECURITY.md` pour la règle et les précautions si l’origine du contenu change.

### Tests

Suite Jest + React Testing Library (91 tests, 21 suites) : logique partagée (`commons/`, ex. `alignments`, `situationsManifest`, routage i18n, données structurées), composants (`SectionIntro`, `ProductGrid`…) et route `sitemap`. Commande : `npm run test`.

### Git hooks (Husky)

- **pre-commit** : lance `lint-staged` (Prettier, ESLint --fix et Stylelint --fix sur les fichiers stagés uniquement).
- **pre-push** : lance `npm run validate` sur **toute la codebase** (`lint` + `format:check` + `stylelint:check` + `typecheck` + `test`). Le push est bloqué si une de ces vérifications échoue.

Après `npm install`, le script `prepare` installe les hooks Husky automatiquement.

## Structure

- `pages/` : routes Next.js (Pages Router)
- `components/` : UI réutilisable (Button, layout, Accordion, etc.) ; pas de texte métier ni clés i18n propres à une page
- `sections/` : blocs de page (Header, Hero, Engagement…) ; composition + `useTranslation` pour le contenu
- `commons/` : helpers partagés sans UI (`alignments`, `pageRowSpacing`, `scheduleCta`)
- `styles/` : SCSS global (variables, base, layout)
- `public/locales/` : fichiers de traduction (next-i18next)

Conventions contributeur : [`CONTRIBUTING.md`](CONTRIBUTING.md).

### Réutiliser une section sur une autre page

Les sections acceptent des props documentées dans `commons/sectionTypes.js` (JSDoc). Exemple : [`pages/services.js`](pages/services.js) affiche `About` avec seulement les namespaces `about` et `common` :

```js
import About from "../sections/About";

export default function ServicesPage() {
  return <About />;
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["about", "common"])),
  },
});
```

## Déploiement

Hébergement sur Vercel (build `next build`, rendu statique + ISR). Les redirections `www` vers l'apex sont gérées dans `vercel.json`.
