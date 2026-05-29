# Project State Report

Audit date: 2026-04-27

Repository path: `D:\Development\Sarvesh_Projects\3D-Portfolio-Website`

## Executive Summary

This is a Vite React single-page 3D portfolio site. The project has a solid foundation: modular constants, path aliases, reusable common components, custom hooks, Vitest test files, ESLint/Prettier config, Tailwind styling, and a production-oriented Vite build config with manual chunks.

Dependencies were installed during this audit with `npm install`, so the project is now locally buildable/testable in this checkout. After Phase 6 work, `npm run lint`, `npm run format:check`, `.\node_modules\.bin\vitest.cmd run`, and `npm run build` pass. Vitest still needs enough execution permission to spawn its local esbuild worker in this environment.

Git safe-directory protection was also resolved for this repo. `git status --short --branch` now works and reports branch `main...origin/main`; the current untracked project changes are `AGENTS.md` and `docs/`. Git still warns that it cannot access `C:\Users\Sarvesh Damle/.config/git/ignore`.

The app state is more advanced than the original repository docs suggested. `App.jsx` currently renders `Experience`, `Contact`, and `StarsCanvas`; `Feedbacks` remains commented out. The hero 3D computer canvas is active again, and active canvas exports are wrapped with `ErrorBoundary` so a canvas load/render failure does not take down the whole page.

## Current Active App Surface

Active sections in `src/App.jsx`:

- `Navbar`
- `Hero`
- `About`
- `Experience`
- `Tech`
- `Works`
- `Contact`
- `StarsCanvas`

Inactive/commented:

- `Feedbacks`

Lazy-loaded below the fold:

- `Experience`
- `Tech`
- `Works`
- `Contact`
- `StarsCanvas`

## Technology Stack

Runtime dependencies from `package.json`:

- React 18.2
- React DOM 18.2
- React Router DOM 6.8
- Vite 4.1
- Three.js 0.149
- `@react-three/fiber` 8.11
- `@react-three/drei` 9.56
- Framer Motion 9.0
- Tailwind CSS 3.2
- EmailJS browser SDK 3.10
- `react-parallax-tilt`
- `react-vertical-timeline-component`
- PropTypes
- Maath

Development tooling:

- ESLint with React, Hooks, React Refresh, JSX a11y, and Prettier config.
- Prettier.
- Vitest with jsdom and Testing Library.
- Husky plus lint-staged.
- Terser for production minification.

## Source Inventory

Observed source and tests:

- `src`: 28 `.js`, 27 `.jsx`, 1 `.css`, plus assets.
- `tests`: component and hook tests.
- Public 3D assets: desktop PC and planet glTF/bin/textures.
- Static assets: PNG, SVG, EPS, PDF, resume PDF.

Asset volume:

- `public` plus `src/assets`: 108 files, about 28.2 MB.
- Largest assets include `public/desktop_pc/scene.bin` at about 4.1 MB, `src/assets/tripguide.png` at about 3.3 MB, `Material_baseColor.jpeg` at about 2.8 MB, and `food_delivery_website.png` at about 2.0 MB.

## Documentation State

Existing docs:

- `README.md` is comprehensive but includes claims that must be revalidated after dependencies are installed.
- `CLAUDE.md` is useful but partially stale:
  - It says `Experience`, `Contact`, and `StarsCanvas` are commented out, but they are active in `App.jsx`.
  - It says component tests had a Vite React preamble issue, but tests were not runnable during this audit.
  - It mentions 16 tests, but the current test files contain more test cases than that.
- `GEMINI.md` is short and high-level.
- `CONTRIBUTING.md` is broad and still mostly useful.

New docs added for Codex:

- `AGENTS.md`
- `docs/INDEX.md`
- `docs/PROJECT_STATE_REPORT.md`
- `docs/ARCHITECTURE.md`
- `docs/QUALITY_AND_TESTING.md`
- `docs/ROADMAP.md`
- `docs/DEPLOYMENT.md`
- `docs/DOCS_MAINTENANCE.md`

## Verification Results

Dependency install:

```bash
npm install
```

Result:

