# Tic-Tac-Toe Game

A modern React + Vite application implementing a classic Tic-Tac-Toe game with interactive UI, state management using
Redux, and form handling with React Hook Form.

**Course:** KOP (Knowledge of Programming) / Frontend Development  
**Author:** Vitalii Bondar  
**Year:** 2026

## Project Overview

This project demonstrates the integration of modern React development tools and best practices, including:

- React 19 with Vite for fast development and optimized builds
- Redux Toolkit for state management
- React Router for navigation
- React Hook Form for form handling
- ESLint for code quality
- Comprehensive licensing and documentation

## Demo

<!-- TODO: Replace VIDEO_LINK_HERE with the final public demo URL before merging. -->
🎮 **Video Demonstration:** [Watch the demo](VIDEO_LINK_HERE)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server with HMR
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm build
```

### Preview

```bash
# Preview production build
npm run preview
```

### Code Quality

```bash
# Run ESLint to check code quality
npm run lint
```

## Documentation & Storybook

### Generating License Report

To generate and update the dependency license report:

```bash
npm run licenses:report
```

### Storybook Setup (Optional)

To add Storybook for component documentation:

```bash
# Initialize Storybook
npx storybook@latest init

# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
```

### Documentation Generation

This project uses **JSDoc** for automatic code documentation generation.

```bash
# Generate HTML documentation from code comments
npm run docs:code
```

Generated files are written to `docs/code/`.

Note: the current JSDoc configuration documents both `.js` and `.jsx` source files.

Example JSDoc annotation:

```javascript
/**
 * Button component for user interactions
 * @param {Object} props - Component props
 * @param {string} props.label - Button label text
 * @param {Function} props.onClick - Click handler
 * @returns {JSX.Element} Rendered button component
 */
export const Button = ({label, onClick}) => {
        return <button onClick={onClick}>{label}</button>;
    };
```

## Project Structure

```
tic-tac-toe/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Redux store configuration
│   ├── utils/           # Utility functions
│   ├── constants/       # Application constants
│   └── App.jsx          # Root component
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
├── tsconfig.json        # TypeScript configuration (if applicable)
└── README.md           # Project documentation
```

## Technologies Used

- **React 19** - UI library
- **Vite 8.0.5** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **React Hook Form** - Form state management
- **Yup** - Schema validation
- **ESLint** - Code linting
- **Modern Normalize & Normalize.css** - CSS normalization

## Licensing

This project is licensed under the [MIT License](LICENSE).

### Dependency Licenses

The dependency license report is committed to the repository for transparency. See
the [License Report](license-report.txt) for details on all project dependencies and their respective licenses.

To regenerate the license report (after updating dependencies), run:

```bash
npm run licenses:report
```

This uses `license-checker` with relative paths and a sanitized plain-text output so the report does not leak local
filesystem paths or email addresses.

