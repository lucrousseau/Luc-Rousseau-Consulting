import { useTranslation } from "next-i18next/pages";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";

import Cv from "../../sections/Cv";
import CvPageLayout from "../../sections/CvPageLayout";

/**
 * CV variant positioned for Product Owner / Product Manager roles.
 * Noindex + omitted from the sitemap; shared privately for applications.
 */
export default function CvPmPage() {
  const { t } = useTranslation(["cv-pm", "cv", "common"]);

  return (
    <CvPageLayout seoTitle={t("cv-pm:seoTitle")}>
      <Cv variant="pm" />
    </CvPageLayout>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["cv-pm", "cv", "common"])),
    },
    revalidate: 86400,
  };
};
