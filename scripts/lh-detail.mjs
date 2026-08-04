import http from "http";
import { chromiumPath } from "./lib/chromium-path.mjs";
import fs from "fs";
import path from "path";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
const root = "./dist";
const types = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
};
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  let f = path.join(root, p);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory())
    f = path.join(f, "index.html");
  if (!fs.existsSync(f)) {
    res.statusCode = 404;
    f = path.join(root, "404.html");
  }
  res.setHeader(
    "Content-Type",
    types[path.extname(f)] || "application/octet-stream",
  );
  res.setHeader("Cache-Control", "public, max-age=31536000");
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => srv.listen(4601, r));
const chrome = await launch({
  chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
  chromePath: chromiumPath(),
});
const r = await lighthouse("http://localhost:4601/", {
  port: chrome.port,
  output: "json",
  logLevel: "error",
  formFactor: "mobile",
});
const A = r.lhr.audits;
console.log("=== ACCESSIBILITY failures ===");
Object.entries(A)
  .filter(
    ([k, v]) =>
      v.score !== null &&
      v.score < 1 &&
      r.lhr.categories.accessibility.auditRefs.some((a) => a.id === k),
  )
  .forEach(([k, v]) => {
    console.log(` ${k}: ${v.title}`);
    (v.details?.items || [])
      .slice(0, 3)
      .forEach((i) =>
        console.log(
          "    →",
          (i.node?.snippet || i.node?.selector || "").slice(0, 150),
        ),
      );
  });
console.log("\n=== LCP breakdown ===");
console.log(
  " LCP element:",
  JSON.stringify(
    A["largest-contentful-paint-element"]?.details?.items?.[0]?.items?.[0]?.node
      ?.snippet || "n/a",
  ).slice(0, 200),
);
A["lcp-lazy-loaded"] &&
  A["lcp-lazy-loaded"].score < 1 &&
  console.log(" LCP image is lazy-loaded!");
console.log(
  " FCP:",
  A["first-contentful-paint"].displayValue,
  "| Speed Index:",
  A["speed-index"].displayValue,
  "| TTFB:",
  A["server-response-time"].displayValue,
);
const net = A["network-requests"]?.details?.items || [];
console.log("\n=== Heaviest resources ===");
net
  .filter((i) => i.transferSize > 8000)
  .sort((a, b) => b.transferSize - a.transferSize)
  .slice(0, 10)
  .forEach((i) =>
    console.log(
      ` ${String(Math.round(i.transferSize / 1024)).padStart(5)} KB  ${i.resourceType || ""}  ${i.url.replace("http://localhost:4601", "")}`,
    ),
  );
console.log(
  "\n=== Total bytes:",
  Math.round(net.reduce((s, i) => s + (i.transferSize || 0), 0) / 1024),
  "KB across",
  net.length,
  "requests",
);
await chrome.kill();
srv.close();
process.exit(0);
