/**
 * The five major (Ptolemaic) aspects. Angles are exact geometry; orbs vary by
 * astrologer and school and are given as commonly-used ranges. Interpretive
 * fields are labeled by kind: `traditional`, `modern`, `mo`.
 */
export interface Aspect {
  slug: string;
  name: string;
  glyph: string;
  angle: string;
  degrees: number;
  typicalOrb: string;
  signRelationship: string;
  nature: string;
  traditional: string;
  modern: string;
  mo: string;
  misconception: string;
  relationship: string;
  livedExperience: string;
  workingWithIt: string;
}

export const aspects: Aspect[] = [
  {
    slug: "conjunction",
    name: "Conjunction",
    glyph: "☌",
    angle: "0°: the same place in the zodiac",
    degrees: 0,
    typicalOrb: "commonly 8–10° for the Sun and Moon, 6–8° for other planets",
    signRelationship:
      "Usually the same sign, though a conjunction can straddle a sign boundary.",
    nature:
      "Fusion. Neither easy nor hard by itself; much depends on the planets involved and the rest of the chart.",
    traditional:
      "Traditional astrology treats conjunctions as powerful contacts and judges them by the nature, condition, and relationship of the planets involved. A conjunction is not automatically benefic or difficult simply because the planets occupy the same place.",
    modern:
      "Modern practice often reads the conjunction as blending or fusion: two functions operating so closely together that they may be difficult to experience separately.",
    mo: "A conjunction interests me because the two planets have always been together in that person's chart. The person may experience the blend as completely ordinary. Part of the reading can be separating the functions just enough to notice what each one contributes.",
    misconception:
      "That conjunctions are automatically good. Fusion intensifies a relationship between two chart factors; whether that feels easy, difficult, productive, or contradictory depends on what is being joined.",
    relationship:
      "Conjunct planets operate in close proximity. Their agendas can reinforce, complicate, or reshape one another, which is why the planets themselves matter more than the label 'conjunction.'",
    livedExperience:
      "A conjunction can feel like one instinct made from two functions. The blend may be so familiar that its separate ingredients are easier for an outside observer to notice than for the person living it.",
    workingWithIt:
      "Try naming what each planet wants separately, then notice what changes when they act together. Distinction can create more choice inside the blend.",
  },
  {
    slug: "sextile",
    name: "Sextile",
    glyph: "⚹",
    angle: "60°: two signs apart",
    degrees: 60,
    typicalOrb: "commonly 4–6°",
    signRelationship: "Compatible elements: fire with air, earth with water.",
    nature:
      "Opportunity. A generally supportive aspect whose usefulness may depend on participation.",
    traditional:
      "Traditional astrology classifies the sextile as a benefic aspect, generally milder than the trine: a relationship of assistance, opportunity, or moderate friendship between the planets involved.",
    modern:
      "Modern practice often describes the sextile as a usable connection or talent that may become more visible when the person actively develops it.",
    mo: "Sextiles can be easy to overlook because they may not demand attention. I like them for exactly that reason. They can show a relationship between parts of the chart that becomes more useful once the person realizes it is available.",
    misconception:
      "That sextiles are too minor to matter. They may be quieter than stronger aspects, but their importance still depends on the planets involved, the orb, and the larger chart.",
    relationship:
      "Sextile planets have a generally cooperative relationship. The connection can offer support or an opening without forcing the person to use it.",
    livedExperience:
      "A sextile may feel less like a problem demanding a solution and more like a capacity that becomes noticeable once life gives it something to do.",
    workingWithIt:
      "Notice where one part of the chart can help another. The aspect may describe an available route rather than an automatic outcome.",
  },
  {
    slug: "square",
    name: "Square",
    glyph: "□",
    angle: "90°: three signs apart",
    degrees: 90,
    typicalOrb: "commonly 6–8°",
    signRelationship:
      "Usually signs of the same modality and different elements, which helps describe the friction.",
    nature:
      "Friction. A challenging relationship that can create pressure, effort, and development.",
    traditional:
      "Traditional astrology classifies the square as a difficult aspect associated with obstruction, conflict, or strain in the matters signified by the planets involved.",
    modern:
      "Modern astrology often adds a developmental frame: repeated tension can become a source of skill, effort, awareness, or achievement over time.",
    mo: "I do not want to prettify a square. Some are genuinely difficult to live. I also do not want to reduce difficulty to doom. What interests me is how the two planets keep encountering one another and what the person has learned, or is still learning, from having to negotiate that tension.",
    misconception:
      "That a square guarantees bad events. It describes a difficult relationship between chart factors, not a predetermined outcome, and its expression changes with the planets, houses, condition, timing, and person.",
    relationship:
      "Square planets pull in directions that do not coordinate easily. The tension can recur until the person finds a way to give both functions legitimate expression.",
    livedExperience:
      "Squares often feel like a recurring point of effort. Over time, the same friction can become familiar territory and sometimes a source of competence.",
    workingWithIt:
      "Ask what each side of the square is trying to accomplish before deciding that one of them is the problem. The aim is not to erase tension but to work with it more consciously.",
  },
  {
    slug: "trine",
    name: "Trine",
    glyph: "△",
    angle: "120°: four signs apart",
    degrees: 120,
    typicalOrb: "commonly 6–8°",
    signRelationship:
      "Usually signs of the same element, one reason the relationship is described as flowing.",
    nature: "Flow. A generally supportive relationship between chart factors.",
    traditional:
      "Traditional astrology classifies the trine as a benefic aspect associated with ease, assistance, and a natural affinity between the planets involved.",
    modern:
      "Modern practice often notes that an easy relationship can be underused precisely because it does not create much pressure for development.",
    mo: "A trine can describe something a person does so naturally that they do not recognize it as a capacity. I am interested in the ease, but also in what the rest of the chart asks that ease to do. A gift matters differently when it has somewhere meaningful to go.",
    misconception:
      "That trines guarantee good outcomes. They describe ease of relationship, not a promise about what someone will do with it.",
    relationship:
      "Trine planets tend to support one another with relatively little friction. That can feel like fluency, familiarity, or a channel that is easy to use.",
    livedExperience:
      "A trine may feel so natural that it goes unnamed. Other people sometimes notice the ease before the person carrying it does.",
    workingWithIt:
      "Ask where the ease is useful and whether you are actually using it. A supportive aspect still belongs inside the whole chart, where other factors may challenge, focus, or redirect it.",
  },
  {
    slug: "opposition",
    name: "Opposition",
    glyph: "☍",
    angle: "180°: across the zodiac from each other",
    degrees: 180,
    typicalOrb: "commonly 8–10°",
    signRelationship: "Same modality, opposite signs, two ends of one axis.",
    nature: "Polarity. A challenging aspect organized around two ends of one axis.",
    traditional:
      "Traditional astrology classifies the opposition as a difficult aspect in which two planets confront one another from opposite sides of the zodiac.",
    modern:
      "Modern astrology often reads oppositions through polarity, projection, and integration: one end of the axis may be easier to identify with while the other is first encountered through other people or circumstances.",
    mo: "Oppositions fascinate me because the two ends really do belong to the same axis. Sometimes a person identifies strongly with one side and keeps meeting the other through relationships. I do not assume that is what is happening, but it is a useful question to bring into the conversation.",
    misconception:
      "That an opposition must be solved by choosing one side. The tension is built into an axis; the work is often learning how both functions belong rather than declaring one of them wrong.",
    relationship:
      "Opposed planets face one another across an axis. Each can illuminate what the other lacks, exaggerate a difference, or create a repeated need for balance and negotiation.",
    livedExperience:
      "Oppositions can be experienced internally or through other people. The expression varies, but the sense of two competing or complementary positions is usually central.",
    workingWithIt:
      "Instead of asking which side wins, ask what each side contributes and what becomes possible when neither has to disappear.",
  },
];
