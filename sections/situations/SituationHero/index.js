import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../../components/Layout/Row";
import Buy from "../../../components/Buy";
import Container from "../../../components/Layout/Container";
import { homeCtaRowStyle } from "../../../commons/pageRowSpacing";

/**
 * Situation page hero (h1 + lede + optional Buy). Reads `hero` from the situation namespace.
 * @param {{ namespace: string }} props
 */
export default function SituationHero({ namespace }) {
  const { t } = useTranslation(namespace);
  const hero = t("hero", { returnObjects: true });
  const buy = hero?.buy;

  return (
    <Container className="section-situation-hero" align="center" halign="center">
      {hero?.badge && <p className="section__badge">{hero.badge}</p>}
      <h1>{hero?.title}</h1>
      {hero?.lede && (
        <Row
          halign="center"
          columns={[
            {
              cols: { col: 10, sm: 12 },
              content: <div className="big">{parse(hero.lede)}</div>,
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
