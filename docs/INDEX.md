# Project Documentation Index

This directory is the working knowledge base for future Codex sessions.

## Start Here

- `../AGENTS.md`: root-level quick guide for agents.
- `PROJECT_STATE_REPORT.md`: current project state, gaps, risks, and audit notes.
- `ROADMAP.md`: recommended multi-phase plan.

## Deep Dives

- `ARCHITECTURE.md`: source layout, runtime architecture, component map, and data flow.
- `QUALITY_AND_TESTING.md`: test inventory, command status, quality gates, and verification strategy.
- `DEPLOYMENT.md`: hosting recommendation, env vars, CI gate, rollback, and deployment blockers.
- `DOCS_MAINTENANCE.md`: rules for keeping docs current after each task.

## Existing Root Docs

- `../README.md`: user-facing setup and project overview.
- `../CONTRIBUTING.md`: contribution workflow and coding conventions.
- `../CLAUDE.md`: short pointer to the current Codex docs.
- `../GEMINI.md`: short Gemini-agent guide.

## Current Documentation Status

Created on 2026-04-26 after source-level audit and updated through 2026-04-27 phase work.

These docs intentionally distinguish between:

- Verified current state: confirmed by reading source files in this checkout.
- Blocked verification: commands attempted but blocked by environment or missing dependencies.
- Recommendations: suggested work, not yet implemented.

## Update Rule For Future Sessions

When a task changes the project, update docs in the same change set:

- Architecture or source layout changed: update `ARCHITECTURE.md`.
- New issue found or fixed: update `PROJECT_STATE_REPORT.md`.
- Tests, scripts, CI, dependency, or verification changed: update `QUALITY_AND_TESTING.md`.
- Deployment, hosting, env vars, or release checks changed: update `DEPLOYMENT.md`.
- Plan phase started, completed, deferred, or changed: update `ROADMAP.md`.
- Documentation process changed: update `DOCS_MAINTENANCE.md`.
- Agent-facing instructions changed: update `../AGENTS.md`.
