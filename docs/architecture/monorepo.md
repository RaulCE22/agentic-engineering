# Monorepo architecture

## Workspace layout

```text
apps/
  web/                 # React + Vite browser application
  api/                 # Node.js + Hono API (proposed)

packages/
  contracts/           # Shared Zod transport contracts
  (future packages)    # Add only after genuine reuse exists

docs/                  # Product, architecture, requirements, ADRs and quality
.agents/skills/        # Provider-neutral Agent Skills
scripts/engineering/   # Deterministic engineering utilities
infra/                 # Docker, Dockge, Traefik and Cloudflare
plans/                 # Active and completed work plans
```

## Workspace rules
- Use pnpm workspaces. Do not add Turborepo until task execution time or dependency graphs justify it.
- Each deployable app owns runtime dependencies, build, environment configuration and Dockerfile.
- Shared packages have a narrow purpose and explicit exports.
- Do not create generic utils packages or shared code without a second real consumer.
- Keep shadcn/ui components inside apps/web initially. Create a shared UI package only when another app needs them.
- Put shared Zod transport contracts in packages/contracts only when both frontend and backend consume them.
- Put database schema, Drizzle configuration and migrations in apps/api.
- Avoid circular workspace dependencies and imports of another package's internal paths.

## Naming
Use scoped package names such as @app/web, @app/api and @app/contracts. Use lowercase kebab-case for directories and files unless a tool convention requires otherwise. Keep TypeScript strict.

## Future apps
Add deployable units as apps/<name>. Document purpose, runtime, dependencies, ports, health checks, environment variables and deployment approach.
