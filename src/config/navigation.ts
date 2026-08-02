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
      { label: "Start Here", href: "/explore/" },
      { label: "Birth Chart Basics", href: "/explore/birth-chart-basics/" },
      { label: "Explore Your Chart", href: "/tools/explore-your-chart/" },
      { label: "Glossary", href: "/explore/glossary/" },
    ],
  },
  { label: "Current Sky", href: "/current-sky/" },
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
    { label: "Explore Astrology", href: "/explore/" },
    { label: "Explore Your Chart", href: "/tools/explore-your-chart/" },
    { label: "Current Sky", href: "/current-sky/" },
    { label: "Articles", href: "/articles/" },
    { label: "Glossary", href: "/explore/glossary/" },
  ],
  Site: [
    { label: "About Mo", href: "/about/" },
    { label: "Testimonials", href: "/testimonials/" },
    { label: "Videos", href: "/videos/" },
    { label: "Newsletter", href: "/newsletter/" },
    { label: "Contact", href: "/contact/" },
  ],
  Policies: [
    { label: "Privacy", href: "/privacy/" },
    { label: "Terms", href: "/terms/" },
    { label: "Disclaimer", href: "/disclaimer/" },
    { label: "Booking Policy", href: "/booking-policy/" },
    { label: "Accessibility", href: "/accessibility/" },
  ],
};
