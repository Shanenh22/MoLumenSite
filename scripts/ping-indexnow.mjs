/**
 * Tells IndexNow (Bing, Yandex, Seznam, Naver) that the sitemap's URLs changed.
 * Free, no account, no rate limit worth worrying about at this size. Google
 * does not participate — it uses the sitemap's lastmod instead, which is why
 * that was added at the same time.
 *
 * Run after a production deploy:  node scripts/ping-indexnow.mjs
 * Does nothing unless PUBLIC_SITE_URL points at the live domain, so it cannot
 * submit staging URLs by accident.
 */
import { readFileSync } from "node:fs";

const site = process.env.PUBLIC_SITE_URL || "https://molumen.com";
const host = new URL(site).host;
if (host.includes("workers.dev") || host.includes("localhost")) {
  console.log(`[indexnow] ${host} is not the production host — skipping.`);
  process.exit(0);
}

const key = JSON.parse(readFileSync("src/data/indexnow.json", "utf8")).key;

const xml = readFileSync("dist/sitemap-0.xml", "utf8");
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) {
  console.error(
    "[indexnow] no URLs found in dist/sitemap-0.xml — build first.",
  );
  process.exit(1);
}

const body = { host, key, keyLocation: `${site}/${key}.txt`, urlList };
const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});
console.log(
  `[indexnow] submitted ${urlList.length} URLs -> HTTP ${res.status}`,
);
if (res.status >= 400) {
  console.error(await res.text());
  process.exit(1);
}
