import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";

import Cv from "../../sections/Cv";
import CvPageLayout from "../../sections/CvPageLayout";

/**
 * CV variant positioned for Tech Lead / Lead developer roles.
 * Noindex + omitted from the sitemap; shared privately for applications.
 */
export default function CvTechLeadPage() {
  const { t } = useTranslation(["cv-techlead", "cv", "common"]);

  return (
    <CvPageLayout seoTitle={t("cv-techlead:seoTitle")}>
      <Cv variant="techlead" />
    </CvPageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "fr", ["cv-techlead", "cv", "common"])),
    },
    revalidate: 86400,
  };
};
