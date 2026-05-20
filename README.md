# lucrousseau (frontend)

Site Next.js (Pages Router) avec i18n (en/fr), SCSS et Tailwind.

## Prérequis

- **Node.js** 22.x (voir `.nvmrc`)

## Installation

```bash
nvm use   # ou node 22
npm install
```

## Scripts

| Commande               | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `npm run dev`          | Serveur de dev (port 3000)                                    |
| `npm run build`        | Build de production                                           |
| `npm run start`        | Démarrer le build en prod                                     |
| `npm run lint`         | Lint ESLint + règles sécurité                                 |
| `npm run lint:fix`     | Lint avec correctifs automatiques                             |
| `npm run format`       | Prettier (formatage)                                          |
| `npm run stylelint`    | Lint SCSS avec correctifs                                     |
| `npm run fix`          | format + lint:fix + stylelint                                 |
| `npm run audit`        | Audit des vulnérabilités (dépendances)                        |
| `npm run audit:fix`    | Correction auto des vulnérabilités                            |
| `npm run fix:security` | audit:fix + lint:fix                                          |
| `npm run analyze`      | Build + analyse du bundle                                     |
| `npm run test`         | Tests unitaires (Jest)                                        |
| `npm run test:watch`   | Tests en mode watch                                           |
| `npm run validate`     | Lint + format:check + stylelint:check + test (tout le projet) |

Les images sont servies au format d’origine (JPEG/PNG) ; Next.js et Vercel (`/_next/image`) gèrent WebP/AVIF à la volée.

### Audit de sécurité

- **`npm run audit`** : liste les vulnérabilités connues dans les dépendances.
- **`npm run audit:fix`** : met à jour les dépendances pour corriger ce qui peut l’être sans changement majeur.
- **`npm run fix:security`** : lance `audit:fix` puis `lint:fix` (règles ESLint sécurité).
- **ESLint** : le plugin `eslint-plugin-security` ajoute des règles (eval, buffer, injection, etc.) ; les alertes s’affichent en warning au lint.
- **Contenu HTML** : les textes rendus via `html-react-parser` viennent uniquement des locales (`public/locales/`) ; voir `docs/SECURITY.md` pour la règle et les précautions si l’origine du contenu change.

### Tests

Quelques tests unitaires (Jest + React Testing Library) couvrent les utilitaires (ex. `commons/alignments`). Commande : `npm run test`.

### Git hooks (Husky)

- **pre-commit** : lance `lint-staged` (Prettier, ESLint --fix et Stylelint --fix sur les fichiers stagés uniquement).
- **pre-push** : lance `npm run validate` sur **toute la codebase** (`lint` + `format:check` + `stylelint:check` + `test`). Le push est bloqué si une de ces vérifications échoue.

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

## Docker

```bash
docker build --build-arg GITHUB_TOKEN=xxx -t luc-frontend .
docker run -p 3000:3000 luc-frontend
```

Image basée sur Node 22 Alpine.