- Passed.
- Added 643 packages.
- Audited 644 packages.
- Reported 26 vulnerabilities: 14 moderate, 11 high, 1 critical.
- Reported deprecated transitive packages including `inflight`, `rimraf@3`, `glob@7`, `@humanwhocodes/*`, and `eslint@8.57.1`.

Detailed audit:

- `npm audit --audit-level=low` was run after install.
- Critical advisory group: `@babel/traverse`.
- High advisory groups include `@remix-run/router` via React Router, `flatted`, `lodash`, `lodash.pick`, `minimatch`, `picomatch`, and `rollup`.
- Moderate advisory groups include `@babel/helpers`, `@babel/runtime`, `ajv`, `brace-expansion`, `esbuild`, `postcss`, and `yaml`.
- `npm audit fix --force` would introduce a breaking Vitest upgrade to `vitest@4.1.5`; do controlled dependency updates instead.

Attempted commands:

```bash
npm run lint
npx vitest run
npm run build
```

Results:

- Initial pre-install `npm run lint` failed because `eslint` was not recognized.
- Initial pre-install `npm run build` failed because `vite` was not recognized.
- Initial `npx vitest run` failed with `EPERM: operation not permitted, lstat 'C:\Users\Sarvesh Damle'`.

After `npm install`, initial results were:

- `npm run build`: passed.
- `npm run lint`: failed with 28 warnings and 0 errors because `--max-warnings 0` is enabled.
- `npm run format:check`: failed; Prettier reported style issues in 50 source files and warned that `jsxBracketSameLine` is deprecated.
- `npx vitest run`: still failed with the same `EPERM` path issue.
- `.\node_modules\.bin\vitest.cmd run`: failed inside sandbox with `spawn EPERM` while loading config/esbuild.
- Escalated `.\node_modules\.bin\vitest.cmd run`: passed, 5 test files and 48 tests.

Test warnings:

- React `act(...)` warnings in `useMediaQuery` and `useScrollPosition` tests.
- Expected PropTypes warning in the `Card` invalid-gradient test.

After Phase 1 cleanup:

- `npm run lint`: passed.
- `npm run format:check`: passed; Prettier still warns that `jsxBracketSameLine` is deprecated in config.
- Escalated `.\node_modules\.bin\vitest.cmd run`: passed, 6 test files and 67 tests.
- `npm run build`: passed.
- Test output no longer contains the previous React `act(...)` warnings or expected Card PropTypes warning.

After Phase 2/3 work:

- `npm run lint`: passed.
- `npm run format:check`: passed; Prettier still warns that `jsxBracketSameLine` is deprecated in config.
- Separate Prettier check for `README.md`, `CLAUDE.md`, and tests passed.
- Escalated `.\node_modules\.bin\vitest.cmd run`: passed, 6 test files and 68 tests.
- `npm run build`: passed.
- Build transformed 1593 modules.

After Phase 4/5/6 work:

- Hero `ComputersCanvas` was re-enabled.
- `ComputersCanvas`, `BallCanvas`, `EarthCanvas`, and `StarsCanvas` are wrapped with `ErrorBoundary`.
- `preserveDrawingBuffer` was removed from active canvases.
- Below-fold sections were lazy-loaded with React `lazy` and `Suspense`.
- `npm run test:run` was added as the non-watch CI command.
- Escalated `.\node_modules\.bin\vitest.cmd run`: passed, 9 test files and 75 tests.
- `npm run build`: passed, 1594 modules transformed.
- `npm audit --audit-level=high`: failed with 26 vulnerabilities, including 11 high and 1 critical.
- Dev server was reachable at `http://127.0.0.1:5173/index.html`.
- Browser screenshot verification remains pending because the in-app Browser runtime was not exposed and Playwright is not installed in this project.
- Added GitHub Actions CI in `.github/workflows/ci.yml`.
- Added deployment guide in `docs/DEPLOYMENT.md`.

Build notes:

- Build transformed 1578 modules.
- Largest JS chunk: `three-vendor`, about 823.20 kB raw and 221.77 kB gzip.
- Large output images include `tripguide` at about 3.4 MB, `food_delivery_website` at about 2.1 MB, `herobg` at about 930 kB, and `portfolio_website` at about 915 kB.
- Build warns that Browserslist/caniuse-lite is outdated.
- Build warns about eval use in `@chevrotain/utils`.

