/**
 * One-off authoring helper for the 2027 Current Sky window.
 *
 * Every date, degree and sign below was researched and cross-checked before
 * being written here — see docs/current-sky-2027-sources.md for the method and
 * the two-source agreement. Nothing in this file is computed or inferred; it is
 * a transcription of verified data plus prose written for each event.
 *
 * Times are published in Eastern Time by the source. The site presents dates in
 * America/Chicago. Every 2027 lunation was checked for the one case that would
 * matter — an ET time between 00:00 and 00:59, which would fall on the previous
 * calendar day in Central — and none occurs, so every date below is identical
 * in both zones. Do not assume that holds for a future window without checking
 * it again.
 *
 * Run with: node scripts/gen-sky-2027.mjs
 * It refuses to overwrite an existing file, so it is safe to re-run after Mo
 * edits any of these in Pages CMS.
 */
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'src/content/sky-events';
const SOURCE_LUNATION =
  'Dates, degrees and signs from cafeastrology.com 2027 moon phases (ET), cross-checked against astro-seek.com and truenortharts.com 2027 lunar calendars, 2026-08-07';
const SOURCE_PLANET =
  'Stations, degrees and ingress from cafeastrology.com 2027 planetary overview (ET), 2026-08-07';
const SOURCE_ECLIPSE =
  'Eclipse types and magnitudes from NASA GSFC eclipse catalogue and timeanddate.com 2027 eclipse list; degrees/signs from cafeastrology.com 2027 moon phases (ET), 2026-08-07';
const VERIFIED = '2026-08-07';

/**
 * The year's shape, for reference while reading the entries below: no outer
 * planet changes sign in 2027. Saturn and Neptune are both in Aries, Uranus in
 * Gemini, Pluto in Aquarius, all year. Jupiter's move into Virgo on 26 July is
 * the only ingress of the whole year. That is genuinely unusual after several
 * years of thresholds, and several entries lean on it.
 */
