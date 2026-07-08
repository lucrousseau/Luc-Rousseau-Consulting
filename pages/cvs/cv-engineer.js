import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Cv from "../../sections/Cv";
import CvPageLayout from "../../sections/CvPageLayout";

/**
 * Product Engineer CV variant. Noindex: shareable for applications, kept out of
 * search and the sitemap. Content lives in the `cv` i18n namespace (fr/en).
 */
export default function CvEngineerPage() {
  const { t } = useTranslation(["cv", "common"]);

  return (
    <CvPageLayout seoTitle={t("cv:seoTitle")}>
      <Cv />
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
      ...(await serverSideTranslations(locale, ["cv", "common"])),
    },
    revalidate: 86400,
  };
};
