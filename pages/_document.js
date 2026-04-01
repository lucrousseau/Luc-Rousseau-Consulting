import { Head, Html, Main, NextScript } from "next/document";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              title="Google Tag Manager"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
