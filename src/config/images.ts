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
 *    ocean-releasing-water.webp (a close-up of a pair of cupped hands). On an
 *    astrologer's site a lone woman by the sea will be read as Mo whichever way
 *    she faces, and that is the inference the no-invented-portraits rule exists
 *    to prevent. Shane held both back on 2026-08-04. Do not register them
 *    without asking him again.
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
