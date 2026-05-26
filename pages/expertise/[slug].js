import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SEO from "../../components/SEO";
import Container from "../../components/Layout/Container";
import Header from "../../sections/Header";
import Footer from "../../sections/Footer";
import SituationShell from "../../sections/situations/SituationShell";
import Contact from "../../sections/Contact";
import {
  getAllExpertiseSlugs,
  getExpertiseBySlug,
  getExpertiseHreflangPaths,
  getExpertisePath,
} from "../../commons/expertiseManifest";
import { buildExpertisePageJsonLd } from "../../commons/expertiseStructuredData";
import { absoluteUrl, localizedPath } from "../../commons/localizedPath";
import { getSiteOrigin } from "../../utils/siteOrigin";

const PAGE_SHELL_STYLE = {
  "--padding-top": "1rem",
  "--padding-bottom": "1rem",
};

export default function ExpertisePage({ namespace, pagePath, hreflangPaths, publishedAt }) {
  const { t } = useTranslation([namespace, "common"]);
  const router = useRouter();
  const locale = router.locale ?? "fr";
  const defaultLocale = router.defaultLocale ?? "fr";
  const base = getSiteOrigin();
  const hero = t(`${namespace}:hero`, { returnObjects: true });
  const pageName =
    hero && typeof hero === "object" && hero.title ? hero.title : t(`${namespace}:seoTitle`);
  const pageDescription = t(`${namespace}:seoDescription`);
  const canonicalPath = localizedPath(locale, defaultLocale, pagePath);
  const pageUrl = absoluteUrl(base, canonicalPath);

  const expertiseJsonLd = buildExpertisePageJsonLd({
    base,
    locale,
    defaultLocale,
    pageUrl,
    pageName,
    pageDescription,
    homeLabel: t("common:home-link-label"),
    datePublished: publishedAt,
    dateModified: publishedAt,
  });

  return (
    <>
      <SEO
        title={t(`${namespace}:seoTitle`)}
        description={pageDescription}
        path={pagePath}
        hreflangPaths={hreflangPaths}
        sameAs={[t("common:linkedin")]}
        jsonLd={expertiseJsonLd}
      />
      <Container tag="header" style={PAGE_SHELL_STYLE}>
        <Header showNavigation showCta={false} />
      </Container>
      <main className="page-home page-situation page-expertise">
        <SituationShell namespace={namespace} />
        <Contact />
      </main>
      <Container tag="footer" style={PAGE_SHELL_STYLE}>
        <Footer />
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: ["fr", "en"].flatMap((locale) =>
      getAllExpertiseSlugs(locale).map((slug) => ({ params: { slug }, locale }))
    ),
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const page = getExpertiseBySlug(params.slug, locale);

  if (!page) {
    return { notFound: true };
  }

  return {
    props: {
      namespace: page.namespace,
      pagePath: getExpertisePath(page, locale),
      hreflangPaths: getExpertiseHreflangPaths(page),
      publishedAt: page.publishedAt,
      ...(await serverSideTranslations(locale, [page.namespace, "contact", "common"])),
    },
    revalidate: 86400,
  };
}
