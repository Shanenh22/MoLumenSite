/**
 * Rising-sign guidance for lunations and eclipses.
 *
 * WHY THIS IS DERIVED RATHER THAN WRITTEN TWELVE TIMES PER EVENT
 *
 * `/horoscopes/` promises guidance for all twelve rising signs with every new
 * moon and eclipse. Writing that by hand would be twelve fresh paragraphs per
 * event forever, which is exactly the kind of promise a one-person practice
 * quietly stops keeping — and an unkept promise a reader can check in one click
 * costs more trust than never making it.
 *
 * So the house placement is calculated and the interpretation is written once,
 * properly, per house and per phase. In whole-sign houses — the system this site
 * documents on /explore/house-systems/ as Mo's classical default — the sign a
 * lunation falls in lands in a fixed house for each rising sign. A Virgo new
 * moon is always the 6th house for Aries rising and always the 1st for Virgo
 * rising. That is arithmetic, not invention, which is the only reason this can
 * be generated honestly at all.
 *
 * What that buys: every lunation gets correct, specific, house-grounded guidance
 * for all twelve signs, automatically, including lunations added years from now.
 * What it costs: the passage for "new moon in your 5th" reads the same whichever
 * lunation put it there. That is a fair trade and the page says so plainly
 * rather than implying bespoke text.
 *
 * VOICE: first person, Mo's own, drawn from molumen.com — practical, warm, never
 * fortune-telling. She describes astrology as "a tool to use like a mirror or a
 * planner" and says plainly "I am not a 'fortune teller'." Nothing here predicts
 * an event or tells a reader what to do. Each passage describes what the house
 * tends to ask and leaves the choice with the reader, which is the same standard
 * the rest of the site holds.
 *
 * OWNER REVIEW: this is interpretive content published under Mo's byline. It is
 * built from standard whole-sign technique and her stated approach, but she has
 * not read it. It belongs on the same review list as the blog posts.
 */

/** Zodiacal order. Index matters — `houseFor` counts around this array. */
export const ZODIAC = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export type ZodiacSign = (typeof ZODIAC)[number];

/** Which lunation phase a passage is written for. */
export type LunationPhase = "newMoon" | "fullMoon" | "eclipse";

/**
 * Whole-sign house of `lunationSign` counted from `rising`.
 * Returns 1–12, or null if either sign is unrecognised (a retrograde or ingress
 * event has no lunation sign, and should not render this block at all).
 */
export function houseFor(rising: string, lunationSign: string): number | null {
  const r = ZODIAC.indexOf(rising as ZodiacSign);
  const s = ZODIAC.indexOf(lunationSign as ZodiacSign);
  if (r === -1 || s === -1) return null;
  return ((s - r + 12) % 12) + 1;
}

/**
 * Phase of a sky event, from its type and title.
 * Eclipses get their own passages because they behave differently from an
 * ordinary lunation — they accelerate rather than simply open or complete.
 */
export function phaseOf(
  eventType: string,
  title: string,
): LunationPhase | null {
  if (eventType === "eclipse") return "eclipse";
  if (eventType !== "lunation") return null;
  if (/full moon/i.test(title)) return "fullMoon";
  if (/new moon/i.test(title)) return "newMoon";
  return null;
}

const ORDINALS = [
  "",
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
  "eleventh",
  "twelfth",
];
export const ordinal = (n: number): string => ORDINALS[n] ?? String(n);

export interface HousePassage {
  /** Short label for the life area, used as the heading. */
  arena: string;
  newMoon: string;
  fullMoon: string;
  eclipse: string;
}

/**
 * One entry per house. House meanings follow the same conventions as
 * src/data/houses.ts, so the two never contradict each other.
 */
