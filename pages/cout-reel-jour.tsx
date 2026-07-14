import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";

import { serverSideTranslations } from "../commons/serverSideTranslations";
import SEO from "../components/SEO";
import Container from "../components/Layout/Container";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import DayRateComparison from "../sections/DayRateComparison";
import Contact from "../sections/Contact";
import { ROUTES } from "../commons/siteRoutes";
import { pageShellStyle } from "../commons/pageRowSpacing";

export default function CoutReelJourPage() {
  const { t } = useTranslation(["cost-calculator", "common"]);

  return (
    <>
      <SEO
        title={t("cost-calculator:seoTitle")}
        description={t("cost-calculator:seoDescription")}
        path={ROUTES.dayRateComparison}
        sameAs={[t("common:linkedin")]}
      />
      <Container tag="header" style={pageShellStyle}>
        <Header showNavigation showCta={false} />
      </Container>
      <main className="page-home page-day-rate-comparison">
        <DayRateComparison />
        <Contact />
      </main>
      <Container tag="footer" style={pageShellStyle}>
        <Footer />
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "fr", ["cost-calculator", "contact", "common"])),
    },
    revalidate: 86400,
  };
};
