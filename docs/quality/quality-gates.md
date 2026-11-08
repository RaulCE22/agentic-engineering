# Quality gates

Quality comes from executable checks and traceable acceptance criteria, not an agent saying code looks correct.

## Foundation repository
Run `pnpm run verify`. This validates documentation, local Markdown links, skill metadata, workspace layout and toolchain requirements.

## Application gates (configure when apps are scaffolded)
As applicable: format:check, lint, typecheck, test:unit, test:integration, test:architecture and build. Do not add placeholder scripts that always return success.

## Frontend
TypeScript strict checks, ESLint/formatting, Vitest tests, accessibility/validation tests for critical interactions and production Vite build.

## Backend
TypeScript strict checks, lint/formatting, unit tests, PostgreSQL integration tests, request/response contract tests, migration review, production build and health check.

## Cross-cutting
Architecture boundary checks, dependency/secret scanning in CI, no unexpected dependency changes, and critical flows mapped to automated tests.

For every command report command, result (passed/failed/not run/blocked) and relevant error summary.
