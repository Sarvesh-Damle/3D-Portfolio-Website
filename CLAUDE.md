# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a production-ready 3D portfolio website built with React 18, Three.js, and Tailwind CSS. The codebase follows industry best practices with proper tooling, testing, type safety, and modular architecture. Features interactive 3D models, smooth animations, form validation, and optimized production builds.

## Development Commands

**Install dependencies:**

```bash
npm install
```

Note: All dependency issues have been resolved. The project now uses `react-parallax-tilt` (React 18 compatible) instead of `react-tilt`.

**Development:**

```bash
npm run dev              # Start dev server on http://localhost:5173/
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint errors
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

**Testing:**

```bash
npm run test             # Run tests in watch mode
npm run test:ui          # Run tests with UI interface
npm run test:coverage    # Generate coverage report
```

**Production:**

```bash
npm run build            # Build for production (optimized)
npm run preview          # Preview production build on http://localhost:4173/
```

## Architecture

### Tech Stack

**Core:**

- **React 18.2.0** - UI framework with modern JSX transform (no React import needed)
- **Vite 4.1.0** - Fast build tool and dev server with HMR
- **Tailwind CSS 3.2** - Utility-first CSS framework

**3D Graphics:**

- **Three.js 0.149.0** - 3D graphics library
- **@react-three/fiber 8.11** - React renderer for Three.js
- **@react-three/drei 9.56** - Helper components and utilities

**Animation & UI:**

- **Framer Motion 9.0** - Animation library with viewport triggers
- **react-parallax-tilt 1.7** - 3D tilt effect (React 18 compatible)
- **react-vertical-timeline 3.6** - Timeline component

**Development Tools:**

- **ESLint 8.57** - Code linting with React, hooks, and a11y plugins
- **Prettier 3.7** - Code formatting
- **PropTypes 15.8** - Runtime type validation
- **Vitest 1.6** - Unit testing with React Testing Library
- **Husky 9.1** + **lint-staged 15.5** - Git hooks for quality gates

**Other:**

- **EmailJS 3.10** - Client-side email service
- **Terser 5.44** - Production minification

### Project Structure (Refactored)

```
src/
├── components/              # React components
│   ├── canvas/             # 3D canvas components
│   │   ├── Ball.jsx        # 3D ball with tech icons
│   │   ├── Computers.jsx   # 3D computer model (uses useMediaQuery hook)
│   │   ├── Earth.jsx       # 3D Earth globe
│   │   ├── Stars.jsx       # Animated star field
│   │   └── index.js        # Barrel export
│   ├── common/             # Reusable UI components (NEW)
│   │   ├── Card/           # Base card with gradient borders
│   │   ├── TiltCard/       # Card with 3D tilt effect
│   │   ├── FormField/      # Form inputs with validation display
│   │   ├── Button/         # Button with variants and loading states
│   │   ├── NavLink/        # Navigation link component
│   │   ├── SectionHeader/  # Standardized section headers
│   │   ├── ErrorBoundary/  # Error handling for 3D components
│   │   └── index.js        # Barrel export
│   ├── About.jsx           # About section with service cards
│   ├── Contact.jsx         # Contact form with validation (uses validators)
│   ├── Experience.jsx      # Work experience timeline
│   ├── Feedbacks.jsx       # Testimonials section
│   ├── Hero.jsx            # Hero section with 3D computer
│   ├── Navbar.jsx          # Navigation bar (uses useScrollPosition hook)
│   ├── Tech.jsx            # Technology stack with 3D balls
│   ├── Works.jsx           # Projects showcase with tilt cards
│   ├── Loader.jsx          # 3D loading component
│   └── index.js            # Barrel export
├── config/                 # Configuration (NEW - split from constants)
│   └── constants/          # Static data organized by domain
│       ├── navigation.js   # Navigation links (BUG FIX: contact id corrected)
│       ├── services.js     # Services/skills data
│       ├── technologies.js # Tech stack data
│       ├── experiences.js  # Work experience data
│       ├── testimonials.js # Testimonials data
│       ├── projects.js     # Portfolio projects data
│       └── index.js        # Barrel export
├── hooks/                  # Custom React hooks (NEW)
│   ├── useMediaQuery.js    # Media query detection hook
│   ├── useScrollPosition.js # Scroll position tracking hook
│   └── index.js            # Barrel export
├── hoc/                    # Higher-order components
│   └── SectionWrapper.jsx  # Wraps sections with motion and styling
├── utils/                  # Utility functions
│   ├── motion.js           # Framer Motion animation variants
│   └── validators.js       # Form validation utilities (NEW)
├── assets/                 # Images, logos, 3D models
├── constants/              # DEPRECATED - kept for backward compatibility
│   └── index.js            # Imports from @config/constants
├── styles.js               # Reusable Tailwind class strings
├── App.jsx                 # Main app component
└── main.jsx                # Entry point

