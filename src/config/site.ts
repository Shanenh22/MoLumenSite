/**
 * Central site configuration. Every component reads brand facts,
 * contact details, and integration settings from here — never
 * hard-code these values elsewhere.
 */
export const site = {
  name: "Mo Lumen Astrology",
  legalName: "Mo Lumen Astrological Services", // confirm with owner (open-questions Q8)
  /**
   * Brand tagline. Chosen by Shane on 2026-08-05, and taken from Mo's own words
   * on /about/ — "There is fate and there is choice, and a good reading helps
   * you tell the difference" — rather than invented as a slogan.
   *
   * It replaced a credentials-forward line ("Certified — and I'd rather you
   * checked"), which was removed deliberately: a growing part of the audience
   * reads heavy credentialism as gatekeeping, and leading with it positioned Mo
   * against that audience rather than alongside it. This line does the same
   * trust work by stating a philosophy instead of a qualification.
   *
   * "See yourself in a new light." remains the homepage h1 — it is the warmer,
   * benefit-led line and still does that job well. The tagline is the brand
   * statement; the h1 is the invitation. They are allowed to differ.
   */
  tagline: "There is fate and there is choice.",
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
  /**
   * Search engine verification. Paste the token only — not the whole meta tag.
   * Google: Search Console -> Add property -> HTML tag -> copy the content="..." value.
   * Bing:   Webmaster Tools -> Add site -> HTML Meta Tag -> copy the content value.
   * Both render only when non-empty, so an unverified site emits nothing.
   */
  verification: {
    google: import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    bing: import.meta.env.PUBLIC_BING_SITE_VERIFICATION ?? "",
    pinterest: import.meta.env.PUBLIC_PINTEREST_VERIFICATION ?? "",
  },

  /**
   * IndexNow key. Bing, Yandex, Seznam and others accept a push notification
   * that a URL changed, instead of waiting to be crawled. Free, no account.
   * The matching file must stay at /12c6ffba6788bf3dea9359c17ab44f81.txt or the ping is rejected.
   */
  indexNowKey: "12c6ffba6788bf3dea9359c17ab44f81",
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
