# Agentic Engineering

Base reutilizable para aplicaciones web desarrolladas mediante programación agéntica. **El modelo es intercambiable; el sistema de ingeniería pertenece al repositorio.**

## Stack de referencia

| Área | Tecnologías | Estado |
|---|---|---|
| Frontend | React, Vite, TypeScript | Adoptado |
| Navegación | React Router (Data Mode) | Adoptado |
| Datos remotos | TanStack Query | Adoptado |
| Formularios y validación | React Hook Form, Zod | Adoptado |
| Interfaz | shadcn/ui, Tailwind CSS | Adoptado |
| Estado de cliente | Zustand | Adoptado, uso limitado |
| Pruebas | Vitest | Adoptado |
| Backend | Node.js, Hono, TypeScript | Propuesto |
| Base de datos | PostgreSQL, Drizzle ORM, Drizzle Kit | Propuesto |
| Autenticación | Better Auth | Propuesto |
| Monorepo | pnpm workspaces | Adoptado |
| Infraestructura | Hetzner, Docker, Dockge, Traefik, Cloudflare | Plataforma existente |

El backend sigue siendo una propuesta hasta cerrar las decisiones pendientes de `docs/architecture/pending-decisions.md` y el ADR-0003.

## Estructura

- `apps/`: aplicaciones desplegables (web y API inicialmente).
- `packages/`: contratos y código realmente compartido.
- `docs/`: producto, arquitectura, requisitos, ADR, calidad y plantillas.
- `.agents/skills/`: procedimientos compartidos entre agentes.
- `.claude/` y `.cursor/`: adaptadores para herramientas.
- `infra/`: Docker, Hetzner, Dockge, Traefik y Cloudflare.
- `scripts/engineering/`: validaciones y generadores deterministas.
- `plans/`: planes y estado de los trabajos.

## Principios

1. Una única fuente de verdad para cada regla, requisito y decisión.
2. Instrucciones globales pequeñas; contexto especializado bajo demanda.
3. Separar análisis, planificación, implementación, verificación y revisión.
4. Preferir scripts y pruebas deterministas a instrucciones que el modelo puede olvidar.
5. Definir límites claros entre módulos; evitar microservicios y abstracciones especulativas.
6. No inventar requisitos ni declarar como satisfactorias pruebas que no se hayan ejecutado.
7. Mantener los proveedores de LLM intercambiables.

## Primeros pasos

Requisitos: Node.js 26 LTS y pnpm 12. Consulta [runtime.md](docs/architecture/runtime.md) para conocer los requisitos de plataforma.

```bash
npm install --global pnpm@12.18.0
pnpm install
pnpm run verify
```

Node.js 25 y posteriores ya no distribuyen Corepack. Por eso se instala pnpm directamente; no presupongas que `corepack enable` está disponible en una instalación moderna de Node.

Esta primera versión contiene la estructura y la base de ingeniería, no aplicaciones generadas. `apps/web` y `apps/api` son puntos de partida documentados.

## Crear documentos

```bash
pnpm run new:requirement -- gestion-usuarios
pnpm run new:adr -- controlador-postgresql
pnpm run new:plan -- gestion-usuarios
```

## Documentación oficial

- [Versiones de Node.js](https://nodejs.org/en/about/previous-releases)
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

Todavía no se generan el frontend, la API, el esquema de base de datos, los Dockerfiles de las aplicaciones ni la configuración operativa de Traefik. Se incorporarán cuando exista un proyecto concreto y sus decisiones estén aprobadas.