Git state:

```bash
git status --short --branch
```

Result:

- Initially failed with Git dubious ownership/safe-directory protection.
- Fixed by running `git config --global --add safe.directory D:/Development/Sarvesh_Projects/3D-Portfolio-Website`.
- Current status works and shows `## main...origin/main`.
- Current untracked project files are `AGENTS.md` and `docs/`.
- Git still warns about inaccessible user-level ignore file.

## Current Strengths

- Clear Vite React project structure.
- Static content is mostly separated into `src/config/constants/*`.
- Path aliases are configured consistently in Vite, Vitest, and jsconfig.
- Reusable common components exist for Button, Card, TiltCard, FormField, NavLink, SectionHeader, and ErrorBoundary.
- Custom hooks exist for media query and scroll state.
- Contact form validation is extracted to utilities.
- Build config includes manual chunking, asset naming, minification, and CSS splitting.
- Tests exist for common components and hooks.
- Tailwind theme centralizes core colors and custom breakpoint.
- 3D models are served from `public`, which is appropriate for glTF asset trees.

## Main Gaps And Issues

### P0: Lint Fails Because Warnings Are Treated As Failures

Status: fixed in Phase 1.

`npm run lint` previously failed with 28 warnings and 0 errors because the script uses `--max-warnings 0`.

Impact:

- No current lint impact after Phase 1.
- Keep the prior warning classes in mind when adding HOC-wrapped components or interactive elements.

Recommended next action:

1. Keep `npm run lint` in the verification gate.
2. Avoid reintroducing anonymous HOC default exports or clickable non-interactive elements.

### P0: Dependency Audit Vulnerabilities

`npm install` reported 26 vulnerabilities: 14 moderate, 11 high, 1 critical.

Impact:

- The dependency tree needs security review before deployment.
- Blind forced upgrades may break Vite/React/Three tooling.

Recommended next action:

```bash
npm audit
```

Then plan controlled dependency upgrades.

### P1: Hero 3D Experience

Status: fixed in Phase 4.

`Hero.jsx` renders `ComputersCanvas` again. The model is wrapped with `ErrorBoundary` at the canvas export level.

Remaining risk:

- Desktop/mobile browser screenshots still need to be captured and recorded before production deployment.

### P1: Common Components Are Underused

Status: mostly fixed for low-risk areas in Phase 3.

Reusable components now used by active sections:

- `Contact.jsx` uses `FormField`, `Button`, and `SectionHeader`.
- `About.jsx` uses `TiltCard` and `SectionHeader`.
- `Experience.jsx`, `Feedbacks.jsx`, and `Works.jsx` use `SectionHeader`.
- `Navbar.jsx` uses `NavLink`.
- Active canvas exports use `ErrorBoundary`.

Impact:

- Project cards remain section-specific because they handle image overlays and optional private/public link states.

Recommended direction:

- Only extract the project-card layout later if it removes real duplication.

### P1: Placeholder Content And Links

Status: fixed for truthfulness in Phase 2; real public artifacts still pending.

`src/config/constants/projects.js` previously contained placeholder comments and generic GitHub URLs:

- Buddies used `tripguide` image and generic GitHub links.
- Green Your Bills used `jobit` image and generic GitHub links.
- EZ Order used `carrent` image and generic GitHub links.
- Several deployed URLs pointed to GitHub profile rather than live projects.

Impact:

- The portfolio may look unfinished to viewers.
- Project credibility is reduced even if the codebase is technically sound.

Recommended direction:

- Add real screenshots/live URLs when public artifacts are available.
- Continue leaving private/company repositories and systems marked as private instead of linking to placeholders.

### P1: Security And External Links

Status: fixed in Phase 1.

`Works.jsx` previously called `window.open(url, "_blank")` without explicit `noopener,noreferrer`.

Impact:

- Potential reverse-tabnabbing risk.

Resolution:

- Project preview and source-code interactions now use semantic anchors with `target="_blank"` and `rel="noopener noreferrer"`.
- Project preview alt text now includes the project name.

### P1: Contact UX Needs Production Hardening

Status: partially fixed in Phase 1.

