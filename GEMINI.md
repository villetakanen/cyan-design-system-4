# Gemini Instructions for Cyan Design System

This document provides context for Gemini about the Cyan Design System v4.0.0 project.

## Project Overview

The project is a modern design system built as a `pnpm` workspace (monorepo) where packages are linked directly through Vite/Astro aliases rather than workspace dependencies. Its purpose is to provide a consistent and efficient development experience.

- **Core Goal**: Create a robust, scalable foundation for building user interfaces with web components.
- **High-level Documentation**: The main project overview is in [README.md](README.md).
- **Detailed Scaffolding**: The entire project setup process is documented in [docs/SCAFFOLDING.md](docs/SCAFFOLDING.md).

## Architecture

The workspace is divided into `packages/` for reusable libraries and `apps/` for consumer applications. Packages are linked to applications through Vite/Astro alias configuration rather than traditional workspace dependencies.

- **`packages/cyan-lit`**: The core component library built with Lit. All web components reside here.
  - Components are located in `packages/cyan-lit/src/`.
  - A typical component is [`packages/cyan-lit/src/cyan-example.ts`](packages/cyan-lit/src/cyan-example.ts).
  - All components are exported from [`packages/cyan-lit/src/index.ts`](packages/cyan-lit/src/index.ts).
- **`packages/cyan-css`**: The CSS styles package containing design system styles.
- **`apps/cyan-docs`**: The documentation site built with Astro. It consumes and showcases components from `cyan-lit` and styles from `cyan-css` via direct aliases configured in [`apps/cyan-docs/astro.config.mjs`](apps/cyan-docs/astro.config.mjs).
  - The main page is [`apps/cyan-docs/src/pages/index.astro`](apps/cyan-docs/src/pages/index.astro).
  - Packages are imported directly as `import 'cyan-lit'` and `import 'cyan-css'` which resolve through Vite aliases.

## Technologies

- **pnpm**: Used for package management and workspace organization, but packages are linked via Vite/Astro aliases rather than workspace dependencies.
- **Lit**: The library for building fast, lightweight web components.
- **Astro**: Powers the documentation site, with the `@astrojs/lit` integration for rendering web components.
- **TypeScript**: Used for all components and business logic with a strict configuration.
- **Vitest**: The testing framework. It's configured in [`packages/cyan-lit/vitest.config.ts`](packages/cyan-lit/vitest.config.ts) to run:
  - **Unit Tests** (`*.test.ts`) using `jsdom`.
  - **Browser Tests** (`*.browser.test.ts`) using `playwright` for real browser environments.
- **Biome**: Used for fast code formatting and linting, configured in `biome.json`.
- **Lefthook & Commitlint**: Enforce code quality and conventional commit messages via Git hooks. See `lefthook.yml` and `commitlint.config.js`.

## Development Workflow

Common tasks are managed by `pnpm` scripts in the root `package.json`.

- **To start development**:
  ```sh
  pnpm dev
  ```
  This command concurrently starts the Lit compiler in watch mode and the Astro development server.

- **To build the entire project**:
  ```sh
  pnpm build
  ```
  This builds `cyan-lit` first, then `cyan-docs`.

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
