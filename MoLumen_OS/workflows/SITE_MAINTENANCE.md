# Site Maintenance

Use this workflow for periodic repository/site health, not for speculative redesign.

1. Confirm current `main` and review only active `PROJECT_STATE.md` / relevant `BACKLOG.md` items.
2. Run agent/instruction integrity, type/content checks, production build, and internal-link crawl.
3. Verify booking-link source-of-truth, Reading Finder handoff, booking handoff, and privacy-safe analytics behavior.
4. Run accessibility/contrast/responsive checks appropriate to the changes; include manual screen-reader review when required for launch rather than claiming automated axe covers it.
5. Check Current Sky horizon, event/date/time-zone behavior, and stale/future language.
6. Check rising-sign/calendar/Birth Time interactive regressions when those areas changed.
7. Review metadata/schema for truthfulness and entity consistency; articles about celestial events must not become fabricated hosted `Event` entities.
8. Sample performance/Lighthouse only where useful. Do not apply generic optimizations without measurement.
9. Check console/network behavior for changed third-party or interactive features.
10. Review CMS/schema synchronization: `src/content.config.ts`, `.pages.yml`, and owner CMS docs must describe the same real editing surfaces.
11. Check that canonical editorial guidance, Claude skills/rules, and owner-facing CMS instructions have not drifted from public-site voice/content roles.
12. Review analytics/search data only when real data exists; do not manufacture optimization conclusions from page length or intuition alone.
13. Update dependencies only with regression testing and a concrete reason.
14. Keep `PROJECT_STATE.md`, `BACKLOG.md`, decisions, and changelog concise: current state/unfinished work/durable rationale/recent highlights only.

Production cutover remains owner-gated and uses the release-manager path; routine maintenance must not attach or change the production domain.
