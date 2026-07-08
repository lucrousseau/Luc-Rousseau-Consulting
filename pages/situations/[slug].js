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
import ContentDetailPage from "../../sections/ContentDetailPage";

/**
 * @param {object} props
 * @param {string} props.namespace
 * @param {string} props.pagePath
 * @param {{ fr?: string; en?: string; default?: string }} props.hreflangPaths
 * @param {string} props.publishedAt
 */
export default function SituationPage(props) {
  return <ContentDetailPage variant="situation" {...props} />;
}

export function getStaticPaths() {
  return createSlugPageStaticPaths(getAllSituationSlugs);
}

/** @param {{ params: { slug: string }; locale: string }} context */
export function getStaticProps(context) {
  return createSlugPageStaticProps(context, {
    getAllSlugs: getAllSituationSlugs,
    getBySlug: getSituationBySlug,
    getPath: getSituationPath,
    getHreflangPaths: getSituationHreflangPaths,
  });
}
