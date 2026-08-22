import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";

import { serverSideTranslations } from "../commons/serverSideTranslations";
import SEO from "../components/SEO";
import Container from "../components/Layout/Container";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import Contact from "../sections/Contact";

const RESOURCE_KEYS = [
  { href: "/openapi.json", labelKey: "openapi-label", descKey: "openapi-desc" },
  { href: "/llms.txt", labelKey: "llms-label", descKey: "llms-desc" },
  { href: "/llms-full.txt", labelKey: "llms-full-label", descKey: "llms-full-desc" },
  { href: "/humans.txt", labelKey: "humans-label", descKey: "humans-desc" },
  { href: "/sitemap.xml", labelKey: "sitemap-label", descKey: "sitemap-desc" },
  { href: "/robots.txt", labelKey: "robots-label", descKey: "robots-desc" },
] as const;

/**
 * Luc Rousseau developer resources: OpenAPI, llms.txt, and agent negotiation notes.
 * Indexed so name-based queries can discover the public machine-readable surface.
 */
export default function Developers() {
  const { t } = useTranslation(["developers", "common"]);

  return (
    <>
      <SEO
        title={t("developers:seo-title")}
        description={t("developers:seo-description")}
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
      <main className="page-home">
        <Container
          tag="section"
          style={{
            "--padding-top": "3rem",
            "--padding-bottom": "2rem",
          }}
        >
          <h1>{t("developers:title")}</h1>
          <p>{t("developers:lead")}</p>

          <h2>{t("developers:api-heading")}</h2>
          <ul>
            {RESOURCE_KEYS.map((resource) => (
              <li key={resource.href}>
                <a href={resource.href}>{t(`developers:${resource.labelKey}`)}</a>
                {" : "}
                {t(`developers:${resource.descKey}`)}
              </li>
            ))}
          </ul>

          <h2>{t("developers:negotiation-heading")}</h2>
          <p>{t("developers:negotiation-body")}</p>
          <p>
            <strong>{t("developers:negotiation-example-label")}</strong>
          </p>
          <pre>
            <code>{`curl -sH "Accept: text/markdown" https://lucrousseau.com/`}</code>
          </pre>

          <h2>{t("developers:errors-heading")}</h2>
          <p>{t("developers:errors-body")}</p>

          <h2>{t("developers:auth-heading")}</h2>
          <p>{t("developers:auth-body")}</p>

          <h2>{t("developers:contact-heading")}</h2>
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
      ...(await serverSideTranslations(locale ?? "fr", ["developers", "contact", "common"])),
    },
    revalidate: 86400,
  };
};
