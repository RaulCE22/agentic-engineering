# Skills compartidas

Las skills siguen el formato Agent Skills: un directorio por skill con un archivo SKILL.md que contiene metadatos YAML (name y description) e instrucciones procedimentales breves.

Mantén las descripciones concretas y fáciles de descubrir. Carga las referencias detalladas únicamente cuando sean necesarias. Utiliza scripts para las comprobaciones deterministas en lugar de instrucciones en lenguaje natural cuando sea posible.

Skills iniciales:
- feature-discovery
- feature-planning
- feature-implementation
- test-and-verify
- code-review

## Descubrimiento por CLI

- Cursor Agent, Google Antigravity y OpenAI Codex utilizan `.agents/skills/` como ubicación compartida de skills compatibles.
- Claude Code descubre las skills en `.claude/skills/`; en este repositorio esa ruta es un enlace simbólico a `.agents/skills/`.
- No copies skills a carpetas específicas de cada proveedor. Añade adaptadores solo si una herramienta requiere metadatos o comportamiento adicional.
- Revisa `docs/agents/compatibilidad.md` antes de modificar rutas o formatos.

Fuente compartida: `.agents/skills/`.
