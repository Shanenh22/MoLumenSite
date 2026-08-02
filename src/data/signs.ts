/**
 * The 12 zodiac signs. Factual attributes (element, modality, traditional
 * rulership, approximate solar dates) follow the standard Western tropical
 * canon; interpretive text is written in Mo's agency-first voice.
 * Dates are approximate — the Sun's ingress shifts by a day year to year.
 */
export interface Sign {
  slug: string;
  name: string;
  glyph: string;
  dates: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  modality: "Cardinal" | "Fixed" | "Mutable";
  ruler: string;
  keywords: string[];
  style: string; // "signs as styles of expression"
  strengths: string;
  watchFor: string;
  inRelationship: string;
}

export const signs: Sign[] = [
  {
    slug: "aries",
    name: "Aries",
    glyph: "♈",
    dates: "about March 21 – April 19",
    element: "Fire",
    modality: "Cardinal",
    ruler: "Mars",
    keywords: ["initiative", "courage", "directness"],
    style:
      "Aries expresses through beginnings. Whatever planet wears this sign acts first and refines later — direct, quick to commit, allergic to waiting for permission. It is the spark that gets things moving.",
    strengths:
      "Honest momentum. Aries placements cut through deliberation, defend what they love without hesitation, and bring real courage to fresh starts.",
    watchFor:
      "Speed can outrun follow-through, and directness can land as bluntness. The growth edge is finishing what the spark started — and noticing who else is in the room.",
    inRelationship:
      "Aries energy in a chart wants engagement, not management. It thrives with partners who can meet its candor and give it something worth pursuing.",
  },
  {
    slug: "taurus",
    name: "Taurus",
    glyph: "♉",
    dates: "about April 20 – May 20",
    element: "Earth",
    modality: "Fixed",
    ruler: "Venus",
    keywords: ["steadiness", "embodiment", "value"],
    style:
      "Taurus expresses through stabilizing. Planets here move deliberately, build things meant to last, and trust what can be touched, tasted, and counted on. It is the gardener among the signs.",
    strengths:
      "Reliability, sensory intelligence, and the patience to let good things ripen. Taurus placements know what they value and hold it well.",
    watchFor:
      "Steadiness can harden into immovability. The growth edge is telling the difference between loyalty to what matters and comfort with what is merely familiar.",
    inRelationship:
      "Taurus energy offers constancy and asks for it in return. Affection is shown concretely — presence, provision, and touch more than declarations.",
  },
  {
    slug: "gemini",
    name: "Gemini",
    glyph: "♊",
    dates: "about May 21 – June 20",
    element: "Air",
    modality: "Mutable",
    ruler: "Mercury",
    keywords: ["curiosity", "connection", "versatility"],
    style:
      "Gemini expresses through exchange. Planets here gather, compare, and circulate — questions, stories, contacts, ideas. It is the messenger, moving between worlds and translating as it goes.",
    strengths:
      "Quick learning, verbal agility, and a gift for making unlikely connections between people and ideas.",
    watchFor:
      "Breadth can crowd out depth, and cleverness can dodge feeling. The growth edge is staying at the table when the conversation gets slow or serious.",
    inRelationship:
      "Gemini energy bonds through conversation. Interest is affection; a partner who keeps surprising its mind keeps its attention.",
  },
  {
    slug: "cancer",
    name: "Cancer",
    glyph: "♋",
    dates: "about June 21 – July 22",
    element: "Water",
    modality: "Cardinal",
    ruler: "the Moon",
    keywords: ["care", "memory", "belonging"],
    style:
      "Cancer expresses through protecting. Planets here feel first, remember everything, and build shells around what is tender — homes, families, traditions, people. It initiates through care.",
    strengths:
      "Emotional intelligence, fierce loyalty, and the ability to make nearly any place feel like home.",
    watchFor:
      "Protection can become moating, and moods can steer the ship. The growth edge is letting people in before they have fully proven themselves safe.",
    inRelationship:
      "Cancer energy nurtures by instinct and needs its care received, not just tolerated. Security and consistency matter more than grand gestures.",
  },
  {
    slug: "leo",
    name: "Leo",
    glyph: "♌",
    dates: "about July 23 – August 22",
    element: "Fire",
    modality: "Fixed",
    ruler: "the Sun",
    keywords: ["heart", "creativity", "dignity"],
    style:
      "Leo expresses through radiating. Planets here perform in the best sense — they bring warmth, color, and full-hearted commitment to whatever they touch, and they want that light witnessed.",
    strengths:
      "Generosity, creative confidence, and natural leadership that lifts a room rather than dominating it — at its best.",
    watchFor:
      "The need to be seen can eclipse the willingness to see others. The growth edge is shining just as brightly when no one applauds.",
    inRelationship:
      "Leo energy loves loudly and loyally. Genuine appreciation is its oxygen; indifference wounds it more than conflict ever could.",
  },
  {
    slug: "virgo",
    name: "Virgo",
    glyph: "♍",
    dates: "about August 23 – September 22",
    element: "Earth",
    modality: "Mutable",
    ruler: "Mercury",
    keywords: ["craft", "discernment", "service"],
    style:
      "Virgo expresses through refining. Planets here notice what others miss, improve what they touch, and serve quietly and concretely. It is the craftsman among the signs.",
    strengths:
      "Precision, usefulness, and an ethic of care expressed through competence — the friend who actually shows up with the right tool.",
    watchFor:
      "Discernment can curdle into criticism, of others and especially of oneself. The growth edge is accepting 'good and finished' over 'perfect and imaginary.'",
    inRelationship:
      "Virgo energy loves through acts of service and attention to detail. It needs its efforts noticed — and needs to hear that it is enough as it is.",
  },
  {
    slug: "libra",
    name: "Libra",
    glyph: "♎",
    dates: "about September 23 – October 22",
    element: "Air",
    modality: "Cardinal",
    ruler: "Venus",
    keywords: ["balance", "fairness", "relationship"],
    style:
      "Libra expresses through relating. Planets here think in pairs and counterweights — weighing options, seeking fairness, making things (and moments) more beautiful and more just.",
    strengths:
      "Diplomacy, aesthetic intelligence, and a genuine gift for seeing the other side of any question.",
    watchFor:
      "Weighing can become wavering, and peacekeeping can bury real grievances. The growth edge is discovering that a clear 'no' can be a form of fairness too.",
    inRelationship:
      "Libra energy is built for partnership and does its best thinking in dialogue. It needs harmony that is honest, not just quiet.",
  },
  {
    slug: "scorpio",
    name: "Scorpio",
    glyph: "♏",
    dates: "about October 23 – November 21",
    element: "Water",
    modality: "Fixed",
    ruler: "Mars (traditional), Pluto (modern)",
    keywords: ["depth", "intensity", "transformation"],
    style:
      "Scorpio expresses through penetrating. Planets here go beneath the surface on principle — to the motive, the secret, the root. Nothing halfway: it merges, transforms, or walks away entirely.",
    strengths:
      "Emotional courage, loyalty of the ride-or-die variety, and the power to regenerate after losses that would flatten other signs.",
    watchFor:
      "Depth can become suspicion, and control can masquerade as protection. The growth edge is trusting without testing.",
    inRelationship:
      "Scorpio energy bonds completely or not at all. It offers rare intimacy and asks for honesty at the same depth.",
  },
  {
    slug: "sagittarius",
    name: "Sagittarius",
    glyph: "♐",
    dates: "about November 22 – December 21",
    element: "Fire",
    modality: "Mutable",
    ruler: "Jupiter",
    keywords: ["meaning", "freedom", "horizon"],
    style:
      "Sagittarius expresses through expanding. Planets here aim at the far horizon — travel, philosophy, faith, the big picture. It would rather be roughly right about something vast than precisely right about something small.",
    strengths:
      "Optimism with legs, honesty that clears the air, and a contagious sense that life is an adventure worth having.",
    watchFor:
      "The horizon can become an escape hatch, and candor can trample nuance. The growth edge is finding freedom inside commitments, not only beyond them.",
    inRelationship:
      "Sagittarius energy needs room to roam and a partner who feels like a fellow traveler, not a customs officer.",
  },
  {
    slug: "capricorn",
    name: "Capricorn",
    glyph: "♑",
    dates: "about December 22 – January 19",
    element: "Earth",
    modality: "Cardinal",
    ruler: "Saturn",
    keywords: ["mastery", "responsibility", "endurance"],
    style:
      "Capricorn expresses through building. Planets here take the long view, respect structure, and climb — patiently, strategically, and usually carrying more than their share.",
    strengths:
      "Discipline, integrity under pressure, and the rare ability to turn ambition into durable achievement.",
    watchFor:
      "Duty can crowd out joy, and self-sufficiency can refuse help it genuinely needs. The growth edge is letting worth rest on more than output.",
    inRelationship:
      "Capricorn energy shows love through commitment and reliability. It softens slowly — and permanently — with those who prove patient.",
  },
  {
    slug: "aquarius",
    name: "Aquarius",
    glyph: "♒",
    dates: "about January 20 – February 18",
    element: "Air",
    modality: "Fixed",
    ruler: "Saturn (traditional), Uranus (modern)",
    keywords: ["perspective", "independence", "community"],
    style:
      "Aquarius expresses through reimagining. Planets here step outside the frame — questioning defaults, siding with the future, and caring for people in principled, sometimes unconventional ways.",
    strengths:
      "Original thinking, humanitarian instinct, and steadiness in its convictions even when they cost social comfort.",
    watchFor:
      "Perspective can become distance, and principle can outrank person. The growth edge is letting the heart be as engaged as the ideals.",
    inRelationship:
      "Aquarius energy needs friendship at the core of love, and space that is granted rather than negotiated.",
  },
  {
    slug: "pisces",
    name: "Pisces",
    glyph: "♓",
    dates: "about February 19 – March 20",
    element: "Water",
    modality: "Mutable",
    ruler: "Jupiter (traditional), Neptune (modern)",
    keywords: ["compassion", "imagination", "surrender"],
    style:
      "Pisces expresses through dissolving. Planets here feel the whole room, blur the boundary between self and other, and reach for what is beyond the visible — art, spirit, dream, mercy.",
    strengths:
      "Deep compassion, creative imagination, and an intuitive read on people and currents that logic cannot match.",
    watchFor:
      "Boundarylessness can mean absorbing what was never yours to carry. The growth edge is compassion that includes yourself — and a working pair of boundaries.",
    inRelationship:
      "Pisces energy loves empathically and needs gentleness in return. Clear agreements protect its tender, generous heart.",
  },
];
