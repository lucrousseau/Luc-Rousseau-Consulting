import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";

import Product from "../../components/Product";

export default function Services() {
  const { t } = useTranslation();

  const columns = t("services:items", { returnObjects: true }).map((item) => {
    return {
      cols: { col: 4, lg: 10, sm: 12 },
      content: (
        <Product title={item.title} label={item["cta-label"]} className={"align--lg-left"}>
          <>
            <p>{item.subtitle}</p>
            {parse(item.content)}
          </>
        </Product>
      ),
    };
  });

  return (
    <Container id={t("services:anchor")} align={"center"} halign={"center"}>
      <Row
        halign={"center"}
        style={{ "--padding-bottom": "2rem" }}
        columns={[
          {
            cols: { col: 11, xl: 12, sm: 12 },
            content: (
              <>
                <h2 className="underline underline--center">{t("services:title")}</h2>
                {parse(t("services:summary"))}
              </>
            ),
          },
        ]}
      />
      <Row columns={columns} />
    </Container>
  );
}
