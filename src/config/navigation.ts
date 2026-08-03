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
      { label: "Glossary", href: "/explore/glossary/" },
    ],
  },
  { label: "Current Sky", href: "/current-sky/" },
  { label: "Blog", href: "/blog/" },
  { label: "Videos", href: "/videos/" },
  { label: "About Mo", href: "/about/" },
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
    { label: "The Sky in 2026", href: "/current-sky/the-sky-in-2026/" },
    { label: "Horoscopes", href: "/horoscopes/" },
    { label: "Videos", href: "/videos/" },
  ],
  Site: [
    { label: "About Mo", href: "/about/" },
    { label: "Resources", href: "/resources/" },
    { label: "Courses", href: "/courses/" },
    { label: "Guides", href: "/guides/" },
    { label: "Testimonials", href: "/testimonials/" },
    { label: "Newsletter", href: "/newsletter/" },
    { label: "Contact", href: "/contact/" },
    { label: "Privacy", href: "/privacy/" },
    { label: "Terms", href: "/terms/" },
    { label: "Disclaimer", href: "/disclaimer/" },
    { label: "Booking Policy", href: "/booking-policy/" },
    { label: "Accessibility", href: "/accessibility/" },
  ],
};
