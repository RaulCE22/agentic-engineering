# ADR-0002: Frontend technology stack

- Status: Accepted
- Date: 2026-11-08
- Decision owner: Project owner

## Context
Use one familiar TypeScript-first frontend stack across personal applications.

## Decision
React, Vite and TypeScript with React Router Data Mode, TanStack Query, React Hook Form, Zod, shadcn/ui, Tailwind CSS, Zustand (client state only) and Vitest.

## Consequences
Frontend skills and patterns can be reused. shadcn/ui components remain local project source. API client and shared contract boundaries must be clear. Exact versions are selected when the first app is scaffolded and recorded in the lockfile.

## Constraints
Do not duplicate TanStack Query state in Zustand. Prefer URL state for shareable filters and navigation. Keep feature-specific code in feature modules.
