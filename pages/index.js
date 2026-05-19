import React from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import SEO from "../components/SEO";
import Container from "../components/Layout/Container";

import Header from "../sections/Header";
import Footer from "../sections/Footer";
import HomeHero from "../sections/HomeHero";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ProductEngineerDefinition = dynamic(() => import("../sections/ProductEngineerDefinition"));
const AIResponsible = dynamic(() => import("../sections/AIResponsible"));
const Engagement = dynamic(() => import("../sections/Engagement"));
const CollaborationFit = dynamic(() => import("../sections/CollaborationFit"));
const WhoIWorkWith = dynamic(() => import("../sections/WhoIWorkWith"));
const Technologies = dynamic(() => import("../sections/Technologies"));
const Tangible = dynamic(() => import("../sections/Tangible"));
const About = dynamic(() => import("../sections/About"));
const HomeFaq = dynamic(() => import("../sections/HomeFaq"));

export default function Home() {
  const { t } = useTranslation(["home", "home-hero", "common"]);

  return (
    <>
      <SEO
        title={t("home-seo-title")}
        description={t("home-seo-description")}
        image={t("home-seo-image")}
        sameAs={[t("common:linkedin")]}
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
        <Header navigation={false} cta={false} />
      </Container>
      <main className="page-home">
        <HomeHero />
        <ProductEngineerDefinition
          cta={{
            label: t("common:schedule-me-label"),
            link: t("common:schedule-me"),
          }}
        />
        <AIResponsible
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
        <CollaborationFit
          cta={{
            label: t("common:schedule-me-label"),
            link: t("common:schedule-me"),
          }}
        />
        <WhoIWorkWith
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
        <Tangible
          cta={{
            label: t("common:schedule-me-label"),
            link: t("common:schedule-me"),
          }}
        />
        <About
          cta={{
            label: t("common:schedule-me-label"),
            link: t("common:schedule-me"),
          }}
        />
        <HomeFaq
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

export const getStaticProps = async ({ locale }) => {
  // Dev-only: bust next-i18next server cache so locale JSON edits apply without restart.
  if (process.env.NODE_ENV === "development") {
    try {
      const resolved = require.resolve("next-i18next/dist/commonjs/createClient/node.js");
      /* eslint-disable security/detect-object-injection -- resolved from require.resolve */
      if (require.cache[resolved]) {
        delete require.cache[resolved];
      }
      /* eslint-enable security/detect-object-injection */
    } catch {
      // Ignore if module path or cache clear fails
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "about",
        "faq",
        "common",
        "home",
        "home-hero",
        "ai-responsible",
        "engagement",
        "collaboration-fit",
        "product-engineer",
        "tangible",
        "technologies",
        "who-i-work-with",
      ])),
    },
    revalidate: 86400,
  };
};
