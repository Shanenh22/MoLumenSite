import { chromium } from "playwright";
import { chromiumPath } from "./lib/chromium-path.mjs";
import { readFileSync } from "node:fs";
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:F;src:local("Georgia");}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;display:flex;align-items:center;
background:radial-gradient(70rem 40rem at 78% -10%, rgba(176,141,69,.28), transparent 60%),
           radial-gradient(50rem 30rem at 10% 120%, rgba(46,196,182,.18), transparent 60%),
           #16203a;color:#faf6ee;font-family:Georgia,serif;position:relative;overflow:hidden}
.stars{position:absolute;inset:0;background-image:
 radial-gradient(2px 2px at 12% 22%, rgba(200,171,110,.9), transparent),
 radial-gradient(2px 2px at 78% 16%, rgba(250,246,238,.7), transparent),
 radial-gradient(2.5px 2.5px at 62% 62%, rgba(200,171,110,.8), transparent),
 radial-gradient(2px 2px at 88% 74%, rgba(79,209,197,.7), transparent),
 radial-gradient(2px 2px at 33% 82%, rgba(250,246,238,.5), transparent),
 radial-gradient(2px 2px at 50% 34%, rgba(200,171,110,.55), transparent)}
.wrap{padding:0 92px;position:relative;z-index:1;max-width:900px}
.mark{display:flex;align-items:center;gap:16px;margin-bottom:38px}
.mark svg{width:52px;height:52px}
.mark b{font-size:30px;letter-spacing:.02em}
.mark span{font-family:system-ui,sans-serif;font-size:14px;letter-spacing:.34em;color:#c8ab6e;display:block;margin-top:2px}
h1{font-size:66px;line-height:1.08;letter-spacing:-.01em}
.rule{width:96px;height:5px;border-radius:3px;margin:30px 0 26px;
 background:linear-gradient(90deg,#c8ab6e,rgba(200,171,110,.15))}
p{font-family:system-ui,sans-serif;font-size:26px;line-height:1.45;color:rgba(250,246,238,.86)}
</style></head><body><div class="stars"></div><div class="wrap">
<div class="mark">
<svg viewBox="0 0 64 64" fill="none"><g stroke="#c8ab6e" stroke-width="2.4" stroke-linecap="round">
<circle cx="32" cy="32" r="10.5" fill="none"/>
${Array.from({ length: 16 }, (_, i) => {
  const a = (i * 22.5 * Math.PI) / 180;
  const r1 = 15,
    r2 = i % 2 ? 21 : 25;
  return `<line x1="${32 + r1 * Math.cos(a)}" y1="${32 + r1 * Math.sin(a)}" x2="${32 + r2 * Math.cos(a)}" y2="${32 + r2 * Math.sin(a)}"/>`;
}).join("")}
</g></svg>
<div><b>Mo Lumen</b><span>ASTROLOGY</span></div></div>
<h1>See yourself in a new light.</h1>
<div class="rule"></div>
<p>Clarifying astrology readings with a classical lens — practical, candid, and warm.</p>
</div></body></html>`;
const b = await chromium.launch({
  executablePath: chromiumPath(),
});
const p = await b.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await p.setContent(html, { waitUntil: "load" });
await p.screenshot({ path: "public/og-default.png" });
await b.close();
console.log("wrote public/og-default.png");
