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
 * Four groups, not six flat items.
 *
 * Readings, Explore Astrology, Current Sky, Blog, Videos and About Mo used to
 * sit at the same level, so the page that sells readings had the same visual
 * weight as the page listing Mo's videos. Blog, Videos, About, Credentials,
 * Testimonials and Contact are all answers to one question a visitor is
 * actually asking — "who is this person and can I trust her?" — so they now
 * live together under "From Mo", and the top level reads as: what you can
 * book, what you can learn, what's overhead, who I am.
 *
 * Current Sky stays at the top level on purpose. It is the one asset no
 * comparable astrologer's site has and it is a search entry point in its own
 * right; burying it under a group would be a downgrade, not a tidy-up.
 *
 * No URL changed. This is a grouping change only — every destination here
 * already existed at exactly this path.
 */
export const primaryNav: NavGroup[] = [
  {
    label: "Readings",
    href: "/readings/",
    children: [
      { label: "All Readings", href: "/readings/" },
      { label: "Reading Finder", href: "/reading-finder/" },
      { label: "How Readings Work", href: "/how-readings-work/" },
      { label: "Prepare for Your Reading", href: "/prepare-for-your-reading/" },
      { label: "FAQs", href: "/frequently-asked-questions/" },
    ],
  },
  {
    label: "Explore Astrology",
    href: "/explore/",
    children: [
      { label: "Start Here (beginners)", href: "/start-here/" },
      { label: "All Topics", href: "/explore/" },
      { label: "Birth Chart Basics", href: "/explore/birth-chart-basics/" },
      { label: "The Big Three", href: "/explore/the-big-three/" },
      { label: "Essential Dignities", href: "/explore/dignities/" },
      { label: "The Saturn Return", href: "/explore/saturn-return/" },
      { label: "Explore Your Chart", href: "/tools/explore-your-chart/" },
      { label: "Sources", href: "/explore/sources/" },
      { label: "Glossary", href: "/explore/glossary/" },
    ],
  },
  { label: "Current Sky", href: "/current-sky/" },
  {
    label: "From Mo",
    href: "/about/",
    children: [
      { label: "About Mo", href: "/about/" },
      { label: "Blog", href: "/blog/" },
      { label: "Videos", href: "/videos/" },
      { label: "Credentials", href: "/credentials/" },
      { label: "Testimonials", href: "/testimonials/" },
      { label: "Contact Mo", href: "/contact/" },
    ],
  },
];

export const ctaNav: NavLink = { label: "Book a Reading", href: "/book/" };

export const footerNav: Record<string, NavLink[]> = {
  Readings: [
    { label: "All Readings", href: "/readings/" },
    { label: "Reading Finder", href: "/reading-finder/" },
    { label: "How Readings Work", href: "/how-readings-work/" },
    { label: "Book a Reading", href: "/book/" },
  ],
  Learn: [
    { label: "Start Here", href: "/start-here/" },
    { label: "Explore Astrology", href: "/explore/" },
    { label: "The Big Three", href: "/explore/the-big-three/" },
    { label: "Explore Your Chart", href: "/tools/explore-your-chart/" },
    { label: "Glossary", href: "/explore/glossary/" },
  ],
  Writing: [
    { label: "Blog", href: "/blog/" },
    { label: "Current Sky", href: "/current-sky/" },
    { label: "Sky Calendar", href: "/current-sky/calendar/" },
    { label: "The Sky in 2026", href: "/current-sky/the-sky-in-2026/" },
    { label: "Horoscopes", href: "/horoscopes/" },
    { label: "Videos", href: "/videos/" },
  ],
  Site: [
    { label: "About Mo", href: "/about/" },
    { label: "Testimonials", href: "/testimonials/" },
    { label: "Resources", href: "/resources/" },
    { label: "Courses", href: "/courses/" },
    { label: "Guides", href: "/guides/" },
    { label: "Contact", href: "/contact/" },
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
  { label: "Newsletter", href: "/newsletter/" },
];
