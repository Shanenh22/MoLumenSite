/**
 * Central image registry. All files live in public/images/ (WebP,
 * pre-optimized). Photos of Mo are real photographs supplied by the owner;
 * scene imagery is owner-supplied decorative art (no people).
 *
 * The `ocean` set is decorative imagery of unknown origin — all sixteen files
 * arrived as identical 1536x1024 renders, which is consistent with stock or
 * generated art rather than photographs anyone here took. Consequences, and
 * they are not optional:
 *
 *  - Alt text describes only what is inside the frame. It never names a place,
 *    never implies who made the picture, and never implies it depicts Mo.
 *  - No photo credits or location captions, because none were supplied.
 *  - Two of the sixteen are deliberately absent from this file:
 *    ocean-waterline.webp (a woman in a white dress standing in the surf) and
 *    ocean-releasing-water.webp (a close-up of a pair of cupped hands). Shane
 *    held both back on 2026-08-04.
 *
 *    Later that day he approved a different set that does contain people and
 *    hands, which established that the no-invented-portraits rule is about
 *    pictures presented *as Mo*, not about human presence in decorative art.
 *    That reasoning probably extends to these two — but they were not named in
 *    that approval, so they stay out until he says so. Ask; do not infer.
 */
export interface SiteImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Present on band images only — see `band()` below. */
  srcset?: string;
}
const img = (
  name: string,
  alt: string,
  width: number,
  height: number,
): SiteImage => ({
  src: `/images/${name}.webp`,
  alt,
  width,
  height,
});

/**
 * Narrow copies that scripts/gen-image-variants.mjs writes for every band
 * image. Exported so the generator and the srcset below cannot drift apart:
 * one list, two consumers.
 */
export const VARIANT_WIDTHS = [640, 960, 1280];

/**
 * A full-bleed band image — every hero and every interlude.
 *
 * These stretch across 100vw, so a phone was fetching the full authored file
 * (1536px for the ocean set) to paint a 390px band. `band()` attaches the
 * srcset that lets the browser choose; the markup pairs it with sizes="100vw".
 *
 * Portraits deliberately do not go through here. They are laid out at a fixed
 * column width rather than full-bleed, so they need their own `sizes`, and the
 * three that matter already carry hand-written srcsets in index.astro.
 *
 * A width is only offered if it is genuinely smaller than the source: nothing
 * here is ever upscaled, and the untouched original always ends the list as the
 * widest candidate.
 */
const band = (
  name: string,
  alt: string,
  width: number,
  height: number,
): SiteImage => {
  const base = `/images/${name}`;
  return {
    src: `${base}.webp`,
    alt,
    width,
    height,
    srcset: [
      ...VARIANT_WIDTHS.filter((w) => w < width).map(
        (w) => `${base}-${w}.webp ${w}w`,
      ),
      `${base}.webp ${width}w`,
    ].join(", "),
  };
};

export const photos = {
  moHome: img(
    "mo-home",
    "Mo Lumen, smiling warmly in her reading room",
    1000,
    1109,
  ),
  moAbout: img("mo-about", 'Maureen "Mo" Lumen', 1000, 1099),
  moApproach: img("mo-approach", "Mo Lumen seated in her studio", 1000, 1333),
  moCredentials: img("mo-credentials", "Mo Lumen in a navy blazer", 1000, 1333),
  moShelf: img(
    "mo-shelf",
    "Mo Lumen in her study, glass art on the shelves behind her",
    1000,
    1333,
  ),
  skyReal1: img(
    "sky-real-1",
    "The Milky Way overhead in a dark night sky",
    1200,
    1600,
  ),
  skyReal2: img(
    "sky-real-2",
    "The Milky Way rising over autumn trees",
    1200,
    1600,
  ),
} as const;

