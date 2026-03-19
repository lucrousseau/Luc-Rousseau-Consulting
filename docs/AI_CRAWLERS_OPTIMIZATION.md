# AI Crawlers Optimization — ChatGPT, Claude, Perplexity

**Date:** March 2026  
**Status:** ✅ Implemented

---

## 🎯 Objective

Optimize the site for AI crawlers and agents (ChatGPT, Claude, Perplexity, etc.) to ensure they can discover, understand, and accurately represent the site's content and services.

---

## ✅ What's Already in Place

### 1. Schema Markup (JSON-LD)

- **Person schema** with job title, location, contact info
- **WebSite schema** with description, language, area served
- Structured data helps AI understand the site's purpose

### 2. Meta Tags

- Clear title and description tags
- Open Graph tags for social sharing
- Geo-targeting meta tags

### 3. Semantic HTML

- Proper heading structure (H1, H2, H3)
- Semantic HTML elements
- Clear content hierarchy

### 4. Robots.txt

- Allows all crawlers (`Allow: /`)
- References sitemap for discovery

### 5. Sitemap

- Dynamic sitemap with all pages
- Helps AI crawlers discover all content

---

## 🆕 What's Been Added

### ai.txt File

**File:** `pages/api/ai.txt.js`  
**Accessible at:** `/.well-known/ai.txt` and `/ai.txt`

**Purpose:** Provides structured information specifically for AI crawlers and agents.

**Content Includes:**

- Site information (name, title, description)
- Location (Quebec, Canada, Montreal)
- Services offered
- Languages (EN/FR)
- Key pages
- Contact information
- Engagement model (retainer-based)
- Expertise areas
- Sitemap reference

**Format:** Plain text, structured with clear labels and sections.

---

## 🤖 How AI Crawlers Use This

### 1. Discovery

- AI crawlers check for `/.well-known/ai.txt` or `/ai.txt`
- Similar to how search engines check `robots.txt`
- Provides quick overview without crawling entire site

### 2. Understanding

- Clear description of services and expertise
- Location information for geographic queries
- Engagement model (retainer-based, not hourly)
- Languages available (EN/FR)

### 3. Accuracy

- Prevents AI from misrepresenting services
- Ensures correct information about engagement model
- Clear about what's NOT available (hourly, one-off projects)

---

## 📊 Expected Benefits

### For AI Agents

- **Faster discovery:** AI can quickly understand the site's purpose
- **Accurate representation:** AI has correct information about services
- **Better context:** Location, languages, and engagement model clearly stated

### For Users

- **Better AI responses:** When users ask AI about "Product Engineer Quebec", responses will be accurate
- **Correct referrals:** AI will correctly describe services and engagement model
- **Geographic accuracy:** AI knows the location and can provide relevant context

---

## 🔍 Verification

### Test ai.txt

1. Visit `https://lucrousseau.com/.well-known/ai.txt`
2. Visit `https://lucrousseau.com/ai.txt`
3. Both should return structured information

### Test with AI

1. Ask ChatGPT/Claude: "Tell me about Luc Rousseau, Product Engineer"
2. Ask: "What services does lucrousseau.com offer?"
3. Ask: "Where is Luc Rousseau based?"

Expected: AI should provide accurate information based on ai.txt and schema markup.

---

## 📝 Complete AI Optimization Checklist

### ✅ Implemented

- [x] Schema markup (Person, WebSite)
- [x] Clear meta tags (title, description)
- [x] Semantic HTML structure
- [x] Robots.txt (allows all crawlers)
- [x] Sitemap (all pages discoverable)
- [x] **ai.txt file (NEW)**
- [x] Geo-targeting (location clearly stated)
- [x] Language tags (EN/FR)

### ✅ Content Quality

- [x] Clear value proposition
- [x] Services clearly described
- [x] Engagement model explained
- [x] Contact information available
- [x] Location information present

---

## 🚀 Best Practices for AI Crawlers

### 1. Structured Data

- ✅ Schema.org markup (Person, WebSite)
- ✅ Clear meta tags
- ✅ Semantic HTML

### 2. Clear Information

- ✅ ai.txt with structured information
- ✅ Clear descriptions in content
- ✅ Explicit about services and engagement model

### 3. Accessibility

- ✅ Robots.txt allows crawlers
- ✅ Sitemap for discovery
- ✅ ai.txt for quick reference

### 4. Accuracy

- ✅ Correct location information
- ✅ Accurate service descriptions
- ✅ Clear about what's NOT offered

---

## 📌 Notes

- ai.txt is an emerging standard (similar to robots.txt)
- Not all AI crawlers use it yet, but it's becoming more common
- Works alongside schema markup and meta tags
- Provides human-readable structured information
- Helps prevent AI from misrepresenting services

---

## 🔗 References

- [ai.txt specification](https://ai.txt.org/)
- Schema.org documentation
- OpenAI crawler documentation
- Anthropic (Claude) crawler information

---

**Implementation Complete:** March 2026
