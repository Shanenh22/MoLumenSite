/**
 * Which blog posts belong with which reference page.
 *
 * The problem: the audit found nine of thirteen posts with fewer than three
 * inbound internal links. The reference library and the blog cover the same
 * topics and barely acknowledge each other, so the site's own writing was
 * effectively unreachable — bad for readers who want to go deeper, and bad for
 * search engines trying to work out what this site is authoritative about.
 *
 * Keyed by pathname so `<FurtherReading />` can locate itself and render nothing
 * where there is no genuine match. Pairings are by subject only; nothing is
 * padded to make a page look busier, which is why some reference pages have no
 * entry here at all.
 */
export interface RelatedPost {
  slug: string;
  title: string;
  /** Why a reader on this page would want it — written for the link, not lifted from the post. */
  note: string;
}

export const furtherReading: Record<string, RelatedPost[]> = {
  "/explore/transits/": [
    {
      slug: "what-is-a-transit",
      title: "What Is a Transit, and Why Does Timing Work at All?",
      note: "The longer version of this page, including why timing works at all.",
    },
  ],
  "/explore/retrogrades/": [
    {
      slug: "is-mercury-retrograde-a-problem",
      title: "Is Mercury Retrograde Actually a Problem?",
      note: "What the three weeks are actually like, minus the internet's version.",
    },
  ],
  "/explore/saturn-return/": [
    {
      slug: "what-is-a-saturn-return",
      title: "What Is a Saturn Return, and What Actually Happens During One?",
      note: "A fuller walk through the transit, and why the doom framing is wrong.",
    },
  ],
  "/explore/dignities/": [
    {
      slug: "what-are-essential-dignities",
      title:
        "What Are Essential Dignities, and Why Do Traditional Astrologers Care?",
      note: "Why a system this old is still doing real work in a modern reading.",
    },
  ],
  "/explore/house-systems/": [
    {
      slug: "why-astrologers-disagree-house-systems",
      title: "Why Do Astrologers Disagree About House Systems?",
      note: "The disagreement in full, and what it does and doesn't change in your chart.",
    },
  ],
  "/explore/the-big-three/": [
    {
      slug: "sun-moon-rising-difference",
      title: "Sun, Moon and Rising: What's the Difference?",
      note: "The same three placements, taken more slowly.",
    },
    {
      slug: "should-you-read-your-horoscope",
      title: "Should You Read Your Horoscope?",
      note: "Why sun-sign horoscopes half-fit, and how to read one usefully.",
    },
  ],
  "/explore/relationships/": [
    {
      slug: "what-a-chart-says-about-relationships",
      title:
        "What a Chart Can Tell You About a Relationship, and What It Can't",
      note: "Where synastry is genuinely useful, and where it gets over-claimed.",
    },
  ],
  "/explore/misconceptions/": [
    {
      slug: "what-astrology-can-and-cannot-do",
      title: "What an Astrology Reading Can, and Can't, Do for You",
      note: "The limits, stated plainly, before you spend money on anything.",
    },
  ],
  "/explore/angles/": [
    {
      slug: "why-your-birth-time-matters",
      title: "Why Your Exact Birth Time Matters More Than Your Sign",
      note: "Why four minutes can change the whole frame of a chart.",
    },
  ],
  "/explore/schools/": [
    {
      slug: "how-to-choose-an-astrologer",
      title: "How to Choose an Astrologer (Including Whether to Choose Me)",
      note: "What to ask anyone before you book: me included.",
    },
  ],
  "/prepare-for-your-reading/": [
    {
      slug: "dont-know-your-birth-time",
      title: "What If You Don't Know Your Birth Time?",
      note: "Where to look for it, and what we can still do if it never turns up.",
    },
    {
      slug: "why-your-birth-time-matters",
      title: "Why Your Exact Birth Time Matters More Than Your Sign",
      note: "Why I ask for it in the first place.",
    },
  ],
  "/how-readings-work/": [
    {
      slug: "how-often-should-you-get-a-reading",
      title: "How Often Should You Get an Astrology Reading?",
      note: "An honest answer, including when the answer is 'not yet'.",
    },
    {
      slug: "what-astrology-can-and-cannot-do",
      title: "What an Astrology Reading Can, and Can't, Do for You",
      note: "What to expect, and what no reading will do for you.",
    },
  ],
  "/horoscopes/": [
    {
      slug: "should-you-read-your-horoscope",
      title: "Should You Read Your Horoscope?",
      note: "How to get something real out of a twelve-sign format.",
    },
  ],
  "/credentials/": [
    {
      slug: "how-to-choose-an-astrologer",
      title: "How to Choose an Astrologer (Including Whether to Choose Me)",
      note: "The questions I'd want you to ask, wherever you end up booking.",
    },
  ],
};
