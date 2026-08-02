# Content Editing Basics

All content is plain text. Two formats:

**JSON** (structured lists — services, FAQs, videos, glossary, testimonials). Rules: keep every quote mark and comma; strings in "double quotes"; no trailing comma after the last item. If a build fails after an edit, it's almost always a missing comma or quote — the build error names the file and line.

**Markdown** (prose — articles, sky events, legal). A file starts with a `---` frontmatter block (title, dates, settings) followed by the body. Headings use `##`, links use `[text](/path/)`, emphasis uses `**bold**` / `*italic*`.

## Voice checklist (from docs/research/voice-analysis.md)
Warm, candid, practical, agency-first. Explain terms on first use. Never: fear-based predictions, guaranteed outcomes, "the universe wants," medical/legal/financial claims. Always: choice stays with the reader.

## Editing on GitHub (no software needed)
1. Open the file on github.com → pencil icon → edit → "Commit changes."
2. Cloudflare Pages rebuilds automatically. Check the deployment status in the Cloudflare dashboard.
