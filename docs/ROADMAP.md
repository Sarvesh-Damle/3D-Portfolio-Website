# Recommended Multi-Phase Plan

Audit date: 2026-04-27

This roadmap is intentionally phased so work can be done safely and verified at each step.

## Phase 0: Stabilize The Workspace

Goal: make the project verifiable before feature work.

Tasks:

- [done 2026-04-26] Install dependencies with `npm install`.
- [done 2026-04-26] Fix Git safe-directory status.
- [done 2026-04-26] Run `npm run lint`.
- [done 2026-04-26] Run Vitest through the local binary with elevated execution.
- [done 2026-04-26] Run `npm run build`.
- [done 2026-04-26] Run `npm run format:check`.
- [done 2026-04-26] Run `npm audit --audit-level=low`.
- [done 2026-04-26] Record exact command results in `docs/QUALITY_AND_TESTING.md`.
- [done 2026-04-26] Update `docs/PROJECT_STATE_REPORT.md` with new issues.

Exit criteria:

- Git status can be inspected.
- Dependencies are installed.
- Lint, test, and build results are known and documented.
- Remaining blockers moved forward: dependency audit needs follow-up.

Current phase status:

- Complete. The workspace is verifiable.

## Phase 1: Correct High-Confidence Issues

Goal: fix low-risk problems that improve production quality immediately.

Tasks:

- [done 2026-04-26] Add safe external-link behavior for project card links.
- [done 2026-04-26] Replace generic project image alt text with project-specific alt text.
- [done 2026-04-26] Ensure mobile menu uses semantic button behavior and has accessible state.
- [done 2026-04-26] Replace blocking contact `alert()` calls with inline status UI.
- [done 2026-04-26] Add missing disabled/loading behavior for contact submit.
- [done 2026-04-26] Add direct tests for validators.
- [done 2026-04-26] Fix the un-awaited `waitFor` in `useScrollPosition.test.js`.
- [done 2026-04-26] Fix React Refresh lint warnings by naming HOC-wrapped section exports.
- [done 2026-04-26] Clean noisy test warnings around hook listener updates and Card fallback PropTypes.
- [done 2026-04-26] Apply Prettier formatting baseline.

Exit criteria:

- Lint/test/build pass.
- Accessibility improves without broad visual redesign.
- Contact form UX is testable.

Current phase status:

- Complete. Verification passes with `npm run lint`, `npm run format:check`, `.\node_modules\.bin\vitest.cmd run`, and `npm run build`.

## Phase 2: Documentation And Content Truth

Goal: make the portfolio content accurate and complete.

Tasks:

- [partially done 2026-04-26] Replace placeholder project images.
- [done 2026-04-26] Replace generic GitHub profile links with correct source/demo/case-study states.
- [done 2026-04-26] Decide how to display private/company projects.
- [done 2026-04-26] Review and rewrite project descriptions to emphasize credible current work.
- [done 2026-04-26] Review service labels.
- [done 2026-04-26] Decide whether testimonials should be removed, populated, or deferred.
- [done 2026-04-26] Update `README.md` to match active app state.
- [done 2026-04-26] Replace legacy `CLAUDE.md` with a short pointer to the current Codex docs.

Exit criteria:

- No placeholder comments remain in active content files.
- Project cards do not mislead users with generic links.
- Public README matches the current app.

Current phase status:

- Complete for truthfulness. Real project screenshots/live URLs still need to be added when public artifacts are available.

## Phase 3: Component Consolidation

Goal: reduce drift by using the common component system.

Tasks:

- [done 2026-04-26] Refactor `Contact.jsx` to use `FormField`, `Button`, and `SectionHeader`.
- [done 2026-04-26] Refactor `About.jsx` service cards to use `TiltCard`.
- [partial 2026-04-26] Refactor `Works.jsx` to use `SectionHeader` and optional link rendering.
- [done 2026-04-26] Use `SectionHeader` in repeated section heading markup for About, Contact, Experience, Feedbacks, and Works.
- [done 2026-04-26] Use `NavLink` in `Navbar`.
- [done 2026-04-26] Convert deprecated `src/constants/index.js` to a compatibility re-export.
- [partial 2026-04-26] Standardize imports to aliases while touching files.

