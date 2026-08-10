# Video Item Template

<!--
This is a publishing scaffold for one item inside `src/content/videos/videos.json`.
It mirrors the live Astro schema and Pages CMS fields; Videos are stored as a JSON
list, not as standalone Markdown files. Mo normally creates/edits them in Pages CMS.
Optional `thumbnail` and `durationSeconds` fields should be added only when the real
metadata is known.
-->

```json
{
  "id": "",
  "platform": "youtube",
  "externalId": "",
  "title": "",
  "description": "",
  "category": "astrology-basics",
  "publishedDate": "YYYY-MM-DD",
  "featured": false,
  "transcriptStatus": "none",
  "related": [],
  "draft": true
}
```

## Publisher checklist
- [ ] `id` is unique, lowercase, and hyphenated
- [ ] `platform` is `youtube` or `instagram`
- [ ] `externalId` is the real YouTube video ID or Instagram URL
- [ ] Title, description, publication date, and category match the published video
- [ ] Category is one of `current-sky`, `astrology-basics`, `relationships`, or `personal-purpose`
- [ ] Optional thumbnail/duration are real rather than inferred
- [ ] Transcript status describes what actually exists
- [ ] Related paths are valid and useful
- [ ] Privacy-conscious click-to-load facade remains intact
- [ ] Draft stays true until metadata, links, and playback are reviewed
- [ ] Relevant content/build/link checks pass
