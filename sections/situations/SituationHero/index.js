import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import { parseHtmlContent } from "../../../commons/parseHtmlContent";
import Row from "../../../components/Layout/Row";
import Buy from "../../../components/Buy";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Container from "../../../components/Layout/Container";
import { homeCtaRowStyle } from "../../../commons/pageRowSpacing";

/**
 * Situation page hero (h1 + lede + optional Buy). Reads `hero` from the situation namespace.
 * @param {{ namespace: string }} props
 */
export default function SituationHero({ namespace }) {
  const { t } = useTranslation([namespace, "common"]);
  const hero = t(`${namespace}:hero`, { returnObjects: true });
  const buy = hero?.buy;

  const breadcrumbItems = [
    { label: t("common:home-link-label"), href: "/" },
    { label: t("common:situations-link-label"), href: "/situations" },
    { label: hero?.title ?? "" },
  ];

  return (
    <Container className="section-situation-hero" align="center" halign="center">
      <Breadcrumbs
        items={breadcrumbItems}
        ariaLabel={t("common:breadcrumb-label")}
        className="component__breadcrumbs component__breadcrumbs--situation"
      />
      {hero?.badge && <p className="section__badge">{hero.badge}</p>}
      <h1>{hero?.title}</h1>
      {hero?.lede && (
        <Row
          halign="center"
          columns={[
            {
              cols: { col: 10, sm: 12 },
              content: <div className="big">{parseHtmlContent(hero.lede)}</div>,
            },
          ]}
        />
      )}
      {buy?.legend && (
        <Row
          halign="center"
          style={homeCtaRowStyle}
          columns={[
            {
              cols: { col: 8, md: 12 },
              content: (
                <Buy
                  price={null}
                  legend={buy.legend}
                  prefix={buy.prefix ? parse(buy.prefix) : null}
                  className="biggest"
                  variant="primary"
                  size={null}
                  label={buy.label}
                  trackSection="situation-hero"
                />
              ),
            },
          ]}
        />
      )}
    </Container>
  );
}
