# Integrations and Privacy Decisions

- `src/config/site.ts` is authoritative for public vendor identifiers/configuration; do not duplicate volatile IDs in operating prose.
- Secrets never belong in public source.
- Custom analytics events route through `window.mlTrack`; components should not bypass consent controls with direct `gtag` calls.
- Consent state must be synchronized before consent-dependent events fire.
- Third-party scripts/embeds should be lazy or single-load where practical and preserve CSP/privacy behavior.
- YouTube uses a privacy-conscious click-to-load facade rather than eagerly loading the player.
- Repository code can prove wiring and fallbacks, not provider-account delivery, analytics reception, payment completion, or other external account state.
