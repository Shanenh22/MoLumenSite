/**
 * Booking vocabulary and ordering — the single source of truth for two things
 * that were previously decided by accident.
 *
 * 1. WHICH READING A BARE /book/ OPENS ON.
 *
 *    The header CTA appears on every page and points at /book/ with no
 *    `?service=`. Until this file existed, the checked radio was simply the
 *    first row rendered, and that row was decided by a `featured` tie between
 *    natal.json and relationship.json broken by collection order — so the most
 *    prominent, most-clicked route into the funnel opened on the $275
 *    Relationship Consultation: the most expensive reading on the site and one
 *    that requires a second person to attend.
 *
 *    Nothing about that was intentional, and nothing in the test suite could
 *    see it: `test:booking` checks the natal-90 radio itself before asserting,
 *    so the default state was never exercised.
 *
 * 2. THE ORDER READINGS APPEAR IN.
 *
 *    Same root cause. `sort((a, b) => Number(b.featured) - Number(a.featured))`
 *    is a no-op between two featured services and leaves file order to decide,
 *    which is why the hub and the homepage both led with Relationship while the
 *    copy on both pages said new clients start with the natal reading.
 *
 * Both are now stated here rather than inferred. `scripts/content-integrity.mjs`
 * asserts that READING_ORDER covers the services collection exactly, so adding
 * or removing a reading fails a test rather than silently reshuffling the
 * funnel.
 */

/**
 * The reading a visitor sees selected when they arrive at /book/ with no
 * service in the URL.
 *
 * This is a Cal.com EVENT key, not a service slug — the booking radios are
 * keyed by event, because natal is sold at two prices and the choice between
 * them is a different purchase. See the vocabulary-drift note in
 * docs/session-handoff.md.
 *
 * natal-90 is the right default because it is the only reading open to a
 * first-time visitor that does not require a second attendee, and it is what
 * the Reading Finder already recommends to anyone who asks what Mo suggests.
 * The 60-minute option sits directly beneath it at $150, so the cheaper choice
 * is never hidden.
 */
export const DEFAULT_BOOKING_EVENT = "natal-90";

/**
 * Canonical display order for readings, by SERVICE slug.
 *
 * Deliberately a list rather than a numeric field on each JSON file: `order`
 * would have to be added to `.pages.yml` and would then be one more technical
 * field Mo could reorder by accident. The order is a funnel decision, so it
 * lives with the other funnel decisions.
 *
 * Natal first because every other reading builds on it. Relationship second
 * because it is the only other reading a new client may book. The follow-ups
 * then run in the order clients actually reach them.
 */
export const READING_ORDER = [
  "natal",
  "relationship",
  "want-more-clarity",
  "solar-return",
  "life-changes",
  "quick-check-in",
  "monthly-transits",
] as const;

/** Sort key for a service slug. Unknown slugs sort last rather than throwing. */
export function readingRank(slug: string): number {
  const i = (READING_ORDER as readonly string[]).indexOf(slug);
  return i === -1 ? READING_ORDER.length : i;
}

/**
 * Order any list of service entries canonically.
 *
 * Takes the accessor rather than assuming a shape so the homepage, the hub and
 * the booking page can all use it against `getCollection('services')` entries
 * without three different call signatures.
 */
export function orderServices<T>(items: T[], slugOf: (item: T) => string): T[] {
  return [...items].sort((a, b) => readingRank(slugOf(a)) - readingRank(slugOf(b)));
}

/**
 * A single actionable booking choice: a label a visitor can act on and the
 * deep link that selects exactly that thing on /book/.
 */
export interface BookingAction {
  /** Cal.com event key. Always an event, never a service slug. */
  event: string;
  /** Visible button text, e.g. "Book 90 minutes — $200". */
  label: string;
  /** Accessible name, disambiguated for a screen-reader link list. */
  ariaLabel: string;
  /** /book/?service=<event> */
  href: string;
  /** Marked in the service JSON as the fuller first reading, if any. */
  recommended: boolean;
  /** Price as displayed, e.g. "$200". Null when the price is unconfirmed. */
  price: string | null;
  durationLabel: string;
}

