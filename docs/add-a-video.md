# Add a Video

Videos live in one file: `src/content/videos/videos.json` (an array).

## YouTube

```json
{
  "id": "eclipse-august-2026",
  "platform": "youtube",
  "externalId": "dQw4w9WgXcQ",
  "title": "The August Eclipse, Plainly",
  "description": "What this eclipse season actually asks of you.",
  "category": "current-sky",
  "publishedDate": "2026-08-05",
  "featured": true,
  "transcriptStatus": "none"
}
```

`externalId` is the 11-character YouTube video ID (the part after `watch?v=`). The thumbnail is fetched automatically; the player loads only when a visitor clicks (privacy-enhanced youtube-nocookie).

## Instagram

Same shape with `"platform": "instagram"` and `"externalId": "https://www.instagram.com/reel/…/"`. Instagram videos display as clearly-labeled links that open Instagram — no tracking embed.

`category` must be one of: `current-sky`, `astrology-basics`, `relationships`, `personal-purpose`.
