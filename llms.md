# Cyan Design System v4.0.0 LLM Onboarding

This document provides instructions for Large Language Models (LLMs) on how to interact with and utilize the Cyan Design System.

## Overview

The Cyan Design System is a modern, scalable toolkit for building user interfaces with web components. It is distributed as a collection of packages on npm, designed for easy integration into any modern web project.

- **Core Goal**: To provide a robust and consistent foundation for UI development.
- **Website**: https://cyan.design

## Main Packages

The design system is modular. You can install only the parts you need.

- **`@11thdeg/cyan-lit`**: The core component library, built with Lit. It contains a rich set of web components to build your UI.
- **`@11thdeg/cyan-css`**: A comprehensive CSS framework providing styles, design tokens, and utilities. It is a required peer dependency for the components in `@11thdeg/cyan-lit`.
- **`@11thdeg/cn-editor`**: A rich text editor component.
- **`@11thdeg/cn-story-clock`**: A specialized component for tracking progress in tabletop role-playing games.
- **`@11thdeg/cn-dice`**: A component for rolling and displaying dice.

To get started, install the packages you need, e.g.:
`npm install @11thdeg/cyan-lit @11thdeg/cyan-css`

## Web Components (`@11thdeg/cyan-lit`)

When asked to create or modify UI, you should use these components.

### Available Components:

-   `<cn-app-bar>`: A container for top-level navigation and actions.
-   `<cn-avatar>`: Displays a user's profile picture or initials.
-   `<cn-avatar-button>`: An avatar that functions as a button.
-   `<cn-bubble>`: A small, dismissible element for displaying brief information.
-   `<cn-card>`: A flexible content container with various styling options.
-   `<cn-icon>`: Renders an SVG icon from the system's library.
-   `<cn-lightbox>`: A modal dialog for displaying images or other content in an overlay.
-   `<cn-loader>`: An animated loading indicator.
-   `<cn-menu>`: A list of options or actions presented in a dropdown.
-   `<cn-navigation-icon>`: An icon specifically for use in navigation contexts.
-   `<cn-reaction-button>`: A button that allows users to react to content (e.g., with an emoji).
-   `<cn-share-button>`: A button for sharing content to other platforms.
-   `<cn-snackbar>`: A temporary message displayed at the bottom of the screen.
-   `<cn-sortable-list>`: A list whose items can be reordered via drag-and-drop.
-   `<cn-toggle-button>`: A button that can be toggled between two states.
-   `<cn-tray-button>`: A button designed to open or close a tray or panel.

To use a component, import its definition. For example, to use the card component:
`import '@11thdeg/cyan-lit/dist/components/cn-card.js';`

## CSS Framework (`@11thdeg/cyan-css`)

The CSS framework provides styling for core HTML elements, utility classes, and design tokens.

To use it, import the main stylesheet in your application's entry point:
`import '@11thdeg/cyan-css';`

### Fonts

The design system uses **Lato** as the primary font for all text elements. You need to install and import the font in your project:

```bash
npm install lato-font
```

Then import it in your CSS:
```css
@import 'lato-font/css/lato-font.css';
```

The system uses a single font token `--cn-font-family` that references Lato with appropriate fallbacks.

### CSS Categories:

-   **`core`**: Base styles for native HTML elements (e.g., `body`, `h1`, `p`).
-   **`utilities`**: High-level utility classes for layout, spacing, and complex compositions.
-   **`atomics`**: Low-level, single-purpose utility classes (e.g., `.flex`, `.p-4`).
-   **`components`**: Light-dom styles for web components and other integrations.
-   **`typography`**: Classes and variables for controlling text styles (font size, weight, etc.).
-   **`tokens`**: CSS custom properties for colors, spacing, and other design values.

### Design Tokens

Tokens are the foundation of the design system's theming capabilities.

-   **Core Tokens**: `--cn-[selector]-[token]` (e.g., `--cn-button-background-color`).
-   **Theming Tokens**: `--color-[token]` and `--background-[token]` for theme customization.

When styling, prefer using these CSS variables to ensure consistency.

### Atomic CSS Classes

Here is a list of the available atomic CSS classes and their descriptions.

