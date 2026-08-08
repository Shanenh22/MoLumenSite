/**
 * The Birth Time Confidence check.
 *
 * WHAT THIS IS NOT
 *
 * It does not work out anybody's birth time, and it does not score one. There
 * is no percentage anywhere in this file and there must never be: a number like
 * "87% confident" would be invented precision about evidence quality, which is
 * exactly the kind of false authority the rest of this site spends its time
 * refusing. `scripts/test-birth-time-confidence.mjs` asserts that no result
 * copy contains a digit followed by a percent sign, so this is a test failure
 * rather than a review comment.
 *
 * WHY THE FIVE LABELS ARE NOT NEW
 *
 * They are Mo's, already published, verbatim from section 5 of
 * /birth-time-toolkit/worksheets/ — Documented, Strongly remembered,
 * Approximate, Conflicting, Unknown, each with its own one-line definition. The
 * tool is an interactive front door onto a scale that already exists in print
 * and in the PDF. That removes the fake-precision risk structurally rather than
 * by restraint, and it means the tool cannot drift from the worksheet a reader
 * downloads five minutes later.
 *
 * `definition` on each result is that published line, unchanged. If the
 * worksheet is ever edited, edit both — and the PDF is regenerated from the
 * worksheet page by `npm run toolkit:pdf`, so that stays in step on its own.
 *
 * WHY THE COPY LIVES HERE RATHER THAN IN THE TEMPLATE
 *
 * So the tests can assert every path against the same source the page renders.
 * The Reading Finder builds its result with `innerHTML` string concatenation,
 * which puts its exit links outside `internal-link-check.mjs` entirely — that
 * is why `test-finder-handoff.mjs` had to be written. Here every result is
 * server-rendered from this data, so the link checker sees every link the tool
 * can produce and a rotted anchor fails the build instead of a visitor.
 */

export interface Question {
  id: string;
  /** The legend. Written as Mo would ask it, not as a form field. */
  legend: string;
  /** Shown under the legend where the question needs a word of framing. */
  note?: string;
  options: { value: string; label: string }[];
}

export type Answers = Record<string, string | undefined>;

/** The five labels, as slugs. These reach analytics; nothing else does. */
export type ResultId =
  | "documented"
  | "strongly-remembered"
  | "approximate"
  | "conflicting"
  | "unknown";

export interface Result {
  id: ResultId;
  /** The label exactly as the worksheet prints it. */
  label: string;
  /** The worksheet's own one-line definition, unchanged. */
  definition: string;
  /** What the evidence suggests, in Mo's voice. */
  means: string;
  /** What is still uncertain. Honest, never alarming. */
  uncertain: string;
  /** One action. Not a list — a list is what the worksheet is for. */
  nextStep: string;
  /** Deep link into the worksheets. Asserted to exist by content-integrity. */
  worksheet: { anchor: string; label: string };
  /** Whether a reading is workable. The answer is always yes, with limits. */
  reading: string;
  /** The sentence to send Mo. Never contains a time — the tool never asks. */
  sendMo: string;
  /**
   * Which action leads. Only `documented` leads with booking, because that is
   * the only reader with nothing left to do. Everyone else is given the search
   * step first, because that is what would actually help them.
   */
  primaryAction: "book" | "toolkit";
}

const WORKSHEETS = "/birth-time-toolkit/worksheets/";

/**
 * Three questions.
 *
 * The brief that produced this tool proposed six — source, precision,
 * agreement, documentation and conflict. Documentation is what "source" already
 * establishes, and agreement and conflict are the same question asked twice, so
 * that came down to four.
 *
 * The fourth was then built and removed, which is worth recording because it
 * looked necessary. It asked "have you actually seen the document?" as a
 * follow-up shown only to readers who chose a document source — the idea being
 * to gate the *Documented* label, whose published definition says "a
 * contemporaneous document **you have seen**". Two things were wrong with it.
 * It re-asked what the first question's own options already distinguish
 * ("a document I have seen" versus "a document someone else described to me"),
 * so a reader could contradict themselves in two clicks. And being conditional,
 * it made the progress indicator read "Question 1 of 3" and then "Question 2 of
 * 4" — the denominator changing under the reader, which is precisely the
 * behaviour the Reading Finder's own notes call out as reading like a trick.
 *
 * Three fixed questions. No branching, no conditional counting, and the
 * distinction the fourth question existed to draw is drawn where it belonged
 * all along.
 */
