# Agentic Engineering

Base reutilizable para aplicaciones web desarrolladas mediante programación agéntica. **El modelo es intercambiable; el sistema de ingeniería pertenece al repositorio.**

## Stack de referencia

| Área | Stack | Estado |
|---|---|---|
| Frontend | React, Vite, TypeScript | Adoptado |
| Routing | React Router (Data Mode) | Adoptado |
| Server state | TanStack Query | Adoptado |
| Forms / validation | React Hook Form, Zod | Adoptado |
| UI | shadcn/ui, Tailwind CSS | Adoptado |
| Client state | Zustand | Adoptado, uso limitado |
| Testing | Vitest | Adoptado |
| Backend | Node.js, Hono, TypeScript | Propuesto |
| Database | PostgreSQL, Drizzle ORM, Drizzle Kit | Propuesto |
| Authentication | Better Auth | Propuesto |
| Monorepo | pnpm workspaces | Adoptado |
| Infrastructure | Hetzner, Docker, Dockge, Traefik, Cloudflare | Plataforma existente |

El backend queda como propuesta hasta cerrar sus decisiones pendientes en `docs/architecture/pending-decisions.md` y ADR-0003.

## Estructura

- `apps/`: aplicaciones desplegables (web y API inicialmente).
- `packages/`: contratos y código compartido real.
- `docs/`: producto, arquitectura, requisitos, ADR, calidad y plantillas.
- `.agents/skills/`: procedimientos compartidos entre agentes.
- `.claude/` y `.cursor/`: adaptadores de herramientas.
- `infra/`: Docker, Hetzner, Dockge, Traefik y Cloudflare.
- `scripts/engineering/`: validaciones y generadores deterministas.
- `plans/`: planes y estado del trabajo.

## Principios

1. Una fuente de verdad por regla, requisito y decisión.
2. Instrucciones globales pequeñas; contexto especializado bajo demanda.
3. Separar discovery, planning, implementation, verification y review.
4. Preferir scripts y tests deterministas a instrucciones que el modelo puede olvidar.
5. Límites de módulos explícitos; evitar microservicios y abstracciones especulativas.
6. No inventar requisitos ni declarar pruebas no ejecutadas como satisfactorias.
7. Mantener los proveedores de LLM intercambiables.

## Primeros pasos

Requisitos: Node.js 26 LTS y pnpm 12.

```bash
corepack enable
corepack prepare pnpm@12.18.0 --activate
pnpm install
pnpm run verify
```

Esta primera versión contiene la estructura y la ingeniería base, no aplicaciones generadas. `apps/web` y `apps/api` son puntos de partida documentados.

## Crear documentos

```bash
pnpm run new:requirement -- user-management
pnpm run new:adr -- postgres-driver
pnpm run new:plan -- user-management
```

## Documentación oficial

- [Node.js releases](https://nodejs.org/en/about/previous-releases)
- [pnpm workspaces](https://pnpm.io/workspaces)
- [React Router Data Mode](https://reactrouter.com/start/data/installation)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/installation)
- [shadcn/ui + Vite](https://ui.shadcn.com/docs/installation/vite)
- [Hono para Node.js](https://hono.dev/docs/getting-started/nodejs)
- [Drizzle ORM + PostgreSQL](https://orm.drizzle.team/docs/get-started/postgresql-new)
- [Drizzle Kit](https://orm.drizzle.team/docs/kit-overview)
- [Better Auth + Hono](https://better-auth.com/docs/integrations/hono)
- [Better Auth + Drizzle](https://better-auth.com/docs/adapters/drizzle)

## Alcance actual

No se generan todavía frontend, API, esquema de base de datos, Dockerfiles de aplicaciones ni configuración operativa de Traefik. Se añadirán cuando exista un proyecto concreto y sus decisiones estén aprobadas.
