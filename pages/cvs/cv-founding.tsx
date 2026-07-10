import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";

import Cv from "../../sections/Cv";
import CvPageLayout from "../../sections/CvPageLayout";

/**
 * CV variant positioned for Founding Engineer / early-stage generalist roles.
 * Noindex + omitted from the sitemap; shared privately for applications.
 */
export default function CvFoundingPage() {
  const { t } = useTranslation(["cv-founding", "cv", "common"]);

  return (
    <CvPageLayout seoTitle={t("cv-founding:seoTitle")}>
      <Cv variant="founding" />
    </CvPageLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "fr", ["cv-founding", "cv", "common"])),
    },
    revalidate: 86400,
  };
};
