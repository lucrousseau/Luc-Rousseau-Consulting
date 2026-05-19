import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import { homeCtaRowStyle, homeIntroRowStyle } from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";
import Accordion from "../../components/Accordion";

export default function HomeFaq({ cta }) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);

  const items = t("faq:items", { returnObjects: true }).map((item) => ({
    title: item.title,
    content: parse(item.content),
  }));

  return (
    <Container id={t("faq:anchor")} className="section-home-faq" align={"center"} halign={"center"}>
      <SectionIntro
        badge={t("faq:badge")}
        title={t("faq:title")}
        lede={parse(t("faq:intro"))}
        rowStyle={homeIntroRowStyle}
      />
      <Row
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: <Accordion align={"left"} items={items} />,
          },
        ]}
      />
      <SectionCta
        halign="center"
        trackSection="faq"
        href={cta?.link ?? scheduleCta.link}
        label={cta?.label ?? scheduleCta.label}
        rowStyle={homeCtaRowStyle}
        className="section-home-faq__cta"
      />
    </Container>
  );
}
