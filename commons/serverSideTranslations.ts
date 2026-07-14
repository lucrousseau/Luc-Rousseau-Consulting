import { serverSideTranslations as loadServerSideTranslations } from "next-i18next/pages/serverSideTranslations";

import { nextI18NextConfig } from "./nextI18NextConfig";

/**
 * Always pass the config object so Vercel serverless does not need to
 * discover next-i18next.config.js via /var/task filesystem lookup.
 */
export async function serverSideTranslations(
  locale: string | undefined,
  namespaces: string[],
  extraLocales: string[] | false = false
) {
  return loadServerSideTranslations(locale ?? "fr", namespaces, nextI18NextConfig, extraLocales);
}
