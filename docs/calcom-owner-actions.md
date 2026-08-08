# Cal.com owner actions

Three things on this list cannot be fixed from the repository. They are settings inside Mo's
Cal.com account, and the site cannot reach them — so they are written out here rather than faked in
code.

**Everything below was measured against the live account on 2026-08-08**, by reading the public
booking pages for all nine event types. Where this document quotes a current setting, that is what
the account actually returns today, not an assumption.

Status of each item:

| # | Item | Severity | Where it is fixed |
| - | ---- | -------- | ----------------- |
| 1 | Meeting location says "Somewhere else" | **Blocks launch** | Cal.com, 9 event types |
| 2 | No intake questions anywhere | **Blocks launch** | Cal.com, 3 event types |
| 3 | Quick Check-In description is the wrong reading's copy | High | Cal.com, 1 event type |

Items 1 and 2 are marked as blocking because the website already makes a promise about each one.
Until they are done, `/how-readings-work/`, the homepage "How it works" steps and five service
records describe a booking experience that does not exist. The repository copy is correct for the
target configuration; the configuration is what is missing.

---

## 1. Meeting location — every event type says "Somewhere else"

### What the site tells people

Every reading on molumen.com lists its format as **Zoom · Phone**. That comes from the `format`
field in `src/content/services/*.json` and it renders on the readings hub, the comparison table and
all seven reading pages.

### What Cal.com actually asks

Measured on all nine event types — `natal-60`, `natal-90`, `relationship`, `clarity`,
`clarity-3mo`, `solar-return`, `life-changes`, `quick-check-in`, `monthly-transits`:

```
locations: [{ "type": "somewhereElse" }]
```

That is Cal.com's **Custom attendee location**. On the booking form it renders as a required
free-text box labelled **"Somewhere else"** with the placeholder **"Any location"**, and the
attendee has to type something into it before they can pay.

So the last question before a stranger enters their card details is an open-ended request to name a
location for a video call the site has already told them is on Zoom or the phone. There is no
version of that a first-time buyer answers confidently.

### What to change

For **each of the nine event types**:

1. Go to <https://app.cal.com/event-types>.
2. Click the event type.
3. Stay on the **Setup** tab (it opens there).
4. Find the **Location** section. It currently shows one entry: **Custom attendee location**.
5. Click the **X** / remove icon on that entry.
6. Click **Add a location** and choose **Zoom Video**.
   - If Zoom does not appear in the list, it needs installing first: **Apps → App Store → Zoom →
     Install**, and authorise the Zoom account. Do that once and it becomes available on every
     event type.
   - If Mo prefers a fixed personal meeting room instead of Cal generating one per booking, choose
     **Link meeting** and paste her permanent Zoom room URL.
7. Click **Add a location** again and choose **Attendee phone number**.
   - This is the right one for the phone option: Cal asks the attendee for *their* number and Mo
     calls them. Do **not** pick "Organizer phone number" — that publishes Mo's number to everyone
     who opens the booking page.
8. Click **Save**.

With two locations configured, Cal.com replaces the free-text box with a radio group reading
**"Where should we meet?" → Zoom / Phone**, which is exactly what the site promises.

### Do not

Do not add a third meeting type. In-person DFW sessions are mentioned on `/how-readings-work/` and
in the FAQs as *by arrangement*, which is a conversation with Mo, not a self-service option — adding
"In Person (Attendee Address)" here would turn an occasional arrangement into a standing offer that
nothing else on the site supports.

---

## 2. Intake — the form the site promises does not exist

### What the site tells people

Four separate surfaces describe an intake form:

- `src/pages/index.astro` — step 4 of "How it works": *"Share — Send your birth details and
  questions through the intake form."*
- `src/pages/how-readings-work.astro` — *"When you book, you'll choose a time … pay securely
  online, and answer a short intake form: your birth details, what's bringing you in, and any
  questions you already know you want to ask."*
- `natal.json`, `life-changes.json`, `solar-return.json`, `quick-check-in.json` — *"You direct the
  focus in advance through the intake form."*
- `/book/` — *"What happens after you book."*

### What Cal.com actually asks

Measured on all nine event types. The booking form has **no custom questions at all**. It is
Cal.com's stock system fields only:

| Field | Internal name | Required |
| ----- | ------------- | -------- |
| Your name | `name` | yes |
| Email address | `email` | yes |
| Phone number | `attendeePhoneNumber` | no |
| "Somewhere else" | `location` | yes, in practice (see item 1) |
| **What is this meeting about?** | `title` | **yes** |
| Additional notes | `notes` | no |
| Add guests | `guests` | no |

No birth date. No birth time. No birthplace. Nothing about what the client wants to explore, except
whatever they choose to type into a generic "Additional notes" box.

Two consequences, and the second is the expensive one:

- The client is told to send birth details through a form and is then never asked for them, so they
  finish paying unsure whether the booking is actually complete.
- Mo has to chase birth date, exact time and birthplace by email for **every single booking**,
  before she can cast a chart.

### What to change

Booking questions live at: **Event type → Advanced tab → Booking questions → Add a question**.

The questions differ by reading, deliberately. A returning client should not be asked to re-enter a
birth time Mo already has on file.

#### 2a. `natal-60` and `natal-90` — add four questions

