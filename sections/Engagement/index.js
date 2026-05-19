import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import {
  homeBlockRowStyle,
  homeIntroRowStyle,
  homePreCtaContentRowStyle,
} from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";
import Product from "../../components/Product";
import Button from "../../components/Button";
import ContactAlternates from "../../components/ContactAlternates";

export default function Engagement({ cta }) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);

  const termsIncluded = t("engagement:termsIncluded", { returnObjects: true });
  const termsExcluded = t("engagement:termsExcluded", { returnObjects: true });
  const termsFactsItems = t("engagement:termsFactsItems", { returnObjects: true });
  const includedList = Array.isArray(termsIncluded) ? termsIncluded : [];
  const excludedList = Array.isArray(termsExcluded) ? termsExcluded : [];
  const factsList = Array.isArray(termsFactsItems) ? termsFactsItems : [];

  const columns = t("engagement:models", { returnObjects: true }).map((model) => ({
    cols: { col: 4, lg: 10, sm: 12 },
    content: (
      <Product key={model.title} title={model.title} className={"align--lg-left"}>
        <>
          <p className="small">{model.subtitle}</p>
          <p>
            <strong>{model.value}</strong>
          </p>
          {parse(model.content)}
        </>
      </Product>
    ),
  }));

  return (
    <Container
      id={t("engagement:anchor")}
      className="section-engagement"
      align={"center"}
      halign={"center"}
    >
      <Row
        halign={"center"}
        style={homeIntroRowStyle}
        columns={[
          {
            cols: { col: 11, xl: 12, sm: 12 },
            content: (
              <>
                <p className="section__badge">{t("engagement:badge")}</p>
                <h2 className="underline underline--center">{t("engagement:headline")}</h2>
                {t("engagement:subhead") && <p className="big">{t("engagement:subhead")}</p>}
                <p className="big">{parse(t("engagement:valueStatement"))}</p>
              </>
            ),
          },
        ]}
      />
      <Row columns={columns} />
      <Row
        halign={"center"}
        style={homeBlockRowStyle}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <div className="align align--left engagement__terms">
                <h3 className="h3 engagement__terms-title">{t("engagement:termsTitle")}</h3>
                {parse(t("engagement:termsLead"))}
                {parse(t("engagement:termsBudget"))}
                <div className="engagement__terms-facts-wrap">
                  <p className="small engagement__terms-facts-label">
                    {t("engagement:termsFactsLabel")}
                  </p>
                  <ul className="engagement__terms-facts-list">
                    {factsList.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
                <div className="engagement__terms-columns">
                  <div className="engagement__terms-column">
                    <p className="small engagement__terms-column-heading">
                      <strong>{t("engagement:termsIncludedHeading")}</strong>
                    </p>
                    <ul className="engagement__terms-ul">
                      {includedList.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="engagement__terms-column">
                    <p className="small engagement__terms-column-heading">
                      <strong>{t("engagement:termsExcludedHeading")}</strong>
                    </p>
                    <ul className="engagement__terms-ul">
                      {excludedList.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {parse(t("engagement:termsFootnote"))}
              </div>
            ),
          },
        ]}
      />
      <Row
        halign={"center"}
        style={homePreCtaContentRowStyle}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <>
                <p className="big">{parse(t("engagement:differentiator"))}</p>
                <p>{parse(t("engagement:ctaTeaser"))}</p>
                <p>
                  <Button
                    variant={"primary"}
                    href={cta?.link ?? scheduleCta.link}
                    label={cta?.label ?? t("engagement:ctaLabel")}
                    trackSection={"engagement"}
                  />
                </p>
                <ContactAlternates trackSection="engagement" />
              </>
            ),
          },
        ]}
      />
    </Container>
  );
}
