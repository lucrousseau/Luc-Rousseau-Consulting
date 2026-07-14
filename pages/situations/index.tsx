import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next/pages";
import { useRouter } from "next/router";

import { serverSideTranslations } from "../../commons/serverSideTranslations";
import SEO from "../../components/SEO";
import Container from "../../components/Layout/Container";
import Header from "../../sections/Header";
import Footer from "../../sections/Footer";
import SituationsIndex from "../../sections/situations/SituationsIndex";
import Contact from "../../sections/Contact";
import { SITUATIONS } from "../../commons/situationsManifest";
import { getSituationPathById, ROUTES } from "../../commons/siteRoutes";
import { absoluteUrl, localizedPath } from "../../commons/localizedPath";
import { buildSituationsHubJsonLd } from "../../commons/situationsStructuredData";
import { getSiteOrigin } from "../../utils/siteOrigin";
import { pageShellStyle } from "../../commons/pageRowSpacing";

const situationTitleKey = (id: string) => `situations.${id}.title`;

export default function SituationsIndexPage() {
  const { t } = useTranslation(["situations-index", "common"]);
  const router = useRouter();
  const locale = router.locale ?? "fr";
  const defaultLocale = router.defaultLocale ?? "fr";
  const base = getSiteOrigin();
  const canonicalPath = localizedPath(locale, defaultLocale, ROUTES.situationsHub);
  const pageUrl = absoluteUrl(base, canonicalPath);

  const hubJsonLd = buildSituationsHubJsonLd({
    base,
    locale,
    defaultLocale,
    pageUrl,
    pageName: t("title"),
    pageDescription: t("seoDescription"),
    homeLabel: t("common:home-link-label"),
    situationsHubLabel: t("badge"),
    situations: SITUATIONS.map((situation) => ({
      path: getSituationPathById(situation.id, locale) ?? `${ROUTES.situationsHub}/${situation.id}`,
      name: t(situationTitleKey(situation.id)),
    })),
  });

  return (
    <>
      <SEO
        title={t("seoTitle")}
        description={t("seoDescription")}
        image={t("seoImage")}
        path={ROUTES.situationsHub}
        sameAs={[t("common:linkedin")]}
        jsonLd={hubJsonLd}
      />
      <Container tag="header" style={pageShellStyle}>
        <Header showNavigation showCta={false} />
      </Container>
      <main className="page-home page-situations">
        <SituationsIndex />
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
      ...(await serverSideTranslations(locale ?? "fr", ["situations-index", "contact", "common"])),
    },
    revalidate: 86400,
  };
};
