import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import {
  homeIntroRowStyle,
  homePreCtaContentRowStyle,
  homeStackContinueStyle,
} from "../../commons/homePageRowSpacing";
import Product from "../../components/Product";
import Button from "../../components/Button";
import ContactAlternates from "../../components/ContactAlternates";

export default function AIResponsible({ cta }) {
  const { t } = useTranslation();

  const columns = t("ai-responsible:items", { returnObjects: true }).map((item) => ({
    cols: { col: 4, lg: 10, sm: 12 },
    content: (
      <Product key={item.title} title={item.title} className={"align--lg-left"}>
        <p>{parse(item.content)}</p>
      </Product>
    ),
  }));

  return (
    <section className="section-ai-responsible" id={t("ai-responsible:anchor")}>
      <Container align={"center"} halign={"center"}>
        <Row
          halign={"center"}
          style={homeIntroRowStyle}
          columns={[
            {
              cols: { col: 11, xl: 12, sm: 12 },
              content: (
                <>
                  <p className="section__badge">{t("ai-responsible:badge")}</p>
                  <h2 className="underline underline--center">{t("ai-responsible:title")}</h2>
                  <p className="big">{parse(t("ai-responsible:summary"))}</p>
                </>
              ),
            },
          ]}
        />
        <Row columns={columns} />
        <Row
          halign={"center"}
          style={homeStackContinueStyle}
          columns={[
            {
              cols: { col: 10, sm: 12 },
              content: (
                <p className="big align align--center">{parse(t("ai-responsible:closing"))}</p>
              ),
            },
          ]}
        />
        <Row
          halign={"center"}
          style={homePreCtaContentRowStyle}
          columns={[
            {
              cols: { col: 12, sm: 12 },
              content: (
                <div className="align align--center section-ai-responsible__cta">
                  {t("ai-responsible:ctaTeaser") && (
                    <p className="section-ai-responsible__cta-teaser">
                      {t("ai-responsible:ctaTeaser")}
                    </p>
                  )}
                  <p>
                    <Button
                      variant={"primary"}
                      href={cta?.link}
                      label={cta?.label ?? t("common:schedule-me-label")}
                      trackSection={"ai-responsible"}
                    />
                  </p>
                  <ContactAlternates trackSection="ai-responsible" />
                </div>
              ),
            },
          ]}
        />
      </Container>
    </section>
  );
}
