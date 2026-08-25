import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * Agent-friendly 404: real HTTP 404 with recovery links (no client redirect to 200).
 * Markdown clients receive a text/markdown 404 body via proxy.ts content negotiation.
 */
export default function NotFound() {
  const router = useRouter();
  const isEn = router.locale === "en";
  const homeHref = isEn ? "/en" : "/";
  const developersHref = isEn ? "/en/developers" : "/developers";
  const situationsHref = isEn ? "/en/situations" : "/situations";

  const title = isEn ? "Page not found | Luc Rousseau" : "Page introuvable | Luc Rousseau";
  const heading = isEn ? "Page not found" : "Page introuvable";
  const lead = isEn
    ? "This path does not exist on lucrousseau.com. Use the links below to continue."
    : "Ce chemin n'existe pas sur lucrousseau.com. Utilisez les liens ci-dessous pour continuer.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem 1.25rem",
          maxWidth: "40rem",
          margin: "0 auto",
          fontFamily: "Georgia, 'Times New Roman', serif",
          lineHeight: 1.5,
        }}
      >
        <p
          style={{
            margin: 0,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontSize: "0.85rem",
          }}
        >
          Luc Rousseau
        </p>
        <h1 style={{ margin: "0.75rem 0 0.5rem", fontSize: "2rem" }}>{heading}</h1>
        <p style={{ margin: "0 0 1.5rem" }}>{lead}</p>
        <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
          <li>
            <Link href={homeHref}>{isEn ? "Home" : "Accueil"}</Link>
          </li>
          <li>
            <Link href={situationsHref}>{isEn ? "Situations" : "Situations"}</Link>
          </li>
          <li>
            <Link href={developersHref}>
              {isEn ? "Luc Rousseau developer resources" : "Ressources développeurs Luc Rousseau"}
            </Link>
          </li>
          <li>
            <a href="/llms.txt">llms.txt</a>
          </li>
          <li>
            <a href="/openapi.json">openapi.json</a>
          </li>
          <li>
            <a href="/sitemap.xml">sitemap.xml</a>
          </li>
        </ul>
      </main>
    </>
  );
}
