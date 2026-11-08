# Documentation index

Start here and open only the documents needed for the current task.

| Area | Entry point | Purpose |
|---|---|---|
| Product | product/vision.md | Product and engineering principles |
| Architecture | architecture/overview.md | Boundaries and system map |
| Runtime | architecture/runtime.md | Node.js version and platform compatibility |
| Monorepo | architecture/monorepo.md | Workspace and package boundaries |
| Frontend | architecture/frontend.md | Adopted frontend conventions |
| Backend | architecture/backend.md | Proposed backend architecture |
| Infrastructure | architecture/infrastructure.md | Hetzner, Docker, Dockge, Traefik, Cloudflare |
| Open decisions | architecture/pending-decisions.md | Questions that must not be guessed |
| Workflow | workflows/feature-lifecycle.md | Feature delivery lifecycle |
| Context | workflows/context-management.md | Progressive context loading |
| Quality | quality/quality-gates.md | Verification expectations |
| Security | quality/security-baseline.md | Security baseline |
| ADRs | decisions/README.md | Decision register |
| Templates | templates/ | Requirements, ADRs, plans and reviews |

## Documentation hierarchy
1. Requirements define intended product behaviour.
2. Accepted ADRs define durable architecture decisions.
3. Architecture docs explain boundaries and conventions.
4. Plans define the approved scope of one change.
5. Progress files record what actually happened.
6. Source code and automated tests define implemented behaviour.

When documents conflict, do not silently choose one. Report the conflict and resolve the source of truth before implementation.
