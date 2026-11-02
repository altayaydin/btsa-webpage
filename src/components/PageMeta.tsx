// React 19 moves these tags into <head>, and removes them when the page unmounts.
export function PageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
}: {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
    </>
  );
}
