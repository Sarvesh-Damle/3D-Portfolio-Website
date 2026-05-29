# Quality And Testing

Audit date: 2026-04-26

## Current Quality Gate Status

The project has quality scripts configured and dependencies were installed during this audit.

`node_modules` status:

```text
node_modules exists: true
```

Current command results after Phase 6 cleanup:

```bash
npm run lint
```

Result:

- Passed.
- Previous 28-warning failure was fixed by naming HOC-wrapped section exports and replacing clickable non-interactive elements with semantic anchors/buttons.

```bash
npm run build
```

Result:

- Passed.
- Vite v4.1.4.
- 1594 modules transformed.
- Largest JS chunk: `three-vendor`, about 823.20 kB raw and 221.77 kB gzip.
- Lazy chunks include `Stars`, `Contact`, and `Tech`.
- Largest emitted images remain `tripguide` at about 3.4 MB and `food_delivery_website` at about 2.1 MB.
- Build warnings: outdated Browserslist/caniuse-lite and eval usage in `@chevrotain/utils`.

```bash
npm run format:check
```

Result:

- Passed.
- Prettier still warns that `jsxBracketSameLine` is deprecated in the config.

```bash
npx vitest run
```

Result:

```text
EPERM: operation not permitted, lstat 'C:\Users\Sarvesh Damle'
```

Likely cause:

- Sandbox/environment restriction while resolving `npx`.

Successful/current test command in this environment:

```bash
.\node_modules\.bin\vitest.cmd run
```

This needed elevated execution because Vitest/esbuild initially failed with `spawn EPERM` inside the sandbox.

Current result:

- 9 test files passed.
- 75 tests passed.
- Previous React `act(...)` warnings and Card PropTypes warning were cleaned up.

## Required Setup Before Real Verification

For a fresh checkout, run:

```bash
npm install
```

Then run:

```bash
npm run lint
npm run test:run
npm run format:check
npm run build
```

On this Windows Codex environment, use the local Vitest binary if `npm run test:run` is blocked by sandbox process-spawn restrictions:

```powershell
.\node_modules\.bin\vitest.cmd run
```

Optional:

```bash
npm run test:coverage
```

Git safe-directory ownership has been fixed for this checkout with:

```bash
git config --global --add safe.directory D:/Development/Sarvesh_Projects/3D-Portfolio-Website
```

## Script Inventory

From `package.json`:

- `npm run dev`: starts Vite dev server.
- `npm run build`: production Vite build.
- `npm run preview`: serves production build preview.
- `npm run lint`: ESLint with zero warnings allowed.
- `npm run lint:fix`: ESLint autofix.
- `npm run format`: Prettier write for source files.
- `npm run format:check`: Prettier check.
- `npm run test`: Vitest watch mode.
- `npm run test:run`: Vitest non-watch run for agents and CI.
- `npm run test:ui`: Vitest UI.
- `npm run test:coverage`: Vitest coverage.
- `npm run prepare`: Husky setup.

Recommended non-watch test command for agents:

```bash
npm run test:run
```

## Existing Test Coverage

Current test files:

- `tests/components/common/Button.test.jsx`
- `tests/components/common/Card.test.jsx`
- `tests/components/common/FormField.test.jsx`
- `tests/components/Contact.test.jsx`
- `tests/components/Navbar.test.jsx`
- `tests/components/Works.test.jsx`
- `tests/hooks/useMediaQuery.test.js`
- `tests/hooks/useScrollPosition.test.js`
- `tests/utils/validators.test.js`

Covered behavior:

- Button rendering, variants, disabled state, loading state, click handling, type, custom class.
- Card rendering, gradient variants, class forwarding.
- FormField input/textarea rendering, placeholder, current value, change handler, error display, required marker, rows, wrapper class, input types.
- Contact validation failure and missing EmailJS configuration status.
- Navbar link rendering and mobile menu toggle.
- Works project-card rendering, private/unavailable labels, and conditional source-link behavior.
- `useMediaQuery` initial value, event listener subscription, cleanup, query change updates.
- `useScrollPosition` listener subscription, cleanup, threshold updates.
- Contact-form validators for email, name, message, and full-form validation.

Known test issues fixed in Phase 1:

- `useScrollPosition.test.js` now awaits the default-threshold `waitFor`.
- Hook tests wrap direct listener invocations in `act(...)`.
- `Card.test.jsx` suppresses the expected PropTypes warning in the invalid-gradient fallback test.

## Major Coverage Gaps

### Active Section Smoke Tests

Still missing smoke tests for these active sections:

- `Hero`
- `About`
- `Experience`
- `Tech`
- `StarsCanvas`
- `App`

Recommended:

- Add lightweight smoke tests with mocks for canvas components and motion where needed.

### Contact Form Tests

Covered:

- Empty submit validation behavior.
- Missing EmailJS environment variable status.

Still missing:

- Successful EmailJS send path.
- Failed EmailJS send path.
- Loading/disabled state.

Recommended:

- Mock `@emailjs/browser`.
- Replace `alert()` usage with inline status first, then test status messages.

### Validators Tests

Status: added in Phase 1.

Direct tests now cover `validateEmail`, `validateName`, `validateMessage`, and `validateContactForm`.

### Navbar Tests

Covered:

- Desktop nav link rendering.
- Mobile menu toggle.
- `aria-expanded` state on toggle.

Still missing:

