/**
 * Rising-sign guidance for lunations and eclipses.
 *
 * This layer is derived from whole-sign house placement. It is deliberately
 * broad: it identifies a life area and offers questions or possibilities to
 * consider, but it does not claim to describe a personal outcome. Personal
 * interpretation requires the exact degree, natal contacts, other timing
 * factors, and lived circumstances.
 */

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
export type LunationPhase = "newMoon" | "fullMoon" | "eclipse";

export function houseFor(rising: string, lunationSign: string): number | null {
  const r = ZODIAC.indexOf(rising as ZodiacSign);
  const s = ZODIAC.indexOf(lunationSign as ZodiacSign);
  if (r === -1 || s === -1) return null;
  return ((s - r + 12) % 12) + 1;
}

export function phaseOf(eventType: string, title: string): LunationPhase | null {
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
  arena: string;
  newMoon: string;
  fullMoon: string;
  eclipse: string;
}

export const HOUSE_GUIDANCE: Record<number, HousePassage> = {
  1: {
    arena: "identity, body, and how you meet the world",
    newMoon:
      "With the lunation in your first house, questions of identity, presentation, pace, and personal direction may be easier to notice. Rather than treating it as a required reset, consider what feels newly worth expressing or inhabiting.",
    fullMoon:
      "A first-house full moon puts the self-and-other axis into view. You may notice more clearly how you are showing up, how others are responding, or where your current way of meeting the world no longer feels quite accurate.",
    eclipse:
      "An eclipse in the first house gives extra symbolic emphasis to identity, embodiment, and direction. That can coincide with visible changes for some people, but the more useful starting point is to notice what is already shifting in how you understand or present yourself.",
  },
  2: {
    arena: "money, possessions, and material resources",
    newMoon:
      "A second-house new moon draws attention to income, possessions, spending, saving, and material security. It can be a useful point for looking at one concrete financial pattern without assuming the lunation will change it for you.",
    fullMoon:
      "A full moon here can make the state of your resources easier to see. The emphasis may be on money coming in or going out, what you own, or how much security a particular arrangement actually provides.",
    eclipse:
      "An eclipse in the second house emphasizes money, possessions, and material support. Changes are possible, but an eclipse alone cannot tell us whether those changes are gains, losses, decisions, or simply a stronger awareness of what needs attention.",
  },
  3: {
    arena: "communication, learning, siblings, and daily movement",
    newMoon:
      "A third-house new moon brings the everyday exchange of information into focus: conversations, writing, learning, siblings, errands, and short trips. Notice what you are beginning to understand or communicate differently.",
    fullMoon:
      "A full moon here may make a conversation, piece of information, learning process, or everyday logistical pattern more visible. The point is not that something must be revealed, but that the mental and practical traffic of daily life deserves attention.",
    eclipse:
      "An eclipse in the third house puts extra weight on communication, learning, siblings, and the local environment. If something is changing here, the chart can help describe the area; it cannot tell the whole story without context.",
  },
  4: {
    arena: "home, family, roots, and private life",
    newMoon:
      "A fourth-house new moon turns attention toward home, family, ancestry, and the private base beneath the public life. It may be a good time to notice what kind of foundation you are actually building or needing.",
    fullMoon:
      "A full moon here emphasizes the home-and-public-life axis. Questions about belonging, family, living arrangements, privacy, or emotional grounding may stand out more clearly than usual.",
    eclipse:
      "An eclipse in the fourth house can make changes around home, family, roots, or private life especially noticeable. Sometimes those changes are external and sometimes they are shifts in what home or belonging means to you.",
  },
  5: {
    arena: "creativity, pleasure, romance, children, and play",
    newMoon:
      "A fifth-house new moon highlights creativity, pleasure, romance, children, and the parts of life pursued because they matter to the heart. Notice what wants more room for expression rather than turning the lunation into an assignment to produce something.",
    fullMoon:
      "A full moon here can bring creative work, romance, children, pleasure, or risk into clearer view. Something may feel more developed or simply more visible, but the exact expression depends on what is already happening in your life.",
    eclipse:
      "An eclipse in the fifth house gives extra emphasis to creativity, romance, children, play, and personal expression. It may mark a meaningful chapter for some people, but the surrounding chart tells us whether that emphasis is central or peripheral.",
  },
  6: {
    arena: "work, health, service, and daily routine",
    newMoon:
      "A sixth-house new moon puts routines, work, service, and health habits under the lens. This can be useful for noticing which daily systems support you and which ones need adjustment, without turning astrology into medical advice or a productivity mandate.",
    fullMoon:
      "A full moon here can make the condition of work routines, obligations, or health habits easier to see. The information may be practical rather than dramatic: what is sustainable, what is not, and what your daily life is actually asking of you.",
    eclipse:
      "An eclipse in the sixth house emphasizes work, service, routines, and health-related patterns. If changes are already underway, this may help name the area, but it is not a diagnosis or a guarantee that disruption is coming.",
  },
  7: {
    arena: "partnership, contracts, and one-to-one relationships",
    newMoon:
      "A seventh-house new moon brings one-to-one relationships into focus: partners, clients, collaborators, agreements, and even conflicts that require direct engagement. Notice what kind of reciprocity or clarity the relationship in front of you actually needs.",
    fullMoon:
      "A full moon here emphasizes the relationship axis. A partnership or agreement may become easier to assess, especially the balance between your needs and the other person's, but the lunation does not decide the relationship for you.",
    eclipse:
      "An eclipse in the seventh house gives extra symbolic weight to partnerships, contracts, and close one-to-one dynamics. For some people this coincides with major relational changes; for others it simply makes an existing pattern harder to overlook.",
  },
  8: {
    arena: "shared resources, debt, inheritance, intimacy, and trust",
    newMoon:
      "An eighth-house new moon draws attention to what is shared, owed, inherited, merged, or entrusted to another person. Financial and emotional entanglements can both belong here, and the useful question is often what needs greater clarity or honesty.",
    fullMoon:
      "A full moon here can make shared finances, debt, inheritance, intimacy, trust, or dependence more visible. The symbolism points to entanglement and exchange; your circumstances tell us what kind.",
    eclipse:
      "An eclipse in the eighth house emphasizes shared resources, intimacy, trust, debt, inheritance, and endings. That sounds dramatic because the house contains serious subjects, but the eclipse itself does not tell us which one is active or what outcome follows.",
  },
  9: {
    arena: "travel, higher study, publishing, law, and belief",
    newMoon:
      "A ninth-house new moon highlights the search for a larger frame: travel, higher study, publishing, law, philosophy, or belief. Notice what question is asking you to widen your perspective rather than assuming you need a dramatic new direction.",
    fullMoon:
      "A full moon here can make a course of study, journey, publication, legal matter, or belief system easier to evaluate. Sometimes the shift is external; sometimes it is simply recognizing that your understanding has changed.",
    eclipse:
      "An eclipse in the ninth house gives extra emphasis to travel, higher education, publishing, law, faith, and worldview. The important distinction is between a meaningful symbolic emphasis and a prediction that one of those things must happen.",
  },
  10: {
    arena: "career, reputation, authority, and public role",
    newMoon:
      "A tenth-house new moon brings career, reputation, authority, and public direction into focus. It can be a useful moment to notice what you want to be responsible for or recognized for, without treating the lunation as a promise of professional change.",
    fullMoon:
      "A full moon here emphasizes the public-and-private axis. Career, reputation, leadership, or visible responsibilities may be easier to assess, especially where your outer role and inner priorities are no longer matching cleanly.",
    eclipse:
      "An eclipse in the tenth house can make career, reputation, authority, or public role especially significant. Major changes are possible for some charts, but an eclipse in this house is not by itself a prediction of promotion, loss, or a career turn.",
  },
  11: {
    arena: "friends, groups, networks, and future aims",
    newMoon:
      "An eleventh-house new moon highlights friends, groups, networks, audiences, and longer-range hopes. Notice which connections and goals still feel alive enough to invest in and which may belong to an earlier version of the future.",
    fullMoon:
      "A full moon here can make a friendship, group role, network, or future aim easier to see clearly. The emphasis may be on belonging, contribution, or whether a goal still fits the person you are becoming.",
    eclipse:
      "An eclipse in the eleventh house gives extra weight to friendships, communities, alliances, audiences, and long-range goals. Social circles can change, but the chart and circumstances tell us whether that means joining, leaving, reorganizing, or simply seeing the group differently.",
  },
  12: {
    arena: "solitude, retreat, endings, and what operates out of view",
    newMoon:
      "A twelfth-house new moon turns attention toward rest, retreat, solitude, and patterns that are easier to notice when the noise drops. This is less a call to action than an invitation to observe what has been operating outside ordinary awareness.",
    fullMoon:
      "A full moon here can make something previously private, deferred, or difficult to name more noticeable. That may involve rest, endings, solitude, dreams, or an internal pattern, but the symbolism should not be used to manufacture a crisis.",
    eclipse:
      "An eclipse in the twelfth house emphasizes retreat, endings, solitude, and material that sits outside ordinary awareness. Some people experience closure or withdrawal; others simply become more conscious of what has been taking place quietly in the background.",
  },
};

export interface SignGuidance {
  sign: ZodiacSign;
  slug: string;
  house: number;
  arena: string;
  text: string;
}

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
