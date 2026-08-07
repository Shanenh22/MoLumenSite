# Decision Log

- Kit replaces MailerLite.
- YouTube is canonical video host.
- Embedded YouTube should use click-to-load/privacy-conscious facades.
- About is primary expected home for welcome video; homepage use depends on UX/performance.
- Claude may research and author 2027 Current Sky using authoritative cross-checked sources.
- Lead magnet: Birth Time Toolkit, based on approved content + verified research, written in Mo's voice.
- Pages CMS is Mo's primary day-to-day interface for routine content publishing and editing.
- GitHub remains the source of truth; Pages CMS is an editing layer, not a separate content database.
- Preserve `settings.content.merge: true` so CMS edits do not discard technical fields hidden from Mo.
- Routine CMS create/delete/rename privileges are restricted for business-critical collections such as services and reference architecture.
- Blog, Current Sky and Videos use a draft flag so saving work in Pages CMS does not automatically make an unfinished item public.
- Homepage/About structural copy remains code-managed for now because it combines conversion layout, credentials and verified business claims; extract selected fields only if owner editing frequency justifies it.
- No production cutover without explicit authorization.
