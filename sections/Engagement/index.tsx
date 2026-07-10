import { useTranslation } from "next-i18next/pages";
import { parseHtmlContent } from "../../commons/parseHtmlContent";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import ProductGrid from "../../components/ProductGrid";
import TermsTwoColumn from "../../components/TermsTwoColumn";
import {
  homeBlockRowStyle,
  homeIntroRowStyle,
  homePreCtaContentRowStyle,
} from "../../commons/pageRowSpacing";
import type { SectionWithCtaProps } from "../../commons/sectionTypes";
import { getScheduleCta } from "../../commons/scheduleCta";

interface EngagementModel {
  title: string;
  subtitle: string;
  value: string;
  content: string;
}

/**
 * Engagement models section. Requires i18n: `engagement`, `common`.
 */
export default function Engagement({ cta, showCta = true }: SectionWithCtaProps) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);

  const termsIncluded = t("engagement:termsIncluded", { returnObjects: true }) as string[];
  const termsExcluded = t("engagement:termsExcluded", { returnObjects: true }) as string[];
  const termsFactsItems = t("engagement:termsFactsItems", { returnObjects: true }) as string[];
  const includedList = Array.isArray(termsIncluded) ? termsIncluded : [];
  const excludedList = Array.isArray(termsExcluded) ? termsExcluded : [];
  const factsList = Array.isArray(termsFactsItems) ? termsFactsItems : [];
  const rawModels = t("engagement:models", { returnObjects: true });
  const models = (Array.isArray(rawModels) ? rawModels : []) as EngagementModel[];

  return (
    <Container
      id={t("engagement:anchor")}
      className="section-engagement"
      align={"center"}
      halign={"center"}
    >
      <SectionIntro
        badge={t("engagement:badge")}
        title={t("engagement:headline")}
        rowStyle={homeIntroRowStyle}
      >
        {t("engagement:subhead") && <p className="big">{t("engagement:subhead")}</p>}
        <p className="big">{parseHtmlContent(t("engagement:valueStatement"))}</p>
      </SectionIntro>
      <ProductGrid
        items={models}
        renderItem={(model) => (
          <>
            <p className="small">{model.subtitle}</p>
            <p>
              <strong>{model.value}</strong>
            </p>
            {parseHtmlContent(model.content)}
          </>
        )}
      />
      <Row
        halign={"center"}
        style={homeBlockRowStyle}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <div className="align align--left engagement__terms">
                <h3 className="h3 engagement__terms-title">{t("engagement:termsTitle")}</h3>
                {parseHtmlContent(t("engagement:termsLead"))}
                {parseHtmlContent(t("engagement:termsBudget"))}
                <div className="engagement__terms-facts-wrap">
                  <h4 className="h4 engagement__terms-subheading">
                    {t("engagement:termsFactsLabel")}
                  </h4>
                  <ul className="engagement__terms-facts-list">
                    {factsList.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
                <TermsTwoColumn
                  className="engagement__terms-two-column"
                  columns={[
                    { heading: t("engagement:termsIncludedHeading"), items: includedList },
                    { heading: t("engagement:termsExcludedHeading"), items: excludedList },
                  ]}
                />
                {parseHtmlContent(t("engagement:termsFootnote"))}
              </div>
            ),
          },
        ]}
      />
      {showCta && (
        <SectionCta
          bare
          halign="center"
          trackSection="engagement"
          href={cta?.link ?? scheduleCta.link}
          label={cta?.label ?? t("engagement:ctaLabel")}
          rowStyle={homePreCtaContentRowStyle}
          beforeCTA={
            <>
              <p className="big">{parseHtmlContent(t("engagement:differentiator"))}</p>
              <p>{parseHtmlContent(t("engagement:ctaTeaser"))}</p>
            </>
          }
        />
      )}
    </Container>
  );
}
