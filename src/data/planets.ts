/**
 * The ten planets of Western astrological practice (the Sun and Moon are
 * "luminaries"; astrology counts them among the planets by convention).
 *
 * Orbital and cycle figures are astronomical approximations. Dignities follow
 * the Ptolemaic tables. Interpretive fields are labeled by kind: `traditional`
 * = pre-modern convention, `modern` = 20th-century psychological astrology,
 * `mo` = Mo's synthesis, `differs` = live disagreement between schools.
 */
export interface Planet {
  slug: string;
  name: string;
  glyph: string;
  glyphMeaning: string;
  cycle: string;
  retrograde: string;
  sect?: string;
  classification: string;
  rules: string;
  exaltation?: string;
  detriment?: string;
  fall?: string;
  joy?: string;
  drive: string;
  traditional: string;
  modern: string;
  mo: string;
  differs?: string;
  misconception: string;
  inYourChart: string;
  whenItLeads: string;
  workingWithIt: string;
}

export const planets: Planet[] = [
  {
    slug: "sun",
    name: "The Sun",
    glyph: "☉",
    glyphMeaning: "A circle with a central point: spirit with a fixed centre.",
    cycle: "about 365.25 days through the zodiac (roughly 30 days per sign)",
    retrograde:
      "Never: the Sun is our reference point, so it cannot appear to reverse.",
    sect: "Diurnal (day sect): traditionally strongest in a chart born during daylight.",
    classification: "Luminary",
    rules: "Leo",
    exaltation: "Aries (19°)",
    detriment: "Aquarius",
    fall: "Libra",
    joy: "The 9th house",
    drive:
      "Identity, vitality, purpose, and the impulse to become more fully yourself. The Sun describes a central organizing principle in the chart, but it never operates alone.",
    traditional:
      "Traditional astrology treats the Sun as the chart's source of life and dignity: the \"greater light,\" associated with rulers, fathers, honour, and the vital spirit itself. Its condition was read as a measure of a person's standing and vitality. It takes joy in the ninth house, the house of God, travel, and higher knowledge.",
    modern:
      "Modern psychological astrology reframed the Sun as the emerging self, the conscious ego and the direction of individuation. Where tradition asked whether the Sun was well-placed, modern practice asks whether the person is living their Sun consciously.",
    mo: "I read the Sun as a central thread rather than a personality label. Sometimes people recognize it immediately; sometimes it describes qualities they are still learning to inhabit. Its sign, house, aspects, and the rest of the chart all change how that solar principle is expressed.",
    misconception:
      "That your Sun sign is your personality. It is one factor in a whole chart, and its meaning changes through relationship with the rest of that chart.",
    inYourChart:
      "The Sun's sign describes a style of self-expression; its house points to an arena where vitality, visibility, or authorship may matter; its aspects show what else participates in that process.",
    whenItLeads:
      "Solar emphasis can feel purposeful, creative, visible, and self-directed. In some charts or circumstances it can also make questions of recognition, identity, or authority especially noticeable.",
    workingWithIt:
      "Ask where you feel most fully present and most willing to take authorship. Then look at what the rest of the chart says about how that becomes possible.",
  },
  {
    slug: "moon",
    name: "The Moon",
    glyph: "☽",
    glyphMeaning: "The crescent: the light that changes shape.",
    cycle:
      "about 27.3 days through the zodiac (roughly 2.5 days per sign); 29.5 days from new moon to new moon",
    retrograde:
      "Never: the Moon always moves forward, though its speed varies.",
    sect: "Nocturnal (night sect): traditionally strongest in a chart born after dark.",
    classification: "Luminary",
    rules: "Cancer",
    exaltation: "Taurus (3°)",
    detriment: "Capricorn",
    fall: "Scorpio",
    joy: "The 3rd house",
    drive:
      "Instinct, habit, memory, care, and the conditions that help you feel settled enough to respond rather than brace.",
    traditional:
      'The "lesser light," and the fastest-moving body: traditional astrology used the Moon as the chart\'s carrier of matter, the body, mothers, the common people, and the flow of daily life. In horary practice the Moon is decisive, its next aspect often tells the story of how a question resolves.',
    modern:
      "Modern astrology emphasizes the Moon as the emotional and attachment system, the inherited patterns of care, the felt sense of security, and the unconscious habits formed before conscious memory.",
    mo: "The Moon often tells me something important about what feels familiar, protective, or emotionally sustaining to a person. I handle it gently because early patterns can be deeply lived, but I never assume that a Moon placement tells me someone's history before they tell me how it has actually shown up.",
    misconception:
      'That the Moon only matters for "moods." In astrology it is also associated with habit, memory, care, instinct, and the body's rhythms.',
    inYourChart:
      "The Moon's sign, house, aspects, phase, and condition all contribute to how needs, habits, memory, and responsiveness are expressed.",
    whenItLeads:
      "Lunar emphasis can heighten responsiveness, caretaking, memory, instinct, and sensitivity to atmosphere. How comfortable or complicated that feels depends on the Moon's condition and context.",
    workingWithIt:
      "Notice what reliably restores you and what you reach for automatically. The interesting question is not whether a need is 'good' or 'bad,' but how consciously it is being lived.",
  },
  {
    slug: "mercury",
    name: "Mercury",
    glyph: "☿",
    glyphMeaning:
      "The winged cap above the cross of matter: the messenger's headgear.",
    cycle:
      "about 88 days around the Sun; roughly a year to cross the zodiac as seen from Earth",
    retrograde: "About three times a year, roughly three weeks each time.",
    sect: "Either: Mercury takes the sect of whichever side of the Sun it rises on.",
    classification: "Personal planet",
    rules: "Gemini and Virgo",
    exaltation:
      "Virgo (15°): uniquely both ruler and exalted in the same sign",
    detriment: "Sagittarius and Pisces",
    fall: "Pisces",
    joy: "The 1st house",
    drive:
      "Perception, language, learning, exchange, and the movement of information between inner experience and the world around you.",
    traditional:
      "The most adaptable of the classical planets, traditional texts describe Mercury as taking on the nature of whatever it touches. Ruler of merchants, scribes, messengers, thieves, and all skill involving the hands or the tongue. It takes joy in the first house, closest to the self.",
    modern:
      "Modern astrology reads Mercury as cognitive style: how you process information, the shape of your intelligence, your learning preferences, and your characteristic way of explaining things.",
    mo: "Mercury helps me think about how someone takes in information, organizes it, and communicates it back. I may use it to adjust the way I explain something in a reading, but I treat the placement as a clue, not a script. The client's actual way of thinking tells me how that Mercury is being lived.",
    misconception:
      'That Mercury retrograde causes disasters. Retrograde motion is an optical effect, and astrologically it is commonly used as a review and revision period, not a guarantee of mishaps. See <a href="/explore/retrogrades/">retrogrades explained</a>.',
    inYourChart:
      "Mercury describes one part of your communication and learning style. Sign, house, aspects, speed, solar relationship, and lived experience all refine the picture.",
    whenItLeads:
      "Mercurial emphasis can make ideas, questions, words, connections, logistics, or analysis especially prominent. Whether that feels agile, scattered, careful, or inventive depends on the rest of the chart.",
    workingWithIt:
      "Pay attention to how your mind works best, not how you think it should work. Curiosity becomes more useful when it is paired with enough pause to notice what you are actually perceiving.",
  },
  {
    slug: "venus",
    name: "Venus",
    glyph: "♀",
    glyphMeaning:
      "The circle of spirit above the cross of matter: value given form.",
    cycle:
      "about 225 days around the Sun; roughly a year to cross the zodiac from Earth",
    retrograde: "About every 18 months, for roughly six weeks.",
    sect: "Nocturnal (night sect).",
    classification: "Personal planet · traditional benefic (lesser)",
    rules: "Taurus and Libra",
    exaltation: "Pisces (27°)",
    detriment: "Scorpio and Aries",
    fall: "Virgo",
    joy: "The 5th house",
    drive:
      "Attraction, value, pleasure, beauty, reciprocity, and the ways we recognize what is worth moving toward or preserving.",
    traditional:
      'The "lesser benefic": traditionally a planet of concord, pleasure, art, ornament, and agreement, and the natural significator of women, marriage, and music. Its joy is the fifth house of pleasure and children. A well-placed Venus was read as ease and social grace; a poorly-placed one as indulgence or discord.',
    modern:
      "Modern practice broadens Venus into the whole faculty of valuing: not just romance but self-worth, aesthetic identity, money as stored value, and the capacity to receive as well as give.",
    mo: "Venus is useful when I am listening for what someone values, enjoys, chooses, or finds worth preserving. Sometimes there is a real difference between what a person wants and what they have learned to want. The chart can help us notice that question; the person's life tells us the answer.",
    misconception:
      "That Venus is only about romance. Astrologically it also speaks to value, pleasure, attraction, aesthetics, exchange, and what we are willing to invest in.",
    inYourChart:
      "Venus's sign, house, aspects, and condition describe different dimensions of attraction, relating, taste, and value. No one factor tells the whole story.",
    whenItLeads:
      "Venusian emphasis can bring relationships, aesthetics, pleasure, diplomacy, exchange, or questions of value to the foreground. Ease is possible, but so are avoidance and over-accommodation.",
    workingWithIt:
      "Ask what you genuinely value and whether your choices reflect it. Venus becomes more interesting when preference is examined rather than assumed.",
  },
  {
    slug: "mars",
    name: "Mars",
    glyph: "♂",
    glyphMeaning: "The shield and spear: the arrow of directed force.",
    cycle: "about 687 days (roughly 2 years) through the zodiac",
    retrograde: "About every 2 years, for roughly two to three months.",
    sect: "Nocturnal (night sect): traditionally better behaved in a night chart.",
    classification: "Personal planet · traditional malefic (lesser)",
    rules: "Aries and Scorpio",
    exaltation: "Capricorn (28°)",
    detriment: "Libra and Taurus",
    fall: "Cancer",
    joy: "The 6th house",
    drive:
      "Action, desire, separation, courage, anger, competition, defense, and the capacity to direct force toward what matters.",
    traditional:
      'The "lesser malefic": hot, dry, and cutting. Traditional astrology assigned Mars to soldiers, surgeons, metalworkers, and anyone whose craft involves sharp instruments or fire, along with conflict, injury, and haste. Sect matters here: a night-chart Mars was considered notably less troublesome than a day-chart one.',
    modern:
      "Modern astrology rehabilitated Mars considerably, reading it as healthy assertion, libido, and the capacity to set boundaries, with anger as legitimate information rather than a fault.",
    mo: "Mars is one place I look when questions of action, frustration, courage, conflict, or self-assertion are alive. Some people express Mars easily; others have learned to suppress it. I do not assume which is true from the placement alone, because the same symbolism can be lived in many ways.",
    differs:
      "Traditional astrology treats Mars as a malefic whose difficulty is real and worth mitigating; modern astrology often treats it as a neutral or necessary function that becomes difficult through context or repression. Those are different interpretive starting points, and I consider both.",
    misconception:
      "That Mars means violence. It can describe conflict, but it also describes ordinary action, effort, courage, desire, separation, and defense.",
    inYourChart:
      "Mars describes how one part of you acts, pushes, competes, protects, or pursues. Sign, house, aspects, dignity, sect, and lived experience determine how that force is expressed.",
    whenItLeads:
      "Martian emphasis can bring initiative, urgency, courage, anger, decisiveness, or conflict to the foreground. The same force can be constructive or abrasive depending on how and where it is directed.",
    workingWithIt:
      "Notice where action is needed and where reaction is taking over. The goal is not to eliminate Mars, but to give its force something conscious to do.",
  },
  {
    slug: "jupiter",
    name: "Jupiter",
    glyph: "♃",
    glyphMeaning: "The crescent of soul rising above the cross of matter.",
    cycle: "about 11.86 years through the zodiac (roughly a year per sign)",
    retrograde: "Once a year, for about four months.",
    sect: "Diurnal (day sect): traditionally most benefic in a day chart.",
    classification: "Social planet · traditional benefic (greater)",
    rules: "Sagittarius and Pisces",
    exaltation: "Cancer (15°)",
    detriment: "Gemini and Virgo",
    fall: "Capricorn",
    joy: "The 11th house",
    drive:
      "Growth, meaning, confidence, generosity, belief, opportunity, and the impulse to widen the frame of what is possible.",
    traditional:
      'The "greater benefic": warm, moist, and expansive. Traditionally the significator of priests, judges, teachers, patrons, and good fortune generally: the planet of law, religion, and generosity. Its joy is the eleventh house of friends and good fortune.',
    modern:
      "Modern astrology reads Jupiter as the meaning-making function: the search for a worldview large enough to live inside, and the confidence that follows from having one.",
    mo: "Jupiter makes me curious about where someone is willing to grow, trust, explore, teach, or take a larger view. It can describe opportunity, but I do not reduce it to luck. Expansion can be welcome or excessive, and the surrounding chart tells us far more than the planet's reputation does.",
    misconception:
      "That Jupiter is uniformly good. Expansion can increase opportunity and confidence, but it can also enlarge appetite, excess, certainty, or overcommitment.",
    inYourChart:
      "Jupiter's sign, house, aspects, and condition describe where growth, meaning, generosity, confidence, or excess may become especially noticeable.",
    whenItLeads:
      "Jupiterian emphasis can widen perspective and encourage participation, hope, teaching, travel, or risk. Sometimes the challenge is not opening the door, but knowing when enough is enough.",
    workingWithIt:
      "Ask where a larger perspective would help and where enthusiasm may be outrunning discernment. Growth is most useful when it has somewhere meaningful to go.",
  },
  {
    slug: "saturn",
    name: "Saturn",
    glyph: "♄",
    glyphMeaning:
      "The cross of matter above the crescent of soul: form taking precedence.",
    cycle: "about 29.5 years through the zodiac (roughly 2.5 years per sign)",
    retrograde: "Once a year, for about four and a half months.",
    sect: "Diurnal (day sect): traditionally less harsh in a day chart.",
    classification: "Social planet · traditional malefic (greater)",
    rules: "Capricorn and Aquarius",
    exaltation: "Libra (21°)",
    detriment: "Cancer and Leo",
    fall: "Aries",
    joy: "The 12th house",
    drive:
      "Structure, limits, time, responsibility, durability, consequence, and the slow building of competence or authority.",
    traditional:
      'The "greater malefic": cold, dry, and slow. Traditionally the planet of old age, restriction, poverty, labour, and endings, but also of elders, discipline, and enduring structures. It takes joy in the twelfth house of hidden things and confinement.',
    modern:
      "Modern astrology recast Saturn as the maturation principle: the necessary encounter with limits that can produce competence, and the internalized authority a person builds over decades.",
    mo: "Saturn is one of the clearest places to see why context matters. It can describe pressure, fear, responsibility, discipline, delay, expertise, or some mixture of them. I want to know what the person has actually been asked to carry before I decide what Saturn means in that life.",
    differs:
      "Traditional practice names Saturn's difficulty plainly; much modern practice emphasizes growth and mastery. I find both useful when neither is allowed to erase the other.",
    misconception:
      'That a Saturn transit means disaster. It can coincide with weight, limits, responsibility, endings, consolidation, or formalization; the chart and circumstances determine which possibilities are relevant. See <a href="/explore/saturn-return/">the Saturn return</a>.',
    inYourChart:
      "Saturn's sign, house, aspects, sect, and condition describe where questions of limits, responsibility, fear, endurance, and competence may become especially important.",
    whenItLeads:
      "Saturnian emphasis can feel serious, demanding, stabilizing, clarifying, or restrictive. It often asks what can actually be sustained over time.",
    workingWithIt:
      "Look for the difference between a limit that protects something valuable and a limit that has simply become habitual. Saturn rewards realism, but realism is not the same as pessimism.",
  },
  {
    slug: "uranus",
    name: "Uranus",
    glyph: "♅",
    glyphMeaning:
      "A stylised H for Herschel, its discoverer, over the circle of spirit.",
    cycle: "about 84 years through the zodiac (roughly 7 years per sign)",
    retrograde: "Once a year, for about five months.",
    classification: "Outer / generational planet · discovered 1781",
    rules: "Aquarius (modern rulership; traditionally Saturn)",
    drive:
      "Change, awakening, disruption, invention, independence, and the impulse to break with patterns that have become too confining.",
    traditional:
      "Not used. Uranus was discovered in 1781, long after the traditional system was codified, so traditional and classical astrologers generally work without it: reading Aquarius through Saturn instead.",
    modern:
      "Modern astrology assigns Uranus to Aquarius and reads it as the principle of disruption and individuation: sudden changes in perspective, resistance to confinement, invention, and departures from established patterns.",
    mo: "Because Uranus spends years in a sign, the sign alone says relatively little about an individual. I become more interested in its house and especially its aspects to personal planets or angles. That is where a generational symbol begins to become personally specific.",
    differs:
      "Whether to use it at all. Traditional practitioners may exclude the modern planets; most contemporary astrologers include them. Those approaches are working with different technical toolkits.",
    misconception:
      "That Uranus in your sign says something highly specific about you personally. Many people of the same generation share that sign placement; house and aspects individualize it.",
    inYourChart:
      "Uranus can describe where change, difference, experimentation, disruption, or independence are especially active themes, but the rest of the chart tells us how those themes are lived.",
    whenItLeads:
      "Uranian emphasis can coincide with originality, sudden perspective shifts, experimentation, restlessness, or a strong need for greater freedom.",
    workingWithIt:
      "Ask what needs more room to evolve and what is merely rebelling against discomfort. Not every break is liberation, but some structures really have outlived their usefulness.",
  },
  {
    slug: "neptune",
    name: "Neptune",
    glyph: "♆",
    glyphMeaning: "Neptune's trident rising through the cross of matter.",
    cycle: "about 164.8 years through the zodiac (roughly 14 years per sign)",
    retrograde: "Once a year, for about five to six months.",
    classification: "Outer / generational planet · discovered 1846",
    rules: "Pisces (modern rulership; traditionally Jupiter)",
    drive:
      "Imagination, permeability, transcendence, idealization, compassion, spirituality, and the longing to move beyond ordinary boundaries.",
    traditional:
      "Not used, for the same reason as Uranus. Pisces is traditionally read through Jupiter rather than Neptune.",
    modern:
      "Modern astrology assigns Neptune to Pisces and reads it as dissolution of boundaries: inspiration, mysticism, art, empathy, and also illusion, escapism, and idealization that can outrun the facts.",
    mo: "Neptune makes me curious about where imagination, sensitivity, idealization, spirituality, artistry, or uncertainty are operating. I do not assume sensitivity is intuition or confusion is deception. The distinction usually becomes clearer only when chart symbolism is put beside the person's lived experience.",
    misconception:
      "That Neptune means you're psychic. It can symbolize permeability and sensitivity, but those qualities may be expressed as intuition, imagination, empathy, projection, artistry, confusion, or several at once.",
    inYourChart:
      "Neptune's house and aspects help locate where inspiration, longing, ambiguity, idealization, or permeability may be especially noticeable.",
    whenItLeads:
      "Neptunian emphasis can deepen imagination, compassion, spirituality, artistry, or idealism. It can also make clear distinctions harder to maintain.",
    workingWithIt:
      "Let imagination stay alive without asking it to replace evidence. Neptune can open beautiful possibilities; discernment helps you know which ones belong in waking life.",
  },
  {
    slug: "pluto",
    name: "Pluto",
    glyph: "♇",
    glyphMeaning: "A monogram of P and L, for Pluto and for Percival Lowell.",
    cycle:
      "about 248 years through the zodiac; its elliptical orbit means anywhere from about 12 to 31 years per sign",
    retrograde: "Once a year, for about five to six months.",
    classification:
      "Outer / generational body · discovered 1930; reclassified a dwarf planet in 2006",
    rules: "Scorpio (modern rulership; traditionally Mars)",
    drive:
      "Power, compulsion, survival, elimination, regeneration, and forms of change that feel deeper than ordinary adjustment.",
    traditional:
      "Not used. Traditional astrologers read Scorpio through Mars rather than Pluto, which produces a substantially different interpretive emphasis.",
    modern:
      "Modern astrology assigns Pluto to Scorpio and commonly reads it through themes of transformation, power, control, compulsion, depth, elimination, and regeneration.",
    mo: "Pluto is a good example of why I resist dramatic shortcuts. It can describe intense processes of change, control, loss, survival, power, or renewal, but I do not know which story is relevant until I see the house, aspects, timing, and the life in front of me. Its dwarf-planet classification does not determine whether an astrologer chooses to use it symbolically.",
    differs:
      "Its status and importance vary widely. Some astrologers exclude Pluto entirely; others give it major interpretive weight. That disagreement is part of contemporary astrology rather than a problem that has been settled.",
    misconception:
      "That Pluto's dwarf-planet classification settles its astrological relevance. Astronomical category and astrological technique are different questions.",
    inYourChart:
      "Pluto's house and aspects may show where themes of power, intensity, compulsion, elimination, survival, or regeneration become especially concentrated.",
    whenItLeads:
      "Plutonian emphasis can make questions of control, truth, loss, power, attachment, or deep change difficult to ignore. The expression can be inward, relational, circumstantial, or creative.",
    workingWithIt:
      "Notice what is asking to change at a deeper level and where control has become a substitute for trust. Transformation is a useful word only when we stay specific about what is actually changing.",
  },
];
