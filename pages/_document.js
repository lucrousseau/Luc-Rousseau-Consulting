import { Head, Html, Main, NextScript } from "next/document";

import { GTM_CONTAINER_ID, isGtmEnabled } from "../utils/gtm";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        {isGtmEnabled() ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
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
