/**
 * Canonical homepage SEO and positioning strings (FR/EN).
 * Keep public/locales/{locale}/home.json in sync; sitePositioning.test.js enforces it.
 */

export const HOME_SEO = Object.freeze({
  fr: Object.freeze({
    jobTitle: "Consultant externe, produit et développeur senior",
    description:
      "Consultant externe, produit et développeur senior au Québec, Canada. Vision produit, architecture technique et développement sur mesure pour équipes en croissance : APIs, systèmes découpés, Laravel, WordPress headless et plateformes éditoriales à l'échelle, React/Vue. 20+ ans. Mandat externe récurrent (forfait), profil freelance ou pigiste senior dans la durée. Montréal et à distance.",
  }),
  en: Object.freeze({
    jobTitle: "External consultant & Product Engineer",
    description:
      "External consultant & Product Engineer in Quebec, Canada. Architecture for growth-stage teams: APIs, decoupled systems, Laravel, headless WordPress and editorial platforms at scale, React/Vue. 20+ years. Recurring retainer, senior freelancer or contractor profile over time. Montreal & remote.",
  }),
});

/**
 * @param {string} locale
 * @returns {{ jobTitle: string, description: string }}
 */
export function getHomeSeoCopy(locale) {
  const key = locale === "en" ? "en" : "fr";
  return HOME_SEO[key];
}
