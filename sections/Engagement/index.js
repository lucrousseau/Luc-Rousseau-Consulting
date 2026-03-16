import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import Product from "../../components/Product";
import Button from "../../components/Button";

export default function Engagement({ cta }) {
  const { t } = useTranslation();

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
    <Container id={t("engagement:anchor")} align={"center"} halign={"center"}>
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
                <p className="section__badge">{t("engagement:badge")}</p>
                <h2 className="underline underline--center">{t("engagement:headline")}</h2>
                {t("engagement:subhead") && <p className="big">{t("engagement:subhead")}</p>}
                <p className="big">{t("engagement:valueStatement")}</p>
              </>
            ),
          },
        ]}
      />
      <Row columns={columns} />
      <Row
        halign={"center"}
        style={{ "--padding-top": "2rem", "--padding-bottom": "2rem" }}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <>
                <p className="big">{t("engagement:differentiator")}</p>
                <p>{t("engagement:ctaTeaser")}</p>
                <p>
                  <Button
                    variant={"primary"}
                    href={cta?.link ?? t("schedule-me")}
                    label={cta?.label ?? t("engagement:ctaLabel")}
                  />
                </p>
              </>
            ),
          },
        ]}
      />
    </Container>
  );
}
