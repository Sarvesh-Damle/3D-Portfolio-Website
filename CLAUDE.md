# Claude / Legacy Agent Notes

This repository is now maintained with the Codex project knowledge base.

Start with:

- `AGENTS.md`
- `docs/INDEX.md`
- `docs/PROJECT_STATE_REPORT.md`
- `docs/ROADMAP.md`
- `docs/QUALITY_AND_TESTING.md`
- `docs/ARCHITECTURE.md`

## Current App State

Active sections:

- Navbar
- Hero
- About
- Experience
- Tech
- Works
- Contact
- StarsCanvas

Inactive:

- Feedbacks

Partially inactive:

- The desktop-computer canvas exists, but `Hero.jsx` currently does not render it.

## Commands

```bash
npm run lint
.\node_modules\.bin\vitest.cmd run
npm run format:check
npm run build
```

## Content Source

Canonical content lives in `src/config/constants/`.

`src/constants/index.js` is only a compatibility re-export. Do not add new content there.
