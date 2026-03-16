import { useTranslation } from "next-i18next";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";
import Product from "../../components/Product";

export default function Differentiation() {
  const { t } = useTranslation();

  const columns = t("differentiation:items", { returnObjects: true }).map((item) => ({
    cols: { col: 4, lg: 10, sm: 12 },
    content: (
      <Product key={item.title} title={item.title} className={"align--lg-left"}>
        <p>{item.content}</p>
      </Product>
    ),
  }));

  return (
    <Container id={t("differentiation:anchor")} align={"center"} halign={"center"}>
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
                <h2 className="underline underline--center">{t("differentiation:title")}</h2>
                <p className="big">{t("differentiation:summary")}</p>
              </>
            ),
          },
        ]}
      />
      <Row columns={columns} />
      <Row
        halign={"center"}
        style={{ "--padding-top": "1.5rem" }}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: <p className="big align align--center">{t("differentiation:closing")}</p>,
          },
        ]}
      />
    </Container>
  );
}
