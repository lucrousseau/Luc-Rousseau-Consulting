import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";

import { serverSideTranslations } from "../../commons/serverSideTranslations";
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "fr", ["cv", "common"])),
    },
    revalidate: 86400,
  };
};
