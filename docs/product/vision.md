# Product and engineering vision

## Purpose
Create a reusable foundation for personal web applications. Projects should share engineering principles, repository layout, development workflow and quality controls.

## Product principles
- Solve the product problem without maximizing framework complexity.
- Build modular applications with explicit boundaries.
- Keep frontend and backend independently deployable.
- Use a monorepo to coordinate applications and shared contracts.
- Prefer supported libraries and boring operational choices.
- Make requirements and acceptance criteria explicit.
- Keep model providers replaceable.
- Make quality checks executable and repeatable.

## Engineering principles
- One source of truth for every rule, requirement and decision.
- Progressive disclosure: load details only when a task needs them.
- Skills describe procedures; scripts enforce deterministic checks.
- Agents have bounded responsibilities and permissions.
- Plans describe intended work; progress records actual work.
- Automated validation is mandatory; LLM self-assessment is not proof.

## Non-goals
- Not an application framework or alternative to the selected libraries.
- Not a custom agent runtime.
- Does not prescribe microservices.
- Does not generate apps, schemas or deployment stacks before a product requires them.
- Does not depend on a specific LLM vendor or paid subscription.
