# Cyan Design System 4.0.0

The Cyan Design System 4.0.0 is a modern design system aimed at providing a consistent and efficient development experience for Pelilauta 2 and related applications. It leverages cutting-edge web technologies and industry best practices to create a robust, scalable foundation for building user interfaces.

## 🚀 Features

- **Modern Web Components**: Built with Lit for fast, lightweight, and standards-compliant components
- **TypeScript First**: Full TypeScript support with strict type checking and declaration files
- **Comprehensive Testing**: Unit and browser testing with Vitest for reliable component behavior
- **Live Documentation**: Interactive Astro-powered documentation site with live component demos
- **Developer Experience**: Hot module replacement, automated formatting, and git hooks
- **Code Quality**: Biome for fast linting and formatting, Commitlint for conventional commits

## 🏗️ Architecture

This project is structured as a workspaces with the following packages:

```
cyan-design-system-4/
├── packages/
│   ├── cyan-css/          # Core CSS utilities and design tokens
│   └── cyan-lit/          # Lit web components library
└── apps/
    └── cyan-docs/         # Astro documentation site
```

### Technologies

- **[Lit](https://lit.dev/)**: Simple library for building fast, lightweight web components
- **[TypeScript](https://www.typescriptlang.org/)**: Strict type checking and modern JavaScript features
- **[Astro](https://astro.build/)**: Modern documentation site with server-side rendering
- **[Vitest](https://vitest.dev/)**: Fast unit and browser testing framework
- **[Biome](https://biomejs.dev/)**: Fast formatter and linter for consistent code style
- **[pnpm](https://pnpm.io/)**: Efficient package manager with workspace support
- **[Lefthook](https://github.com/evilmartians/lefthook)**: Fast Git hooks for automated quality checks

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- pnpm 8+

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cyan-design-system-4
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development**
   ```bash
   pnpm dev
   ```
   This runs both component compilation in watch mode and the documentation server at `http://localhost:4321/`

### Available Scripts

- **`pnpm dev`** - Start development mode (components + docs)
- **`pnpm build`** - Build all packages and documentation
- **`pnpm test`** - Run all tests across packages
- **`pnpm test --run`** - Run tests in CI mode (single run)
- **`pnpm check`** - Format and lint all files
- **`pnpm lint`** - Lint all files
- **`pnpm format`** - Format all files

### Component Development

Components are located in `packages/cyan-lit/src/`. Each component is a Lit element with:

- TypeScript decorators for properties
- Shadow DOM styling with `css` template literals
- Comprehensive unit and browser tests
- TypeScript declarations for type safety

Example component structure:
```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('cyan-button')
export class CyanButton extends LitElement {
  @property({ type: String })
  label = 'Button';

  static styles = css`
    /* Component styles */
  `;

  render() {
    return html`<button>${this.label}</button>`;
  }
}
```

### Testing

The project includes both unit tests and browser tests:

- **Unit tests**: Fast tests using jsdom for component logic
- **Browser tests**: Real browser environment tests for styling and DOM behavior
- **Visual regression**: Automatic screenshots on test failures

Run tests with:
```bash
# All tests
pnpm test

# Component tests only
pnpm test:components

# Watch mode
pnpm --filter cyan-lit test
```

### Documentation

The documentation site is built with Astro and includes:

- Live component demos
- Interactive examples
- Component API documentation
- Design guidelines

To work on documentation:
```bash
# Start docs development server
pnpm dev:docs

# Build documentation
pnpm build:docs
```

## 📦 Packages

### `cyan-css`

Core CSS utilities and design tokens for the Cyan Design System.
Provides:
- Design tokens for colors, typography, spacing
- Utility classes for layout and styling
- Responsive design utilities
- Select override Atomic CSS classes for custom styling

### `cyan-lit`

The core component library built with Lit. Provides reusable web components with:

- TypeScript support
- Shadow DOM encapsulation
- Reactive properties
- Event handling
- Accessibility features

### `cyan-docs`

Interactive documentation site showcasing:

- Component gallery
- Usage examples
- Design principles
- Development guidelines

## 🔧 Configuration

### Code Quality

- **Biome**: Configuration in `biome.json`
- **TypeScript**: Base configuration in `tsconfig.json`
- **Git Hooks**: Lefthook configuration in `lefthook.yml`
- **Commitlint**: Conventional commits in `commitlint.config.js`

### Testing

- **Vitest**: Configuration in `packages/cyan-lit/vitest.config.ts`
- **Browser Testing**: Playwright for headless browser tests
- **Coverage**: Built-in coverage reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm test`
5. Commit changes: `git commit -m 'feat: add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Submit a pull request

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions or modifications
- `chore:` - Build process or auxiliary tool changes

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/license/mit/). See the [LICENSE](LICENSE) file for details.