const events = [
  // ---------------------------------------------------------------- January
  {
    slug: '2027-01-07-capricorn-new-moon',
    title: 'New Moon in Capricorn',
    type: 'lunation',
    start: '2027-01-07',
    sign: 'Capricorn',
    planets: ['Sun', 'Moon'],
    text: "The first new moon of 2027 lands at 17° Capricorn, three days before Mars turns retrograde. Capricorn cycles are about structure and the long game, and this one opens while the sky's appetite for forward motion is about to drop. Worth starting something you can build slowly rather than something that needs momentum immediately.",
  },
  {
    slug: '2027-01-10-mars-retrograde',
    title: 'Mars Stations Retrograde in Virgo',
    type: 'retrograde',
    start: '2027-01-10',
    end: '2027-04-01',
    sign: 'Virgo',
    planets: ['Mars'],
    source: SOURCE_PLANET,
    text: "Mars turns retrograde in Virgo on 10 January and stays that way until 1 April, retreating into Leo along the way — the longest retrograde of the year and the only Mars retrograde until 2029. Traditionally this is the period for revising rather than launching: energy that goes out tends to come back for a second pass. In practice most people notice it as effort that does not convert, and the useful response is patience with your own pace rather than force.",
  },
  {
    slug: '2027-01-22-leo-full-moon',
    title: 'Full Moon in Leo',
    type: 'lunation',
    start: '2027-01-22',
    sign: 'Leo',
    planets: ['Sun', 'Moon'],
    text: 'A full moon at 2° Leo, opposite the Aquarius Sun, with Mars retrograde in the same half of the zodiac. Leo full moons bring the question of recognition to a head — what you have made, and whether anyone has noticed. The retrograde makes this a better moment to look at the work honestly than to demand an audience for it.',
  },

  // --------------------------------------------------------------- February
  {
    slug: '2027-02-06-aquarius-solar-eclipse',
    title: 'New Moon Annular Solar Eclipse in Aquarius',
    type: 'eclipse',
    start: '2027-02-06',
    sign: 'Aquarius',
    planets: ['Sun', 'Moon'],
    featured: true,
    source: SOURCE_ECLIPSE,
    text: "An annular solar eclipse at 17° Aquarius — the Moon is too far from Earth to cover the Sun completely, so it leaves a ring of light rather than a total blackout. The path crosses the Atlantic, South America and Africa. Astrologically an eclipse new moon is read as an emphatic beginning along the house axis it touches, and Aquarius asks about the groups you belong to and the future you think you are heading toward. What eclipses do not do is decide anything for you.",
  },
  {
    slug: '2027-02-08-uranus-direct',
    title: 'Uranus Stations Direct in Gemini',
    type: 'retrograde',
    start: '2027-02-08',
    sign: 'Gemini',
    planets: ['Uranus'],
    source: SOURCE_PLANET,
    text: "Uranus turns direct at 1° Gemini, finishing the retrograde it began the previous August and resuming its slow walk through a sign it entered only recently. Outer-planet stations are collective rather than personal weather; you feel them, if at all, as a subject that has been circling finally moving again. Uranus in Gemini is a long conversation about information, speech and how quickly people change their minds.",
  },
  {
    slug: '2027-02-09-mercury-retrograde-pisces',
    title: 'Mercury Stations Retrograde in Pisces',
    type: 'retrograde',
    start: '2027-02-09',
    end: '2027-03-03',
    sign: 'Pisces',
    planets: ['Mercury'],
    source: SOURCE_PLANET,
    text: "Mercury stations retrograde at 6° Pisces and reverses into Aquarius, turning direct on 3 March at 21° Aquarius. The first of three this year, and all three cross a sign boundary backwards — a pattern worth noticing, because the review keeps starting in one register and finishing in another. Pisces into Aquarius moves from the felt sense of a thing to the logic of it. The usual advice applies and is usually enough: back things up, read the whole email, expect to repeat yourself.",
  },
  {
    slug: '2027-02-20-virgo-lunar-eclipse',
    title: 'Full Moon Penumbral Lunar Eclipse in Virgo',
    type: 'eclipse',
    start: '2027-02-20',
    sign: 'Virgo',
    planets: ['Sun', 'Moon'],
    source: SOURCE_ECLIPSE,
    text: 'A penumbral lunar eclipse at 2° Virgo, two weeks after the Aquarius solar eclipse — the pair that makes an eclipse season. Penumbral means the Moon passes through the faint outer shadow only, so there is little to see; the sky is subtler than the symbolism. Virgo full moons tend to surface the gap between the standard you hold and what is actually sustainable.',
  },

  // ------------------------------------------------------------------ March
  {
    slug: '2027-03-08-pisces-new-moon',
    title: 'New Moon in Pisces',
    type: 'lunation',
    start: '2027-03-08',
    sign: 'Pisces',
    planets: ['Sun', 'Moon'],
    text: 'A new moon at 17° Pisces, five days after Mercury turns direct and while Mars is still retrograde. Pisces cycles are poor at deadlines and good at direction — the sign is traditionally where boundaries soften and imagination gets useful. A reasonable moment to decide what something is for, and a poor one to decide exactly when it ships.',
  },
  {
    slug: '2027-03-22-libra-full-moon',
    title: 'Full Moon in Libra',
    type: 'lunation',
    start: '2027-03-22',
    sign: 'Libra',
    planets: ['Sun', 'Moon'],
    text: 'A full moon at 1° Libra opposite the early-Aries Sun, ten days before Mars finally turns direct. Libra full moons put the balance between what you want and what someone else wants under a light. The Aries end of that axis is not subtle about the first half of the question.',
  },

  // ------------------------------------------------------------------ April
  {
    slug: '2027-04-01-mars-direct',
    title: 'Mars Stations Direct in Leo',
    type: 'retrograde',
    start: '2027-04-01',
    sign: 'Leo',
    planets: ['Mars'],
    source: SOURCE_PLANET,
    text: "Mars turns direct in Leo, ending eleven weeks of retrograde motion that began in Virgo in January. Traditionally the station itself is the sticky part and the weeks after it are when plans start converting again. Nothing switches on at midnight — Mars spends a while re-covering ground it has already crossed before it reaches new degrees.",
  },
  {
    slug: '2027-04-06-aries-new-moon',
    title: 'New Moon in Aries',
    type: 'lunation',
    start: '2027-04-06',
    sign: 'Aries',
    planets: ['Sun', 'Moon'],
    text: "A new moon at 17° Aries, five days after Mars turns direct and in the same sign as Saturn and Neptune. The first new moon of the astrological year, and the first one all year with genuine forward motion behind it. Aries starts things; Saturn nearby suggests starting something you are prepared to still be doing in a year.",
  },
  {
    slug: '2027-04-12-jupiter-direct',
    title: 'Jupiter Stations Direct in Leo',
    type: 'retrograde',
    start: '2027-04-12',
    sign: 'Leo',
    planets: ['Jupiter'],
    source: SOURCE_PLANET,
    text: 'Jupiter turns direct at 17° Leo, having been retrograde since the previous year. Jupiter is traditionally the planet of growth and perspective, and its retrogrades are read as growth turned inward rather than growth stopped. It stays in Leo until late July.',
  },
  {
    slug: '2027-04-20-scorpio-full-moon',
    title: 'Full Moon in Scorpio',
    type: 'lunation',
    start: '2027-04-20',
    sign: 'Scorpio',
    planets: ['Sun', 'Moon'],
    text: 'A full moon at the very first degree of Scorpio, opposite the Taurus Sun. The Taurus–Scorpio axis is the one about what you hold and what you share, in every sense including the financial. Full moons here have a reputation for intensity that is mostly earned, though the tradition is more interested in honesty than in drama.',
  },

  // -------------------------------------------------------------------- May
  {
    slug: '2027-05-06-taurus-new-moon',
    title: 'New Moon in Taurus',
    type: 'lunation',
    start: '2027-05-06',
    sign: 'Taurus',
    planets: ['Sun', 'Moon'],
    text: 'A new moon at 16° Taurus, two days before Pluto turns retrograde. Taurus cycles are slow, physical and unbothered by urgency — the sign that asks what actually makes you feel steady. A good beginning for anything that will be measured in seasons rather than weeks.',
  },
  {
    slug: '2027-05-08-pluto-retrograde',
    title: 'Pluto Stations Retrograde in Aquarius',
    type: 'retrograde',
    start: '2027-05-08',
    end: '2027-10-17',
    sign: 'Aquarius',
    planets: ['Pluto'],
    source: SOURCE_PLANET,
    text: 'Pluto turns retrograde at 7° Aquarius and stays that way until 17 October. Pluto is retrograde for roughly five months every year, so this is ordinary rather than ominous — the annual inward half of a very slow cycle. Pluto in Aquarius is a decades-long transit about power held collectively rather than individually, and a single station is one small movement inside it.',
  },
  {
    slug: '2027-05-20-scorpio-full-moon-second',
    title: 'Full Moon at the End of Scorpio',
    type: 'lunation',
    start: '2027-05-20',
    sign: 'Scorpio',
    planets: ['Sun', 'Moon'],
    text: 'The second Scorpio full moon in two months, this one at 29° — the last degree of the sign, and the second full moon in Scorpio this year because the first fell at 0°. Late degrees are traditionally read as the end of something rather than the middle of it. Whatever the April full moon opened, this is the other end of it.',
  },

  // ------------------------------------------------------------------- June
  {
    slug: '2027-06-04-gemini-new-moon',
    title: 'New Moon in Gemini',
    type: 'lunation',
    start: '2027-06-04',
    sign: 'Gemini',
    planets: ['Sun', 'Moon'],
    text: 'A new moon at 14° Gemini, in the sign Uranus is now slowly crossing, six days before Mercury turns retrograde. Gemini cycles are about gathering rather than concluding — questions, contacts, several options held at once. Start the conversations now; the retrograde will want them revisited anyway.',
  },
  {
    slug: '2027-06-10-mercury-retrograde-cancer',
    title: 'Mercury Stations Retrograde in Cancer',
    type: 'retrograde',
    start: '2027-06-10',
    end: '2027-07-04',
    sign: 'Cancer',
    planets: ['Mercury'],
    source: SOURCE_PLANET,
    text: 'Mercury stations retrograde at 6° Cancer and slips back into Gemini, turning direct on 4 July at 27° Gemini. The second of the year, and the same backwards border-crossing as the first — a review that starts with how something feels and ends with what was actually said. Family conversations and old correspondence are the traditional territory.',
  },
  {
    slug: '2027-06-18-sagittarius-full-moon',
    title: 'Full Moon in Sagittarius',
    type: 'lunation',
    start: '2027-06-18',
    sign: 'Sagittarius',
    planets: ['Sun', 'Moon'],
    text: 'A full moon at 28° Sagittarius, near the solstice, with Mercury retrograde. The Gemini–Sagittarius axis is the one about detail against meaning: the facts you have collected versus the story you are telling with them. Full moons here tend to ask whether the story still fits.',
  },

  // ------------------------------------------------------------------- July
  {
    slug: '2027-07-03-cancer-new-moon',
    title: 'New Moon in Cancer',
    type: 'lunation',
    start: '2027-07-03',
    sign: 'Cancer',
    planets: ['Sun', 'Moon'],
    text: 'A new moon at 12° Cancer, one day before Mercury turns direct. Cancer cycles concern home, family and the people you are actually responsible to. A quiet, domestic beginning rather than a public one — and with Mercury stationing beside it, a good week to say the thing you have been drafting in your head.',
  },
  {
    slug: '2027-07-09-neptune-retrograde',
    title: 'Neptune Stations Retrograde in Aries',
    type: 'retrograde',
    start: '2027-07-09',
    end: '2027-12-15',
    sign: 'Aries',
    planets: ['Neptune'],
    source: SOURCE_PLANET,
    text: 'Neptune turns retrograde at 7° Aries and remains so until 15 December. Neptune spends about five months of every year retrograde, so the station is routine; what is not routine is Neptune being in Aries at all, having spent the previous fourteen years in Pisces. The tradition associates Neptune with dissolving edges, and Aries with the self that pushes forward — an odd, interesting pairing that the next decade will spell out.',
  },
  {
    slug: '2027-07-18-capricorn-lunar-eclipse',
    title: 'Full Moon in Capricorn — the Eclipse That Is Barely One',
    type: 'eclipse',
    start: '2027-07-18',
    sign: 'Capricorn',
    planets: ['Sun', 'Moon'],
    source: SOURCE_ECLIPSE,
    text: "A full moon at 26° Capricorn that eclipse catalogues list as penumbral with a magnitude of 0.0014 — the Moon grazes the very outermost edge of Earth's shadow. NASA counts it; timeanddate.com describes it as an almost-eclipse and notes it will not be visible from anywhere on Earth. Worth stating plainly, because astrological calendars will list this as an eclipse and it is astronomically almost nothing. The Capricorn full moon itself is real enough: responsibility, and what it has cost.",
  },
  {
    slug: '2027-07-26-jupiter-enters-virgo',
    title: 'Jupiter Enters Virgo',
    type: 'ingress',
    start: '2027-07-26',
    sign: 'Virgo',
    planets: ['Jupiter'],
    featured: true,
    source: SOURCE_PLANET,
    text: "Jupiter leaves Leo for Virgo, where it stays into 2028. This is the only sign change any of the slower planets makes in the whole of 2027 — Saturn and Neptune hold in Aries, Uranus in Gemini, Pluto in Aquarius, all year. After several years of thresholds that is a notably settled sky. Traditionally Jupiter is in detriment in Virgo, the sign opposite its own Pisces: expansive significations meeting a sign that prefers to narrow and refine. Read as growth through craft rather than growth through scale.",
  },

  // ----------------------------------------------------------------- August
  {
    slug: '2027-08-02-leo-solar-eclipse',
    title: 'New Moon Total Solar Eclipse in Leo',
    type: 'eclipse',
    start: '2027-08-02',
    sign: 'Leo',
    planets: ['Sun', 'Moon'],
    featured: true,
    source: SOURCE_ECLIPSE,
    text: "The total solar eclipse at 10° Leo, and one of the longest of the century — over six minutes of totality along a path crossing southern Spain, North Africa, Egypt and the Arabian peninsula. Astronomically this is the event of the year by a wide margin. Astrologically it is an eclipse new moon in Leo, a year after the Leo eclipse of August 2026, continuing a series along the same axis: heart, creativity, and being seen for what you actually are rather than what you produce.",
  },
  {
    slug: '2027-08-09-saturn-retrograde',
    title: 'Saturn Stations Retrograde in Aries',
    type: 'retrograde',
    start: '2027-08-09',
    end: '2027-12-23',
    sign: 'Aries',
    planets: ['Saturn'],
    source: SOURCE_PLANET,
    text: 'Saturn turns retrograde at 28° Aries and stays retrograde until 23 December. Saturn retrogrades annually for four and a half months, which makes this ordinary; the tradition reads it as commitments coming back for review rather than as obstruction. Saturn is in Aries alongside Neptune for the whole year — structure and dissolution in the same sign, which is a genuinely strange combination and one worth watching rather than pronouncing on.',
  },
  {
    slug: '2027-08-17-aquarius-lunar-eclipse',
    title: 'Full Moon Penumbral Lunar Eclipse in Aquarius',
    type: 'eclipse',
    start: '2027-08-17',
    sign: 'Aquarius',
    planets: ['Sun', 'Moon'],
    source: SOURCE_ECLIPSE,
    text: 'A penumbral lunar eclipse at 24° Aquarius, closing the eclipse season that opened with the total solar eclipse a fortnight earlier. Like February, the pair sits across Leo and Aquarius: the self that wants to be seen and the collective it belongs to. Penumbral eclipses are faint to look at — this one is a full moon with a shadow you would need instruments to notice.',
  },
  {
    slug: '2027-08-31-virgo-new-moon',
    title: 'New Moon in Virgo',
    type: 'lunation',
    start: '2027-08-31',
    sign: 'Virgo',
    planets: ['Sun', 'Moon'],
    text: 'A new moon at 8° Virgo, now with Jupiter in the same sign for the first time in twelve years. Virgo cycles are for repair and method — one specific improvement, properly done. Jupiter alongside enlarges the appetite for it, which in Virgo can tip into overhauling more than anyone asked you to.',
  },

  // -------------------------------------------------------------- September
  {
    slug: '2027-09-15-uranus-retrograde',
    title: 'Uranus Stations Retrograde in Gemini',
    type: 'retrograde',
    start: '2027-09-15',
    sign: 'Gemini',
    planets: ['Uranus'],
    source: SOURCE_PLANET,
    text: 'Uranus turns retrograde at 10° Gemini, seven months after stationing direct at 1°. Nine degrees is the whole of its forward motion for the year, which is a useful reminder of the pace of the outer planets — the transits that reshape a decade move about a sign every seven years.',
  },
  {
    slug: '2027-09-15-pisces-full-moon',
    title: 'Full Moon in Pisces',
    type: 'lunation',
    start: '2027-09-15',
    sign: 'Pisces',
    planets: ['Sun', 'Moon'],
    text: 'A full moon at 23° Pisces opposite the Virgo Sun, on the same day Uranus stations. The Virgo–Pisces axis is the one about what can be fixed and what can only be accepted, and full moons here are usually about telling the difference. Traditionally Jupiter rules Pisces, and Jupiter is currently in the opposite sign.',
  },
  {
    slug: '2027-09-29-libra-new-moon',
    title: 'New Moon in Libra',
    type: 'lunation',
    start: '2027-09-29',
    sign: 'Libra',
    planets: ['Sun', 'Moon'],
    text: 'A new moon at 7° Libra, eight days before Mercury turns retrograde in Scorpio. Libra cycles concern agreements and the people you make them with. If something wants negotiating, the fortnight before that station is the clearer window.',
  },

  // ---------------------------------------------------------------- October
  {
    slug: '2027-10-07-mercury-retrograde-scorpio',
    title: 'Mercury Stations Retrograde in Scorpio',
    type: 'retrograde',
    start: '2027-10-07',
    end: '2027-10-28',
    sign: 'Scorpio',
    planets: ['Mercury'],
    source: SOURCE_PLANET,
    text: 'Mercury stations retrograde at 5° Scorpio and retreats into Libra, turning direct on 28 October at 19° Libra. The last of three this year and the shortest, and once again a backwards crossing of a sign boundary — from what is hidden to what is negotiated. Scorpio retrogrades have a reputation for surfacing things people had stopped expecting to hear about.',
  },
  {
    slug: '2027-10-15-aries-full-moon',
    title: 'Full Moon in Aries',
    type: 'lunation',
    start: '2027-10-15',
    sign: 'Aries',
    planets: ['Sun', 'Moon'],
    text: 'A full moon at 22° Aries, in the sign holding both Saturn and Neptune, while Mercury is retrograde. The Aries–Libra axis is self against other, and a full moon here tends to make the difference between the two very clear. With Saturn nearby, the honest version is more useful than the satisfying one.',
  },
  {
    slug: '2027-10-17-pluto-direct',
    title: 'Pluto Stations Direct in Aquarius',
    type: 'retrograde',
    start: '2027-10-17',
    sign: 'Aquarius',
    planets: ['Pluto'],
    source: SOURCE_PLANET,
    text: 'Pluto turns direct at 5° Aquarius, closing the annual retrograde it began in May. Over the whole year Pluto covers roughly two degrees. Anything you attribute to a Pluto station is really being attributed to a background that has been there for years and will be there for years more.',
  },
  {
    slug: '2027-10-29-scorpio-new-moon',
    title: 'New Moon in Scorpio',
    type: 'lunation',
    start: '2027-10-29',
    sign: 'Scorpio',
    planets: ['Sun', 'Moon'],
    text: 'A new moon at 6° Scorpio, the day after Mercury turns direct. Scorpio cycles start things that are not announced — the sign is traditionally about depth, resource and what is held in reserve. A private beginning, and better for it.',
  },

  // --------------------------------------------------------------- November
  {
    slug: '2027-11-13-taurus-full-moon',
    title: 'Full Moon in Taurus',
    type: 'lunation',
    start: '2027-11-13',
    sign: 'Taurus',
    planets: ['Sun', 'Moon'],
    text: 'A full moon at 22° Taurus opposite the Scorpio Sun. The axis of what is yours and what is shared, lit from the Taurus end: the plain question of whether your material life actually supports the way you want to live. Taurus full moons are unhurried and hard to argue with.',
  },
  {
    slug: '2027-11-27-sagittarius-new-moon',
    title: 'New Moon in Sagittarius',
    type: 'lunation',
    start: '2027-11-27',
    sign: 'Sagittarius',
    planets: ['Sun', 'Moon'],
    text: 'A new moon at 6° Sagittarius, opening the last full lunar cycle of the year. Sagittarius cycles are for aim rather than detail — the direction you would pick if the practicalities were solvable. December will supply the practicalities soon enough.',
  },

  // --------------------------------------------------------------- December
  {
    slug: '2027-12-13-gemini-full-moon',
    title: 'Full Moon in Gemini',
    type: 'lunation',
    start: '2027-12-13',
    sign: 'Gemini',
    planets: ['Sun', 'Moon'],
    text: 'A full moon at 21° Gemini, close to Uranus in the same sign. Gemini full moons bring conversations to a head: the thing that has been circulating gets said out loud. Uranus nearby suggests it may not be said in the order anyone planned.',
  },
  {
    slug: '2027-12-15-neptune-direct',
    title: 'Neptune Stations Direct in Aries',
    type: 'retrograde',
    start: '2027-12-15',
    sign: 'Aries',
    planets: ['Neptune'],
    source: SOURCE_PLANET,
    text: 'Neptune turns direct at 4° Aries, ending five months of retrograde motion. Over the year Neptune moves less than three degrees. Like Pluto, it is best read as a slow background condition rather than a dated event, whatever the calendar entry implies.',
  },
  {
    slug: '2027-12-23-saturn-direct',
    title: 'Saturn Stations Direct in Aries',
    type: 'retrograde',
    start: '2027-12-23',
    sign: 'Aries',
    planets: ['Saturn'],
    source: SOURCE_PLANET,
    text: 'Saturn turns direct at 21° Aries, four and a half months after stationing retrograde at 28°. Saturn ends 2027 roughly thirteen degrees further through Aries than it began. Whatever Saturn has been asking of you this year, the question tends to get more answerable once it moves forward again.',
  },
  {
    slug: '2027-12-27-capricorn-new-moon',
    title: 'New Moon in Capricorn',
    type: 'lunation',
    start: '2027-12-27',
    sign: 'Capricorn',
    planets: ['Sun', 'Moon'],
    text: 'The last new moon of 2027, at 6° Capricorn, four days after Saturn turns direct in Aries. Capricorn is Saturn\'s own sign, so this is a beginning under the sign of consequence — the kind of resolution that survives February. A fitting close to a year with almost no sign changes in it: less about crossing thresholds than about what you did with the ground you were already standing on.',
  },
];

let written = 0;
let skipped = 0;
for (const e of events) {
  const file = join(DIR, `${e.slug}.md`);
  if (existsSync(file)) {
    skipped += 1;
    continue;
  }
  const fm = [
    '---',
    `title: ${JSON.stringify(e.title)}`,
    `eventType: ${e.type}`,
    `start: ${e.start}`,
    ...(e.end ? [`end: ${e.end}`] : []),
    'timezone: "America/Chicago"',
    `planets: [${e.planets.map((p) => `"${p}"`).join(', ')}]`,
    ...(e.sign ? [`sign: ${JSON.stringify(e.sign)}`] : []),
    `summary: ${JSON.stringify(e.text)}`,
    `featured: ${e.featured ? 'true' : 'false'}`,
    `sourceNote: ${JSON.stringify(e.source ?? SOURCE_LUNATION)}`,
    `lastVerified: ${VERIFIED}`,
    'ownerReview: true',
    '---',
    '',
    e.text,
    '',
  ].join('\n');
  writeFileSync(file, fm, 'utf8');
  written += 1;
}
console.log(`2027 Current Sky: ${written} written, ${skipped} already present.`);
