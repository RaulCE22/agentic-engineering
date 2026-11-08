---
name: feature-discovery
description: Investigate a feature request, locate relevant requirements and architecture, and report scope, dependencies, risks and unanswered questions without changing source code.
---

# Feature discovery

## Procedure
1. Locate the requirement and acceptance criteria. If none exists, report missing product decisions; do not invent them.
2. Read relevant architecture pages and accepted ADRs.
3. Inspect related implementation, tests, package scripts and contracts.
4. Map affected modules and dependency direction.
5. Identify reusable patterns, security/data/compatibility risks and unknowns.
6. Distinguish observed facts from assumptions and blockers from non-blocking questions.

## Output
Requirement references, current behaviour, files/modules inspected, scope, risks, open questions and recommended next action.

## Constraints
Read-only. Do not edit source or docs. Do not scan the whole repository indiscriminately. Prefer a local change over a rewrite.
