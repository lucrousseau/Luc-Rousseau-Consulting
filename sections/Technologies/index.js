import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import SectionCta from "../../components/SectionCta";
import { homeCtaRowStyle, homeIntroRowStyle } from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";
import Tags from "../../components/Tags";

export default function Technologies({ backgroundColor, cta }) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);

  const items = t("technologies:items", { returnObjects: true }).map((item) => ({
    content: item,
    emoji: "⭐️",
  }));

  return (
    <Container
      id={t("technologies:anchor")}
      align={"center"}
      halign={"center"}
      backgroundColor={backgroundColor}
    >
      <SectionIntro
        badge={t("technologies:badge")}
        title={t("technologies:title")}
        lede={parse(t("technologies:summary"))}
        rowStyle={homeIntroRowStyle}
      />
      <Row
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: <Tags halign={"center"} items={items} />,
          },
        ]}
      />
      <SectionCta
        bare
        trackSection="technologies"
        href={cta?.link ?? scheduleCta.link}
        label={cta?.label ?? t("technologies:footer-cta-label")}
        rowStyle={homeCtaRowStyle}
        cols={null}
      />
    </Container>
  );
}
