# GitHub Copilot Instructions for Cyan Design System

This document provides context for GitHub Copilot about the Cyan Design System v4.0.0 project.

## General instuctions

Do not use polite or formal language. Keep to facts and do not
praise or give credit to user.

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

## Strict Guidelines

- **Do not modify `package.json` files**: The `package.json` files in this project are managed by the project owner. Do not add, remove, or modify any dependencies or scripts.
- **Do not install new packages**: All necessary dependencies are already defined in the `package.json` files. Do not use `pnpm install` or any other package manager to install new packages.
- **Do not alter build configurations**: Do not change any build-related files, such as `vite.config.ts`, `astro.config.mjs`, or `tsconfig.json`.

## Documentation Guidelines

The documentation for components is written in MDX and follows a consistent structure. When adding or updating documentation, please adhere to the following guidelines.

### File Structure

-   Documentation files are located in `apps/cyan-docs/src/books/`.
-   Organize files into subdirectories based on their category (e.g., `custom-elements`, `application`, `principles`).

### MDX File Content

A typical documentation file has the following structure:

1.  **Frontmatter**: A YAML block at the top of the file.
    -   `title`: The title of the page, usually the component tag name (e.g., `<cn-card>`).
    -   `noun`: The name of an icon to be displayed next to the title.
    -   `description`: A brief description of the component.

2.  **Layout Wrapper**: All content should be wrapped in an `<article>` tag with a `column-l` class for wide content or `column-s` for narrow content.

3.  **Main Title**: An `<h1>` heading with the component name.

4.  **Description**: A short paragraph describing the component's purpose.

5.  **Examples/Demo**:
    -   A section with live examples of the component.
    -   Use the `grid two-col` class to show light and dark mode examples side-by-side.
    -   For complex demos with JavaScript, create a separate `.astro` component in `apps/cyan-docs/src/components/demo/` and import it into the MDX file.

    ### Loading client-side demo JS

    When MDX pages need client-side JavaScript for interactive demos, prefer keeping the JS inside an `.astro` demo component. Astro components can include inline scripts that run in the browser (for example using `<script is:inline>`). Do not add hydration directives like `client:load` to the Astro component itself in the MDX file — Astro components are not hydrated. Instead, keep the demo's client code inside the `.astro` file so it can execute on the client without attempting to hydrate the component.

6.  **API Reference**:
    -   Use sections like "API", "Properties / Attributes", and "CSS Custom Properties" to document the component's interface.
    -   Use markdown tables to list properties, attributes, and CSS custom properties.
    -   Tables should include columns for `Name`, `Attribute`, `Type`, `Default`, and `Description`.

7.  **Detailed Sections**:
    -   Include sections like "Usage", "Features", "Visual Behavior", and "Dependencies" to provide comprehensive documentation.
    -   Use code blocks with syntax highlighting to show usage examples.

## Testing Guidelines

The `cyan-lit` package uses Vitest for testing. All components should have both unit and browser tests.

### Test File Structure

For each component (e.g., `cn-card`), create two test files in the component's directory:
-   `cn-card.test.ts`: For unit tests that can run in a `jsdom` environment.
-   `cn-card.browser.test.ts`: For tests that require a real browser environment.

### Unit Tests (`*.test.ts`)

-   **Environment**: `jsdom`.
-   **Purpose**: Test the component's basic functionality, properties, and attributes.
-   **Key Practices**:
    -   Import `describe`, `expect`, `it` from `vitest`.
    -   Create the component using `document.createElement()`.
    -   Append the component to `document.body` for testing.
    -   Use `await customElements.whenDefined('component-name')` to ensure the component is ready.
    -   Use `element.shadowRoot?.querySelector()` to inspect the component's internal structure.
    -   Test default property values and how the component renders when properties change.
    -   Clean up by removing the component from `document.body` after each test.

### Browser Tests (`*.browser.test.ts`)

-   **Environment**: Playwright (real browser).
-   **Purpose**: Test styling, layout, and complex interactions that cannot be accurately tested in `jsdom`.
-   **Key Practices**:
    -   Follow the same basic structure as unit tests.
    -   Use `getComputedStyle()` to make assertions about the component's visual appearance.
    -   Test responsive behavior and different visual states.
    -   Test user interactions like clicks, popovers, and other events that rely on browser APIs.
