# API application

Reserved for the Node.js backend. Candidate stack: Hono, PostgreSQL, Drizzle ORM/Drizzle Kit, Better Auth and Zod.

The backend decision is Proposed in ADR-0003. Before generating the app, close driver, API contract, error format, email provider and authentication cookie decisions in docs/architecture/pending-decisions.md.

Principles: modular monolith; thin route handlers; domain/application logic independent from Hono; Drizzle schema and migrations inside this app; Zod at boundaries; server-side authorization; health checks, graceful shutdown, structured logs and production configuration.
