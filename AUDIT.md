# Audit du projet — lucrousseau frontend

Rapport d’audit et actions effectuées pour mettre le projet en ordre.

---

## 1. Sécurité

### 1.1 Token Font Awesome (corrigé)

- **Problème** : Le token Font Awesome Pro était en clair dans `.npmrc`.
- **Action** :
  - Remplacement par la variable d’environnement `FONTAWESOME_NPM_TOKEN`.
  - Ajout de `.npmrc.local` dans `.gitignore` pour les overrides locaux avec token.
- **À faire côté équipe** :
  - Définir `FONTAWESOME_NPM_TOKEN` en CI (Vercel, GitHub Actions, etc.).
  - En local : `export FONTAWESOME_NPM_TOKEN=...` ou fichier `.npmrc.local` (non versionné) avec `//npm.fontawesome.com/:_authToken=TOKEN`.

---

## 2. Configuration et cohérence

### 2.1 Node.js (corrigé)

- **Problème** : Docker utilisait Node 18 alors que `package.json` (engines) et `.nvmrc` indiquaient Node 22.
- **Action** : Dockerfile mis à jour pour utiliser `node:22-alpine`.

### 2.2 Dépendances (corrigé)

- **Problème** : `@babel/preset-env`, `@babel/preset-react` et `@next/bundle-analyzer` étaient en `dependencies` alors qu’ils ne servent qu’au build / dev.
- **Action** : Déplacés dans `devDependencies`.

### 2.3 Tailwind (corrigé)

- **Problème** : Le dossier `sections/` n’était pas dans `content` de `tailwind.config.ts`, donc les classes Tailwind utilisées dans les sections n’étaient pas purgées correctement.
- **Action** : Ajout de `./sections/**/*.{js,ts,jsx,tsx,mdx}` dans `content`.

---

## 3. Nettoyage du code

### 3.1 Dossier `app/` (corrigé)

- **Problème** : Présence du boilerplate create-next-app (`app/layout.tsx`, `app/_page.tsx`, `app/globals.css`) alors que l’application réelle utilise uniquement le **Pages Router** (`pages/`). Risque de métadonnées par défaut (“Create Next App”) et de confusion.
- **Action** : Suppression de `app/_page.tsx`, `app/layout.tsx` et `app/globals.css`. Référence à `app/` retirée de `tailwind.config.ts`.

### 3.2 Dossier `bk/` (ignoré)

- **Constat** : `bk/` contient des pages de backup (`cto.js`, `booking.js`).
- **Action** : Ajout de `/bk` dans `.gitignore` pour ne pas les versionner. Si ces fichiers ne sont plus utiles, vous pouvez supprimer le dossier `bk/` du dépôt après coup.

---

## 4. Fichiers et ignore

### 4.1 `.gitignore` (corrigé)

- Ajout de `.npmrc.local` (secrets locaux).
- Ajout de `/bk` (backups).
- **Note** : `next-env.d.ts` a été retiré du `.gitignore` pour permettre de committer le fichier généré par Next et d’avoir un typage cohérent. Si vous préférez ne pas le versionner, vous pouvez le remettre dans `.gitignore`.

---

## 5. Documentation

### 5.1 README (corrigé)

- Remplacement du README générique create-next-app par une description propre au projet : prérequis (Node 22, token Font Awesome), scripts, structure des dossiers, commandes Docker.

---

## 6. Recommandations non appliquées (optionnel)

- **ESLint** : Envisager des règles plus strictes (ex. `@next/eslint-plugin-next` déjà présent, éventuellement règles TypeScript/React supplémentaires).
- **TypeScript** : Le projet est surtout en JS (`pages/`, `components/`, `sections/`). Une migration progressive vers TS peut se faire fichier par fichier.
- **Double i18n** : Présence de `react-intl` et `next-i18next`. Si un seul est utilisé, retirer l’autre pour simplifier.
- **Font Awesome** : Beaucoup de paquets Font Awesome (free + pro). Vérifier que tous sont utilisés pour alléger le bundle.
- **`prebuild` (convert-images)** : Gestion du cas où `public/images` est absent (sortie propre en ENOENT) pour éviter des erreurs en CI.

---

## 7. Résumé des fichiers modifiés

| Fichier / zone              | Modification                                       |
| --------------------------- | -------------------------------------------------- |
| `.npmrc`                    | Token remplacé par `FONTAWESOME_NPM_TOKEN`         |
| `.gitignore`                | `.npmrc.local`, `/bk` ; retrait de `next-env.d.ts` |
| `Dockerfile`                | Node 22 Alpine                                     |
| `package.json`              | Babel + bundle-analyzer en devDependencies         |
| `tailwind.config.ts`        | `content` inclut `sections/` ; retrait de `app/`   |
| `app/`                      | Suppression layout, \_page, globals.css            |
| `scripts/convert-images.js` | Gestion ENOENT si `public/images` absent           |
| `README.md`                 | Rédaction projet-specific                          |
| `AUDIT.md`                  | Création de ce rapport                             |

Si vous voulez, on peut enchaîner sur une de ces recommandations (ESLint, TS, i18n ou Font Awesome) et l’appliquer pas à pas.
