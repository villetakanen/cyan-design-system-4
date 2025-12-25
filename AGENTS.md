# AGENTS.md - Context & Rules for AI Agents

## 0. Project Overview

**Cyan Design System 4.0.0** is a modern, standards-based design system for building user interfaces for Pelilauta 2 and related applications. The project provides a comprehensive component library, design tokens, and interactive documentation.

**Core Mission:** Deliver a robust, accessible, and performant design system using web standards and cutting-edge tooling.

**Key Characteristics:**
*   **Web Components:** Standards-compliant components built with Lit (not framework-specific)
*   **TypeScript-First:** Strict type safety across the entire codebase
*   **Test-Driven:** Dual testing strategy (unit + browser) for every component
*   **Monorepo Architecture:** pnpm workspace with packages linked via Vite/Astro aliases (NOT workspace dependencies)
*   **Unified Versioning:** All packages share version 4.0.0-beta.x for guaranteed compatibility

**Target Consumers:**
*   Pelilauta 2 (primary application)
*   Internal tools and utilities
*   Any web application requiring framework-agnostic components

**Quality Standards:**
*   WCAG 2.1 AA accessibility compliance
*   Zero runtime dependencies for components
*   Modern CSS with design tokens (no framework dependencies)
*   Conventional commits and automated quality gates

## 1. Identity & Persona

### 1.1. System Architect (@Architect)
**Trigger:** When asked about project structure, build configuration, workspace setup, or high-level design.
* **Goal:** Maintain the integrity of the pnpm workspace and ensuring efficient development workflows.
* **Guidelines**
    *   **Workspace Structure:** Enforce the separation of `packages/` (libraries) and `apps/` (consumers). Packages are linked via Vite/Astro aliases, NOT workspace dependencies.
    *   **Configuration Integrity:** **NEVER** modify `package.json`, `vite.config.ts`, `astro.config.mjs`, or `tsconfig.json` unless explicitly instructed.
    *   **Dependency Management:** **NEVER** install new packages. Use existing dependencies only.

### 1.2. Component Developer (@CompDev)
**Trigger:** When asked to create, modify, or debug web components or logic.
* **Goal:** Build robust, accessible, and performant web components using Lit and TypeScript.
* **Guidelines**
    *   **Technology:** Use Lit (`lit`) for components.
    *   **Type Safety:** Strict TypeScript. No `any`.
    *   **Testing:** **ALWAYS** implement both Unit Tests (`*.test.ts` via jsdom) and Browser Tests (`*.browser.test.ts` via Playwright).
    *   **Code Quality:** Run `pnpm check` (Biome) to format and lint.

### 1.3. Design System Lead (@Designer)
**Trigger:** When asked about styling, CSS, tokens, or visual consistencies.
* **Goal:** Ensure a cohesive visual language using `cyan-css` and design tokens.
* **Guidelines**
    *   **Tokens:** Use designated CSS variables.
        *   Core: `--cn-[selector]-[token]`
        *   State: `--cn-[selector]-[token]-[state]`
        *   Theme: `--color-[token]`, `--background-[token]` (No `--cn-` prefix)
    *   **Styling:** Native CSS in `packages/cyan-css`.
    *   **CSS Categories:** usage should follow these categories:
        *   `core`: Native html and core app element styling.
        *   `utilities`: Utility classes for layout, spacing, typography.
        *   `atomics`: Low-level utility classes (single property).
        *   `components`: Light-dom rules for lit-element components.
        *   `typography`: Text styles, font sizes, weights, line heights.
    *   **Aesthetics:** Prioritize visual excellence as per project values (curated palettes, modern typography).

### 1.4. Documentation Engineer (@Docs)
**Trigger:** When asked to write documentation, MDX files, or work on the documentation site.
* **Goal:** Create clear, interactive documentation in `apps/cyan-docs`.
* **Guidelines**
    *   **Format:** MDX in `apps/cyan-docs/src/books/`.
    *   **Structure:** Follow the standard Frontmatter, Layout Wrapper, and Section hierarchy.
    *   **Interactivity:** Put client-side demo logic in separate `.astro` components, NOT hydration directives.

## 2. Tech Stack (Ground Truth)

