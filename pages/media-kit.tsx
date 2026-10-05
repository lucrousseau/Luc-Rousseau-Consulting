import { statSync } from "node:fs";
import path from "node:path";

import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";

import mediaKit from "../commons/mediaKit.json";
import { serverSideTranslations } from "../commons/serverSideTranslations";
import Container from "../components/Layout/Container";
import SEO from "../components/SEO";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import MediaKit, { type MediaKitGroup } from "../sections/MediaKit";

/**
 * Brand media kit: public and downloadable, but kept out of search on purpose.
 * Noindex meta here, `X-Robots-Tag` on the page and its files (lib/noindexHeaders.mjs),
 * absent from the sitemap, the navigation and the footer, and NOT disallowed in robots.txt.
 */
export default function MediaKitPage({ groups }: { groups: MediaKitGroup[] }) {
  const { t } = useTranslation(["media-kit", "common"]);

  return (
    <>
      <SEO title={t("media-kit:seo-title")} noindex />
      <Container tag="header" style={{ "--padding-top": "1rem", "--padding-bottom": "1rem" }}>
        <Header showNavigation showCta={false} />
      </Container>
      <main className="page-media-kit">
        <MediaKit groups={groups} />
      </main>
      <Container tag="footer" style={{ "--padding-top": "1rem", "--padding-bottom": "1rem" }}>
        <Footer />
      </Container>
    </>
  );
}

function formatSize(bytes: number, locale: string): string {
  const kilobytes = bytes / 1024;
  const value = new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    maximumFractionDigits: kilobytes < 10 ? 1 : 0,
  }).format(kilobytes);
  return locale === "fr" ? `${value} ko` : `${value} KB`;
}

/**
 * Static at build. Do NOT add `revalidate`: file sizes are read from public/, which exists
 * at build time but not inside a Vercel function, so an ISR regeneration would throw.
 */
export const getStaticProps: GetStaticProps = async ({ locale = "fr" }) => {
  const publicDir = path.join(process.cwd(), "public", "media-kit");
  const groups: MediaKitGroup[] = mediaKit.groups.map((group) => ({
    id: group.id,
    files: group.files.map(({ source: _source, ...item }) => ({
      ...item,
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      size: formatSize(statSync(path.join(publicDir, item.file)).size, locale),
    })),
  }));

  return {
    props: {
      groups,
      ...(await serverSideTranslations(locale, ["media-kit", "common"])),
    },
  };
};
