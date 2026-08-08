/**
 * A localhost static server for `dist/`, shared by the browser test suites.
 *
 * WHY THIS SERVES FROM A MANIFEST RATHER THAN FROM THE REQUEST PATH
 *
 * The obvious implementation — `join("dist", decodeURIComponent(req.url))` —
 * is a path traversal, and CodeQL flags it as js/path-injection. It is right
 * to: `decodeURIComponent` will happily turn `%2e%2e%2f` into `../`, and the
 * result is handed straight to the filesystem.
 *
 * The first fix was to resolve the path and refuse anything outside `dist/`.
 * That is genuinely safe — verified against both encoded and unencoded
 * traversals — but CodeQL does not model the guard as a barrier, so the alerts
 * stayed. Suppressing them would have meant teaching the next person that these
 * particular alerts are noise, which is exactly how a real one gets waved
 * through later.
 *
 * So the taint is removed instead of contained. Every file under `dist/` is
 * enumerated once at startup into a Map from URL path to absolute path, and a
 * request is a **lookup**, not a construction. The value handed to
 * `createReadStream` comes from `readdirSync`, never from the request, so there
 * is no flow to flag and no guard to get subtly wrong.
 *
 * It is also a more honest model of what Cloudflare actually serves: a fixed
 * set of built assets, where anything not in the set is a 404.
 */
import http from "node:http";
import { createReadStream, readdirSync, statSync } from "node:fs";
import { extname, join, posix, resolve } from "node:path";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

/**
 * Every file under `root`, keyed by the URL path that should serve it.
 *
 * Keys are absolute URL paths ("/current-sky/calendar/index.html"). Building
 * them with `posix.join("/", …)` rather than plain `posix.join` is the whole
 * difference between a working manifest and one where only "/" resolves —
 * `posix.join("", "about")` is "about", which no request will ever match.
 */
function buildManifest(root) {
  const files = new Map();
  const walk = (dir, urlPrefix) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      const urlPath = posix.join("/", urlPrefix, name);
      if (statSync(full).isDirectory()) {
        walk(full, urlPath);
        continue;
      }
      files.set(urlPath, full);
      // Directory-style routes: /about/ and /about both serve /about/index.html
      if (name === "index.html") {
        const dirUrl = posix.join("/", urlPrefix) + "/";
        files.set(dirUrl.replace(/\/{2,}$/, "/"), full);
        if (urlPrefix !== "") files.set(posix.join("/", urlPrefix), full);
      }
    }
  };
  walk(root, "");
  return files;
}

/**
 * Starts a server on `port` serving the built site. Returns the http.Server so
 * the caller can `server.close()`.
 *
 * `options.headersForFile` may return extra response headers for a manifest
 * file. It receives the trusted manifest path plus the requested URL key; the
 * request is never converted into a filesystem path.
 */
export async function startDistServer(port, root = "dist", options = {}) {
  const base = resolve(root);
  if (!statSync(base).isDirectory())
    throw new Error(
      `dist-server: ${base} is not a directory — run the build first`,
    );
  const files = buildManifest(base);
  const headersForFile =
    typeof options.headersForFile === "function" ? options.headersForFile : null;

  const server = http.createServer((req, res) => {
    let key;
    try {
      key = decodeURIComponent((req.url ?? "/").split("?")[0].split("#")[0]);
    } catch {
      res.writeHead(400);
      return res.end();
    }
    // A lookup in a set built from the filesystem. Nothing derived from the
    // request ever reaches fs — an unknown path is simply absent from the Map.
    const file = files.get(key) ?? files.get(key.replace(/\/+$/, "")) ?? null;
    if (!file) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Not found");
    }

    const headers = {
      "Content-Type": MIME[extname(file)] ?? "application/octet-stream",
    };
    if (headersForFile) {
      const extra = headersForFile(file, key) ?? {};
      for (const [name, value] of Object.entries(extra)) {
        if (value !== undefined && value !== null) headers[name] = String(value);
      }
    }

    res.writeHead(200, headers);
    createReadStream(file).pipe(res);
  });

  await new Promise((r) => server.listen(port, r));
  return server;
}
