import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { parseHtmlContent } from "../commons/parseHtmlContent";

import { serverSideTranslations } from "../commons/serverSideTranslations";
import SEO from "../components/SEO";
import Container from "../components/Layout/Container";
import Row from "../components/Layout/Row";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

/**
 * Privacy policy page: trust anchor explaining data collection,
 * usage, security, and user rights for lucrousseau.com visitors.
 */
export default function PrivacyPage() {
  const { t } = useTranslation(["privacy", "common"]);

  return (
    <>
      <SEO
        title={t("privacy:seo-title")}
        description={t("privacy:seo-description")}
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
      <main className="page-privacy">
        <Container
          tag="section"
          align="center"
          halign="center"
          style={{
            "--padding-top": "3rem",
            "--padding-bottom": "3rem",
          }}
        >
          <Row
            halign="center"
            columns={[
              {
                cols: { col: 10, md: 8, sm: 12 },
                content: (
                  <>
                    <h1>{t("privacy:title")}</h1>
                    <p className="subtitle">{t("privacy:subtitle")}</p>
                    {parseHtmlContent(t("privacy:intro"))}

                    <h2>{t("privacy:data-heading")}</h2>
                    {parseHtmlContent(t("privacy:data"))}

                    <h2>{t("privacy:usage-heading")}</h2>
                    {parseHtmlContent(t("privacy:usage"))}

                    <h2>{t("privacy:security-heading")}</h2>
                    {parseHtmlContent(t("privacy:security"))}

                    <h2>{t("privacy:retention-heading")}</h2>
                    {parseHtmlContent(t("privacy:retention"))}

                    <h2>{t("privacy:rights-heading")}</h2>
                    {parseHtmlContent(t("privacy:rights"))}

                    <h2>{t("privacy:third-party-heading")}</h2>
                    {parseHtmlContent(t("privacy:third-party"))}

                    <h2>{t("privacy:changes-heading")}</h2>
                    {parseHtmlContent(t("privacy:changes"))}

                    <h2>{t("privacy:contact-heading")}</h2>
                    {parseHtmlContent(t("privacy:contact"))}

                    <p className="small" style={{ marginTop: "2rem" }}>
                      {t("privacy:effective")}
                      <br />
                      {t("privacy:location")}
                    </p>
                  </>
                ),
              },
            ]}
          />
        </Container>
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
      ...(await serverSideTranslations(locale ?? "fr", ["privacy", "common"])),
    },
    revalidate: 86400,
  };
};
