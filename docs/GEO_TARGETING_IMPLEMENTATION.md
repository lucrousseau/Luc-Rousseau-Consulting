# Geo-Targeting Implementation — Quebec/Canada

**Date:** March 2026  
**Status:** ✅ Implemented

---

## 🎯 Objective

Enhance local SEO targeting for Quebec and Canada through multiple geo-targeting methods.

---

## ✅ What's Been Implemented

### 1. Geo Sitemap (Enhanced sitemap.xml)

**File:** `pages/api/sitemap.js`

- Added `geo:geo` namespace to sitemap
- Each URL includes geo annotations referencing KML format
- Helps Google understand geographic relevance

**XML Structure:**

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:geo="http://www.google.com/geo/schemas/sitemap/1.0">
  <url>
    <loc>https://lucrousseau.com/</loc>
    <geo:geo>
      <geo:format>kml</geo:format>
    </geo:geo>
  </url>
</urlset>
```

### 2. KML File (Geographic Location Data)

**File:** `public/geo.kml`

- Standard KML format for geographic data
- Contains coordinates for Montreal, Quebec (45.5017, -73.5673)
- Accessible at `/geo.kml`
- Referenced in sitemap for geo-targeting

**Content:**

- Placemark: Montreal, Quebec, Canada
- Coordinates: -73.5673 (longitude), 45.5017 (latitude)
- Description: Product Engineer services — Quebec & Canada

### 3. Geo Meta Tags (Already Implemented)

**File:** `components/SEO/index.js`

- `geo.region`: CA-QC (Quebec, Canada)
- `geo.placename`: Quebec, Montreal
- `geo.position`: 45.5017;-73.5673
- `ICBM`: 45.5017, -73.5673

### 4. Schema Markup with Location (Already Implemented)

**File:** `components/SEO/index.js`

- Person schema includes address (Quebec, Montreal, Canada)
- WebSite schema includes `areaServed: Canada`
- Language targeting: `en-CA`, `fr-CA`

---

## 📍 Geographic Targeting Strategy

### Primary Target

- **Region:** Quebec, Canada
- **City:** Montreal
- **Coordinates:** 45.5017°N, 73.5673°W

### Secondary Target

- **Country:** Canada (broader reach)
- **Remote:** Services available remotely (mentioned in content)

---

## 🔍 How It Works

### 1. Sitemap Geo Annotations

- Google crawls `/sitemap.xml`
- Sees `geo:geo` namespace and KML format reference
- Understands pages are relevant to Quebec/Canada

### 2. KML File Discovery

- KML file at `/geo.kml` provides precise location data
- Can be discovered via sitemap or direct access
- Provides geographic context for the entire site

### 3. Meta Tags

- Browser and search engines read geo meta tags
- Reinforces geographic targeting at page level

### 4. Schema Markup

- Structured data tells search engines about location
- Person schema: address in Quebec/Montreal
- WebSite schema: area served = Canada

---

## 📊 Expected SEO Impact

### Local Search Visibility

- Better ranking for "Product Engineer Quebec"
- Improved visibility for "Product Engineer Montreal"
- Enhanced local search presence

### Geographic Signals

- Multiple signals reinforce Quebec/Canada targeting
- Consistent geographic data across all methods
- Clear location signals for search engines

### Search Intent Matching

- Users searching "Product Engineer Quebec" see relevant results
- Geographic relevance clearly communicated
- Better match with local search queries

---

## 🔧 Technical Details

### Files Modified/Created

1. **`pages/api/sitemap.js`**
   - Added `geo:geo` namespace
   - Added geo annotations to URLs

2. **`public/geo.kml`** (New)
   - KML file with Montreal coordinates
   - Geographic location data

3. **`pages/api/robots.txt`** (Updated)
   - Added comment referencing KML file

4. **`components/SEO/index.js`** (Already done)
   - Geo meta tags
   - Schema with location

---

## ✅ Verification Checklist

- [x] Geo sitemap namespace added
- [x] KML file created with correct coordinates
- [x] Geo meta tags in place
- [x] Schema markup with location
- [x] KML file accessible at `/geo.kml`
- [x] Sitemap includes geo annotations

---

## 🚀 Next Steps (Optional)

### Google Search Console

1. Submit sitemap to Google Search Console
2. Verify geographic targeting in Search Console
3. Monitor local search performance

### Google My Business (If Applicable)

- If you have a physical location or want to set up GMB
- KML file can be used for location verification

### Additional Geo Signals

- Consider adding location-specific content
- Mention Quebec/Montreal naturally in content
- Add location to footer (if not already present)

---

## 📝 Notes

- All geo-targeting methods work together for maximum impact
- Consistent geographic data across all signals
- Maintains premium positioning while adding local SEO
- Remote services still accessible (mentioned in content)

---

**Implementation Complete:** March 2026
