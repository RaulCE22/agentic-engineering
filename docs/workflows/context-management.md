# Agent context management

## Goal
Provide enough context for correctness without loading broad, repetitive or stale instructions.

## Context tiers
- Tier 1: provider system instructions, AGENTS.md, small provider adapter, relevant always-on rules and stable tool definitions.
- Tier 2: relevant requirements, architecture pages, accepted ADRs, applicable skills/references and current plan.
- Tier 3: source files, tests, package manifests, configuration, tool output, errors, logs and diffs.

## Progressive disclosure
1. Start at docs/README.md and follow relevant links.
2. Read one requirement and its dependencies, not the entire directory.
3. Load a skill when needed; read its references only when directed.
4. Delegate bounded investigations when a concise summary can replace lengthy tool history.
5. Keep summaries factual and linked to source files.
6. Do not paste complete source files into plans or progress logs.
7. Before switching sessions, compact work into plan.md and progress.md.

## Prompt-cache hygiene
- Keep stable instructions and tool definitions unchanged between similar calls where practical.
- Put frequently changing task details after stable context where provider controls allow.
- Avoid timestamps, random IDs and dynamic status in globally loaded instruction files.
- Do not add irrelevant tokens just to reach a cache threshold.
- Prompt caching is a provider optimization, not project memory or correctness.
- CLI subscription usage may not follow direct API cache pricing.

## Session handoff
Update progress.md with changes, actual verification results, decisions/open questions and one concrete next step. Do not rely on chat history as the only record of project state.
