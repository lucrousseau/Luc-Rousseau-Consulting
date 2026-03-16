import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";

import Product from "../../components/Product";
import Button from "../../components/Button";

export default function WhatICanDo({ cta }) {
  const { t } = useTranslation();

  const columns = t("whaticando:items", { returnObjects: true }).map((item) => {
    return {
      cols: { col: 4, lg: 6, sm: 12 },
      content: (
        <Product title={item.title}>
          <>
            <p>{item.subtitle}</p>
            {parse(item.content)}
          </>
        </Product>
      ),
    };
  });

  return (
    <Container id={t("whaticando:anchor")} align={"center"} halign={"center"}>
      <Row
        halign={"center"}
        style={{
          "--padding-bottom": "2rem",
          "--sm-padding-bottom": "2rem",
        }}
        columns={[
          {
            cols: { col: 11, xl: 12, sm: 12 },
            content: (
              <>
                <h2 className="underline underline--center">{t("whaticando:title")}</h2>
                {parse(t("whaticando:summary"))}
              </>
            ),
          },
        ]}
      />
      <Row
        id={"whaticando__items"}
        halign={"center"}
        style={{
          "--padding-bottom": "2rem",
          "--sm-padding-bottom": "2rem",
        }}
        columns={columns}
      />
      <Row
        columns={[
          {
            content: (
              <>
                {parse(t("whaticando:footer-content"))}
                <p>
                  <Button
                    variant={"primary"}
                    href={cta?.link ?? t("hello@lucrousseau.com")}
                    label={cta?.label ?? t("whaticando:footer-cta-label")}
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
