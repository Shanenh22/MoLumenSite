# Interactive Tool Decisions

- Interactive tools should remain site-owned, lightweight, accessible, and useful without unnecessary framework/runtime complexity.
- Tools should support learning, orientation, or decision support without turning MoLumen into a free automated personal astrologer.
- The Current Sky calendar must behave consistently across time zones; published date-only events should not shift days with the visitor's device time zone.
- Birth Time Confidence is a qualitative self-assessment aid, not a claim of astronomical certainty.
- Rising-sign preference is an optional enhancement, not a requirement for basic content access.
- On mobile, the rising-sign experience uses one dropdown. Selecting a sign isolates that sign; choosing "Show all signs" restores the full set. Do not add a second redundant Show All control or visible copy explaining an obvious state change.
- Rising-sign guidance is a broad whole-sign-house structural lens. It can tell the reader where to look, not what an event will mean personally without the whole chart, timing, and lived context.
- Rising-sign preference must not be sent to analytics. Interactive-tool analytics follow the consent-aware shared tracking layer and exclude birth data and personal free text.
- Do not add `Event` schema merely because a page describes a celestial event or a UI is calendar-like. Schema must describe the actual page/entity.
- Global `Article` schema is reserved for genuine authored editorial/reference pages. Hubs, archives, calendars, glossaries, and reference indexes should remain `WebPage`/collection experiences unless they supply a more specific truthful schema of their own.
- Article-specific Open Graph date metadata should not be emitted on ordinary website/collection pages merely because a real `dateModified` is available.
- Do not add CMS fields merely because a UI is interactive; schema/CMS changes must match real content and editing requirements.
