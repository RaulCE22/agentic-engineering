# Backend architecture

Status: Proposed — not fully ratified.

The candidate stack aligns with the TypeScript monorepo, but the PostgreSQL driver, API contract strategy, error conventions and authentication deployment details remain open. Do not treat these as fully settled.

## Candidate technology
- Node.js 26 LTS.
- Hono with @hono/node-server.
- PostgreSQL.
- Drizzle ORM and Drizzle Kit.
- Better Auth.
- Zod and @hono/zod-validator.

Better Auth documents direct Hono integration using Web Request/Response APIs and a Drizzle adapter supporting PostgreSQL. Do not reimplement password or session management.

## Proposed style: modular monolith

```text
apps/api/src/
  app/                  # Hono app composition and middleware
  config/               # validated environment configuration
  modules/
    auth/
    <domain>/
      routes/
      schemas/
      services/
      repositories/
      types/
  db/
    client.ts
    schema/
    migrations/
  shared/
    errors/
    middleware/
```

This is a starting shape, not a requirement to create empty layers. Let the first domain feature validate the structure.

## Dependency rules
- Routes translate HTTP and call application services.
- Services/use cases implement workflows.
- Domain rules do not depend on Hono context or HTTP objects.
- Repositories own database access.
- Drizzle schema and query types remain in the backend.
- Validate untrusted input with Zod at system boundaries.
- Authentication establishes identity; authorization is enforced by the relevant server-side operation.
- Return a consistent error format; do not expose stack traces or database internals.

## Database and migrations
- PostgreSQL is the system of record.
- Schema and migrations belong under apps/api.
- Generate SQL migrations with Drizzle Kit and review them.
- Apply committed migrations in deployments. Do not use schema push as the production migration process.
- Separate credentials/databases by environment.
- Define backup, restore and retention before production data is stored.

## Open decisions
1. node-postgres (pg) vs postgres.js driver.
2. REST + OpenAPI vs Hono RPC vs a documented hybrid.
3. Error envelope and pagination conventions.
4. Which Zod contracts belong in packages/contracts.
5. Email provider for verification and password reset.
6. Cookie domain, trusted origins, CORS and proxy behaviour per deployment.
7. Rate limiting, audit events and account recovery policy.

See architecture/pending-decisions.md and ADR-0003.
