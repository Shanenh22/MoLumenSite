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
  const skyEvents = await getCollection("skyEvents");
  const posts = (await getCollection("blog")).filter((a) => !a.data.draft);

  const items = [
    ...skyEvents.map((e) => ({
      title: e.data.title,
      description: e.data.summary,
      link: `${site.url}/current-sky/events/${e.id.replace(/\.mdx?$/, "")}/`,
      pubDate: e.data.start,
    })),
    ...posts.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      link: `${site.url}/blog/${a.id.replace(/\.mdx?$/, "")}/`,
      pubDate: a.data.publishDate,
    })),
  ]
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf())
    .slice(0, 30);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(site.name)} — Current Sky &amp; Blog</title>
<link>${site.url}</link>
<description>${esc(site.description)}</description>
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
