# lucrousseau.com — Positioning structure (full audit & redesign)

## Shift

**From:** Senior WordPress consultant (day-rate, task-based, execution-focused)  
**To:** Product Engineer — Systems, Architecture & Product Execution

**Objectives:**

- Remove day-rate perception
- Remove task-based framing
- Elevate strategic positioning
- Emphasize ownership
- Emphasize business outcomes
- Emphasize architectural clarity

**Keep:** Authentic tone, no corporate speak, no startup hype.

---

## 1. Full homepage structure (single-page)

Recommended order and purpose of sections (narrative flow):

| Order | Section                                     | Purpose                                                                                                                                        | Anchor                       |
| ----- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| 1     | **Hero**                                    | Who + tagline + manifesto. No rates, no “hire me for X hours.”                                                                                 | `hero` / `how-i-work`        |
| 2     | **About** (short)                           | 2–3 sentences: who Luc is, what Product Engineer means here, where he’s based. Reinforces ownership and outcomes.                              | `about`                      |
| 3     | **What is a Product Engineer?**             | Definition + comparison table. Sets the frame.                                                                                                 | `what-is-a-product-engineer` |
| 4     | **Offer pillars** (in hero accordion)       | 4 pillars: Product & roadmap clarity, Architecture & system design, Technical debt reduction, Delivery & execution. Outcome-focused, no tasks. | (same as hero)               |
| 5     | **Engagement**                              | Three models (Steward, Architect, Fractional). Retainer-only, no hourly.                                                                       | `engagement`                 |
| 6     | **Who I work with**                         | Ideal clients and contexts.                                                                                                                    | `who-i-work-with`            |
| 7     | **Why different**                           | vs agency, vs freelance dev, vs pure PM.                                                                                                       | `differentiation`            |
| 8     | **Why work with me**                        | Value props: alignment, less rework, one partner.                                                                                              | `why`                        |
| 9     | **Technical foundations** (ex‑Technologies) | Stack as enablers of outcomes, not a “skills list.” Short.                                                                                     | `technical-foundations`      |
| 10    | **AI & execution**                          | Responsible use of AI. Guardrails, no hype.                                                                                                    | `ai-responsible`             |
| 11    | **Projects** (ex‑Tangible)                  | Case studies framed by ownership and outcomes (architecture, product impact), not tasks.                                                       | `projects`                   |

**Removed or reframed:**

- No “half-day” or “what I can do in X hours.”
- No day-rate or hourly mention anywhere.
- Technologies → “Technical foundations” (outcome-focused copy).
- Tangible → “Projects” (outcome and ownership framing).

---

## 2. About (content block / section)

Use as a short block under the hero (or a dedicated “About” section). Tone: direct, authentic, no hype.

**EN — About (2–3 sentences):**  
Luc Rousseau is a Product Engineer with 20+ years in digital product development. He works at the intersection of product strategy, system architecture, and hands-on execution—WordPress and headless, APIs, multi-site platforms, technical debt, and delivery. He’s based in Quebec and works with product and engineering leaders who want one accountable partner for systems, architecture, and product execution.

**FR — About:**  
Luc Rousseau est Product Engineer avec plus de 20 ans en développement de produits numériques. Il travaille à l’intersection de la stratégie produit, de l’architecture système et de l’exécution concrète—WordPress et headless, APIs, plateformes multi-sites, dette technique et livraison. Basé au Québec, il accompagne les responsables produit et technique qui veulent un partenaire redevable pour les systèmes, l’architecture et l’exécution produit.

**Placement:** Either a short “About” section (title + 2–3 sentences) between Hero and “What is a Product Engineer?”, or fold into the hero as a second short paragraph. Prefer a distinct About block for clarity.

---

## 3. Services page structure (logical “services” = Engagement + pillars)

There is no separate `/services` route; “services” are communicated via:

1. **Offer pillars** (hero accordion): Product & roadmap clarity, Architecture & system design, Technical debt reduction, Delivery & execution. Each with outcomes and problems solved—no task list.
2. **Engagement section**: Three models (Technical Product Steward, Product & System Architect, Fractional Product Engineer). Retainer-only, no hourly or day-rate.

**Services page structure (if you add a dedicated page later):**

- **Headline:** How I work with you (or: Structured engagement, not hourly work).
- **Intro:** One sentence: retainer-based, strategic involvement, product-level impact.
- **Block 1 — What I focus on:** The 4 pillars (short title + 1 sentence each).
- **Block 2 — How we work together:** The 3 engagement models (title + 2 sentences + “Ideal for”).
- **CTA:** Schedule a conversation to see which fit fits.

