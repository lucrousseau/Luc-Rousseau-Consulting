# Performance Optimization Audit — Core Web Vitals

**Date:** March 2026  
**Objective:** Improve Core Web Vitals for better SEO rankings and user experience.

---

## 🎯 Core Web Vitals Targets

| Metric                             | Target  | Current (To Measure) | Priority |
| ---------------------------------- | ------- | -------------------- | -------- |
| **LCP (Largest Contentful Paint)** | < 2.5s  | TBD                  | High     |
| **FID (First Input Delay)**        | < 100ms | TBD                  | High     |
| **CLS (Cumulative Layout Shift)**  | < 0.1   | TBD                  | High     |

---

## 🔍 Current State Analysis

### Image Optimization

#### ✅ What's Working

- Using `next/image` component for automatic optimization
- WebP conversion script in place (`scripts/convert-images.js`)
- Images colocated with components/sections
- `loading="eager"` on hero image (above-the-fold)
- `sizes` attribute on hero image

#### ⚠️ Potential Issues

1. **Hero Image Loading**
   - Current: `loading={"eager"}` on profile photo
   - Risk: Large image may delay LCP
   - Fix: Ensure image is properly optimized, consider `priority` prop

2. **Below-the-Fold Images**
   - Need to verify all below-the-fold images use `loading="lazy"`
   - Check if `priority` is only used for above-the-fold

3. **Image Sizes**
   - Verify `sizes` attribute is optimal for all responsive images
   - Check if images are served at appropriate resolutions

#### 🔧 Recommended Fixes

**1. Hero Image Optimization**

```jsx
// sections/HomeHero/index.js
<Picture
  src={lucProfilPhoto}
  width={600}
  height={600}
  alt={"Luc Rousseau — WordPress Consultant & Product Engineer"}
  rounded={true}
  priority={true} // Add priority for LCP
  sizes={"(max-width: 600px) 100vw, 400px"}
/>
```

**2. Verify Lazy Loading**

- All images below the fold should have `loading="lazy"` (default in next/image)
- Only hero/above-fold images should use `priority={true}`

**3. Image Format**

- Ensure WebP versions exist for all images
- Verify `next/image` serves WebP when supported

---

### Font Loading

#### Current State

- Need to verify font loading strategy
- Check `font-display` property
- Verify font subsetting if applicable

#### 🔧 Recommended Fixes

**1. Font Display Strategy**

```css
/* In font-face declarations or CSS */
@font-face {
  font-family: "YourFont";
  src: url("font.woff2") format("woff2");
  font-display: swap; /* or 'optional' for non-critical fonts */
}
```

**2. Preload Critical Fonts**

```jsx
// In _app.js or _document.js
<Head>
  <link
    rel="preload"
    href="/fonts/critical-font.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
</Head>
```

**3. Font Subsetting**

- Consider subsetting fonts to include only used characters
- Reduces font file size significantly

---

### JavaScript Optimization

#### Current State

- Next.js handles code splitting automatically
- Need to verify bundle sizes
- Check for blocking scripts

#### 🔧 Recommended Fixes

**1. Dynamic Imports for Heavy Components**

```jsx
// For components not needed immediately
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("../components/Heavy"), {
  loading: () => <p>Loading...</p>,
  ssr: false, // If not needed for SSR
});
```

**2. Verify Bundle Sizes**

```bash
# Analyze bundle
npm run build
# Check .next/analyze for bundle breakdown
```

**3. Defer Non-Critical Scripts**

- Analytics (Vercel Analytics) should be deferred
- Verify third-party scripts are async/deferred

---

### CSS Optimization

#### Current State

- SCSS compiled to CSS
- Global styles in `styles/main.scss`
- Component/section styles colocated

#### 🔧 Recommended Fixes

**1. Critical CSS Extraction**

- Consider extracting critical above-the-fold CSS
- Inline critical CSS in `<head>`
- Load remaining CSS asynchronously

**2. Remove Unused CSS**

- Audit CSS for unused styles
- Consider tools like PurgeCSS (if not already in use)
- Verify no duplicate styles

**3. CSS-in-JS for Critical Styles**

- Consider CSS-in-JS for critical above-the-fold styles
- Reduces initial CSS payload

---

### Third-Party Scripts

#### Current State

- Vercel Analytics
- Vercel Speed Insights
- Need to verify impact on performance

#### 🔧 Recommended Fixes

**1. Defer Analytics**

```jsx
// Analytics should load after page is interactive
<Script
  src="analytics.js"
  strategy="afterInteractive" // or "lazyOnload"
/>
```

**2. Verify Third-Party Impact**

- Use Lighthouse to measure impact
- Consider loading third-party scripts after user interaction

---

## 📊 Performance Audit Checklist

### Images

- [ ] All images use `next/image`
- [ ] Hero image has `priority={true}`
- [ ] Below-the-fold images use lazy loading (default)
- [ ] WebP versions exist for all images
- [ ] `sizes` attribute is optimal for responsive images
- [ ] Images are served at appropriate resolutions

### Fonts

- [ ] `font-display: swap` or `optional` is set
- [ ] Critical fonts are preloaded
- [ ] Font subsetting considered (if applicable)
- [ ] Font files are optimized (woff2 format)

### JavaScript

- [ ] Bundle sizes are reasonable (< 200KB initial JS)
- [ ] Heavy components use dynamic imports
- [ ] Third-party scripts are deferred/async
- [ ] Code splitting is working effectively

### CSS

- [ ] Critical CSS is extracted (if applicable)
- [ ] Unused CSS is removed
- [ ] CSS is minified
- [ ] No duplicate styles

### General

- [ ] Lighthouse score > 90 (Performance)
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] TTI (Time to Interactive) < 3.5s

---

## 🚀 Implementation Priority

### Phase 1: Quick Wins (Immediate)

1. ✅ Add `priority` to hero image
2. ✅ Verify lazy loading on below-the-fold images
3. ✅ Add `font-display: swap` to fonts
4. ✅ Verify WebP conversion for all images

### Phase 2: Optimization (Short-term)

5. Preload critical fonts
6. Audit and optimize bundle sizes
7. Defer non-critical scripts
8. Remove unused CSS

### Phase 3: Advanced (Medium-term)

9. Critical CSS extraction
10. Font subsetting
11. Advanced image optimization
12. Service worker for caching (if applicable)

---

## 📝 Measurement & Monitoring

### Tools

- **Lighthouse:** Run in Chrome DevTools
- **PageSpeed Insights:** Google's tool
- **WebPageTest:** Detailed waterfall analysis
- **Vercel Analytics:** Real-world performance data

### Metrics to Track

- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- TTI (Time to Interactive)
- Total Blocking Time
- First Contentful Paint (FCP)

### Regular Audits

- Run Lighthouse audit monthly
- Monitor Core Web Vitals in Google Search Console
- Track performance regression in CI/CD

---

## 🎯 Expected Outcomes

### Performance Improvements

- LCP < 2.5s (from current baseline)
- FID < 100ms
- CLS < 0.1
- Lighthouse Performance score > 90

### SEO Benefits

- Better Core Web Vitals = better search rankings
- Improved user experience = lower bounce rate
- Faster pages = better conversion rates

### User Experience

- Faster page loads
- Smoother interactions
- Better mobile experience
- Improved accessibility

---

## 📌 Notes

- All optimizations should maintain current functionality
- Test thoroughly after each change
- Monitor real-world performance, not just lab metrics
- Balance optimization with maintainability
