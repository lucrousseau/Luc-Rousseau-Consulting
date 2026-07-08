import React from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next/pages";

import SEO from "../components/SEO";
import Container from "../components/Layout/Container";
import { getScheduleCta } from "../commons/scheduleCta";

import Header from "../sections/Header";
import Footer from "../sections/Footer";
import HomeHero from "../sections/HomeHero";

import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";

const ProductEngineerDefinition = dynamic(() => import("../sections/ProductEngineerDefinition"));
const AIResponsible = dynamic(() => import("../sections/AIResponsible"));
const Engagement = dynamic(() => import("../sections/Engagement"));
const CollaborationFit = dynamic(() => import("../sections/CollaborationFit"));
const HomeSituationFinder = dynamic(() => import("../sections/HomeSituationFinder"));
const WhoIWorkWith = dynamic(() => import("../sections/WhoIWorkWith"));
const Technologies = dynamic(() => import("../sections/Technologies"));
const Tangible = dynamic(() => import("../sections/Tangible"));
const About = dynamic(() => import("../sections/About"));
const HomeFaq = dynamic(() => import("../sections/HomeFaq"));
const Contact = dynamic(() => import("../sections/Contact"));

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
        <Header showNavigation showCta={false} />
      </Container>
      <main className="page-home">
        <HomeHero />
        <HomeSituationFinder />
        <ProductEngineerDefinition showCta={false} />
        <AIResponsible showCta={false} />
        <Engagement cta={getScheduleCta(t, { label: t("engagement:ctaLabel") })} />
        <CollaborationFit showCta={false} />
        <WhoIWorkWith showCta={false} />
        <Technologies showCta={false} />
        <Tangible showCta={false} />
        <About showCta={false} />
        <HomeFaq showCta={false} />
        <Contact />
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

/** @param {{ locale: string }} context */
export const getStaticProps = async ({ locale }) => {
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
        "home-situation-finder",
        "who-i-work-with",
        "situations-index",
        "contact",
      ])),
    },
    revalidate: 86400,
  };
};
