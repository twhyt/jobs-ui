import Head from "next/head";

type MetaProps = {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  url?: string;
};

export default function Meta({
  title = "Home",
  description = "Job Solution empowers businesses with AI-driven hiring tools...",
  ogTitle,
  ogDescription,
  ogImage = "/JobSolution_OG_image.png",
  url = "https://jobsolution.me",
}: MetaProps) {
  return (
    <Head>
      <title>{title} - Job Solution</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="jobsolution.me" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