tests/
├── components/             # Component tests
│   └── common/            # Common component tests
│       ├── Card.test.jsx
│       ├── FormField.test.jsx
│       └── Button.test.jsx
├── hooks/                 # Hook tests
│   ├── useMediaQuery.test.js (7 tests ✅)
│   └── useScrollPosition.test.js (9 tests ✅)
└── setup.js              # Test configuration
```

### Key Architectural Patterns

**Path Aliases (NEW):**

- Clean imports using `@` prefix instead of relative paths
- Configured in `jsconfig.json`, `vite.config.js`, and `vitest.config.js`
- Available aliases:
  ```javascript
  import { Button } from "@components/common/Button";
  import { navLinks } from "@config/constants";
  import { useMediaQuery } from "@hooks";
  import { validateEmail } from "@utils/validators";
  import logo from "@assets/logo.svg";
  import { styles } from "@styles/styles";
  ```

**Common Components System (NEW):**

- Reusable UI components in `src/components/common/`
- All have PropTypes and JSDoc documentation
- Components:
  - `Card` - Base card with gradient borders
  - `TiltCard` - Card with 3D parallax tilt effect
  - `FormField` - Form inputs with error handling
  - `Button` - Button with loading states
  - `NavLink` - Navigation link component
  - `SectionHeader` - Standardized section headers
  - `ErrorBoundary` - Error handling wrapper

**Custom Hooks (NEW):**

- `useMediaQuery(query)` - Detect media query matches
  - Example: `const isMobile = useMediaQuery("(max-width: 500px)")`
  - Used in Computers.jsx for responsive 3D model sizing
- `useScrollPosition(threshold)` - Track scroll position
  - Example: `const scrolled = useScrollPosition(100)`
  - Used in Navbar.jsx for scroll-based styling

**Form Validation (NEW):**

- Client-side validation in `src/utils/validators.js`
- Functions: `validateEmail`, `validateName`, `validateMessage`, `validateContactForm`
- Contact.jsx uses validation with real-time error feedback
- Visual indicators (red borders) and error messages

**SectionWrapper HOC:**

- Located in `src/hoc/SectionWrapper.jsx`
- Wraps section components to add consistent padding, animations, and scroll anchors
- Uses Framer Motion's `staggerContainer` variant for reveal animations
- Adds hash-based navigation support via `idName` prop

**Animation System:**

- All animation variants defined in `src/utils/motion.js`
- Exports: `textVariant`, `fadeIn`, `zoomIn`, `slideIn`, `staggerContainer`
- Components use Framer Motion with `initial`, `whileInView`, and `variants` props
- Viewport-based triggers: `viewport={{ once: true, amount: 0.25 }}`

**3D Canvas Components:**

- All located in `src/components/canvas/`
- Wrapped with `ErrorBoundary` for graceful error handling
- Use `@react-three/fiber` `<Canvas>` as wrapper
- Use `@react-three/drei` helpers: `OrbitControls`, `Preload`, `useGLTF`
- 3D models stored in `public/` directory (desktop_pc, planet)
- Each canvas component includes responsive sizing and lighting setup

**Data-Driven Content:**

- Content organized in `src/config/constants/` by domain
- Separated files: navigation, services, technologies, experiences, testimonials, projects
- Components import specific data using path aliases
- Easy to update portfolio content without touching component code

**Styling System:**

- Tailwind with custom theme in `tailwind.config.cjs`
- Custom colors: `primary`, `secondary`, `tertiary`, `black-100`, `black-200`, `white-100`
- Reusable style strings in `src/styles.js`: `paddingX`, `paddingY`, `heroHeadText`, etc.
- Custom background pattern: `bg-hero-pattern` defined in Tailwind config

**Type Safety:**

- PropTypes on all components for runtime validation
- JSDoc comments for documentation and IDE hints
- jsconfig.json enables type checking for JavaScript

### Component Layout in App.jsx

Current active sections:

- Navbar (sticky, uses useScrollPosition hook)
- Hero (with 3D computer model using useMediaQuery)
- About (service cards with TiltCard component)
- Tech (3D ball icons for technologies)
- Works (project cards with TiltCard component)

Currently commented out sections (ready to enable):

- Experience (work timeline)
- Feedbacks (testimonials)
- Contact (contact form with validation)
- StarsCanvas (animated star field background)

### Important Implementation Details

**EmailJS Integration:**

- Configured in `Contact.jsx` using environment variables
- Environment variables defined in `.env` (see `.env.example`)
- Variables: `VITE_APP_EMAILJS_SERVICE_ID`, `VITE_APP_EMAILJS_TEMPLATE_ID`, `VITE_APP_EMAILJS_PUBLIC_KEY`
- Includes client-side validation before sending
- Real-time error feedback with visual indicators

**Form Validation:**

- Validation logic in `src/utils/validators.js`
- Validates email format, name length (min 2), message length (min 10)
- Errors clear automatically when user types
- Red border and error text for invalid fields

**3D Model Loading:**

- Uses `useGLTF` hook from `@react-three/drei`
- Models referenced from `/public` directory
- Include `<Preload all />` inside Canvas for preloading
- Loader component shows progress during model loading
- ErrorBoundary wraps Canvas components for graceful failure

**Responsive Design:**

- Mobile-first approach with Tailwind breakpoints
- Custom `xs` breakpoint at 450px defined in `tailwind.config.cjs`
- 3D components use useMediaQuery hook to adjust scale/position based on screen size
- Navbar collapses to hamburger menu on mobile, uses useScrollPosition for styling

**Production Build Optimization:**

- Code splitting: React vendor (48KB), Three.js vendor (220KB), Animation (30KB)
- Terser minification with console.log removal
- Asset organization by type (images/, fonts/)
- CSS code splitting enabled
- Gzip compression: ~342KB total initial load

## Production Features (NEW)

**Development Tooling:**

- ✅ ESLint with React, hooks, and accessibility rules
- ✅ Prettier for consistent code formatting
- ✅ Vitest + React Testing Library (16 tests passing)
- ✅ Husky + lint-staged for pre-commit quality gates

**Code Quality:**

- ✅ PropTypes on all components
- ✅ JSDoc documentation for utilities and hooks
- ✅ Path aliases for clean imports
- ✅ Error boundaries for 3D components
- ✅ Client-side form validation

**Build Optimization:**

- ✅ Manual code splitting by vendor
- ✅ Terser minification
- ✅ Console.log removal in production
- ✅ Asset hash-based filenames for caching

## Fixed Issues

**Dependency Conflicts (FIXED):**

- ✅ Replaced `react-tilt` with `react-parallax-tilt` for React 18 compatibility
- ✅ No longer need `--legacy-peer-deps` flag
- ✅ All Tilt components updated to new API (tiltMaxAngleX, tiltMaxAngleY)

**Code Duplication (FIXED):**

- ✅ Navigation rendering extracted to NavLink component
- ✅ Card patterns unified with Card/TiltCard base components
- ✅ Form fields standardized with FormField component
- ✅ Scroll/media query logic moved to custom hooks

**Configuration Issues (FIXED):**

- ✅ Hardcoded EmailJS values replaced with environment variables
- ✅ .env.example created for easy setup
- ✅ Navigation bug fixed (contact link had wrong id "about" → "contact")

**Organization (FIXED):**

- ✅ 269-line constants file split into 7 domain-specific files
- ✅ Common components organized in dedicated folder
- ✅ Custom hooks extracted for reusability
- ✅ Form validation utilities separated

## Known Issues (Remaining)

**Security Vulnerabilities:**

- 15 vulnerabilities in dependencies (1 low, 6 moderate, 7 high, 1 critical)
- Run `npm audit fix` to address (may require updates)

**Browserslist:**

- caniuse-lite database is outdated
- Run `npx update-browserslist-db@latest`

**Component Tests:**

- Vite React plugin preamble detection issue (non-critical)
- Hook tests fully passing (16/16)
- Components work correctly in application

## Branch Structure

- `main` - Production branch (should be protected)
- `dev` - Development branch (should be protected)
- `feature/*` - Feature branches created from `dev`

Always create feature branches from `dev` and merge back via pull request.
