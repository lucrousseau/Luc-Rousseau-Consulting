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
import ContentDetailPage from "../../sections/ContentDetailPage";

/**
 * @param {object} props
 * @param {string} props.namespace
 * @param {string} props.pagePath
 * @param {{ fr?: string; en?: string; default?: string }} props.hreflangPaths
 * @param {string} props.publishedAt
 */
export default function ExpertisePage(props) {
  return <ContentDetailPage variant="expertise" {...props} />;
}

export function getStaticPaths() {
  return createSlugPageStaticPaths(getAllExpertiseSlugs);
}

/** @param {{ params: { slug: string }; locale: string }} context */
export function getStaticProps(context) {
  return createSlugPageStaticProps(context, {
    getAllSlugs: getAllExpertiseSlugs,
    getBySlug: getExpertiseBySlug,
    getPath: getExpertisePath,
    getHreflangPaths: getExpertiseHreflangPaths,
  });
}
