# Audit SEO / technique du site

**Date:** mars 2025  
**Objectif:** repérer les manques (sitemap, meta, title, géo, etc.) et prioriser les corrections.

---

## 1. Ce qui est déjà en place

| Élément                      | Statut  | Détail                                                                        |
| ---------------------------- | ------- | ----------------------------------------------------------------------------- |
| **Title & meta description** | OK      | Composant `SEO` avec `title`, `description` par page                          |
| **Open Graph**               | Partiel | `og:title`, `og:description`, `og:image`, `og:url` présents                   |
| **Twitter Cards**            | OK      | `twitter:card`, `title`, `description`, `image`                               |
| **Canonical**                | Partiel | `link rel="canonical"` présent mais **URL sans préfixe de langue** (voir § 3) |
| **Favicons & manifest**      | OK      | apple-touch-icon, favicon 32/16, `site.webmanifest`                           |
| **i18n**                     | OK      | `en` / `fr`, `next-i18next`                                                   |
| **Images OG**                | OK      | `home-seo-image` EN/FR (`/og/image-en.jpg`, `image-fr.jpg`)                   |

---

## 2. Manques identifiés

### 2.1 Sitemap & robots

- **Sitemap :** absent. Aucun `sitemap.xml` (ni statique ni dynamique).
- **robots.txt :** absent. Pas de fichier `public/robots.txt` pour indiquer les règles et l’URL du sitemap.

**Impact :** les moteurs découvrent moins bien les pages et les variantes de langue.

**Action :**

- Ajouter `public/robots.txt` (User-agent, Allow, et `Sitemap: https://<domain>/sitemap.xml`).
- Exposer un `sitemap.xml` (dynamique recommandé pour inclure toutes les URLs avec domaine et locales).

### 2.2 Meta / balises manquantes ou à renforcer

- **`og:type`** : non défini. À mettre à `website` sur les pages du site.
- **`og:locale`** et **`og:locale:alternate`** : absents. Utiles pour le ciblage géo/langue.
- **`og:site_name`** : absent. Renforce la marque dans le partage social.
- **Hreflang :** pas de `link rel="alternate" hreflang="x"` pour EN/FR. Risque de contenu dupliqué ou de mauvais ciblage langue.

**Action :**

- Étendre le composant `SEO` avec : `og:type`, `og:site_name`, `og:locale` / `og:locale:alternate`, et balises `hreflang` pour les URLs EN/FR.

### 2.3 Canonical & URL par page / locale

- **Home** : `url="/"` passé à `SEO`. En FR, la page est servie sous `/fr` (ou préfixe de locale) mais le canonical reste `https://domain/` → incohérent.
- **Zines index** : `url="/"` au lieu de `"/zines"` (ou `"/fr/zines"`) → canonical et `og:url` pointent vers la home.
- **ZineLayout (pages zines individuelles)** : `url="/"` → toutes les pages zines ont le même canonical que la home.

**Action :**

- Utiliser la vraie path + locale (ex. `useRouter()` + `locale`) pour construire l’URL passée à `SEO` (canonical et `og:url`).
- Passer depuis chaque page (ou layout) l’URL réelle : home `"/"` ou `"/fr"`, zines `"/zines"` ou `"/fr/zines"`, zine détail `"/zines/01-mex"` ou `"/fr/zines/01-mex"`.

### 2.4 Données structurées (JSON-LD)

- Aucun **JSON-LD** (Person, WebSite, BreadcrumbList, etc.) détecté.

**Recommandation :**

- Au minimum : **WebSite** (nom, url, description) et **Person** (pour la page “about” / profil).
- Optionnel : **BreadcrumbList** sur les pages zines (accueil > zines > [titre zine]).

### 2.5 Contenu & géo

- **home.json (EN)** : description sans “20+ years” (alignée avec le positionnement actuel).
- **home.json (FR)** : la description contient encore “20+ ans” → à harmoniser si tu veux éviter l’accent “années d’expérience”.
- **Géo :** “Quebec” / “Québec” présent dans les textes ; pas de balise meta géo dédiée (souvent optionnel pour un site personnel).

---

## 3. Checklist rapide (à valider en prod)

- [ ] **robots.txt** : présent, référence `Sitemap: https://<domain>/sitemap.xml`
- [ ] **sitemap.xml** : accessible à `https://<domain>/sitemap.xml`, contient home + zines + variantes EN/FR
- [ ] **Title** : unique et pertinent par page (home, zines, chaque zine)
- [ ] **Meta description** : unique par page, < 160 caractères
- [ ] **Canonical** : une URL par page, avec préfixe de langue si besoin (`/fr/...`)
- [ ] **Hreflang** : `en` et `fr` sur les pages qui ont une version EN et FR
- [ ] **og:type** : `website`
- [ ] **og:image** : URL absolue, image dédiée (1200×630 recommandé)
- [ ] **NEXT_PUBLIC_DOMAIN** : défini en prod (ex. `https://lucrousseau.com`)

---

## 4. Priorisation suggérée

1. **Court terme**
   - Ajouter `robots.txt` et `sitemap.xml` (dynamique).
   - Corriger les URLs passées à `SEO` (canonical / og:url) pour home, zines index et chaque zine.
   - Compléter le composant `SEO` : `og:type`, `og:site_name`, `og:locale` / `og:locale:alternate`, `hreflang`.

2. **Moyen terme**
   - JSON-LD WebSite + Person.
   - Vérifier les descriptions (FR alignée sur EN, pas d’accent “X ans” si tu l’évites).

3. **Optionnel**
   - BreadcrumbList sur les zines.
   - Meta géo si tu veux cibler explicitement une région.

---

## 5. Fichiers concernés

| Fichier                          | Rôle                                                                 |
| -------------------------------- | -------------------------------------------------------------------- |
| `components/SEO/index.js`        | Meta, OG, Twitter, canonical → à étendre (og:type, locale, hreflang) |
| `pages/index.js`                 | Passer l’URL réelle (avec locale) à `SEO`                            |
| `pages/zines/index.js`           | Passer `url="/zines"` (ou équivalent avec locale)                    |
| `components/ZineLayout/index.js` | Recevoir et passer l’URL de la page zine (ex. `/zines/01-mex`)       |
| `public/robots.txt`              | À créer                                                              |
| `sitemap`                        | À créer (API + rewrite ou génération statique)                       |
| `next.config.mjs`                | Rewrite `/sitemap.xml` → API si sitemap dynamique                    |
| `public/locales/*/home.json`     | Descriptions SEO home EN/FR                                          |

---

## 6. Implémenté (suite à l'audit)

- **Origine du site (domaine)** : util `utils/siteOrigin.js` avec `getSiteOrigin(req?)`. En navigateur → `window.location.origin`. En API (sitemap, robots) → `Host` + `X-Forwarded-Proto` depuis `req`. Sinon → `NEXT_PUBLIC_DOMAIN` (voir `.env.example`). Fallback `https://lucrousseau.com`.
- **robots.txt** : API `pages/api/robots.js` + rewrite `/robots.txt` → `/api/robots`. Sitemap URL construite dynamiquement.
- **sitemap.xml** : API `pages/api/sitemap.js` + rewrite → `/sitemap.xml` (home, /fr, zines, chaque zine EN/FR). Domaine via `getSiteOrigin(req)`.
- **SEO** : utilise `getSiteOrigin()` (client = origin réelle, SSR = env ou fallback). + `og:type`, `og:site_name`, `og:locale`, hreflang, canonical selon locale.
