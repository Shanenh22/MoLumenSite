/**
 * The 12 zodiac signs.
 *
 * Structural attributes (element, modality, polarity, rulership, dignities,
 * opposite sign, solar dates) follow the standard Western tropical canon and
 * the Ptolemaic dignity tables. Interpretive fields are labeled by kind:
 * `traditional` = pre-modern convention, `modern` = 20th-century psychological
 * astrology, `mo` = Mo's synthesis, `differs` = live disagreement between
 * schools. Solar dates are approximate; the Sun's ingress shifts about a day
 * from year to year.
 */
export interface Sign {
  slug: string;
  name: string;
  glyph: string;
  glyphMeaning: string;
  dates: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  modality: "Cardinal" | "Fixed" | "Mutable";
  polarity: "Expressive (diurnal)" | "Receptive (nocturnal)";
  ruler: string;
  modernRuler?: string;
  exaltation?: string;
  detriment: string;
  fall?: string;
  opposite: string;
  season: string;
  keywords: string[];
  style: string;
  traditional: string;
  modern: string;
  mo: string;
  differs?: string;
  misconception: string;
  strengths: string;
  watchFor: string;
  inRelationship: string;
  atWork: string;
}

export const signs: Sign[] = [
  {
    slug: "aries",
    name: "Aries",
    glyph: "♈",
    glyphMeaning: "The ram's horns: the head lowered and driving forward.",
    dates: "about March 21 – April 19",
    element: "Fire",
    modality: "Cardinal",
    polarity: "Expressive (diurnal)",
    ruler: "Mars",
    exaltation: "the Sun (19° Aries)",
    detriment: "Venus",
    fall: "Saturn",
    opposite: "Libra",
    season:
      "Opens spring in the northern hemisphere: the equinox point, 0° of the zodiac.",
    keywords: ["initiative", "courage", "directness"],
    style:
      "Aries brings a cardinal-fire style: initiating, direct, responsive to challenge, and inclined to move before everything has been fully worked out.",
    traditional:
      "As Mars's day-side home and the exaltation of the Sun, Aries was read as the sign of raw initiating force: hot, dry, and choleric. Saturn falls here, and Venus is in detriment, which older texts connected with difficulty around restraint, accommodation, or delay.",
    modern:
      'Twentieth-century astrology recast Aries as the archetype of individuation: the first assertion of "I am" before relationship, role, or social conditioning shapes it. The emphasis moved from martial force toward healthy self-assertion and the courage to exist as a separate person.',
    mo: "With Aries, I look for where initiative is useful and where speed may be outrunning context. Sometimes the gift is starting what no one else will start. Sometimes the question is what happens after the first move. The planet involved tells me far more than the sign alone.",
    misconception:
      "That Aries means angry. Mars rulership can show up as heat or conflict, but also as courage, decisiveness, advocacy, physical effort, or the willingness to begin.",
    strengths:
      "Aries can add courage, momentum, candor, and a willingness to enter new territory.",
    watchFor:
      "In some charts, speed can outrun reflection or follow-through. The useful question is whether immediate action serves the situation or simply relieves impatience.",
    inRelationship:
      "Aries can bring directness and strong engagement to relationship, but the lived expression depends on the planet, house, aspects, and the person's actual relational history.",
    atWork:
      "Aries symbolism can be useful around launches, initiative, competition, crisis response, or entrepreneurial action. It does not prescribe a career by itself.",
  },
  {
    slug: "taurus",
    name: "Taurus",
    glyph: "♉",
    glyphMeaning:
      "The bull's head and horns: weight, patience, and rootedness.",
    dates: "about April 20 – May 20",
    element: "Earth",
    modality: "Fixed",
    polarity: "Receptive (nocturnal)",
    ruler: "Venus",
    exaltation: "the Moon (3° Taurus)",
    detriment: "Mars",
    opposite: "Scorpio",
    season: "Spring at full strength: the season's growth becoming substance.",
    keywords: ["steadiness", "embodiment", "value"],
    style:
      "Taurus brings a fixed-earth style: stabilizing, conserving, sensory, deliberate, and interested in what can be sustained or relied upon.",
    traditional:
      "Venus's night home and the Moon's exaltation: a receptive, fertile sign associated with land, provisions, pleasure, and sustenance. Mars is in detriment here, since swift cutting action sits awkwardly in a sign whose method favors continuity.",
    modern:
      "Modern astrology emphasizes Taurus through embodiment, self-worth, pleasure, security, and relationship to value. Those themes may be expressed materially, emotionally, creatively, or relationally depending on the chart.",
    mo: "Taurus makes me curious about what someone values enough to preserve and what has become familiar enough that change feels expensive. I do not assume stubbornness or stability from the sign alone; I want to see what planet is there and what the person has actually learned to hold onto.",
    misconception:
      "That Taurus is lazy. Deliberation and conservation are not the same as lack of effort, and fixed-earth energy can be remarkably persistent once committed.",
    strengths:
      "Taurus can contribute steadiness, patience, sensory awareness, loyalty, and an ability to build value over time.",
    watchFor:
      "Consistency can become inertia when familiarity is mistaken for nourishment. Context tells us whether holding on is wisdom or avoidance.",
    inRelationship:
      "Taurus can emphasize constancy, physical affection, loyalty, or tangible expressions of care. How those needs operate depends on the rest of the relationship picture.",
    atWork:
      "Taurus symbolism can support long-horizon building, stewardship, craft, finance, resources, or work that benefits from patience and continuity.",
  },
  {
    slug: "gemini",
    name: "Gemini",
    glyph: "♊",
    glyphMeaning:
      "The twins: two figures side by side, and the duality of any exchange.",
    dates: "about May 21 – June 20",
    element: "Air",
    modality: "Mutable",
    polarity: "Expressive (diurnal)",
    ruler: "Mercury",
    detriment: "Jupiter",
    opposite: "Sagittarius",
    season:
      "Spring dispersing into summer: the season distributing what it grew.",
    keywords: ["curiosity", "connection", "versatility"],
    style:
      "Gemini brings a mutable-air style: gathering, comparing, connecting, translating, and moving information from one place or perspective to another.",
    traditional:
      "Mercury's day home, and traditionally associated with siblings, neighbors, short journeys, letters, commerce, and exchange. Jupiter is in detriment here, since broad synthesis can sit uneasily with a sign that works by separating and comparing pieces.",
    modern:
      "Modern practice foregrounds Gemini as a symbol of perception, language, mental flexibility, learning, and exchange. Its multiplicity can be read as curiosity rather than inconsistency.",
    mo: "Gemini placements often make me pay attention to how a person moves between ideas, people, or languages of experience. Translation can be a real gift here. Whether variety feels enlivening or dispersing depends on what else the chart is asking that planet to do.",
    differs:
      "Traditional texts may emphasize mutability as instability; modern practice often values it as adaptive intelligence. Both are observing changeability and assigning different weight to it.",
    misconception:
      "That Gemini is two-faced. Its symbolism is more usefully understood through multiplicity, comparison, and the ability to hold more than one idea in view.",
    strengths:
      "Gemini can add curiosity, verbal agility, adaptability, quick learning, and a talent for connecting information or people.",
    watchFor:
      "Breadth can become fragmentation when nothing is given enough time to deepen. Whether that is a problem depends on the role the placement plays in the chart.",
    inRelationship:
      "Gemini can emphasize conversation, mental stimulation, flexibility, and curiosity in relationship, but no sign alone defines attachment or compatibility.",
    atWork:
      "Gemini symbolism often suits communication, teaching, writing, sales, media, research, networking, or work where variety and information flow matter.",
  },
  {
    slug: "cancer",
    name: "Cancer",
    glyph: "♋",
    glyphMeaning:
      "The crab's claws, or two curled forms: the shell and what it protects.",
    dates: "about June 21 – July 22",
    element: "Water",
    modality: "Cardinal",
    polarity: "Receptive (nocturnal)",
    ruler: "the Moon",
    exaltation: "Jupiter (15° Cancer)",
    detriment: "Saturn",
    fall: "Mars",
    opposite: "Capricorn",
    season:
      "Opens summer at the solstice: the year at its most fertile and most sheltered.",
    keywords: ["care", "memory", "belonging"],
    style:
      "Cancer brings a cardinal-water style: initiating through care, protection, attachment, memory, belonging, and sensitivity to what feels safe or familiar.",
    traditional:
      "The Moon's only home and Jupiter's exaltation: a sign traditionally associated with nourishment, lineage, fertility, increase, and protection. Saturn is in detriment and Mars falls here.",
    modern:
      "Modern astrology reads Cancer through attachment, emotional security, memory, care, and the ways early belonging can shape later responses.",
    mo: "Cancer makes me curious about what someone protects, how they ask for care, and what they experience as home or belonging. I never assume a family story from the sign alone. The chart may describe sensitivity to care without telling me how care was actually given or received.",
    misconception:
      "That Cancer is fragile. Receptivity and protectiveness can coexist with considerable strength, especially when something important feels threatened.",
    strengths:
      "Cancer can contribute emotional memory, loyalty, protectiveness, responsiveness, and an instinct for sustaining people or places.",
    watchFor:
      "Protection can become withdrawal or overprotection when safety is treated as the only goal. The rest of the chart shows how much movement and exposure are also needed.",
    inRelationship:
      "Cancer can emphasize care, continuity, security, home, and emotional responsiveness in relationship. The person still tells us what those words mean in practice.",
    atWork:
      "Cancer symbolism can be strong where stewardship, memory, care, continuity, hospitality, home, family systems, or protection are relevant.",
  },
  {
    slug: "leo",
    name: "Leo",
    glyph: "♌",
    glyphMeaning: "The lion's mane and tail: a curve of radiating heat.",
    dates: "about July 23 – August 22",
    element: "Fire",
    modality: "Fixed",
    polarity: "Expressive (diurnal)",
    ruler: "the Sun",
    detriment: "Saturn",
    opposite: "Aquarius",
    season:
      "Summer at full height: maximum light, and the year at its most confident.",
    keywords: ["heart", "creativity", "dignity"],
    style:
      "Leo brings a fixed-fire style: sustained creative expression, visibility, warmth, authorship, pride, play, and the desire to invest heart in what matters.",
    traditional:
      "The Sun's only home, associated with kingship, the heart, vitality, visibility, and dignity. Saturn is in detriment here, placing restraint and scarcity opposite a sign built around solar radiance.",
    modern:
      "Modern astrology frames Leo around creative self-expression, play, authorship, visibility, and the development of a self that can both shine and recognize others.",
    mo: "Leo placements make me curious about visibility: where someone wants to create, contribute, lead, be recognized, or simply be fully themselves without shrinking. I do not assume every Leo placement wants attention. Sometimes the deeper issue is whether it feels safe to be seen at all.",
    misconception:
      "That Leo is arrogant. Solar symbolism can involve pride and recognition, but it can also describe generosity, creativity, loyalty, play, leadership, or the courage to be visible.",
    strengths:
      "Leo can add creative confidence, loyalty, generosity, warmth, and sustained commitment to something personally meaningful.",
    watchFor:
      "Recognition can become overly important when self-expression depends on an audience. In other charts, the challenge may be allowing visibility rather than seeking it.",
    inRelationship:
      "Leo can emphasize warmth, loyalty, play, appreciation, and expressive affection. The whole chart shows whether that comes easily or feels vulnerable.",
    atWork:
      "Leo symbolism can be useful where leadership, performance, creativity, ownership, visibility, children, entertainment, or personal authorship matter.",
  },
  {
    slug: "virgo",
    name: "Virgo",
    glyph: "♍",
    glyphMeaning:
      "A maiden holding a sheaf of wheat: the harvest sorted and stored.",
    dates: "about August 23 – September 22",
    element: "Earth",
    modality: "Mutable",
    polarity: "Receptive (nocturnal)",
    ruler: "Mercury",
    exaltation: "Mercury (15° Virgo)",
    detriment: "Jupiter",
    fall: "Venus",
    opposite: "Pisces",
    season:
      "Late summer: the harvest, and the sorting of what is worth keeping.",
    keywords: ["craft", "discernment", "service"],
    style:
      "Virgo brings a mutable-earth style: sorting, refining, adapting, diagnosing, practicing, and improving through attention to useful detail.",
    traditional:
      "Uniquely both Mercury's night home and Mercury's exaltation, Virgo was associated with discrimination, craft, analysis, and careful sorting. Venus falls here and Jupiter is in detriment.",
    modern:
      "Modern practice emphasizes Virgo through daily practice, skill, service, health routines, discernment, work, and the relationship between improvement and self-criticism.",
    mo: "Virgo placements make me curious about the difference between discernment and criticism. The capacity to notice what could work better can be extraordinarily useful. The question is whether that same eye is allowed to recognize what is already working.",
    misconception:
      "That Virgo is simply nitpicky or cold. Precision can be an expression of care, craft, responsibility, or a desire to make something genuinely useful.",
    strengths:
      "Virgo can contribute precision, practical intelligence, craft, adaptability, service, and a talent for improving systems or processes.",
    watchFor:
      "Refinement can become endless correction. Sometimes 'good and finished' is the more intelligent standard; sometimes precision is exactly what the situation requires.",
    inRelationship:
      "Virgo can show care through attention, practical help, consistency, or problem-solving. Whether that feels supportive or intrusive depends on how it is offered and received.",
    atWork:
      "Virgo symbolism often supports craft, analysis, editing, systems, health, service, quality control, or any work where careful adjustment matters.",
  },
  {
    slug: "libra",
    name: "Libra",
    glyph: "♎",
    glyphMeaning:
      "The scales, or the setting sun on the horizon: balance at the tipping point.",
    dates: "about September 23 – October 22",
    element: "Air",
    modality: "Cardinal",
    polarity: "Expressive (diurnal)",
    ruler: "Venus",
    exaltation: "Saturn (21° Libra)",
    detriment: "Mars",
    fall: "the Sun",
    opposite: "Aries",
    season: "Opens autumn at the equinox: day and night in exact balance.",
    keywords: ["balance", "fairness", "relationship"],
    style:
      "Libra brings a cardinal-air style: initiating through comparison, relationship, negotiation, aesthetics, balance, justice, and awareness of another point of view.",
    traditional:
      "Venus's day home and Saturn's exaltation, Libra was associated with contracts, law, fairness, proportion, beauty, and the balancing of competing claims. The Sun falls here and Mars is in detriment.",
    modern:
      "Modern astrology treats Libra as an encounter with the other: identity developing through contrast, dialogue, partnership, projection, and the effort to create fair exchange.",
    mo: "Libra makes me curious about how someone weighs competing needs and how much of themselves remains visible in that process. Sometimes diplomacy is a gift. Sometimes keeping the peace has become more important than telling the truth. I want the life context before deciding which is happening.",
    misconception:
      "That Libra is simply indecisive. Seeing several legitimate sides of a question can be sophisticated perception; it becomes paralysis only when weighing replaces choosing.",
    strengths:
      "Libra can contribute diplomacy, fairness, aesthetic intelligence, mediation, social awareness, and a talent for holding more than one perspective.",
    watchFor:
      "Balance can become avoidance when every conflict is treated as a failure. A clear position can sometimes create more honest harmony than endless accommodation.",
    inRelationship:
      "Libra can make partnership, dialogue, reciprocity, fairness, and shared decision-making especially important themes.",
    atWork:
      "Libra symbolism often supports negotiation, design, law, mediation, consulting, client work, or environments where proportion and perspective matter.",
  },
  {
    slug: "scorpio",
    name: "Scorpio",
    glyph: "♏",
    glyphMeaning:
      "The scorpion's tail with its sting: the hidden thing that carries the power.",
    dates: "about October 23 – November 21",
    element: "Water",
    modality: "Fixed",
    polarity: "Receptive (nocturnal)",
    ruler: "Mars",
    modernRuler: "Pluto",
    detriment: "Venus",
    fall: "the Moon",
    opposite: "Taurus",
    season: "Autumn deepening: the season of decay that feeds the next cycle.",
    keywords: ["depth", "intensity", "transformation"],
    style:
      "Scorpio brings a fixed-water style: sustained emotional intensity, privacy, investigation, loyalty, concentration, and a tendency to look beneath appearances.",
    traditional:
      "Mars's night home, Scorpio was associated with hidden matters, danger, inheritance, surgery, death, and other people's resources. The Moon falls here and Venus is in detriment.",
    modern:
      "After Pluto's discovery, modern astrology increasingly associated Scorpio with depth psychology, transformation, power, compulsion, shadow material, and regeneration.",
    mo: "Scorpio placements make me curious about what someone is willing to investigate deeply and what they protect by staying private or in control. I do not assume trauma, secrecy, or intensity from the sign alone. Those are possibilities, not diagnoses.",
    differs:
      "Traditional astrologers keep Mars as Scorpio's ruler; many modern astrologers use Pluto. Those rulership choices can produce noticeably different emphases.",
    misconception:
      "That Scorpio is inherently vengeful, dark, or secretive. Its symbolism is more usefully understood through depth, concentration, protection, consequence, and willingness to stay with difficult material.",
    strengths:
      "Scorpio can contribute emotional courage, concentration, loyalty, investigative depth, strategic awareness, and resilience.",
    watchFor:
      "Depth can become suspicion or control when uncertainty feels intolerable. The whole chart helps show whether trust, privacy, or power is the more relevant theme.",
    inRelationship:
      "Scorpio can intensify themes of trust, privacy, loyalty, intimacy, shared resources, and emotional depth in relationship.",
    atWork:
      "Scorpio symbolism can be useful in research, investigation, crisis work, finance, psychology, medicine, strategy, or any field where important material sits below the surface.",
  },
  {
    slug: "sagittarius",
    name: "Sagittarius",
    glyph: "♐",
    glyphMeaning: "The centaur's arrow: aim released toward a distant target.",
    dates: "about November 22 – December 21",
    element: "Fire",
    modality: "Mutable",
    polarity: "Expressive (diurnal)",
    ruler: "Jupiter",
    detriment: "Mercury",
    opposite: "Gemini",
    season: "Late autumn: the year reaching past what it can see.",
    keywords: ["meaning", "freedom", "horizon"],
    style:
      "Sagittarius brings a mutable-fire style: exploring, expanding, teaching, interpreting experience, testing beliefs, and reaching toward a wider horizon.",
    traditional:
      "Jupiter's day home, Sagittarius was associated with long journeys, foreign lands, higher learning, law, religion, philosophy, and broad judgment. Mercury is in detriment here.",
    modern:
      "Modern astrology frames Sagittarius as the search for meaning: the impulse to turn experience into worldview and to revise that worldview when it becomes too small.",
    mo: "Sagittarius placements make me curious about what gives a person a sense of meaning, direction, freedom, or possibility. The same symbolism can describe teaching, travel, conviction, humor, restlessness, or a hunger for perspective. I do not assume which one is central until I hear the person's story.",
    misconception:
      "That Sagittarius is simply flaky or commitment-averse. Mutable fire can seek movement and range, but commitment can be very strong when it serves a meaningful direction.",
    strengths:
      "Sagittarius can contribute perspective, optimism, humor, candor, teaching ability, and willingness to explore beyond familiar boundaries.",
    watchFor:
      "A broad view can miss important details, and conviction can outrun curiosity. The question is whether meaning remains open enough to learn from what contradicts it.",
    inRelationship:
      "Sagittarius can emphasize honesty, growth, freedom, shared exploration, and the need for a relationship to keep expanding rather than merely repeating itself.",
    atWork:
      "Sagittarius symbolism often suits teaching, publishing, law, travel, coaching, international work, philosophy, or roles where vision and perspective matter.",
  },
  {
    slug: "capricorn",
    name: "Capricorn",
    glyph: "♑",
    glyphMeaning:
      "The sea-goat: a goat's body with a fish's tail, climbing from depth to summit.",
    dates: "about December 22 – January 19",
    element: "Earth",
    modality: "Cardinal",
    polarity: "Receptive (nocturnal)",
    ruler: "Saturn",
    exaltation: "Mars (28° Capricorn)",
    detriment: "the Moon",
    fall: "Jupiter",
    opposite: "Cancer",
    season:
      "Opens winter at the solstice: the darkest point, and the turn back toward light.",
    keywords: ["mastery", "responsibility", "endurance"],
    style:
      "Capricorn brings a cardinal-earth style: organizing, building, assuming responsibility, working with limits, and directing effort toward something durable.",
    traditional:
      "Saturn's night home and the exaltation of Mars, Capricorn was associated with authority, endurance, boundaries, labor, hierarchy, age, and long-term consequence. The Moon is in detriment and Jupiter falls here.",
    modern:
      "Modern astrology reads Capricorn through vocation, competence, responsibility, legitimate authority, ambition, and the gradual construction of a life that can bear weight.",
    mo: "Capricorn placements make me curious about responsibility: what someone has chosen to carry, what they assumed they had to carry, and what they are trying to build over time. Ambition is only one possible expression. So are restraint, expertise, duty, fear of failure, or a strong respect for consequence.",
    misconception:
      "That Capricorn is cold or purely materialistic. Saturnian restraint can reflect caution, duty, endurance, protectiveness, or seriousness about what has long-term consequences.",
    strengths:
      "Capricorn can contribute endurance, strategic planning, accountability, discipline, realism, and the ability to build over long periods.",
    watchFor:
      "Responsibility can become overidentification with usefulness or output. Sometimes the work is carrying more; sometimes it is discovering what no longer belongs on your back.",
    inRelationship:
      "Capricorn can emphasize reliability, commitment, responsibility, time, and earned trust. Emotional expression may be simple or complex depending on the rest of the chart.",
    atWork:
      "Capricorn symbolism often supports management, operations, leadership, institutions, long-term planning, craft mastery, or work where consequences accumulate over time.",
  },
  {
    slug: "aquarius",
    name: "Aquarius",
    glyph: "♒",
    glyphMeaning:
      "Two waves: the water-bearer pouring out, often read as waves of air or current.",
    dates: "about January 20 – February 18",
    element: "Air",
    modality: "Fixed",
    polarity: "Expressive (diurnal)",
    ruler: "Saturn",
    modernRuler: "Uranus",
    detriment: "the Sun",
    opposite: "Leo",
    season:
      "Deep winter: the season of structure, and of the ideas that outlast it.",
    keywords: ["perspective", "independence", "community"],
    style:
      "Aquarius brings a fixed-air style: sustained ideas, systems thinking, principled distance, group awareness, unconventional perspectives, and resistance to being easily moved.",
    traditional:
      "Saturn's day home, traditional Aquarius was associated with structure, society, law, groups, endurance, and the ordering of collective life. The Sun is in detriment here.",
    modern:
      "With Uranus assigned to it, modern astrology emphasized disruption, invention, individuation, social reform, independence, and future-oriented thinking.",
    mo: "Aquarius is one of the signs where I most want to know which rulership framework is useful and what the person actually does with fixed air. It can be principled, inventive, communal, detached, stubborn, reforming, or highly structured. Those are related possibilities, not one personality type.",
    differs:
      "Traditional practice reads Aquarius through Saturn; modern practice often adds or substitutes Uranus. The different rulers change the interpretive emphasis considerably.",
    misconception:
      "That Aquarius is automatically rebellious, futuristic, or emotionally detached. Fixed-air symbolism can just as easily describe consistency of thought, systems awareness, principle, or loyalty to a group or idea.",
    strengths:
      "Aquarius can contribute systems thinking, independence of mind, social perspective, consistency of principle, invention, and long-range conceptual thinking.",
    watchFor:
      "Perspective can become distance, and principle can become rigidity. The useful question is whether stepping back improves understanding or avoids participation.",
    inRelationship:
      "Aquarius can emphasize friendship, intellectual connection, freedom, shared ideals, or nontraditional relational structures. The rest of the chart shows how intimacy is actually approached.",
    atWork:
      "Aquarius symbolism can support systems, technology, science, networks, research, policy, community, innovation, or work oriented toward collective structures.",
  },
  {
    slug: "pisces",
    name: "Pisces",
    glyph: "♓",
    glyphMeaning:
      "Two fish bound together and swimming in opposite directions.",
    dates: "about February 19 – March 20",
    element: "Water",
    modality: "Mutable",
    polarity: "Receptive (nocturnal)",
    ruler: "Jupiter",
    modernRuler: "Neptune",
    exaltation: "Venus (27° Pisces)",
    detriment: "Mercury",
    fall: "Mercury",
    opposite: "Virgo",
    season:
      "Winter dissolving into spring: the last sign, where the year lets go.",
    keywords: ["compassion", "imagination", "surrender"],
    style:
      "Pisces brings a mutable-water style: adapting through feeling, imagination, permeability, compassion, symbolism, surrender, and sensitivity to what is difficult to separate cleanly.",
    traditional:
      "Jupiter's night home and the exaltation of Venus, Pisces was associated with faith, mercy, abundance, permeability, and the limits of purely analytical judgment. Mercury is both in detriment and fall here.",
    modern:
      "Modern astrology, assigning Neptune to Pisces, emphasizes imagination, transcendence, collective feeling, spirituality, dissolution, idealization, and the risks of escapism or confusion.",
    mo: "Pisces placements make me curious about sensitivity: what someone picks up, imagines, believes, idealizes, creates, or has difficulty separating from. I do not assume intuition, spirituality, poor boundaries, or artistic talent from the sign alone. Those are different possible expressions of the same symbolic field.",
    differs:
      "Traditional astrologers read Pisces through Jupiter; modern astrologers often add Neptune. Jupiter emphasizes faith, meaning, mercy, and increase; Neptune emphasizes permeability, imagination, and dissolution.",
    misconception:
      "That Pisces is weak or passive. Mutable water adapts, absorbs, and changes form; that can be yielding, resilient, imaginative, elusive, compassionate, or overwhelmed depending on context.",
    strengths:
      "Pisces can contribute imagination, compassion, adaptability, symbolic thinking, spiritual sensitivity, artistry, and an ability to perceive atmosphere or emotional nuance.",
    watchFor:
      "Permeability can become confusion when distinctions are needed. The answer is not necessarily to feel less, but to know more clearly what belongs to whom and what requires evidence.",
    inRelationship:
      "Pisces can emphasize empathy, imagination, idealization, sacrifice, spiritual connection, or emotional permeability in relationship. Clear agreements may become especially important in some charts.",
    atWork:
      "Pisces symbolism can support creative, spiritual, caring, charitable, artistic, healing, or imaginative work, especially where ambiguity and human complexity are part of the task.",
  },
];
