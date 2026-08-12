/**
 * Single source of truth for header and footer navigation.
 * The owner edits this file only — never HTML in components.
 */
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}
export interface NavGroup {
  label: string;
  href?: string;
  children?: NavLink[];
}

/**
 * Four top-level concepts: what you can book, what you can learn, what's
 * happening overhead, and who Mo is.
 *
 * Current Sky remains top-level because it is both a recurring-content engine
 * and a search entry point. Its dropdown exposes the three distinct ways a
 * visitor can enter the ecosystem: Mo's live editorial timeline, rising-sign
 * guidance, or a date-first calendar view. Annual overviews and the archive
 * remain available contextually from the Current Sky pages and through search
 * rather than competing for primary-navigation attention.
 *
 * Dormant or duplicate hubs stay out of primary navigation until they have a
 * distinct job. Courses has nothing to sell yet, Guides currently duplicates
 * Resources/Birth Time, and Videos has no published entries. Their URLs remain
 * available for future use without asking visitors to choose empty sections.
 */
export const primaryNav: NavGroup[] = [
  {
    label: "Readings",
    href: "/readings/",
    children: [
      { label: "Reading Finder", href: "/reading-finder/" },
      { label: "All Readings", href: "/readings/" },
      { label: "How Readings Work", href: "/how-readings-work/" },
      { label: "FAQs", href: "/frequently-asked-questions/" },
    ],
  },
  {
    label: "Explore Astrology",
    href: "/explore/",
    children: [
      { label: "Start Here", href: "/start-here/" },
      { label: "Explore All Topics", href: "/explore/" },
      { label: "How a Chart Works", href: "/explore/birth-chart-basics/" },
      { label: "Interactive Chart Guide", href: "/tools/explore-your-chart/" },
      { label: "Glossary", href: "/explore/glossary/" },
    ],
  },
  {
    label: "Current Sky",
    href: "/current-sky/",
    children: [
      { label: "Current Sky", href: "/current-sky/" },
      { label: "Horoscopes", href: "/horoscopes/" },
      { label: "Sky Calendar", href: "/current-sky/calendar/" },
    ],
  },
  {
    label: "From Mo",
    href: "/about/",
    children: [
      { label: "About Mo", href: "/about/" },
      { label: "Blog", href: "/blog/" },
      { label: "Newsletter", href: "/newsletter/" },
      { label: "Contact Mo", href: "/contact/" },
    ],
  },
];

export const ctaNav: NavLink = { label: "Book a Reading", href: "/book/" };

/**
 * The footer is the deeper version of the same four visitor concepts used in
 * the header. It may expose secondary destinations, but it should not invent a
 * second taxonomy for the site.
 */
export const footerNav: Record<string, NavLink[]> = {
  Readings: [
    { label: "All Readings", href: "/readings/" },
    { label: "Reading Finder", href: "/reading-finder/" },
    { label: "How Readings Work", href: "/how-readings-work/" },
    { label: "Book a Reading", href: "/book/" },
    { label: "Gift a Reading", href: "/readings/gift/" },
  ],
  "Explore Astrology": [
    { label: "Start Here", href: "/start-here/" },
    { label: "Explore All Topics", href: "/explore/" },
    { label: "Interactive Chart Guide", href: "/tools/explore-your-chart/" },
    { label: "Glossary", href: "/explore/glossary/" },
    { label: "Resources", href: "/resources/" },
  ],
  "Current Sky": [
    { label: "Current Sky", href: "/current-sky/" },
    { label: "Horoscopes", href: "/horoscopes/" },
    { label: "Sky Calendar", href: "/current-sky/calendar/" },
    { label: "The Sky in 2026", href: "/current-sky/the-sky-in-2026/" },
    { label: "Archive", href: "/current-sky/archive/" },
  ],
  "From Mo": [
    { label: "About Mo", href: "/about/" },
    { label: "Blog", href: "/blog/" },
    { label: "Newsletter", href: "/newsletter/" },
    { label: "Contact Mo", href: "/contact/" },
    { label: "Credentials", href: "/credentials/" },
  ],
};

/**
 * Policy links render as an inline row in the footer's bottom bar, not as a
 * fifth column. Twelve stacked links in one column made the footer enormous
 * and buried the pages people actually want.
 */
export const policyNav: NavLink[] = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Disclaimer", href: "/disclaimer/" },
  { label: "Booking Policy", href: "/booking-policy/" },
  { label: "Accessibility", href: "/accessibility/" },
];
