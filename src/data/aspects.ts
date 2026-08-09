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
      "Fusion. Neither easy nor hard by itself; it takes its character from the planets involved.",
    traditional:
      "Traditional astrology treated the conjunction as the most powerful of all aspects, and evaluated it strictly by the planets involved. A conjunction with a benefic was fortunate; one with a malefic, particularly a close conjunction with the Sun (combustion), was considered seriously damaging to the weaker planet.",
    modern:
      "Modern practice reads the conjunction as blending or fusion: two functions that operate as a single unit and cannot easily be experienced separately.",
    mo: "Conjunctions are the hardest aspects to see in yourself, because the two planets have never been apart. Someone with Mercury conjunct Saturn doesn't experience 'careful thinking'. They experience thinking. Naming the two voices separately is usually the whole intervention.",
    misconception:
      "That conjunctions are automatically good. Fusion amplifies whatever is fused, including two planets that want incompatible things.",
    relationship:
      "Two planets conjunct act as one blended force. Their agendas merge: sometimes into a superpower, sometimes into a package deal you cannot take apart.",
    livedExperience:
      "You experience conjunct planets as a single instinct: the Moon conjunct Mars feels feelings and acts on them in the same heartbeat.",
    workingWithIt:
      "Learn to tell the two voices apart even though they arrive together. Naming each planet separately gives you back a choice inside the blend.",
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
      "Opportunity. A friendly aspect that offers cooperation without forcing it.",
    traditional:
      "Classified as a benefic aspect, though weaker than the trine, traditional texts describe it as a relationship of moderate friendship and assistance rather than outright ease.",
    modern:
      "Modern practice frames the sextile as latent talent requiring activation: a channel between two functions that opens only when the person deliberately uses it.",
    mo: "Sextiles are the aspects clients most often haven't noticed. They describe things you could do easily and simply never got around to. In a reading they're some of the most useful territory, because the fix is usually just permission.",
    misconception:
      "That sextiles are too minor to matter. They are quieter than trines, not weaker, and because they require initiative, the skills they describe tend to be more consciously earned.",
    relationship:
      "Sextile planets are compatible collaborators, usually across complementary elements, that support each other when invited to.",
    livedExperience:
      "Sextiles feel like doors that open when knocked on. Talents sit here quietly; nothing happens until you use them.",
    workingWithIt:
      "The sextile rewards initiative. Treat it as standing permission: the resource is real, but you must pick it up.",
  },
  {
    slug: "square",
    name: "Square",
    glyph: "□",
    angle: "90°: three signs apart",
    degrees: 90,
    typicalOrb: "commonly 6–8°",
    signRelationship:
      "Same modality, incompatible elements, the source of the friction.",
    nature:
      "Friction. A hard aspect, and one of the chart's most productive engines.",
    traditional:
      "A hostile aspect in traditional terms, a relationship of enmity between planets, indicating obstruction and conflict in the matters they govern. Traditional astrology did not soften this.",
    modern:
      "Modern astrology substantially reframed the square as developmental tension: the friction that forces growth, and the source of a chart's drive and achievement.",
    mo: "I take the traditional view seriously. Squares genuinely are difficult, and pretending otherwise insults anyone living one. But I've also never met an accomplished person without them. The difficulty and the capability are the same feature seen at different points in a life.",
    misconception:
      "That squares are bad luck. They describe an internal conflict between two of your own drives, which means the resolution is available to you, unlike genuine misfortune.",
    relationship:
      "Square planets want different things in incompatible styles, like roommates with opposite schedules. Neither will yield, so the tension recurs until it is built into something.",
    livedExperience:
      "Squares feel like the problem that keeps coming back, and, over years, like the muscle you built solving it. Many signature achievements sit on natal squares.",
    workingWithIt:
      "Stop trying to make the square go away. Give both planets a legitimate job and the friction becomes traction.",
  },
  {
    slug: "trine",
    name: "Trine",
    glyph: "△",
    angle: "120°: four signs apart",
    degrees: 120,
    typicalOrb: "commonly 6–8°",
    signRelationship:
      "Same element: the reason the energy flows without resistance.",
    nature: "Flow. The classic easy aspect: harmony that asks nothing.",
    traditional:
      "The most benefic aspect in traditional astrology: a relationship of friendship and mutual support, indicating ease and natural favour in the matters the planets govern.",
    modern:
      "Modern practice adds a caution the tradition rarely emphasized: trines describe gifts that can go unused precisely because nothing ever forces the issue.",
    mo: "Trines are where people are talented and bored. The ability is real and it arrived without effort, which is exactly why it often gets treated as unremarkable. Half my job with a strong trine is convincing someone it counts.",
    misconception:
      "That trines guarantee good outcomes. They describe ease of flow, not merit, and an unused trine produces nothing at all.",
    relationship:
      "Trine planets share an element and an outlook; energy moves between them without resistance, like water finding its level.",
    livedExperience:
      "Trines feel like things you have always been able to do, so native you may not count them as talents at all.",
    workingWithIt:
      "The trine's risk is passivity: gifts left idling because they never demanded attention. Deliberate use turns ease into excellence.",
  },
  {
    slug: "opposition",
    name: "Opposition",
    glyph: "☍",
    angle: "180°: across the zodiac from each other",
    degrees: 180,
    typicalOrb: "commonly 8–10°",
    signRelationship: "Same modality, opposite signs, two ends of one axis.",
    nature: "Polarity. A hard aspect that seeks balance rather than victory.",
    traditional:
      "A hostile aspect, classically second only to the square in difficulty. Planets in opposition were read as being in direct confrontation, each undermining the other.",
    modern:
      "Modern astrology reads opposition through projection and integration: the tendency to experience one end of the axis as belonging to someone else until both are consciously owned.",
    mo: "Oppositions show up as other people with impressive reliability. The partner who is everything you are not, the colleague who drives you mad. Those are frequently one end of an axis you carry. Recognizing that is uncomfortable and enormously freeing.",
    misconception:
      "That an opposition must be resolved by choosing a side. The axis is the point: both ends are yours, and the work is holding them together rather than eliminating one.",
    relationship:
      "Opposed planets sit at two ends of one axis: the same conversation from opposite chairs. Each holds something the other lacks.",
    livedExperience:
      "Oppositions often play out through other people: you carry one end, someone across from you carries the other, until you recognise both as yours.",
    workingWithIt:
      "The question is never which side wins. It is how both get a seat. Integration, not amputation.",
  },
];
