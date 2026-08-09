/**
 * The 12 houses — areas of experience.
 *
 * Angularity, natural rulers, traditional Latin names, and planetary joys
 * follow standard Western and Hellenistic convention. Interpretive fields are
 * labeled by kind: `traditional`, `modern`, `mo`.
 */
export interface House {
  slug: string;
  number: number;
  name: string;
  traditionalName: string;
  latin: string;
  angularity: "Angular" | "Succedent" | "Cadent";
  naturalSign: string;
  naturalRuler: string;
  opposite: string;
  joy?: string;
  arena: string;
  covers: string[];
  traditional: string;
  modern: string;
  mo: string;
  planetsHere: string;
}

export const houses: House[] = [
  {
    slug: "first-house",
    number: 1,
    name: "First House",
    traditionalName: "the Ascendant / house of self",
    latin: "Vita: life",
    angularity: "Angular",
    naturalSign: "Aries",
    naturalRuler: "Mars",
    opposite: "Seventh House",
    joy: "Mercury",
    arena:
      "You, arriving. The first house is your threshold: appearance, temperament, the instinctive way you meet life before any strategy kicks in. Its cusp is the Ascendant, or rising sign, one of the most personal points in any chart.",
    covers: [
      "identity and self-presentation",
      "physical body and vitality",
      "first impressions",
      "how you begin things",
    ],
    traditional:
      "The house of life itself. Traditional astrology read the first house and its ruler as the primary indicator of vitality, constitution, and the native's general condition, the starting point of any chart judgment. Mercury takes joy here.",
    modern:
      "Modern practice emphasizes the first house as persona and self-image: the interface between the inner person and the social world, and the qualities a person unconsciously leads with.",
    mo: "I read the first house as the doorway. It's not a mask, people often assume the rising sign is fake, and it isn't, but it is the part of you that arrives first, and it shapes what everyone else responds to before they know anything else.",
    planetsHere:
      "Planets in the first house sit in the front window of your life: whatever they represent, people meet it early and often.",
  },
  {
    slug: "second-house",
    number: 2,
    name: "Second House",
    traditionalName: "the house of possessions",
    latin: "Lucrum: wealth",
    angularity: "Succedent",
    naturalSign: "Taurus",
    naturalRuler: "Venus",
    opposite: "Eighth House",
    arena:
      "What you have and what you are worth, to yourself first. The second house governs money, belongings, and resources, and beneath them the deeper question of self-worth and what you consider truly valuable.",
    covers: [
      "income and personal money",
      "possessions and material security",
      "values",
      "self-esteem and talents you can live from",
    ],
    traditional:
      "Traditionally the house of substance: movable goods, income, and, in some texts, supporters and helpers. Judged for the native's material sufficiency rather than their psychology.",
    modern:
      "Modern astrology expanded it into self-worth and the internal sense of having enough, treating money as the outer measure of an inner valuation.",
    mo: "The second house is where I find out whether someone believes they are allowed to be resourced. Two people with identical incomes can have completely different second-house experiences, and the difference is almost never about the money.",
    planetsHere:
      "Planets here shape how you earn, spend, keep, and value, and how tightly your security is tied to what you own.",
  },
  {
    slug: "third-house",
    number: 3,
    name: "Third House",
    traditionalName: "the house of communication",
    latin: "Fratres: brothers",
    angularity: "Cadent",
    naturalSign: "Gemini",
    naturalRuler: "Mercury",
    opposite: "Ninth House",
    joy: "the Moon",
    arena:
      "The neighbourhood of the mind. The third house governs everyday thinking and talking: learning, errands, siblings, neighbours, the familiar routes you travel and the constant hum of information along them.",
    covers: [
      "communication and writing",
      "early education and learning style",
      "siblings and neighbours",
      "short trips and daily movement",
    ],
    traditional:
      "The house of brothers, short journeys, and, notably, the goddess: traditional texts associate it with rituals, omens, and the local sacred. The Moon takes joy here, which fits a house of daily rounds and familiar ground.",
    modern:
      "Modern practice reads it as the concrete mind and immediate environment: how you gather and exchange information, and the mental habits formed in early schooling.",
    mo: "The third house is deceptively important. It describes the texture of an ordinary day, the commute, the group chat, the sibling you talk to weekly, and ordinary days are what a life is mostly made of.",
    planetsHere:
      "Planets here colour your voice and your curiosity: how you gather information and how it sounds when you pass it on.",
  },
  {
    slug: "fourth-house",
    number: 4,
    name: "Fourth House",
    traditionalName: "the IC / house of home and family",
    latin: "Genitor: parent",
    angularity: "Angular",
    naturalSign: "Cancer",
    naturalRuler: "the Moon",
    opposite: "Tenth House",
    arena:
      "The root system. The fourth house is home in every sense: the household you came from, the one you build, ancestry, land, and the private self that exists when the door is closed.",
    covers: [
      "home and household",
      "family of origin and lineage",
      "one parent (traditions differ on which)",
      "endings and foundations",
    ],
    traditional:
      "The house of the father, the land, and, importantly, of endings: traditional astrology read the fourth as the conclusion of the matter, the grave, and what remains after. Its cusp, the Imum Coeli, is the lowest point of the chart.",
    modern:
      "Modern practice emphasizes psychological foundations: the emotional inheritance of the family of origin, and the private self beneath the public one.",
    mo: "The fourth house is where I look when someone's outward life is working and they still feel unmoored. It is the floor. If the floor was uneven, everything built on it compensates, and that compensation is usually invisible until someone names it.",
    planetsHere:
      'Planets here work underground, shaping your sense of belonging and what "home" must include for you to rest.',
  },
  {
    slug: "fifth-house",
    number: 5,
    name: "Fifth House",
    traditionalName: "the house of pleasure and creativity",
    latin: "Nati: children",
    angularity: "Succedent",
    naturalSign: "Leo",
    naturalRuler: "the Sun",
    opposite: "Eleventh House",
    joy: "Venus",
    arena:
      "The stage and the playground. The fifth house governs what you create and what delights you: art, romance, children, games, and every act where you put something of yourself into the world for the joy of it.",
    covers: [
      "creativity and self-expression",
      "romance and courtship",
      "children",
      "play, pleasure, and risk taken for joy",
    ],
    traditional:
      "The house of good fortune, children, banquets, and pleasure. Venus takes joy here. Traditional texts read it for offspring and for enjoyment generally, treating delight as a legitimate subject of astrological inquiry.",
    modern:
      "Modern astrology broadened it into creative self-expression of every kind: anything you make that carries your signature, whether or not anyone else ever sees it.",
    mo: "Adults routinely tell me they have no fifth house life, and then describe three things they make that they don't count because nobody pays them for it. Play is not optional equipment. It's where the Sun in a chart actually gets used.",
    planetsHere:
      "Planets here want an outlet. They describe your creative signature and what makes you feel most alive.",
  },
  {
    slug: "sixth-house",
    number: 6,
    name: "Sixth House",
    traditionalName: "the house of work and health",
    latin: "Valetudo: health",
    angularity: "Cadent",
    naturalSign: "Virgo",
    naturalRuler: "Mercury",
    opposite: "Twelfth House",
    joy: "Mars",
    arena:
      "The workshop of daily life. The sixth house governs routines, work in the sense of craft and duty, health habits, and service: the unglamorous hours that quietly determine nearly everything.",
    covers: [
      "daily work and routines",
      "health and habits",
      "service and skill-building",
      "colleagues, employees, and animals in your care",
    ],
    traditional:
      'One of the traditionally "difficult" houses: illness, servitude, and toil, with Mars taking joy here. Traditional astrology read it for sickness and for subordinates, the labour that keeps a household running.',
    modern:
      "Modern practice reframed it more constructively as craft, wellness, and the integration of body and routine, the sign that daily practice is where change actually happens.",
    mo: "The sixth house is where good intentions meet Tuesday. I find more useful information here than in almost any other house, because what a person does repeatedly matters far more than what they intend.",
    planetsHere:
      "Planets here express through practice and maintenance: they show how you work, and how your body keeps the score of it.",
  },
  {
    slug: "seventh-house",
    number: 7,
    name: "Seventh House",
    traditionalName: "the Descendant / house of partnership",
    latin: "Uxor: spouse",
    angularity: "Angular",
    naturalSign: "Libra",
    naturalRuler: "Venus",
    opposite: "First House",
    arena:
      'The other chair. The seventh house governs committed one-to-one relationships: spouses, business partners, close collaborators, and open adversaries. It is where "I" learns to be half of "we."',
    covers: [
      "marriage and committed partnership",
      "business partnership and contracts",
      "open enemies and negotiation",
      "what you seek (and project) in others",
    ],
    traditional:
      "The house of marriage, partners, and open enemies, traditional astrology grouped allies and adversaries together, on the logic that both are people who meet you face to face. Also the house of the astrologer, in a horary chart.",
    modern:
      "Modern practice adds projection: the seventh house describes qualities a person disowns in themselves and then reliably encounters in partners.",
    mo: "The seventh house tends to arrive as other people. What you keep meeting there is usually something of yours that hasn't been claimed yet, which is uncomfortable to hear and remarkably useful once it lands.",
    planetsHere:
      "Planets here tend to be met in other people first: qualities you attract, marry, hire, or contend with until you recognise them as your own.",
  },
  {
    slug: "eighth-house",
    number: 8,
    name: "Eighth House",
    traditionalName: "the house of shared resources and transformation",
    latin: "Mors: death",
    angularity: "Succedent",
    naturalSign: "Scorpio",
    naturalRuler: "Mars (traditional), Pluto (modern)",
    opposite: "Second House",
    arena:
      "Where lives intertwine past the point of easy exit. The eighth house governs shared money and deep bonds, inheritance, debt, taxes, intimacy, and the transformations that mergers and losses force.",
    covers: [
      "other people's money: inheritance, loans, taxes, joint finances",
      "deep intimacy and trust",
      "crisis, loss, and regeneration",
      "the psyche beneath the surface",
    ],
    traditional:
      "The house of death, inheritance, and the partner's substance, one of the traditionally difficult houses, and the source of its modern reputation. Traditional practice read it for legacies, debts, and mortality quite literally.",
    modern:
      "Modern astrology psychologized it into transformation, intimacy, and shadow work, death as metaphor for the endings that precede change.",
    mo: "I hold the eighth house carefully. It's genuinely the house of the things people don't discuss at dinner: money owed, bodies, grief, sex, power. Naming what lives there is often the most useful hour of a reading.",
    planetsHere:
      "Planets here work at depth: they describe how you merge, what you fear losing, and how you come back from endings.",
  },
  {
    slug: "ninth-house",
    number: 9,
    name: "Ninth House",
    traditionalName: "the house of the higher mind",
    latin: "Iter: journey",
    angularity: "Cadent",
    naturalSign: "Sagittarius",
    naturalRuler: "Jupiter",
    opposite: "Third House",
    joy: "the Sun",
    arena:
      "The far horizon. The ninth house governs everything that stretches your world, long journeys, higher education, philosophy, religion, law, publishing, the search for meaning beyond the familiar.",
    covers: [
      "travel and foreign cultures",
      "higher education and philosophy",
      "belief, faith, and law",
      "publishing and teaching at scale",
    ],
    traditional:
      "The house of God, long journeys, prophecy, and dreams. The Sun takes joy here. Traditional astrology treated it as the place of divination and religious life as much as of travel.",
    modern:
      "Modern practice reads it as the search for meaning and the construction of a worldview, belief as an organizing structure rather than a doctrine.",
    mo: "The ninth house is where a person goes looking for a bigger frame. For some that is literal travel; for others it is study, or faith, or a stubborn insistence on asking why. All three are the same instinct.",
    planetsHere:
      "Planets here hunger for the bigger picture: they describe your relationship with belief and the adventures that educate you.",
  },
  {
    slug: "tenth-house",
    number: 10,
    name: "Tenth House",
    traditionalName: "the Midheaven / house of vocation",
    latin: "Regnum: kingdom",
    angularity: "Angular",
    naturalSign: "Capricorn",
    naturalRuler: "Saturn",
    opposite: "Fourth House",
    arena:
      "The mountaintop. The tenth house governs your public life, career, reputation, achievement, authority, and the vocation you climb toward across decades. Its cusp is the Midheaven (MC).",
    covers: [
      "career and vocation",
      "public reputation and visibility",
      "authority and achievement",
      "one parent (traditions differ on which)",
    ],
    traditional:
      "The house of kingdom, rank, and the mother in many texts: traditionally the most elevated point of the chart and a primary indicator of worldly standing and profession.",
    modern:
      "Modern astrology reads it as vocation in the deeper sense: not merely a job but the contribution a person is recognized for, and the relationship they have with their own authority.",
    mo: "The tenth house is what you're visible for, which is not always what you're best at. Part of a good vocational reading is separating those two, because building a career on the wrong one is a slow, expensive mistake.",
    planetsHere:
      "Planets here are visible from a distance. They shape what you are known for and how you handle responsibility in public.",
  },
  {
    slug: "eleventh-house",
    number: 11,
    name: "Eleventh House",
    traditionalName: "the house of community and hopes",
    latin: "Benefacta: good fortune",
    angularity: "Succedent",
    naturalSign: "Aquarius",
    naturalRuler: "Saturn (traditional), Uranus (modern)",
    opposite: "Fifth House",
    joy: "Jupiter",
    arena:
      "The wider circle. The eleventh house governs friendship, groups, networks, and causes, and the hopes you carry for your own future and for the collective one.",
    covers: [
      "friendships and alliances",
      "groups, communities, and audiences",
      "hopes, wishes, and long-range goals",
      "social causes",
    ],
    traditional:
      "The house of good spirit, friends, allies, and benefactors. Jupiter takes joy here, and traditional texts counted it among the most fortunate houses. Also the house of hopes and wishes quite literally.",
    modern:
      "Modern practice emphasizes community, chosen family, and collective vision, the shift from personal creativity (fifth) to shared purpose (eleventh).",
    mo: "The eleventh house is where people underestimate what they have. Ask someone about their friendships and their causes and you often learn more about their future than their career answers reveal.",
    planetsHere:
      "Planets here find their power in company: they describe your people, your causes, and what you build with others.",
  },
  {
    slug: "twelfth-house",
    number: 12,
    name: "Twelfth House",
    traditionalName: "the house of the hidden",
    latin: "Carcer: prison",
    angularity: "Cadent",
    naturalSign: "Pisces",
    naturalRuler: "Jupiter (traditional), Neptune (modern)",
    opposite: "Sixth House",
    joy: "Saturn",
    arena:
      "Behind the veil. The twelfth house governs what is withdrawn from ordinary view: solitude, dreams, the unconscious, hospitals and retreats, self-undoing and self-transcendence alike.",
    covers: [
      "solitude, retreat, and rest",
      "the unconscious and dreams",
      "hidden patterns and self-sabotage",
      "compassion, surrender, and spiritual life",
    ],
    traditional:
      "The house of bad spirit: imprisonment, hidden enemies, large animals, and self-undoing, with Saturn taking joy here. Traditionally the most difficult house in the chart, and read quite literally as confinement.",
    modern:
      "Modern astrology substantially rehabilitated it as the unconscious, the transpersonal, and the necessary retreat: the place where the ego rests and where creative and spiritual material surfaces.",
    mo: "The twelfth house is not a curse, and I say that often because the older literature is frightening about it. What I actually see there is material that operates below conscious notice, which is only a problem for as long as it stays there.",
    planetsHere:
      "Planets here work backstage: easy to overlook in yourself, powerful once brought into the light with patience and kindness.",
  },
];
