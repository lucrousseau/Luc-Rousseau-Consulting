import Head from "next/head";

const SEO = ({ title, description, image, url }) => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${domain}${image}`} />
      <meta property="og:url" content={`${domain}${url}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${domain}${image}`} />
      <link rel="canonical" href={`${domain}${url}`} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${domain}/favicon/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${domain}/favicon/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${domain}/favicon/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${domain}/favicon/site.webmanifest`} />
    </Head>
  );
};

export default SEO;
