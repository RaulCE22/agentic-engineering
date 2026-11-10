# Compatibilidad entre CLI

## Matriz de integración

| Proveedor | Comando | Modelo | Instrucciones del proyecto | Skills |
|---|---|---|---|---|
| Cursor | `agent` | Composer | `AGENTS.md`; el editor también usa `.cursor/rules/` | `.agents/skills/` |
| Google | `agy` | Gemini | `AGENTS.md` | `.agents/skills/` |
| OpenAI | `codex` | GPT/Codex | `AGENTS.md` | `.agents/skills/` |
| Anthropic | `claude` | Claude | `CLAUDE.md` importa `AGENTS.md` | `.claude/skills/` |

## Reglas de mantenimiento

- `AGENTS.md` es la referencia canónica de alcance global.
- `CLAUDE.md` debe limitarse a importar `AGENTS.md` y describir la integración específica de Claude Code.
- `GEMINI.md` debe limitarse a importar `AGENTS.md` para los entornos Gemini que utilicen ese nombre de archivo.
- Cursor conserva una regla de editor muy breve que remite a `AGENTS.md`; el CLI de Cursor debe recibir también las instrucciones de raíz.
- Codex utiliza `AGENTS.md` como archivo de instrucciones del proyecto. No crear un `CODEX.md` duplicado.
- Las skills siguen el formato Agent Skills: directorio con `SKILL.md`, metadatos `name` y `description` e instrucciones procedimentales.
- Claude Code descubre las skills del proyecto en `.claude/skills/`; este repositorio utiliza un enlace simbólico a `.agents/skills/`. No mantengas dos copias.
- Verifica los nombres y rutas admitidos contra la documentación de la versión instalada antes de añadir configuraciones avanzadas, hooks o subagentes.

## Qué no se comparte automáticamente

No asumas que todos los CLI interpretan igual los permisos, hooks, subagentes, comandos, archivos de configuración, MCP o selección de modelo. Mantén esas funciones en el adaptador del proveedor correspondiente y documenta cualquier diferencia que afecte al flujo de trabajo.

## Modelos y facturación

Selecciona únicamente modelos propios del proveedor:
- Cursor: Composer.
- Google: Gemini.
- OpenAI: GPT/Codex.
- Anthropic: Claude.

La autenticación con una cuenta de usuario no garantiza acceso ilimitado ni gratuito. Comprueba el plan, la cuota disponible y el modelo seleccionado antes de tareas largas. No configures claves API ni habilites facturación por consumo para este flujo.
