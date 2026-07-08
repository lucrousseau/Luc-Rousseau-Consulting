const path = require("path");

module.exports = {
  reloadOnPrerender: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    localeDetection: false,
    localePath: path.resolve("./public/locales"),
    localeStructure: "{{lng}}/{{ns}}",
  },
};
