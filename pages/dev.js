import { useTranslation } from "next-i18next";

import SEO from "../components/SEO";
import Container from "../components/Layout/Container";

import Header from "../sections/Header/index.js";
import Footer from "../sections/Footer/index.js";
import HomeHero from "../sections/HomeHero/index.js";
import Tangible from "../sections/Tangible/index.js";
import Why from "../sections/Why/index.js";
import Services from "../sections/Services/index.js";
import Technologies from "../sections/Technologies/index.js";
import Benefits from "../sections/Benefits/index.js";
import Passion from "../sections/Passion/index.js";

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
        <Header
          navigation={[
            {
              href: `#${t("tangible:anchor")}`,
              label: t("tangible:navigation-label"),
            },
            { href: `#${t("why:anchor")}`, label: t("why:navigation-label") },
            {
              href: `#${t("services:anchor")}`,
              label: t("services:navigation-label"),
            },
            {
              href: `#${t("technologies:anchor")}`,
              label: t("technologies:navigation-label"),
            },
            {
              href: `#${t("benefits:anchor")}`,
              label: t("benefits:navigation-label"),
            },
          ]}
        />
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
