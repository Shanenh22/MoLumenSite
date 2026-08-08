import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

/** Existing readings only — never add a service here without owner confirmation. */
const services = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/services" }),
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    slug: z.string(),
    purpose: z.string(), // plain-English, visitor language
    method: z.string(), // astrological method
    bestFor: z.array(z.string()),
    notFor: z.array(z.string()),
    durationMinutes: z.number().nullable(), // null = written/async
    durationLabel: z.string(),
    price: z.number().nullable(), // base/lowest price; null until owner confirms
    priceConfirmed: z.boolean().default(false), // unconfirmed prices render with a visible label
    priceLabel: z.string().optional(), // display override, e.g. "$150 (60 min) · $200 (90 min)"
    options: z
      .array(
        z.object({
          label: z.string(), // e.g. "90 minutes — the full tour"
          durationLabel: z.string(),
          price: z.number(),
          bookingEventId: z.string().default(""),
          note: z.string().optional(),
        }),
      )
      .default([]), // variants of the same reading (e.g. 60/90-minute natal)
    audience: z.enum(["new", "established", "any"]).default("any"), // who may book
    currency: z.string().default("USD"),
    format: z.array(z.string()), // e.g. ["Zoom", "Phone", "In person (DFW, by inquiry)"]
    birthDataRequired: z.enum(["none", "self", "both"]),
    intakeRequirements: z.array(z.string()),
    includes: z.array(z.string()),
    deliverables: z.array(z.string()),
    preparation: z.array(z.string()),
    cancellationPolicy: z.string(),
    reschedulingPolicy: z.string(),
    bookingEventId: z.string().default(""), // Cal.com event slug
    related: z.array(z.string()).default([]),
    relatedLearn: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    available: z.boolean().default(true),
    ownerReview: z.boolean().default(true), // Phase 4 flag
  }),
});

/** Mo's blog: essays, guides, and anything she writes that isn't a dated sky event. */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    /** Key from src/config/images.ts `scenes` — optional; a default is used if omitted. */
    heroImage: z.string().optional(),
    featured: z.boolean().default(false),
    related: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    ownerReview: z.boolean().default(true),
  }),
});

const skyEvents = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/sky-events" }),
  schema: z.object({
    title: z.string(),
    eventType: z.enum([
      "lunation",
      "eclipse",
      "retrograde",
      "ingress",
      "aspect",
      "other",
    ]),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    timezone: z.string().default("America/Chicago"),
    planets: z.array(z.string()).default([]),
    sign: z.string().optional(),
    summary: z.string(), // informational
    interpretation: z.boolean().default(false), // true when body contains Mo's take
    featured: z.boolean().default(false),
    displayThrough: z.coerce.date().optional(),
    sourceNote: z.string().default(""),
    lastVerified: z.coerce.date(),
    draft: z.boolean().default(false), // CMS-safe work-in-progress flag
    ownerReview: z.boolean().default(true),
  }),
});

const videos = defineCollection({
  loader: file("./src/content/videos/videos.json"),
  schema: z.object({
    id: z.string(),
    platform: z.enum(["youtube", "instagram"]),
    externalId: z.string(), // YouTube video ID or Instagram URL
    title: z.string(),
    description: z.string(),
    category: z.enum([
      "current-sky",
      "astrology-basics",
      "relationships",
      "personal-purpose",
    ]),
    thumbnail: z.string().optional(),
    publishedDate: z.coerce.date(),
    durationSeconds: z.number().optional(),
    featured: z.boolean().default(false),
    transcriptStatus: z.enum(["none", "summary", "full"]).default("none"),
    related: z.array(z.string()).default([]),
    draft: z.boolean().default(false), // CMS-safe work-in-progress flag
  }),
});

const glossary = defineCollection({
  loader: file("./src/content/glossary/terms.json"),
  schema: z.object({
    id: z.string(),
    term: z.string(),
    definition: z.string(),
    related: z.array(z.string()).default([]),
    learnLink: z.string().optional(),
  }),
});

/**
 * There is deliberately no `explore` collection.
 *
 * One was declared here, and mapped in `.pages.yml` as an "Astrology reference
 * library" editor, but `src/content/explore/` has never existed — not on disk
 * and not anywhere in git history — and `getCollection('explore')` was never
 * called. It produced a build warning, and a Pages CMS section Mo could open
 * and find empty. `docs/pages-cms-for-mo.md` gave her step-by-step instructions
 * for editing pages through it.
 *
 * The reference library is 25 hand-written `.astro` pages under
 * `src/pages/explore/`. Making them genuinely CMS-editable means migrating them
 * to markdown, and they carry components (`Layers`, `FurtherReading`),
 * per-page structured data and hand-placed inline links that have to stay in
 * step with the prose — the same reason the changelog gives for not rushing the
 * `/birth-time/` body into a collection. That migration is on the backlog as
 * its own task with its own verification pass.
 *
 * Until it happens, declaring the collection claimed a capability that did not
 * exist. Removed rather than pointed at an empty directory, because an empty
 * CMS editor is worse than an absent one: it looks like something Mo did wrong.
 */

/** Genuine, permissioned testimonials only. Unapproved entries never render in production. */
const testimonials = defineCollection({
  loader: file("./src/content/testimonials/testimonials.json"),
  schema: z.object({
    id: z.string(),
    quote: z.string(),
    attribution: z.string(), // "First L." — never invent an initial
    service: z.string().optional(),
    approved: z.boolean().default(false),
    permissionNote: z.string(), // how permission was established
  }),
});

const faqs = defineCollection({
  loader: file("./src/content/faqs/faqs.json"),
  schema: z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
    scope: z.string().default("global"), // 'global' or a service slug
    order: z.number().default(0),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: "*.{md,mdx}", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedDate: z.coerce.date(),
    reviewStatus: z
      .enum(["attorney-review-required", "owner-approved", "reviewed"])
      .default("attorney-review-required"),
  }),
});

/** Future products — defined now, populated only when real offerings exist. */
const courses = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/courses" }),
  schema: z.object({
    name: z.string(),
    type: z.enum(["recorded", "live"]),
    status: z.enum(["planned", "waitlist", "open"]),
    description: z.string(),
    price: z.number().nullable(),
  }),
});
const guides = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/guides" }),
  schema: z.object({
    name: z.string(),
    status: z.enum(["outline", "draft", "published"]),
    description: z.string(),
    file: z.string().nullable(),
  }),
});

export const collections = {
  services,
  blog,
  skyEvents,
  videos,
  glossary,
  testimonials,
  faqs,
  legal,
  courses,
  guides,
};
