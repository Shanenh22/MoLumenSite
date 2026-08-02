/**
 * The 12 houses — "areas of experience." House meanings follow the
 * standard Western canon; interpretive framing is Mo's.
 */
export interface House {
  slug: string;
  number: number;
  name: string;
  traditionalName: string;
  arena: string;
  covers: string[];
  planetsHere: string;
}

export const houses: House[] = [
  {
    slug: "first-house",
    number: 1,
    name: "First House",
    traditionalName: "the Ascendant / house of self",
    arena:
      "You, arriving. The first house is your threshold — appearance, temperament, the instinctive way you meet life before any strategy kicks in. Its cusp is the Ascendant, or rising sign, one of the most personal points in any chart.",
    covers: [
      "identity and self-presentation",
      "physical body and vitality",
      "first impressions",
      "how you begin things",
    ],
    planetsHere:
      "Planets in the first house sit in the front window of your life — whatever they represent, people meet it early and often.",
  },
  {
    slug: "second-house",
    number: 2,
    name: "Second House",
    traditionalName: "the house of possessions",
    arena:
      "What you have and what you are worth — to yourself first. The second house governs money, belongings, and resources, and beneath them the deeper question of self-worth and what you consider truly valuable.",
    covers: [
      "income and personal money",
      "possessions and material security",
      "values",
      "self-esteem and talents you can live from",
    ],
    planetsHere:
      "Planets here shape how you earn, spend, keep, and value — and how tightly your security is tied to what you own.",
  },
  {
    slug: "third-house",
    number: 3,
    name: "Third House",
    traditionalName: "the house of communication",
    arena:
      "The neighborhood of the mind. The third house governs everyday thinking and talking — learning, errands, siblings, neighbors, the familiar routes you travel and the constant hum of information along them.",
    covers: [
      "communication and writing",
      "early education and learning style",
      "siblings and neighbors",
      "short trips and daily movement",
    ],
    planetsHere:
      "Planets here color your voice and your curiosity — how you gather information and how it sounds when you pass it on.",
  },
  {
    slug: "fourth-house",
    number: 4,
    name: "Fourth House",
    traditionalName: "the IC / house of home and family",
    arena:
      "The root system. The fourth house is home in every sense — the household you came from, the one you build, ancestry, land, and the private self that exists when the door is closed.",
    covers: [
      "home and household",
      "family of origin and lineage",
      "one parent (traditions differ on which)",
      "endings and foundations",
    ],
    planetsHere:
      'Planets here work underground, shaping your sense of belonging and what "home" must include for you to rest.',
  },
  {
    slug: "fifth-house",
    number: 5,
    name: "Fifth House",
    traditionalName: "the house of pleasure and creativity",
    arena:
      "The stage and the playground. The fifth house governs what you create and what delights you — art, romance, children, games, and every act where you put something of yourself into the world for the joy of it.",
    covers: [
      "creativity and self-expression",
      "romance and courtship",
      "children",
      "play, pleasure, and risk taken for joy",
    ],
    planetsHere:
      "Planets here want an outlet. They describe your creative signature and what makes you feel most alive.",
  },
  {
    slug: "sixth-house",
    number: 6,
    name: "Sixth House",
    traditionalName: "the house of work and health",
    arena:
      "The workshop of daily life. The sixth house governs routines, work in the sense of craft and duty, health habits, and service — the unglamorous hours that quietly determine nearly everything.",
    covers: [
      "daily work and routines",
      "health and habits",
      "service and skill-building",
      "colleagues, employees, and animals in your care",
    ],
    planetsHere:
      "Planets here express through practice and maintenance — they show how you work, and how your body keeps the score of it.",
  },
  {
    slug: "seventh-house",
    number: 7,
    name: "Seventh House",
    traditionalName: "the Descendant / house of partnership",
    arena:
      'The other chair. The seventh house governs committed one-to-one relationships — spouses, business partners, close collaborators, and open adversaries. It is where "I" learns to be half of "we."',
    covers: [
      "marriage and committed partnership",
      "business partnership and contracts",
      "open enemies and negotiation",
      "what you seek (and project) in others",
    ],
    planetsHere:
      "Planets here tend to be met in other people first — qualities you attract, marry, hire, or contend with until you recognize them as your own.",
  },
  {
    slug: "eighth-house",
    number: 8,
    name: "Eighth House",
    traditionalName: "the house of shared resources and transformation",
    arena:
      "Where lives intertwine past the point of easy exit. The eighth house governs shared money and deep bonds — inheritance, debt, taxes, intimacy — and the transformations that mergers and losses force.",
    covers: [
      "other people's money: inheritance, loans, taxes, joint finances",
      "deep intimacy and trust",
      "crisis, loss, and regeneration",
      "the psyche beneath the surface",
    ],
    planetsHere:
      "Planets here work at depth — they describe how you merge, what you fear losing, and how you come back from endings.",
  },
  {
    slug: "ninth-house",
    number: 9,
    name: "Ninth House",
    traditionalName: "the house of the higher mind",
    arena:
      "The far horizon. The ninth house governs everything that stretches your world — long journeys, higher education, philosophy, religion, law, publishing — the search for meaning beyond the familiar.",
    covers: [
      "travel and foreign cultures",
      "higher education and philosophy",
      "belief, faith, and law",
      "publishing and teaching at scale",
    ],
    planetsHere:
      "Planets here hunger for the bigger picture — they describe your relationship with belief and the adventures that educate you.",
  },
  {
    slug: "tenth-house",
    number: 10,
    name: "Tenth House",
    traditionalName: "the Midheaven / house of vocation",
    arena:
      "The mountaintop. The tenth house governs your public life — career, reputation, achievement, authority — and the vocation you climb toward across decades. Its cusp is the Midheaven (MC).",
    covers: [
      "career and vocation",
      "public reputation and visibility",
      "authority and achievement",
      "one parent (traditions differ on which)",
    ],
    planetsHere:
      "Planets here are visible from a distance — they shape what you are known for and how you handle responsibility in public.",
  },
  {
    slug: "eleventh-house",
    number: 11,
    name: "Eleventh House",
    traditionalName: "the house of community and hopes",
    arena:
      "The wider circle. The eleventh house governs friendship, groups, networks, and causes — and the hopes you carry for your own future and for the collective one.",
    covers: [
      "friendships and alliances",
      "groups, communities, and audiences",
      "hopes, wishes, and long-range goals",
      "social causes",
    ],
    planetsHere:
      "Planets here find their power in company — they describe your people, your causes, and what you build with others.",
  },
  {
    slug: "twelfth-house",
    number: 12,
    name: "Twelfth House",
    traditionalName: "the house of the hidden",
    arena:
      "Behind the veil. The twelfth house governs what is withdrawn from ordinary view — solitude, dreams, the unconscious, hospitals and retreats, self-undoing and self-transcendence alike.",
    covers: [
      "solitude, retreat, and rest",
      "the unconscious and dreams",
      "hidden patterns and self-sabotage",
      "compassion, surrender, and spiritual life",
    ],
    planetsHere:
      "Planets here work backstage — easy to overlook in yourself, powerful once brought into the light with patience and kindness.",
  },
];