`Contact.jsx` still uses EmailJS directly from the browser, but blocking `alert()` calls were replaced with inline status messages. The form now checks whether required EmailJS environment variables are configured before sending, and the submit button disables while loading.

Impact:

- EmailJS remains a browser-exposed contact strategy.
- There is not yet an automated Contact component test with EmailJS mocked.

Recommended direction:

- Add Contact component tests with EmailJS mocked.
- Use common `Button` and `FormField` during the component consolidation phase.
- Consider rate-limit/captcha/serverless proxy if spam becomes a concern.

Phase 3 update:

- `Contact.jsx` now uses the shared `FormField`, `Button`, and `SectionHeader` components.

### P1: Error Boundary Is Not Integrated Where It Matters

Status: fixed in Phase 4.

Active canvas exports wrapped with `ErrorBoundary`:

- `ComputersCanvas`
- `BallCanvas`
- `EarthCanvas`
- `StarsCanvas`

Remaining risk:

- Canvas behavior still needs browser-level visual checks because jsdom unit tests cannot verify WebGL output.

### P2: Deprecated Constants File Can Drift

Status: fixed in Phase 3.

`src/constants/index.js` previously existed as a deprecated all-in-one constants file and differed from `src/config/constants/*`.

Impact:

- Low current impact. The file is now a compatibility re-export from `src/config/constants`.

Recommended direction:

- Keep content edits in `src/config/constants/*`.
- Remove the compatibility file later only if no legacy imports need it.

### P2: Mixed Import Styles

Some active files use aliases; others use relative imports:

- `Contact.jsx`, `Hero.jsx`, `SectionWrapper.jsx`, and several common components still use relative paths.

Impact:

- Not functionally wrong, but inconsistent with the documented architecture.

Recommended direction:

- Standardize imports gradually while touching files for real changes.

Phase 3 update:

- Contact, SectionHeader, Navbar, About, Works, Experience, and Feedbacks were moved further toward aliases/common components while being touched.

### P2: Accessibility Gaps

Observed likely gaps:

- Mobile menu icon is an image with click handler, not a button.
- Project card image and GitHub icon use click handlers on non-button/non-anchor elements.
- Tilt-heavy interactions may not have keyboard equivalents.
- `alert()` is not an ideal status pattern.
- Some `alt` text is generic, such as `project_image`.

Recommended direction:

- Use semantic buttons/anchors.
- Add accessible names.
- Use `aria-expanded` on mobile nav.
- Replace generic alt text with project-specific alt text.

### P2: Performance And Asset Optimization

The project ships many large images and 3D textures.

Impact:

- Initial load and mobile rendering can be heavy.
- Manual chunks help JS caching, but static assets still need attention.

Recommended direction:

- Convert large PNG screenshots to WebP/AVIF where practical.
- Compress glTF textures.
- Keep non-critical sections lazy-loaded.
- Continue asset-size cleanup with real screenshots and optimized 3D textures.
- Reassess bundle/asset sizes after every dependency or asset update.

### P2: Browser Runtime Needs Real Testing

The static audit cannot confirm:

- Canvas visibility and framing.
- Mobile layout behavior.
- EmailJS submission.
- Section anchor behavior under fixed navbar.
- Asset load paths after production build.

Recommended direction:

- After installing dependencies, use browser testing across desktop and mobile viewport sizes.

## Suggested Priority Order

1. Plan controlled dependency upgrades from the audit results.
2. Capture browser screenshots for desktop/mobile and verify the re-enabled hero model framing.
3. Add real public screenshots/live URLs when available.
4. Add remaining smoke tests for Hero, About, Experience, Tech, App, and browser behavior.
5. Optimize large assets.
6. Choose hosting platform, configure EmailJS production variables, and deploy.

## Open Questions

- What is the target deployment platform: Vercel, Netlify, GitHub Pages, or another host?
- Should private work projects link to public pages, case studies, or no external link?
- Should the portfolio emphasize current professional GYB/EZOrder work or personal projects first?
- Is EmailJS the final contact strategy, or should contact go through a backend/serverless endpoint?
- Are the current hero computer model framing and performance acceptable on desktop and mobile after browser verification?
