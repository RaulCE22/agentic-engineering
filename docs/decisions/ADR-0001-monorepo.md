# ADR-0001: Monorepo and workspace strategy

- Status: Accepted
- Date: 2026-11-08
- Decision owner: Project owner

## Context
Applications share engineering standards, documentation, scripts and potentially contracts, while requiring independent build and deployment lifecycles.

## Decision
Use one Git repository with pnpm workspaces. Deployable units live in apps/; genuinely shared code lives in packages/. Keep workspace orchestration minimal and do not introduce a task runner initially.

## Consequences
One lockfile and consistent dependency management; applications build/deploy independently; package boundaries remain explicit; CI can later use workspace filters; a task runner may be added if justified.

## Constraints
No circular workspace dependencies. No application imports another application's internal code. Do not create shared packages without multiple real consumers.
