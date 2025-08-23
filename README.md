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
│   ├── cyan-lit/          # Lit web components library
│   ├── cn-editor/         # Rich text editor component
│   └── cn-story-clock/    # Story clock component
└── apps/
    └── cyan-docs/         # Astro documentation site
```

### Unified Versioning

All packages in this monorepo are on a unified version, `4.0.0-beta.3`. This ensures that all components and libraries are compatible and simplifies dependency management. The original git history for `cn-editor` and `cn-story-clock` before version 4.0.0 is preserved in their original external repositories.

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
   This runs all packages in development mode concurrently:
   - Component compilation in watch mode
   - CSS file copying in watch mode  
   - Documentation server at `http://localhost:4321/`

### Available Scripts

- **`pnpm dev`** - Start development mode for all packages (components + CSS + docs)
- **`pnpm build`** - Build all packages in sequence (components → CSS → docs)
- **`pnpm test`** - Run all tests across packages
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

### CSS Development

CSS files are located in `packages/cyan-css/src/` with the following structure:

```
src/
├── index.css          # Main entry point
├── core/              # Core styles (reset, base)
├── tokens/            # Design tokens (colors, fonts, spacing)
└── typography/        # Typography styles
```

The CSS package uses cpx2 to copy files from `src/` to `dist/` during build:

```bash
# Work on CSS in watch mode
pnpm --filter cyan-css dev

# Build CSS for distribution
pnpm --filter cyan-css build
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
pnpm --filter cyan-lit test

# Watch mode for components
pnpm --filter cyan-lit test --watch
```

### Documentation

The documentation site is built with Astro and includes:

- Live component demos
- Interactive examples
- Component API documentation
- Design guidelines

To work on documentation:
```bash
# Start docs development server only
pnpm --filter cyan-docs dev

# Build documentation only
pnpm --filter cyan-docs build
```

## 📦 Packages

### `cyan-css`

Core CSS utilities and design tokens for the Cyan Design System.
Provides:
- Design tokens for colors, typography, spacing
- Utility classes for layout and styling
- Responsive design utilities
- CSS build pipeline with watch mode for development

**Available Scripts:**
- `pnpm build` - Copy CSS files from src to dist
- `pnpm dev` - Copy CSS files with watch mode for development

### `cyan-lit`

The core component library built with Lit. Provides reusable web components with:

- TypeScript support
- Shadow DOM encapsulation
- Reactive properties
- Event handling
- Accessibility features

### `cn-editor`

A rich text editor component based on CodeMirror.

### `cn-story-clock`

A story clock component for PbtA style games.

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