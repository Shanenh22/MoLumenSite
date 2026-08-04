/**
 * Central site configuration. Every component reads brand facts,
 * contact details, and integration settings from here — never
 * hard-code these values elsewhere.
 */
export const site = {
  name: "Mo Lumen Astrology",
  legalName: "Mo Lumen Astrological Services", // confirm with owner (open-questions Q8)
  tagline: "See yourself in a new light.",
  description:
    "Clarifying astrology readings with a classical lens — practical, candid, and warm.",
  url: import.meta.env.PUBLIC_SITE_URL ?? "https://molumen.com",
  email: "mo@molumen.com",
  locale: "en-US",
  timezone: "America/Chicago",
  social: {
    instagram: "https://www.instagram.com/mo.lumen/",
    facebook: "https://www.facebook.com/profile.php?id=100094534962856",
    youtube: "", // pending owner (open-questions Q11)
  },
  integrations: {
    ga4Id: import.meta.env.PUBLIC_GA4_ID ?? "",
    // Cal.com handle — the part after cal.com/ in the booking URL. Not a
    // secret: it appears in every booking link Mo shares. Kept here rather
    // than in an env var so it cannot go missing from a build environment.
    calcomUsername: import.meta.env.PUBLIC_CALCOM_USERNAME ?? "molumen",
    mailerliteFormId: import.meta.env.PUBLIC_MAILERLITE_FORM_ID ?? "",
    youtubeChannelId: import.meta.env.PUBLIC_YOUTUBE_CHANNEL_ID ?? "",
    instagramHandle: import.meta.env.PUBLIC_INSTAGRAM_HANDLE ?? "mo.lumen",
  },
} as const;
