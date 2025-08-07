# GitHub Copilot Instructions for Cyan Design System

This document provides context for GitHub Copilot about the Cyan Design System v4.0.0 project.

## Project Overview

The project is a modern design system built as a monorepo using `pnpm` for dependency management. Its purpose is to provide a consistent and efficient development experience.

- **Core Goal**: Create a robust, scalable foundation for building user interfaces with web components.
- **High-level Documentation**: The main project overview is in [README.md](README.md).
- **Detailed Scaffolding**: The entire project setup process is documented in [docs/SCAFFOLDING.md](docs/SCAFFOLDING.md).

## Architecture

The monorepo is divided into `packages/` for reusable libraries and `apps/` for consumer applications. Packages are linked directly via Vite/Astro aliases rather than pnpm workspace dependencies.

- **`packages/cyan-lit`**: The core component library built with Lit. All web components reside here.
  - Components are located in `packages/cyan-lit/src/`.
  - A typical component is [`packages/cyan-lit/src/cyan-button.ts`](packages/cyan-lit/src/cyan-button.ts).
  - All components are exported from [`packages/cyan-lit/src/index.ts`](packages/cyan-lit/src/index.ts).
- **`packages/cyan-css`**: The CSS styles package providing design system styles.
  - Styles are located in `packages/cyan-css/src/`.
  - Main entry point is `packages/cyan-css/src/index.css`.
- **`apps/cyan-docs`**: The documentation site built with Astro. It consumes and showcases components from `cyan-lit` via Vite aliases configured in `astro.config.mjs`.
  - The main page is [`apps/cyan-docs/src/pages/index.astro`](apps/cyan-docs/src/pages/index.astro).
  - Package linking is done through Vite aliases that point to the source directories of local packages.

## Technologies

- **pnpm**: Used for package management across the monorepo. Packages are linked via Vite/Astro aliases rather than workspace dependencies.
- **Lit**: The library for building fast, lightweight web components.
- **Astro**: Powers the documentation site, with direct package imports via aliases defined in `astro.config.mjs`.
- **TypeScript**: Used for all components and business logic with a strict configuration.
- **Vitest**: The testing framework. It's configured in [`packages/cyan-lit/vitest.config.ts`](packages/cyan-lit/vitest.config.ts) to run:
  - **Unit Tests** (`*.test.ts`) using `jsdom`.
  - **Browser Tests** (`*.browser.test.ts`) using `playwright` for real browser environments.
- **Biome**: Used for fast code formatting and linting, configured in `biome.json`.
- **Lefthook & Commitlint**: Enforce code quality and conventional commit messages via Git hooks. See `lefthook.yml` and `commitlint.config.js`.

## Package Linking

The project uses direct package linking via Vite/Astro aliases instead of pnpm workspace dependencies:

- **Astro Configuration**: In [`apps/cyan-docs/astro.config.mjs`](apps/cyan-docs/astro.config.mjs), aliases are configured to point directly to package source directories:
  ```javascript
  alias: [
    { find: 'cyan-lit', replacement: '../../packages/cyan-lit' },
    { find: 'cyan-css', replacement: '../../packages/cyan-css' }
  ]
  ```
- **Import Pattern**: Packages are imported directly by name (e.g., `import 'cyan-lit'`) which resolves to the source directories.
- **Development Benefits**: This approach provides faster development iteration since changes in packages are immediately available without rebuilding dependencies.

## Development Workflow

Common tasks are managed by `pnpm` scripts in the root `package.json`.

- **To start development**:
  ```sh
  pnpm dev
  ```
  This command concurrently starts the TypeScript compiler for `cyan-lit` in watch mode, the CSS build for `cyan-css` in watch mode, and the Astro development server for `cyan-docs`.

- **To build the entire project**:
  ```sh
  pnpm build
  ```
  This builds `cyan-lit` (TypeScript compilation), then `cyan-css` (CSS copying), then `cyan-docs` (Astro build).

- **To run all tests**:
  ```sh
  pnpm test
  ```
  This executes all Vitest tests (both unit and browser) within the `cyan-lit` package.

- **To check code quality**:
  ```sh
  pnpm check
  ```
  This runs Biome to format and lint all files in the workspace.
