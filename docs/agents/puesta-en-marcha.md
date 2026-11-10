# Puesta en marcha de los cuatro CLI

Los comandos de instalación cambian entre sistemas operativos y versiones. Utiliza siempre las instrucciones oficiales enlazadas y evita copiar comandos antiguos de terceros.

## 1. Cursor CLI

- Documentación: https://docs.cursor.com/cli
- Instala Cursor CLI siguiendo la guía oficial.
- Abre el repositorio y ejecuta `agent`.
- Inicia sesión con tu cuenta de Cursor.
- Selecciona Composer cuando el CLI permita elegir modelo.
- Comprueba que el agente ha leído `AGENTS.md`.

## 2. Google Antigravity CLI

- Documentación: https://antigravity.google/docs/cli
- Instala `agy` siguiendo la guía oficial.
- Ejecuta `agy` desde la raíz del repositorio.
- Autentica con tu cuenta de Google.
- Selecciona Gemini, no modelos de otros fabricantes.
- Comprueba que el agente ha leído `AGENTS.md`.

## 3. OpenAI Codex CLI

- Documentación: https://developers.openai.com/codex/cli
- Instala Codex CLI siguiendo la guía oficial.
- Ejecuta `codex` desde la raíz del repositorio.
- Autentica mediante la opción de inicio de sesión con ChatGPT, no mediante una clave API.
- Selecciona un modelo GPT/Codex disponible en tu plan.
- Comprueba que Codex ha leído `AGENTS.md`.

## 4. Anthropic Claude Code

- Documentación: https://docs.anthropic.com/en/docs/claude-code/overview
- Instala Claude Code siguiendo la guía oficial.
- Ejecuta `claude` desde la raíz del repositorio.
- Autentica con tu cuenta de Claude, no mediante una clave API.
- Selecciona Claude Sonnet u Opus según disponibilidad y cuota.
- Comprueba que Claude Code ha cargado `CLAUDE.md`, que importa las instrucciones canónicas de `AGENTS.md`, y que descubre las skills enlazadas desde `.claude/skills/`.

## Comprobación común

Desde la raíz del repositorio, pide a cada agente que:
1. Resuma las reglas principales de `AGENTS.md`.
2. Enumere las skills disponibles en `.agents/skills/`.
3. Explique el flujo obligatorio antes de implementar una funcionalidad no trivial.
4. Confirme que no ha modificado archivos.

Después ejecuta:

```bash
pnpm run verify
```

## Política de costes

- Prioriza la capa gratuita incluida en cada cuenta.
- No configures API keys, endpoints de terceros ni proveedores alternativos.
- No habilites recargas o consumo adicional automático.
- Antes de una tarea extensa, consulta el uso restante en el propio CLI o panel del proveedor.
- Si se agota la cuota, cambia a otro de los agentes admitidos o espera a la renovación; no actives facturación por API como solución automática.
