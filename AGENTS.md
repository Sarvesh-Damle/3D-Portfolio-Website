# Codex Project Guide

This file is the starting point for Codex or any future coding agent working in this repository.

## Project Snapshot

- Project: Sarvesh Damle 3D portfolio website.
- Stack: React 18, Vite 4, Three.js, react-three/fiber, react-three/drei, Framer Motion, Tailwind CSS, Vitest, ESLint, Prettier.
- App type: Single-page portfolio with section anchors, 3D canvases, animated sections, project cards, experience timeline, and EmailJS contact form.
- Current audit date: 2026-04-26.
- Current dependency state: `npm install` completed on 2026-04-26 and `node_modules` exists locally.
- Current Git state: repo is marked as a Git safe directory and `git status` works, with a warning about inaccessible user-level Git ignore config.

## Documentation Map

Read these docs before making non-trivial changes:

- `docs/INDEX.md`: documentation map and maintenance policy.
- `docs/PROJECT_STATE_REPORT.md`: detailed current-state audit, issues, gaps, risks, and verification results.
- `docs/ARCHITECTURE.md`: source layout, data flow, rendering model, component responsibilities, and asset model.
- `docs/QUALITY_AND_TESTING.md`: available quality gates, test coverage, known verification blockers, and recommended test expansion.
- `docs/ROADMAP.md`: recommended multi-phase plan for stabilizing, improving, and deploying the portfolio.
- `docs/DEPLOYMENT.md`: deployment target recommendation, env vars, CI, rollback, and release blockers.
- `docs/DOCS_MAINTENANCE.md`: how future sessions should update documentation after tasks.

Existing legacy assistant docs are still present:

- `CLAUDE.md`: prior Claude-oriented guidance. Useful historically, but some active-state details are stale.
- `GEMINI.md`: short Gemini-oriented guidance.
- `README.md`: user-facing setup/readme.
- `CONTRIBUTING.md`: contributor workflow.

## Commands

Install dependencies when setting up a fresh checkout:

```bash
npm install
```

Development:

```bash
npm run dev
```

Quality gates:

```bash
npm run lint
.\node_modules\.bin\vitest.cmd run
npm run build
```

Formatting:

```bash
npm run format
npm run format:check
```

Preview production build:

```bash
npm run preview
```

## Important Current Findings

- `npm run build` passes.
- `npm run lint` passes.
- `npm run format:check` passes, with a remaining deprecation warning for `jsxBracketSameLine` in Prettier config.
- Tests pass with the local Vitest binary when escalated enough for esbuild worker spawn: 9 files, 75 tests passed.
- `npm install` reported 26 audit vulnerabilities: 14 moderate, 11 high, 1 critical.
- The active `App.jsx` renders `Navbar`, `Hero`, `About`, `Experience`, `Tech`, `Works`, `Contact`, and `StarsCanvas`.
- `Hero.jsx` renders the 3D computer canvas again.
- Below-fold sections are lazy-loaded with React `lazy` and `Suspense`.
- Active canvas exports are wrapped with `ErrorBoundary`.
- The reusable common components are now used across Contact, About, Navbar, Experience, Feedbacks, and Works where they fit.
- The project has a compatibility `src/constants/index.js` that re-exports from `src/config/constants/*`.
- Some project visuals still use available repository assets until real public screenshots are supplied.
- Project-card external links now use anchors with `noopener,noreferrer`.
- Contact form submission depends on EmailJS environment variables and now shows inline status instead of blocking alerts.
- Private/unpublished projects are represented with explicit unavailable/private labels rather than placeholder GitHub-profile links.
- `src/constants/index.js` is a compatibility re-export. Edit content in `src/config/constants/*`.
- 3D assets and images are sizable. Asset optimization should be part of the roadmap.
- GitHub Actions CI exists in `.github/workflows/ci.yml`; dependency audit may fail until vulnerabilities are handled.

## Agent Working Rules

1. Check `docs/PROJECT_STATE_REPORT.md` first for known risks before changing behavior.
2. Prefer editing content in `src/config/constants/*` for portfolio copy, projects, technologies, and navigation.
3. Use the existing alias system when adding imports: `@components`, `@config`, `@hooks`, `@utils`, `@assets`, `@styles`, `@hoc`.
4. Keep reusable UI in `src/components/common/` and use those components before adding duplicated markup.
5. Keep risky 3D canvases wrapped with `ErrorBoundary`.
6. After every meaningful change, update the relevant docs listed in `docs/INDEX.md`.
7. Do not claim lint/test/build success unless the command actually ran in this checkout.
