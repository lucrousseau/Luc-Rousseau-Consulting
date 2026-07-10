import type { ReactNode } from "react";

import Container from "../../components/Layout/Container";
import SEO from "../../components/SEO";
import Footer from "../Footer";
import Header from "../Header";
import { pageShellStyle } from "../../commons/pageRowSpacing";

interface CvPageLayoutProps {
  seoTitle: string;
  children?: ReactNode;
  mainClassName?: string;
}

export default function CvPageLayout({
  seoTitle,
  children,
  mainClassName = "page-cv",
}: CvPageLayoutProps) {
  return (
    <>
      <SEO title={seoTitle} noindex />
      <Container tag="header" className="cv-print-hide" style={pageShellStyle}>
        <Header showNavigation={false} showCta={false} showSocial={false} />
      </Container>
      <main className={mainClassName}>{children}</main>
      <Container tag="footer" className="cv-print-hide" style={pageShellStyle}>
        <Footer showNavigation={false} />
      </Container>
    </>
  );
}
