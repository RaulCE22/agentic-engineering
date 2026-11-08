# Pending architecture decisions

These questions are intentionally open. Agents must not guess or silently establish permanent conventions.

| ID | Topic | Current position | Needed before |
|---|---|---|---|
| BE-01 | PostgreSQL driver | Compare node-postgres (pg) and postgres.js with Drizzle + Better Auth | First API scaffold |
| BE-02 | API contracts | REST + OpenAPI vs Hono RPC | First shared frontend/API feature |
| BE-03 | Error and pagination format | Define a standard envelope | First API endpoint |
| BE-04 | Shared contracts | packages/contracts is a candidate | First shared contract |
| BE-05 | Better Auth | Confirm cookie domain, trusted origins, CORS and session policy | Authentication implementation |
| BE-06 | Email provider | No provider selected | Verification/reset flow |
| DB-01 | Database operations | Define backup, restore, retention and migration deployment | Production data |
| INF-01 | TLS topology | Confirm Traefik ACME vs Cloudflare origin certificate and proxy mode | First public deployment |
| INF-02 | Secret handling | Select server-side secret storage and rotation process | First production deployment |
| QA-01 | E2E framework | Vitest accepted for unit/component; E2E not selected | First critical journey |

To resolve an item: research supported options, build a small proof of concept when useful, record the choice in an ADR, update this register and relevant architecture docs.
