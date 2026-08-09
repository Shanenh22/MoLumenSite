/**
 * The 12 houses — areas of experience.
 *
 * Angularity, traditional Latin names, and planetary joys follow standard
 * Western and Hellenistic convention. "Natural sign/ruler" fields preserve a
 * common modern teaching correspondence used by this site's reference table;
 * they are not treated here as literal house rulerships.
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
      "The first house begins at the Ascendant and describes the immediate field of self: embodiment, presence, temperament, and the way a person enters experience.",
    covers: [
      "identity and self-presentation",
      "physical body and vitality",
      "first impressions",
      "how you begin or meet experience",
    ],
    traditional:
      "Traditional astrology treats the first house and its ruler as central indicators of life, body, vitality, and the native's general condition. Mercury takes joy here.",
    modern:
      "Modern practice often emphasizes the first house as self-presentation, approach, and the interface between inner identity and the world.",
    mo: "I think of the first house as the doorway rather than a mask. It is part of the person, but it is also only the first part we meet. What occupies that doorway matters, and so does everything elsewhere in the house and chart that supports or complicates it.",
    planetsHere:
      "Planets in the first house can become especially noticeable in how a person enters situations or is initially perceived, but sign, aspects, condition, and the rest of the chart determine the expression.",
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
      "The second house concerns what is personally yours in material terms: money, possessions, income, resources, and the practical question of what you have available to support your life.",
    covers: [
      "income and personal money",
      "possessions",
      "material resources",
      "financial security and sufficiency",
    ],
    traditional:
      "Traditionally the house of substance: movable goods, money, income, and material sufficiency. Its emphasis was concrete rather than psychological.",
    modern:
      "Some modern astrologers extend the second house into abstract ideas of values or self-worth. I keep the house grounded primarily in finances, possessions, and personal material resources.",
    mo: "I keep the second house fairly literal. Money and possessions carry enough meaning on their own without asking one house to explain a person's entire sense of worth. I want to know what resources are available, how they are managed, and what material questions are actually present in the life.",
    planetsHere:
      "Planets here may describe different ways money, possessions, earning, spending, keeping, or material security become active themes. Their meaning depends on the planet's condition and the chart around it.",
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
      "The third house describes the near environment: communication, siblings and neighbors, early learning, short journeys, errands, and the movement of information through everyday life.",
    covers: [
      "communication and writing",
      "early education and learning",
      "siblings and neighbours",
      "short trips and daily movement",
    ],
    traditional:
      "Traditional texts associate the third with siblings, short journeys, messages, local surroundings, and the goddess or local sacred. The Moon takes joy here.",
    modern:
      "Modern practice often emphasizes communication style, learning, information exchange, and the mental habits developed through the immediate environment.",
    mo: "I like the third house because it reminds us that a life is built from ordinary contact: the conversation, the drive across town, the person you text, the information you encounter every day. Those details may look small until they repeat for years.",
    planetsHere:
      "Planets here can color communication, learning, sibling dynamics, local movement, or the daily exchange of information. The planet tells us what function is involved; the chart tells us how.",
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
      "The fourth house concerns home, land, family and ancestry, foundations, private life, and the conditions from which the rest of the chart grows outward.",
    covers: [
      "home and household",
      "family of origin and lineage",
      "one parent (traditions differ on which)",
      "land, foundations, and endings",
    ],
    traditional:
      "Traditional astrology associates the fourth with parents, land, home, ancestry, endings, and the conclusion of a matter. Its angle is the Imum Coeli, or IC.",
    modern:
      "Modern practice often adds psychological foundations, family patterns, privacy, roots, and the internal experience of home.",
    mo: "The fourth house makes me curious about what 'home' actually means to this person. I do not assume a childhood story from the chart. The symbolism may describe roots, privacy, family, place, ancestry, or the need for a foundation, and lived experience tells us which thread matters most.",
    planetsHere:
      "Planets here can make home, family, roots, land, ancestry, privacy, or foundations especially important. Their expression may be supportive, complicated, or simply prominent depending on context.",
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
      "The fifth house concerns children, pleasure, play, creativity, romance, recreation, and forms of self-expression undertaken because they bring life or delight.",
    covers: [
      "creativity and self-expression",
      "romance and courtship",
      "children",
      "play, pleasure, and recreation",
    ],
    traditional:
      "Traditional astrology calls the fifth the house of good fortune and associates it with children, pleasure, banquets, enjoyment, and fertility. Venus takes joy here.",
    modern:
      "Modern astrology broadens the fifth into personal creativity, play, performance, romance, and the desire to make or express something that feels distinctly one's own.",
    mo: "The fifth house is one of my favorite reminders that delight belongs in a serious chart. I want to know what someone makes, enjoys, risks for pleasure, or loves enough to do without turning it into a productivity project.",
    planetsHere:
      "Planets here can become involved in creativity, play, romance, children, performance, recreation, or the wish to express something personally meaningful.",
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
      "The sixth house concerns labor, service, routine, illness and health matters, skill developed through repetition, and the practical maintenance required by everyday life.",
    covers: [
      "daily work and routines",
      "health and illness",
      "service and skill-building",
      "employees, coworkers, and animals in your care",
    ],
    traditional:
      'Traditional astrology considered the sixth a difficult house associated with illness, servitude, toil, subordinates, and small animals. Mars takes joy here.',
    modern:
      "Modern practice often reframes the sixth through habits, wellness, craft, work process, service, and the relationship between daily choices and larger functioning.",
    mo: "The sixth house brings astrology down to the ordinary day, which is exactly why it matters. I look at what is being repeated, maintained, practiced, or endured. But I do not use a chart to diagnose illness or replace medical care.",
    planetsHere:
      "Planets here can emphasize work routines, service, health concerns, maintenance, coworkers, animals, or skills built through repetition. Medical interpretation belongs within clear ethical limits.",
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
      "The seventh house concerns one-to-one encounters: marriage and committed partnership, contracts, business partnerships, negotiation, open opponents, and the people we meet across the table.",
    covers: [
      "marriage and committed partnership",
      "business partnership and contracts",
      "open enemies and negotiation",
      "significant one-to-one relationships",
    ],
    traditional:
      "Traditional astrology associates the seventh with marriage, partners, contracts, open enemies, and, in horary, the other party to a question. It is the angle directly opposite the Ascendant.",
    modern:
      "Modern practice often adds projection and relational mirroring: the possibility that qualities experienced strongly through partners may also belong to the native's own psychological landscape.",
    mo: "The seventh house makes me curious about what repeatedly happens in close one-to-one relationships. Projection can be useful language, but I do not assume every difficult partner is simply carrying a disowned part of the client. Sometimes another person is just another person. Conversation keeps the astrology honest.",
    planetsHere:
      "Planets here can make partnership, contracts, negotiation, conflict, or significant one-to-one relationships especially prominent. They do not tell us in advance who a partner will be or what a relationship must become.",
  },
  {
    slug: "eighth-house",
    number: 8,
    name: "Eighth House",
    traditionalName: "the house of shared resources and mortality",
    latin: "Mors: death",
    angularity: "Succedent",
    naturalSign: "Scorpio",
    naturalRuler: "Mars (traditional), Pluto (modern)",
    opposite: "Second House",
    arena:
      "The eighth house concerns other people's resources and obligations that bind lives together: inheritance, taxes, debt, shared finances, mortality, loss, and the consequences of material or intimate entanglement.",
    covers: [
      "other people's money: inheritance, loans, taxes, joint finances",
      "debts and obligations",
      "inheritance and legacies",
      "mortality, loss, and matters shared with others",
    ],
    traditional:
      "Traditional astrology associates the eighth with death, inheritance, the partner's resources, debts, and legacies. It was considered one of the more difficult houses.",
    modern:
      "Modern astrology often extends the eighth into intimacy, psychological depth, transformation, shared vulnerability, and experiences of loss or regeneration.",
    mo: "I keep the eighth house anchored in what is actually shared, owed, inherited, lost, or beyond one person's control. Modern psychological language can be useful, but I do not want 'transformation' to become a vague substitute for the concrete subjects this house has long described.",
    planetsHere:
      "Planets here can become involved in shared money, debt, taxes, inheritance, mortality, loss, intimacy, or other entanglements. The chart does not justify fatalistic predictions about death.",
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
      "The ninth house concerns long-distance journeys, higher learning, religion, philosophy, law, divination, publishing, and the search for frameworks large enough to organize experience.",
    covers: [
      "travel and foreign cultures",
      "higher education and philosophy",
      "belief, religion, and law",
      "publishing, divination, and advanced study",
    ],
    traditional:
      "Traditional astrology calls the ninth the house of God and associates it with religion, prophecy, divination, dreams, long journeys, and higher knowledge. The Sun takes joy here.",
    modern:
      "Modern practice often emphasizes worldview, meaning, advanced education, philosophy, intercultural experience, and the ways belief organizes perception.",
    mo: "The ninth house makes me curious about the larger questions a person cannot stop asking. Sometimes that becomes travel or formal education; sometimes faith, philosophy, astrology, law, or teaching. The common thread is the search for a wider frame.",
    planetsHere:
      "Planets here can make belief, study, travel, law, publishing, religion, philosophy, teaching, or divination important arenas of expression.",
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
      "The tenth house concerns public life: career, reputation, authority, achievement, responsibility, visibility, and the ways a person becomes known beyond private life.",
    covers: [
      "career and vocation",
      "public reputation and visibility",
      "authority and achievement",
      "one parent (traditions differ on which)",
    ],
    traditional:
      "Traditional astrology associates the tenth with rank, authority, profession, action, reputation, and one parent. The Midheaven is a separate astronomical point that may or may not coincide with the tenth-house cusp depending on house system.",
    modern:
      "Modern astrology often reads the tenth through vocation, public identity, achievement, authority, and the kind of contribution for which a person becomes visible.",
    mo: "The tenth house can tell me a great deal about public direction, but it does not print a profession on the chart. I look at it with its ruler, planets, aspects, the second and sixth houses, and the person's actual skills and circumstances before talking about vocation.",
    planetsHere:
      "Planets here can become especially visible through career, reputation, leadership, responsibility, or public roles. Visibility is not the same as destiny.",
  },
  {
    slug: "eleventh-house",
    number: 11,
    name: "Eleventh House",
    traditionalName: "the house of friends and hopes",
    latin: "Benefacta: good fortune",
    angularity: "Succedent",
    naturalSign: "Aquarius",
    naturalRuler: "Saturn (traditional), Uranus (modern)",
    opposite: "Fifth House",
    joy: "Jupiter",
    arena:
      "The eleventh house concerns friends, allies, groups, benefactors, networks, hopes, and the people or communities through which possibilities become larger than one individual.",
    covers: [
      "friendships and alliances",
      "groups, communities, and networks",
      "hopes, wishes, and long-range goals",
      "benefactors and collective efforts",
    ],
    traditional:
      "Traditional astrology calls the eleventh the house of good spirit and associates it with friends, allies, benefactors, hopes, and good fortune. Jupiter takes joy here.",
    modern:
      "Modern practice often emphasizes community, networks, chosen groups, audiences, collective vision, and future-oriented goals.",
    mo: "The eleventh house reminds me that people do not build a future alone. I want to know who someone is connected to, what communities matter, and which hopes are actually being supported by relationships and networks rather than held only as ideas.",
    planetsHere:
      "Planets here can emphasize friendship, community, networks, benefactors, audiences, hopes, or collective projects. Their meaning is relational but not automatically social in the same way for every chart.",
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
      "The twelfth house concerns what is removed from ordinary visibility or participation: isolation, confinement, hidden enemies, retreat, institutions, and, in modern practice, unconscious or private material.",
    covers: [
      "solitude, retreat, and isolation",
      "institutions and confinement",
      "hidden enemies and unseen difficulties",
      "private, unconscious, or spiritual material in modern practice",
    ],
    traditional:
      "Traditional astrology calls the twelfth the house of bad spirit and associates it with imprisonment, hidden enemies, isolation, large animals, and self-undoing. Saturn takes joy here.",
    modern:
      "Modern astrology substantially broadens the twelfth into the unconscious, spirituality, retreat, dreams, compassion, self-sabotage, and transpersonal experience.",
    mo: "I do not treat the twelfth house as a curse, and I also do not erase its traditional difficulty by making it purely mystical. It can describe isolation, things operating outside conscious view, retreat, institutions, or spiritual life. The chart and the person's circumstances tell us which meaning belongs in the conversation.",
    planetsHere:
      "Planets here may operate privately, indirectly, institutionally, spiritually, or outside easy conscious recognition. That can be difficult, creative, restorative, isolating, or several of those at once.",
  },
];
