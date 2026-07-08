import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Cv from "../../sections/Cv";
import CvPageLayout from "../../sections/CvPageLayout";

/**
 * CV variant positioned for senior full stack / WordPress-and-React roles.
 * Noindex + omitted from the sitemap; shared privately for applications.
 */
export default function CvDevPage() {
  const { t } = useTranslation(["cv-dev", "cv", "common"]);

  return (
    <CvPageLayout seoTitle={t("cv-dev:seoTitle")}>
      <Cv variant="dev" />
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
      ...(await serverSideTranslations(locale, ["cv-dev", "cv", "common"])),
    },
    revalidate: 86400,
  };
};
