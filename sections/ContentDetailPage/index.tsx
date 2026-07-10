import type { ReactNode } from "react";
import { useTranslation } from "next-i18next/pages";
import { useRouter } from "next/router";

import SEO, { type HreflangPaths } from "../../components/SEO";
import Container from "../../components/Layout/Container";
import Header from "../Header";
import Footer from "../Footer";
import SituationShell from "../situations/SituationShell";
import Contact from "../Contact";
import { buildExpertisePageJsonLd } from "../../commons/expertiseStructuredData";
import { buildSituationPageJsonLd } from "../../commons/situationsStructuredData";
import { absoluteUrl, localizedPath } from "../../commons/localizedPath";
import { getSiteOrigin } from "../../utils/siteOrigin";
import { getBlockPageContactIntro } from "../../commons/blockPageContactIntro";
import { pageShellStyle } from "../../commons/pageRowSpacing";
import type { SituationHeroData } from "../situations/situationTypes";

export interface ContentDetailPageProps {
  namespace: string;
  pagePath: string;
  hreflangPaths: HreflangPaths;
  publishedAt: string;
  variant?: "situation" | "expertise";
}

export default function ContentDetailPage({
  namespace,
  pagePath,
  hreflangPaths,
  publishedAt,
  variant = "situation",
}: ContentDetailPageProps) {
  const { t } = useTranslation([namespace, "common"]);
  const router = useRouter();
  const locale = router.locale ?? "fr";
  const defaultLocale = router.defaultLocale ?? "fr";
  const base = getSiteOrigin();
  const hero = t(`${namespace}:hero`, { returnObjects: true }) as SituationHeroData;
  const pageName = hero?.title ? hero.title : t(`${namespace}:seoTitle`);
  const pageDescription = t(`${namespace}:seoDescription`);
  const canonicalPath = localizedPath(locale, defaultLocale, pagePath);
  const pageUrl = absoluteUrl(base, canonicalPath);

  const blocks = t(`${namespace}:blocks`, { returnObjects: true });
  const contactIntroTeaser = getBlockPageContactIntro(blocks);

  const homeLabel = t("common:home-link-label");
  const jsonLd =
    variant === "expertise"
      ? buildExpertisePageJsonLd({
          base,
          locale,
          defaultLocale,
          pageUrl,
          pageName,
          pageDescription,
          homeLabel,
          datePublished: publishedAt,
          dateModified: publishedAt,
        })
      : buildSituationPageJsonLd({
          base,
          locale,
          defaultLocale,
          pageUrl,
          pageName,
          pageDescription,
          homeLabel,
          situationsHubLabel: t("common:situations-link-label"),
          datePublished: publishedAt,
          dateModified: publishedAt,
        });

  const showSituationsHub = variant === "situation";
  const mainClassName =
    variant === "expertise"
      ? "page-home page-situation page-expertise"
      : "page-home page-situation";

  return (
    <>
      <SEO
        title={t(`${namespace}:seoTitle`)}
        description={pageDescription}
        path={pagePath}
        hreflangPaths={hreflangPaths}
        sameAs={[t("common:linkedin")]}
        jsonLd={jsonLd}
      />
      <Container tag="header" style={pageShellStyle}>
        <Header showNavigation showCta={false} />
      </Container>
      <main className={mainClassName}>
        <SituationShell namespace={namespace} showSituationsHub={showSituationsHub} />
        <Contact introTeaser={contactIntroTeaser} />
      </main>
      <Container tag="footer" style={pageShellStyle}>
        <Footer />
      </Container>
    </>
  );
}
