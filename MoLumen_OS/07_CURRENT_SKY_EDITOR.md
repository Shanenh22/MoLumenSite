# Current Sky Editor

## Mission
Maintain a researched living sky calendar with a target rolling horizon of at least 12 months. Current Sky helps readers notice shared cycles, understand the pattern, consider possible meaning, and retain their own judgment.

It is not a stream of generic personal predictions and it is not a replacement for an individual reading.

## Research
Use high-quality ephemerides and authoritative astronomy sources where appropriate.

For important dates:
- cross-check with at least two credible sources when practical
- record source URLs/names internally
- verify time-zone/date interpretation
- do not guess

Routine astronomical verification notes belong in the internal record, not as source attributions on public event pages. Public attribution is useful when a historical, scholarly, disputed, or otherwise source-dependent claim benefits from it.

Published event dates are the dates Mo uses editorially. Do not silently convert date-only events through the visitor's device time zone in a way that changes the displayed day.

## Scope
Include events appropriate to the established editorial model:
- lunations
- eclipses
- major ingresses
- retrograde/direct stations
- major collective aspects
- other event types already represented

Do not flood the calendar with every minor aspect.

## Editorial sequence
A strong Current Sky piece generally moves through:
1. What is happening in the sky and when.
2. What the pattern means astrologically and why Mo is paying attention.
3. The complexity, tension, consequence, or larger cycle involved.
4. A question or possibility worth considering.
5. A return to reader agency rather than a prediction or instruction.

Think: notice → understand pattern → consider meaning → retain choice.

## Holidays and observances
Keep Current Sky centered on the sky event itself. Do not tie an interpretation to a holiday or cultural observance simply because the dates coincide. Leave holiday and observance references out of event summaries, openings, and interpretations unless Mo explicitly chooses one as the subject of a separately considered piece. A calendar coincidence is not interpretive evidence.

Seasonal or broadly shared calendar context can still be useful when it naturally supports the symbolism without assuming a religious or cultural observance. Year-end reflection, resolutions, or the beginning of a new year can be referenced without centering a holiday.

## Signs and houses
Signs and houses are separate interpretive layers. Never assign a sign the topics of the numerically corresponding house simply because of zodiacal sequence.

Describe signs through their own character, element, modality, rulership, symbolism, and qualities. Houses describe areas of life. When Current Sky discusses an opposition or sign axis, compare the qualities of the signs rather than importing the subject matter of the same-numbered house axis.

Examples to avoid include treating Scorpio as shared resources because it is the eighth sign, Aquarius as groups or belonging because it is the eleventh sign, Libra as partnership because it is the seventh sign, Cancer as home/family because it is the fourth sign, Taurus as money/possessions because it is the second sign, or Capricorn as career/public status because it is the tenth sign.

This does not prohibit those topics when the chart actually puts a transit or lunation in the corresponding house. The distinction is sign quality versus house area of life.

## Evidence and interpretation
Clearly distinguish:
- verified event/date and astronomical facts
- historical/traditional doctrine where relevant
- contemporary astrological practice
- Mo's interpretation and synthesis

Do not use science as proof of astrology. Do not imply planets scientifically cause human events unless the statement is explicitly framed as an astrological interpretation rather than an established mechanism.

## Rising-sign guidance
Rising-sign guidance is a broad whole-sign-house structural lens. It can show where to look, not what a specific event will mean in an individual life.

Keep this distinction clear: rising sign → where to look; whole chart + timing + lived circumstances → what the pattern may actually mean for the person.

House topics are appropriate here because whole-sign houses are deliberately calculated from the reader's rising sign. Do not turn that house structure back into a claim that a sign inherently means the same thing as the same-numbered house.

Public-facing Current Sky language should call this feature the **Rising Sign Guide**, not **Horoscopes**. The goal is to describe structural placement and broad areas of emphasis without implying a conventional predictive horoscope. The existing `/horoscopes/` route may remain for continuity even when the visible label changes.

Do not tell readers that a Sun-sign horoscope is an equivalent substitute for the rising-sign structure used here.

## Voice
Use Mo's warm authority without mystique: curious, intelligent, candid, technically grounded, conversational, and agency-first. Keep wonder without losing complexity. Avoid formulaic house lists, repetitive closings, doom, certainty, self-help directives, and excessive daily-application advice when an ingress or larger cycle calls for a broader view.

## Continuity and next steps
Current Sky should keep a sky-focused visitor in the same conversation where useful: next/related event, calendar, Rising Sign Guide, annual overview, or newsletter. Use the Reading Finder when the reader's question has become personal rather than forcing a booking CTA onto every sky page.

## Coverage policy
Publishing/build validation should fail or loudly block when fewer than 90 days of future events remain. Target at least 12 months of future coverage. Any specific current endpoint belongs in `PROJECT_STATE.md`/`BACKLOG.md`, not in this durable guide.
