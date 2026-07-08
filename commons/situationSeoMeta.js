/**
 * Read situation SEO copy from locale JSON (Node / API routes only).
 * JSON is bound to manifest namespaces via static requires (no runtime path assembly).
 */
const { EXPERTISE_PAGES } = require("./expertiseManifest");
const { SITUATIONS } = require("./situationsManifest");

const ALLOWED_LOCALES = new Set(["fr", "en"]);

/** @type {Map<string, Record<string, unknown>>} */
const namespaceJsonByLocale = new Map();

/**
 * @param {string} namespace
 * @returns {{ fr: Record<string, unknown>; en: Record<string, unknown> }}
 */
function getNamespaceBundle(namespace) {
  switch (namespace) {
    case "situation-premier-dev-fractionnel":
      return {
        fr: require("../public/locales/fr/situation-premier-dev-fractionnel.json"),
        en: require("../public/locales/en/situation-premier-dev-fractionnel.json"),
      };
    case "situation-dev-unique-backup":
      return {
        fr: require("../public/locales/fr/situation-dev-unique-backup.json"),
        en: require("../public/locales/en/situation-dev-unique-backup.json"),
      };
    case "situation-product-manager-fractionnel":
      return {
        fr: require("../public/locales/fr/situation-product-manager-fractionnel.json"),
        en: require("../public/locales/en/situation-product-manager-fractionnel.json"),
      };
    case "situation-refonte-produit-par-phases":
      return {
        fr: require("../public/locales/fr/situation-refonte-produit-par-phases.json"),
        en: require("../public/locales/en/situation-refonte-produit-par-phases.json"),
      };
    case "situation-plateforme-editoriale-produit":
      return {
        fr: require("../public/locales/fr/situation-plateforme-editoriale-produit.json"),
        en: require("../public/locales/en/situation-plateforme-editoriale-produit.json"),
      };
    case "situation-mvp-saas-faisabilite":
      return {
        fr: require("../public/locales/fr/situation-mvp-saas-faisabilite.json"),
        en: require("../public/locales/en/situation-mvp-saas-faisabilite.json"),
      };
    case "situation-ia-produit-garde-fous":
      return {
        fr: require("../public/locales/fr/situation-ia-produit-garde-fous.json"),
        en: require("../public/locales/en/situation-ia-produit-garde-fous.json"),
      };
    case "expertise-wordpress-produit-editorial":
      return {
        fr: require("../public/locales/fr/expertise-wordpress-produit-editorial.json"),
        en: require("../public/locales/en/expertise-wordpress-produit-editorial.json"),
      };
    default:
      throw new Error(`Unknown namespace: ${namespace}`);
  }
}

function buildNamespaceJsonCache() {
  for (const entry of [...SITUATIONS, ...EXPERTISE_PAGES]) {
    const bundle = getNamespaceBundle(entry.namespace);
    namespaceJsonByLocale.set(`fr:${entry.namespace}`, bundle.fr);
    namespaceJsonByLocale.set(`en:${entry.namespace}`, bundle.en);
  }
}

buildNamespaceJsonCache();

/**
 * @param {string} locale
 * @param {string} namespace e.g. situation-premier-dev-fractionnel
 */
function loadSituationNamespaceJson(locale, namespace) {
  if (!ALLOWED_LOCALES.has(locale)) {
    throw new Error(`Unknown locale: ${locale}`);
  }

  const data = namespaceJsonByLocale.get(`${locale}:${namespace}`);
  if (!data) {
    throw new Error(`Unknown namespace: ${namespace}`);
  }

  return data;
}

/**
 * @param {unknown} title
 * @returns {string}
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
  const data =
    /** @type {{ hero?: { title?: string; quote?: string }; seoTitle?: string; seoDescription?: string }} */ (
      loadSituationNamespaceJson(locale, namespace)
    );
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
