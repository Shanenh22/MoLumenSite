/**
 * Month-grid arithmetic for the Current Sky calendar.
 *
 * WHY EVERYTHING HERE IS UTC, WITHOUT EXCEPTION
 *
 * Sky events are stored as date-only strings (`start: 2026-10-24`) with no
 * clock time — exact times were never supplied, which `docs/session-handoff.md`
 * records. Astro's `z.coerce.date()` parses a bare date string as **UTC
 * midnight**, so `2026-10-24` becomes `2026-10-24T00:00:00Z`.
 *
 * Every existing render path on the site already formats those dates with
 * `timeZone: 'UTC'` — the Current Sky list, the archive, /horoscopes/ and the
 * event pages. That is what makes `2026-10-24` display as October 24 for
 * everyone.
 *
 * A calendar is where that convention breaks loudest if it is broken. Reading
 * `getDate()` instead of `getUTCDate()` on `2026-10-24T00:00:00Z` returns 23
 * for every reader west of Greenwich, which would put Mo's published event on
 * the wrong day of the grid — and disagree with the list view on the same site.
 * Since the content carries no clock times, a browser-timezone conversion has
 * nothing to be more accurate about: it would introduce error, not remove it.
 *
 * So: `getUTCFullYear`, `getUTCMonth`, `getUTCDate` and `Date.UTC` only. There
 * is deliberately no local-time code path in this file.
 *
 * The one place a reader's local time is genuinely the right answer is "which
 * day is today", and that belongs to the client. It is handled by comparing
 * `YYYY-MM-DD` strings rather than Date objects — see `todayKeyFromLocal` — so
 * a reader at 11pm on the 23rd never sees the 24th highlighted.
 */

/**
 * Display labels for `eventType`, keyed by the values in the content schema.
 *
 * Exported rather than repeated because the Current Sky list and the calendar
 * both build filter buttons from it, and two copies of a label map drift the
 * first time one is edited. Consumers derive their filter set from the types
 * actually present in the content — never from the keys of this object — so a
 * type with no published events never produces an empty filter.
 */
export const SKY_TYPE_LABELS: Record<string, string> = {
  lunation: "New & Full Moons",
  eclipse: "Eclipses",
  retrograde: "Retrogrades",
  ingress: "Ingresses",
  aspect: "Aspects",
  other: "Other",
};

/**
 * Short labels for the same types, for use inside a calendar cell.
 *
 * A cell is roughly 110px wide on desktop, and "New & Full Moons" wrapped over
 * three lines above the event title. The short form exists so that the type can
 * still be carried by **text** in the cramped layout rather than by the colour
 * dot alone — colour is the second signal here, never the only one (SC 1.4.1).
 * The filter buttons and the mobile agenda have room, and use the full labels.
 */
export const SKY_TYPE_SHORT: Record<string, string> = {
  lunation: "Moon",
  eclipse: "Eclipse",
  retrograde: "Retrograde",
  ingress: "Ingress",
  aspect: "Aspect",
  other: "Event",
};

