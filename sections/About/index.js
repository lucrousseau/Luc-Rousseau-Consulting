import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import Row from "../../components/Layout/Row";
import Container from "../../components/Layout/Container";

export default function About() {
  const { t } = useTranslation();

  return (
    <Container id={t("about:anchor")} align={"center"} halign={"center"}>
      <Row
        halign={"center"}
        columns={[
          {
            cols: { col: 10, sm: 12 },
            content: (
              <>
                <h2 className="underline underline--center">{t("about:title")}</h2>
                <div className="big">{parse(t("about:content"))}</div>
              </>
            ),
          },
        ]}
      />
    </Container>
  );
}
