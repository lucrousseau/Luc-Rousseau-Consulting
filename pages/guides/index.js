import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SEO from "../../components/SEO";
import Container from "../../components/Layout/Container";
import Header from "../../sections/Header";
import Footer from "../../sections/Footer";
import GuidesIndex from "../../sections/guides/GuidesIndex";

const PAGE_SHELL_STYLE = {
  "--padding-top": "1rem",
  "--padding-bottom": "1rem",
};

export default function GuidesIndexPage() {
  const { t } = useTranslation(["guides-index", "common"]);

  return (
    <>
      <SEO
        title={t("guides-index:seoTitle")}
        description={t("guides-index:seoDescription")}
        sameAs={[t("common:linkedin")]}
      />
      <Container tag="header" style={PAGE_SHELL_STYLE}>
        <Header showNavigation={false} showCta={false} />
      </Container>
      <main className="page-home page-guides">
        <GuidesIndex />
      </main>
      <Container tag="footer" style={PAGE_SHELL_STYLE}>
        <Footer showGuidesLink />
      </Container>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["guides-index", "common"])),
    },
    revalidate: 86400,
  };
}
