---
name: test-and-verify
description: Select and execute deterministic checks, map results to acceptance criteria, and report failures without concealing or weakening them.
---

# Test and verify

## Procedure
1. Read the plan and acceptance criteria.
2. Identify the smallest relevant checks.
3. Inspect package scripts before invoking them.
4. Run focused tests and static checks.
5. Run full applicable verification before handoff.
6. For failures, capture command, concise error and affected file/criterion.
7. Distinguish product defect, test defect, environment issue and missing test.
8. Record evidence in progress.md.

## Constraints
Do not weaken/delete failing tests to get a green result. Do not alter production data or fabricate output. LLM review complements executable tests. Mark blocked/skipped checks explicitly.
