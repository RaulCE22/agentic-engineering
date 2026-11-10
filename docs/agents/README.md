# Herramientas de programación agéntica

Este repositorio mantiene una única fuente de verdad para las instrucciones de ingeniería: `AGENTS.md`. Los archivos `CLAUDE.md`, `GEMINI.md` y las reglas de Cursor son adaptadores mínimos para los mecanismos de descubrimiento de cada herramienta; no deben contener copias de las reglas compartidas.

## Herramientas admitidas

| Herramienta | CLI | Archivo de entrada | Skills compartidas |
|---|---|---|---|
| Cursor | `agent` | `AGENTS.md` + `.cursor/rules/` para el editor | `.agents/skills/` |
| Google Antigravity | `agy` | `AGENTS.md` | `.agents/skills/` |
| OpenAI Codex | `codex` | `AGENTS.md` | `.agents/skills/` |
| Anthropic Claude Code | `claude` | `CLAUDE.md`, que importa `AGENTS.md` | `.claude/skills/` (enlace a `.agents/skills/`) |

Las rutas y capacidades pueden variar entre versiones. Consulta [compatibilidad](./compatibilidad.md) y [puesta en marcha](./puesta-en-marcha.md).

## Principios

1. No dupliques las reglas de ingeniería en adaptadores de proveedores.
2. Mantén los procedimientos reutilizables en `.agents/skills/<nombre>/SKILL.md`.
3. Las configuraciones específicas de proveedor solo deben contener ajustes que no tengan equivalente compartido.
4. No configures claves API ni proveedores externos: el objetivo es autenticar cada CLI con la cuenta nativa de su fabricante y usar sus modelos propios.
5. No presupongas que una instalación CLI incluye cuota gratuita: el acceso y los límites dependen del plan de la cuenta.
