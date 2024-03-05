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
    </Head>
  );
};

export default SEO;
