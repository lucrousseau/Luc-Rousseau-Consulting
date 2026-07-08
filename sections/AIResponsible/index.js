import { useTranslation } from "next-i18next/pages";
import { parseHtmlContent } from "../../commons/parseHtmlContent";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import ProductGrid from "../../components/ProductGrid";
import {
  homeIntroRowStyle,
  homePreCtaContentRowStyle,
  homeStackContinueStyle,
} from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";

/**
 * AI Responsible section. Requires i18n: `ai-responsible`, `common`.
 * @param {import('../../commons/sectionTypes').SectionWithCtaProps} props
 */
export default function AIResponsible({ cta, showCta = true }) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);
  const items = /** @type {{ content: string }[]} */ (
    t("ai-responsible:items", { returnObjects: true })
  );

  return (
    <Container
      id={t("ai-responsible:anchor")}
      className="section-ai-responsible"
      align={"center"}
      halign={"center"}
    >
      <SectionIntro
        badge={t("ai-responsible:badge")}
        title={t("ai-responsible:title")}
        lede={<p className="big">{parseHtmlContent(t("ai-responsible:summary"))}</p>}
        rowStyle={homeIntroRowStyle}
      />
      <ProductGrid items={items} renderItem={(item) => <p>{parseHtmlContent(item.content)}</p>} />
      <Row
        halign={"center"}
        style={homeStackContinueStyle}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <p className="big align align--center">
                {parseHtmlContent(t("ai-responsible:closing"))}
              </p>
            ),
          },
        ]}
      />
      {showCta && (
        <SectionCta
          halign="center"
          trackSection="ai-responsible"
          href={cta?.link ?? scheduleCta.link}
          label={cta?.label ?? scheduleCta.label}
          rowStyle={homePreCtaContentRowStyle}
          cols={{ col: 12, sm: 12 }}
          className="section-ai-responsible__cta"
          teaser={t("ai-responsible:ctaTeaser") || null}
          teaserClassName="section-ai-responsible__cta-teaser"
        />
      )}
    </Container>
  );
}
