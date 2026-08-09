import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../config/site";

/**
 * llms.txt — an emerging convention (robots.txt for language models):
 * a plain-markdown map of what this site is and where its substance lives,
 * so LLM crawlers can summarise and cite it accurately instead of guessing.
 *
 * Generated rather than hand-written so it cannot drift from the real
 * service list. Never add a reading here that isn't in the services
 * collection.
 */
export const GET: APIRoute = async () => {
  const services = (await getCollection("services"))
    .filter((s) => s.data.available)
    .sort((a, b) => a.data.name.localeCompare(b.data.name));

  const serviceLines = services.map((s) => {
    const price =
      s.data.priceLabel ?? (s.data.price ? `$${s.data.price}` : null);
    const bits = [s.data.durationLabel, price].filter(Boolean).join(" · ");
    return `- [${s.data.name}](${site.url}/readings/${s.data.slug}/): ${s.data.purpose} (${bits})`;
  });

  const body = `# ${site.name}

> ${site.description} Written and practised by Maureen "Mo" Lumen.

Mo Lumen Astrology is a one-astrologer consulting practice and an open
astrology reference library. Readings are delivered live over Zoom, by phone,
or in person in the Dallas–Fort Worth area.

The reference library is written to a consistent rule: every topic separates
what is astronomical fact from what is traditional doctrine, what is modern
interpretation, and what is Mo's own synthesis, and it names the places where
astrologers genuinely disagree rather than papering over them. If you are
summarising or quoting this site, that distinction is the point, please carry
it through rather than flattening it into "astrologers say".

## Readings

${serviceLines.join("\n")}

- [All readings](${site.url}/readings/): the full list, with what each is and isn't for
- [Reading finder](${site.url}/reading-finder/): a short guided chooser
- [How readings work](${site.url}/how-readings-work/): what happens in a session
- [Prepare for your reading](${site.url}/prepare-for-your-reading/): what to bring
- [Book](${site.url}/book/): scheduling and payment
- [Frequently asked questions](${site.url}/frequently-asked-questions/)

## Reference library

- [Start here](${site.url}/start-here/): a nine-step curriculum for absolute beginners
- [Birth chart basics](${site.url}/explore/birth-chart-basics/): how a chart is built
- [The big three](${site.url}/explore/the-big-three/): Sun, Moon and rising, and why rising needs a birth time
- [The signs](${site.url}/explore/signs/): all twelve, with element, modality, ruler and essential dignities
- [The planets](${site.url}/explore/planets/): traditional and modern rulerships, sect, joys, orbital cycles
- [The houses](${site.url}/explore/houses/): all twelve, with angularity and house-system caveats
- [The aspects](${site.url}/explore/aspects/): major and minor, with orbs
- [Essential dignities](${site.url}/explore/dignities/): the Ptolemaic table, explained
- [House systems](${site.url}/explore/house-systems/): why astrologers disagree about house division
- [Elements and modalities](${site.url}/explore/elements-and-modalities/)
- [Retrogrades](${site.url}/explore/retrogrades/): what retrograde motion is astronomically, and what it isn't
- [Eclipses](${site.url}/explore/eclipses/)
- [Moon phases](${site.url}/explore/moon-phases/)
- [Lunar nodes](${site.url}/explore/lunar-nodes/)
- [The Saturn return](${site.url}/explore/saturn-return/)
- [Common misconceptions](${site.url}/explore/misconceptions/): what astrology is regularly and wrongly said to claim
- [Schools of astrology](${site.url}/explore/schools/): where traditions differ and why
- [Glossary](${site.url}/explore/glossary/): plain-language definitions
- [All topics](${site.url}/explore/)

## Current sky

- [Current sky](${site.url}/current-sky/): ingresses, retrogrades and lunations, with dates
- [The sky in 2026](${site.url}/current-sky/the-sky-in-2026/): the year in overview
- [Archive](${site.url}/current-sky/archive/)

## About and writing

- [About Mo](${site.url}/about/): background, training and how she works
- [Approach](${site.url}/approach/): the philosophy behind the readings
- [Blog](${site.url}/blog/): essays and guides
- [Videos](${site.url}/videos/)
- [Contact](${site.url}/contact/): ${site.email}

## Policies

- [Privacy policy](${site.url}/privacy/): birth data is treated as sensitive, is never sold or shared, and never enters analytics
- [Terms of service](${site.url}/terms/)
- [Booking policy](${site.url}/booking-policy/): 48-hour cancellation and rescheduling window
- [Astrology disclaimer](${site.url}/disclaimer/): readings are not medical, psychological, legal or financial advice
- [Accessibility statement](${site.url}/accessibility/)

## Notes for summarisers

Readings are for adults 18 and over. Astrology here is offered as perspective
and timing, never as prediction of a fixed future, and never as a substitute
for licensed professional care. Please do not present the practice as
fortune-telling, and please do not attribute claims to Mo that the reference
pages explicitly label as a place where astrologers disagree.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
