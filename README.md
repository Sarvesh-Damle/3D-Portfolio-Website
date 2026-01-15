# 3D Portfolio Website

A modern, interactive 3D portfolio website built with React, Three.js, and Tailwind CSS. Features stunning 3D animations, responsive design, and production-ready code following industry best practices.

## Features

- **Interactive 3D Graphics** - Powered by Three.js with react-three/fiber and react-three/drei
- **Smooth Animations** - Framer Motion animations with viewport-based triggers
- **Responsive Design** - Mobile-first approach with custom breakpoints
- **Contact Form** - EmailJS integration with client-side validation
- **3D Tilt Effects** - Interactive card components with parallax tilt
- **Optimized Build** - Code splitting, lazy loading, and minification for production
- **Type Safety** - JSDoc comments with PropTypes runtime validation
- **Modern Tooling** - ESLint, Prettier, Vitest, and Husky pre-commit hooks
- **Path Aliases** - Clean imports using @components, @config, @hooks patterns

## Tech Stack

### Core

- **React 18.2** - UI framework with modern JSX transform
- **Vite 4.1** - Fast build tool and dev server
- **Tailwind CSS 3.2** - Utility-first CSS framework

### 3D Graphics

- **Three.js 0.149** - 3D graphics library
- **@react-three/fiber 8.11** - React renderer for Three.js
- **@react-three/drei 9.56** - Helper components and utilities

### Animation & UI

- **Framer Motion 9.0** - Animation library
- **react-parallax-tilt 1.7** - 3D tilt effect components
- **react-vertical-timeline 3.6** - Timeline component for experience section

### Development Tools

- **ESLint 8.57** - Code linting with React, hooks, and accessibility plugins
- **Prettier 3.7** - Code formatting
- **Vitest 1.6** - Unit testing framework
- **Husky 9.1** - Git hooks for automated quality checks
- **lint-staged 15.5** - Run linters on staged files

## Prerequisites

