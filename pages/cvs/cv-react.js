import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";

import Cv from "../../sections/Cv";
import CvPageLayout from "../../sections/CvPageLayout";

/**
 * CV variant positioned for React / frontend developer roles.
 * Noindex + omitted from the sitemap; shared privately for applications.
 */
export default function CvReactPage() {
  const { t } = useTranslation(["cv-react", "cv", "common"]);

  return (
    <CvPageLayout seoTitle={t("cv-react:seoTitle")}>
      <Cv variant="react" />
    </CvPageLayout>
  );
}

/** @param {{ locale: string }} context */
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["cv-react", "cv", "common"])),
    },
    revalidate: 86400,
  };
};