export const QUESTIONS: Question[] = [
  {
    id: "source",
    legend: "Where did the time come from?",
    note: "If it came from a document, that is a different kind of answer from a person remembering. They get weighed differently.",
    options: [
      {
        value: "document-seen",
        label:
          "A document I have seen — birth certificate, hospital record, baby book",
      },
      {
        value: "document-described",
        label: "A document someone else described to me",
      },
      { value: "present", label: "Someone who was there remembers it" },
      { value: "secondhand", label: "Someone who wasn't there passed it on" },
      { value: "unknown", label: "I don't know where it came from" },
    ],
  },
  {
    id: "precision",
    legend: "How precise is it?",
    note: "A time good to about fifteen minutes is enough for most of what a reading does. This is not a test you can fail.",
    options: [
      { value: "minute", label: "To the minute" },
      { value: "quarter", label: "To within about fifteen minutes" },
      { value: "hour", label: "To within about an hour" },
      {
        value: "part-of-day",
        label: "A part of the day — morning, after lunch, overnight",
      },
      { value: "none", label: "No idea at all" },
    ],
  },
  {
    id: "agreement",
    legend: "Is there more than one version?",
    note: "Two times that disagree is a better position than one vague time, not a worse one. Two candidates can be tested against a chart.",
    options: [
      { value: "single", label: "No — one time, one source" },
      {
        value: "one-better",
        label: "Yes, and one is clearly better documented",
      },
      { value: "close", label: "Yes, and they disagree by less than an hour" },
      { value: "far", label: "Yes, and they disagree by more than an hour" },
      {
        value: "unchecked",
        label: "I've only ever heard one, and nobody has checked it",
      },
    ],
  },
];

export const RESULTS: Record<ResultId, Result> = {
  documented: {
    id: "documented",
    label: "Documented",
    definition:
      "Written on a birth certificate, hospital record or contemporaneous document you have seen.",
    means:
      "This is the strongest position there is. A time written down at the time, by someone whose job was to write it down, outranks every recollection — including a very confident one.",
    uncertain:
      "Only the ordinary residue: records are occasionally transcribed wrong, and a time rounded to the nearest five minutes on the form is still rounded. Neither is worth chasing unless something in the reading does not fit.",
    nextStep:
      "Nothing to hunt for. Write the time down together with which document it came from, so it stays a fact rather than becoming a memory of a fact.",
    worksheet: {
      anchor: "preparing",
      label: "Toolkit §8 — Preparing for your reading",
    },
    reading:
      "Yes, and with the houses and the rising sign on solid ground. This is the version of a chart where I can say where something lands as well as what it is.",
    sendMo: "“Birth time from [which document]. Confidence: documented.”",
    primaryAction: "book",
  },
  "strongly-remembered": {
    id: "strongly-remembered",
    label: "Strongly remembered",
    definition:
      "One consistent account from someone who was there, anchored to an event rather than a number.",
    means:
      "A single, consistent account from someone present is genuinely useful evidence. People remember the shape of a day far better than they remember a clock, and an account anchored to something that happened tends to hold up.",
    uncertain:
      "A remembered time is not the same kind of thing as a recorded one, however sure the person is. What is usually uncertain is the last quarter of an hour, which matters if your rising degree sits near a sign boundary and hardly at all otherwise.",
    nextStep:
      "Ask for the long-form birth certificate. It either confirms what you have or corrects it, and both outcomes are worth the fee.",
    worksheet: {
      anchor: "record-search",
      label: "Toolkit §2 — Record search checklist",
    },
    reading:
      "Yes. Tell me it is remembered rather than recorded and I will treat anything sitting near a cusp with the caution it deserves, rather than quietly assuming it.",
    sendMo:
      "“Time remembered by [who], anchored to [what]. Confidence: strongly remembered.”",
    primaryAction: "toolkit",
  },
  approximate: {
    id: "approximate",
    label: "Approximate",
    definition:
      'A window rather than a time — "sometime in the morning", "between two and four".',
    means:
      "You have a window. That is real information, and it is what most people start with. A window of a couple of hours often still settles the rising sign, and where it does not, it narrows the possibilities to two rather than twelve.",
    uncertain:
      "Which sign was rising, if the window straddles a boundary — the rising degree crosses a whole sign roughly every two hours. The house structure moves with it.",
    nextStep:
      "Ask about the shape of the day rather than the number on the clock. Was it light out? Before or after a meal? Did anyone miss a shift? Those questions narrow a window; “what time was I born” invites a guess that then hardens into a fact.",
    worksheet: {
      anchor: "family-interview",
      label: "Toolkit §3 — Family interview",
    },
    reading:
      "Yes. Bring the window rather than a midpoint. I would rather work from “between two and four” than from a tidy-looking three o'clock that nobody actually said.",
    sendMo:
      "“Birth time somewhere between [X] and [Y]. Confidence: approximate.”",
    primaryAction: "toolkit",
  },
  conflicting: {
    id: "conflicting",
    label: "Conflicting",
    definition: "More than one candidate, none clearly better. Bring them all.",
    means:
      "Two times that disagree is a better position than one vague time, not a worse one. Two candidates can be tested against a chart; a single guessed time cannot be tested against anything.",
    uncertain:
      "Which candidate is right — and whether it even matters. If both produce the same rising sign, the disagreement makes no difference to the reading at all, and that is worth checking before anyone spends effort resolving it.",
    nextStep:
      "Write down every candidate with its source and how confident that source is. Do not pick one yet. A documented time outranks any recollection; between two recollections, the one anchored to an event usually beats the one anchored to a number.",
    worksheet: {
      anchor: "when-times-disagree",
      label: "Toolkit §4 — When times disagree",
    },
    reading:
      "Yes. Send me both and say they disagree. I would rather start from what is true than from a number that looks tidy.",
    sendMo:
      "“Two candidate times, from [source A] and [source B], which disagree. Confidence: conflicting.”",
    primaryAction: "toolkit",
  },
  unknown: {
    id: "unknown",
    label: "Unknown",
    definition: "No usable information. Say so plainly; it is workable.",
    means:
      "Your Sun, almost always your Moon, every planet's sign, the aspects between them, the condition of each planet by dignity and every current transit are all still available. That is most of a chart, and it is where a great deal of character lives.",
    uncertain:
      "The rising sign, the house structure, and the Moon's exact degree on a fast-moving day. So a reading answers what these patterns are very well, and where in your life they land only in outline.",
    nextStep:
      "The full birth certificate is the usual answer and it is usually findable. Check which certificate is already in the house first — many households keep an abbreviated copy that omits the time.",
    worksheet: {
      anchor: "if-it-stays-unknown",
      label: "Toolkit §6 — If it stays unknown",
    },
    reading:
      "Yes, and this is not a consolation prize. The one genuinely bad option is guessing and presenting the guess as exact, which produces a detailed, coherent reading about someone born two hours after you.",
    sendMo: "“No birth time available. Confidence: unknown.”",
    primaryAction: "toolkit",
  },
};

