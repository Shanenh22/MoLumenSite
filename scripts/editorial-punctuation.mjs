import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOTS = ["src/pages", "src/components", "src/layouts", "src/content", "src/data"];
const EXTENSIONS = new Set([".astro", ".md", ".mdx", ".json", ".ts"]);
const EXCLUDED = new Set(["src/content/testimonials/testimonials.json"]);
const EM_DASH = "—";

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files.push(...walk(path));
    else if (EXTENSIONS.has(extname(path))) files.push(path.replaceAll("\\", "/"));
  }
  return files;
}

function blankMatch(match) {
  return match.replace(/[^\n]/g, " ");
}

function readerFacingSource(path) {
  let text = readFileSync(path, "utf8");

  // Code comments and embedded CSS/JS are not reader-facing prose. Replace
  // them with whitespace so line numbers remain useful in failures.
  text = text
    .replace(/\/\*[\s\S]*?\*\//g, blankMatch)
    .replace(/<!--[\s\S]*?-->/g, blankMatch)
    .replace(/<style\b[\s\S]*?<\/style>/gi, blankMatch)
    .replace(/<script\b[\s\S]*?<\/script>/gi, blankMatch)
    .replace(/^\s*\/\/.*$/gm, blankMatch);

  // BaseLayout deliberately keeps one em dash in clampDesc's punctuation
  // character class. It is parser code, not public copy. Any second em dash in
  // that file still fails this guard.
  if (path === "src/layouts/BaseLayout.astro" && text.includes("clampDesc")) {
    text = text.replace(EM_DASH, " ");
  }

  return text;
}

const failures = [];
for (const root of ROOTS) {
  for (const path of walk(root)) {
    if (EXCLUDED.has(path)) continue;
    const text = readerFacingSource(path);
    const lines = text.split("\n");
    lines.forEach((line, index) => {
      if (line.includes(EM_DASH)) failures.push(`${path}:${index + 1}`);
    });
  }
}

if (failures.length > 0) {
  console.error(
    "Reader-facing em dash found. Rewrite with other punctuation or sentence structure. " +
      "Verbatim testimonials are the only content exception.",
  );
  for (const failure of failures) console.error(`ERROR: ${failure}`);
  process.exit(1);
}

console.log("Editorial punctuation: reader-facing em dash check passed.");