**Current implementation:** This is already covered by Hero (4 pillars) + Engagement (3 models) on the homepage. No separate services page required unless you want a dedicated route.

---

## 4. CTA positioning

**Principle:** CTAs invite a conversation about fit and outcomes, not “hire me for a task” or “get a quote.”

**Primary CTA (hero, end of key sections):**

- **Label:** “Schedule a conversation” / “Planifier un échange” (preferred over “Schedule a chat” or “Book a call” for a more strategic tone.)
- **Action:** Calendly (or equivalent) — same link, no change.
- **Context line where needed:** “Discuss your product and technical goals” / “Discuter de vos objectifs produit et techniques.”

**Secondary CTAs:**

- Engagement section: “See which engagement model fits” (already in place).
- Why / Who I work with / Differentiation: “Schedule a conversation” (reuse primary).
- Projects: Keep “Visit the website” for case-study links; no “Start innovating now!” — replace with “Schedule a conversation” or remove if it feels like hype.

**Avoid:**

- “Book a session,” “Get a quote,” “Hire me,” “Let’s build something.”
- Any CTA that implies hourly or task-based work.

**common.json (and equivalents):**

- `schedule-me-label`: “Schedule a conversation” (EN), “Planifier un échange” (FR).
- Keep `schedule-me` URL as is.

---

## 5. Suggested navigation structure

**Goal:** Fewer items, clearer hierarchy. Avoid “Skills” or “Services” as generic labels; use outcome-oriented labels.

**Option A — Single-level nav (6–7 items):**

1. How I work (hero)
2. What is a PE (definition)
3. Engagement
4. Who I work with
5. Why different
6. Why work with me
7. Technical foundations (ex‑Technologies)
8. AI & execution (optional, or fold into “How I work”)
9. Projects

**Option B — Shorter nav (5–6 items, collapse some into one scroll):**

1. How I work
2. Engagement
3. Who I work with
4. Why different / Why me (one section or two close sections)
5. Foundations & AI (one section combining Technical foundations + AI)
6. Projects

**Recommended (Option A, with clear labels):**

- **How I work** → hero (pillars in accordion)
- **What is a Product Engineer?**
- **Engagement**
- **Who I work with**
- **Why different**
- **Why work with me**
- **Technical foundations**
- **AI & execution**
- **Projects**

**Labels to avoid in nav:** “Skills,” “Packages,” “Forfaits,” “Tangible” (prefer “Projects”).

**Anchor consistency:** Use kebab-case anchors (e.g. `what-is-a-product-engineer`, `technical-foundations`, `projects`) and ensure nav hrefs match.

---

## 6. SEO & meta (homepage)

**Title (EN):**  
Luc Rousseau — Product Engineer | Systems, Architecture & Product Execution

**Title (FR):**  
Luc Rousseau — Product Engineer | Systèmes, architecture et exécution produit

**Description (EN):**  
Product Engineer with 20+ years in digital product development. Systems thinking, architecture, technical roadmap, and execution. Retainer-based engagement for product and engineering leaders. Quebec & Montreal.

**Description (FR):**  
Product Engineer avec 20+ ans en développement de produits numériques. Pensée système, architecture, roadmap technique et exécution. Engagement en retainer pour les responsables produit et technique. Québec et Montréal.

**No mention of:** WordPress consultant, day-rate, hourly, freelance developer, tasks.

---

## 7. Checklist (implementation)

- [ ] Hero tagline: “Product Engineer — Systems, Architecture & Product Execution” (EN/FR).
- [ ] Add short About block (section or hero paragraph); no task-based or day-rate language.
- [ ] Rename “Technologies” → “Technical foundations”; rewrite title/summary for outcome focus.
- [ ] Rename “Tangible” → “Projects”; rewrite title/summary for outcome/ownership; replace “Start innovating now!” with “Schedule a conversation” or neutral CTA.
- [ ] Nav: update labels (Technical foundations, Projects); ensure anchors match.
- [ ] common.json: schedule-me-label = “Schedule a conversation” / “Planifier un échange”.
- [ ] development.json: SEO title and description as in §6.
- [ ] Scan all locale files for “hourly,” “day,” “half-day,” “rate,” “task,” “ticket” and remove or rephrase.
