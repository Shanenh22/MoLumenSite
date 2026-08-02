/**
 * The five major (Ptolemaic) aspects — "relationships between chart factors."
 * Angles are exact geometry; orbs vary by astrologer and are described
 * approximately.
 */
export interface Aspect {
  slug: string;
  name: string;
  glyph: string;
  angle: string;
  nature: string;
  relationship: string;
  livedExperience: string;
  workingWithIt: string;
}

export const aspects: Aspect[] = [
  {
    slug: "conjunction",
    name: "Conjunction",
    glyph: "☌",
    angle: "0° — the same place in the zodiac",
    nature:
      "Fusion. Neither easy nor hard by itself; it takes its character from the planets involved.",
    relationship:
      "Two planets conjunct act as one blended force. Their agendas merge — sometimes into a superpower, sometimes into a package deal you cannot take apart.",
    livedExperience:
      "You experience conjunct planets as a single instinct: the Moon conjunct Mars feels feelings and acts on them in the same heartbeat.",
    workingWithIt:
      "Learn to tell the two voices apart even though they arrive together. Naming each planet separately gives you back a choice inside the blend.",
  },
  {
    slug: "sextile",
    name: "Sextile",
    glyph: "⚹",
    angle: "60° — two signs apart",
    nature:
      "Opportunity. A friendly aspect that offers cooperation without forcing it.",
    relationship:
      "Sextile planets are compatible collaborators — usually across complementary elements (fire–air, earth–water) — that support each other when invited to.",
    livedExperience:
      "Sextiles feel like doors that open when knocked on. Talents sit here quietly; nothing happens until you use them.",
    workingWithIt:
      "The sextile rewards initiative. Treat it as standing permission: the resource is real, but you must pick it up.",
  },
  {
    slug: "square",
    name: "Square",
    glyph: "□",
    angle: "90° — three signs apart",
    nature:
      "Friction. A hard aspect — and one of the chart's most productive engines.",
    relationship:
      "Square planets want different things in incompatible styles, like roommates with opposite schedules. Neither will yield, so the tension recurs until it is built into something.",
    livedExperience:
      "Squares feel like the problem that keeps coming back — and, over years, like the muscle you built solving it. Many signature achievements sit on natal squares.",
    workingWithIt:
      "Stop trying to make the square go away. Give both planets a legitimate job and the friction becomes traction.",
  },
  {
    slug: "trine",
    name: "Trine",
    glyph: "△",
    angle: "120° — four signs apart, usually same element",
    nature: "Flow. The classic easy aspect — harmony that asks nothing.",
    relationship:
      "Trine planets share an element and an outlook; energy moves between them without resistance, like water finding its level.",
    livedExperience:
      "Trines feel like things you have always been able to do — so native you may not count them as talents at all.",
    workingWithIt:
      "The trine's risk is passivity: gifts left idling because they never demanded attention. Deliberate use turns ease into excellence.",
  },
  {
    slug: "opposition",
    name: "Opposition",
    glyph: "☍",
    angle: "180° — across the zodiac from each other",
    nature: "Polarity. A hard aspect that seeks balance rather than victory.",
    relationship:
      "Opposed planets sit at two ends of one axis — the same conversation from opposite chairs. Each holds something the other lacks.",
    livedExperience:
      "Oppositions often play out through other people: you carry one end, someone across from you carries the other, until you recognize both as yours.",
    workingWithIt:
      "The question is never which side wins — it is how both get a seat. Integration, not amputation.",
  },
];
