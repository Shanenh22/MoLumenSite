/**
 * Central image registry. All files live in public/images/ (WebP,
 * pre-optimized). Photos of Mo are real photographs supplied by the owner;
 * scene imagery is owner-supplied decorative art (no people).
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
