import { useTranslation } from "next-i18next";
import { ROUTES } from "../../../commons/siteRoutes";
import { parseHtmlContent } from "../../../commons/parseHtmlContent";

import Row from "../../../components/Layout/Row";
import Container from "../../../components/Layout/Container";
import SectionIntro from "../../../components/SectionIntro";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { homeIntroRowStyle } from "../../../commons/pageRowSpacing";
import SituationsQuiz from "../SituationsQuiz";

/**
 * Situations hub with routing quiz. Requires i18n: `situations-index`, `common`.
 */
export default function SituationsIndex() {
  const { t } = useTranslation(["situations-index", "common"]);

  const breadcrumbItems = [
    { label: t("common:home-link-label"), href: ROUTES.home },
    { label: t("badge") },
  ];

  return (
    <Container className="section-situations-index" align="center" halign="center">
      <Row
        halign="center"
        columns={[
          {
            cols: { col: 11, xl: 12, sm: 12 },
            content: (
              <Breadcrumbs
                items={breadcrumbItems}
                ariaLabel={t("common:breadcrumb-label")}
                className="component__breadcrumbs component__breadcrumbs--situations-hub"
              />
            ),
          },
        ]}
      />
      <SectionIntro
        badge={t("badge")}
        title={t("title")}
        lede={parseHtmlContent(t("lede"))}
        rowStyle={homeIntroRowStyle}
        titleAs="h1"
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
