# Audit poussé des contenus — lucrousseau.com

**Objectif :** Repérer les améliorations restantes au niveau du message et de la communication (positionnement Product Engineer, cohérence, ton, clarté).

---

## 1. Synthèse

Le site a bien basculé vers le positionnement **Product Engineer — Systems, architecture & product execution**. Il reste toutefois :

- des **ancres et libellés** qui évoquent encore des forfaits/jours ;
- du **contenu legacy** (home-hero) non aligné ;
- des **redondances** Hero / About ;
- des **projets** encore décrits en mode tâches plutôt qu’outcomes ;
- quelques **ajustements de ton** (exclamations, libellés nav).

---

## 2. Points forts

- **Hero** : Tagline et manifeste clairs, « ticket » utilisé pour contraster (acceptable).
- **About** : Court, orienté ownership et partenaire redevable.
- **What is a PE** : Définition + tableau comparatif cohérents.
- **Engagement** : Trois modèles bien différenciés, retainer-only, pas d’heure.
- **Differentiation** : vs agence / freelance / PM bien posé.
- **Why / AI / Technical foundations** : Alignés avec le positionnement, ton sobre.
- **CTAs** : « Schedule a conversation » / « Planifier un échange » cohérents.

---

## 3. Problèmes et incohérences

### 3.1 Ancres et connotation « forfaits / jours »

| Fichier          | Clé    | Valeur actuelle (EN/FR) | Problème                                    |
| ---------------- | ------ | ----------------------- | ------------------------------------------- |
| development-hero | anchor | `packages` / `forfaits` | Évoque des forfaits tarifaires ou journées. |

**Recommandation :** Remplacer par `how-i-work` (EN) et `comment-je-travaille` (FR), ou `offer` / `offre`, pour coller au libellé de navigation « How I work » et éviter la connotation jour/forfait.

### 3.2 Navigation : libellé « Why » trop court

- **Nav actuelle :** « Why » / « Pourquoi ».
- **Titre de section :** « Why work with me » / « Pourquoi travailler avec moi ».

**Recommandation :** Utiliser en nav « Why work with me » (ou « Why me » si contrainte mobile) pour aligner avec le titre et clarifier l’intention.

### 3.3 Contenu legacy (home-hero)

- **Fichiers :** `public/locales/en/home-hero.json`, `public/locales/fr/home-hero.json`.
- **Utilisation :** `sections/HomeHero` et `bk/pages/cto.js` (page de backup).
- **Contenu actuel :** « consultant and developer on-demand », « freelance development », « 25 years », « MVPs », « Transform your vision into reality » — **non aligné** avec Product Engineer.

**Recommandation :** Soit mettre à jour home-hero (EN/FR) avec le même positionnement que development-hero/about, soit documenter que HomeHero est déprécié et ne pas l’utiliser sur la page principale.

### 3.4 Ton et micro-copy

- **common.json (EN) :** « Contact Me! » — point d’exclamation peu aligné avec un ton calme.
- **Recommandation :** « Contact » ou « Get in touch » (sans « ! »).

---

## 4. Redondances

### 4.1 Hero manifeste vs About

- **Hero :** « product strategy, system architecture, hands-on execution », « WordPress and headless, APIs, multi-site… », « one technical partner », « No handoff theatre… ».
- **About :** « product strategy, system architecture, and hands-on execution—WordPress and headless, APIs… », « one accountable partner ».

Les deux répètent la même idée (intersection stratégie / architecture / exécution + partenaire unique). Ce n’est pas bloquant, mais on peut **alléger About** pour qu’il apporte une info distincte (ex. lieu, durée d’expérience, type de clients) et évite de recopier le manifeste.

**Recommandation :** Garder About court ; optionnellement, remplacer la première phrase par une variante plus « bio » (ex. « Luc Rousseau is a Product Engineer with 20+ years building and leading digital products. ») et garder la seconde sur Québec + partenaire redevable.

---

## 5. Lacunes et améliorations possibles

### 5.1 Section Projects (ex-Tangible)

