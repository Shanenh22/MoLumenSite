/**
 * The 10 planets (astrological usage includes the Sun and Moon as
 * "luminaries"). Factual cycle lengths are astronomical approximations;
 * interpretive text follows the "planets as functions or drives" model
 * in Mo's agency-first voice.
 */
export interface Planet {
  slug: string;
  name: string;
  glyph: string;
  cycle: string; // time to travel the zodiac (approximate, verifiable)
  rules: string;
  drive: string; // the function/drive
  inYourChart: string;
  whenItLeads: string;
  workingWithIt: string;
}

export const planets: Planet[] = [
  {
    slug: "sun",
    name: "The Sun",
    glyph: "☉",
    cycle: "about 1 year through the zodiac (about 1 month per sign)",
    rules: "Leo",
    drive:
      "The drive to be someone — identity, vitality, and purpose. The Sun is the center you organize around: what you are here to become, not just what you already are.",
    inYourChart:
      "Your Sun's sign shows the style of your becoming; its house shows the arena where you most need to shine. It is the part of you that grows by being expressed.",
    whenItLeads:
      "Life feels purposeful and lit from within. Overdone, it can crowd the stage — every conversation somehow returning to you.",
    workingWithIt:
      "Ask where you are still waiting for permission to take up your own life. The Sun strengthens with use: create, decide, claim.",
  },
  {
    slug: "moon",
    name: "The Moon",
    glyph: "☽",
    cycle: "about 27–28 days through the zodiac (about 2.5 days per sign)",
    rules: "Cancer",
    drive:
      "The drive to feel safe and cared for — instinct, habit, memory, and need. The Moon is how you refuel and what you reach for without thinking.",
    inYourChart:
      "Your Moon describes your emotional weather, what home means to you, and how you were shaped by early care. It is the fastest-moving body — which is why moods move faster than plans.",
    whenItLeads:
      "You are responsive, intuitive, and genuinely nourishing to others. Overdone, old feelings drive present choices.",
    workingWithIt:
      "Learn your own needs well enough to name them. A tended Moon steadies everything else in the chart.",
  },
  {
    slug: "mercury",
    name: "Mercury",
    glyph: "☿",
    cycle:
      "about 1 year through the zodiac, with roughly three retrograde periods per year",
    rules: "Gemini and Virgo",
    drive:
      "The drive to perceive and connect — thinking, speaking, learning, trading, translating. Mercury is the messenger running between your inner world and everyone else.",
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
    cycle: "about 1 year through the zodiac; retrograde about every 18 months",
    rules: "Taurus and Libra",
    drive:
      "The drive to value and to love — attraction, pleasure, beauty, and the art of relating. Venus is what you find lovely and how you draw it toward you.",
    inYourChart:
      "Venus describes your taste, your way of showing affection, and what you need in order to feel that something — or someone — is worth wanting.",
    whenItLeads:
      "Life has sweetness, connection, and grace. Overdone, harmony is purchased at the price of honesty.",
    workingWithIt:
      "Ask what you actually value versus what you were taught to want. Venus matures every time you choose the real over the pleasing.",
  },
  {
    slug: "mars",
    name: "Mars",
    glyph: "♂",
    cycle: "about 2 years through the zodiac; retrograde about every 2 years",
    rules: "Aries (and traditionally Scorpio)",
    drive:
      "The drive to act and to defend — desire, courage, anger, and will. Mars is how you go after what you want and how you fight when something matters.",
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
    cycle: "about 12 years through the zodiac (about 1 year per sign)",
    rules: "Sagittarius (and traditionally Pisces)",
    drive:
      "The drive to grow and to mean something — faith, generosity, opportunity, and the big picture. Jupiter is where life tends to say yes to you, and where you say yes to life.",
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
    cycle: "about 29.5 years through the zodiac (about 2.5 years per sign)",
    rules: "Capricorn (and traditionally Aquarius)",
    drive:
      "The drive to structure and to master — limits, time, responsibility, and earned authority. Saturn is the teacher whose tests are inconvenient and whose diplomas are real.",
    inYourChart:
      'Saturn shows where life asks more of you, where fear and mastery live side by side, and what you can build that lasts. The famous "Saturn return" around ages 29 and 58 marks its full cycle.',
    whenItLeads:
      "Integrity, competence, durability. Overdone, caution calcifies and the inner critic runs the household.",
    workingWithIt:
      "Do the thing Saturn's house keeps asking of you, in small consistent payments. Dread converts to authority with remarkable reliability.",
  },
  {
    slug: "uranus",
    name: "Uranus",
    glyph: "♅",
    cycle: "about 84 years through the zodiac (about 7 years per sign)",
    rules: "Aquarius (modern rulership)",
    drive:
      "The drive to awaken and to free — sudden insight, rebellion, invention, and authentic difference. Uranus breaks patterns that have quietly become cages.",
    inYourChart:
      "Uranus shows where you are wired differently, where you resist standardization, and where life delivers its lightning-bolt course corrections.",
    whenItLeads:
      "Originality and liberation. Overdone, disruption for its own sake — freedom from everything, for nothing.",
    workingWithIt:
      "Change chosen consciously tends to be gentler than change Uranus has to arrange for you. Where are you overdue to be more honestly yourself?",
  },
  {
    slug: "neptune",
    name: "Neptune",
    glyph: "♆",
    cycle: "about 165 years through the zodiac (about 14 years per sign)",
    rules: "Pisces (modern rulership)",
    drive:
      "The drive to transcend and to merge — imagination, compassion, spirituality, and the longing for something more than the visible world.",
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
    cycle:
      "about 248 years through the zodiac (roughly 12–31 years per sign, varying widely)",
    rules: "Scorpio (modern rulership)",
    drive:
      "The drive to transform — power, death-and-rebirth cycles, the buried truth, and the will to survive changed rather than unchanged.",
    inYourChart:
      "Pluto shows where life composts you: the arena of deepest intensity, where control is tempting, and where your most genuine power is excavated.",
    whenItLeads:
      "Regeneration and depth psychology in action. Overdone, obsession, power struggles, and scorched earth.",
    workingWithIt:
      "What Pluto touches must molt. Cooperating with the molting — grieving, releasing, renaming — beats being dragged through it.",
  },
];