/** Zero-padded UTC date key, `YYYY-MM-DD`. The join key for everything here. */
export function utcKey(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Zero-padded UTC month key, `YYYY-MM`. Used for URL state and month lookup. */
export function utcMonthKey(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

/**
 * Today's date as a `YYYY-MM-DD` key, from the reader's **local** calendar.
 *
 * Client-side only. Deliberately not `utcKey(new Date())`: a reader in Chicago
 * at 8pm on October 23 is in UTC October 24, and highlighting tomorrow as
 * "today" is a bug they would notice immediately. Their local calendar date is
 * the honest answer to "what day is it", and comparing it as a string against
 * the UTC-derived cell keys keeps the two systems from ever being subtracted
 * from one another.
 */
export function todayKeyFromLocal(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Long month-and-year label, e.g. "October 2026". Always rendered in UTC. */
export function monthLabel(year: number, month: number): string {
  return new Date(Date.UTC(year, month, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Short month-and-year label, e.g. "Oct 2026". For the narrow month picker. */
export function shortMonthLabel(year: number, month: number): string {
  return new Date(Date.UTC(year, month, 1)).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * The shape the calendar needs from a sky event.
 *
 * Defined here rather than in the component so that the page, the component and
 * the tests all import one definition. It is deliberately a subset: the
 * calendar never renders `summary`, which is what keeps /current-sky/calendar/
 * from duplicating the prose on /current-sky/.
 */
export interface CalendarEvent {
  slug: string;
  title: string;
  eventType: string;
  start: Date;
  end?: Date;
  sign?: string;
}

/** One cell of a month grid. Blank leading/trailing cells carry `inMonth: false`. */
export interface CalendarCell {
  /** `YYYY-MM-DD`, or `''` for a padding cell outside this month. */
  key: string;
  /** Day of month, or 0 for a padding cell. */
  day: number;
  inMonth: boolean;
  /** Full accessible date, e.g. "October 24, 2026". Empty for padding cells. */
  label: string;
}

export interface CalendarMonth {
  /** `YYYY-MM` — the URL state value and the DOM lookup key. */
  key: string;
  year: number;
  /** 0-indexed, matching `Date.prototype.getUTCMonth`. */
  month: number;
  /** "October 2026" */
  label: string;
  /** Six-or-fewer weeks of seven cells, Sunday first. */
  weeks: CalendarCell[][];
}

/**
 * The grid for one month, padded to whole weeks starting on Sunday.
 *
 * Padding cells are rendered as empty `<td>` rather than as the neighbouring
 * month's dates. Showing September 28 in the October grid invites a reader to
 * think an event sits in the wrong month, and there is no navigational value in
 * it when every month is one click away.
 */
export function weeksFor(year: number, month: number): CalendarCell[][] {
  const first = new Date(Date.UTC(year, month, 1));
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const leading = first.getUTCDay(); // 0 = Sunday

  const blank: CalendarCell = { key: "", day: 0, inMonth: false, label: "" };
  const cells: CalendarCell[] = Array.from({ length: leading }, () => ({
    ...blank,
  }));

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(Date.UTC(year, month, day));
    cells.push({
      key: utcKey(d),
      day,
      inMonth: true,
      label: d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }),
    });
  }
  while (cells.length % 7 !== 0) cells.push({ ...blank });

  const weeks: CalendarCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

/**
 * Every month from `from` to `to` inclusive, by calendar month.
 *
 * The range is derived from the published content rather than from the build
 * date. A build-time `new Date()` would silently anchor the calendar to
 * whenever the site last deployed, so a stale build would open on a stale
 * month with nothing to indicate why.
 */
export function monthsInRange(from: Date, to: Date): CalendarMonth[] {
  const months: CalendarMonth[] = [];
  let year = from.getUTCFullYear();
  let month = from.getUTCMonth();
  const endYear = to.getUTCFullYear();
  const endMonth = to.getUTCMonth();

  // Guard against an inverted range producing an unbounded loop.
  if (endYear < year || (endYear === year && endMonth < month)) return months;

  while (year < endYear || (year === endYear && month <= endMonth)) {
    months.push({
      key: `${year}-${String(month + 1).padStart(2, "0")}`,
      year,
      month,
      label: monthLabel(year, month),
      weeks: weeksFor(year, month),
    });
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }
  return months;
}

/**
 * Group events by the UTC date key of their **start**.
 *
 * Start day only, deliberately. Ten events carry an `end`, all of them
 * retrogrades — and a station-direct is *also* published as its own event
 * (`2026-09-10-uranus-retrograde.md` ends on 2027-02-08, and
 * `2027-02-08-uranus-direct.md` exists). Painting a continuous bar from start
 * to end would render that station twice: once as the terminus of a
 * five-month bar and once as its own entry.
 *
 * The information a reader wants from a span — when it starts, when it ends —
 * is fully carried by `spanLabel()` on the entry itself, without the grid
 * having to become a Gantt chart. Whether the standalone station entries should
 * be suppressed inside a span is an editorial question, not a layout one, and
 * it is not answered here.
 */
export function eventsByDay<T extends { start: Date }>(
  events: T[],
): Map<string, T[]> {
  const byDay = new Map<string, T[]>();
  for (const event of events) {
    const key = utcKey(event.start);
    const bucket = byDay.get(key);
    if (bucket) bucket.push(event);
    else byDay.set(key, [event]);
  }
  return byDay;
}

/**
 * "October 24" or "October 24 – November 13" for an event with an end date.
 * Always UTC, so it agrees with the grid cell the entry sits in.
 */
export function spanLabel(start: Date, end?: Date): string {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  if (!end || utcKey(end) === utcKey(start)) return fmt(start);
  return `${fmt(start)} – ${fmt(end)}`;
}
