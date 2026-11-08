# Skills compartidas

Las skills siguen el formato Agent Skills: un directorio por skill con un archivo SKILL.md que contiene metadatos YAML (name y description) e instrucciones procedimentales breves.

Mantén las descripciones concretas y fáciles de descubrir. Carga las referencias detalladas únicamente cuando sean necesarias. Utiliza scripts para las comprobaciones deterministas en lugar de instrucciones en lenguaje natural cuando sea posible.

Skills iniciales:
- feature-discovery
- feature-planning
- feature-implementation
- test-and-verify
- code-review

Fuente compartida: .agents/skills/. Claude Code accede al mismo directorio mediante .claude/skills.