- **Node.js** - v16.0 or higher
- **npm** - v7.0 or higher

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd 3D-Portfolio-Website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   Copy `.env.example` to `.env` and configure your EmailJS credentials:

   ```bash
   cp .env.example .env
   ```

   Update the following variables in `.env`:

   ```env
   VITE_APP_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
   VITE_APP_SITE_NAME="Your Name Portfolio"
   VITE_APP_CONTACT_EMAIL=your.email@example.com
   ```

   **Getting EmailJS Credentials:**
   - Sign up at [emailjs.com](https://www.emailjs.com/)
   - Create an email service (Gmail, Outlook, etc.)
   - Create an email template
   - Copy your Service ID, Template ID, and Public Key

## Available Scripts

### Development

```bash
npm run dev
```

Starts the development server on `http://localhost:5173/` with hot module replacement.

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory with:

- Code splitting (React, Three.js, Animation chunks)
- Terser minification with console.log removal
- Asset optimization and organization
- CSS code splitting

### Preview Build

```bash
npm run preview
```

Preview the production build locally on `http://localhost:4173/`

### Code Quality

```bash
npm run lint          # Run ESLint
npm run lint:fix      # Fix ESLint errors automatically
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
```

### Testing

```bash
npm run test          # Run tests in watch mode
npm run test:ui       # Run tests with UI interface
npm run test:coverage # Generate test coverage report
```

## Project Structure

```
src/
├── components/           # React components
│   ├── canvas/          # 3D canvas components
│   │   ├── Ball.jsx     # 3D ball with technology icons
│   │   ├── Computers.jsx # 3D computer model
│   │   ├── Earth.jsx    # 3D Earth globe
│   │   ├── Stars.jsx    # Animated star field
│   │   └── index.js     # Barrel export
│   ├── common/          # Reusable common components
│   │   ├── Card/        # Base card and tilt card
│   │   ├── FormField/   # Form input/textarea
│   │   ├── Button/      # Button component
│   │   ├── NavLink/     # Navigation link
│   │   ├── SectionHeader/ # Section headers
│   │   ├── ErrorBoundary/ # Error handling
│   │   └── index.js     # Barrel export
│   ├── About.jsx        # About section with services
│   ├── Contact.jsx      # Contact form with validation
│   ├── Experience.jsx   # Work experience timeline
│   ├── Feedbacks.jsx    # Testimonials section
│   ├── Hero.jsx         # Hero section with 3D computer
│   ├── Navbar.jsx       # Navigation bar
│   ├── Tech.jsx         # Technology stack display
│   ├── Works.jsx        # Projects showcase
│   ├── Loader.jsx       # 3D loading component
│   └── index.js         # Barrel export
├── config/              # Configuration files
│   └── constants/       # Static data
│       ├── navigation.js      # Navigation links
│       ├── services.js        # Services data
│       ├── technologies.js    # Tech stack data
│       ├── experiences.js     # Work experience data
│       ├── testimonials.js    # Testimonials data
│       ├── projects.js        # Projects data
│       └── index.js           # Barrel export
├── hooks/               # Custom React hooks
│   ├── useMediaQuery.js      # Media query detection
│   ├── useScrollPosition.js  # Scroll position tracking
│   └── index.js              # Barrel export
├── hoc/                 # Higher-order components
│   └── SectionWrapper.jsx    # Section wrapper with animations
├── utils/               # Utility functions
│   ├── motion.js        # Framer Motion variants
│   └── validators.js    # Form validation utilities
├── assets/              # Static assets (images, 3D models)
├── styles.js            # Reusable Tailwind class strings
├── App.jsx              # Main app component
└── main.jsx             # Entry point

tests/
├── components/          # Component tests
│   └── common/         # Common component tests
└── hooks/              # Hook tests
```

## Path Aliases

The project uses path aliases for cleaner imports:

```javascript
// Instead of: import { Button } from '../../../components/common/Button'
// Use:
import { Button } from "@components/common/Button";
```

Available aliases:

- `@components/*` → `src/components/*`
- `@config/*` → `src/config/*`
- `@hooks/*` → `src/hooks/*`
- `@utils/*` → `src/utils/*`
- `@assets/*` → `src/assets/*`
- `@styles/*` → `src/*`
- `@hoc/*` → `src/hoc/*`
- `@lib/*` → `src/lib/*`

## Architecture & Patterns

### Component Structure

- **Common Components** - Reusable UI components with PropTypes and JSDoc
- **Section Components** - Page sections wrapped with SectionWrapper HOC
- **Canvas Components** - 3D components using react-three/fiber

### Animation System

All animations use Framer Motion with variants defined in `src/utils/motion.js`:

- `textVariant` - Text reveal animations
- `fadeIn` - Fade in from direction
- `slideIn` - Slide in from direction
- `zoomIn` - Zoom and fade in
- `staggerContainer` - Parent container for staggered children

### Form Validation

Client-side validation using `src/utils/validators.js`:

- Email format validation
- Name length validation (min 2 chars)
- Message length validation (min 10 chars)
- Real-time error feedback with visual indicators

### Error Handling

- ErrorBoundary components wrap 3D canvas elements
- Graceful fallback UI when 3D models fail to load
- Console errors captured in development

## Customization

### Update Personal Information

1. **Profile & Content** - Edit `src/config/constants/` files:
   - `services.js` - Your services/skills
   - `technologies.js` - Your tech stack
   - `experiences.js` - Work history
   - `projects.js` - Portfolio projects
   - `testimonials.js` - Client testimonials

2. **Hero Section** - Update `src/components/Hero.jsx`:
   - Name and tagline
   - Role description

3. **About Section** - Update `src/components/About.jsx`:
   - Introduction text

4. **Assets** - Replace images in `src/assets/`:
   - Logo
   - Project images
   - Company logos
   - Profile pictures

### Styling

**Tailwind Configuration** - `tailwind.config.cjs`:

- Custom colors: primary, secondary, tertiary
- Custom breakpoints
- Background patterns

**Global Styles** - `src/index.css`:

- Tailwind base/components/utilities
- Custom CSS classes

**Reusable Styles** - `src/styles.js`:

- Padding, hero text, section headings

## Development Workflow

### Making Changes

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following existing patterns
   - Add PropTypes to components
   - Update tests if needed

3. **Test your changes**

   ```bash
   npm run dev       # Test in browser
   npm run test      # Run unit tests
   npm run lint      # Check for errors
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

   Pre-commit hooks will automatically:
   - Run ESLint and fix issues
   - Format code with Prettier
   - Validate your changes

### Git Hooks

Husky and lint-staged are configured to run automatically on commit:

- **JavaScript/JSX files** - ESLint --fix, Prettier --write
- **JSON/Markdown/CSS files** - Prettier --write

## Testing

### Running Tests

```bash
npm run test          # Watch mode
npm run test:ui       # Visual test interface
npm run test:coverage # Coverage report
```

### Test Structure

Tests are located in `tests/` directory mirroring `src/` structure:

- Component tests use React Testing Library
- Hook tests use renderHook
- Includes setup file with jest-dom matchers

### Writing Tests

Example component test:

```javascript
import { render, screen } from "@testing-library/react";
import { Button } from "@components/common/Button";

test("renders button with text", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText("Click me")).toBeInTheDocument();
});
```

## Production Deployment

### Build Optimization

The production build includes:

- **Code Splitting** - Separate chunks for React, Three.js, animations
- **Minification** - Terser with console.log removal
- **Asset Optimization** - Images organized by type, hash-based filenames
- **CSS Splitting** - Separate CSS files for better caching

### Build Output

```
dist/
├── assets/
│   ├── images/           # Optimized images
│   ├── fonts/            # Font files
│   ├── css/              # CSS bundles
│   └── js/               # JavaScript chunks
│       ├── index-[hash].js          # Main app (39 KB gzipped)
│       ├── react-vendor-[hash].js   # React libs (48 KB gzipped)
│       ├── three-vendor-[hash].js   # Three.js (220 KB gzipped)
│       ├── animation-[hash].js      # Framer Motion (30 KB gzipped)
│       └── utils-[hash].js          # Utilities
└── index.html
```

### Deployment Platforms

**Vercel** (Recommended):

```bash
npm install -g vercel
vercel
```

**Netlify**:

```bash
npm run build
# Drag and drop dist/ folder to Netlify
```

**GitHub Pages**:

- Set base URL in `vite.config.js`
- Push dist/ folder to gh-pages branch

## Troubleshooting

### Common Issues

**Build fails with "Cannot find module"**

- Ensure all dependencies are installed: `npm install`
- Check path aliases in `vite.config.js` and `jsconfig.json`

**3D models not loading**

- Verify models are in `public/` directory
- Check browser console for GLTF loading errors
- Models must be in `.gltf` or `.glb` format

**EmailJS not working**

- Verify environment variables are set in `.env`
- Check EmailJS dashboard for service status
- Ensure template variables match form fields

**Pre-commit hooks not running**

- Reinstall Husky: `npm run prepare`
- Check `.husky/pre-commit` file exists
- Ensure Git version is 2.9+

**Tests failing**

- Clear test cache: `npm run test -- --clearCache`
- Update snapshots: `npm run test -- -u`
- Check jsdom is installed

### Performance Optimization

**Large bundle size**

- Lazy load sections: `const Component = lazy(() => import('./Component'))`
- Optimize images: Use WebP format, compress images
- Reduce Three.js bundle: Import specific modules only

**Slow 3D rendering**

- Lower polygon count on 3D models
- Reduce texture resolution
- Limit number of lights in scene
- Use `<Suspense>` with loading fallback

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

**Note:** Requires WebGL support for 3D features.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- 3D models from [Sketchfab](https://sketchfab.com/)
- Icons from various sources credited in assets
- Inspired by modern portfolio designs

## Contact

For questions or support, please use the contact form on the website or open an issue on GitHub.

---

Built with ❤️ using React, Three.js, and modern web technologies.
