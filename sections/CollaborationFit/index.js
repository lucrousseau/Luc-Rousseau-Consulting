import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import { homeIntroRowStyle, homePreCtaContentRowStyle } from "../../commons/pageRowSpacing";
import { getScheduleCta } from "../../commons/scheduleCta";
import Product from "../../components/Product";
import Button from "../../components/Button";
import ContactAlternates from "../../components/ContactAlternates";

export default function CollaborationFit({ cta }) {
  const { t } = useTranslation();
  const scheduleCta = getScheduleCta(t);

  const columns = t("collaboration-fit:items", { returnObjects: true }).map((item) => ({
    cols: { col: 4, lg: 10, sm: 12 },
    content: (
      <Product key={item.title} title={item.title} className={"align--lg-left"}>
        <>{parse(item.content)}</>
      </Product>
    ),
  }));

  return (
    <Container
      id={t("collaboration-fit:anchor")}
      className="section-collaboration-fit"
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
                <p className="section__badge">{t("collaboration-fit:badge")}</p>
                <h2 className="underline underline--center">{t("collaboration-fit:title")}</h2>
                {parse(t("collaboration-fit:intro"))}
              </>
            ),
          },
        ]}
      />
      <Row columns={columns} />
      <Row
        halign={"center"}
        style={homePreCtaContentRowStyle}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <div className="align align--center section-collaboration-fit__cta">
                {t("collaboration-fit:ctaTeaser") && (
                  <p className="section-collaboration-fit__cta-teaser">
                    {t("collaboration-fit:ctaTeaser")}
                  </p>
                )}
                <p>
                  <Button
                    variant={"primary"}
                    href={cta?.link ?? scheduleCta.link}
                    label={cta?.label ?? t("collaboration-fit:footer-cta-label")}
                    trackSection={"collaboration-fit"}
                  />
                </p>
                <ContactAlternates trackSection="collaboration-fit" />
              </div>
            ),
          },
        ]}
      />
    </Container>
  );
}
