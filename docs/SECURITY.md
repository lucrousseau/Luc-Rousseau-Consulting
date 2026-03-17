# Sécurité

## Contenu HTML et XSS

Les textes passés à `html-react-parser` (sections, blocs de contenu) proviennent **uniquement** des fichiers de traduction sous `public/locales/` (EN/FR). Ces fichiers sont édités par l’équipe, pas par les visiteurs.

- **Règle :** Ne pas brancher de source non fiable (CMS public, saisie utilisateur, API tierce) sur le contenu rendu via `parse()` sans ajouter une couche de **sanitization** (ex. [DOMPurify](https://github.com/cure53/DOMPurify)) ou une whitelist stricte de balises autorisées.
- Si l’origine des textes change (contenu dynamique, user-generated), introduire la sanitization avant d’utiliser `html-react-parser`.

## Headers HTTP

Les headers de sécurité (X-Frame-Options, X-Content-Type-Options, Referrer-Policy) sont configurés dans `next.config.mjs`. Voir `docs/AUDIT_PERFORMANCE_SECURITE.md` pour les recommandations (CSP optionnel).

## Dépendances

- Exécuter `npm audit` et `npm audit fix` après les mises à jour de dépendances.
- Le plugin ESLint `eslint-plugin-security` signale les patterns à risque (eval, injection, etc.) au lint.
