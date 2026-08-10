/**
 * Birth Time Confidence is an evidence-quality aid, not a birth-time calculator.
 * It never assigns a percentage or claims to recover a missing time. The five
 * result labels mirror section 5 of /birth-time-toolkit/worksheets/.
 */

export interface Question {
  id: string;
  legend: string;
  note?: string;
  options: { value: string; label: string }[];
}

export type Answers = Record<string, string | undefined>;

export type ResultId =
  | "documented"
  | "strongly-remembered"
  | "approximate"
  | "conflicting"
  | "unknown";

export interface Result {
  id: ResultId;
  label: string;
  /** Must stay identical to the worksheet definition. */
  definition: string;
  means: string;
  uncertain: string;
  nextStep: string;
  worksheet: { anchor: string; label: string };
  reading: string;
  sendMo: string;
  primaryAction: "book" | "toolkit";
}

const WORKSHEETS = "/birth-time-toolkit/worksheets/";

export const QUESTIONS: Question[] = [
  {
    id: "source",
    legend: "Where did the time come from?",
    note: "A record and a remembered time are different kinds of evidence. Knowing the source helps us describe the time accurately.",
    options: [
      {
        value: "document-seen",
        label: "A document I have seen: birth certificate, hospital record, baby book",
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
    note: "The amount of precision that matters depends on the chart and the technique. This is not a test you can fail.",
    options: [
      { value: "minute", label: "To the minute" },
      { value: "quarter", label: "To within about fifteen minutes" },
      { value: "hour", label: "To within about an hour" },
      {
        value: "part-of-day",
        label: "A part of the day: morning, after lunch, overnight",
      },
      { value: "none", label: "No idea at all" },
    ],
  },
  {
    id: "agreement",
    legend: "Is there more than one version?",
    note: "If two times disagree, keep both. The disagreement is useful information rather than something to hide by choosing one too early.",
    options: [
      { value: "single", label: "No: one time, one source" },
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
      "Written on a birth certificate, hospital record, or contemporaneous document you have seen.",
    means:
      "You have a contemporaneous record rather than a later recollection. That gives the time a stronger evidentiary basis, especially when you also know which document it came from.",
    uncertain:
      "A recorded time can still have been rounded, copied, or entered incorrectly. Keep the source attached to the time rather than treating the number as more precise than the record itself supports.",
    nextStep:
      "Write down the time together with the document it came from and bring both pieces of information to the reading.",
    worksheet: {
      anchor: "preparing",
      label: "Toolkit §8: Preparing for your reading",
    },
    reading:
      "Yes. A documented time gives a stronger basis for using the ascendant, angles, and houses, while still respecting whatever precision the record actually provides.",
    sendMo: "“Birth time from [which document]. Confidence: documented.”",
    primaryAction: "book",
  },
  "strongly-remembered": {
    id: "strongly-remembered",
    label: "Strongly remembered",
    definition:
      "One consistent account from someone who was there, anchored to an event as well as a time.",
    means:
      "A consistent first-hand recollection is useful evidence, especially when the person remembers what else was happening around the birth rather than only a clock time.",
    uncertain:
      "Memory can be approximate even when it feels vivid. The amount that matters depends on whether the possible range changes the rising sign, angles, house placements, or another time-sensitive technique.",
    nextStep:
      "If a fuller birth or hospital record may still exist, check for it. Otherwise keep the remembered time together with who supplied it and what event anchors the memory.",
    worksheet: {
      anchor: "record-search",
      label: "Toolkit §2: Record search checklist",
    },
    reading:
      "Yes. Tell me that the time is remembered rather than recorded and, if you can, give me the approximate range as well as the source of the memory.",
    sendMo:
      "“Time remembered by [who], anchored to [what]. Confidence: strongly remembered.”",
    primaryAction: "toolkit",
  },
  approximate: {
    id: "approximate",
    label: "Approximate",
    definition:
      'A window rather than an exact time: "sometime in the morning" or "between two and four".',
    means:
      "A time window is real information. It lets us see which chart features stay stable across the range and which ones change as the possible birth time moves.",
    uncertain:
      "The rising sign, exact ascendant and other angles, and house placements may change within the range. The Moon can also move enough for its degree, and occasionally its sign, to differ across a wider window.",
    nextStep:
      "Ask about the shape of the day as well as the clock. Light or dark, before or after a meal, a work shift, or another remembered event may help narrow the range without inventing precision.",
    worksheet: {
      anchor: "family-interview",
      label: "Toolkit §3: Family interview",
    },
    reading:
      "Yes. Bring the range rather than replacing it with a midpoint nobody actually reported. We can work with what stays stable and label what remains uncertain.",
    sendMo:
      "“Birth time somewhere between [X] and [Y]. Confidence: approximate.”",
    primaryAction: "toolkit",
  },
  conflicting: {
    id: "conflicting",
    label: "Conflicting",
    definition: "More than one candidate, none clearly better. Keep and share them all.",
    means:
      "You have more than one candidate time and no clear reason yet to choose one. Keeping the conflict visible is more useful than turning one candidate into an exact time prematurely.",
    uncertain:
      "The candidates may produce the same rising sign and still differ in exact angles or house placements. Whether the difference matters depends on the chart, the house system, and the technique being used.",
    nextStep:
      "Write down every candidate with its source and confidence level. A contemporaneous record will usually carry more weight than a later recollection, but keep contradictions visible rather than treating any source as infallible.",
    worksheet: {
      anchor: "when-times-disagree",
      label: "Toolkit §4: When times disagree",
    },
    reading:
      "Yes. Send me the candidate times and their sources. I would rather begin with a clear uncertainty than hide it behind one tidy-looking number.",
    sendMo:
      "“Two candidate times, from [source A] and [source B], which disagree. Confidence: conflicting.”",
    primaryAction: "toolkit",
  },
  unknown: {
    id: "unknown",
    label: "Unknown",
    definition:
      "No usable time information. Say so plainly so the chart can be handled accordingly.",
    means:
      "An unknown time removes the reliable ascendant, angles, and house structure, but it does not remove every usable part of the chart. Planetary signs and many aspects can remain available when their positions are stable across the day.",
    uncertain:
      "The Moon moves quickly enough that its degree is uncertain and, on some dates, its sign can change. Which other techniques remain appropriate depends on the chart and on how time-sensitive the method is.",
    nextStep:
      "Check the records you can reasonably access, beginning with any fuller birth certificate or hospital record that may exist. If the time remains unknown, keep it labelled unknown rather than filling the gap with a guess.",
    worksheet: {
      anchor: "if-it-stays-unknown",
      label: "Toolkit §6: If it stays unknown",
    },
    reading:
      "Yes, with limits stated clearly. A useful reading can stay with the chart factors that are reliable and avoid claims that depend on an exact birth time.",
    sendMo: "“No birth time available. Confidence: unknown.”",
    primaryAction: "toolkit",
  },
};

/**
 * Answers to a label. Deterministic and explainable; there is no numerical
 * score. Conflict is handled before precision so contradictory times remain
 * visible rather than being silently promoted to a confident label.
 */
export function evaluate(answers: Answers): Result | null {
  const { source, precision, agreement } = answers;
  if (!source || !precision || !agreement) return null;

  if (agreement === "far" || agreement === "close") return RESULTS.conflicting;

  if (source === "unknown" || precision === "none") return RESULTS.unknown;

  if (
    source === "document-seen" &&
    (precision === "minute" || precision === "quarter")
  )
    return RESULTS.documented;

  if (
    (source === "document-seen" ||
      source === "document-described" ||
      source === "present") &&
    (precision === "minute" || precision === "quarter" || precision === "hour")
  )
    return RESULTS["strongly-remembered"];

  return RESULTS.approximate;
}

export const WORKSHEET_ANCHORS = Object.values(RESULTS).map(
  (r) => r.worksheet.anchor,
);

export const WORKSHEETS_PATH = WORKSHEETS;
