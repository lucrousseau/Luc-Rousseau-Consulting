import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import Product from "../../components/Product";
import Button from "../../components/Button";

export default function CollaborationFit({ cta }) {
  const { t } = useTranslation();

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
        style={{
          "--padding-bottom": "2rem",
          "--sm-padding-bottom": "0rem",
        }}
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
        style={{ "--padding-top": "1.5rem", "--padding-bottom": "2rem" }}
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
                    variant={"secondary"}
                    size={"small"}
                    href={cta?.link ?? t("common:schedule-me")}
                    label={cta?.label ?? t("collaboration-fit:footer-cta-label")}
                    trackSection={"collaboration-fit"}
                  />
                </p>
              </div>
            ),
          },
        ]}
      />
    </Container>
  );
}