Exit criteria:

- Active sections consume common components where the abstraction fits.
- Tests still pass.
- Duplicated card/form/header styling is reduced.

Current phase status:

- Complete for the current scope. Project cards remain section-specific by design because they handle richer overlays and optional private/public link states.

## Phase 4: 3D Experience And Resilience

Goal: make the 3D promise real, stable, and graceful on failure.

Tasks:

- [done 2026-04-27] Re-enable the existing `ComputersCanvas` in the hero.
- [done 2026-04-27] Wrap active canvases with `ErrorBoundary`.
- [done 2026-04-27] Review `Preload all` usage in each canvas and narrow it where practical.
- [done 2026-04-27] Review `preserveDrawingBuffer` usage and remove where not needed.
- [pending] Add responsive canvas framing checks.
- [pending] Add browser screenshot verification.

Exit criteria:

- Hero visual direction is intentional.
- 3D canvases do not crash the whole page on load/render errors.
- Desktop/mobile screenshots verify visual framing.

Current phase status:

- Code-level Phase 4 work is complete. Browser screenshot verification remains before deployment readiness.

## Phase 5: Performance And Asset Optimization

Goal: reduce load weight and improve mobile experience.

Tasks:

- [pending] Audit final production bundle and asset sizes after build.
- [pending] Convert large PNG screenshots to WebP/AVIF where supported by the build/deploy target.
- [pending] Compress glTF textures and remove unused texture files if safe.
- [done 2026-04-27] Lazy-load heavy sections and Contact where practical.
- [done 2026-04-27] Defer EmailJS by lazy-loading the Contact section.
- [done 2026-04-27] Add section-level `Suspense` around below-fold sections.

Exit criteria:

- Build output sizes are documented.
- Initial user-facing load is lighter.
- No asset path regressions in production preview.

Current phase status:

- Partially complete. Code-splitting is in place; asset conversion/compression and production-preview checks remain.

## Phase 6: Testing And CI

Goal: prevent regressions.

Tasks:

- [partial 2026-04-27] Add active-section smoke tests.
- [done 2026-04-27] Add Contact tests with EmailJS mocked.
- [done 2026-04-27] Add Navbar tests.
- [done 2026-04-27] Add Works/project-link tests.
- [pending] Add browser smoke tests.
- [done 2026-04-27] Configure CI for lint, tests, build, and dependency audit.
- [done 2026-04-27] Add a dependency audit process in CI and deployment docs.

Exit criteria:

- CI can validate pull requests.
- At minimum lint, unit tests, and build are automated.
- Browser smoke covers the home page.

Current phase status:

- Unit/CI scope is complete. Browser smoke tests remain as the main Phase 6 gap.

## Phase 7: Deployment

Goal: publish and maintain the site.

Tasks:

- [pending] Choose hosting platform: Vercel, Netlify, GitHub Pages, or another target.
- [pending] Configure environment variables for contact form.
- [done 2026-04-27] Document deployment process.
- [pending] Add preview deployment checks if platform supports it.
- [pending] Verify production URL and contact flow.

Exit criteria:

- Production deploy succeeds.
- Rollback/deploy instructions are documented.
- Production smoke test is recorded.

Current phase status:

- Documentation is complete. Actual deployment is blocked until hosting and production EmailJS values are chosen.

## Suggested Immediate Next Session

Start with deployment readiness:

1. Run browser screenshot verification for the active hero on desktop and mobile.
2. Decide hosting platform and production URL.
3. Add/configure EmailJS production variables.
4. Address high/critical dependency audit blockers.
5. Add remaining smoke tests for Hero, About, Experience, Tech, App, and browser home-page behavior.