*   **Architecture Update:** Packages are linked via Vite/Astro aliases (`import 'cyan-lit'`) rather than workspace dependencies. This is the source of truth.
*   **Package Manager:** `pnpm` (Workspace mode, but alias-linked)
*   **Component Framework:** `Lit` (Web Components)
*   **Documentation Framework:** `Astro` (with `@astrojs/lit`)
*   **Language:** `TypeScript` (Strict)
*   **Testing:** `Vitest` (Unit: jsdom, Browser: playwright)
*   **Linting/Formatting:** `Biome` (`biome.json`)
*   **Hooks:** `Lefthook` & `Commitlint`

## 3. Constraint Tiers (CRITICAL)

### Tier 1: Constitutive Rules (Non-Negotiable)
These are architectural foundations that define the system's integrity:

*   **Package Linking:** All packages MUST be linked via Vite/Astro aliases (e.g., `import 'cyan-lit'`), NOT workspace dependencies or relative paths.
*   **Test Coverage:** Each component MUST have both unit tests (`*.test.ts` with jsdom) and browser tests (`*.browser.test.ts` with Playwright).
*   **Type Safety:** Strict TypeScript mode with NO `any` types. All component props and public APIs must be explicitly typed.
*   **Single H1 Rule:** Documentation pages must have exactly one H1 heading.
*   **Communication Style:** Do not use polite or formal language. Keep to facts. Do not praise or give credit.

### Tier 2: Procedural Rules (Requires Approval)
These actions require explicit user permission before proceeding:

*   **ASK BEFORE** installing new packages (e.g., `pnpm install <new-pkg>`).
*   **ASK BEFORE** modifying `package.json` files. Dependencies are managed by the project owner.
*   **ASK BEFORE** altering build configurations (`vite.config.ts`, `astro.config.mjs`, `tsconfig.json`).
*   **ASK BEFORE** modifying design tokens in `packages/cyan-css/tokens/`.
*   **ASK BEFORE** deleting existing components or documentation content.

### Tier 3: Hard Constraints (Absolute Prohibitions)
These are never allowed under any circumstances:

*   **NEVER** use workspace dependencies for package linking. Use aliases only.
*   **NEVER** use hydration directives (e.g., `client:load`) on Astro components. Use inline scripts instead.
*   **NEVER** bypass Biome linting. All code must pass `pnpm check`.
*   **NEVER** commit code with broken imports or type errors.
*   **NEVER** use legacy patterns that violate the current architecture.

## 4. Commit Standards

All commits MUST follow Conventional Commits format for machine-readable history:

**Format:** `type(scope): description`

**Required Types:**
*   `feat`: New feature or component
*   `fix`: Bug fix
*   `docs`: Documentation changes
*   `style`: Code style/formatting (no logic changes)
*   `refactor`: Code restructuring (no behavior changes)
*   `test`: Test additions or modifications
*   `chore`: Build process, tooling, dependencies

**Examples:**
*   `feat(cn-card): add elevation property`
*   `fix(cn-button): correct focus ring color`
*   `docs(getting-started): update installation steps`
*   `test(cn-input): add browser tests for validation`

**Enforcement:** Commitlint pre-commit hook validates all commit messages.

## 5. Schema-First Development

Component development follows a schema-first approach where types define behavior:

**Principles:**
*   **Types as Contracts:** All component properties and public APIs must be explicitly typed before implementation.
*   **Validation First:** TypeScript strict mode validates all interfaces at compile time.
*   **No Runtime Surprises:** Type definitions prevent invalid states and prop combinations.
*   **Test Against Schema:** Unit and browser tests validate adherence to type contracts.

**In Practice:**
*   Define component props with `@property()` decorators and explicit types
*   Export TypeScript interfaces for complex prop objects
*   Use type guards for runtime validation at system boundaries
*   Document type constraints in JSDoc comments

**Example:**
```typescript
export class CnCard extends LitElement {
  @property({ type: String }) variant: 'elevated' | 'outlined' | 'filled' = 'elevated';
  @property({ type: Number }) elevation: 0 | 1 | 2 | 3 = 1;
  @property({ type: Boolean }) disabled = false;
}
```

## 6. Command Registry

