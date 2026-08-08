# Deployment and Release Decisions

- Staging and production Cloudflare Workers remain separate concerns.
- Production deployment, `molumen.com` attachment, and DNS cutover require explicit owner authorization.
- Release readiness is evidence-based: relevant build, content, link, interactive, accessibility, and deployment checks must be successful or any blocker must be stated.
- Preserve a known-good rollback point before irreversible release work.
- External provider/account verification is distinct from repository verification and must not be inferred from code.
- Release work uses the manually invoked release-manager skill so production context/actions are not pulled into routine implementation sessions.
