import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../config/site";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const GET: APIRoute = async () => {
  /**
   * RSS is a publication feed, so only collections with a real publication
   * date belong here. Current Sky entries deliberately store the astronomical
   * event date (`start`) and the research verification date (`lastVerified`),
   * neither of which is the date the page was published. Treating either as
   * `pubDate` would turn an astronomy date into editorial metadata and can make
   * far-future events appear to be newly published articles.
   *
   * If Current Sky later gains a genuine `publishDate` field, it can be added
   * back to this feed without inventing one in the meantime.
   */
  const posts = (await getCollection("blog"))
    .filter((a) => !a.data.draft)
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
    .slice(0, 30);

  const items = posts.map((a) => ({
    title: a.data.title,
    description: a.data.description,
    link: `${site.url}/blog/${a.id.replace(/\.mdx?$/, "")}/`,
    pubDate: a.data.publishDate,
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(site.name)}, Articles</title>
<link>${site.url}</link>
<description>${esc(`Articles and essays from ${site.name}.`)}</description>
<language>en-us</language>
${items
  .map(
    (i) =>
      `<item><title>${esc(i.title)}</title><link>${i.link}</link><guid>${i.link}</guid><pubDate>${i.pubDate.toUTCString()}</pubDate><description>${esc(i.description)}</description></item>`,
  )
  .join("\n")}
</channel></rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
