import { join } from "path";
import { promises as fs } from "fs";
import React from "react";
import { useTranslation } from "next-i18next";
import sizeOf from "image-size";

import parse from "html-react-parser";

import SEO from "../../components/SEO";
import Container from "../../components/Layout/Container";

import Header from "../../sections/Header";
import Footer from "../../sections/Footer";
import Row from "../../components/Layout/Row";

import PhotosCarousel from "../../sections/PhotosCarousel";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Zine({ images }) {
  const { t } = useTranslation(["common", "zines", "zine-01-mex"]);

  return (
    <>
      <SEO
        title={t("zine-01-mex:zine-seo-title")}
        description={t("zine-01-mex:zine-seo-description")}
        image={t("zines:zines-seo-image")}
        url="/"
      />
      <Container
        tag={"header"}
        style={{
          "--padding-top": "1rem",
          "--padding-bottom": "1rem",
          "--xs-padding-top": "0rem",
          "--xs-padding-bottom": "0rem",
        }}
      >
        <Header cta={false} />
      </Container>
      <main>
        <Container tag={"carousel"}>
          <Row
            halign={"center"}
            valign={"middle"}
            columns={[
              {
                cols: { col: 4, lg: 12 },
                content: parse(t("zine-01-mex:content")),
              },
              {
                cols: { col: 8, lg: 12 },
                content: <PhotosCarousel images={images} />,
              },
            ]}
          />
        </Container>
      </main>
      <Container
        tag={"footer"}
        style={{
          "--padding-top": "1rem",
          "--padding-bottom": "1rem",
        }}
      >
        <Footer />
      </Container>
    </>
  );
}

export const getServerSideProps = async ({ locale }) => {
  const folder = "images/zines/01_mex";
  const folderPath = join(process.cwd(), "public", folder);

  const validExtensions = [".jpeg", ".jpg", ".png"];

  const images = await Promise.all(
    (
      await fs.readdir(folderPath)
    )
      .filter((image) =>
        validExtensions.includes(image.toLowerCase().slice(-4))
      )
      .map(async (image) => {
        const imagePath = join(folderPath, image);
        const dimensions = sizeOf(imagePath);
        return {
          src: `/${folder}/${image}`,
          width: dimensions.width,
          height: dimensions.height,
        };
      })
  );

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "zines",
        "zine-01-mex",
      ])),
      images,
    },
  };
};
