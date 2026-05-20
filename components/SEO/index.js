import Head from "next/head";
import { useRouter } from "next/router";

import { getDefaultOgImage } from "../../commons/defaultOgImage";
import { absoluteUrl, localizedPath } from "../../commons/localizedPath";
import { getSiteOrigin } from "../../utils/siteOrigin";

const SITE_NAME = "Luc Rousseau";

const SEO = ({ title, description, image, sameAs, jsonLd = [], path }) => {
  const base = getSiteOrigin();
  const router = useRouter();
  const { locale, pathname, asPath, defaultLocale } = router;
  const defaultLoc = defaultLocale ?? "fr";
  const pathOnly =
    path ??
    (pathname && !pathname.includes("[")
      ? pathname
      : (typeof asPath === "string" ? asPath.split("?")[0] : null) || pathname || "/");

  const canonicalPath = localizedPath(locale, defaultLoc, pathOnly);
  const canonical = absoluteUrl(base, canonicalPath);
  const siteHome = absoluteUrl(base, "/");

  const ogImagePath =
    typeof image === "string" && image.startsWith("/") ? image : getDefaultOgImage(locale);
  const ogImage = `${base}${ogImagePath}`;

  const ogLocale = locale === "fr" ? "fr_CA" : "en_CA";
  const ogLocaleAlternate = locale === "fr" ? "en_CA" : "fr_CA";
  const alternateEn = absoluteUrl(base, localizedPath("en", defaultLoc, pathOnly));
  const alternateFr = absoluteUrl(base, localizedPath("fr", defaultLoc, pathOnly));
  const alternateDefault = absoluteUrl(base, localizedPath(defaultLoc, defaultLoc, pathOnly));

  const jsonLdPerson =
    sameAs && sameAs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE_NAME,
          url: siteHome,
          sameAs: sameAs,
          jobTitle:
            locale === "fr" ? "Consultant produit et développeur senior" : "Product Engineer",
          address: {
            "@type": "PostalAddress",
            addressRegion: "QC",
            addressCountry: "CA",
            addressLocality: "Montreal",
          },
        }
      : null;

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteHome,
    description:
      locale === "fr"
        ? "Consultant produit et développeur senior au Québec, Canada. Vision produit, architecture technique et développement sur mesure : APIs, systèmes découpés, Laravel, WordPress headless quand l'édition l'exige, React/Vue."
        : "Product Engineer in Quebec, Canada. Product-facing architecture and APIs, decoupled systems, Laravel, WordPress headless when editorial scale demands it, React/Vue. Systems at scale.",
    inLanguage: [locale === "fr" ? "fr-CA" : "en-CA"],
    areaServed: [
      {
        "@type": "Country",
        name: "Canada",
      },
      {
        "@type": "State",
        name: "Quebec",
      },
      {
        "@type": "City",
        name: "Montreal",
      },
    ],
  };

  const extraSchemas = Array.isArray(jsonLd) ? jsonLd.filter(Boolean) : [];

  return (
    <Head>
      <title>{title}</title>
      {jsonLdPerson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      {extraSchemas.map((schema, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta name="geo.region" content="CA-QC" />
      <meta name="geo.placename" content="Quebec, Montreal" />
      <meta name="geo.position" content="45.5017;-73.5673" />
      <meta name="ICBM" content="45.5017, -73.5673" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlternate} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="alternate" hrefLang="en" href={alternateEn} />
      <link rel="alternate" hrefLang="fr" href={alternateFr} />
      <link rel="alternate" hrefLang="x-default" href={alternateDefault} />

      <link rel="apple-touch-icon" sizes="180x180" href={`${base}/favicon/apple-touch-icon.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`${base}/favicon/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${base}/favicon/favicon-16x16.png`} />
      <link rel="manifest" href={`${base}/favicon/site.webmanifest`} />
    </Head>
  );
};

export default SEO;
