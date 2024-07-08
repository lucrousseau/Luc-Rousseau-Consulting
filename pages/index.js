import React from "react";
import { useTranslation } from "next-i18next";

import SEO from "../components/SEO";
import Container from "../components/Layout/Container";

import Header from "../sections/Header";
import Footer from "../sections/Footer";
import DevelopmentHero from "../sections/DevelopmentHero";
import WhatICanDo from "../sections/WhatICanDo";
import Why from "../sections/Why";
import Technologies from "../sections/Technologies";
import Tangible from "../sections/Tangible";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Development() {
  const { t } = useTranslation(["development", "hero-development", "common"]);

  return (
    <>
      <SEO
        title={t("development-seo-title")}
        description={t("development-seo-description")}
        image={t("development-seo-image")}
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
        <Header
          navigation={[
            {
              href: `#${t("development-hero:anchor")}`,
              label: t("development-hero:navigation-label"),
            },
            {
              href: `#${t("whaticando:anchor")}`,
              label: t("whaticando:navigation-label"),
            },
            {
              href: `#${t("technologies:anchor")}`,
              label: t("technologies:navigation-label"),
            },
            { href: `#${t("why:anchor")}`, label: t("why:navigation-label") },
            {
              href: `#${t("tangible:anchor")}`,
              label: t("tangible:navigation-label"),
            },
          ]}
          cta={false}
        />
      </Container>
      <main>
        <DevelopmentHero />
        <WhatICanDo
          cta={{
            label: t("common:schedule-me-label"),
            link: t("common:schedule-me"),
          }}
        />
        <Technologies
          cta={{
            label: t("common:schedule-me-label"),
            link: t("common:schedule-me"),
          }}
        />
        <Why
          cta={{
            label: t("common:schedule-me-label"),
            link: t("common:schedule-me"),
          }}
        />
        <Tangible
          cta={{
            label: t("common:schedule-me-label"),
            link: t("common:schedule-me"),
          }}
        />
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
      "development",
      "benefits",
      "development-hero",
      "passion",
      "services",
      "tangible",
      "technologies",
      "whaticando",
      "why",
    ])),
  },
});
