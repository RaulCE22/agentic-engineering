# ADR-0003: Backend technology stack

- Status: Proposed
- Date: 2026-11-08
- Decision owner: Project owner

## Context
The desired backend is TypeScript-first, lightweight and integrated with React and PostgreSQL.

## Proposed decision
Evaluate Node.js 26 LTS, Hono with @hono/node-server, PostgreSQL, Drizzle ORM/Drizzle Kit, Better Auth, Zod and @hono/zod-validator.

## Rationale
Hono runs on Node.js through its Node adapter. Better Auth documents Hono integration and a Drizzle adapter supporting PostgreSQL. Drizzle supports node-postgres and postgres.js drivers.

## Required proof of concept
1. Run minimal Hono server on Node LTS.
2. Connect Drizzle to local PostgreSQL.
3. Generate and apply a Drizzle Kit migration.
4. Mount Better Auth and generate its schema.
5. Verify session cookies, trusted origins, CORS and logout.
6. Validate a request/response using Zod.
7. Compare pg and postgres.js for pooling, deployment and auth-adapter compatibility.

## Open choices
PostgreSQL driver; REST/OpenAPI vs Hono RPC vs hybrid; error envelope/pagination; shared contract location; email provider; cookie/session strategy; rate limiting and audit events.

## Consequences
No production API scaffold until proof of concept and open choices are reviewed.
