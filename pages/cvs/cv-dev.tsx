import type { GetStaticProps } from "next";
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "fr", ["cv-dev", "cv", "common"])),
    },
    revalidate: 86400,
  };
};
