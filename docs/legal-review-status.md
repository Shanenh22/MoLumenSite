# Legal documents — status and residual risk

**Last updated:** 2026-08-03
**Status:** published, owner-approved, **not reviewed by an attorney**

## What changed on 2026-08-03

All five legal pages were rewritten and substantially expanded. Every `[OWNER CONFIRM]` placeholder
was resolved from decisions supplied by the site owner's representative, and the "draft for attorney
review" banners were removed at their explicit request. `reviewStatus` in each file's frontmatter
moved from `attorney-review-required` to `owner-approved`.

`owner-approved` means what it says: the owner side approved publication. It does **not** mean a
lawyer read these. This file exists so that fact stays on the record rather than disappearing with
the banner.

The banner mechanism itself is intact in `src/components/LegalPage.astro` — setting any document's
`reviewStatus` back to `attorney-review-required` restores its notice.

## Decisions supplied by the owner side

| Question                           | Answer given                                        | Where it landed       |
| ---------------------------------- | --------------------------------------------------- | --------------------- |
| Cancellation / rescheduling window | 48 hours                                            | booking policy, terms |
| Inside-window cancellation outcome | Credit toward a future session                      | booking policy, terms |
| Governing law and venue            | Texas; Collin County                                | terms                 |
| Privacy scope                      | Worldwide — CCPA/CPRA and GDPR/UK-GDPR both covered | privacy               |

Terms not supplied but written from established site facts: credit validity of twelve months, the
15-minute late-arrival grace, the five-to-ten-business-day refund window, and liability capped at
the amount paid for the reading in question. These are conventional defaults, not owner decisions —
**flag them to Mo before launch** so she is not bound by a term she never chose.

## What was fixed as a factual error, not a policy change

The booking policy documented a **horary email reading service that does not exist**. It was
inherited from the Mo1 prototype and survived the earlier service-list correction. The section is
removed.

`/how-readings-work/` carried the same problem in prose — it told visitors with an unknown birth
time that horary readings needing no birth data were available. That sentence now describes the real
workaround documented on `/prepare-for-your-reading/`.

Horary now appears only where it is true: as a credential (STA Practitioner's Certificate) and as a
glossary entry.

## Residual risk — the parts that actually matter

Removing the banner changed the presentation, not the exposure. Three clauses carry real weight and
none has been read by a lawyer:

**Limitation of liability** (terms). Caps liability at the amount paid. Enforceability varies by
jurisdiction, and consumer-protection law in several places overrides caps of this kind. The clause
includes the standard carve-outs, but whether it holds in Texas for a service business is a question
for counsel.

**Governing law and venue** (terms). Texas / Collin County, with a carve-out preserving mandatory
EEA and UK consumer protections. A US venue clause is frequently unenforceable against consumers in
those jurisdictions, which matters because readings are sold worldwide.

**GDPR positioning** (privacy). The policy states legal bases and grants data-subject rights. If Mo
genuinely markets to and takes EU or UK clients, an Article 27 representative may be required, and
no such representative is named because none exists. This is the most likely gap to be raised by a
regulator, and the least likely to be raised by a client.

Two smaller points. The policy grants CCPA-style rights while noting the practice falls below the
statutory thresholds — that framing is deliberate, so no false claim of covered-business status is
made while the rights are still extended. And no physical postal address appears anywhere, because
none was supplied; some privacy frameworks expect one.

## Recommendation

An hour of a small-business attorney's time in Texas, reviewing the terms' liability and venue
clauses and confirming the privacy policy against Mo's actual client geography, would close nearly
all of this. That is a modest cost against the exposure, and it is a smaller job now that the
documents are complete and specific rather than full of placeholders.

Until that happens, this file — not a banner on the site — is the record that it has not been done.
