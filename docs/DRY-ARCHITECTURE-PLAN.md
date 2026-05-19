# Plan d’architecture — DRY et structure réutilisable

Document de suivi pour refactoriser le site vers une structure saine, alignée sur DRY et les bonnes pratiques.

**Dernière mise à jour :** 2026-05-19 (phase 1 complétée sur `cursor/phase-1-quick-fixes`)  
**Branche suggérée :** `refactor/dry-architecture` (ou PRs découpées ci-dessous)

---

## Comment utiliser ce document

- Cochez `[x]` chaque tâche au fur et à mesure.
- Une phase est **terminée** lorsque toutes ses cases « Critères d’acceptation » sont cochées.
- Après chaque PR : `npm run validate` doit passer.
- Référence visuelle : comparer la home FR + EN avant/après (hero, sections avec CTA, accordéons).

---

## Objectifs

1. Une seule façon de faire : intro de section, CTA Calendly + contacts, grille de cartes `Product`.
2. Sections réutilisables hors `.page-home` (autre page, autre contexte) sans copier du JSX.
3. Page home allégée : moins de props répétitives, fallbacks i18n centralisés.
4. Conventions explicites : `components/` = UI générique, `sections/` = composition métier, `commons/` = logique/styles partagés sans UI.

---

## Principes directeurs

| Principe                 | Application                                                                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DRY au bon niveau        | Extraire ce qui se répète **≥ 3 fois** (intro, CTA, grille Product) — pas chaque variation de classe BEM                                                 |
| Props > contexte global  | Sections gardent `cta`, `rowStyle`, `className` pour surcharger sans casser la home                                                                      |
| i18n dans les sections   | Les composants de composition reçoivent du contenu déjà résolu (`badge`, `title`, `teaser`) ; pas de `useTranslation` dans `SectionIntro` / `SectionCta` |
| Changements incrémentaux | Une section migrée = une PR reviewable ; validation verte après chaque phase                                                                             |
| Pas de sur-ingénierie    | Pas de barrel `components/index.js`, pas de design system complet                                                                                        |

---

## Inventaire des patterns (référence)

| Section                   | Intro badge+h2 | Grille Product | CTA teaser | Row styles            |
| ------------------------- | -------------- | -------------- | ---------- | --------------------- |
| ProductEngineerDefinition | ✓              | — (Table)      | ✓          | intro, sub, cta       |
| AIResponsible             | ✓              | ✓              | ✓          | intro, stack, pre-cta |
| Engagement                | ✓              | ✓              | ✓ (inline) | intro, block, pre-cta |
| CollaborationFit          | ✓              | ✓              | ✓          | intro, pre-cta        |
| WhoIWorkWith              | ✓              | liste custom   | —          | intro, cta            |
| Technologies              | ✓              | Tags           | —          | intro, cta            |
| Tangible                  | ✓              | Accordion      | ✓          | intro, cta            |
| About                     | ✓              | —              | —          | intro + cta           |
| HomeFaq                   | ✓              | Accordion      | —          | intro, cta            |

---

## Phase 0 — Préparation

**But :** figer l’état actuel et éviter les régressions.

| #   | Tâche                                                 | Statut |
| --- | ----------------------------------------------------- | ------ |
| 0.1 | `npm run validate` vert (baseline notée)              | [ ]    |
| 0.2 | Capture visuelle home FR + EN (hero, CTA, accordéons) | [ ]    |
| 0.3 | Inventaire des patterns validé (tableau ci-dessus)    | [ ]    |

**Critères d’acceptation phase 0**

- [ ] Baseline CI / validate documentée (date ou commit)
- [ ] Références visuelles disponibles pour comparaison

---

## Phase 1 — Corrections rapides

**But :** bugs et bruit sans changer l’architecture profonde.  
**PR suggérée :** PR1 (avec Phase 2)

| #   | Tâche                                                                                                           | Fichier(s)                        | Statut |
| --- | --------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------ |
| 1.1 | Fallback `href={cta?.link ?? t("common:schedule-me")}`                                                          | `sections/AIResponsible/index.js` | [x]    |
| 1.2 | Unifier wrapper : `AIResponsible` → `Container` seul (supprimer `<section>` redondant si applicable)            | `sections/AIResponsible/index.js` | [x]    |
| 1.3 | Aligner `About` sur `homeIntroRowStyle` (ou documenter exception dans ce fichier)                               | `sections/About/index.js`         | [x]    |
| 1.4 | Nettoyer `pages/index.js` : retirer les `cta` identiques ; garder seulement ceux qui diffèrent (ex. Engagement) | `pages/index.js`                  | [x]    |
| 1.5 | _(Optionnel, Phase 5)_ Documenter API `Header` `navigation={false}` / `cta={false}`                             | —                                 | [ ]    |

**Critères d’acceptation phase 1**

- [ ] Home FR/EN visuellement identique _(vérification manuelle recommandée)_
- [x] `npm run validate` vert
- [x] `index.js` : au plus 1–2 objets `cta` explicites

---

## Phase 2 — Commons et helpers

