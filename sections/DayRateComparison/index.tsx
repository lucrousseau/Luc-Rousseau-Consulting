import { useTranslation } from "next-i18next/pages";

import { ROUTES } from "../../commons/siteRoutes";
import {
  homeBodyRowStyle,
  homeIntroRowStyle,
  homeTableRowStyle,
} from "../../commons/pageRowSpacing";
import { parseHtmlItems } from "../../commons/parseHtmlContent";
import type { CalculatorRole } from "../../commons/costCalculatorPresets";
import Accordion from "../../components/Accordion";
import Breadcrumbs from "../../components/Breadcrumbs";
import Container from "../../components/Layout/Container";
import NumberedHighlightList from "../../components/NumberedHighlightList";
import Row from "../../components/Layout/Row";
import SectionIntro from "../../components/SectionIntro";
import CostCalculator from "../../components/CostCalculator";

interface DayRateComparisonProps {
  role: CalculatorRole;
}

export default function DayRateComparison({ role }: DayRateComparisonProps) {
  const { t } = useTranslation(["cost-calculator", "common"]);
  const postureItems = t("cost-calculator:posture.items", { returnObjects: true }) as {
    title: string;
    content?: string;
  }[];
  const mandateItems = parseHtmlItems(
    t("cost-calculator:mandate.items", { returnObjects: true }) as {
      title?: string;
      content?: string;
    }[]
  );

  const breadcrumbItems = [
    { label: t("common:home-link-label"), href: ROUTES.home },
    { label: t("cost-calculator:breadcrumb") },
  ];

  return (
    <>
      <Container
        className="section-situation-hero section-day-rate-comparison__hero"
        align="center"
        halign="center"
      >
        <Breadcrumbs
          items={breadcrumbItems}
          ariaLabel={t("common:breadcrumb-label")}
          className="component__breadcrumbs component__breadcrumbs--situation"
        />
        <p className="section__badge">{t("cost-calculator:badge")}</p>
        <h1>{t("cost-calculator:title")}</h1>
        <Row
          halign="center"
          columns={[
            {
              cols: { col: 10, sm: 12 },
              content: <p className="big">{t("cost-calculator:lede")}</p>,
            },
          ]}
        />
      </Container>

      <Container
        className="section-situation-block section-day-rate-comparison__calculator"
        align="center"
        halign="center"
      >
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
      </Container>

      <Container
        className="section-situation-block section-situation-block--highlights section-day-rate-comparison__posture"
        align="center"
        halign="center"
      >
        <SectionIntro title={t("cost-calculator:posture.title")} rowStyle={homeIntroRowStyle} />
        <NumberedHighlightList items={Array.isArray(postureItems) ? postureItems : []} />
      </Container>

      <Container
        className="section-situation-block section-situation-block--faq section-day-rate-comparison__mandate"
        align="center"
        halign="center"
      >
        <SectionIntro
          title={t("cost-calculator:mandate.title")}
          lede={<p className="big">{t("cost-calculator:mandate.lede")}</p>}
          rowStyle={homeIntroRowStyle}
        />
        <Row
          halign="center"
          style={homeTableRowStyle}
          columns={[
            {
              cols: { col: 10, sm: 12 },
              content: <Accordion align="left" items={mandateItems} />,
            },
          ]}
        />
      </Container>
    </>
  );
}
