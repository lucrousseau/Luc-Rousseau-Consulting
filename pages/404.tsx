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
    ? "This path does not exist on lucrousseau.com. Below are links to help you find what you're looking for."
    : "Ce chemin n'existe pas sur lucrousseau.com. Vous trouverez ci-dessous des liens pour vous orienter.";

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

        <h2 style={{ fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>
          {isEn ? "Where to look next" : "Où chercher"}
        </h2>
        <ul style={{ margin: "0 0 1.5rem", paddingLeft: "1.25rem", lineHeight: 1.8 }}>
          <li>
            <Link href={homeHref}>
              <strong>{isEn ? "Home" : "Accueil"}</strong>
            </Link>
            {" — "}
            {isEn
              ? "Product engineering and technical consulting services"
              : "Services d'ingénierie produit et consultation technique"}
          </li>
          <li>
            <Link href={situationsHref}>
              <strong>{isEn ? "Situations" : "Situations"}</strong>
            </Link>
            {" — "}
            {isEn
              ? "Audience-specific engagement pages for different use cases"
              : "Pages d'engagement spécifiques par audience et cas d'usage"}
          </li>
          <li>
            <Link href={developersHref}>
              <strong>
                {isEn ? "Developer resources" : "Ressources développeurs"}
              </strong>
            </Link>
            {" — "}
            {isEn
              ? "OpenAPI spec, llms.txt, and machine-readable endpoints"
              : "Spécification OpenAPI, llms.txt et endpoints lisibles par machine"}
          </li>
        </ul>

        <h2 style={{ fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>
          {isEn ? "Machine-readable resources" : "Ressources machine"}
        </h2>
        <ul style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 1.8 }}>
          <li>
            <a href="/llms.txt">
              <strong>llms.txt</strong>
            </a>
            {" — "}
            {isEn ? "Site index for LLM systems" : "Index du site pour systèmes LLM"}
          </li>
          <li>
            <a href="/openapi.json">
              <strong>openapi.json</strong>
            </a>
            {" — "}
            {isEn ? "API specification (OpenAPI 3.1)" : "Spécification API (OpenAPI 3.1)"}
          </li>
          <li>
            <a href="/sitemap.xml">
              <strong>sitemap.xml</strong>
            </a>
            {" — "}
            {isEn ? "Complete site map" : "Plan complet du site"}
          </li>
        </ul>
      </main>
    </>
  );
}
