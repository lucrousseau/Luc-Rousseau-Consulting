# SEO + GEO Optimization Audit — lucrousseau.com

**Date:** March 2026  
**Objective:** Comprehensive SEO audit and implementation plan for improved visibility, local ranking (Quebec/Canada), and conversion.

---

## 🔍 STEP 1 — Technical SEO Audit

### ✅ What's Already Working

| Element            | Status     | Details                                                |
| ------------------ | ---------- | ------------------------------------------------------ |
| **Meta Tags**      | ✅ Good    | Title, description, OG tags, Twitter cards all present |
| **Canonical URLs** | ✅ Good    | Properly implemented with locale handling              |
| **Hreflang**       | ✅ Good    | EN/FR alternates configured                            |
| **Open Graph**     | ✅ Good    | Complete OG tags with locale variants                  |
| **Schema Markup**  | ⚠️ Partial | Person schema exists, but missing WebSite schema       |
| **Sitemap**        | ✅ Good    | Dynamic sitemap.xml via API route                      |
| **Robots.txt**     | ✅ Good    | Dynamic robots.txt with sitemap reference              |
| **i18n**           | ✅ Good    | Proper EN/FR locale handling                           |

### 🔴 High Priority Issues

#### 1. Missing WebSite Schema (JSON-LD)

**Issue:** Only Person schema exists. Missing WebSite schema for better site discovery.

**Impact:** Medium — Google can't understand site structure as well.

**Fix:** Add WebSite schema with site name, URL, description, and potentialActions (SearchAction).

#### 2. H1 Structure

**Current:** Single H1 "Product Engineer" — ✅ Good (one H1 per page)

**Issue:** H1 could be more SEO-optimized with keywords.

**Current H1:** "Product Engineer"  
**Recommended:** "Product Engineer — WordPress Consultant & Technical Architect | Quebec"

#### 3. Meta Descriptions

**Current EN:** "Product Engineer with 20+ years in digital product development. Systems thinking, architecture, technical roadmap, and execution. Retainer-based engagement for product and engineering leaders. Quebec."

**Issues:**

- Missing key search terms: "WordPress consultant", "Quebec", "Montreal"
- Could be more action-oriented
- Length: 195 chars (optimal: 150-160)

**Recommended EN:** "WordPress consultant & Product Engineer in Quebec. 20+ years building scalable systems, technical architecture, and product roadmaps. Retainer-based for product leaders. Montreal & remote."

**Current FR:** "Product Engineer avec 20+ ans en développement de produits numériques. Pensée système, architecture, roadmap technique et exécution. Engagement en retainer pour les responsables produit et technique. Québec."

**Issues:**

- Missing "consultant WordPress"
- Length: 201 chars

**Recommended FR:** "Consultant WordPress & Product Engineer au Québec. 20+ ans en architecture technique, systèmes scalables et roadmaps produit. Engagement en retainer. Montréal & remote."

#### 4. Missing Geo-Targeting Meta Tags

**Issue:** No explicit geo-targeting meta tags for Quebec/Canada.

**Fix:** Add geo meta tags and enhance schema with addressRegion, addressCountry.

#### 5. Title Tags

**Current EN:** "Luc Rousseau — Product Engineer | Systems, Architecture & Product Execution"

**Issues:**

- Missing "WordPress consultant" (high search volume)
- Missing location (Quebec/Montreal)
- Could be more keyword-rich

**Recommended EN:** "Luc Rousseau — WordPress Consultant & Product Engineer | Quebec | Technical Architecture"

**Current FR:** "Luc Rousseau — Product Engineer | Systèmes, architecture et exécution produit"

**Recommended FR:** "Luc Rousseau — Consultant WordPress & Product Engineer | Québec | Architecture technique"

### 🟡 Medium Priority Issues

#### 6. Missing Alt Attributes Audit

**Status:** Need to verify all images have descriptive alt text with keywords.

**Action:** Audit all images, ensure alt text includes relevant keywords where appropriate.

#### 7. Internal Linking Structure

**Issue:** Single-page site has no internal linking opportunities.

**Impact:** Low for now, but will be important when adding service pages/blog.

**Action:** Plan internal linking strategy for future multi-page structure.

#### 8. Content Keyword Density

**Current:** Content is well-written but could better integrate:

- "WordPress consultant"
- "Quebec"
- "Montreal"
- "Technical architecture"
- "Product engineer"

**Action:** Naturally integrate these terms in headings and body content.

### 🟢 Low Priority / Future Enhancements

#### 9. Blog/Content Strategy

**Status:** No blog yet.

**Recommendation:** Create content strategy for SEO authority building (see STEP 5).

#### 10. Performance (Core Web Vitals)

**Status:** To be audited separately (STEP 6).

---

## 🏗️ STEP 2 — SEO Site Architecture

### Current State