export const HOUSE_GUIDANCE: Record<number, HousePassage> = {
  1: {
    arena: "you, and how you arrive",
    newMoon:
      "This is the closest thing your year gives you to a personal reset. I would spend it on how you want to arrive — your pace, your appearance, the way you introduce yourself — rather than on a resolution about somebody else.",
    fullMoon:
      "You are in the frame. Something about the way you have been showing up gets hard to ignore. Sometimes that arrives as other people reflecting you back, and sometimes it is simply catching your own reflection and deciding it needs updating.",
    eclipse:
      "Eclipses here tend to speed up whatever you have already been suspecting about your own direction. This is the season people change their hair, their name, their title. I would let it move rather than brace against it.",
  },
  2: {
    arena: "money, resources, and what you value",
    newMoon:
      "A good place to start one concrete thing with money — a rate you charge, an account you open, a habit you fund. This house responds to the specific far better than to the sweeping.",
    fullMoon:
      "The numbers come into the light. Sometimes that is a payment arriving and sometimes it is finally adding it all up. Either way, you tend to learn what you actually value by seeing where it has been going.",
    eclipse:
      "Income, possessions, or your sense of what you are worth can move faster than is comfortable. It rarely ends where it starts, so I would not judge the whole story by the first week of it.",
  },
  3: {
    arena: "conversation, learning, and the everyday mind",
    newMoon:
      "A fine time to begin the course, the newsletter, the difficult conversation, or the habit of writing things down. Small and daily beats grand here.",
    fullMoon:
      "A conversation comes to a head — something said, something finally understood, or something you have been circling privately that lands. Your calendar tends to get noisy for a few days.",
    eclipse:
      "How and what you communicate shifts: a message that changes things, a sibling, a piece of learning that reroutes you. Back up your files and read it twice before you send it.",
  },
  4: {
    arena: "home, family, and private life",
    newMoon:
      "This is for foundations — the house itself, the family arrangement, the private base you retreat to. Beginnings here are quiet and often invisible to everyone else, which does not make them small.",
    fullMoon:
      "Home and family light up. Something about where you live or who you come from asks to be dealt with rather than managed around. It can be tender. Give yourself the evening.",
    eclipse:
      "The ground you stand on moves — a move, a household change, a shift in a family story. These are among the most felt eclipses and the least visible from outside.",
  },
  5: {
    arena: "creativity, romance, children, and play",
    newMoon:
      "One of my favourites to use on purpose: start the creative thing, ask the person out, book the class you keep admiring from a distance. Enjoyment counts as a legitimate reason.",
    fullMoon:
      "A creative project, a romance, or something to do with a child reaches a peak. You find out what it actually is, which is almost always better than continuing to wonder.",
    eclipse:
      "Matters of the heart, creative work, or children accelerate. An eclipse here often reveals how much something meant to you by finally putting it in motion.",
  },
  6: {
    arena: "work, health, and daily routine",
    newMoon:
      "For one specific, practical improvement — the appointment, the routine, the way the workday is arranged. I would pick one. Six resolutions in this house reliably become none.",
    fullMoon:
      "You get to see the state of the system: what your body has been asking for, what the schedule cannot absorb, what the job has quietly turned into. Useful information, even when it is inconvenient.",
    eclipse:
      "Work or health arrangements change, sometimes abruptly. If a routine has been unsustainable, this is often the point at which it stops being negotiable.",
  },
  7: {
    arena: "partnership and the people opposite you",
    newMoon:
      "A beginning in one-to-one relationship — a partner, a client, a contract, a person. It goes best when you are clear beforehand about what you are actually agreeing to.",
    fullMoon:
      "A relationship comes into full light. Something between you and one particular person becomes explicit. That is not always comfortable, and it is usually more useful than the ambiguity was.",
    eclipse:
      "Partnerships form, formalise, or end. People arrive and depart quickly under these. I would let the first fortnight settle before deciding what any of it meant.",
  },
  8: {
    arena: "shared resources, intimacy, and what you hold jointly",
    newMoon:
      "A place to start something held with someone else: the joint account, the loan, the estate paperwork, or the conversation about closeness that neither of you wants to open first.",
    fullMoon:
      "Shared matters come to a head — money you hold with another person, a debt, or an intimacy that has been running under the surface. It tends to surface all at once rather than gradually.",
    eclipse:
      "What you share with other people moves: finances, intimacy, or an ending that clears space. Deep water, and rarely as catastrophic as this house's reputation suggests.",
  },
  9: {
    arena: "travel, study, and what you believe",
    newMoon:
      "For the bigger picture — the degree, the trip, the belief you want to test, the thing you want to publish. Aim it further out than feels entirely reasonable.",
    fullMoon:
      "A course of study, a journey, or a belief culminates. Sometimes you finish something. Sometimes you discover you no longer believe what you set out believing, which is its own kind of finishing.",
    eclipse:
      "These tend to relocate you — literally, academically, or philosophically. Plans made abroad or in a classroom during an eclipse season have a way of sticking.",
  },
  10: {
    arena: "career, reputation, and public role",
    newMoon:
      "A good seed point for the public part of your life: the title, the application, the visible piece of work. What you begin here is the part other people will eventually see.",
    fullMoon:
      "Career or reputation peaks. A result lands, a role becomes official, or the gap between what you do and what you want to be known for becomes very clear.",
    eclipse:
      "The professional ground moves — a role, a manager, a public position. These are the seasons careers turn, and they usually announce themselves well before they finish.",
  },
  11: {
    arena: "friends, groups, and what you are aiming at",
    newMoon:
      "For the company you keep and where you are heading: join the group, make the ask, say the hope out loud. Networks respond unusually well to being started here.",
    fullMoon:
      "A friendship, a group, or a long-held hope comes to a head. You often learn which of your people are actually your people, and whether the goal still fits the person you have become.",
    eclipse:
      "Your circles and your ambitions rearrange. Groups form and dissolve quickly. What survives an eclipse here tends to be worth keeping.",
  },
  12: {
    arena: "rest, retreat, and what runs underneath",
    newMoon:
      "The one I would argue for doing less with. It suits rest, retreat, therapy, and things done quietly. Beginnings here often do not show for a few weeks — that is the house, not a failure.",
    fullMoon:
      "Something you had set aside surfaces — a feeling, a memory, a pattern running underneath. Dreams get loud. A good week for the quiet appointment and a poor one for a packed calendar.",
    eclipse:
      "Things close, sometimes before you have consciously decided to close them. An ending here can feel like relief and loss in the same afternoon. Protect your sleep and let it finish.",
  },
};

export interface SignGuidance {
  sign: ZodiacSign;
  slug: string;
  house: number;
  arena: string;
  text: string;
}

/**
 * Guidance for all twelve rising signs for one lunation or eclipse.
 * Returns an empty array for events that are not lunations or eclipses.
 */
export function guidanceForEvent(
  eventType: string,
  title: string,
  lunationSign: string | undefined,
): SignGuidance[] {
  const phase = phaseOf(eventType, title);
  if (!phase || !lunationSign) return [];
  return ZODIAC.map((sign) => {
    const house = houseFor(sign, lunationSign);
    if (house === null) return null;
    const passage = HOUSE_GUIDANCE[house];
    return {
      sign,
      slug: sign.toLowerCase(),
      house,
      arena: passage.arena,
      text: passage[phase],
    };
  }).filter((x): x is SignGuidance => x !== null);
}