**But :** centraliser ce qui n’est pas du JSX.  
**PR suggérée :** PR1 (avec Phase 1)

| #   | Tâche                                                                                               | Livrable                    | Statut |
| --- | --------------------------------------------------------------------------------------------------- | --------------------------- | ------ |
| 2.1 | Renommer `commons/homePageRowSpacing.js` → `commons/pageRowSpacing.js` et mettre à jour les imports | `commons/pageRowSpacing.js` | [x]    |
| 2.2 | Ajouter `commons/scheduleCta.js` : `getScheduleCta(t, overrides?)` → `{ link, label }`              | `commons/scheduleCta.js`    | [x]    |
| 2.3 | Mettre à jour README « Structure » (components vs sections vs commons)                              | `README.md`                 | [x]    |

**Structure cible `commons/`**

```
commons/
  alignments.js
  pageRowSpacing.js      # ex-homePageRowSpacing
  scheduleCta.js
```

**Critères d’acceptation phase 2**

- [x] Toutes les sections importent `pageRowSpacing` (plus d’import `homePageRowSpacing`)
- [x] Helper `scheduleCta` utilisé là où c’est pertinent (pages / sections)

---

## Phase 3 — Composants de composition

**But :** extraire intro, CTA et grille Product.  
**PRs suggérées :** PR2, PR3, PR4

### 3A — `SectionIntro`

| #    | Tâche                                                                   | Statut                                         |
| ---- | ----------------------------------------------------------------------- | ---------------------------------------------- |
| 3A.1 | Créer `components/SectionIntro/index.js` (+ `style.scss` si nécessaire) | [x]                                            |
| 3A.2 | Importer styles dans `styles/main.scss` si fichier dédié                | [x] _(N/A — styles globaux `.section__badge`)_ |
| 3A.3 | API : `badge`, `title`, `lede`/`children`, `cols`, `rowStyle`, `halign` | [x]                                            |

**API cible (référence)**

```jsx
<SectionIntro
  badge={t("…:badge")}
  title={t("…:title")}
  lede={parse(t("…:summary"))}
  cols={{ col: 11, xl: 12, sm: 12 }}
  rowStyle={homeIntroRowStyle}
  halign="center"
/>
```

### 3B — `SectionCta`

| #    | Tâche                                                                                                       | Statut      |
| ---- | ----------------------------------------------------------------------------------------------------------- | ----------- |
| 3B.1 | Créer `components/SectionCta/index.js` (+ styles si nécessaire)                                             | [x]         |
| 3B.2 | Importer dans `styles/main.scss`                                                                            | [x] _(N/A)_ |
| 3B.3 | Encapsuler `Row` + `Button` + `ContactAlternates` ; props `teaser`, `trackSection`, `rowStyle`, `className` | [x]         |

**API cible (référence)**

```jsx
<SectionCta
  trackSection="engagement"
  href={cta?.link ?? scheduleLink}
  label={cta?.label ?? defaultLabel}
  teaser={parse(t("…:ctaTeaser"))}
  rowStyle={homePreCtaContentRowStyle}
  cols={{ col: 10, sm: 12 }}
  className="section-engagement__cta"
/>
```

### 3C — `ProductGrid` (recommandé)

| #    | Tâche                                                     | Statut |
| ---- | --------------------------------------------------------- | ------ |
| 3C.1 | Créer `components/ProductGrid/index.js`                   | [x]    |
| 3C.2 | Map items → `Row` columns + `Product` avec `cols` unifiés | [x]    |

### 3D — Migration des sections

Cocher chaque section une fois migrée vers `SectionIntro` / `SectionCta` / `ProductGrid` selon le cas.

| Section                   | SectionIntro | SectionCta         | ProductGrid | Statut |
| ------------------------- | ------------ | ------------------ | ----------- | ------ |
| HomeFaq                   | [x]          | [x]                | —           | [x]    |
| About                     | [x]          | [x]                | —           | [x]    |
| Technologies              | [x]          | [x]                | —           | [x]    |
| ProductEngineerDefinition | [x]          | [x]                | —           | [x]    |
| CollaborationFit          | [x]          | [x]                | [x]         | [x]    |
| AIResponsible             | [x]          | [x]                | [x]         | [x]    |
| Engagement                | [x]          | [x]                | [x]         | [x]    |
| Tangible                  | [x]          | [x]                | —           | [x]    |
| WhoIWorkWith              | [x]          | [x] _(CTA nested)_ | —           | [x]    |

**Ordre de migration recommandé**

1. [x] Lot 1 : HomeFaq, About, Technologies
2. [x] Lot 2 : ProductEngineerDefinition
3. [x] Lot 3 : CollaborationFit, AIResponsible, Engagement
4. [x] Lot 4 : Tangible, WhoIWorkWith

**Critères d’acceptation phase 3**

- [x] Aucune section ne duplique le bloc `Button` + `ContactAlternates` en entier
- [x] ≥ 7 sections utilisent `SectionIntro`
- [x] AIResponsible, CollaborationFit, Engagement utilisent `ProductGrid` (si créé)
- [x] `npm run validate` vert

