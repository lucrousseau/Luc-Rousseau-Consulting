import type { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";

import {
  CALCULATOR_ROLE_SLUG_LIST,
  parseCalculatorRoleSlug,
  type CalculatorRole,
} from "../../commons/costCalculatorPresets";
import { pageShellStyle } from "../../commons/pageRowSpacing";
import { serverSideTranslations } from "../../commons/serverSideTranslations";
import { getDayRateComparisonPath } from "../../commons/siteRoutes";
import SEO from "../../components/SEO";
import Container from "../../components/Layout/Container";
import Header from "../../sections/Header";
import Footer from "../../sections/Footer";
import DayRateComparison from "../../sections/DayRateComparison";
import Contact from "../../sections/Contact";

interface CoutReelJourPageProps {
  role: CalculatorRole;
  pagePath: string;
}

export default function CoutReelJourPage({ role, pagePath }: CoutReelJourPageProps) {
  const { t } = useTranslation(["cost-calculator", "common"]);

  return (
    <>
      <SEO
        title={t("cost-calculator:seoTitle")}
        description={t("cost-calculator:seoDescription")}
        path={pagePath}
        sameAs={[t("common:linkedin")]}
        noindex
      />
      <Container tag="header" style={pageShellStyle}>
        <Header showNavigation showCta={false} />
      </Container>
      <main className="page-home page-day-rate-comparison">
        <DayRateComparison role={role} />
        <Contact />
      </main>
      <Container tag="footer" style={pageShellStyle}>
        <Footer />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: ["fr", "en"].flatMap((locale) =>
    CALCULATOR_ROLE_SLUG_LIST.map((profil) => ({ params: { profil }, locale }))
  ),
  fallback: false,
});

export const getStaticProps: GetStaticProps<CoutReelJourPageProps> = async ({ locale, params }) => {
  const role = parseCalculatorRoleSlug(
    typeof params?.profil === "string" ? params.profil : undefined
  );

  if (!role) {
    return { notFound: true };
  }

  return {
    props: {
      role,
      pagePath: getDayRateComparisonPath(role),
      ...(await serverSideTranslations(locale ?? "fr", ["cost-calculator", "contact", "common"])),
    },
    revalidate: 86400,
  };
};