- Logo click scroll-to-top behavior.
- Scroll background behavior using `useScrollPosition`.

### Works/Project Tests

Covered:

- Project cards render from data.
- Source/deployed unavailable labels render intentionally.
- Source links render only when source URLs exist.

Still missing:

- Project image alt text is meaningful.

### Canvas Tests

Missing:

- Smoke tests for canvas component wrappers.
- Error boundary integration tests.
- Browser-level visual checks for nonblank canvases.

Recommended:

- Unit tests can mock `@react-three/fiber` and `@react-three/drei`.
- Browser tests should verify screenshots after the dev server runs.

## ESLint Configuration Notes

Rules currently enforce:

- React recommended rules.
- Hooks recommended rules.
- JSX accessibility recommended rules.
- React Refresh export warning.
- PropTypes as errors.
- `react/jsx-no-target-blank` as error.
- `no-console` warning except `warn` and `error`.
- `no-unused-vars` error with React ignored.

Three.js JSX props are allowlisted in `react/no-unknown-property`.

Potential improvements:

- Add missing allowlisted Three/R3F props as needed after lint actually runs.
- Make accessibility warnings actionable during the accessibility phase.

## Build Configuration Notes

Build optimization exists in `vite.config.js`:

- Manual chunks.
- Terser minification.
- Console/debugger removal.
- Asset naming.
- CSS splitting.

Verification needed:

- Actual bundle size.
- Whether all assets resolve correctly in production.
- Whether Vite 4 and plugin versions are still healthy with current Node.
- Whether Node v21.5.0 in the environment is compatible enough. Project docs say Node 16+ but modern tooling often behaves best on LTS versions.

## Dependency And Security Checks

`npm install` reported 26 vulnerabilities:

- 14 moderate
- 11 high
- 1 critical

Detailed `npm audit --audit-level=low` was run on 2026-04-26.
`npm audit --audit-level=high` was re-run on 2026-04-27 and failed as expected with the same overall count: 26 vulnerabilities, including 11 high and 1 critical.

Packages/advisory groups reported:

- Critical: `@babel/traverse`.
- High: `@remix-run/router` through `react-router` and `react-router-dom`.
- High: `flatted`.
- High: `lodash` through `chevrotain`, `three-stdlib`, and related Drei/Three dependencies.
- High: `lodash.pick` through `@react-three/drei`.
- High: `minimatch`.
- High: `picomatch`.
- High: `rollup`.
- Moderate: `@babel/helpers`.
- Moderate: `@babel/runtime`.
- Moderate: `ajv`.
- Moderate: `brace-expansion`.
- Moderate: `esbuild` through Vite/Vitest.
- Moderate: `postcss`.
- Moderate: `yaml`.

Audit remediation notes:

- `npm audit fix` is available for many issues.
- `npm audit fix --force` would install `vitest@4.1.5`, a breaking change from the current Vitest 1.6.1 setup.
- Do not run forced audit fixes blindly. Upgrade in controlled batches and re-run lint, tests, and build.

To refresh the detailed audit:

```bash
npm audit
```

Recommended handling:

- Record exact vulnerability count and packages.
- Prefer controlled upgrades over blind major-version `npm audit fix --force`.
- Re-run build and tests after every dependency upgrade batch.

## CI

GitHub Actions is configured in `.github/workflows/ci.yml`.

The CI gate runs:

- `npm ci`
- `npm run lint`
- `npm run test:run`
- `npm run format:check`
- `npm run build`
- `npm audit --audit-level=high`

Current caveat:

- The audit step is expected to fail until the high/critical dependency advisories are addressed. That is intentional for deployment readiness.

## Browser Verification Matrix

Current status:

- Dev server was reachable at `http://127.0.0.1:5173/index.html` on 2026-04-27.
- Screenshot verification is still pending because the in-app Browser runtime was not exposed in this session and Playwright is not installed in this project.

After dependencies install and dev server runs, verify:

- Desktop 1440x900.
- Desktop 1920x1080.
- Tablet around 768x1024.
- Mobile around 390x844.

Manual checks:

- Hero text fits and background loads.
- If hero 3D is re-enabled, computer model is visible and framed.
- Navbar anchor links land at correct sections under fixed navbar.
- Mobile nav opens, closes, and remains accessible.
- Technology balls render and do not create unacceptable jank.
- Project cards open safe links.
- Contact form validates, sends, and shows success/error status.
- Stars render behind contact without covering form interactions.

Recommended automated browser checks later:

- Playwright smoke test for home page render.
- Playwright screenshot on desktop/mobile.
- Basic canvas nonblank pixel check for active 3D canvases.

## Definition Of Done For Future Tasks

For small code/content changes:

- Relevant unit tests added or updated when behavior changes.
- `npm run lint` passes.
- `npm run test:run` passes, or `.\node_modules\.bin\vitest.cmd run` passes in this sandboxed Windows environment.
- `npm run format:check` passes, or formatting has been intentionally applied with `npm run format`.
- `npm run build` passes if app behavior or build config changed.
- Relevant docs updated.

For visual/3D/layout changes:

- All small-change checks.
- Browser screenshots checked on desktop and mobile.
- Canvas load/frame verified.

For dependency changes:

- Exact packages changed documented.
- Audit/build/test results recorded.
- Manual browser smoke test performed if React, Vite, Three, Tailwind, Framer Motion, or EmailJS changed.
