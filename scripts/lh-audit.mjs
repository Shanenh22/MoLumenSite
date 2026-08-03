import http from "http";
import fs from "fs";
import path from "path";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
const root = process.env.DIST || "./dist"; // run from repo root: node scripts/lh-audit.mjs
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
await new Promise((r) => srv.listen(4600, r));
const chrome = await launch({
  chromeFlags: ["--headless", "--no-sandbox", "--disable-gpu"],
  chromePath: "/opt/pw-browsers/chromium",
});
const pages = [
  ["/", "Homepage"],
  ["/readings/", "Readings hub"],
  ["/readings/natal/", "Natal service"],
  ["/explore/signs/scorpio/", "Sign page"],
  ["/blog/", "Blog"],
  ["/start-here/", "Start Here"],
];
for (const [url, label] of pages) {
  for (const formFactor of ["mobile", "desktop"]) {
    const opts = {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      screenEmulation:
        formFactor === "desktop"
          ? {
              mobile: false,
              width: 1350,
              height: 940,
              deviceScaleFactor: 1,
              disabled: false,
            }
          : undefined,
      formFactor,
      throttling:
        formFactor === "desktop"
          ? { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 }
          : undefined,
    };
    const r = await lighthouse("http://localhost:4600" + url, opts);
    const c = r.lhr.categories;
    const a = r.lhr.audits;
    console.log(
      `${label.padEnd(16)} ${formFactor.padEnd(8)} P:${Math.round(c.performance.score * 100)} A11y:${Math.round(c.accessibility.score * 100)} BP:${Math.round(c["best-practices"].score * 100)} SEO:${Math.round(c.seo.score * 100)}  LCP:${a["largest-contentful-paint"].displayValue} CLS:${a["cumulative-layout-shift"].displayValue} TBT:${a["total-blocking-time"].displayValue}`,
    );
    if (formFactor === "mobile" && url === "/") {
      const opp = r.lhr.audits;
      const keys = [
        "unused-css-rules",
        "render-blocking-resources",
        "uses-responsive-images",
        "modern-image-formats",
        "efficient-animated-content",
        "uses-text-compression",
        "font-display",
        "third-party-summary",
        "legacy-javascript",
      ];
      console.log("  --- opportunities (homepage mobile) ---");
      keys.forEach((k) => {
        const x = opp[k];
        if (x && x.score !== null && x.score < 1)
          console.log(`   ${k}: ${x.displayValue || ""} ${x.title}`);
      });
      const fails = Object.values(r.lhr.audits).filter(
        (x) =>
          x.score !== null &&
          x.score < 1 &&
          ["seo", "best-practices"].some(() => true),
      );
    }
  }
}
await chrome.kill();
srv.close();
process.exit(0);
