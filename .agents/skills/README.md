# Shared Agent Skills

Skills follow the Agent Skills format: one directory per skill with a SKILL.md containing YAML frontmatter (name and description) and concise procedural instructions.

Keep descriptions discoverable and specific. Load references only when needed. Use scripts for deterministic checks instead of natural-language instructions when possible.

Initial skills: feature-discovery, feature-planning, feature-implementation, test-and-verify and code-review.

Shared source of truth: .agents/skills/. Claude Code accesses the same directory through .claude/skills.
