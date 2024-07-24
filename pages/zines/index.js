import React from "react";
import { useTranslation } from "next-i18next";

import SEO from "../../components/SEO";
import Container from "../../components/Layout/Container";

import Header from "../../sections/Header";
import Footer from "../../sections/Footer";
import ZinesHero from "../../sections/ZinesHero";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Development() {
  const { t } = useTranslation(["common", "zines", "zines-hero"]);

  return (
    <>
      <SEO
        title={t("zines:zines-seo-title")}
        description={t("zines:zines-seo-description")}
        image={t("zines:zines-seo-image")}
        url="/"
      />
      <Container
        tag={"header"}
        style={{
          "--padding-top": "1rem",
          "--padding-bottom": "1rem",
          "--xs-padding-top": "0rem",
          "--xs-padding-bottom": "0rem",
        }}
      >
        <Header cta={false} />
      </Container>
      <main>
        <ZinesHero />
      </main>
      <Container
        tag={"footer"}
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

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "common",
      "zines",
      "zines-hero",
    ])),
  },
});