/**
 * Answers to a label. Deterministic, explainable, no scoring.
 *
 * ORDER IS LOAD-BEARING. Conflict is tested before precision, because two
 * precise times that disagree are less usable than one vague time — which is
 * Mo's own position on /birth-time/ ("keep both rather than picking one"). A
 * rule set that returned "documented" for a reader holding two contradictory
 * certificates would contradict the page it sits underneath.
 *
 * Returns null until enough has been answered to say anything, so a partially
 * completed form never produces a result.
 */
export function evaluate(answers: Answers): Result | null {
  const { source, precision, agreement } = answers;
  if (!source || !precision || !agreement) return null;

  // 1. Conflict first. An unresolved disagreement outranks any precision claim,
  //    because two precise times that disagree are less usable than one vague
  //    one — Mo's own position on /birth-time/: keep both rather than picking.
  if (agreement === "far" || agreement === "close") return RESULTS.conflicting;

  // 2. No usable origin, or no usable precision, is Unknown — whatever else was
  //    said. Someone who ticks "a document I have seen" and "no idea at all"
  //    has contradicted themselves, and Unknown is the honest reading of that.
  if (source === "unknown" || precision === "none") return RESULTS.unknown;

  // 3. Documented needs a document the reader has actually seen — the label's
  //    published definition says so — and a time precise enough to be worth the
  //    word. `document-seen` is the option that asserts both halves.
  if (
    source === "document-seen" &&
    (precision === "minute" || precision === "quarter")
  )
    return RESULTS.documented;

  // 4. A document at one remove, or a first-hand account, with a time good to
  //    within an hour. Note what is NOT in this list: `secondhand`. A time
  //    passed on by someone who was not there is a window however precise it
  //    sounds, and falls through to Approximate below.
  if (
    (source === "document-seen" ||
      source === "document-described" ||
      source === "present") &&
    (precision === "minute" || precision === "quarter" || precision === "hour")
  )
    return RESULTS["strongly-remembered"];

  // 5. Everything else is a window.
  return RESULTS.approximate;
}

/** Every worksheet anchor the tool can link to. Asserted by content-integrity. */
export const WORKSHEET_ANCHORS = Object.values(RESULTS).map(
  (r) => r.worksheet.anchor,
);

export const WORKSHEETS_PATH = WORKSHEETS;
