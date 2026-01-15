# Contributing Guide

Thank you for considering contributing to this 3D Portfolio Website! This document provides guidelines and best practices for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guide](#code-style-guide)
- [Git Workflow](#git-workflow)
- [Commit Message Conventions](#commit-message-conventions)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)
- [Project Architecture](#project-architecture)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, trolling, or discriminatory comments
- Publishing others' private information
- Unprofessional conduct or language

## Getting Started

### Prerequisites

- Node.js v16.0 or higher
- npm v7.0 or higher
- Git v2.9 or higher
- Code editor (VS Code recommended)

### Setup Development Environment

1. **Fork the repository**
   - Click "Fork" button on GitHub
   - Clone your fork locally

2. **Clone and install**

   ```bash
   git clone https://github.com/YOUR_USERNAME/3D-Portfolio-Website.git
   cd 3D-Portfolio-Website
   npm install
   ```

3. **Configure Git**

   ```bash
   git config user.name "Your Name"
   git config user.email "your.email@example.com"
   ```

4. **Setup environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

### Recommended VS Code Extensions

- ESLint - Code linting
- Prettier - Code formatting
- Tailwind CSS IntelliSense - Tailwind class autocomplete
- ES7+ React/Redux/React-Native snippets - React snippets
- GitLens - Git integration

## Development Workflow

### Branch Strategy

- `main` - Production-ready code (protected)
- `dev` - Development branch (protected)
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
- `hotfix/*` - Urgent production fixes

### Creating a Feature

1. **Update dev branch**

   ```bash
   git checkout dev
   git pull origin dev
   ```

2. **Create feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes**
   - Write code following style guide
   - Add tests for new features
   - Update documentation

4. **Test locally**

   ```bash
   npm run dev        # Test in browser
   npm run test       # Run unit tests
   npm run lint       # Check for errors
   npm run build      # Test production build
   ```

5. **Commit changes**

   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

6. **Push to your fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Set base: `dev`, compare: `feature/your-feature-name`
   - Fill out PR template

## Code Style Guide

### JavaScript/JSX

**Use ES6+ Features**

```javascript
// Good
const myFunction = (param) => {
  return param * 2;
};

// Avoid
function myFunction(param) {
  return param * 2;
}
```

**Component Structure**

```javascript
import PropTypes from "prop-types";

/**
 * Component description
 *
 * @param {Object} props
 * @param {string} props.title - Title text
 * @returns {JSX.Element}
 */
const MyComponent = ({ title }) => {
  return <h1>{title}</h1>;
};

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MyComponent;
```

**Naming Conventions**

- Components: PascalCase (`MyComponent.jsx`)
- Functions/variables: camelCase (`myFunction`, `userName`)
- Constants: UPPER_SNAKE_CASE (`API_URL`, `MAX_LENGTH`)
- Files: PascalCase for components, camelCase for utilities
- Folders: camelCase (`components/common`, `utils`)

**Import Order**

```javascript
// 1. External dependencies
import React, { useState } from "react";
import PropTypes from "prop-types";

// 2. Internal components
import { Button } from "@components/common/Button";

// 3. Utilities and helpers
import { validateEmail } from "@utils/validators";

// 4. Assets
import logo from "@assets/logo.svg";

// 5. Styles (if separate CSS files)
import "./MyComponent.css";
```

**Destructuring Props**

```javascript
// Good
const MyComponent = ({ title, description, isActive }) => {
  return <div>{title}</div>;
};

// Avoid
const MyComponent = (props) => {
  return <div>{props.title}</div>;
};
```

**Conditional Rendering**

```javascript
// Good - Ternary for simple conditions
{
  isActive ? <ActiveIcon /> : <InactiveIcon />;
}

// Good - Logical && for single condition
{
  isActive && <ActiveIcon />;
}

// Avoid - Complex nested ternaries
{
  isActive ? isEditing ? <EditIcon /> : <ViewIcon /> : <InactiveIcon />;
}
// Instead, extract to separate function or component
```

### PropTypes

**Always add PropTypes to components**

```javascript
MyComponent.propTypes = {
  // Required string
  title: PropTypes.string.isRequired,

  // Optional number with default
  count: PropTypes.number,

  // Array of objects
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),

  // Function
  onClick: PropTypes.func.isRequired,

  // One of specific values
  size: PropTypes.oneOf(["small", "medium", "large"]),

  // Any renderable content
  children: PropTypes.node,
};
```

### JSDoc Comments

**Add JSDoc to:**

- Complex functions
- Utility functions
- Custom hooks
- Reusable components

**Example:**

```javascript
/**
 * Validates email address format
 *
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 *
 * @example
 * validateEmail("user@example.com") // true
 * validateEmail("invalid") // false
 */
export const validateEmail = (email) => {
  // Implementation
};
```

### Tailwind CSS

**Use Tailwind utility classes**

```javascript
// Good
<div className="flex items-center justify-between p-4 bg-primary rounded-lg">

// Avoid - Inline styles
<div style={{ display: "flex", padding: "16px" }}>
```

**Extract repeated patterns**

```javascript
// For frequently used combinations, use styles.js
// src/styles.js
export const styles = {
  cardBase: "p-4 rounded-lg shadow-md",
  buttonPrimary: "px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90",
};

// Usage
<div className={styles.cardBase}>
```

**Responsive Design**

```javascript
// Mobile-first approach
<div className="w-full md:w-1/2 lg:w-1/3">
```

## Git Workflow

### Commit Frequency

- Commit often with logical, atomic changes
- Each commit should represent a single logical change
- Don't commit broken code

### Pre-commit Hooks

Husky runs automatically on commit:

- ESLint checks and fixes JavaScript/JSX
- Prettier formats all files
- Prevents commits with linting errors

If pre-commit fails:

```bash
# Fix issues manually or
npm run lint:fix
npm run format

# Then commit again
git commit -m "your message"
```

### Keeping Your Branch Updated

```bash
# Fetch latest changes
git fetch origin

# Rebase your feature branch on dev
git checkout feature/your-feature
git rebase origin/dev

# If conflicts occur
# 1. Resolve conflicts in files
# 2. git add <resolved-files>
# 3. git rebase --continue
```

## Commit Message Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependencies

### Examples

**Simple commit:**

```
feat: add dark mode toggle to navbar
```

**With scope:**

```
fix(contact): validate email format before submission
```

**With body:**

```
feat: implement form validation

Add client-side validation for contact form including:
- Email format validation
- Name length validation (min 2 chars)
- Message length validation (min 10 chars)
- Real-time error feedback
```

**Breaking change:**

```
refactor!: change API structure for testimonials

BREAKING CHANGE: testimonials data structure now requires 'rating' field
```

## Pull Request Process

### Before Creating PR

1. ✅ Code follows style guide
2. ✅ All tests pass (`npm run test`)
3. ✅ No linting errors (`npm run lint`)
4. ✅ Production build succeeds (`npm run build`)
5. ✅ Documentation updated
6. ✅ PropTypes added to new components
7. ✅ Tests added for new features

### PR Title

Follow commit message conventions:

```
feat: add user authentication
fix: resolve mobile menu toggle issue
docs: update installation instructions
```

### PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made

- List specific changes
- Another change
- One more change

## Testing

How to test these changes

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] My code follows the style guide
- [ ] I have added PropTypes to components
- [ ] I have added tests for new features
- [ ] All tests pass
- [ ] I have updated documentation
- [ ] My changes generate no new warnings
```

### Review Process

1. **Create PR** against `dev` branch
2. **Automated checks** run (ESLint, tests, build)
3. **Code review** by maintainer
4. **Address feedback** if requested
5. **Approval and merge** by maintainer

### After PR is Merged

```bash
# Switch to dev and pull latest
git checkout dev
git pull origin dev

# Delete feature branch
git branch -d feature/your-feature

# Delete remote branch (optional)
git push origin --delete feature/your-feature
```

## Testing Requirements

### When to Write Tests

**Required:**

- New utility functions
- Custom hooks
- Complex component logic
- Form validation

**Optional but recommended:**

- UI components (snapshot tests)
- Integration tests for user flows

### Test Structure

```javascript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("renders with default props", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected text")).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    render(<MyComponent onClick={handleClick} />);

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Running Tests

```bash
npm run test              # Watch mode
npm run test:ui           # Visual UI
npm run test:coverage     # Coverage report
```

## Project Architecture

### Folder Organization

```
src/
├── components/       # React components
│   ├── canvas/      # 3D components
│   ├── common/      # Reusable UI components
│   └── [sections]   # Page section components
├── config/          # Configuration
│   └── constants/   # Static data
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── hoc/             # Higher-order components
└── assets/          # Static assets
```

### File Naming

- Components: `MyComponent.jsx`
- Hooks: `useMyHook.js`
- Utils: `myUtil.js`
- Tests: `MyComponent.test.jsx`
- Config: `myConfig.js`

### Creating New Components

**1. Decide component location:**

- Common/reusable → `components/common/`
- Section-specific → `components/`
- 3D canvas → `components/canvas/`

**2. Create component file:**

```javascript
// src/components/common/MyComponent/MyComponent.jsx
import PropTypes from "prop-types";

/**
 * Component description
 */
const MyComponent = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

export default MyComponent;
```

**3. Create index file:**

```javascript
// src/components/common/MyComponent/index.js
export { default as MyComponent } from "./MyComponent";
```

**4. Add to parent index:**

```javascript
// src/components/common/index.js
export * from "./MyComponent";
```

### Using Path Aliases

```javascript
// Good - Use path aliases
import { Button } from "@components/common/Button";
import { validateEmail } from "@utils/validators";
import { useMediaQuery } from "@hooks";

// Avoid - Relative paths
import { Button } from "../../../components/common/Button";
```

## Common Tasks

### Adding a New Section

1. Create component in `src/components/`
2. Add data to `src/config/constants/`
3. Import in `src/App.jsx`
4. Wrap with `SectionWrapper` HOC
5. Add navigation link to `src/config/constants/navigation.js`

### Adding a New Technology Icon

1. Add icon to `src/assets/tech/`
2. Import in `src/config/constants/technologies.js`
3. Add to `technologies` array

### Modifying 3D Models

1. Place model in `public/` directory
2. Update model path in canvas component
3. Adjust scale, position, rotation as needed
4. Test on multiple devices

## Getting Help

- 📖 Read the [README.md](README.md)
- 💬 Open a discussion on GitHub
- 🐛 Report bugs via GitHub Issues
- 📧 Contact maintainers

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Project README (for significant contributions)

Thank you for contributing! 🎉
