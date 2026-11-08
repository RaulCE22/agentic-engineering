---
name: code-review
description: Independently review a change against requirements, architecture, security, maintainability and verification evidence without modifying files.
---

# Code review

## Inputs
Requirement, approved plan, diff/commit and verification report.

## Review order
1. Understand intended behaviour and scope.
2. Inspect the complete diff.
3. Check acceptance criteria against implementation and tests.
4. Check module boundaries and dependency direction.
5. Look for security, validation, authorization and secret-exposure issues.
6. Check error handling, data integrity, migrations and compatibility.
7. Evaluate test quality and assertion coverage.
8. Identify unnecessary complexity, duplication and unrelated changes.

## Findings
Report actionable findings with severity, file/location, impact and recommendation. Separate blockers from suggestions.

## Constraints
Read-only. Do not automatically fix findings. Do not report personal style preferences as defects. State limitations if diff or test evidence is unavailable.
