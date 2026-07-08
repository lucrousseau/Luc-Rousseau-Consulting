import { useTranslation } from "next-i18next/pages";
import { useRouter } from "next/router";

import SEO from "../../components/SEO";
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

/**
 * Shared layout for block-driven detail pages (situations and expertise satellites).
 * @param {object} props
 * @param {string} props.namespace
 * @param {string} props.pagePath
 * @param {{ fr?: string; en?: string; default?: string }} props.hreflangPaths
 * @param {string} props.publishedAt
 * @param {"situation" | "expertise"} [props.variant="situation"]
 */
export default function ContentDetailPage({
  namespace,
  pagePath,
  hreflangPaths,
  publishedAt,
  variant = "situation",
}) {
  const { t } = useTranslation([namespace, "common"]);
  const router = useRouter();
  const locale = router.locale ?? "fr";
  const defaultLocale = router.defaultLocale ?? "fr";
  const base = getSiteOrigin();
  const hero = /** @type {{ title?: string }} */ (t(`${namespace}:hero`, { returnObjects: true }));
  const pageName =
    hero && typeof hero === "object" && hero.title ? hero.title : t(`${namespace}:seoTitle`);
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
