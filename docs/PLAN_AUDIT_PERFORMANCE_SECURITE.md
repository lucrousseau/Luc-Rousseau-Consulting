# Plan d’action — Audit performance et sécurité

Plan pour traiter toutes les priorités de l’audit (`docs/AUDIT_PERFORMANCE_SECURITE.md`).  
Ordre recommandé : sécurité d’abord, puis performance, puis documentation.

---

## Priorité 1 — Sécurité (à faire en premier)

### 1.1 Headers HTTP de sécurité

**Objectif :** Ajouter des headers de sécurité dans Next.js (X-Frame-Options, X-Content-Type-Options, Referrer-Policy).

**Fichier :** `next.config.mjs`

**Actions :**

1. Ajouter une fonction `headers()` (async) dans `nextConfig`, qui retourne un tableau de règles.
2. Pour toutes les routes (`source: "/(.*)"`), ajouter les headers suivants :
   - `X-Frame-Options: DENY` (ou `SAMEORIGIN` si tu as besoin d’iframe internes)
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`

**Exemple de structure :**

```js
async headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ];
}
```

**Vérification :** Après déploiement, contrôler les headers (Onglet Network > en-têtes de réponse, ou outil type securityheaders.com).

---

### 1.2 npm audit (déjà fait)

- **Statut :** `npm audit fix` a déjà été exécuté → 0 vulnérabilité.
- **À faire régulièrement :** Après chaque mise à jour de dépendances, lancer `npm audit` et `npm audit fix` si besoin, puis `npm run validate`.

---

## Priorité 2 — Performance (dépendances et build)

### 2.1 Mise à jour de Browserslist

**Objectif :** Avoir des données de compatibilité navigateurs à jour (et éviter le warning au build).

**Commande :**

```bash
npx update-browserslist-db@latest
```

**Vérification :** `npm run build` ne doit plus afficher le warning sur caniuse-lite.

---

### 2.2 Retirer react-intl (inutilisé)

**Objectif :** Supprimer une dépendance jamais importée (i18n = next-i18next uniquement).

**Actions :**

1. Dans `package.json`, supprimer la ligne `"react-intl": "^6.6.8"` dans `dependencies`.
2. Lancer `npm install` pour mettre à jour le lockfile.
3. Lancer `npm run validate` et `npm run build` pour confirmer que rien ne casse.

---

### 2.3 Retirer slick-carousel et react-slick (inutilisés)

**Constat :** Seul le CSS `slick-carousel/slick/slick.css` est importé dans `_app.js`. Aucun composant Slider/carousel n’est utilisé (zines supprimés).

**Actions :**

1. Dans `pages/_app.js`, supprimer la ligne :  
   `import "slick-carousel/slick/slick.css";`
2. Dans `package.json`, supprimer :
   - `"react-slick": "^0.30.2"`
   - `"slick-carousel": "^1.8.1"`
3. Lancer `npm install`, puis `npm run validate` et `npm run build`.

---

### 2.4 Retirer moment-timezone (inutilisé)

**Constat :** Aucune occurrence de `moment` ou `timezone` dans le code applicatif.

**Actions :**

1. Dans `package.json`, supprimer la ligne `"moment-timezone": "^0.5.45"` dans `dependencies`.
2. Lancer `npm install`, puis `npm run validate` et `npm run build`.

---

### 2.5 Réduire ou retirer Font Awesome

**Constat :** Seul `@fortawesome/fontawesome-svg-core` est importé (`utils/fortawesome.js` : `config.autoAddCss = false`). Aucune icône n’est utilisée dans l’app.

**Option A — Tout retirer (recommandé si tu n’utilises aucune icône FA) :**

1. Supprimer le fichier `utils/fortawesome.js`.
2. Dans `pages/_app.js`, supprimer la ligne :  
   `import "../utils/fortawesome";`
3. Dans `package.json`, supprimer toutes les dépendances `@fortawesome/*` (fontawesome-free, fontawesome-svg-core, free-brands-svg-icons, etc.).
4. Si plus aucun package Font Awesome ne reste, tu peux retirer ou adapter la config dans `.npmrc` (registry `@fortawesome`).
5. Lancer `npm install`, puis `npm run validate` et `npm run build`.

**Option B — Garder uniquement le core pour plus tard :**

1. Dans `package.json`, ne garder que `@fortawesome/fontawesome-svg-core` (et éventuellement `@fortawesome/react-fontawesome` si tu prévois d’utiliser des icônes bientôt).
2. Supprimer tous les autres paquets `@fortawesome/*` (free-brands, pro-duotone, pro-light, etc.).
3. Lancer `npm install`, puis `npm run validate` et `npm run build`.

---

## Priorité 3 — Documentation et règles (sécurité / maintenabilité)

### 3.1 Règle « locales = seule source HTML parsé »

**Objectif :** Documenter que le HTML rendu via `html-react-parser` provient uniquement des fichiers de traduction (équipe), pas de contenu utilisateur.

**Actions :**

1. Dans le README ou dans un fichier type `docs/CONTRIBUTING.md` / `docs/SECURITY.md`, ajouter une courte section, par exemple :

   **Titre :** Contenu HTML et sécurité (XSS)  
   **Contenu :** Les textes passés à `html-react-parser` viennent uniquement des fichiers sous `public/locales/`. Ne pas brancher de source non fiable (CMS public, saisie utilisateur) sans ajouter une couche de sanitization (ex. DOMPurify) ou une whitelist de balises.

2. (Optionnel) Ajouter un commentaire en tête de `utils/fortawesome.js` ou au premier endroit qui utilise `parse()` (ex. dans une section) rappelant que l’entrée doit rester contrôlée.

---

## Priorité 4 — Optionnel (améliorations supplémentaires)

### 4.1 Servir les images en WebP côté client

**Objectif :** Réduire le poids des images quand le prebuild génère déjà des `.webp`.

**Piste :** Adapter le composant `Picture` (ou les appels qui passent `src`) pour utiliser le `.webp` quand il existe (ex. `src` en `.jpg` → requête ou `src` en `.webp` avec fallback), ou utiliser `next/image` avec plusieurs `srcSet` / formats. À évaluer selon le gain réel (déjà du lazy load et optimisation Next).

### 4.2 Content-Security-Policy (CSP)

**Objectif :** Renforcer la sécurité contre XSS et chargements non autorisés.

**Piste :** Ajouter un header `Content-Security-Policy` progressivement (d’abord en report-only), en s’assurant de ne pas casser Vercel Analytics/Speed Insights ni les ressources légitimes. À traiter après les headers de la priorité 1.

---

## Récapitulatif — Ordre d’exécution suggéré

| #   | Priorité    | Action                                         | Fichiers / commandes concernés                          |
| --- | ----------- | ---------------------------------------------- | ------------------------------------------------------- |
| 1   | Sécurité    | Ajouter headers (X-Frame-Options, etc.)        | `next.config.mjs`                                       |
| 2   | Performance | Mettre à jour Browserslist                     | `npx update-browserslist-db@latest`                     |
| 3   | Performance | Retirer react-intl                             | `package.json` → `npm install`                          |
| 4   | Performance | Retirer slick-carousel + react-slick           | `pages/_app.js`, `package.json` → `npm install`         |
| 5   | Performance | Retirer moment-timezone                        | `package.json` → `npm install`                          |
| 6   | Performance | Réduire / retirer Font Awesome (option A ou B) | `utils/fortawesome.js`, `pages/_app.js`, `package.json` |
| 7   | Doc         | Documenter règle « locales = source HTML »     | README ou `docs/SECURITY.md`                            |
| 8   | Optionnel   | WebP côté client, CSP                          | Selon besoin                                            |

Après chaque étape : `npm run validate` et `npm run build`. En cas de régression, annuler l’étape (git) et ajuster le plan.