- **Résumé :** « Outcomes over tasks » — bon.
- **Contenu des études de cas (Nesto, Compare Mortgages, BrightWize) :** Encore rédigé en mode **tâches** (« I develop », « I implement », « I provide », « Recruitment and Talent Development », listes d’activités). Peu de phrases qui résument l’**outcome** ou l’**impact** (réduction de risque, cohérence architecture, livraison prévisible, etc.).

**Recommandation :** Pour chaque projet, ajouter en tête de bloc **une phrase outcome** (EN/FR), du type : « Outcome: one coherent architecture, clear ownership, and sustainable delivery for [client]. » Puis garder le détail technique en dessous, en évitant si possible les formulations purement « I do X, I do Y » au profit de « We achieved X; the system now does Y. ».

### 5.2 Engagement : formulation « days/month »

- Les modèles indiquent « 2–4 days/month », « 8–12 days/month », « 2–3 days/week ». Ce n’est pas du day-rate, mais ça reste une **quantité de temps**, ce qui peut réactiver une lecture « achat de jours ».

**Recommandation :** Laisser les chiffres (ils aident à cadrer), mais ajouter une phrase courte dans le **valueStatement** ou en intro Engagement, du type : « Engagement is retainer-based—you get continuity and ownership, not a quote for X days. » (ou équivalent FR). Optionnel.

### 5.3 Une seule phrase « outcome » above the fold

- Aujourd’hui : tagline + manifeste. On pourrait ajouter **une phrase unique** qui résume la promesse (business outcomes, risque réduit, clarté architecture), répétable et partageable.

**Recommandation (optionnel) :** Ex. sous le tagline : « Clear architecture, aligned roadmap, and delivery you can count on—without the coordination overhead. » À placer dans development-hero (clé dédiée) et à afficher sous le quote.

---

## 6. Recommandations par section (checklist)

| Section / Fichier       | Action recommandée                                                                                                                        |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **development-hero**    | Remplacer `anchor` par `how-i-work` (EN) et `comment-je-travaille` (FR). Optionnel : ajouter une ligne « outcome promise » sous le quote. |
| **why**                 | Nav : utiliser le même libellé que le titre de section (« Why work with me » / « Pourquoi travailler avec moi ») ou « Why me » si besoin. |
| **common**              | Remplacer « Contact Me! » par « Contact » (ou « Get in touch »).                                                                          |
| **home-hero**           | Mettre à jour EN/FR au positionnement Product Engineer, ou marquer comme legacy et ne pas utiliser sur la home.                           |
| **tangible (projects)** | Ajouter une phrase outcome en tête de chaque projet ; alléger ou reformuler les listes de tâches en résultats/impact où c’est possible.   |
| **about**               | Optionnel : varier la première phrase pour éviter la répétition du manifeste (ton plus « bio »).                                          |

---

## 7. Utilisation du mot « ticket »

- **Hero :** « what's on the ticket » / « what should be on the ticket » — utilisé pour **contraster** (pas seulement exécuter des tickets). **OK.**
- **Who I work with / Differentiation :** « not just implement tickets », « tickets, features, or a fixed scope » — contexte de **différenciation** avec le freelance/dev. **OK.**
- **product-engineer (table) :** « Tasks and tickets » pour la colonne Developer. **OK.**

Aucun changement nécessaire pour « ticket » dans ces contextes.

---

## 8. Résumé des actions prioritaires

1. **Ancre hero :** `packages` / `forfaits` → `how-i-work` / `comment-je-travaille`.
2. **Nav « Why » :** Aligner sur le titre de section (« Why work with me » / « Pourquoi travailler avec moi »).
3. **common (EN) :** « Contact Me! » → « Contact ».
4. **home-hero :** Mise à jour Product Engineer ou marquage legacy.
5. **Projects :** Ajouter une phrase outcome par étude de cas ; alléger le mode « tâches » où possible.
6. **About :** Optionnel — varier la première phrase pour réduire la redondance avec le manifeste.

Une fois ces points traités, le message et la communication seront alignés de bout en bout avec le positionnement **Product Engineer — Systems, Architecture & Product Execution**, sans connotation jour/forfait et avec un ton cohérent et sobre.
