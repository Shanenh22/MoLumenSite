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
  heroWorkspace: img("hero-workspace", "", 1536, 1024),
  natal: img(
    "natal-reading",
    "A hand-drawn natal chart beside a celestial journal and brass pen",
    1200,
    800,
  ),
  relationship: img(
    "relationship-reading",
    "Two mugs — midnight blue and warm clay — resting on overlapping birth charts",
    1200,
    800,
  ),
  solarReturn: img(
    "solar-return",
    "A sunlit chart wheel marking the return of the Sun",
    1200,
    800,
  ),
  lifeChanges: img(
    "life-changes",
    "A winding road through open country at golden hour",
    1200,
    800,
  ),
  monthlyTransits: img(
    "monthly-transits",
    "A monthly calendar of moon phases beside a warm lamp",
    1200,
    800,
  ),
  moreClarity: img(
    "more-clarity",
    "A magnifying lens over the fine detail of a chart",
    1200,
    800,
  ),
  quickCheckIn: img(
    "quick-check-in",
    "A single candle and a small chart on a quiet desk",
    1200,
    800,
  ),
  chartDetail: img(
    "chart-detail",
    "Close detail of a hand-drawn astrological chart",
    1200,
    800,
  ),
  birthChartBasics: img(
    "birth-chart-basics",
    "A complete birth chart laid out with drawing tools",
    1200,
    800,
  ),
  planets: img(
    "planets-library",
    "A row of miniature planets on brass stands along a mantel",
    1200,
    800,
  ),
  signs: img(
    "signs-library",
    "Zodiac symbols illustrated across parchment",
    1200,
    800,
  ),
  houses: img(
    "houses-library",
    "Twelve-part chart wheel in warm light",
    1200,
    800,
  ),
  aspects: img(
    "aspects-library",
    "Geometric aspect lines drawn between chart points",
    1200,
    800,
  ),
  currentSkyWide: img(
    "current-sky-wide",
    "A wide dusk sky with the first stars appearing",
    1200,
    800,
  ),
  currentTransits: img(
    "current-transits",
    "Planetary positions sketched across a sky map",
    1200,
    800,
  ),
  duskMountains: img(
    "dusk-mountains",
    "Layered mountain ridges under a fading sky",
    1200,
    800,
  ),
  prepareReading: img(
    "prepare-reading",
    "A notebook, warm tea, and quiet space prepared for a reading",
    1200,
    800,
  ),
  readingProcess: img(
    "reading-process",
    "A reading in progress: chart, notes, and warm light",
    1200,
    800,
  ),
  newsletterLetters: img(
    "newsletter-letters",
    "Hand-written letters with celestial stationery",
    1200,
    800,
  ),
  videosStudio: img(
    "videos-studio",
    "A cozy recording corner with microphone and star chart",
    1200,
    800,
  ),
  approachPhilosophy: img(
    "approach-philosophy",
    "A telescope by a window at dusk",
    1200,
    800,
  ),
  aboutMo: img(
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
  cliffsSeaFog: img(
    "ocean-cliffs-sea-fog",
    "Sea fog rolling over dark coastal cliffs above a grey ocean",
    1536,
    1024,
  ),
  coralReefBlueHour: img(
    "ocean-coral-reef-blue-hour",
    "A split view at the waterline: a coral reef below the surface, storm clouds above",
    1537,
    1023,
  ),
  currents: img(
    "ocean-currents",
    "Blue-green currents braiding together across the surface of open water",
    1536,
    1024,
  ),
  dawnWave: img(
    "ocean-dawn-wave",
    "A wave curling over in clear water as the sun rises behind it",
    1536,
    1024,
  ),
  floatingInTrust: img(
    "ocean-floating-in-trust",
    "A distant aerial view of one person floating on their back in wide open water at sunset",
    1536,
    1024,
  ),
  glassWave: img(
    "ocean-glass-wave",
    "A single wave curling over, lit like glass against a sunset horizon",
    1536,
    1024,
  ),
  lightBreakingStorm: img(
    "ocean-light-breaking-storm",
    "A shaft of sunlight breaking through storm cloud onto open sea",
    1536,
    1024,
  ),
  lightRays: img(
    "ocean-light-rays",
    "Sunbeams fanning down through clear turquoise water",
    1536,
    1024,
  ),
  meetingWaves: img(
    "ocean-meeting-waves",
    "Two waves converging into a single trough beneath a violet and gold sunset",
    1536,
    1024,
  ),
  ripplesSunset: img(
    "ocean-ripples-sunset",
    "Concentric ripples spreading outward from a single drop on still water at sunset",
    1536,
    1024,
  ),
  seaStackMoonrise: img(
    "ocean-sea-stack-moonrise",
    "A lone sea stack standing in calm water beneath a rising moon",
    1536,
    1024,
  ),
  shellsBeforeTide: img(
    "ocean-shells-before-tide",
    "Seashells arranged in a spiral on wet sand as the tide edges toward them",
    1536,
    1024,
  ),
  solitaryBuoy: img(
    "ocean-solitary-buoy",
    "A red buoy holding position on flat grey water under low cloud",
    1536,
    1024,
  ),
  whaleTailStars: img(
    "ocean-whale-tail-stars",
    "A whale's tail above dark water beneath a star-filled sky",
    1536,
    1024,
  ),
} as const;
