declare module "*next-i18next.config.js" {
  const nextI18NextConfig: {
    reloadOnPrerender: boolean;
    i18n: {
      defaultLocale: string;
      locales: string[];
      localeDetection: boolean;
    };
    localePath: string;
    localeStructure: string;
  };

  export default nextI18NextConfig;
}
