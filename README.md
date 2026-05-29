# 3D Portfolio Website

Interactive portfolio site for Sarvesh Damle, built with React, Vite, Three.js, Framer Motion, and Tailwind CSS.

## Current State

The active app renders:

- Navbar
- Hero
- About
- Experience
- Technology stack
- Projects
- Contact
- Star background behind Contact

`Feedbacks` is intentionally not rendered because testimonial content has not been verified. The hero desktop-computer canvas is active and wrapped with canvas-level error handling.

## Tech Stack

- React 18
- Vite 4
- Tailwind CSS 3
- Three.js with `@react-three/fiber` and `@react-three/drei`
- Framer Motion
- EmailJS
- PropTypes
- Vitest and React Testing Library
- ESLint and Prettier

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and fill in EmailJS values if the contact form should send messages:

```env
VITE_APP_EMAILJS_SERVICE_ID=your_service_id_here
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_APP_SITE_NAME="Sarvesh Damle Portfolio"
VITE_APP_CONTACT_EMAIL=your.email@example.com
```

Without these values, the contact form renders but shows an inline configuration message instead of sending.

## Commands

Development:

```bash
npm run dev
```

Quality gates:

```bash
npm run lint
npm run test:run
npm run format:check
npm run build
```

On this Windows Codex environment, the local Vitest binary may need elevated execution:

```powershell
.\node_modules\.bin\vitest.cmd run
```

Formatting:

```bash
npm run format
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  components/             Page sections, common UI, and canvas components
  components/common/      Button, Card, TiltCard, FormField, NavLink, SectionHeader, ErrorBoundary
  components/canvas/      Ball, Earth, Stars, and optional Computers canvases
  config/constants/       Canonical portfolio content data
  constants/              Compatibility re-export to config/constants
  hoc/                    SectionWrapper
  hooks/                  useMediaQuery and useScrollPosition
  utils/                  Motion variants and validators
  assets/                 Imported images, icons, logos, and document assets
public/
  desktop_pc/             Desktop PC glTF asset tree
  planet/                 Planet glTF asset tree
tests/
  components/common/      Common component tests
  hooks/                  Hook tests
  utils/                  Validator tests
docs/
  *.md                    Codex project knowledge base and roadmap
```

## Content Editing

Edit portfolio content in `src/config/constants/`:

- `navigation.js`
- `services.js`
- `technologies.js`
- `experiences.js`
- `projects.js`
- `testimonials.js`

Do not edit `src/constants/index.js` for content. It exists only as a compatibility re-export.

For private/company projects, leave `source_code_link` or `deployed_url` empty and set `source_label` or `demo_label` clearly. The project cards will render honest unavailable/private states instead of linking to placeholders.

## Documentation

Start with:

- `AGENTS.md`
- `docs/INDEX.md`
- `docs/PROJECT_STATE_REPORT.md`
- `docs/ROADMAP.md`
- `docs/QUALITY_AND_TESTING.md`
- `docs/ARCHITECTURE.md`
- `docs/DEPLOYMENT.md`

Future code changes should update the relevant docs in the same work session.

## Known Follow-Ups

- Controlled dependency upgrades are needed. `npm audit` reports vulnerabilities, and forced audit fixes should not be applied blindly.
- Project screenshots and live deployment URLs should be replaced when real public artifacts are available.
- Browser visual testing should be added before deployment.
- A hosting platform and EmailJS production variables still need to be configured.
