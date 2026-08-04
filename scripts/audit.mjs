import fs from "fs";
import path from "path";
const root = "./dist";
const pages = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".html")) pages.push(p);
  }
})(root);
const url = (p) =>
  (
    "/" +
    path
      .relative(root, p)
      .replace(/index\.html$/, "")
      .replace(/\\/g, "/")
  ).replace(/\/+/g, "/");
/**
 * Titles and descriptions are HTML-escaped in the built output, so an
 * apostrophe is five characters (&#39;) rather than one. Measuring the escaped
 * form over-counts and produced a false "title too long" on a title that is
 * exactly 60. Decode before measuring anything by length.
 */
const decodeEntities = (s) =>
  (s || "")
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCharCode(parseInt(h, 16)),
    )
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

const get = (h, re) => {
  const m = h.match(re);
  return m ? m[1].trim() : null;
};
const rows = pages.map((p) => {
  const h = fs.readFileSync(p, "utf8");
  const body = h.replace(
    /<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g,
    "",
  );
  const headings = [...body.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g)].map(
    (m) => ({ lvl: +m[1], txt: m[2].replace(/<[^>]+>/g, "").trim() }),
  );
  const imgs = [...body.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
  return {
    url: url(p),
    title: decodeEntities(get(h, /<title>([^<]*)<\/title>/)),
    desc: decodeEntities(get(h, /<meta name="description" content="([^"]*)"/)),
    canonical: get(h, /<link rel="canonical" href="([^"]*)"/),
    noindex: /name="robots" content="noindex"/.test(h),
    h1: headings.filter((x) => x.lvl === 1).length,
    headings,
    imgs: imgs.length,
    noAlt: imgs.filter((i) => !/\salt=/.test(i)).length,
    noDims: imgs.filter((i) => !(/\swidth=/.test(i) && /\sheight=/.test(i)))
      .length,
    jsonld: (h.match(/application\/ld\+json/g) || []).length,
    words: body
      .replace(/<[^>]+>/g, " ")
      .split(/\s+/)
      .filter(Boolean).length,
    links: [
      ...new Set([...body.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1])),
    ],
  };
});

const idx = Object.fromEntries(rows.map((r) => [r.url, r]));
console.log(`AUDIT — ${rows.length} pages\n`);

// duplicates
const dupT = {},
  dupD = {};
rows
  .filter((r) => !r.noindex)
  .forEach((r) => {
    (dupT[r.title] ??= []).push(r.url);
    (dupD[r.desc] ??= []).push(r.url);
  });
const dt = Object.entries(dupT).filter(([, v]) => v.length > 1),
  dd = Object.entries(dupD).filter(([, v]) => v.length > 1);
console.log(
  "1. DUPLICATE TITLES:",
  dt.length
    ? dt.map(([k, v]) => `\n   "${k}" → ${v.join(", ")}`).join("")
    : "none",
);
console.log(
  "2. DUPLICATE DESCRIPTIONS:",
  dd.length ? dd.map(([k, v]) => `\n   ${v.join(", ")}`).join("") : "none",
);

// lengths
const longT = rows.filter((r) => !r.noindex && r.title && r.title.length > 60);
const badD = rows.filter(
  (r) => !r.noindex && r.desc && (r.desc.length > 160 || r.desc.length < 70),
);
console.log(
  `3. TITLES >60 chars: ${longT.length}`,
  longT
    .slice(0, 6)
    .map((r) => `\n   ${r.title.length} ${r.url}`)
    .join(""),
);
console.log(
  `4. DESCRIPTIONS outside 70–160: ${badD.length}`,
  badD
    .slice(0, 8)
    .map((r) => `\n   ${r.desc.length} ${r.url}`)
    .join(""),
);

// headings
const badH1 = rows.filter((r) => r.h1 !== 1);
console.log(
  `5. PAGES WITHOUT EXACTLY ONE H1: ${badH1.length}`,
  badH1.map((r) => `\n   h1=${r.h1} ${r.url}`).join(""),
);
const skips = [];
rows.forEach((r) => {
  let prev = 0;
  r.headings.forEach((h) => {
    if (prev && h.lvl > prev + 1)
      skips.push(`${r.url} h${prev}→h${h.lvl} ("${h.txt.slice(0, 40)}")`);
    prev = h.lvl;
  });
});
console.log(
  `6. HEADING-LEVEL SKIPS: ${skips.length}`,
  [...new Set(skips)]
    .slice(0, 10)
    .map((s) => "\n   " + s)
    .join(""),
);

// images / schema
console.log(
  `7. IMAGES MISSING ALT: ${rows.reduce((s, r) => s + r.noAlt, 0)} | MISSING width/height: ${rows.reduce((s, r) => s + r.noDims, 0)}`,
);
console.log(
  `8. PAGES WITHOUT JSON-LD: ${rows.filter((r) => !r.jsonld).length}`,
);
console.log(
  `9. PAGES WITHOUT CANONICAL: ${rows.filter((r) => !r.canonical).length}`,
);

// thin content
const thin = rows
  .filter((r) => !r.noindex && r.words < 350)
  .sort((a, b) => a.words - b.words);
console.log(
  `10. THIN PAGES (<350 words incl. chrome): ${thin.length}`,
  thin
    .slice(0, 10)
    .map((r) => `\n   ${String(r.words).padStart(4)} ${r.url}`)
    .join(""),
);

// orphans + depth
const inbound = {};
rows.forEach((r) =>
  r.links.forEach((l) => {
    const t = l.endsWith("/") ? l : l + "/";
    if (idx[t] && t !== r.url) (inbound[t] ??= new Set()).add(r.url);
  }),
);
const orphans = rows.filter(
  (r) => !r.noindex && r.url !== "/" && !inbound[r.url]?.size,
);
console.log(
  `11. ORPHAN PAGES (no internal inbound links): ${orphans.length}`,
  orphans.map((r) => "\n   " + r.url).join(""),
);
// BFS depth from home
const depth = { "/": 0 };
let frontier = ["/"];
while (frontier.length) {
  const nxt = [];
  for (const u of frontier) {
    for (let l of idx[u]?.links || []) {
      l = l.endsWith("/") ? l : l + "/";
      if (idx[l] && depth[l] === undefined) {
        depth[l] = depth[u] + 1;
        nxt.push(l);
      }
    }
  }
  frontier = nxt;
}
const deep = rows.filter(
  (r) => !r.noindex && (depth[r.url] === undefined || depth[r.url] > 3),
);
console.log(
  `12. PAGES >3 CLICKS FROM HOME (or unreachable): ${deep.length}`,
  deep
    .slice(0, 10)
    .map((r) => `\n   d=${depth[r.url] ?? "∞"} ${r.url}`)
    .join(""),
);
const lowLinks = rows
  .filter((r) => !r.noindex && r.url !== "/" && (inbound[r.url]?.size || 0) < 3)
  .sort((a, b) => (inbound[a.url]?.size || 0) - (inbound[b.url]?.size || 0));
console.log(
  `13. PAGES WITH <3 INBOUND INTERNAL LINKS: ${lowLinks.length}`,
  lowLinks
    .slice(0, 12)
    .map((r) => `\n   ${inbound[r.url]?.size || 0} ${r.url}`)
    .join(""),
);
