import type { GetStaticPaths, GetStaticPropsContext } from "next";

import {
  getAllExpertiseSlugs,
  getExpertiseBySlug,
  getExpertiseHreflangPaths,
  getExpertisePath,
} from "../../commons/expertiseManifest";
import {
  createSlugPageStaticPaths,
  createSlugPageStaticProps,
} from "../../commons/slugPageStaticProps";
import ContentDetailPage, { type ContentDetailPageProps } from "../../sections/ContentDetailPage";

export default function ExpertisePage(props: ContentDetailPageProps) {
  return <ContentDetailPage variant="expertise" {...props} />;
}

export const getStaticPaths: GetStaticPaths = () => {
  return createSlugPageStaticPaths(getAllExpertiseSlugs);
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context.params?.slug;
  const locale = context.locale;

  if (typeof slug !== "string" || !locale) {
    return { notFound: true };
  }

  return createSlugPageStaticProps(
    { params: { slug }, locale },
    {
      getAllSlugs: getAllExpertiseSlugs,
      getBySlug: getExpertiseBySlug,
      getPath: getExpertisePath,
      getHreflangPaths: getExpertiseHreflangPaths,
    }
  );
}
