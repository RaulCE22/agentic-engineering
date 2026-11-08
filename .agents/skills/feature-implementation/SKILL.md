---
name: feature-implementation
description: Implement an approved feature plan within scope, follow existing module patterns, update tests and record factual progress.
---

# Feature implementation

## Procedure
1. Confirm plan status and required approvals.
2. Read only source files and references needed for the current phase.
3. Check the working tree; never overwrite unrelated changes.
4. Implement one cohesive phase at a time.
5. Keep business logic in the owning module and maintain dependency direction.
6. Validate external input using established schemas.
7. Add or update tests with behaviour changes.
8. Run focused checks after each meaningful phase.
9. Inspect the diff for unrelated changes, secrets, generated files and accidental API changes.
10. Update progress.md with files changed, decisions, commands and actual results.

## Constraints
Do not widen scope without updating the plan. Do not add dependencies without justification/approval. Do not silently change accepted ADRs. Do not modify production data/infrastructure. Never claim tests passed unless executed successfully.
