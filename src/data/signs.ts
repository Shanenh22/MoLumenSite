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
    glyphMeaning: "The ram's horns — the head lowered and driving forward.",
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
      "Opens spring in the northern hemisphere — the equinox point, 0° of the zodiac.",
    keywords: ["initiative", "courage", "directness"],
    style:
      "Aries expresses through beginnings. Whatever planet wears this sign acts first and refines later — direct, quick to commit, allergic to waiting for permission. It is the spark that gets things moving.",
    traditional:
      "As Mars's day-side home and the exaltation of the Sun, Aries was read as the sign of raw initiating force: hot, dry, and choleric. Saturn falls here — the planet of limits is at its least effective in the sign that refuses them — and Venus is in detriment, which older texts framed as difficulty with accommodation and compromise.",
    modern:
      'Twentieth-century astrology recast Aries as the archetype of individuation: the first assertion of "I am" before relationship, role, or social conditioning shapes it. The emphasis moved from martial force toward healthy self-assertion and the courage to exist as a separate person.',
    mo: "In readings I watch Aries placements for the gap between starting and finishing. The courage is genuine and worth honoring — most people can't begin things at all. The work is usually staying past the interesting part, and noticing that other people were also in the room while you were moving.",
    misconception:
      "That Aries means angry. Mars rulership gets flattened into temper, when what the sign actually describes is the capacity to act without prior permission — which is as often generosity, defense of someone vulnerable, or simply starting the thing nobody else would.",
    strengths:
      "Honest momentum. Aries placements cut through deliberation, defend what they love without hesitation, and bring real courage to fresh starts.",
    watchFor:
      "Speed can outrun follow-through, and directness can land as bluntness. The growth edge is finishing what the spark started — and noticing who else is in the room.",
    inRelationship:
      "Aries energy wants engagement, not management. It thrives with partners who can meet its candor and give it something worth pursuing.",
    atWork:
      "Best deployed at the front of things: launches, pitches, crises, turnarounds. Poorly deployed in long maintenance roles where nothing ever begins.",
  },
  {
    slug: "taurus",
    name: "Taurus",
    glyph: "♉",
    glyphMeaning:
      "The bull's head and horns — weight, patience, and rootedness.",
    dates: "about April 20 – May 20",
    element: "Earth",
    modality: "Fixed",
    polarity: "Receptive (nocturnal)",
    ruler: "Venus",
    exaltation: "the Moon (3° Taurus)",
    detriment: "Mars",
    opposite: "Scorpio",
    season: "Spring at full strength — the season's growth becoming substance.",
    keywords: ["steadiness", "embodiment", "value"],
    style:
      "Taurus expresses through stabilizing. Planets here move deliberately, build things meant to last, and trust what can be touched, tasted, and counted on. It is the gardener among the signs.",
    traditional:
      "Venus's night home and the Moon's exaltation — a doubly receptive, fertile sign associated with land, livestock, provisions, and everything that sustains a body. Mars is in detriment: the planet of swift cutting action is poorly suited to a sign whose whole method is not moving.",
    modern:
      "Modern astrology emphasizes Taurus as the seat of self-worth and embodiment — the felt sense of being enough, and of having a right to comfort and pleasure. The second-house link makes it the sign of what you value, not merely what you own.",
    mo: "Taurus placements often know exactly what they want and underestimate how rare that is. The question I return to with them is whether the thing they are holding onto still nourishes them, or whether it has simply become familiar. Those two feel identical from the inside.",
    misconception:
      "That Taurus is lazy. What looks like slowness is usually conservation — Taurus doesn't spend energy on anything it hasn't decided is worth it, and the same person will work without stopping once it is.",
    strengths:
      "Reliability, sensory intelligence, and the patience to let good things ripen. Taurus placements know what they value and hold it well.",
    watchFor:
      "Steadiness can harden into immovability. The growth edge is telling the difference between loyalty to what matters and comfort with what is merely familiar.",
    inRelationship:
      "Taurus energy offers constancy and asks for it in return. Affection is shown concretely — presence, provision, and touch more than declarations.",
    atWork:
      "Excellent at building and maintaining anything that compounds over time. Struggles where priorities change weekly or where results are never allowed to settle.",
  },
  {
    slug: "gemini",
    name: "Gemini",
    glyph: "♊",
    glyphMeaning:
      "The twins — two figures side by side, and the duality of any exchange.",
    dates: "about May 21 – June 20",
    element: "Air",
    modality: "Mutable",
    polarity: "Expressive (diurnal)",
    ruler: "Mercury",
    detriment: "Jupiter",
    opposite: "Sagittarius",
    season:
      "Spring dispersing into summer — the season distributing what it grew.",
    keywords: ["curiosity", "connection", "versatility"],
    style:
      "Gemini expresses through exchange. Planets here gather, compare, and circulate — questions, stories, contacts, ideas. It is the messenger, moving between worlds and translating as it goes.",
    traditional:
      "Mercury's day home, and traditionally the sign of the near world: siblings, neighbors, short journeys, letters, and commerce. Jupiter is in detriment here — the planet of the big picture is at a disadvantage in a sign that works by dividing things into pieces.",
    modern:
      "Modern practice foregrounds Gemini as the perceiving mind — how a person takes in and processes information, their learning style, and their relationship to language itself. The twins become a symbol of the mind observing itself.",
    mo: 'The Gemini gift I most often see undervalued is translation: the ability to explain one world to another. The cost is that a mind this quick can outrun feeling. When a Gemini placement tells me they are "fine, just busy," that is usually where we start.',
    differs:
      "Whether Gemini's famous changeability is a flaw or the point. Traditional texts treat mutability as instability; modern practice reads it as adaptive intelligence. Both are describing the same behavior with different values attached.",
    misconception:
      "That Gemini is two-faced. The duality is about holding two ideas at once, not about deceit — and the sign is often more transparent than most, because it says what it is thinking as it thinks it.",
    strengths:
      "Quick learning, verbal agility, and a gift for making unlikely connections between people and ideas.",
    watchFor:
      "Breadth can crowd out depth, and cleverness can dodge feeling. The growth edge is staying at the table when the conversation gets slow or serious.",
    inRelationship:
      "Gemini energy bonds through conversation. Interest is affection; a partner who keeps surprising its mind keeps its attention.",
    atWork:
      "Thrives in roles requiring communication, variety, and rapid learning. Wilts in repetitive work with no one to talk to.",
  },
  {
    slug: "cancer",
    name: "Cancer",
    glyph: "♋",
    glyphMeaning:
      "The crab's claws, or two curled forms — the shell and what it protects.",
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
      "Opens summer at the solstice — the year at its most fertile and most sheltered.",
    keywords: ["care", "memory", "belonging"],
    style:
      "Cancer expresses through protecting. Planets here feel first, remember everything, and build shells around what is tender — homes, families, traditions, people. It initiates through care.",
    traditional:
      "The Moon's only home and Jupiter's exaltation — a sign of nourishment, lineage, and increase. Saturn is in detriment and Mars falls here: both the cold restrictor and the hot aggressor are out of place in a sign whose method is holding and feeding.",
    modern:
      "Modern astrology reads Cancer through attachment and emotional security — the internalized experience of being cared for (or not), and how that shapes the ability to care for others without losing oneself.",
    mo: "Cancer placements almost always give more than they ask for, and then quietly keep score. The reading that helps is rarely about learning to care more; it is about learning to state a need out loud before resentment does it for them.",
    misconception:
      "That Cancer is fragile. The shell exists because the interior is soft, not because the person is weak — and a threatened Cancer placement is one of the most formidable things in the zodiac.",
    strengths:
      "Emotional intelligence, fierce loyalty, and the ability to make nearly any place feel like home.",
    watchFor:
      "Protection can become moating, and moods can steer the ship. The growth edge is letting people in before they have fully proven themselves safe.",
    inRelationship:
      "Cancer energy nurtures by instinct and needs its care received, not just tolerated. Security and consistency matter more than grand gestures.",
    atWork:
      "Strong where loyalty, institutional memory, and care for people are assets. Suffers in cultures that treat staff as interchangeable.",
  },
  {
    slug: "leo",
    name: "Leo",
    glyph: "♌",
    glyphMeaning: "The lion's mane and tail — a curve of radiating heat.",
    dates: "about July 23 – August 22",
    element: "Fire",
    modality: "Fixed",
    polarity: "Expressive (diurnal)",
    ruler: "the Sun",
    detriment: "Saturn",
    opposite: "Aquarius",
    season:
      "Summer at full height — maximum light, and the year at its most confident.",
    keywords: ["heart", "creativity", "dignity"],
    style:
      "Leo expresses through radiating. Planets here perform in the best sense — they bring warmth, color, and full-hearted commitment to whatever they touch, and they want that light witnessed.",
    traditional:
      "The Sun's only home, and the sign most associated with kingship, the heart, and vitality itself. Saturn is in detriment: the planet of scarcity and cold sits badly in the sign of generous heat. Traditional texts treat Leo's dignity seriously — as a duty of the powerful, not merely a taste for attention.",
    modern:
      "Modern astrology frames Leo as the creative self in search of authentic expression, and links it to the fifth house of play, romance, and children — anything you make that carries your signature.",
    mo: "Every Leo placement I have read wants to be seen, and almost none of them will say so directly, because the culture has taught them that wanting to be seen is a character flaw. It isn't. The honest version of that need is what makes a person generous — the distorted version is what makes them exhausting.",
    misconception:
      "That Leo is arrogant. The sign is far more often the one holding the room together and quietly checking whether everyone else feels included — its insecurity is usually invisible precisely because it performs well.",
    strengths:
      "Generosity, creative confidence, and natural leadership that lifts a room rather than dominating it — at its best.",
    watchFor:
      "The need to be seen can eclipse the willingness to see others. The growth edge is shining just as brightly when no one applauds.",
    inRelationship:
      "Leo energy loves loudly and loyally. Genuine appreciation is its oxygen; indifference wounds it more than conflict ever could.",
    atWork:
      "Excels where visible ownership and creative authorship are possible. Struggles in anonymous roles where good work disappears into a group.",
  },
  {
    slug: "virgo",
    name: "Virgo",
    glyph: "♍",
    glyphMeaning:
      "A maiden holding a sheaf of wheat — the harvest sorted and stored.",
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
      "Late summer — the harvest, and the sorting of what is worth keeping.",
    keywords: ["craft", "discernment", "service"],
    style:
      "Virgo expresses through refining. Planets here notice what others miss, improve what they touch, and serve quietly and concretely. It is the craftsman among the signs.",
    traditional:
      "Uniquely both Mercury's night home and Mercury's exaltation — the only sign where a planet holds both dignities, which traditional astrology read as analytical intelligence at maximum precision. Venus falls here and Jupiter is in detriment: neither indulgence nor expansiveness fares well in a sign built for discrimination.",
    modern:
      "Modern practice emphasizes Virgo as the integration of body, work, and daily habit — the sign of the practices that quietly determine a life, and of service as a form of love.",
    mo: "The Virgo placements I meet are almost never as critical of others as they are of themselves, and they are genuinely surprised to hear that. If I can get one thing across in a reading, it's that 'good and finished' is a legitimate standard, and that the inner critic is not the same thing as high standards.",
    misconception:
      "That Virgo is nitpicky or cold. The scrutiny is usually an act of care — the sign notices the detail because it is trying to make the thing actually work for the person using it.",
    strengths:
      "Precision, usefulness, and an ethic of care expressed through competence — the friend who shows up with the right tool.",
    watchFor:
      "Discernment can curdle into criticism, of others and especially of oneself. The growth edge is accepting 'good and finished' over 'perfect and imaginary.'",
    inRelationship:
      "Virgo energy loves through acts of service and attention to detail. It needs its efforts noticed — and needs to hear that it is enough as it is.",
    atWork:
      "Outstanding at craft, quality, systems, and anything requiring sustained attention to detail. Miserable under sloppy management.",
  },
  {
    slug: "libra",
    name: "Libra",
    glyph: "♎",
    glyphMeaning:
      "The scales, or the setting sun on the horizon — balance at the tipping point.",
    dates: "about September 23 – October 22",
    element: "Air",
    modality: "Cardinal",
    polarity: "Expressive (diurnal)",
    ruler: "Venus",
    exaltation: "Saturn (21° Libra)",
    detriment: "Mars",
    fall: "the Sun",
    opposite: "Aries",
    season: "Opens autumn at the equinox — day and night in exact balance.",
    keywords: ["balance", "fairness", "relationship"],
    style:
      "Libra expresses through relating. Planets here think in pairs and counterweights — weighing options, seeking fairness, making things (and moments) more beautiful and more just.",
    traditional:
      "Venus's day home and Saturn's exaltation, which is more interesting than it first appears: the sign of harmony is where the planet of structure and justice does its best work. Traditional astrology read Libra through law, contracts, and equity as much as through beauty. The Sun falls here — the solitary self is at a disadvantage in the sign of the other person.",
    modern:
      "Modern astrology treats Libra as the discovery of the self through relationship — the recognition that identity has an edge, and that the edge is where someone else begins.",
    mo: "Libra placements are frequently praised for being easy to get along with, which is often the problem. The most useful thing I can offer them is permission: a clear 'no' is not a failure of harmony, it is the thing that makes the harmony real rather than performed.",
    misconception:
      "That Libra is indecisive out of weakness. It is usually because the sign can genuinely see the merit of every option — a form of intelligence that becomes paralysis only when there's no deadline.",
    strengths:
      "Diplomacy, aesthetic intelligence, and a genuine gift for seeing the other side of any question.",
    watchFor:
      "Weighing can become wavering, and peacekeeping can bury real grievances. The growth edge is discovering that a clear 'no' is a form of fairness too.",
    inRelationship:
      "Libra energy is built for partnership and does its best thinking in dialogue. It needs harmony that is honest, not just quiet.",
    atWork:
      "Strong in negotiation, design, mediation, and client relationships. Struggles where it must impose decisions unilaterally and quickly.",
  },
  {
    slug: "scorpio",
    name: "Scorpio",
    glyph: "♏",
    glyphMeaning:
      "The scorpion's tail with its sting — the hidden thing that carries the power.",
    dates: "about October 23 – November 21",
    element: "Water",
    modality: "Fixed",
    polarity: "Receptive (nocturnal)",
    ruler: "Mars",
    modernRuler: "Pluto",
    detriment: "Venus",
    fall: "the Moon",
    opposite: "Taurus",
    season: "Autumn deepening — the season of decay that feeds the next cycle.",
    keywords: ["depth", "intensity", "transformation"],
    style:
      "Scorpio expresses through penetrating. Planets here go beneath the surface on principle — to the motive, the secret, the root. Nothing halfway: it merges, transforms, or walks away entirely.",
    traditional:
      "Mars's night home — and traditional astrology gave it no exaltation at all, which is telling. Associated with death, inheritance, surgery, and other people's resources. The Moon falls here: comfort and easy feeling do not thrive in a sign that insists on going all the way down.",
    modern:
      "After Pluto's 1930 discovery, modern astrology assigned it to Scorpio and reframed the sign around psychological transformation — the underworld journey, shadow material, and regeneration through crisis.",
    mo: "Scorpio placements can generally handle the truth better than almost anyone, which is why I don't soften things with them. What they often can't do is trust before testing, and the test is usually invisible to whoever is being tested.",
    differs:
      "Rulership. Traditional astrologers keep Mars as Scorpio's ruler and read the sign through Mars's condition; most modern astrologers use Pluto. This isn't cosmetic — the two produce noticeably different readings, and a good astrologer will tell you which they're using.",
    misconception:
      "That Scorpio is vengeful or dark. The sign is drawn to what is hidden because it distrusts surfaces, and its loyalty — once given — is the most durable in the zodiac.",
    strengths:
      "Emotional courage, ride-or-die loyalty, and the power to regenerate after losses that would flatten other signs.",
    watchFor:
      "Depth can become suspicion, and control can masquerade as protection. The growth edge is trusting without testing.",
    inRelationship:
      "Scorpio energy bonds completely or not at all. It offers rare intimacy and asks for honesty at the same depth.",
    atWork:
      "Formidable in research, crisis, investigation, therapy, finance — anywhere the real answer is buried. Poorly suited to superficial or performative environments.",
  },
  {
    slug: "sagittarius",
    name: "Sagittarius",
    glyph: "♐",
    glyphMeaning: "The centaur's arrow — aim released toward a distant target.",
    dates: "about November 22 – December 21",
    element: "Fire",
    modality: "Mutable",
    polarity: "Expressive (diurnal)",
    ruler: "Jupiter",
    detriment: "Mercury",
    opposite: "Gemini",
    season: "Late autumn — the year reaching past what it can see.",
    keywords: ["meaning", "freedom", "horizon"],
    style:
      "Sagittarius expresses through expanding. Planets here aim at the far horizon — travel, philosophy, faith, the big picture. It would rather be roughly right about something vast than precisely right about something small.",
    traditional:
      "Jupiter's day home, and the sign of long journeys, foreign lands, higher learning, law, and religion. Mercury is in detriment: the planet of fine distinctions is at a disadvantage in a sign that thinks in sweeping arcs.",
    modern:
      "Modern astrology frames Sagittarius as the search for meaning — the drive to assemble experience into a worldview, and the restlessness that follows when the worldview stops fitting.",
    mo: "Sagittarius placements are often the most honest people in the room and the least aware of how much that costs others. The growth is not becoming less truthful; it's noticing that timing and delivery are part of the truth.",
    misconception:
      "That Sagittarius is flaky or commitment-averse. The sign commits intensely — to ideas, causes, and journeys. What it resists is confinement without meaning, which isn't the same thing.",
    strengths:
      "Optimism with legs, honesty that clears the air, and a contagious sense that life is an adventure worth having.",
    watchFor:
      "The horizon can become an escape hatch, and candor can trample nuance. The growth edge is finding freedom inside commitments, not only beyond them.",
    inRelationship:
      "Sagittarius energy needs room to roam and a partner who feels like a fellow traveler, not a customs officer.",
    atWork:
      "Excellent in teaching, publishing, travel, law, and anything requiring vision and morale. Chafes under micromanagement and windowless routine.",
  },
  {
    slug: "capricorn",
    name: "Capricorn",
    glyph: "♑",
    glyphMeaning:
      "The sea-goat — a goat's body with a fish's tail, climbing from depth to summit.",
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
      "Opens winter at the solstice — the darkest point, and the turn back toward light.",
    keywords: ["mastery", "responsibility", "endurance"],
    style:
      "Capricorn expresses through building. Planets here take the long view, respect structure, and climb — patiently, strategically, and usually carrying more than their share.",
    traditional:
      "Saturn's night home and the exaltation of Mars — disciplined force, ambition with a strategy. Associated with rulers, elders, boundaries, and time itself. The Moon is in detriment and Jupiter falls here: neither soft comfort nor easy expansion belongs in the sign of earned results.",
    modern:
      "Modern astrology reads Capricorn through vocation and legitimate authority — the process of becoming someone whose competence is real rather than claimed, and the cost of that process.",
    mo: "Capricorn placements tend to arrive at a reading with a list of what they still have to do. What I usually end up pointing out is how much is already built, and how rarely they have stopped to look at it. Saturn does eventually hand something back — but only to people who notice.",
    misconception:
      "That Capricorn is cold or purely materialistic. The sign is frequently the one carrying the family, the team, or the institution — and its restraint is often protectiveness rather than indifference.",
    strengths:
      "Discipline, integrity under pressure, and the rare ability to turn ambition into durable achievement.",
    watchFor:
      "Duty can crowd out joy, and self-sufficiency can refuse help it genuinely needs. The growth edge is letting worth rest on more than output.",
    inRelationship:
      "Capricorn energy shows love through commitment and reliability. It softens slowly — and permanently — with those who prove patient.",
    atWork:
      "Built for long-horizon responsibility, leadership, and anything requiring endurance. At risk of overwork and of mistaking exhaustion for virtue.",
  },
  {
    slug: "aquarius",
    name: "Aquarius",
    glyph: "♒",
    glyphMeaning:
      "Two waves — the water-bearer pouring out, often read as waves of air or current.",
    dates: "about January 20 – February 18",
    element: "Air",
    modality: "Fixed",
    polarity: "Expressive (diurnal)",
    ruler: "Saturn",
    modernRuler: "Uranus",
    detriment: "the Sun",
    opposite: "Leo",
    season:
      "Deep winter — the season of structure, and of the ideas that outlast it.",
    keywords: ["perspective", "independence", "community"],
    style:
      "Aquarius expresses through reimagining. Planets here step outside the frame — questioning defaults, siding with the future, and caring for people in principled, sometimes unconventional ways.",
    traditional:
      "Saturn's day home — which reframes the sign considerably. Traditional Aquarius is not chaotic but structural: the architecture of society, laws, and the groups people organize into. The Sun is in detriment here, which older texts read as difficulty with purely personal authority.",
    modern:
      "With Uranus assigned to it after 1781, modern astrology recast Aquarius as the disruptor and futurist — the sign of sudden insight, rebellion, and progressive social vision.",
    mo: "The Saturn-ruled Aquarius is the one most people never meet, and it explains the placements that puzzle them: the friend who is radical in principle and completely immovable in practice. Fixed air is still fixed. These are some of the most stubborn people I read.",
    differs:
      "Rulership again. Traditional practice reads Aquarius through Saturn — structure, society, endurance. Modern practice reads it through Uranus — disruption, genius, sudden change. The two portraits barely resemble each other, and I usually look at both.",
    misconception:
      "That Aquarius is emotionally detached. The distance is usually a working method — the sign steps back in order to see the whole system — and it often masks strong feeling about people in the aggregate.",
    strengths:
      "Original thinking, humanitarian instinct, and steadiness in its convictions even when they cost social comfort.",
    watchFor:
      "Perspective can become distance, and principle can outrank person. The growth edge is letting the heart be as engaged as the ideals.",
    inRelationship:
      "Aquarius energy needs friendship at the core of love, and space that is granted rather than negotiated.",
    atWork:
      "Strong in systems thinking, technology, research, and mission-driven organizations. Resists hierarchy for its own sake.",
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
      "Winter dissolving into spring — the last sign, where the year lets go.",
    keywords: ["compassion", "imagination", "surrender"],
    style:
      "Pisces expresses through dissolving. Planets here feel the whole room, blur the boundary between self and other, and reach for what is beyond the visible — art, spirit, dream, mercy.",
    traditional:
      "Jupiter's night home and the exaltation of Venus — a sign of mercy, faith, and abundance of feeling. Mercury is uniquely both in detriment and in fall here, which traditional astrology read as the limits of analysis: some things cannot be reasoned, only felt.",
    modern:
      "Modern astrology, assigning Neptune to Pisces, emphasizes transcendence, collective unconscious, and the dissolution of ego boundaries — along with the escapism that shadows all of it.",
    mo: "Pisces placements feel more than they let on and frequently carry things that were never theirs. Boundaries are the entire curriculum — not to feel less, but so that the compassion has somewhere to stand. A Pisces with boundaries is extraordinary; one without them is exhausted.",
    differs:
      "Traditional astrologers read Pisces through Jupiter — faith, mercy, and increase. Modern astrologers read it through Neptune — dissolution, glamour, and the ineffable. Jupiter's version is noticeably more grounded, and worth asking for.",
    misconception:
      "That Pisces is weak or passive. Mutable water adapts rather than resists, which looks like yielding — but water is what wears down stone, and Pisces placements outlast opposition more often than they defeat it.",
    strengths:
      "Deep compassion, creative imagination, and an intuitive read on people and currents that logic cannot match.",
    watchFor:
      "Boundarylessness can mean absorbing what was never yours to carry. The growth edge is compassion that includes yourself — and a working pair of boundaries.",
    inRelationship:
      "Pisces energy loves empathically and needs gentleness in return. Clear agreements protect its tender, generous heart.",
    atWork:
      "Gifted in creative, healing, and caring work, and anywhere intuition about people matters. Needs structure supplied by the role, since it rarely supplies its own.",
  },
];
