import Container from "../../components/Layout/Container";
import SEO from "../../components/SEO";
import Footer from "../Footer";
import Header from "../Header";

/**
 * Minimal chrome for private noindex CV pages (logo + language, copyright only).
 * @param {object} props
 * @param {string} props.seoTitle
 * @param {import('react').ReactNode} [props.children]
 * @param {string} [props.mainClassName]
 */
export default function CvPageLayout({ seoTitle, children, mainClassName = "page-cv" }) {
  return (
    <>
      <SEO title={seoTitle} noindex />
      <Container
        tag="header"
        className="cv-print-hide"
        style={{
          "--padding-top": "1rem",
          "--padding-bottom": "1rem",
        }}
      >
        <Header showNavigation={false} showCta={false} showSocial={false} />
      </Container>
      <main className={mainClassName}>{children}</main>
      <Container
        tag="footer"
        className="cv-print-hide"
        style={{
          "--padding-top": "1rem",
          "--padding-bottom": "1rem",
        }}
      >
        <Footer showNavigation={false} />
      </Container>
    </>
  );
}
