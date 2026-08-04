/**
 * Where is Chromium?
 *
 * Every browser-driven script here used to hard-code
 * `/opt/pw-browsers/chromium`. That is correct in the Linux container these
 * scripts were first written in, and it is a file that cannot exist on a
 * Windows or macOS checkout — so the whole verification suite (hero contrast,
 * axe, booking, finder, Lighthouse) died at launch with an ENOENT before
 * running a single assertion. A check you cannot run is a check you do not have.
 *
 * Resolution order:
 *   1. CHROMIUM_PATH, so a machine with an unusual layout can just say so.
 *   2. The pinned container path, when it really is there.
 *   3. `undefined` — meaning "launcher, find your own browser".
 *
 * Case 3 is the normal one on a developer machine and it is deliberately not
 * clever. Playwright already knows where `npx playwright install chromium` put
 * its browser, and chrome-launcher (Lighthouse) discovers an installed
 * Chrome or Edge.
 *
 * Do NOT be tempted to "improve" this by resolving `chromium.executablePath()`
 * and passing that value in. It looks equivalent and it is not: on Windows,
 * launching with an explicit `executablePath` fails with `spawn UNKNOWN` while
 * launching with no `executablePath` at all succeeds — on the very same binary,
 * in the same process. Handing Playwright its own default back is strictly
 * worse than staying quiet.
 */
import { existsSync } from "node:fs";

const CONTAINER_PATH = "/opt/pw-browsers/chromium";

export function chromiumPath() {
  const fromEnv = process.env.CHROMIUM_PATH;
  if (fromEnv && existsSync(fromEnv)) return fromEnv;
  if (existsSync(CONTAINER_PATH)) return CONTAINER_PATH;
  return undefined;
}
