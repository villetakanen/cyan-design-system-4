# GitHub Copilot Instructions for Cyan Design System

This document provides context for GitHub Copilot about the Cyan Design System v4.0.0 project.

## Project Overview

The project is a modern design system built as a `pnpm` workspace (monorepo). Its purpose is to provide a consistent and efficient development experience.

- **Core Goal**: Create a robust, scalable foundation for building user interfaces with web components.
- **High-level Documentation**: The main project overview is in [README.md](README.md).
- **Detailed Scaffolding**: The entire project setup process is documented in [docs/SCAFFOLDING.md](docs/SCAFFOLDING.md).

## Architecture

The workspace is divided into `packages/` for reusable libraries and `apps/` for consumer applications.

- **`packages/cyan-lit`**: The core component library built with Lit. All web components reside here.
  - Components are located in `packages/cyan-lit/src/`.
  - A typical component is [`packages/cyan-lit/src/cyan-button.ts`](packages/cyan-lit/src/cyan-button.ts).
  - All components are exported from [`packages/cyan-lit/src/index.ts`](packages/cyan-lit/src/index.ts).
- **`apps/cyan-docs`**: The documentation site built with Astro. It consumes and showcases components from `cyan-lit`.
  - The main page is [`apps/cyan-docs/src/pages/index.astro`](apps/cyan-docs/src/pages/index.astro).

## Technologies

- **pnpm**: Used for package management and workspace orchestration.
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
