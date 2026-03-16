import React from "react";
import { useTranslation } from "next-i18next";

import SEO from "../components/SEO";
import Container from "../components/Layout/Container";

import Header from "../sections/Header";
import Footer from "../sections/Footer";
import About from "../sections/About";
import DevelopmentHero from "../sections/DevelopmentHero";
import ProductEngineerDefinition from "../sections/ProductEngineerDefinition";
import RoleComparison from "../sections/RoleComparison";
import AIResponsible from "../sections/AIResponsible";
import Differentiation from "../sections/Differentiation";
import Engagement from "../sections/Engagement";
import WhoIWorkWith from "../sections/WhoIWorkWith";
import Why from "../sections/Why";
import Technologies from "../sections/Technologies";
import Tangible from "../sections/Tangible";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { clearI18nServerCache } from "../utils/i18n-dev-reload";

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
              label: t("development-hero:navigation-label-short"),
            },
            {
              href: `#${t("about:anchor")}`,
              label: t("about:navigation-label-short"),
            },
            {
              href: `#${t("product-engineer:anchor")}`,
              label: t("product-engineer:navigation-label-short"),
            },
            {
              href: `#${t("role-comparison:anchor")}`,
              label: t("role-comparison:navigation-label-short"),
            },
            {
              href: `#${t("engagement:anchor")}`,
              label: t("engagement:navigation-label-short"),
            },
            {
              href: `#${t("who-i-work-with:anchor")}`,
              label: t("who-i-work-with:navigation-label-short"),
            },
            {
              href: `#${t("differentiation:anchor")}`,
              label: t("differentiation:navigation-label-short"),
            },
            {
              href: `#${t("why:anchor")}`,
              label: t("why:navigation-label-short"),
            },
            {
              href: `#${t("technologies:anchor")}`,
              label: t("technologies:navigation-label-short"),
            },
            {
              href: `#${t("ai-responsible:anchor")}`,
              label: t("ai-responsible:navigation-label-short"),
            },
            {
              href: `#${t("tangible:anchor")}`,
              label: t("tangible:navigation-label-short"),
            },
          ]}
          cta={false}
        />
      </Container>
      <main className="page-home">
        <DevelopmentHero />
        <ProductEngineerDefinition />
        <RoleComparison
          cta={{
            label: t("common:schedule-me-label"),
            link: t("common:schedule-me"),
          }}
        />
        <Engagement
          cta={{
            label: t("engagement:ctaLabel"),
            link: t("common:schedule-me"),
          }}
        />
        <WhoIWorkWith
          cta={{
            label: t("common:schedule-me-label"),
            link: t("common:schedule-me"),
          }}
        />
        <Differentiation />
        <Why
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
        <AIResponsible />
        <Tangible
          cta={{
            label: t("common:schedule-me-label"),
            link: t("common:schedule-me"),
          }}
        />
        <About />
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

export const getServerSideProps = async ({ locale }) => {
  clearI18nServerCache();
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "about",
        "common",
        "development",
        "benefits",
        "development-hero",
        "ai-responsible",
        "differentiation",
        "engagement",
        "product-engineer",
        "role-comparison",
        "passion",
        "services",
        "tangible",
        "technologies",
        "who-i-work-with",
        "why",
      ])),
    },
  };
};