---

## Phase 4 — Harmoniser `Buy` et le hero

**But :** un seul chemin pour « réserver un appel ».  
**PR suggérée :** PR5

| #   | Tâche                                                                                   | Statut |
| --- | --------------------------------------------------------------------------------------- | ------ |
| 4.1 | `Buy` : `href` via prop ou `getScheduleCta` (plus de hardcode seul dans le composant)   | [ ]    |
| 4.2 | Décision documentée : `Buy` réutilise `SectionCta` ou partage uniquement la logique CTA | [ ]    |
| 4.3 | `HomeHero` : exception documentée (h1/h2, pas `SectionIntro`)                           | [ ]    |

**Critères d’acceptation phase 4**

- [ ] URL Calendly définie de façon cohérente (`common` + helper)
- [ ] Tracking `trackSection` cohérent hero vs sections
- [ ] `npm run validate` vert

---

## Phase 5 — API des sections pour réutilisation

**But :** monter une section sur une future page sans modifier son source.  
**PR suggérée :** PR5 (avec Phase 4) ou PR dédiée

| #   | Tâche                                                                                                   | Statut |
| --- | ------------------------------------------------------------------------------------------------------- | ------ |
| 5.1 | JSDoc en tête de chaque section : `cta`, `introRowStyle`, `ctaRowStyle`, `className`, `backgroundColor` | [ ]    |
| 5.2 | `Header` : props explicites `showNavigation`, `showCta` (migration depuis `false`)                      | [ ]    |
| 5.3 | Preuve de réutilisabilité : page stub `pages/services.js` **ou** exemple dans README                    | [ ]    |

**Props standard cibles (référence)**

```js
{
  cta?: { link?: string; label?: string };
  introRowStyle?: object;
  ctaRowStyle?: object;
  className?: string;
  backgroundColor?: string;
}
```

**Critères d’acceptation phase 5**

- [ ] Au moins une section utilisable sur une 2e route sans modifier son fichier
- [ ] `getStaticProps` de la nouvelle page ne charge que les namespaces nécessaires

---

## Phase 6 — Qualité et garde-fous

**But :** éviter la régression du DRY.  
**PR suggérée :** PR6

| #   | Tâche                                                                                                        | Statut |
| --- | ------------------------------------------------------------------------------------------------------------ | ------ |
| 6.1 | Tests : `getScheduleCta`, `SectionIntro`, `SectionCta` (fallback href)                                       | [ ]    |
| 6.2 | Test léger `ProductGrid` (1 item)                                                                            | [ ]    |
| 6.3 | Note CONTRIBUTING ou commentaire : pas de `Button` + `ContactAlternates` adjacents hors `SectionCta` / `Buy` | [ ]    |
| 6.4 | `npm run validate` vert sur toute la codebase                                                                | [ ]    |

**Critères d’acceptation phase 6**

- [ ] Tests ajoutés passent en CI / pre-push
- [ ] Convention documentée

---

## Découpage PR (review facile)

| PR  | Phases | Contenu                                                        | Statut |
| --- | ------ | -------------------------------------------------------------- | ------ |
| PR1 | 1 + 2  | Fixes rapides, `pageRowSpacing`, `scheduleCta`, README         | [ ]    |
| PR2 | 3      | `SectionIntro` + About, HomeFaq, Technologies                  | [ ]    |
| PR3 | 3      | `SectionCta` + migration sections restantes (hors ProductGrid) | [ ]    |
| PR4 | 3      | `ProductGrid` + Engagement, CollaborationFit, AIResponsible    | [ ]    |
| PR5 | 4 + 5  | Buy/Hero, props sections, Header optionnel                     | [ ]    |
| PR6 | 6      | Tests + garde-fous                                             | [ ]    |

---

## Ce qu’on ne fait pas (hors scope)

- [ ] Refactor SCSS global / design tokens au-delà des imports nécessaires
- [ ] Storybook
- [ ] Migration App Router
- [ ] Barrel exports `components/*`
- [ ] Méga-composant `HomePage` configurable par JSON

---

## Checklist finale — structure saine

- [x] Composants de composition : `SectionIntro`, `SectionCta`, `ProductGrid`
- [x] `commons/pageRowSpacing` + `commons/scheduleCta`
- [ ] `pages/index.js` minimal (pas 8× le même objet `cta`)
- [ ] Wrappers cohérents : `Container` partout
- [ ] Sections : props documentées, réutilisables sur une 2e route
- [ ] Tests sur helpers + composants de composition
- [x] README à jour

---

## Journal de progression (optionnel)

| Date       | Phase / PR | Commit / PR #            | Notes                                             |
| ---------- | ---------- | ------------------------ | ------------------------------------------------- |
| 2026-05-19 | Phase 2    | `cursor/phase-2-commons` | pageRowSpacing rename, scheduleCta helper + tests |

---

## Références

- Revue initiale : conversation architecture DRY (2026-05)
- README projet : `README.md`
- Sécurité contenu HTML : `docs/SECURITY.md` (si présent)
