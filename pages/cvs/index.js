import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import CvHub from "../../sections/CvHub";
import CvPageLayout from "../../sections/CvPageLayout";

/**
 * Private CV index. Noindex + omitted from the sitemap.
 * Bookmark for yourself; do not send to recruiters.
 */
export default function CvsIndexPage() {
  const { t } = useTranslation(["cv-hub", "common"]);

  return (
    <CvPageLayout seoTitle={t("cv-hub:seoTitle")} mainClassName="page-cvs">
      <CvHub />
    </CvPageLayout>
  );
}

export const getStaticProps = async ({ locale }) => {
  // Dev-only: bust next-i18next server cache so locale JSON edits apply without restart.
  if (process.env.NODE_ENV === "development") {
    try {
      const resolved = require.resolve("next-i18next/dist/commonjs/createClient/node.js");
      /* eslint-disable security/detect-object-injection -- resolved from require.resolve */
      if (require.cache[resolved]) {
        delete require.cache[resolved];
      }
      /* eslint-enable security/detect-object-injection */
    } catch {
      // Ignore if module path or cache clear fails
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ["cv-hub", "common"])),
    },
    revalidate: 86400,
  };
};
