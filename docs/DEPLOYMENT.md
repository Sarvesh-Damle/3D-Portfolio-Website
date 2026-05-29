# Deployment

Audit date: 2026-04-27

This project is a static Vite React app. Any static host that can run `npm ci` and `npm run build` can deploy it from `dist/`.

## Recommended Target

Recommended first choice: Vercel.

Reasoning:

- Vercel handles Vite apps directly.
- Pull requests can get preview deployments.
- Environment variables are easy to configure per environment.
- Rollbacks are built into the deployment history.

Netlify is also suitable. GitHub Pages is possible, but it needs extra attention if the site is not hosted at the domain root because Vite's `base` setting may need to change.

## Build Settings

Use these settings on the hosting platform:

```text
Framework preset: Vite
Install command: npm ci
Build command: npm run build
Output directory: dist
Node version: 20.x LTS
```

## Required Environment Variables

The contact form reads these variables at build/runtime through Vite:

```text
VITE_APP_EMAILJS_SERVICE_ID
VITE_APP_EMAILJS_TEMPLATE_ID
VITE_APP_EMAILJS_PUBLIC_KEY
VITE_APP_SITE_NAME
VITE_APP_CONTACT_EMAIL
```

If any value is missing, the Contact section intentionally shows:

```text
Contact form is not configured yet. Please email me directly.
```

## Pre-Deploy Gate

Run this locally before publishing:

```bash
npm run lint
npm run test:run
npm run format:check
npm run build
```

Then run a production preview:

```bash
npm run preview
```

Manual checks:

- Hero computer model is visible and does not block text.
- Navbar anchors land on the correct sections.
- Mobile menu opens and closes.
- Project cards show private/unpublished states honestly.
- Contact form validates empty inputs.
- Contact form sends successfully when EmailJS variables are configured.
- Contact form shows the configuration message when variables are missing.

## CI

GitHub Actions is configured in `.github/workflows/ci.yml`.

The workflow runs:

- `npm ci`
- `npm run lint`
- `npm run test:run`
- `npm run format:check`
- `npm run build`
- `npm audit --audit-level=high`

Current caveat:

- The audit step is intentionally strict and may fail until dependency vulnerabilities are addressed. Treat that as a deployment blocker, not noise.

## Rollback

On Vercel or Netlify:

1. Open the deployment history.
2. Select the last known good deployment.
3. Promote or roll back to that deployment.
4. Re-check the production URL, home page, nav anchors, project cards, and contact form.

## Production Smoke Record

Record each production deployment here or in a linked release note:

```text
Date:
Platform:
Production URL:
Commit:
Lint:
Tests:
Format check:
Build:
Audit:
Desktop smoke:
Mobile smoke:
Contact form:
Notes:
```

## Current Deployment Blockers

- Hosting platform has not been selected.
- Production URL is not configured.
- EmailJS production environment variables are not confirmed.
- Dependency audit still reports vulnerabilities from the current dependency tree.
- Real project screenshots/live URLs are still pending for some cards.
