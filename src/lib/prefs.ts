/**
 * Browser-local display preferences.
 *
 * There is exactly one, and it is deliberately the smallest thing that could
 * work: a rising sign, held as one lowercase word from a fixed list of twelve.
 * No login, no account, no server-side profile, no birth date, no birth time,
 * no birth place, no identifier, no timestamp, no visit count. The value is the
 * same twelve-way choice a reader could make from a dropdown on any astrology
 * site; it is not derivable to a person and it never leaves the device.
 *
 * WHY THIS IS A FILE RATHER THAN FOUR LINES AT THE CALL SITE
 *
 * Three things have to be right every time and are easy to get wrong once:
 *
 * 1. **Every access is wrapped.** `localStorage` throws outright in some
 *    private-browsing modes and when storage is disabled by policy — not
 *    returns null, throws. `ConsentBanner.astro` already wraps its own access
 *    for exactly this reason, with the comment "private mode: choice lasts this
 *    page only". An unwrapped read here would break the guidance block on every
 *    lunation page for those readers.
 *
 * 2. **Stored values are validated, not trusted.** Anything can be in
 *    localStorage: a value from an older schema, something a reader typed into
 *    a console, a key another site on the same origin wrote. An unrecognised
 *    value is treated as absent AND cleared, so a bad value cannot persist and
 *    keep failing silently.
 *
 * 3. **The key is versioned.** `ml-rising-v1` matches the `ml-consent-v1`
 *    convention already on the site, so a future change of shape can be
 *    introduced without misreading old data as new.
 *
 * PRIVACY NOTE FOR ANYONE ADDING TO THIS FILE: the site's hard rule is that no
 * birth data goes into the repository, analytics, localStorage or URL
 * parameters. A rising sign is not birth data — it is a reading preference the
 * visitor states directly — but a birth *time*, from which a rising sign is
 * derived, absolutely is. Do not add one here, and do not add a field that
 * would let one be reconstructed.
 */

/** Zodiacal order. Kept in step with ZODIAC in src/data/lunation-guidance.ts. */
const SIGNS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
] as const;

export type RisingSlug = (typeof SIGNS)[number];

export const RISING_KEY = "ml-rising-v1";

/** Whether a value is one of the twelve. The only definition of valid there is. */
export function isRisingSlug(value: unknown): value is RisingSlug {
  return (
    typeof value === "string" && (SIGNS as readonly string[]).includes(value)
  );
}

/**
 * The stored rising sign, or null.
 *
 * Returns null — and clears the key — for anything unrecognised, so a stale or
 * tampered value cannot sit there failing every lookup forever.
 */
export function getRising(): RisingSlug | null {
  try {
    const value = localStorage.getItem(RISING_KEY);
    if (value === null) return null;
    if (isRisingSlug(value)) return value;
    localStorage.removeItem(RISING_KEY);
    return null;
  } catch {
    // Storage unavailable. No preference, no error, no broken page.
    return null;
  }
}

/** Stores a rising sign. Silently ignores anything not one of the twelve. */
export function setRising(value: string): boolean {
  if (!isRisingSlug(value)) return false;
  try {
    localStorage.setItem(RISING_KEY, value);
    return true;
  } catch {
    // Private mode: the choice applies to this page and is not remembered.
    return false;
  }
}

/** Forgets the stored rising sign. */
export function clearRising(): void {
  try {
    localStorage.removeItem(RISING_KEY);
  } catch {
    /* nothing to clear if storage was never available */
  }
}