| Class | Description |
| :--- | :--- |
| `.radius-s` | Applies a small border radius. |
| `.radius-m` | Applies a medium border radius. |
| `.radius-l` | Applies a large border radius. |
| `.radius-xl` | Applies an extra-large border radius. |
| `.radius-round` | Applies a fully rounded border radius (50%). |
| `.border` | Applies a standard border. |
| `.border-t` | Applies a border to the top. |
| `.border-r` | Applies a border to the right. |
| `.border-b` | Applies a border to the bottom. |
| `.border-l` | Applies a border to the left. |
| `.border-between`| Applies a top border to all but the first child. |
| `.flex-wrap` | Allows flex items to wrap. |
| `.flex-nowrap` | Prevents flex items from wrapping. |
| `.flex-wrap-reverse` | Allows flex items to wrap in reverse order. |
| `.flex` | Sets display to flex. |
| `.flex-col` | Sets flex-direction to column. |
| `.flex-row-reverse` | Sets flex-direction to row-reverse. |
| `.flex-no-wrap` | Prevents flex items from wrapping. |
| `.flex-none` | Disables flex-grow and flex-shrink. |
| `.grow` | Allows a flex item to grow. |
| `.shrink` | Allows a flex item to shrink. |
| `.items-center` | Centers flex items. |
| `.items-start` | Aligns flex items to the start. |
| `.italic` | Sets font-style to italic. |
| `.no-underline` | Removes text-decoration. |
| `.grid` | Sets display to grid. |
| `.two-col` | Creates a two-column grid. |
| `.four-col` | Creates a four-column grid. |
| `.sm-hidden` | Hides element on small screens. |
| `.md-hidden` | Hides element on medium screens. |
| `.lg-hidden` | Hides element on large screens. |
| `.sm-only` | Shows element only on small screens. |
| `.md-only` | Shows element only on medium screens. |
| `.lg-only` | Shows element only on large screens. |
| `.screen-reader-only` | Hides element visually but keeps it for screen readers. |
| `.list-none` | Removes list-style. |
| `.secondary` | Applies secondary color theme. |
| `.p-1`, `.p-2` | Applies padding. |
| `.px-1`, `.px-2` | Applies horizontal padding. |
| `.py-1`, `.py-2` | Applies vertical padding. |
| `.pt-1`, `.pt-2` | Applies top padding. |
| `.pl-1`, `.pl-2` | Applies left padding. |
| `.pr-1`, `.pr-2` | Applies right padding. |
| `.pb-1`, `.pb-2` | Applies bottom padding. |
| `.m-1`, `.m-2` | Applies margin. |
| `.mx-1`, `.mx-2` | Applies horizontal margin. |
| `.my-1`, `.my-2` | Applies vertical margin. |
| `.mt-1`, `.mt-2` | Applies top margin. |
| `.ml-1`, `.ml-2` | Applies left margin. |
| `.mr-1`, `.mr-2` | Applies right margin. |
| `.mb-1`, `.mb-2` | Applies bottom margin. |
| `.full-w` | Sets width to 100%. |
| `.full-h` | Sets height to 100%. |
| `.text-high` | Sets text color to high emphasis. |
| `.text-low` | Sets text color to low emphasis. |
| `.text-default` | Sets text color to default. |
| `.text-center` | Aligns text to center. |
| `.text-left` | Aligns text to left. |
| `.text-right` | Aligns text to right. |

### Content Layout Utilities

These classes and selectors are used for structuring the main content areas of an application.

| Class / Selector | Description |
| :--- | :--- |
| `.content-cards` | A container for a list or grid of card-like content blocks. Responsive. |
| `.content-columns` | A flexible multi-column layout. Child elements can use `.column-s`, `.column-m`, `.column-l`. |
| `.column-s` | A small column within `.content-columns`. |
| `[column-m]` | A medium (default) column within `.content-columns`. |
| `.column-l` | A large column within `.content-columns`. |
| `.content-editor`| A container for a full-height editor interface, adjusting for the app bar. |
| `.content-listing`| A layout for list-based data with a main content area and an optional sidebar. |
| `.cols-2` | Creates a two-column layout for an item within `.content-listing`. |
| `.cols-3` | Creates a three-column layout for an item within `.content-listing`. |
| `.toolbar` | A flexbox container for actions, titles, and controls with consistent spacing. |
| `nav#rail` | The primary navigation rail/bar of the application. Adapts for mobile and desktop. |
| `nav#fab-tray` | A fixed container for floating action buttons. |
| `div#cn-background-poster` | A container for a full-page background image with a fade effect. |
| `dialog` | Provides styling for the native `<dialog>` element for modal windows. |
| `main > footer` | The primary application footer within the main content area. |
