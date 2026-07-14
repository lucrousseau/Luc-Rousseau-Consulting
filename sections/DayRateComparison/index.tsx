import { useTranslation } from "next-i18next/pages";

import Container from "../../components/Layout/Container";
import Row from "../../components/Layout/Row";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import CostCalculator from "../../components/CostCalculator";
import {
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
        <p className="big section-day-rate-comparison__lede">{t("cost-calculator:lede")}</p>
      </SectionIntro>

      <Row
        halign="center"
        style={homeBodyRowStyle}
        columns={[
          {
            cols: { col: 10, xl: 11, sm: 12 },
            content: (
              <div className="section-day-rate-comparison__copy">
                <div className="section-day-rate-comparison__block">
                  <h2 className="section-day-rate-comparison__block-title">
                    {t("cost-calculator:posture.title")}
                  </h2>
                  {Array.isArray(postureParagraphs) &&
                    postureParagraphs.map((paragraph) => (
                      <p key={paragraph} className="section-day-rate-comparison__p">
                        {paragraph}
                      </p>
                    ))}
                </div>

                <div className="section-day-rate-comparison__block">
                  <h2 className="section-day-rate-comparison__block-title">
                    {t("cost-calculator:mandate.title")}
                  </h2>
                  <p className="section-day-rate-comparison__p section-day-rate-comparison__p--lede">
                    {t("cost-calculator:mandate.lede")}
                  </p>
                  {Array.isArray(mandateItems) && (
                    <ul className="section-day-rate-comparison__list">
                      {mandateItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ),
          },
        ]}
      />

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
