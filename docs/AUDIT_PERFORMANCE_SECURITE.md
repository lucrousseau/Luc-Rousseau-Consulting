# Audit performance et sécurité

**Date :** mars 2026  
**Périmètre :** landing Next.js (Pages Router), une page, i18n EN/FR.

---

## 1. Performance

### 1.1 Build et bundle

| Métrique                 | Valeur     | Commentaire                                               |
| ------------------------ | ---------- | --------------------------------------------------------- |
| Page `/` (First Load JS) | **148 kB** | Raisonnable pour une SPA avec i18n + sections.            |
| Shared chunks            | **132 kB** | Framework + main + \_app.                                 |
| \_app                    | 125 kB     | Inclut next-i18next, Vercel, styles, Font Awesome config. |

- **Next.js 15** : build OK, pas de `next/image` en mode legacy.
- **Compilation** : 1 warning (i18n-dev-reload, `require` dynamique) — acceptable en dev only.
- **Browserslist** : `caniuse-lite` > 12 mois. À mettre à jour : `npx update-browserslist-db@latest`.

### 1.2 Images

- **next/image** utilisé via le composant `Picture` (optimisation, lazy load par défaut).
- **Hero** : `loading="eager"`, `sizes` défini — bon pour le LCP.
- **Prebuild** : `convert-images.js` génère des `.webp` à partir des `.jpg` (qualité 90).
- **Recommandation** : servir le `.webp` côté composant quand disponible (ex. `src` avec extension `.webp` ou composant qui choisit selon support) pour réduire encore le poids des images.

### 1.3 Dépendances et poids

- **Font Awesome** : nombreux packages Pro (duotone, light, regular, solid, thin, sharp). Seul `@fortawesome/fontawesome-svg-core` est importé (`utils/fortawesome.js` : `config.autoAddCss = false`). Aucun `FontAwesomeIcon` ni icône importée dans le code.
  - **Recommandation** : si aucune icône n’est utilisée, retirer tous les paquets `@fortawesome/*` (sauf éventuellement `fontawesome-svg-core` si conservé pour plus tard). Sinon, ne garder que les packs d’icônes réellement utilisés pour réduire le bundle.
- **react-intl** : présent dans `package.json` mais **jamais importé** (i18n géré par `next-i18next` uniquement).
  - **Recommandation** : supprimer la dépendance `react-intl` pour alléger `node_modules` et éviter toute confusion.
- **moment-timezone** : présent ; à garder seulement si utilisé (ex. scripts ou affichage de dates). Sinon, envisager le retirer.
- **slick-carousel** : CSS importé dans `_app.js`. Vérifier si le carousel est encore utilisé après suppression des zines ; sinon retirer `react-slick` et `slick-carousel`.

### 1.4 Caching et headers

- **API sitemap/robots** : `Cache-Control: s-maxage=86400, stale-while-revalidate` — correct pour des données peu volatiles.
- Pas de headers de cache explicites sur les pages (gérés par la plateforme, ex. Vercel).

### 1.5 Recommandations performance (résumé)

1. Lancer `npx update-browserslist-db@latest` régulièrement.
2. Retirer **react-intl** (inutilisé).
3. Réduire ou retirer les paquets **Font Awesome** non utilisés ; sinon ne garder que les packs d’icônes nécessaires.
4. Vérifier l’usage de **moment-timezone** et **slick-carousel** ; retirer si inutilisés.
5. (Optionnel) Servir les images en WebP côté client quand le prebuild les génère (améliore LCP / bande passante).

---

## 2. Sécurité

### 2.1 Vulnérabilités npm

```text
npm audit
# 2 high severity
# - flatted (transitive) : DoS par récursion non bornée
# - immutable (transitive) : Prototype Pollution
```

- **Action** : exécuter `npm audit fix` puis `npm run validate` et vérifier que l’app et les tests passent. Si des breaking changes apparaissent, traiter les advisories à la main (mise à jour de dépendances directes ou overrides si nécessaire).

### 2.2 Exposition de contenu et XSS

- **dangerouslySetInnerHTML** : utilisé une fois dans `components/SEO/index.js` pour le **JSON-LD** : `JSON.stringify(jsonLdPerson)`. Les données viennent de props (nom, `sameAs`, `canonical`) contrôlées par le code, pas par l’utilisateur — **risque faible** tant que `sameAs` et l’origine ne sont pas alimentés par des entrées utilisateur.
- **html-react-parser** : utilisé pour le contenu des sections (textes issus des fichiers de traduction `public/locales/**/*.json`). Contenu édité par l’équipe, pas par des visiteurs — **risque XSS faible** tant que les JSON ne sont pas modifiés par une source non fiable. Si un jour le contenu devient dynamique (CMS, user-generated), il faudra sanitizer (ex. DOMPurify) ou restreindre les balises autorisées.

**Recommandation** : documenter que les locales sont la seule source du HTML parsé ; si l’origine des textes change, introduire une couche de sanitization.

### 2.3 Variables d’environnement

- **NEXT_PUBLIC_DOMAIN** : utilisé pour l’origine du site (SEO, sitemap, fallback SSR). Documenté dans `.env.example`. Pas de secret (URL publique).
- **.env.local** : absent du dépôt (correct). Aucun secret committé.
- Pas d’autres `process.env` exposant des clés ou tokens dans le code parcouru.

### 2.4 Headers HTTP de sécurité

- Aucun **middleware** ou **headers** personnalisés dans `next.config.mjs` (pas de Content-Security-Policy, X-Frame-Options, etc.). Les headers sont donc ceux par défaut de l’hébergeur (ex. Vercel).
- **Recommandations** (à mettre en place côté hébergeur ou via `next.config.mjs` > `headers`) :
  - **X-Frame-Options: DENY** (ou SAMEORIGIN si besoin d’iframe interne).
  - **X-Content-Type-Options: nosniff**.
  - **Referrer-Policy: strict-origin-when-cross-origin** (ou équivalent).
  - **Content-Security-Policy** : à définir progressivement (éviter de casser les scripts Vercel, Font Awesome si conservé, etc.).

### 2.5 Dépendances et bonnes pratiques

- **eslint-plugin-security** : activé (rapporté dans le README) — bon pour détecter des patterns à risque (eval, injection, etc.).
- **React** : pas d’usage de `eval`, `dangerouslySetInnerHTML` hors JSON-LD contrôlé.
- **API routes** : `sitemap` et `robots` ne prennent pas d’entrée utilisateur ; pas de risque d’injection côté serveur identifié.

### 2.6 Recommandations sécurité (résumé)

1. ~~Exécuter **npm audit fix**~~ (fait : 0 vulnérabilité).
2. Ajouter des **headers de sécurité** (X-Frame-Options, X-Content-Type-Options, Referrer-Policy ; CSP optionnel et progressif).
3. Conserver la règle : pas de contenu utilisateur non fiable dans le HTML parsé (locales uniquement) ; si cela change, ajouter une sanitization.

---

## 3. Synthèse

| Domaine         | Priorité  | Action principale                                                                                     |
| --------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| **Performance** | Moyenne   | Retirer react-intl ; alléger Font Awesome ou slick/moment si inutilisés ; mettre à jour browserslist. |
| **Sécurité**    | ~~Haute~~ | ~~npm audit fix~~ (fait). Headers de sécurité à ajouter.                                              |
| **Sécurité**    | Moyenne   | Headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy).                                   |
| **Sécurité**    | Basse     | Documenter / maintenir la règle “locales = seule source HTML parsé”.                                  |

---

_Rapport généré à partir du code et de `npm audit` / `next build`._
