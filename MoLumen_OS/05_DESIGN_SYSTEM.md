# Design System Guardrails

Preserve the existing navy / ivory / teal / gold identity unless explicitly asked to redesign.

Priorities:
- clear orientation
- strong but non-aggressive booking path
- readable typography
- responsive hierarchy
- authentic imagery
- restrained motion
- visible focus
- useful negative space
- one obvious control for one obvious task

Favor reusable components and shared behavior over page-local fixes.

## Mobile is first-class
- usable path-aware navigation
- adequate touch targets
- scannable long content
- responsive tables/video/forms
- no horizontal overflow
- important actions remain reachable without excessive footer or repeated-card scrolling
- use mobile-specific presentation when it genuinely simplifies the same content (for example agenda instead of month grid)
- do not duplicate controls merely to explain state; if a dropdown already selects a rising sign, do not add a second visible control that does the same job

## Interface copy
The interface should explain only what the user cannot reasonably infer from the control itself. Remove narration such as "on mobile this is collapsed" or "showing your sign first" when the resulting state is already obvious.

Use labels that describe the user's task, not implementation details: "Compare all readings" rather than "Show the mobile comparison."

## Change discipline
Protect working layout/contrast/performance. Do not redesign a stable component during content cleanup unless a verified usability problem requires it.

Migrate recurring inline styles gradually when touching relevant pages.
