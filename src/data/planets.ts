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
      "The drive to be someone: identity, vitality, and purpose. The Sun is the centre you organize around: what you are here to become, not just what you already are.",
    traditional:
      "Traditional astrology treats the Sun as the chart's source of life and dignity: the \"greater light,\" associated with rulers, fathers, honour, and the vital spirit itself. Its condition was read as a measure of a person's standing and vitality. It takes joy in the ninth house, the house of God, travel, and higher knowledge.",
    modern:
      "Modern psychological astrology reframed the Sun as the emerging self, the conscious ego and the direction of individuation. Where tradition asked whether the Sun was well-placed, modern practice asks whether the person is living their Sun consciously.",
    mo: "The Sun is the placement people most often haven't claimed yet. It describes what you're becoming, so it can feel like a costume that doesn't fit until you've grown into it. When someone tells me their sun sign 'doesn't sound like them,' they're frequently in their twenties and describing a life they haven't chosen yet.",
    misconception:
      "That your Sun sign is your personality. It is one factor among ten planets across twelve houses, and it describes a direction of growth rather than a fixed set of traits.",
    inYourChart:
      "Your Sun's sign shows the style of your becoming; its house shows the arena where you most need to shine. It is the part of you that grows by being expressed.",
    whenItLeads:
      "Life feels purposeful and lit from within. Overdone, it can crowd the stage, every conversation somehow returning to you.",
    workingWithIt:
      "Ask where you are still waiting for permission to take up your own life. The Sun strengthens with use: create, decide, claim.",
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
      "The drive to feel safe and cared for: instinct, habit, memory, and need. The Moon is how you refuel and what you reach for without thinking.",
    traditional:
      'The "lesser light," and the fastest-moving body: traditional astrology used the Moon as the chart\'s carrier of matter, the body, mothers, the common people, and the flow of daily life. In horary practice the Moon is decisive, its next aspect often tells the story of how a question resolves.',
    modern:
      "Modern astrology emphasizes the Moon as the emotional and attachment system, the inherited patterns of care, the felt sense of security, and the unconscious habits formed before conscious memory.",
    mo: "The Moon is where people actually live, and it's usually the placement that explains the gap between how someone appears and how they feel. It is also the most tender thing in a chart. I take care with it, and I recommend you do too.",
    misconception:
      'That the Moon only matters for "moods." It governs need, and unmet needs quietly drive more decisions than any conscious plan does.',
    inYourChart:
      "Your Moon describes your emotional weather, what home means to you, and how you were shaped by early care. It moves fastest of all, which is why moods move faster than plans.",
    whenItLeads:
      "You are responsive, intuitive, and genuinely nourishing to others. Overdone, old feelings drive present choices.",
    workingWithIt:
      "Learn your own needs well enough to name them. A tended Moon steadies everything else in the chart.",
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
      "The drive to perceive and connect: thinking, speaking, learning, trading, translating. Mercury is the messenger running between your inner world and everyone else.",
    traditional:
      "The most adaptable of the classical planets, traditional texts describe Mercury as taking on the nature of whatever it touches. Ruler of merchants, scribes, messengers, thieves, and all skill involving the hands or the tongue. It takes joy in the first house, closest to the self.",
    modern:
      "Modern astrology reads Mercury as cognitive style: how you process information, the shape of your intelligence, your learning preferences, and your characteristic way of explaining things.",
    mo: "Mercury tells me how to talk to someone, which is why I look at it early. A Mercury in Virgo wants the mechanism; a Mercury in Pisces wants the image. Same information, two completely different readings, and getting that wrong wastes half the session.",
    misconception:
      'That Mercury retrograde causes disasters. Retrograde motion is an optical effect, and the traditional reading is review and revision, not sabotage. See <a href="/explore/retrogrades/">retrogrades explained</a>.',
    inYourChart:
      "Mercury shows how you take in information and how you give it back: your learning style, your humor, the way you argue and the way you listen.",
    whenItLeads:
      "Ideas move, conversations spark, details get handled. Overdone, words substitute for action and cleverness for truth.",
    workingWithIt:
      "Notice whether your mind is currently a tool or a tyrant. Mercury serves best when curiosity outranks certainty.",
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
      "The drive to value and to love: attraction, pleasure, beauty, and the art of relating. Venus is what you find lovely and how you draw it toward you.",
    traditional:
      'The "lesser benefic": traditionally a planet of concord, pleasure, art, ornament, and agreement, and the natural significator of women, marriage, and music. Its joy is the fifth house of pleasure and children. A well-placed Venus was read as ease and social grace; a poorly-placed one as indulgence or discord.',
    modern:
      "Modern practice broadens Venus into the whole faculty of valuing: not just romance but self-worth, aesthetic identity, money as stored value, and the capacity to receive as well as give.",
    mo: "Venus is where I look when someone can't tell the difference between what they want and what they were trained to want. The sign describes the taste; the house describes where they go looking for it, and the aspects describe what usually gets in the way.",
    misconception:
      "That Venus is only about romance. It governs value in every sense, including what you are willing to pay for, tolerate, and call beautiful.",
    inYourChart:
      "Venus describes your taste, your way of showing affection, and what you need in order to feel that something, or someone, is worth wanting.",
    whenItLeads:
      "Life has sweetness, connection, and grace. Overdone, harmony is purchased at the price of honesty.",
    workingWithIt:
      "Ask what you actually value versus what you were taught to want. Venus matures every time you choose the real over the pleasing.",
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
      "The drive to act and to defend: desire, courage, anger, and will. Mars is how you go after what you want and how you fight when something matters.",
    traditional:
      'The "lesser malefic": hot, dry, and cutting. Traditional astrology assigned Mars to soldiers, surgeons, metalworkers, and anyone whose craft involves sharp instruments or fire, along with conflict, injury, and haste. Sect matters here: a night-chart Mars was considered notably less troublesome than a day-chart one.',
    modern:
      "Modern astrology rehabilitated Mars considerably, reading it as healthy assertion, libido, and the capacity to set boundaries, with anger as legitimate information rather than a fault.",
    mo: "Mars is the placement most people have been taught to apologize for, especially women. In a reading I'm usually not trying to calm someone's Mars down. I'm trying to find out where it got sent underground, because that's where the exhaustion is coming from.",
    differs:
      "Traditional astrology treats Mars as a malefic whose difficulty is real and worth mitigating; modern astrology often treats it as neutral energy that is only problematic when repressed. Both readings are useful, and they suggest different advice.",
    misconception:
      "That Mars means violence. It describes the capacity to act on desire and defend a boundary: the same faculty that gets you out of bed and out of a bad situation.",
    inYourChart:
      "Mars shows your engine: how you start, how you compete, what ignites your temper, and where you are willing to be brave.",
    whenItLeads:
      "Things get done and boundaries get honored. Overdone, everything becomes a contest and every no a provocation.",
    workingWithIt:
      "Anger is information about a boundary. Mars works cleanest when the fight is chosen, not reflexive.",
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
      "The drive to grow and to mean something: faith, generosity, opportunity, and the big picture. Jupiter is where life tends to say yes to you, and where you say yes to life.",
    traditional:
      'The "greater benefic": warm, moist, and expansive. Traditionally the significator of priests, judges, teachers, patrons, and good fortune generally: the planet of law, religion, and generosity. Its joy is the eleventh house of friends and good fortune.',
    modern:
      "Modern astrology reads Jupiter as the meaning-making function: the search for a worldview large enough to live inside, and the confidence that follows from having one.",
    mo: "Jupiter shows where you're lucky, and people usually take that the wrong way. It's not that things fall into your lap there. It's that you're willing to try there, and willingness is most of what luck turns out to be. Jupiter rewards participation.",
    misconception:
      "That Jupiter is uniformly good. Expansion is neutral: it enlarges whatever it touches, including debt, appetite, self-regard, and overcommitment.",
    inYourChart:
      "Jupiter shows where doors open more easily, where your confidence is natural, and what kind of wisdom you are here to gather and give.",
    whenItLeads:
      "Optimism, luck you helped make, and genuine broad-mindedness. Overdone, more is never enough and promises outrun delivery.",
    workingWithIt:
      "Jupiter rewards participation. Its gifts arrive faster when you're already moving in the direction of your growth.",
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
      "The drive to structure and to master: limits, time, responsibility, and earned authority. Saturn is the teacher whose tests are inconvenient and whose diplomas are real.",
    traditional:
      'The "greater malefic": cold, dry, and slow. Traditionally the planet of old age, restriction, poverty, labour, and endings, but also of elders, discipline, and enduring structures. It takes joy in the twelfth house of hidden things and confinement.',
    modern:
      "Modern astrology recast Saturn as the maturation principle: the necessary encounter with limits that produces competence, and the internalized authority a person builds over decades.",
    mo: "Saturn is the placement that improves most with age, and almost nobody believes me when I say that in their twenties. The house it occupies is where you'll do the slow, unglamorous work, and it's also where you'll eventually have something real to show for it.",
    differs:
      "Whether Saturn should be softened. Traditional practice names its difficulty plainly; much modern practice reframes it as growth. I use both: naming the difficulty honestly, then talking about what it builds.",
    misconception:
      'That a Saturn transit means disaster. It marks seasons of weight and consequence, during which sound structures usually get formalized and unsound ones show their cracks. See <a href="/explore/saturn-return/">the Saturn return</a>.',
    inYourChart:
      "Saturn shows where life asks more of you, where fear and mastery live side by side, and what you can build that lasts. The Saturn return around ages 29 and 58 marks its full cycle.",
    whenItLeads:
      "Integrity, competence, durability. Overdone, caution calcifies and the inner critic runs the household.",
    workingWithIt:
      "Do the thing Saturn's house keeps asking of you, in small consistent payments. Dread converts to authority with remarkable reliability.",
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
      "The drive to awaken and to free: sudden insight, rebellion, invention, and authentic difference. Uranus breaks patterns that have quietly become cages.",
    traditional:
      "Not used. Uranus was discovered in 1781, long after the traditional system was codified, so traditional and classical astrologers generally work without it: reading Aquarius through Saturn instead.",
    modern:
      "Modern astrology assigns Uranus to Aquarius and reads it as the principle of disruption and individuation: the lightning that reveals what the structure was hiding, and the drive toward authenticity even at social cost.",
    mo: "Because Uranus stays seven years in a sign, its sign is generational, everyone your age shares it. What's personal is the house, and the aspects it makes to your inner planets. That's where the lightning actually lands.",
    differs:
      "Whether to use it at all. Traditional practitioners often exclude the modern planets entirely; most contemporary astrologers include them. Neither is wrong, and the two approaches produce different charts.",
    misconception:
      "That Uranus in your sign says something specific about you personally. Generational placements describe a cohort; the house and aspects make them individual.",
    inYourChart:
      "Uranus shows where you are wired differently, where you resist standardization, and where life delivers its lightning-bolt course corrections.",
    whenItLeads:
      "Originality and liberation. Overdone, disruption for its own sake: freedom from everything, for nothing.",
    workingWithIt:
      "Change chosen consciously tends to be gentler than change Uranus has to arrange for you. Where are you overdue to be more honestly yourself?",
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
      "The drive to transcend and to merge: imagination, compassion, spirituality, and the longing for something more than the visible world.",
    traditional:
      "Not used, for the same reason as Uranus. Pisces is read through Jupiter, which produces a noticeably more grounded and moral portrait of the sign than the Neptunian one.",
    modern:
      "Modern astrology assigns Neptune to Pisces and reads it as dissolution of boundaries: inspiration, mysticism, art, empathy, and equally illusion, escapism, and idealization that outruns the facts.",
    mo: "Neptune is where the fog is, and fog isn't always a problem. It's also where the art and the mercy come from. What I watch for is whether someone is using Neptune's house to create something or to avoid something. The feeling is nearly identical from inside.",
    misconception:
      "That Neptune means you're psychic. It describes permeability, to atmosphere, to other people's feelings, to imagery, which can be intuition or can simply be absorbing whatever is in the room.",
    inYourChart:
      "Neptune shows where you idealize, where you access genuine inspiration, and where fog and glamour can obscure plain facts.",
    whenItLeads:
      "Art, empathy, and spiritual depth. Overdone, escapism, confusion, and disappointment in people who were never who you imagined.",
    workingWithIt:
      "Keep one foot on the dock. Neptune blesses creativity and compassion; it complicates contracts, rescues, and anything requiring fine print.",
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
      "The drive to transform: power, death-and-rebirth cycles, the buried truth, and the will to survive changed rather than unchanged.",
    traditional:
      "Not used. Traditional astrologers read Scorpio through Mars, and the difference is substantial: Mars gives a sign of directed force and courage, where Pluto gives one of compulsion and depth psychology.",
    modern:
      "Modern astrology assigns Pluto to Scorpio and reads it as the evolutionary principle. What must die for something truer to live, along with the shadow themes of power, control, and obsession.",
    mo: "Pluto's house is where you'll be composted at some point, and where you'll also find power you didn't know you had. The 2006 reclassification changed nothing astrologically, incidentally. Astrology has always worked with symbolic significance rather than astronomical category.",
    differs:
      "Its status. Some traditional astrologers exclude Pluto entirely; evolutionary astrologers place it at the very centre of the chart. That is one of the widest disagreements in contemporary practice.",
    misconception:
      "That Pluto being demoted to dwarf-planet status matters astrologically. Astrological significance was never based on the IAU's size criteria: Chiron and several asteroids are widely used, and the Moon isn't a planet at all.",
    inYourChart:
      "Pluto shows where life composts you: the arena of deepest intensity, where control is tempting, and where your most genuine power is excavated.",
    whenItLeads:
      "Regeneration and depth psychology in action. Overdone, obsession, power struggles, and scorched earth.",
    workingWithIt:
      "What Pluto touches must molt. Cooperating with the molting, grieving, releasing, renaming, beats being dragged through it.",
  },
];