- **Single-page site** (homepage only)
- All content in one long scroll
- No service pages, blog, or additional landing pages

### Recommended Multi-Page Structure

#### Main Pages

| Page         | URL         | Target Keyword                  | Search Intent              | Goal                   |
| ------------ | ----------- | ------------------------------- | -------------------------- | ---------------------- |
| **Home**     | `/`         | "WordPress consultant Quebec"   | Informational → Conversion | Primary conversion     |
| **Services** | `/services` | "WordPress consulting services" | Informational              | Authority + conversion |
| **About**    | `/about`    | "Luc Rousseau Product Engineer" | Informational              | Trust building         |
| **Contact**  | `/contact`  | "hire WordPress consultant"     | Transactional              | Direct conversion      |

#### Optional Service Pages (3-5 max)

| Page                       | URL                                | Target Keyword                     | Intent        |
| -------------------------- | ---------------------------------- | ---------------------------------- | ------------- |
| **WordPress Architecture** | `/services/wordpress-architecture` | "WordPress technical architecture" | Informational |
| **Product Engineering**    | `/services/product-engineering`    | "Product engineer consultant"      | Informational |
| **Fractional CTO**         | `/services/fractional-cto`         | "fractional CTO Quebec"            | Transactional |

#### Blog Categories (Future)

1. **WordPress Development** (`/blog/wordpress`)
2. **Technical Architecture** (`/blog/architecture`)
3. **Product Strategy** (`/blog/product-strategy`)

### SEO Keyword Mapping

#### Primary Keywords (Homepage)

- WordPress consultant Quebec
- Product engineer consultant
- Technical architecture WordPress
- WordPress expert Montreal

#### Secondary Keywords (Service Pages)

- WordPress consulting services
- WordPress technical architect
- Product engineer fractional
- Fractional CTO Quebec

#### Long-tail Keywords

- WordPress consultant for enterprise
- Technical architecture consultant Quebec
- Product engineer retainer
- WordPress performance optimization

---

## ✍️ STEP 3 — Homepage Optimization

### Current H1

**EN:** "Product Engineer"  
**FR:** "Product Engineer"

### Recommended H1 (SEO-Optimized, Premium Tone)

**EN:** "WordPress Consultant & Product Engineer — Technical Architecture & Product Execution"  
**FR:** "Consultant WordPress & Product Engineer — Architecture technique et exécution produit"

**Rationale:**

- Includes "WordPress consultant" (high search volume)
- Maintains premium "Product Engineer" positioning
- Adds "Technical Architecture" (target keyword)
- Keeps professional tone

### Current H2 Sections

1. "One partner for roadmap, architecture, and delivery." ✅ Good tagline
2. Section headings need keyword integration

### Recommended H2 Optimization

- Keep existing structure
- Ensure at least one H2 includes "WordPress" or "Quebec" naturally
- Example: "WordPress Architecture & System Design" (if applicable)

### Meta Title & Description

See fixes in STEP 1, Issue #3 and #5.

---

## 📍 STEP 4 — Local SEO (GEO)

### Current State

- "Quebec" mentioned in meta description
- No explicit geo-targeting meta tags
- No location schema in Person schema

### Enhancements Needed

#### 1. Add Geo Meta Tags

```html
<meta name="geo.region" content="CA-QC" />
<meta name="geo.placename" content="Quebec, Montreal" />
<meta name="geo.position" content="45.5017;-73.5673" />
<meta name="ICBM" content="45.5017, -73.5673" />
```

#### 2. Enhance Person Schema with Location

```json
{
  "@type": "Person",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "QC",
    "addressCountry": "CA",
    "addressLocality": "Montreal"
  }
}
```

#### 3. Add WebSite Schema with Geo

```json
{
  "@type": "WebSite",
  "name": "Luc Rousseau",
  "url": "https://lucrousseau.com",
  "description": "WordPress consultant & Product Engineer in Quebec",
  "inLanguage": ["en-CA", "fr-CA"],
  "areaServed": {
    "@type": "Country",
    "name": "Canada"
  }
}
```

#### 4. Content Integration

- Naturally mention "Quebec", "Montreal", "Canada" in body content
- Add location context in About section
- Include "remote" for broader reach

---

## 🔗 STEP 5 — Content Strategy & Internal Linking

### Blog Topics (5-10 Articles)

#### High-Value Topics

1. **"WordPress Architecture: When to Go Headless vs. Traditional"**
   - Keywords: WordPress architecture, headless WordPress, technical architecture
   - Intent: Informational
   - Internal links: → Services/Architecture page

2. **"Product Engineering vs. Traditional Development: What CTOs Need to Know"**
   - Keywords: Product engineer, fractional CTO, technical leadership
   - Intent: Informational
   - Internal links: → Services/Product Engineering

