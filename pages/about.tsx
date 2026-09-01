import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { parseHtmlContent } from "../commons/parseHtmlContent";

import { serverSideTranslations } from "../commons/serverSideTranslations";
import SEO from "../components/SEO";
import Container from "../components/Layout/Container";
import Row from "../components/Layout/Row";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import Contact from "../sections/Contact";

/**
 * About page: trust anchor with 500+ characters about Luc Rousseau,
 * background, expertise, and approach to product building.
 */
export default function AboutPage() {
  const { t } = useTranslation(["about-page", "contact", "common"]);

  return (
    <>
      <SEO
        title={t("about-page:seo-title")}
        description={t("about-page:seo-description")}
        sameAs={[t("common:linkedin"), t("common:github")]}
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
      <main className="page-about">
        <Container
          tag="section"
          align="center"
          halign="center"
          style={{
            "--padding-top": "3rem",
            "--padding-bottom": "2rem",
          }}
        >
          <Row
            halign="center"
            columns={[
              {
                cols: { col: 10, md: 8, sm: 12 },
                content: (
                  <>
                    <h1>{t("about-page:title")}</h1>
                    <p className="subtitle">{t("about-page:subtitle")}</p>
                    {parseHtmlContent(t("about-page:intro"))}

                    <h2>{t("about-page:background-heading")}</h2>
                    {parseHtmlContent(t("about-page:background"))}

                    <h2>{t("about-page:why-heading")}</h2>
                    {parseHtmlContent(t("about-page:why"))}

                    <h2>{t("about-page:experience-heading")}</h2>
                    {parseHtmlContent(t("about-page:experience"))}

                    <h2>{t("about-page:location-heading")}</h2>
                    {parseHtmlContent(t("about-page:location"))}

                    <h2>{t("about-page:values-heading")}</h2>
                    {parseHtmlContent(t("about-page:values"))}
                  </>
                ),
              },
            ]}
          />
        </Container>
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "fr", [
        "about-page",
        "contact",
        "common",
      ])),
    },
    revalidate: 86400,
  };
};
