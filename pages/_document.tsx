import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-scroll-behavior="smooth">
      <Head>
        <link
          rel="preload"
          href="/fonts/QuincyCF-Black.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/QuincyCF-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
