const path = require("path");

/**
 * Shared next-i18next config for the Pages Router.
 * localePath must stay on the filesystem for serverSideTranslations;
 * on Vercel those files are pulled into the serverless bundle via
 * outputFileTracingIncludes in next.config.mjs.
 */
module.exports = {
  reloadOnPrerender: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    localeDetection: false,
  },
  localePath: typeof window === "undefined" ? path.resolve("./public/locales") : "/locales",
  localeStructure: "{{lng}}/{{ns}}",
};
