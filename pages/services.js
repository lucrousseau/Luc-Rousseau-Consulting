import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SEO from "../components/SEO";
import Container from "../components/Layout/Container";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import About from "../sections/About";
import Contact from "../sections/Contact";

/**
 * Example page: mounts About without editing the section module.
 * Loads only `about` + `common` i18n namespaces (see getStaticProps).
 */
export default function Services() {
  const { t } = useTranslation(["about", "common"]);

  return (
    <>
      <SEO
        title={t("about:title")}
        description={t("common:schedule-me-label")}
        sameAs={[t("common:linkedin")]}
      />
      <Container
        tag="header"
        style={{
          "--padding-top": "1rem",
          "--padding-bottom": "1rem",
        }}
      >
        <Header showNavigation showCta={false} />
      </Container>
      <main className="page-home">
        <About />
        <Contact />
      </main>
      <Container
        tag="footer"
        style={{
          "--padding-top": "1rem",
          "--padding-bottom": "1rem",
        }}
      >
        <Footer />
      </Container>
    </>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["about", "contact", "common"])),
    },
    revalidate: 86400,
  };
};
