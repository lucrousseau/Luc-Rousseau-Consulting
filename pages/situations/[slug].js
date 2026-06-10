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
  getAllSituationSlugs,
  getSituationBySlug,
  getSituationHreflangPaths,
  getSituationPath,
} from "../../commons/situationsManifest";
import { buildSituationPageJsonLd } from "../../commons/situationsStructuredData";
import { absoluteUrl, localizedPath } from "../../commons/localizedPath";
import { getSiteOrigin } from "../../utils/siteOrigin";
import { getSituationContactIntro } from "../../commons/situationContactIntro";

const PAGE_SHELL_STYLE = {
  "--padding-top": "1rem",
  "--padding-bottom": "1rem",
};

export default function SituationPage({ namespace, situationPath, hreflangPaths, publishedAt }) {
  const { t } = useTranslation([namespace, "common"]);
  const router = useRouter();
  const locale = router.locale ?? "fr";
  const defaultLocale = router.defaultLocale ?? "fr";
  const base = getSiteOrigin();
  const hero = t(`${namespace}:hero`, { returnObjects: true });
  const pageName =
    hero && typeof hero === "object" && hero.title ? hero.title : t(`${namespace}:seoTitle`);
  const pageDescription = t(`${namespace}:seoDescription`);
  const canonicalPath = localizedPath(locale, defaultLocale, situationPath);
  const pageUrl = absoluteUrl(base, canonicalPath);

  const blocks = t(`${namespace}:blocks`, { returnObjects: true });
  const contactIntroTeaser = getSituationContactIntro(blocks);

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
        path={situationPath}
        hreflangPaths={hreflangPaths}
        sameAs={[t("common:linkedin")]}
        jsonLd={situationJsonLd}
      />
      <Container tag="header" style={PAGE_SHELL_STYLE}>
        <Header showNavigation showCta={false} />
      </Container>
      <main className="page-home page-situation">
        <SituationShell namespace={namespace} />
        <Contact introTeaser={contactIntroTeaser} />
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
      getAllSituationSlugs(locale).map((slug) => ({ params: { slug }, locale }))
    ),
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const situation = getSituationBySlug(params.slug, locale);

  if (!situation) {
    return { notFound: true };
  }

  return {
    props: {
      namespace: situation.namespace,
      situationPath: getSituationPath(situation, locale),
      hreflangPaths: getSituationHreflangPaths(situation),
      publishedAt: situation.publishedAt,
      ...(await serverSideTranslations(locale, [situation.namespace, "contact", "common"])),
    },
    revalidate: 86400,
  };
}
