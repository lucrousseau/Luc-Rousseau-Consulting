import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import SectionIntro from "../../components/SectionIntro";
import { homeBodyRowStyle, homeIntroRowStyle } from "../../commons/pageRowSpacing";
import SituationsQuiz from "../situations/SituationsQuiz";

/**
 * Home situation routing quiz (dedicated section). Requires i18n: `home-situation-finder`, `situations-index`.
 */
export default function HomeSituationFinder() {
  const { t } = useTranslation("home-situation-finder");

  return (
    <Container
      id={t("home-situation-finder:anchor")}
      className="section-home-situation-finder"
      align="center"
      halign="center"
    >
      <SectionIntro
        badge={t("home-situation-finder:badge")}
        title={t("home-situation-finder:title")}
        lede={parse(t("home-situation-finder:lede"))}
        rowStyle={homeIntroRowStyle}
      />
      <Row
        style={homeBodyRowStyle}
        halign="center"
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: <SituationsQuiz className="home-situation-finder__quiz" />,
          },
        ]}
      />
    </Container>
  );
}
