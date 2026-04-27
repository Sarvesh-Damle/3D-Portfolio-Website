# Documentation Maintenance

Audit date: 2026-04-27

These docs are meant to stay alive as the project changes. Future sessions should update them as part of the same work, not as a separate cleanup someday.

## Documentation Ownership

Root:

- `AGENTS.md`: agent entrypoint, command quick reference, and current critical warnings.
- `README.md`: public-facing setup and project overview.
- `CONTRIBUTING.md`: contribution workflow.
- `CLAUDE.md` and `GEMINI.md`: legacy assistant-specific guides.

Docs directory:

- `docs/INDEX.md`: table of contents and update rules.
- `docs/PROJECT_STATE_REPORT.md`: current state, known issues, risks, and open questions.
- `docs/ARCHITECTURE.md`: architecture, source layout, runtime behavior, and data flow.
- `docs/QUALITY_AND_TESTING.md`: scripts, test coverage, verification history, and quality gates.
- `docs/ROADMAP.md`: phased plan and exit criteria.
- `docs/DEPLOYMENT.md`: deployment path, environment variables, CI gate, rollback, and production smoke records.
- `docs/DOCS_MAINTENANCE.md`: this file.

## When To Update Each Doc

Update `AGENTS.md` when:

- Critical startup instructions change.
- Current blocker state changes.
- New mandatory agent workflow appears.
- Commands change.

Update `PROJECT_STATE_REPORT.md` when:

- An issue is found, fixed, downgraded, or reprioritized.
- Active app sections change.
- A major project decision is made.
- Verification blockers change.
- Open questions are answered.

Update `ARCHITECTURE.md` when:

- Source folders are added, removed, or repurposed.
- Component responsibilities change.
- Data model or constants structure changes.
- Build/runtime architecture changes.
- New dependencies affect architecture.

Update `QUALITY_AND_TESTING.md` when:

- Tests are added, removed, or rewritten.
- Lint/build/test results change.
- CI is added or modified.
- Dependency audit results are captured.
- Browser verification is performed.

Update `ROADMAP.md` when:

- A phase starts or completes.
- Priorities change.
- A phase is split, merged, or removed.
- New work is discovered that affects planning.

Update `DEPLOYMENT.md` when:

- Hosting platform changes.
- Environment variable requirements change.
- CI/deploy gate changes.
- A production or preview deployment is performed.
- Rollback or smoke-test instructions change.

Update `README.md` when:

- User-facing setup changes.
- Public feature list changes.
- Deployment instructions are added.
- The active app state changes enough that the public overview is misleading.

## Verification Log Format

When recording command results, include:

```text
Date: YYYY-MM-DD
Command: npm run build
Result: pass/fail
Environment notes: Node version, dependency state, special env vars
Important output: concise summary only
Follow-up: what changed or what remains blocked
```

## Issue Entry Format

When adding a known issue, use:

```text
### Priority: Short Title

Status: open/fixed/deferred
Files: file paths
Impact: user or developer impact
Evidence: what confirmed it
Recommended action: next practical step
```

## Roadmap Update Format

When completing a phase item:

- Mark the task as done in the phase.
- Add a short note with the date.
- Add verification evidence in `QUALITY_AND_TESTING.md` if commands were run.
- Move any newly discovered work into the correct phase.

## Rules For Future Agents

- Do not delete historical findings unless they are clearly obsolete. Mark them fixed or superseded.
- Do not claim a command passed unless it ran in the current checkout.
- Keep docs factual. Separate verified facts from recommendations.
- Prefer file paths and exact command names over vague descriptions.
- Keep public-facing docs polished, but keep internal docs direct and operational.
