import { useTranslation } from "next-i18next/pages";
import { parseHtmlContent } from "../../commons/parseHtmlContent";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import {
  homeIntroRowStyle,
  homeSituationCtaRowStyle,
  homeTableRowStyle,
} from "../../commons/pageRowSpacing";
import type { SectionWithCtaProps } from "../../commons/sectionTypes";
import { getScheduleCta } from "../../commons/scheduleCta";

import Accordion from "../../components/Accordion";

/** FAQ section. Requires i18n: `faq`, `common`. */
export default function HomeFaq({ cta, showCta = true }: SectionWithCtaProps) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);

  const rawItems = t("faq:items", { returnObjects: true });
  const items = (
    (Array.isArray(rawItems) ? rawItems : []) as { title: string; content: string }[]
  ).map((item) => ({
    title: item.title,
    content: parseHtmlContent(item.content),
  }));

  return (
    <Container id={t("faq:anchor")} className="section-home-faq" align={"center"} halign={"center"}>
      <SectionIntro
        badge={t("faq:badge")}
        title={t("faq:title")}
        lede={parseHtmlContent(t("faq:intro"))}
        rowStyle={homeIntroRowStyle}
      />
      <Row
        halign="center"
        style={homeTableRowStyle}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: <Accordion align={"left"} items={items} />,
          },
        ]}
      />
      {showCta && (
        <SectionCta
          halign="center"
          trackSection="faq"
          href={cta?.link ?? scheduleCta.link}
          label={cta?.label ?? scheduleCta.label}
          rowStyle={homeSituationCtaRowStyle}
          className="section-home-faq__cta"
        />
      )}
    </Container>
  );
}
