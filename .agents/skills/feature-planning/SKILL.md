---
name: feature-planning
description: Turn an understood requirement into a bounded implementation plan with module ownership, ordered phases, acceptance-test mapping, risks and approval points.
---

# Feature planning

## Procedure
1. Confirm the requirement is sufficiently specified and follows accepted ADRs.
2. Define scope and non-goals.
3. Assign work to existing modules and respect dependency direction.
4. List expected files/areas without claiming certainty if discovery is incomplete.
5. Divide work into small ordered phases.
6. Map every acceptance criterion to a verification method.
7. Identify migrations, security implications, deployment impact and rollback.
8. Flag decisions requiring human approval.
9. Save plans/active/<slug>/plan.md and create/update progress.md.

## Constraints
Planning only. Do not implement source code, invent business rules or add abstractions without demonstrated need. Request approval for high-risk, public-contract, authentication/security or destructive changes.
