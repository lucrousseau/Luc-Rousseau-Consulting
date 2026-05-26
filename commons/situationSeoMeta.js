/**
 * Read situation SEO copy from locale JSON (Node / API routes only).
 */
const fs = require("fs");
const path = require("path");

const LOCALES_DIR = path.join(process.cwd(), "public", "locales");

/**
 * @param {string} locale
 * @param {string} namespace e.g. situation-premier-dev-fractionnel
 */
function loadSituationNamespaceJson(locale, namespace) {
  const filePath = path.join(LOCALES_DIR, locale, `${namespace}.json`);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

/**
 * @param {string} title
 */
function stripBrandSuffix(title) {
  if (typeof title !== "string") {
    return "";
  }
  return title.replace(/\s*\|\s*Luc Rousseau\s*$/i, "").trim();
}

/**
 * @param {string} locale
 * @param {string} namespace
 */
function getNamespaceSeo(locale, namespace) {
  const data = loadSituationNamespaceJson(locale, namespace);
  return {
    headline: data.hero?.title ?? stripBrandSuffix(data.seoTitle),
    voiceQuote: data.hero?.quote ?? "",
    metaTitle: data.seoTitle ?? "",
    description: data.seoDescription ?? "",
  };
}

/**
 * @param {string} locale
 * @param {string} namespace
 */
function getSituationSeo(locale, namespace) {
  return getNamespaceSeo(locale, namespace);
}

/**
 * @param {string} locale
 * @param {string} namespace
 */
function getExpertiseSeo(locale, namespace) {
  return getNamespaceSeo(locale, namespace);
}

module.exports = {
  getNamespaceSeo,
  getSituationSeo,
  getExpertiseSeo,
  stripBrandSuffix,
};
