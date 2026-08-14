import { site } from '../config/site';

/**
 * Scheduled publication dates for future Current Sky years that are already
 * written and owner-reviewed but intentionally held back from the public site.
 *
 * The date is evaluated in the site's Central time zone. Because this is a
 * static Astro site, a build/deploy must run on or after the release date for
 * newly eligible pages to enter the HTML, sitemap, search index, calendar, and
 * Rising Sign Guide. The deploy workflow has a matching July 1 schedule.
 */
const SCHEDULED_YEAR_RELEASES: Readonly<Record<number, string>> = {
  2028: '2027-07-01',
};

function dateKeyInSiteTimeZone(date: Date): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: site.timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .formatToParts(date)
      .filter((part) => ['year', 'month', 'day'].includes(part.type))
      .map((part) => [part.type, part.value])
  );

  return `${parts.year}-${parts.month}-${parts.day}`;
}

export interface SkyPublishingData {
  draft?: boolean;
  ownerReview?: boolean;
  start: Date;
}

/**
 * The normal publishing contract is unchanged: non-drafts are public and
 * drafts stay private. The one exception is a year explicitly listed above:
 * an owner-reviewed draft for that year becomes publishable on its scheduled
 * release date.
 *
 * Requiring ownerReview protects any unfinished 2028 file that might be added
 * later; it will remain hidden even after July 1, 2027 until Mo has reviewed it.
 */
export function isSkyEventPublished(data: SkyPublishingData, now = new Date()): boolean {
  if (!data.draft) return true;
  if (!data.ownerReview) return false;

  const releaseOn = SCHEDULED_YEAR_RELEASES[data.start.getUTCFullYear()];
  if (!releaseOn) return false;

  return dateKeyInSiteTimeZone(now) >= releaseOn;
}
