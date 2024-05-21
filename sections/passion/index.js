import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Grid from "../../components/Layout/Grid";
import Container from "../../components/Layout/Container";

import Picture from "../../components/Picture";
import Button from "../../components/Button";

export default function Passion() {
  const { t, i18n } = useTranslation();

  return (
    <Container align={"center"} halign={"center"}>
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
                <h2 className="underline underline--center">
                  {t("passion:title")}
                </h2>
                {parse(t("passion:summary"))}
              </>
            ),
          },
        ]}
      />
      <Grid
        className="grid"
        style={{ aspectRatio: "16/10" }}
        template={[
          {
            cols: { col: 6 },
            rows: { row: 12 },
            content: (
              <Picture
                src={"/images/clearwater-falls.jpg"}
                width={1527}
                height={2048}
                alt={"Clearwater Falls"}
                absolute={true}
              />
            ),
          },
          {
            cols: { col: 6 },
            rows: { row: 6 },
            content: (
              <Picture
                src={"/images/grand-teton-mouton-barn.jpg"}
                width={2048}
                height={1365}
                alt={"Grand Teton"}
                absolute={true}
              />
            ),
          },
          {
            cols: { col: 6 },
            rows: { row: 6 },
            content: (
              <Picture
                src={"/images/portland-lighthouse.jpg"}
                width={2048}
                height={1365}
                alt={"Portland"}
                absolute={true}
              />
            ),
          },
        ]}
      />
      <Row
        style={{ "--padding-top": "2rem", "--sm-padding-top": "2rem" }}
        columns={[
          {
            content: (
              <p>
                <Button
                  variant={"primary"}
                  label={t("passion:footer-cta-label")}
                  href={t("hello@lucrousseau.com")}
                />
              </p>
            ),
          },
        ]}
      />
    </Container>
  );
}
