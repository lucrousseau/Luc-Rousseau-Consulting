import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";

import { serverSideTranslations } from "../../commons/serverSideTranslations";
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "fr", ["cv-hub", "common"])),
    },
    revalidate: 86400,
  };
};
