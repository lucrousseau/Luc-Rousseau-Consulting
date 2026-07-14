import { useTranslation } from "next-i18next/pages";

import Container from "../../components/Layout/Container";
import Row from "../../components/Layout/Row";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import CostCalculator from "../../components/CostCalculator";
import {
  homeBlockRowStyle,
  homeBodyRowStyle,
  homeIntroRowStyle,
  homePreCtaContentRowStyle,
} from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";
import type { CalculatorRole } from "../../commons/costCalculatorPresets";

interface DayRateComparisonProps {
  role: CalculatorRole;
}

export default function DayRateComparison({ role }: DayRateComparisonProps) {
  const { t } = useTranslation(["cost-calculator", "common"]);
  const scheduleCta = getScheduleCta(t);
  const postureParagraphs = t("cost-calculator:posture.paragraphs", {
    returnObjects: true,
  }) as string[];
  const mandateItems = t("cost-calculator:mandate.items", {
    returnObjects: true,
  }) as string[];

  return (
    <Container className="section-day-rate-comparison" align="center" halign="center">
      <SectionIntro
        badge={t("cost-calculator:badge")}
        title={t("cost-calculator:title")}
        titleAs="h1"
        rowStyle={homeIntroRowStyle}
      >
        <p className="big">{t("cost-calculator:lede")}</p>
      </SectionIntro>

      <Row
        halign="center"
        style={homeBodyRowStyle}
        columns={[
          {
            cols: { col: 10, xl: 11, sm: 12 },
            content: <CostCalculator key={role} role={role} />,
          },
        ]}
      />

      <Row
        halign="center"
        style={homeBlockRowStyle}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <div className="align align--left section-day-rate-comparison__prose">
                <section
                  className="section-day-rate-comparison__block"
                  aria-labelledby="day-rate-posture-heading"
                >
                  <h3
                    id="day-rate-posture-heading"
                    className="h3 section-day-rate-comparison__title"
                  >
                    {t("cost-calculator:posture.title")}
                  </h3>
                  {Array.isArray(postureParagraphs) &&
                    postureParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </section>

                <section
                  className="section-day-rate-comparison__block"
                  aria-labelledby="day-rate-mandate-heading"
                >
                  <h3
                    id="day-rate-mandate-heading"
                    className="h3 section-day-rate-comparison__title"
                  >
                    {t("cost-calculator:mandate.title")}
                  </h3>
                  <p>{t("cost-calculator:mandate.lede")}</p>
                  {Array.isArray(mandateItems) && (
                    <ul className="section-day-rate-comparison__list">
                      {mandateItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              </div>
            ),
          },
        ]}
      />

      <SectionCta
        bare
        halign="center"
        trackSection="day-rate-comparison"
        href={scheduleCta.link}
        label={t("cost-calculator:ctaLabel")}
        rowStyle={homePreCtaContentRowStyle}
        beforeCTA={
          <>
            <p className="big">{t("cost-calculator:ctaLead")}</p>
            <p>{t("cost-calculator:ctaTeaser")}</p>
          </>
        }
      />
    </Container>
  );
}