export const scenes = {
  heroWorkspace: band("hero-workspace", "", 1536, 1024),
  natal: band(
    "natal-reading",
    "A hand-drawn natal chart beside a celestial journal and brass pen",
    1200,
    800,
  ),
  relationship: band(
    "relationship-reading",
    "Two mugs — midnight blue and warm clay — resting on overlapping birth charts",
    1200,
    800,
  ),
  solarReturn: band(
    "solar-return",
    "A sunlit chart wheel marking the return of the Sun",
    1200,
    800,
  ),
  lifeChanges: band(
    "life-changes",
    "A winding road through open country at golden hour",
    1200,
    800,
  ),
  monthlyTransits: band(
    "monthly-transits",
    "A monthly calendar of moon phases beside a warm lamp",
    1200,
    800,
  ),
  moreClarity: band(
    "more-clarity",
    "A magnifying lens over the fine detail of a chart",
    1200,
    800,
  ),
  quickCheckIn: band(
    "quick-check-in",
    "A single candle and a small chart on a quiet desk",
    1200,
    800,
  ),
  chartDetail: band(
    "chart-detail",
    "Close detail of a hand-drawn astrological chart",
    1200,
    800,
  ),
  birthChartBasics: band(
    "birth-chart-basics",
    "A complete birth chart laid out with drawing tools",
    1200,
    800,
  ),
  planets: band(
    "planets-library",
    "A row of miniature planets on brass stands along a mantel",
    1200,
    800,
  ),
  signs: band(
    "signs-library",
    "Zodiac symbols illustrated across parchment",
    1200,
    800,
  ),
  houses: band(
    "houses-library",
    "Twelve-part chart wheel in warm light",
    1200,
    800,
  ),
  aspects: band(
    "aspects-library",
    "Geometric aspect lines drawn between chart points",
    1200,
    800,
  ),
  currentSkyWide: band(
    "current-sky-wide",
    "A wide dusk sky with the first stars appearing",
    1200,
    800,
  ),
  currentTransits: band(
    "current-transits",
    "Planetary positions sketched across a sky map",
    1200,
    800,
  ),
  duskMountains: band(
    "dusk-mountains",
    "Layered mountain ridges under a fading sky",
    1200,
    800,
  ),
  prepareReading: band(
    "prepare-reading",
    "A notebook, warm tea, and quiet space prepared for a reading",
    1200,
    800,
  ),
  readingProcess: band(
    "reading-process",
    "A reading in progress: chart, notes, and warm light",
    1200,
    800,
  ),
  newsletterLetters: band(
    "newsletter-letters",
    "Hand-written letters with celestial stationery",
    1200,
    800,
  ),
  videosStudio: band(
    "videos-studio",
    "A cozy recording corner with microphone and star chart",
    1200,
    800,
  ),
  approachPhilosophy: band(
    "approach-philosophy",
    "A telescope by a window at dusk",
    1200,
    800,
  ),
  aboutMo: band(
    "about-mo-placeholder",
    "A warm study with astrological charts and candlelight",
    1200,
    800,
  ),
} as const;

/**
 * Decorative ocean imagery. Read the provenance note at the top of this file
 * before adding, moving or re-captioning any of these.
 */
export const ocean = {
  cliffsSeaFog: band(
    "ocean-cliffs-sea-fog",
    "Sea fog rolling over dark coastal cliffs above a grey ocean",
    1536,
    1024,
  ),
  coralReefBlueHour: band(
    "ocean-coral-reef-blue-hour",
    "A split view at the waterline: a coral reef below the surface, storm clouds above",
    1537,
    1023,
  ),
  currents: band(
    "ocean-currents",
    "Blue-green currents braiding together across the surface of open water",
    1536,
    1024,
  ),
  dawnWave: band(
    "ocean-dawn-wave",
    "A wave curling over in clear water as the sun rises behind it",
    1536,
    1024,
  ),
  floatingInTrust: band(
    "ocean-floating-in-trust",
    "A distant aerial view of one person floating on their back in wide open water at sunset",
    1536,
    1024,
  ),
  glassWave: band(
    "ocean-glass-wave",
    "A single wave curling over, lit like glass against a sunset horizon",
    1536,
    1024,
  ),
  lightBreakingStorm: band(
    "ocean-light-breaking-storm",
    "A shaft of sunlight breaking through storm cloud onto open sea",
    1536,
    1024,
  ),
  lightRays: band(
    "ocean-light-rays",
    "Sunbeams fanning down through clear turquoise water",
    1536,
    1024,
  ),
  meetingWaves: band(
    "ocean-meeting-waves",
    "Two waves converging into a single trough beneath a violet and gold sunset",
    1536,
    1024,
  ),
  ripplesSunset: band(
    "ocean-ripples-sunset",
    "Concentric ripples spreading outward from a single drop on still water at sunset",
    1536,
    1024,
  ),
  seaStackMoonrise: band(
    "ocean-sea-stack-moonrise",
    "A lone sea stack standing in calm water beneath a rising moon",
    1536,
    1024,
  ),
  shellsBeforeTide: band(
    "ocean-shells-before-tide",
    "Seashells arranged in a spiral on wet sand as the tide edges toward them",
    1536,
    1024,
  ),
  solitaryBuoy: band(
    "ocean-solitary-buoy",
    "A red buoy holding position on flat grey water under low cloud",
    1536,
    1024,
  ),
  whaleTailStars: band(
    "ocean-whale-tail-stars",
    "A whale's tail above dark water beneath a star-filled sky",
    1536,
    1024,
  ),
} as const;

/**
 * Celestial and metaphorical imagery, supplied by Shane on 2026-08-04. Same
 * provenance rules as the ocean set — nineteen identical 1536x1024 renders, so
 * treat them as stock or generated art, describe only what is inside the frame,
 * and never add a caption, credit or location.
 *
 * Four of these contain a person or a pair of hands (01, 03, 10, 20). Shane was
 * asked about exactly that and approved them on 2026-08-04: the
 * no-invented-portraits rule is about pictures presented *as Mo*, not about any
 * human presence in decorative art. Two consequences still bind:
 *
 *  - Alt text never implies the figure is Mo, and never implies who took the
 *    picture. "A person seen from behind" — not "a woman looking out", and
 *    certainly not a name.
 *  - Keep them off `/about/` and `/credentials/`. Proximity to Mo's real
 *    biography is what would make a reader draw the wrong conclusion, which is
 *    the actual risk the rule exists to prevent.
 *
 * Unlike the ocean set these carry real subject matter, so they are placed by
 * meaning rather than by hash wherever a page has a genuine one: moon phases on
 * `/explore/moon-phases/`, a repaired sphere on `/explore/saturn-return/`, a
 * threshold on `/explore/angles/`. Where no honest match exists, they fall into
 * the shared rotation and mean nothing in particular — which is fine, and is
 * also the only claim being made about them.
 */
