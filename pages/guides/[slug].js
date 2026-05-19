import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SEO from "../../components/SEO";
import Container from "../../components/Layout/Container";
import Header from "../../sections/Header";
import Footer from "../../sections/Footer";
import GuideShell from "../../sections/guides/GuideShell";
import { getAllGuideSlugs, getGuideBySlug } from "../../commons/guidesManifest";

const PAGE_SHELL_STYLE = {
  "--padding-top": "1rem",
  "--padding-bottom": "1rem",
};

export default function GuidePage({ namespace }) {
  const { t } = useTranslation([namespace, "common"]);

  return (
    <>
      <SEO
        title={t(`${namespace}:seoTitle`)}
        description={t(`${namespace}:seoDescription`)}
        sameAs={[t("common:linkedin")]}
      />
      <Container tag="header" style={PAGE_SHELL_STYLE}>
        <Header showNavigation={false} showCta={false} />
      </Container>
      <main className="page-home page-guide">
        <GuideShell namespace={namespace} />
      </main>
      <Container tag="footer" style={PAGE_SHELL_STYLE}>
        <Footer showGuidesLink />
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: getAllGuideSlugs().flatMap((slug) =>
      ["fr", "en"].map((locale) => ({ params: { slug }, locale }))
    ),
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    return { notFound: true };
  }

  return {
    props: {
      namespace: guide.namespace,
      ...(await serverSideTranslations(locale, [guide.namespace, "common"])),
    },
    revalidate: 86400,
  };
}
