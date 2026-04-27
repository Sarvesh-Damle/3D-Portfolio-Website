# Architecture

Audit date: 2026-04-26

## Application Shape

This is a client-rendered Vite React single-page application. It uses hash anchors for page sections, animated section reveals through Framer Motion, and several Three.js canvases for 3D visual elements.

The application entrypoint is:

- `index.html`
- `src/main.jsx`
- `src/App.jsx`

`src/main.jsx` mounts React in strict mode. `src/App.jsx` wraps the app with `BrowserRouter`, renders a fixed navbar, and lays out all portfolio sections. Below-fold sections are lazy-loaded with React `lazy` and `Suspense`.

## Active Section Tree

Current `App.jsx` tree:

```text
BrowserRouter
  div.bg-primary
    div.bg-hero-pattern
      Navbar
      Hero
    About
    Suspense
      Experience
      Tech
      Works
      div.relative
        Contact
        StarsCanvas
```

`Feedbacks` is imported but commented out.

## Directory Responsibilities

```text
src/
  App.jsx                 Main section composition
  main.jsx                React root mount
  index.css               Tailwind entry and global custom CSS
  styles.js               Shared Tailwind class strings
  assets/                 Imported images, icons, logos, PDFs, EPS files
  components/             Page sections, common components, and canvas components
  config/constants/       Active data model for nav, services, tech, experience, testimonials, projects
  constants/              Compatibility re-export to config/constants
  hoc/                    SectionWrapper HOC
  hooks/                  Custom React hooks
  utils/                  Motion variants and validation helpers
tests/
  components/             Active section smoke tests
  components/common/      Common component tests
  hooks/                  Hook tests
  utils/                  Validator tests
public/
  desktop_pc/             Desktop PC glTF model and textures
  planet/                 Planet glTF model and textures
```

## Data Model

Active content is data-driven through `src/config/constants/*`:

- `navigation.js`: section anchor IDs and titles.
- `services.js`: service card labels and icons.
- `technologies.js`: technology icon balls.
- `experiences.js`: work timeline entries.
- `testimonials.js`: testimonial data, currently not active in the app.
- `projects.js`: project cards, tags, images, source links, deployed links.

The components import from `@config/constants`, which re-exports all of these files.

Important caveat:

- `src/constants/index.js` is now a compatibility re-export. New content edits should be made only in `src/config/constants/*`.

## Routing And Navigation

The app uses `BrowserRouter`, but no route table is currently defined. Navigation is hash-anchor based:

- `Navbar` renders links as `href="#about"`, `href="#work"`, `href="#works"`, and `href="#contact"`.
- `SectionWrapper(Component, idName)` injects a `span.hash-span` with the section ID.
- `.hash-span` in `index.css` offsets anchor jumps for the fixed navbar.

Current section IDs:

- About: `about`
- Experience: `work`
- Tech: empty string because `SectionWrapper(Tech, "")`
- Works: `works`
- Contact: `contact`

Tech has no nav entry and no useful anchor ID.

## Component Patterns

### SectionWrapper

Location: `src/hoc/SectionWrapper.jsx`

Responsibilities:

- Wraps sections in `motion.section`.
- Applies `staggerContainer` animation.
- Applies shared section padding and max width.
- Adds anchor span.

Potential issue:

- It always renders an anchor span, even when `idName` is an empty string.

### Common Components

Location: `src/components/common/`

Available:

- `Button`
- `Card`
- `TiltCard`
- `FormField`
- `NavLink`
- `SectionHeader`
- `ErrorBoundary`
- `ErrorFallback`

Current state:

- These components are tested and used by more active sections after Phase 3 started.
- `Contact` uses `FormField`, `Button`, and `SectionHeader`.
- `About` uses `TiltCard` and `SectionHeader`.
- `Navbar` uses `NavLink`.
- `Experience`, `Feedbacks`, and `Works` use `SectionHeader`.
- `Works` still has a section-specific project-card layout because it handles image overlays and optional private/public link states.

### Canvas Components

Location: `src/components/canvas/`

Available:

- `Computers.jsx`: desktop PC model rendered by `Hero`.
- `Earth.jsx`: planet model rendered in `Contact`.
- `Ball.jsx`: 3D technology icon ball rendered by `Tech`.
- `Stars.jsx`: animated starfield rendered behind contact section.

Common dependencies:

- `Canvas` from `@react-three/fiber`.
- `Suspense`.
- `Preload` from `@react-three/drei`.
- `OrbitControls`.
- `useGLTF` or `useTexture`.
- `CanvasLoader`.

Rendering choices:

