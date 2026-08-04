# Collecting testimonials

Everything here exists so that the testimonials on molumen.com are real, permissioned, and
attributed the way each client chose. Nothing else goes on that page.

## Why the rules are strict

Fabricated testimonials are illegal in the United States. The FTC's Consumer Reviews and
Testimonials Rule took effect on 21 October 2024, prohibits writing or disseminating a fake
consumer testimonial, applies explicitly to small businesses, and authorises courts to impose civil
penalties for knowing violations. That is the legal floor.

The practical reason matters more. Mo's practice runs on referral, which means her clients talk to
each other. An invented quote is one conversation away from being noticed, and it would undermine
the one thing the whole site is built to demonstrate: that she says what is true and marks the
limits of what she knows.

## The ask

Send this to past clients individually — not as a bulk mailing. A message that reads as personal
gets a personal reply; a broadcast gets ignored. Adjust the first line for each person, because the
specific detail is what makes it land.

> **Subject:** A small favour, if you're willing
>
> Hi [Name],
>
> I've been thinking about your [natal / solar return / relationship] reading — [one specific,
> true detail: "the conversation about your tenth house and the job decision," "the timing question
> you brought about the move"]. I hope the year has unfolded kindly since.
>
> I'm asking a favour of a handful of past clients, and please feel completely free to say no — it
> won't change anything between us.
>
> I'm putting together a testimonials page for my new website, and I'd love to include a few honest
> sentences from you. Not a review, and definitely not superlatives. Three questions, and whatever
> you write in reply is plenty:
>
> - What were you carrying when you came to the reading?
> - What actually shifted, if anything?
> - Who would you send to me?
>
> If you're happy for me to publish it, just say so in your reply and tell me how you'd like to be
> named — first name and last initial, first name only, or something like "a client in Dallas."
> I'll use exactly what you choose, I'll show you the page before it goes live, and if you ever
> want it taken down, one email and it's gone that day.
>
> And if you'd rather not, genuinely, just ignore this one. I'm grateful either way.
>
> Warmly,
> Mo

## Why it's shaped that way

**Three questions, not "write a testimonial."** Most people freeze at a blank page and produce
either nothing or generic praise. Specific questions produce specific answers, and specific answers
are the ones that persuade a stranger.

**Permission to decline, stated twice.** It removes the social pressure that makes people either
avoid replying entirely or write something they don't mean. It also means a "yes" is worth
something.

**"What actually shifted, if anything?"** — the _if anything_ is deliberate. It invites an honest
answer rather than a required one, and honest answers read as honest.

**Attribution is theirs to choose.** Astrology is personal, and some clients will not want their
full name beside it. Offering the options up front prevents a yes turning into a no at the last
step.

**Permission and publication are separated from the reply.** They send words first, then confirm
publication. Both need to be in writing, because "she said it was fine on a call" is not a record.

## A shorter version for recent clients

For someone whose reading was in the last month or two, the long version is too much apparatus.

> Hi [Name],
>
> Hope the [reading type] has been settling in usefully.
>
> Quick one: I'm building a testimonials page for the new site. If you felt like sending me two or
> three honest sentences about the reading, I'd be glad to include them — and equally glad if you'd
> rather not.
>
> If yes, let me know how you'd like to be named. Anything from "Sarah M." to "a client in Fort
> Worth" works.
>
> Thank you either way,
> Mo

## When a reply comes in

**1. Confirm permission in writing** if they didn't say so explicitly. One line is enough: _"Thank
you — may I publish this on the site, and how would you like to be named?"_ Keep the reply.

**2. Don't rewrite it.** Fix a typo, trim a wandering sentence, keep their words. If it needs
substantive editing to be usable, ask them instead — the edited version is no longer their
testimonial.

**3. Add it** to `src/content/testimonials/testimonials.json`:

```json
{
  "id": "sarah-m-natal-2026",
  "quote": "Their actual words, unedited.",
  "attribution": "Sarah M.",
  "service": "natal",
  "approved": true,
  "permissionNote": "Written permission by email, 2026-08-15; chose 'Sarah M.' as attribution."
}
```

`approved: false` renders nothing. `permissionNote` is the record of how permission was
established — fill it in properly, since it is the thing that would matter if anyone ever asked.

**4. Show them the page** before or just after it goes live, as promised in the email.

The `/testimonials/` page automatically drops its `noindex` and switches from the
what-you-can-verify layout to the quotes layout as soon as one approved testimonial exists. No code
change needed.

## Making this systematic

The reliable long-term fix is not a one-off campaign. Add a follow-up step to the Cal.com workflow
for each reading — an email a week or two afterwards that thanks the client, checks how things have
settled, and asks the three questions. A steady trickle of real testimonials beats a burst that ages
badly, and it catches people while the reading is still vivid.

## What never happens

No testimonial written by anyone who was not a client. No composites assembled from several
people's words. No "representative examples." No praise lifted from a private message, a review
site, or a conversation without asking. No AI-written testimonial, including one modelled on real
ones — that is the same act with extra steps.

If the page is empty, it says so and explains why. An honest empty page costs less than a
dishonest full one.
