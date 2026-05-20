import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../../components/Layout/Row";
import Container from "../../../components/Layout/Container";
import SectionIntro from "../../../components/SectionIntro";
import { homeIntroRowStyle } from "../../../commons/pageRowSpacing";
import SituationsQuiz from "../SituationsQuiz";

/**
 * Situations hub with routing quiz. Requires i18n: `situations-index`.
 */
export default function SituationsIndex() {
  const { t } = useTranslation("situations-index");

  return (
    <Container className="section-situations-index" align="center" halign="center">
      <SectionIntro
        badge={t("badge")}
        title={t("title")}
        lede={parse(t("lede"))}
        rowStyle={homeIntroRowStyle}
      />
      <Row
        halign="center"
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: <SituationsQuiz />,
          },
        ]}
      />
    </Container>
  );
}
