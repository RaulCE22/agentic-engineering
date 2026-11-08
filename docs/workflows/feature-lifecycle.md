# Feature development lifecycle

Use the lightest workflow that still controls risk. A copy change does not need a multi-agent process; authentication, persistence and public-contract changes do.

## 1. Discovery
- Identify requirement ID, scope and acceptance criteria.
- Read relevant architecture and accepted ADRs.
- Inspect implementation, tests and contracts.
- Map affected modules, dependencies and risks.
- Do not edit application source during discovery.
- Report missing behaviour as questions; do not invent it.

Output: concise findings with references to source documents and files.

## 2. Planning
Required for multi-module, schema, public-contract, authentication/security and infrastructure work. Include objective, scope/non-goals, module ownership, expected areas to change, ordered phases, acceptance-test mapping, risks, migrations, rollback and approval points.

Output: plans/active/<slug>/plan.md.

## 3. Approval
Human approval is required for unresolved product behaviour, accepted-architecture changes, security-sensitive changes, destructive database operations and production infrastructure changes.

## 4. Implementation
Work only within approved scope. Reuse module patterns, keep changes cohesive, add tests, avoid unrelated refactoring and record material discoveries in progress.md.

## 5. Verification
Run focused checks during implementation and all applicable checks before handoff. Inspect the final diff. Report exact commands and results; mark skipped checks explicitly.

## 6. Independent review
Review the diff against requirements, architecture, security and test evidence. Report actionable findings with severity and file references. Reviewers do not edit implementation.

## 7. Handoff
Summarize completed criteria, tests, limitations and follow-up work. Update relevant docs. Move a plan to completed only after acceptance.
