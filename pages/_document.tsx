import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-scroll-behavior="smooth">
      <Head>
        {/* h1/h2 use weight 900 only; Medium would compete with the LCP photo on 4G. */}
        <link
          rel="preload"
          href="/fonts/QuincyCF-Black.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="low"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
