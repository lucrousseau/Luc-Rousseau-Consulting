import React from "react";
import { useTranslation } from "next-i18next";
import parse from "html-react-parser";

import SEO from "../SEO";
import Container from "../Layout/Container";
import Header from "../../sections/Header";
import Footer from "../../sections/Footer";
import Row from "../Layout/Row";
import PhotosCarousel from "../../sections/PhotosCarousel";

const CONTAINER_STYLE = {
  "--padding-top": "1rem",
  "--padding-bottom": "1rem",
  "--xs-padding-top": "0rem",
  "--xs-padding-bottom": "0rem",
};

export default function ZineLayout({ namespace, images = [] }) {
  const { t } = useTranslation(["common", "zines", namespace]);

  return (
    <>
      <SEO
        title={t(`${namespace}:zine-seo-title`)}
        description={t(`${namespace}:zine-seo-description`)}
        image={t("zines:zines-seo-image")}
        url="/"
      />
      <Container tag="header" style={CONTAINER_STYLE}>
        <Header cta={false} />
      </Container>
      <main>
        <Container tag="carousel">
          <Row
            halign="center"
            valign="middle"
            columns={[
              {
                cols: { col: 4, lg: 12 },
                content: parse(t(`${namespace}:content`)),
              },
              {
                cols: { col: 8, lg: 12 },
                content: <PhotosCarousel images={images} />,
              },
            ]}
          />
        </Container>
      </main>
      <Container tag="footer" style={CONTAINER_STYLE}>
        <Footer />
      </Container>
    </>
  );
}
