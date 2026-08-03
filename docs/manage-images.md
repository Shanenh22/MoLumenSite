# Manage Images

All site imagery lives in `public/images/` (pre-optimized WebP) and is registered in
`src/config/images.ts` — every image has one entry with `src`, `alt`, `width`, `height`.
Pages reference the registry, never raw paths, so swapping an image is a one-line change.

## Provenance rules

- `mo-*.webp` and `sky-real-*.webp` are REAL photographs supplied by the owner. Only real
  photos may depict Mo — never AI-generated people.
- Scene images (charts, mugs, mountains, studio, etc.) are owner-supplied decorative art
  with no people in them.

## Swap or add an image

1. Export as WebP, reasonable size (heroes ≤1600px wide, everything else ≤1200px; aim <150KB).
2. Drop it in `public/images/`.
3. Add or update its entry in `src/config/images.ts` with accurate width/height and honest alt
   text (or `''` if purely decorative).
4. Reference it from the page. Below-the-fold images should keep `loading="lazy"`.

## Current assignments (owner-directed)

Mo_2 → homepage hero (`mo-home`) · Mo_3 → about (`mo-about`) · Mo_1 → homepage about preview
(`mo-shelf`) · Mo_4 → credentials · Mo_5 → approach · hero-workspace → homepage hero background ·
real sky photos → Current Sky pages · each reading has its own scene image.

## Color system (2026-08-02)

Buttons and interactive accents use the teal family (`--color-teal` on light, `--color-aqua` on
dark); gold is decorative only. All values are contrast-verified — see docs/testing-report.md
before substituting any color.
