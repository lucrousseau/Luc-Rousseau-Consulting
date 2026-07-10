import type { GetStaticPaths, GetStaticPropsContext } from "next";

import {
  getAllSituationSlugs,
  getSituationBySlug,
  getSituationHreflangPaths,
  getSituationPath,
} from "../../commons/situationsManifest";
import {
  createSlugPageStaticPaths,
  createSlugPageStaticProps,
} from "../../commons/slugPageStaticProps";
import ContentDetailPage, { type ContentDetailPageProps } from "../../sections/ContentDetailPage";

export default function SituationPage(props: ContentDetailPageProps) {
  return <ContentDetailPage variant="situation" {...props} />;
}

export const getStaticPaths: GetStaticPaths = () => {
  return createSlugPageStaticPaths(getAllSituationSlugs);
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
      getAllSlugs: getAllSituationSlugs,
      getBySlug: getSituationBySlug,
      getPath: getSituationPath,
      getHreflangPaths: getSituationHreflangPaths,
    }
  );
}