- `ComputersCanvas`, `BallCanvas`, and `EarthCanvas` use `frameloop="demand"`.
- `StarsCanvas` uses `useFrame`, so it is animated continuously.
- Active canvas exports are wrapped with `ErrorBoundary`.
- `preserveDrawingBuffer` was removed from the active canvases during Phase 4 because screenshots/export are not part of the runtime feature set.
- `Preload all` was replaced with narrower `Preload` usage where retained.

## Styling

Primary styling model:

- Tailwind utility classes.
- Custom colors and breakpoints in `tailwind.config.cjs`.
- Shared class strings in `src/styles.js`.
- Global gradients and canvas loader CSS in `src/index.css`.

Tailwind theme additions:

- Colors: `primary`, `secondary`, `tertiary`, `black-100`, `black-200`, `white-100`.
- Box shadow: `card`.
- Screen: `xs` at 450px.
- Background image: `hero-pattern` using `/src/assets/herobg.png`.

Design state:

- The site uses a dark purple/blue portfolio aesthetic.
- Cards use relatively large radius values like `rounded-2xl` and `rounded-[20px]`.
- Existing design consistency should be improved before any major redesign.

## Build Configuration

Location: `vite.config.js`

Configured behavior:

- React plugin.
- Path aliases.
- Output directory: `dist`.
- Sourcemaps disabled.
- Minification through Terser.
- Drops console and debugger in production.
- Manual chunks:
  - `react-vendor`
  - `three-vendor`
  - `animation`
  - `utils`
- Custom asset naming by extension.
- CSS code splitting enabled.
- Dev server port 5173 with `open: true`.
- Preview server port 4173 with `open: true`.

Potential concerns:

- `server.open: true` can be inconvenient for automated runs.
- `@emailjs/browser` is grouped in the `utils` chunk and Contact is lazily loaded with the below-fold sections.
- React Router is chunked although route-based navigation is not used beyond `Link` in the logo.

## Testing Architecture

Location: `vitest.config.js`

Configured behavior:

- React plugin with `fastRefresh: false`.
- jsdom environment.
- `tests/setup.js` setup.
- CSS support.
- V8 coverage provider.
- Same aliases as Vite.

Tests currently cover:

- `Button`
- `Card`
- `FormField`
- `Contact`
- `Navbar`
- `Works`
- `useMediaQuery`
- `useScrollPosition`
- Contact validators directly

Not currently covered:

- Hero, About, Experience, and Tech section smoke behavior.
- Successful/failed EmailJS promise paths.
- 3D canvas behavior.
- Motion/HOC behavior.
- Browser smoke behavior.

## Environment Variables

Defined in `.env.example`:

```text
VITE_APP_EMAILJS_SERVICE_ID
VITE_APP_EMAILJS_TEMPLATE_ID
VITE_APP_EMAILJS_PUBLIC_KEY
VITE_APP_SITE_NAME
VITE_APP_CONTACT_EMAIL
```

Used by `Contact.jsx`:

- EmailJS service ID.
- EmailJS template ID.
- EmailJS public key.
- Site name.
- Contact email.

Recommended improvement:

- Create a typed/validated config module that centralizes env access and provides clear runtime errors.

## Asset Model

Imported assets:

- `src/assets/index.js` centralizes image/icon imports and exports.
- Technology icons are imported by constants and rendered as decals on 3D balls.
- Project screenshots are imported by project constants.

Public assets:

- glTF models live under `public/desktop_pc` and `public/planet`.
- Canvas components reference models with paths like `./planet/scene.gltf` and `./desktop_pc/scene.gltf`.

Potential concerns:

- Large assets need compression review.
- Some unused assets are exported, such as `typescript`, `docker`, `figma`, and company icons that are not used by active constants.
- Some project visuals still use available repository assets until real public screenshots are supplied.

## Dependency Boundaries

Good existing boundaries:

- Constants own content.
- Components own presentation.
- Hooks own browser state subscriptions.
- Utils own validation and motion variants.
- Canvas components own Three.js scene setup.

Boundaries needing cleanup:

- Remaining common-component drift is mainly in the richer project card layout, which is section-specific for now.
- Tech still has no useful section anchor ID.
- Browser-level visual verification is still manual/pending.

## Suggested Target Architecture

Near-term target:

- `src/config/constants/*` remains the only editable content source.
- Common components are used by all sections where practical.
- `Contact.jsx` uses `FormField`, `Button`, and inline env configuration checks.
- Project links use accessible anchors or a safe open helper.
- All active canvases have error-boundary coverage.
- Tests cover high-risk active sections at smoke-test level, with remaining section smoke tests added before deployment hardening.

Longer-term target:

- Lazy-load heavy visual sections and Contact.
- Replace placeholder assets with optimized real portfolio visuals.
- Add browser visual checks for desktop and mobile.
- Add deploy configuration and documented hosting path.