/**
 * Every way a given reading can actually be bought — the one function all six
 * booking surfaces call.
 *
 * The bug this exists to make impossible: /readings/want-more-clarity/ shipped
 * a hero CTA at `?service=clarity` ($130) and a closing CTA band at
 * `?service=want-more-clarity` ($100, via serviceToEvent), both labelled "Book
 * this reading". Two buttons, one page, two prices — because the hero passed
 * `bookingEventId` and the band passed `slug`, and `test:finder` asserts each
 * mapping in isolation so both were individually "correct".
 *
 * The rule, stated once here rather than remembered at six call sites:
 *
 *   - A single-option reading deep-links to its canonical bookingEventId.
 *   - A multi-option reading NEVER silently picks between options that differ
 *     in price or duration. It offers one action per option, priced, so the
 *     choice stays with the person paying.
 *
 * Nothing here invents a price, a duration or an option: every field is read
 * from the service JSON, which is the same data Cal.com is configured from.
 */
export function bookingActions(service: {
  name: string;
  shortName: string;
  slug: string;
  durationLabel: string;
  price: number | null;
  priceLabel?: string;
  priceConfirmed: boolean;
  bookingEventId: string;
  options: { label: string; durationLabel: string; price: number; bookingEventId: string; note?: string }[];
}): BookingAction[] {
  const multi = service.options.length > 1;

  if (!multi) {
    const price =
      service.priceConfirmed && service.price
        ? (service.priceLabel ?? `$${service.price}`)
        : null;
    return [
      {
        event: service.bookingEventId,
        label: 'Book this reading',
        ariaLabel: `Book the ${service.name}`,
        href: `/book/?service=${service.bookingEventId}`,
        recommended: false,
        price,
        durationLabel: service.durationLabel,
      },
    ];
  }

  /**
   * What distinguishes the options decides what the button says.
   *
   * Natal is sold at two lengths, so the length is the choice and
   * "Book 1 hour 30 minutes — $200" reads correctly. Want More Clarity is sold
   * at one length and two price conditions, so labelling both buttons
   * "Book 1 hour" produces two identical-looking controls at different prices
   * — which is the same class of confusion this whole function exists to
   * remove, arrived at from the other direction. There, the option's own label
   * ("Within 3 months of your natal reading") is the distinguishing text.
   */
  const sameDuration = new Set(service.options.map((o) => o.durationLabel)).size === 1;

  return service.options.map((o) => {
    const event = o.bookingEventId || service.bookingEventId;
    const price = service.priceConfirmed ? `$${o.price}` : null;
    const distinguisher = sameDuration
      ? o.label.charAt(0).toLowerCase() + o.label.slice(1)
      : o.durationLabel;
    return {
      event,
      label: price ? `Book ${distinguisher} — ${price}` : `Book ${distinguisher}`,
      ariaLabel: `Book the ${service.shortName} reading, ${o.label}${price ? `, ${price}` : ''}`,
      href: `/book/?service=${event}`,
      recommended: Boolean(o.note),
      price,
      /** Short text for a table cell: whichever field tells the options apart. */
      durationLabel: sameDuration ? o.label : o.durationLabel,
    };
  });
}

/**
 * The one action to use where only one will fit — a comparison-table cell, a
 * closing CTA band.
 *
 * For a multi-option reading this is the recommended option if the service
 * data marks one (natal-90 carries the "Recommended for first readings" note),
 * otherwise the first. It is still a real, priced option rather than a service
 * slug resolved by a lookup table, which is what made the two CTAs disagree.
 */
export function primaryBookingAction(
  service: Parameters<typeof bookingActions>[0]
): BookingAction {
  const actions = bookingActions(service);
  return actions.find((a) => a.recommended) ?? actions[0];
}

/**
 * Plain-language eligibility label.
 *
 * "audience" is the field name; it is not what a visitor should ever read. A
 * first-time visitor needs to know that five of the seven readings follow on
 * from a natal reading they have not had — stated as a fact about sequence,
 * not as a rejection.
 */
export function eligibilityLabel(audience: "new" | "established" | "any"): string | null {
  return audience === "established" ? "After your natal reading" : null;
}
