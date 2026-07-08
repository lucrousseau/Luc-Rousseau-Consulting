import { useTranslation } from "next-i18next/pages";
import { parseHtmlContent } from "../../commons/parseHtmlContent";

import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import ProductGrid from "../../components/ProductGrid";
import { homeIntroRowStyle, homePreCtaContentRowStyle } from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";

/**
 * Collaboration fit section. Requires i18n: `collaboration-fit`, `common`.
 * @param {import('../../commons/sectionTypes').SectionWithCtaProps} props
 */
export default function CollaborationFit({ cta, showCta = true }) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);
  const items = t("collaboration-fit:items", { returnObjects: true });

  return (
    <Container
      id={t("collaboration-fit:anchor")}
      className="section-collaboration-fit"
      align={"center"}
      halign={"center"}
    >
      <SectionIntro
        badge={t("collaboration-fit:badge")}
        title={t("collaboration-fit:title")}
        lede={parseHtmlContent(t("collaboration-fit:intro"))}
        rowStyle={homeIntroRowStyle}
      />
      <ProductGrid items={items} renderItem={(item) => <>{parseHtmlContent(item.content)}</>} />
      {showCta && (
        <SectionCta
          halign="center"
          trackSection="collaboration-fit"
          href={cta?.link ?? scheduleCta.link}
          label={cta?.label ?? t("collaboration-fit:footer-cta-label")}
          rowStyle={homePreCtaContentRowStyle}
          className="section-collaboration-fit__cta"
          teaser={t("collaboration-fit:ctaTeaser") || null}
          teaserClassName="section-collaboration-fit__cta-teaser"
        />
      )}
    </Container>
  );
}