3. **"WordPress Performance Optimization: A Technical Deep Dive"**
   - Keywords: WordPress performance, optimization, technical architecture
   - Intent: Informational
   - Internal links: → Services, Homepage

4. **"Building Scalable WordPress Systems: Architecture Patterns"**
   - Keywords: WordPress scalability, system design, architecture
   - Intent: Informational
   - Internal links: → Services/Architecture

5. **"Fractional Product Engineering: When to Hire vs. Build In-House"**
   - Keywords: Fractional product engineer, product engineering consultant
   - Intent: Transactional
   - Internal links: → Services, Contact

6. **"WordPress Multisite: Architecture Decisions for Enterprise"**
   - Keywords: WordPress multisite, enterprise WordPress, architecture
   - Intent: Informational
   - Internal links: → Services

7. **"Technical Debt in WordPress: A Product Engineering Approach"**
   - Keywords: Technical debt, WordPress, product engineering
   - Intent: Informational
   - Internal links: → Homepage (debt section)

8. **"Remote Product Engineering: Working with Quebec-Based Teams"**
   - Keywords: Product engineer Quebec, remote technical leadership
   - Intent: Informational (with geo-targeting)
   - Internal links: → About, Services

### Internal Linking Structure

```
Homepage
  ├─→ Services (when created)
  ├─→ About
  ├─→ Blog posts (when created)
  └─→ Contact

Services Pages
  ├─→ Homepage (backlink)
  ├─→ Related service pages
  ├─→ Blog posts (contextual)
  └─→ Contact

Blog Posts
  ├─→ Homepage
  ├─→ Relevant service pages
  ├─→ Related blog posts
  └─→ Contact (in CTA)
```

### Article Outline Example

**Article 1: "WordPress Architecture: When to Go Headless vs. Traditional"**

```
H1: WordPress Architecture: When to Go Headless vs. Traditional

H2: Understanding the Trade-offs
  H3: Traditional WordPress: When It Works
  H3: Headless WordPress: When It Makes Sense

H2: Architecture Decision Framework
  H3: Performance Requirements
  H3: Team Structure & Skills
  H3: Long-term Maintenance

H2: Real-World Case Studies
  H3: Enterprise Multisite (Traditional)
  H3: High-Traffic API (Headless)

H2: Making the Decision
  H3: Questions to Ask Your Team
  H3: When to Consult a Technical Architect

CTA: Need help with WordPress architecture decisions? [Link to Services/Contact]
```

---

## ⚡ STEP 6 — Performance Optimization

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Current Risks (To Audit)

1. **Image Loading**
   - Verify all images use `next/image` with proper optimization
   - Check WebP conversion
   - Ensure lazy loading where appropriate

2. **Font Loading**
   - Check font-display strategy
   - Verify font subsetting if applicable

3. **JavaScript**
   - Audit blocking scripts
   - Verify code splitting
   - Check bundle sizes

4. **CSS**
   - Verify critical CSS extraction
   - Check unused CSS

### Recommended Fixes (After Audit)

1. **Image Optimization**
   - Ensure all images use `next/image`
   - Add `priority` only to above-the-fold images
   - Use `loading="lazy"` for below-the-fold

2. **Font Strategy**
   - Add `font-display: swap` or `optional`
   - Preload critical fonts

3. **Script Optimization**
   - Defer non-critical scripts
   - Use dynamic imports for heavy components

4. **CSS Optimization**
   - Audit and remove unused styles
   - Consider CSS-in-JS for critical above-the-fold styles

---

## 🎯 Implementation Priority

### Phase 1 (Immediate — High Impact)

1. ✅ Fix meta titles & descriptions (add keywords)
2. ✅ Add WebSite schema (JSON-LD)
3. ✅ Enhance Person schema with location
4. ✅ Add geo meta tags
5. ✅ Optimize H1 with keywords

### Phase 2 (Short-term — Medium Impact)

6. Add service pages (3-5 pages)
7. Implement internal linking
8. Content keyword optimization

### Phase 3 (Medium-term — Authority Building)

9. Launch blog with 3-5 initial articles
10. Expand internal linking network
11. Performance optimization (Core Web Vitals)

---

## 📊 Expected Outcomes

### SEO Improvements

- Better ranking for "WordPress consultant Quebec"
- Improved visibility for "Product engineer consultant"
- Local search presence (Quebec/Montreal)
- Enhanced authority through content

### Conversion Improvements

- Clearer value proposition in meta descriptions
- Better keyword alignment with search intent
- Improved trust signals (schema, geo-targeting)

### Maintained Positioning

- Premium "Product Engineer" tone preserved
- No generic freelancer language
- Strategic, high-end positioning maintained

---

## 📝 Notes

- All changes maintain the premium positioning
- No "cheap marketing" language
- Focus on business impact, not just technical skills
- Keep content concise, sharp, credible for CTO/CEO audience
