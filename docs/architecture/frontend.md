# Frontend architecture

Status: Adopted stack.

## Technology
- React + Vite + TypeScript.
- React Router in Data Mode.
- TanStack Query (@tanstack/react-query) for remote/server state.
- React Hook Form for form interaction state.
- Zod for runtime validation, connected through @hookform/resolvers.
- shadcn/ui components with Tailwind CSS.
- Zustand for small client-side state only when React state or URL state is insufficient.
- Vitest for unit and component tests.

## Responsibilities
- Routes compose pages and feature modules.
- Feature modules own their UI, hooks and behaviour.
- Shared UI primitives are introduced only when reuse is real.
- API access is centralized in a typed client.
- Zod validates external data at runtime.
- TanStack Query owns server state, caching, invalidation and mutations.
- Zustand owns only cross-route client/UI state.
- React Hook Form owns form interaction state; Zod defines validation.

## Rules
- Never mirror TanStack Query data into Zustand.
- Prefer URL parameters for shareable filters, pagination and navigation state.
- Keep business rules out of presentational components.
- Avoid large global stores and providers without a clear need.
- Keep shadcn/ui primitives accessible and semantically correct.
- Keep API DTOs separate from view models when their lifecycles differ.
- Do not maintain two competing remote-data caches.

## Suggested feature layout

```text
apps/web/src/
  app/                  # router, providers, bootstrap
  features/<feature>/
    api/
    components/
    hooks/
    schemas/
    routes/
    types/
  components/ui/        # local shadcn/ui components
  lib/                  # API client and app-level utilities
  styles/
```

## Testing
Use Vitest. Add Testing Library, user-event and jsdom when the first component tests are scaffolded. Test user-visible behaviour, validation and state transitions. Select an E2E framework when the first critical journey is implemented.

Exact package versions are selected when the first app is scaffolded and recorded in the lockfile.
