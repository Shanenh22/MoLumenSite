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
    "Thoughtful astrology readings with Mo Lumen: technically grounded, conversational, and attentive to the whole chart, real-life context, and your choices.",
  url: import.meta.env.PUBLIC_SITE_URL ?? "https://molumen.com",
  email: "mo@molumen.com",
  locale: "en-US",
  timezone: "America/Chicago",
  social: {
    instagram: "https://www.instagram.com/mo.lumen/",
    facebook: "https://www.facebook.com/profile.php?id=100094534962856",
    youtube: "https://www.youtube.com/@MoLumenAstrology",
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
    // GA4 measurement ID, supplied by Shane on 2026-08-07. Defaulted here for
    // the same reason as calcomUsername and the Kit IDs below: it is a public
    // identifier that ships in the HTML of every page, the deploy workflow
    // passes no env at build time, and an unset value fails *silently* — the
    // whole gtag block sits behind an `ga4Id &&` guard, so a missing variable
    // renders nothing and looks exactly like a healthy build. That is how this
    // site ran with no analytics at all while every check stayed green.
    // PUBLIC_GA4_ID still overrides for a preview or test property.
    ga4Id: import.meta.env.PUBLIC_GA4_ID ?? "G-64N9EPKNTR",
    // Cal.com handle — the part after cal.com/ in the booking URL. Not a
    // secret: it appears in every booking link Mo shares. Kept here rather
    // than in an env var so it cannot go missing from a build environment.
    calcomUsername: import.meta.env.PUBLIC_CALCOM_USERNAME ?? "molumen",
    // Kit form IDs are public embed identifiers, not secrets. This default is
    // the owner-supplied MoLumen form; the env override keeps staging/testing flexible.
    kitFormUid: import.meta.env.PUBLIC_KIT_FORM_UID ?? "aa0e899cd0",
    kitFormScriptUrl:
      import.meta.env.PUBLIC_KIT_FORM_SCRIPT_URL ??
      "https://molumen.kit.com/aa0e899cd0/index.js",
    youtubeChannelId: import.meta.env.PUBLIC_YOUTUBE_CHANNEL_ID ?? "",
    /**
     * Mo's ~60-second face-to-camera introduction.
     *
     * Paste ONLY the YouTube video ID here — the part after v= or youtu.be/,
     * not the whole URL. Everything downstream is already built and guarded on
     * this value being non-empty: /about/ renders a click-to-load facade above
     * the credentials, the homepage links to it, and VideoObject schema is
     * emitted. Nothing appears while it is blank, so there is no placeholder to
     * clean up and no broken player to apologise for.
     *
     * Deliberately not invented. An ID that does not resolve would ship a dead
     * play button on the page whose whole job is making Mo credible.
     */
    welcomeVideoId: import.meta.env.PUBLIC_WELCOME_VIDEO_ID ?? "",
    /** Optional locally hosted poster for the welcome video, e.g. /images/uploads/mo-welcome.webp */
    welcomeVideoPoster: import.meta.env.PUBLIC_WELCOME_VIDEO_POSTER ?? "",
    /**
     * Publication date of the welcome video, ISO YYYY-MM-DD.
     *
     * The video renders on the ID alone; this only gates VideoObject schema,
     * which Google requires an uploadDate for. Structured data describing a
     * video with a made-up date would be a fabricated fact in the one format
     * specifically designed to be trusted by machines, so the schema stays
     * silent until the real date is supplied.
     */
    welcomeVideoUploadDate: import.meta.env.PUBLIC_WELCOME_VIDEO_UPLOAD_DATE ?? "",
    instagramHandle: import.meta.env.PUBLIC_INSTAGRAM_HANDLE ?? "mo.lumen",
  },
} as const;
