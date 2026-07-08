import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";

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

/** @param {{ locale: string }} context */
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["cv-dev", "cv", "common"])),
    },
    revalidate: 86400,
  };
};
