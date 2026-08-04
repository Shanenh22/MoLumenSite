# Cal.com event type setup — exact values

Nine event types to create at **cal.com/molumen**. Each block below maps to the "Add a new meeting
type" dialog: **Title**, **URL**, **Duration**, and leave the type as **For myself**.

The **URL slug must match exactly.** The site builds booking links as
`cal.com/molumen/<slug>`, so a mismatch sends a client to a 404 at the moment they were ready to
pay. Cal.com auto-fills the slug from the title — "Natal Chart Reading — 90 minutes" becomes
`natal-chart-reading-90-minutes`, which is **wrong**. Clear the URL field and type the slug given
here.

Price and description are set _after_ the event is created, on its settings page. Price requires the
Stripe app to be installed first (Apps → Stripe).

---

## 1 · Natal Chart Reading — 90 minutes

| Field        | Value                              |
| ------------ | ---------------------------------- |
| **Title**    | `Natal Chart Reading — 90 minutes` |
| **URL**      | `natal-90`                         |
| **Duration** | `90`                               |
| **Price**    | `200` USD                          |

**Description:** Your whole birth chart, interpreted with you — the positions and connections of the
planets, and what the current sky is stirring in your life right now. Recommended for first
readings: room for the whole chart and your questions.

---

## 2 · Natal Chart Reading — 60 minutes

| Field        | Value                              |
| ------------ | ---------------------------------- |
| **Title**    | `Natal Chart Reading — 60 minutes` |
| **URL**      | `natal-60`                         |
| **Duration** | `60`                               |
| **Price**    | `150` USD                          |

**Description:** Your whole birth chart, interpreted with you — the positions and connections of the
planets, and what the current sky is stirring in your life right now.

---

## 3 · Relationship Astrology Consultation

| Field        | Value                                 |
| ------------ | ------------------------------------- |
| **Title**    | `Relationship Astrology Consultation` |
| **URL**      | `relationship`                        |
| **Duration** | `90`                                  |
| **Price**    | `275` USD                             |

**Description:** Both natal charts, examined together — an honest gauge of compatibility: where
affinity flows, where friction lives, and how each of you communicates and feels cared for.

**Note:** this one needs birth details for **both** people. Add the second person's birth date,
time and place as intake questions on this event only.

---

## 4 · Solar Return Reading

| Field        | Value                  |
| ------------ | ---------------------- |
| **Title**    | `Solar Return Reading` |
| **URL**      | `solar-return`         |
| **Duration** | `60`                   |
| **Price**    | `130` USD              |

**Description:** Your yearly reading: when the Sun returns to its birth position near your birthday,
the rest of the sky has moved — new patterns, new themes, a new year to navigate.

---

## 5 · Life Changes Astrological Consultation

| Field        | Value                                    |
| ------------ | ---------------------------------------- |
| **Title**    | `Life Changes Astrological Consultation` |
| **URL**      | `life-changes`                           |
| **Duration** | `60`                                     |
| **Price**    | `130` USD                                |

**Description:** New job, new home, a change of direction — when life is in motion, this reading
shows which areas are being influenced and the themes emerging in the transition.

---

## 6 · Want More Clarity — within 3 months

| Field        | Value                                                 |
| ------------ | ----------------------------------------------------- |
| **Title**    | `Want More Clarity — within 3 months of your reading` |
| **URL**      | `clarity-3mo`                                         |
| **Duration** | `60`                                                  |
| **Price**    | `100` USD                                             |

**Description:** Go deeper into parts of your chart or future aspects after your natal reading — a
full hour to delve into whatever you'd like to discuss. Reduced rate within three months of your
natal reading.

---

## 7 · Want More Clarity — after 3 months

| Field        | Value                                   |
| ------------ | --------------------------------------- |
| **Title**    | `Want More Clarity — Follow-Up Reading` |
| **URL**      | `clarity`                               |
| **Duration** | `60`                                    |
| **Price**    | `130` USD                               |

**Description:** Go deeper into parts of your chart or future aspects after your natal reading — a
full hour to delve into whatever you'd like to discuss.

---

## 8 · Monthly Personal Transits

| Field        | Value                                |
| ------------ | ------------------------------------ |
| **Title**    | `Monthly Personal Transits — 1-on-1` |
| **URL**      | `monthly-transits`                   |
| **Duration** | `30`                                 |
| **Price**    | `75` USD                             |

**Description:** A standing 30-minute Zoom each month on how the month's planetary movements
resonate with your personal chart — individualized, not a general forecast.

---

## 9 · Quick Check-In — One Topic

| Field        | Value                        |
| ------------ | ---------------------------- |
| **Title**    | `Quick Check-In — One Topic` |
| **URL**      | `quick-check-in`             |
| **Duration** | `30`                         |
| **Price**    | `60` USD                     |

**Description:** One area of life suddenly chaotic — or one place you want to grow? Thirty focused
minutes on how your astrological influences are affecting that single topic.

---

## Established-clients-only readings

Six of the nine are for established clients: `life-changes`, `solar-return`, `clarity-3mo`,
`clarity`, `monthly-transits`, `quick-check-in`. The site labels them, but a label doesn't stop
anyone booking one.

If Mo wants that enforced, toggle those six to **hidden** in Cal.com. A hidden event still works at
its direct URL — so the site's booking page and any link she sends a returning client both function
— it simply doesn't appear on the public cal.com/molumen profile to someone browsing. New visitors
then see only the two natal readings and the relationship consultation, which is probably the right
first impression anyway.

Only `natal-90`, `natal-60` and `relationship` should stay visible.

## Settings to apply to every event

**Location:** Zoom, or Cal Video if she'd rather not manage Zoom. Auto-generated link.

**Buffers:** a 15-minute buffer after each event gives room to write up notes. A buffer before is
worth having on the 90-minute readings, since those need chart preparation.

**Minimum notice:** at least 48 hours. Every live reading needs the chart cast and studied
beforehand — a booking for tomorrow morning at 11pm tonight isn't deliverable. This also aligns with
the 48-hour cancellation window.

**Cancellation and rescheduling:** must match `/booking-policy/` — 48 hours, with the fee held as
credit inside that window. If Cal.com and the published policy disagree, the published policy is
what a client will hold Mo to.

## Intake questions

Add to every event: name, email, optional phone, **birth date**, **exact birth time**, birth-time
confidence, **birth city and country**, current location, optional pronouns, the focus question,
any context, prior experience with astrology, optional accessibility needs, a **required** consent
to the booking terms, and a **separate, never pre-checked** marketing consent.

The birth-time confidence question matters more than it looks. An unknown or approximate time
changes what Mo can responsibly say about the rising sign and houses, and it's better known before
the session than discovered during it.

## When the nine exist

Say so and every URL can be checked to confirm it resolves — a slug typo is invisible until a
client hits it.

## One data note for the repo

`src/content/services/natal.json` carries `durationMinutes: 90` at the service level, and its
options carry only a `durationLabel`. The site renders the label, so the displayed duration is
correct everywhere — but if per-option minutes are ever needed programmatically, the 60-minute
option will report 90. Not currently a bug; worth knowing before something else reads that field.