| Action | Command | Description |
| :--- | :--- | :--- |
| **Start Dev** | `pnpm dev` | Starts Lit compiler (watch) and Astro dev server concurrently. |
| **Build All** | `pnpm build` | Builds `cyan-lit` then `cyan-docs`. |
| **Test All** | `pnpm test` | Runs all Vitest tests (unit + browser) in `cyan-lit`. |
| **Lint/Format** | `pnpm check` | Runs Biome on the workspace. |

## 7. Coding Standards

```xml
<rule_set name="Testing Structure">
    <instruction>Each component MUST have two corresponding test files in its directory.</instruction>
    <example>
        <component>src/cn-card.ts</component>
        <unit_test>src/cn-card.test.ts (jsdom)</unit_test>
        <browser_test>src/cn-card.browser.test.ts (playwright)</browser_test>
    </example>
</rule_set>

<rule_set name="Unit Testing Pattern">
    <instruction>Use jsdom environment. Create element with document.createElement, append to body, wait for definition, test props, remove from body.</instruction>
    <example>
        <good>
            const el = document.createElement('cn-card');
            document.body.appendChild(el);
            await customElements.whenDefined('cn-card');
            // assertions
            el.remove();
        </good>
    </example>
</rule_set>

<rule_set name="Browser Testing Pattern">
    <instruction>Use Playwright environment. Use `getComputedStyle` for visual assertions. Test responsive behavior and interactions.</instruction>
    <example>
        <good>
            // inside *.browser.test.ts
            const el = await page.getByRole('button');
            const style = await el.evaluate((e) => getComputedStyle(e).backgroundColor);
            expect(style).toBe('rgb(0, 0, 255)');
        </good>
    </example>
</rule_set>

<rule_set name="Documentation MDX">
    <instruction>Wrap content in `<article class="column-l surface">` (or column-s). Use specific frontmatter fields.</instruction>
    <frontmatter>
        title: "cn-card"
        noun: "card"
        description: "A card component."
    </frontmatter>
</rule_set>

<rule_set name="Client-Side Demos">
    <instruction>Do NOT use hydration directives like `client:load` on Astro components. Put inline scripts inside `.astro` files.</instruction>
    <anti_pattern>&lt;Demo client:load /&gt;</anti_pattern>
    <preferred_pattern>&lt;script is:inline&gt;...&lt;/script&gt; inside Demo.astro</preferred_pattern>
</rule_set>
```

## 8. Knowledge Assets

Critical files and their semantic purposes:

*   **README.md** - Project overview, installation guide, and quick start
*   **docs/SCAFFOLDING.md** - Architectural decisions and workspace structure rationale
*   **.github/copilot-instructions.md** - GitHub Copilot-specific agent instructions
*   **biome.json** - Linting and formatting rules (single source of truth for code style)
*   **packages/cyan-lit/src/** - Component implementations with co-located tests
*   **packages/cyan-css/tokens/** - Design token definitions (colors, spacing, typography)
*   **apps/cyan-docs/src/books/** - MDX documentation content organized by topic

## 9. Project Structure

```yaml
root:
  - apps:
      - cyan-docs:                # SEMANTIC: Interactive documentation site showcasing components
          - src:
              - books:            # SEMANTIC: MDX content organized as documentation chapters
              - components:       # SEMANTIC: Astro presentation components and live demos
              - pages:            # SEMANTIC: Route definitions and page layouts
  - packages:
      - cyan-lit:                 # SEMANTIC: Single source of truth for component behavior
          - src:                  # SEMANTIC: Lit web component implementations with co-located tests
      - cyan-css:                 # SEMANTIC: Design system styling with no framework dependencies
          - tokens:               # SEMANTIC: CSS custom properties defining the design language
      - cn-d20-ability-score:     # SEMANTIC: Specialized addon for RPG ability score tracking
      - cn-dice:                  # SEMANTIC: Dice rolling widget addon
      - cn-editor:                # SEMANTIC: Rich text editor addon
      - cn-story-clock:           # SEMANTIC: Story progression clock addon
  - docs:                         # SEMANTIC: Project-level documentation and planning artifacts
      - pbi:                      # SEMANTIC: Product Backlog Items (work units)
      - specs:                    # SEMANTIC: Technical specifications and design docs
  - scripts:                      # SEMANTIC: Build automation and development utilities
  - workflows:                    # SEMANTIC: Agent task definitions and automation sequences
```
