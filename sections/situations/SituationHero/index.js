import { useTranslation } from "next-i18next/pages";

import { parseHtmlContent } from "../../../commons/parseHtmlContent";
import { ROUTES } from "../../../commons/siteRoutes";
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
  const hero =
    /** @type {{ buy?: { legend?: string; prefix?: string; label?: string }; title?: string; badge?: string; quote?: string; lede?: string }} */ (
      t(`${namespace}:hero`, { returnObjects: true })
    );
  const buy = hero?.buy;

  const breadcrumbItems = [
    { label: t("common:home-link-label"), href: ROUTES.home },
    { label: t("common:situations-link-label"), href: ROUTES.situationsHub },
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
      {hero?.quote && <p className="situation-hero__quote">{hero.quote}</p>}
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
                  prefix={buy.prefix ? parseHtmlContent(buy.prefix) : null}
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
