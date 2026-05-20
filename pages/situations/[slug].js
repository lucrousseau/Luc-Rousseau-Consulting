import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SEO from "../../components/SEO";
import Container from "../../components/Layout/Container";
import Header from "../../sections/Header";
import Footer from "../../sections/Footer";
import SituationShell from "../../sections/situations/SituationShell";
import { getAllSituationSlugs, getSituationBySlug } from "../../commons/situationsManifest";
import { buildSituationPageJsonLd } from "../../commons/situationsStructuredData";
import { absoluteUrl, localizedPath } from "../../commons/localizedPath";
import { getSiteOrigin } from "../../utils/siteOrigin";

const PAGE_SHELL_STYLE = {
  "--padding-top": "1rem",
  "--padding-bottom": "1rem",
};

export default function SituationPage({ namespace, slug, publishedAt }) {
  const { t } = useTranslation([namespace, "common"]);
  const router = useRouter();
  const locale = router.locale ?? "fr";
  const defaultLocale = router.defaultLocale ?? "fr";
  const base = getSiteOrigin();
  const hero = t(`${namespace}:hero`, { returnObjects: true });
  const pageName =
    hero && typeof hero === "object" && hero.title ? hero.title : t(`${namespace}:seoTitle`);
  const pageDescription = t(`${namespace}:seoDescription`);
  const pageUrl = absoluteUrl(base, localizedPath(locale, defaultLocale, `/situations/${slug}`));

  const situationJsonLd = buildSituationPageJsonLd({
    base,
    locale,
    defaultLocale,
    pageUrl,
    pageName,
    pageDescription,
    homeLabel: t("common:home-link-label"),
    situationsHubLabel: t("common:situations-link-label"),
    datePublished: publishedAt,
    dateModified: publishedAt,
  });

  return (
    <>
      <SEO
        title={t(`${namespace}:seoTitle`)}
        description={pageDescription}
        sameAs={[t("common:linkedin")]}
        jsonLd={situationJsonLd}
      />
      <Container tag="header" style={PAGE_SHELL_STYLE}>
        <Header showNavigation={false} showCta={false} />
      </Container>
      <main className="page-home page-situation">
        <SituationShell namespace={namespace} />
      </main>
      <Container tag="footer" style={PAGE_SHELL_STYLE}>
        <Footer />
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: getAllSituationSlugs().flatMap((slug) =>
      ["fr", "en"].map((locale) => ({ params: { slug }, locale }))
    ),
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const situation = getSituationBySlug(params.slug);

  if (!situation) {
    return { notFound: true };
  }

  return {
    props: {
      namespace: situation.namespace,
      slug: situation.slug,
      publishedAt: situation.publishedAt,
      ...(await serverSideTranslations(locale, [situation.namespace, "common"])),
    },
    revalidate: 86400,
  };
}
