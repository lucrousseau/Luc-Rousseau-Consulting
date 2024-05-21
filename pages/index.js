import { useTranslation } from "next-i18next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import SEO from "../components/SEO";
import Container from "../components/Layout/Container";

import Header from "../sections/Header";
import Footer from "../sections/Footer";
import HomeHero from "../sections/home-hero";
import Tangible from "../sections/tangible";
import Why from "../sections/why";
import Services from "../sections/services";
import Technologies from "../sections/technologies";
import Benefits from "../sections/benefits";
import Passion from "../sections/passion";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  const { t } = useTranslation(["home", "common"]);

  return (
    <>
      <SEO
        title={t("home-seo-title")}
        description={t("home-seo-description")}
        image={t("home-seo-image")}
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
        <Header />
      </Container>
      <main>
        <HomeHero />
        <Tangible />
        <Why />
        <Services />
        <Technologies />
        <Benefits />
        <Passion />
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
      <SpeedInsights />;
      <Analytics />
    </>
  );
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "common",
      "home",
      "benefits",
      "home-hero",
      "passion",
      "services",
      "tangible",
      "technologies",
      "why",
    ])),
  },
});
