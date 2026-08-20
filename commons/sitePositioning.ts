/**
 * Canonical homepage SEO and positioning strings (FR/EN).
 * Keep public/locales/{locale}/home.json in sync; sitePositioning.test.ts enforces it.
 */

export const HOME_SEO = Object.freeze({
  fr: Object.freeze({
    jobTitle: "Product Builder, consultant externe produit et développeur senior",
    description:
      "Product Builder et consultant externe, produit et développeur senior au Québec, Canada. Vision produit, architecture technique et développement sur mesure pour équipes en croissance : APIs, systèmes découpés, Laravel, WordPress headless et plateformes éditoriales à l'échelle, React/Vue. 20+ ans. Mandat externe récurrent (forfait), profil freelance ou pigiste senior dans la durée. Montréal et à distance.",
  }),
  en: Object.freeze({
    jobTitle: "Product Builder & external consultant",
    description:
      "Product Builder and external consultant in Quebec, Canada. Architecture for growth-stage teams: APIs, decoupled systems, Laravel, headless WordPress and editorial platforms at scale, React/Vue. 20+ years. Recurring retainer, senior freelancer or contractor profile over time. Montreal & remote.",
  }),
});

export function getHomeSeoCopy(locale: string): { jobTitle: string; description: string } {
  return locale === "en" ? HOME_SEO.en : HOME_SEO.fr;
}