| Label | Type | Required | Notes |
| ----- | ---- | -------- | ----- |
| Birth date | Short text | Yes | Placeholder: `12 April 1988` |
| Do you know your birth time? | Radio | Yes | Options exactly: `Yes — from a certificate or reliable record` / `Roughly — I know the part of the day` / `No, and I'm not sure where to find it` |
| Birth time, if you have it | Short text | **No** | Placeholder: `3:42pm — leave blank if you're not sure` |
| Birthplace (city and country) | Short text | Yes | Placeholder: `Austin, USA` |
| What would you most like to explore? | Long text | No | Placeholder: `Two or three real questions you're living with` |

**The birth-time question must stay optional and must keep its "No" option.** An unknown birth time
is not a reason a qualified customer cannot book — the site says so in three places, the Reading
Finder is built around saying so kindly, and there is an entire page (`/birth-time/`) and a lead
magnet about it. A required birth-time field would turn the site's most carefully handled objection
into a hard stop at the payment screen.

#### 2b. `relationship` — the same, twice

The Relationship Consultation reads both charts, and `relationship.json` already records
`birthDataRequired: "both"`. Add the same five fields prefixed **"Person A"**, then the same five
prefixed **"Person B"**. Only the two birth dates, the two time-status radios and the two
birthplaces are required.

#### 2c. `clarity`, `clarity-3mo`, `solar-return`, `life-changes`, `quick-check-in`, `monthly-transits` — one question only

These are established-client readings. Mo already has the chart. Asking for birth data again reads
as an office that does not keep records.

Add exactly one question, worded to match what each service record already says it needs:

| Event type | Label | Type | Required |
| ---------- | ----- | ---- | -------- |
| `clarity`, `clarity-3mo` | What would you like to go deeper on? | Long text | Yes |
| `solar-return` | What's your focus for the year ahead? | Long text | No |
| `life-changes` | What transition are you navigating? | Long text | Yes |
| `quick-check-in` | Your one topic — specific beats broad | Long text | Yes |
| `monthly-transits` | Anything you'd like me to watch for? | Long text | No |

#### 2d. Turn off "What is this meeting about?" on every event type

Same **Advanced → Booking questions** list. The `title` field is currently **required** and is the
vaguest question on the form — a person who has just chosen "Natal Chart Reading — 90 minutes" has
already answered it. Click the toggle to hide it. The questions above replace it with something
that actually helps Mo prepare.

### On collecting this before payment

Cal.com's booking questions are part of the booking form, so they are answered *before* the card
screen. That is more pre-payment friction than the ideal, and the brief prefers substantial intake
after commitment.

The trade is still worth taking as written, for two reasons: the fields above replace a required
field that is already there (`title`) and a required free-text location box (item 1), so the form
gets **shorter**, not longer; and Cal.com has no native "ask after payment" step, so the only
alternative is a post-booking email.

If Mo would rather keep the booking form to name and email, the alternative is:

- **Workflows → New → Trigger: "After event is booked" → Action: "Send email to attendee"**, with
  the questions in the body and a request to reply.

That keeps the booking screen minimal but makes the intake a manual exchange Mo has to chase, which
is the problem this item exists to fix. **This is Mo's call, not a technical one.** A third-party
form service is a third option and is deliberately not recommended here — it would be a new vendor
handling birth data, which is a privacy decision that needs its own review and a change to
`/privacy/`.

### After this is configured

No repository change is needed. The site copy already describes this correctly. Re-read
`/how-readings-work/` once it is live and confirm the sequence matches.

---

## 3. Quick Check-In shows the wrong reading's description

### Current, measured on `cal.com/molumen/quick-check-in`

> A standing 30-minute Zoom each month on how the month's planetary movements resonate with your
> personal chart — individualized, not a general forecast.

That is the **Monthly Personal Transits** description, character for character. It is on the wrong
event.

Anyone who deep-links from `/readings/quick-check-in/` — where the page describes a single-topic
consultation — lands on a calendar describing a monthly standing appointment at a different price.
Two contradictory descriptions of the same $60 purchase, one of them on the payment screen.

### What to change

1. <https://app.cal.com/event-types> → **Quick Check-In — One Topic**.
2. **Setup** tab → the **Description** field.
3. Replace the entire contents with the text below, which is the `purpose` field from
   `src/content/services/quick-check-in.json` — the copy already published on the site, unchanged:

```
One area of life suddenly chaotic — or one place you want to grow? Thirty focused minutes on how your astrological influences are affecting that single topic.
```

4. Click **Save**.

### While you are there

Check that **Monthly Personal Transits** still has its own description and that the copy was moved
rather than shared. As of this measurement it reads correctly.

---

## Checklist

- [ ] Zoom app installed in Cal.com (once)
- [ ] Location changed from "Custom attendee location" to Zoom + Attendee phone number on all 9 event types
- [ ] Intake questions added to `natal-60`, `natal-90`
- [ ] Intake questions added to `relationship` (Person A / Person B)
- [ ] Single focus question added to the 6 follow-up event types
- [ ] "What is this meeting about?" hidden on all 9 event types
- [ ] Quick Check-In description replaced
- [ ] One test booking made end to end, on a hidden/duplicate event type so no real payment is taken

The last line matters. None of this is verifiable from the repository, and the booking form is the
one screen on this funnel that nothing in CI can see.
