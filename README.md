# lucrousseau — Frontend

Site Next.js (Pages Router) avec i18n (en/fr), SCSS et Tailwind.

## Prérequis

- **Node.js** 22.x (voir `.nvmrc`)
- Pour les icônes Font Awesome Pro : définir `FONTAWESOME_NPM_TOKEN` ou créer un `.npmrc.local` avec le token (ne pas committer le token).

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

Le script `prebuild` convertit les images dans `public/images` en WebP (via Sharp).

### Audit de sécurité

- **`npm run audit`** — Liste les vulnérabilités connues dans les dépendances.
- **`npm run audit:fix`** — Met à jour les dépendances pour corriger ce qui peut l’être sans changement majeur.
- **`npm run fix:security`** — Lance `audit:fix` puis `lint:fix` (règles ESLint sécurité).
- **ESLint** — Le plugin `eslint-plugin-security` ajoute des règles (eval, buffer, injection, etc.) ; les alertes s’affichent en warning au lint.

### Tests

Quelques tests unitaires (Jest + React Testing Library) couvrent les utilitaires (ex. `commons/alignments`). Commande : `npm run test`.

### Git hooks (Husky)

- **pre-commit** — Lance `lint-staged` : Prettier, ESLint --fix et Stylelint --fix sur les fichiers stagés uniquement.
- **pre-push** — Lance `npm run validate` sur **toute la codebase** : `lint` + `format:check` + `stylelint:check` + `test`. Le push est bloqué si une de ces vérifications échoue.

Après `npm install`, le script `prepare` installe les hooks Husky automatiquement.

## Structure

- `pages/` — Routes Next.js (Pages Router)
- `components/` — Composants réutilisables
- `sections/` — Blocs de page (Header, Footer, Hero, etc.)
- `styles/` — SCSS global (variables, base, layout)
- `public/locales/` — Fichiers de traduction (next-i18next)

## Docker

```bash
docker build --build-arg GITHUB_TOKEN=xxx -t luc-frontend .
docker run -p 3000:3000 luc-frontend
```

Image basée sur Node 22 Alpine.
