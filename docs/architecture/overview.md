# Architecture overview

## System shape
A pnpm monorepo containing independently deployable applications, deliberately small shared packages, product and architecture documentation, provider-neutral skills, engineering scripts and deployment assets.

## Initial topology

```text
Browser
  |
 HTTPS
  v
Cloudflare DNS / edge controls
  |
Hetzner server
  |
Traefik reverse proxy
  +---- web container (apps/web)
  +---- API container (apps/api)
             |
         PostgreSQL
```

Dockge manages Docker Compose stacks on the server. PostgreSQL stays on a private Docker network and is not published publicly. This is a logical topology, not a production deployment configuration.

## Application architecture
- Frontend: React SPA built with Vite.
- Backend: proposed Node.js API using Hono.
- Persistence: proposed PostgreSQL with Drizzle ORM and Drizzle Kit.
- Authentication: proposed Better Auth.
- Shared boundary: Zod-based transport contracts in packages/contracts where justified.
- Backend style: start as a modular monolith; extract services only when independent deployment is justified.

## Dependency direction
- Applications may depend on shared packages; shared packages never depend on applications.
- Frontend never imports backend implementation, database schema or secrets.
- Backend owns persistence and authentication implementation.
- Shared contracts contain transport schemas and types, not database entities or business implementation.
- Infrastructure must not leak into domain logic.

## Architecture changes
A change to an accepted boundary requires an ADR. A feature change within existing boundaries usually needs a requirement and implementation plan.
