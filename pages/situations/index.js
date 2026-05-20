import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SEO from "../../components/SEO";
import Container from "../../components/Layout/Container";
import Header from "../../sections/Header";
import Footer from "../../sections/Footer";
import SituationsIndex from "../../sections/situations/SituationsIndex";

const PAGE_SHELL_STYLE = {
  "--padding-top": "1rem",
  "--padding-bottom": "1rem",
};

export default function SituationsIndexPage() {
  const { t } = useTranslation(["situations-index", "common"]);

  return (
    <>
      <SEO
        title={t("situations-index:seoTitle")}
        description={t("situations-index:seoDescription")}
        sameAs={[t("common:linkedin")]}
      />
      <Container tag="header" style={PAGE_SHELL_STYLE}>
        <Header showNavigation={false} showCta={false} />
      </Container>
      <main className="page-home page-situations">
        <SituationsIndex />
      </main>
      <Container tag="footer" style={PAGE_SHELL_STYLE}>
        <Footer />
      </Container>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["situations-index", "common"])),
    },
    revalidate: 86400,
  };
}
