/**
 * Read situation SEO copy from locale JSON (Node / API routes only).
 * JSON is bound to manifest namespaces via static imports (no runtime path assembly).
 */
import { EXPERTISE_PAGES } from "./expertiseManifest";
import { SITUATIONS } from "./situationsManifest";

import expertiseWordpressFr from "../public/locales/fr/expertise-wordpress-produit-editorial.json";
import expertiseWordpressEn from "../public/locales/en/expertise-wordpress-produit-editorial.json";
import situationDevUniqueFr from "../public/locales/fr/situation-dev-unique-backup.json";
import situationDevUniqueEn from "../public/locales/en/situation-dev-unique-backup.json";
import situationIaFr from "../public/locales/fr/situation-ia-produit-garde-fous.json";
import situationIaEn from "../public/locales/en/situation-ia-produit-garde-fous.json";
import situationMvpFr from "../public/locales/fr/situation-mvp-saas-faisabilite.json";
import situationMvpEn from "../public/locales/en/situation-mvp-saas-faisabilite.json";
import situationPlateformeFr from "../public/locales/fr/situation-plateforme-editoriale-produit.json";
import situationPlateformeEn from "../public/locales/en/situation-plateforme-editoriale-produit.json";
import situationPmFr from "../public/locales/fr/situation-product-manager-fractionnel.json";
import situationPmEn from "../public/locales/en/situation-product-manager-fractionnel.json";
import situationPremierDevFr from "../public/locales/fr/situation-premier-dev-fractionnel.json";
import situationPremierDevEn from "../public/locales/en/situation-premier-dev-fractionnel.json";
import situationRefonteFr from "../public/locales/fr/situation-refonte-produit-par-phases.json";
import situationRefonteEn from "../public/locales/en/situation-refonte-produit-par-phases.json";

const ALLOWED_LOCALES = new Set(["fr", "en"]);

type LocaleJson = Record<string, unknown>;

const namespaceJsonByLocale = new Map<string, LocaleJson>();

function getNamespaceBundle(namespace: string): { fr: LocaleJson; en: LocaleJson } {
  switch (namespace) {
    case "situation-premier-dev-fractionnel":
      return { fr: situationPremierDevFr, en: situationPremierDevEn };
    case "situation-dev-unique-backup":
      return { fr: situationDevUniqueFr, en: situationDevUniqueEn };
    case "situation-product-manager-fractionnel":
      return { fr: situationPmFr, en: situationPmEn };
    case "situation-refonte-produit-par-phases":
      return { fr: situationRefonteFr, en: situationRefonteEn };
    case "situation-plateforme-editoriale-produit":
      return { fr: situationPlateformeFr, en: situationPlateformeEn };
    case "situation-mvp-saas-faisabilite":
      return { fr: situationMvpFr, en: situationMvpEn };
    case "situation-ia-produit-garde-fous":
      return { fr: situationIaFr, en: situationIaEn };
    case "expertise-wordpress-produit-editorial":
      return { fr: expertiseWordpressFr, en: expertiseWordpressEn };
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

function loadSituationNamespaceJson(locale: string, namespace: string): LocaleJson {
  if (!ALLOWED_LOCALES.has(locale)) {
    throw new Error(`Unknown locale: ${locale}`);
  }

  const data = namespaceJsonByLocale.get(`${locale}:${namespace}`);
  if (!data) {
    throw new Error(`Unknown namespace: ${namespace}`);
  }

  return data;
}

function stripBrandSuffix(title: unknown): string {
  if (typeof title !== "string") {
    return "";
  }
  return title.replace(/\s*\|\s*Luc Rousseau\s*$/i, "").trim();
}

type NamespaceSeoJson = {
  hero?: { title?: string; quote?: string };
  seoTitle?: string;
  seoDescription?: string;
};

function getNamespaceSeo(locale: string, namespace: string) {
  const data = loadSituationNamespaceJson(locale, namespace) as NamespaceSeoJson;
  return {
    headline: data.hero?.title ?? stripBrandSuffix(data.seoTitle),
    voiceQuote: data.hero?.quote ?? "",
    metaTitle: data.seoTitle ?? "",
    description: data.seoDescription ?? "",
  };
}

export function getSituationSeo(locale: string, namespace: string) {
  return getNamespaceSeo(locale, namespace);
}

export function getExpertiseSeo(locale: string, namespace: string) {
  return getNamespaceSeo(locale, namespace);
}

export { getNamespaceSeo, stripBrandSuffix };