export const celestial = {
  threshold: band(
    "01-threshold-of-choice",
    "A person seen from behind in an open doorway, looking out at a vast star-filled sky from a lamplit room",
    1536,
    1024,
  ),
  moonPhasesInWater: band(
    "02-moon-phases-in-water",
    "A shallow ceramic bowl of water holding a ring of moon phases, a fingertip touching the surface",
    1536,
    1024,
  ),
  mendingConstellation: band(
    "03-mending-the-constellation",
    "Two hands stitching glowing constellation lines into dark quilted cloth with gold thread",
    1536,
    1024,
  ),
  platform: band(
    "04-platform-of-transition",
    "An empty railway platform at dusk with a single suitcase, a large moon low over the tracks",
    1536,
    1024,
  ),
  distanceUnderEclipse: band(
    "05-distance-under-eclipse",
    "Two wooden chairs facing each other across open grassland beneath an eclipsed crescent",
    1536,
    1024,
  ),
  seedlings: band(
    "06-seedlings-under-planets",
    "Seedlings rising from dark soil inside a derelict glasshouse, planets and moons visible through the panes",
    1536,
    1024,
  ),
  lighthouse: band(
    "07-guidance-through-cosmic-fog",
    "A lighthouse on a dark cliff casting its beam into a star-filled sky above the sea",
    1536,
    1024,
  ),
  kintsugi: band(
    "08-kintsugi-night-sky",
    "A cracked porcelain sphere repaired with gold, the opening revealing a starfield inside",
    1536,
    1024,
  ),
  keys: band(
    "10-keys-to-possible-futures",
    "A ring of antique keys on dark velvet, one key held between finger and thumb",
    1536,
    1024,
  ),
  galaxyTidepool: band(
    "11-galaxy-tidepool",
    "A tide pool at night holding the reflection of a spiral galaxy, shells and anemones around its rim",
    1536,
    1024,
  ),
  moth: band(
    "12-fragile-transformation",
    "A pale moth newly emerged beside its empty cocoon, a full moon out of focus behind",
    1536,
    1024,
  ),
  stairway: band(
    "13-stairway-of-becoming",
    "A curving stone staircase open to a starry sky at dusk, a folded throw left on one step",
    1536,
    1024,
  ),
  emptyChair: band(
    "14-traces-of-absence",
    "A coat and a star-flecked blanket over an empty chair beside a window onto the night sky",
    1536,
    1024,
  ),
  clearedTable: band(
    "15-family-constellation",
    "An overhead view of a cleared dinner table, candle still burning among folded napkins and glasses",
    1536,
    1024,
  ),
  paperBoat: band(
    "16-paper-boat-at-the-fork",
    "A lit paper boat on a river dividing in two, the Milky Way overhead",
    1536,
    1024,
  ),
  afterTheStorm: band(
    "17-first-breath-after-the-storm",
    "A window with rain and lightning on one side and a clear starry sky through the open pane, curtain lifting",
    1536,
    1024,
  ),
  hourglass: band(
    "18-time-becoming-roots",
    "An hourglass whose falling sand becomes stars above and roots below",
    1536,
    1024,
  ),
  horses: band(
    "19-freedom-under-a-comet",
    "Three horses running across a shallow salt flat beneath a comet at dusk",
    1536,
    1024,
  ),
  inheritedLight: band(
    "20-inherited-light",
    "Weathered hands cupping a seed pod that holds a crescent moon and stars, a child's hand reaching toward it",
    1536,
    1024,
  ),
} as const;

/**
 * The shared decorative pool. Ocean first, celestial second — order is fixed
 * because `bandFor()` hashes into this array and a reordering would silently
 * reshuffle the band on seventy-four pages.
 */
const oceanList = [...Object.values(ocean), ...Object.values(celestial)];

/**
 * A stable ocean image for a template-generated page.
 *
 * Seventy-four of this site's pages come from seven `[slug].astro` templates —
 * twelve signs, twelve houses, ten planets, five aspects, fifteen sky events,
 * thirteen posts, seven readings. Hand-picking a band image for each would be
 * seventy-four judgement calls, and hard-coding one would make all twelve sign
 * pages identical again, which was the original complaint.
 *
 * So the slug picks the image. Same slug, same picture, every build — the choice
 * is stable across deploys, which matters because a band that shuffled on each
 * build would make screenshot diffs and contrast runs meaningless.
 *
 * `offset` lets one page take a second, different band without repeating itself.
 *
 * This is decorative placement only. It asserts nothing about the image and the
 * image asserts nothing about the page — read the provenance note at the top of
 * this file before doing anything cleverer with it.
 */
export function bandFor(key: string, offset = 0): SiteImage {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return oceanList[(h + offset) % oceanList.length];
}
