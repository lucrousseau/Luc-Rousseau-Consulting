import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SEO from "../../components/SEO";
import Container from "../../components/Layout/Container";
import Header from "../../sections/Header";
import Footer from "../../sections/Footer";
import SituationsIndex from "../../sections/situations/SituationsIndex";
import Contact from "../../sections/Contact";
import { SITUATIONS } from "../../commons/situationsManifest";
import { absoluteUrl, localizedPath } from "../../commons/localizedPath";
import { buildSituationsHubJsonLd } from "../../commons/situationsStructuredData";
import { getSiteOrigin } from "../../utils/siteOrigin";

const PAGE_SHELL_STYLE = {
  "--padding-top": "1rem",
  "--padding-bottom": "1rem",
};

const situationTitleKey = (slug) => `situations.${slug}.title`;

export default function SituationsIndexPage() {
  const { t } = useTranslation(["situations-index", "common"]);
  const router = useRouter();
  const locale = router.locale ?? "fr";
  const defaultLocale = router.defaultLocale ?? "fr";
  const base = getSiteOrigin();
  const canonicalPath = localizedPath(locale, defaultLocale, "/situations");
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
      slug: situation.slug,
      name: t(situationTitleKey(situation.slug)),
    })),
  });

  return (
    <>
      <SEO
        title={t("seoTitle")}
        description={t("seoDescription")}
        image={t("seoImage")}
        sameAs={[t("common:linkedin")]}
        jsonLd={hubJsonLd}
      />
      <Container tag="header" style={PAGE_SHELL_STYLE}>
        <Header showNavigation showCta={false} />
      </Container>
      <main className="page-home page-situations">
        <SituationsIndex />
        <Contact />
      </main>
      <Container tag="footer" style={PAGE_SHELL_STYLE}>
        <Footer />
      </Container>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["situations-index", "contact", "common"])),
    },
    revalidate: 86400,
  };
}
