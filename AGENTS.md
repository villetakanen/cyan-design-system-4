# AGENTS.md - Context & Rules for AI Agents

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

## 3. Operational Boundaries (CRITICAL)

*   **NEVER** modify `package.json` files. Dependencies are managed by the project owner.
*   **NEVER** install new packages (e.g., `pnpm install <new-pkg>`).
*   **NEVER** alter build configurations (`vite.config.ts`, `astro.config.mjs`, `tsconfig.json`).
*   **ALWAYS** use the provided aliases (e.g., `import 'cyan-lit'`, `import 'cyan-css'`) instead of relative paths for packages.
*   **Communication:** Do not use polite or formal language. Keep to facts. Do not praise or give credit.

## 4. Command Registry

| Action | Command | Description |
| :--- | :--- | :--- |
| **Start Dev** | `pnpm dev` | Starts Lit compiler (watch) and Astro dev server concurrently. |
| **Build All** | `pnpm build` | Builds `cyan-lit` then `cyan-docs`. |
| **Test All** | `pnpm test` | Runs all Vitest tests (unit + browser) in `cyan-lit`. |
| **Lint/Format** | `pnpm check` | Runs Biome on the workspace. |

## 5. Coding Standards

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

## 6. Context References

*   **Project Overview:** [README.md](README.md)
*   **Scaffolding:** [docs/SCAFFOLDING.md](docs/SCAFFOLDING.md)
*   **Copilot Instructions:** [.github/copilot-instructions.md](.github/copilot-instructions.md)

## 7. Project Structure

```yaml
root:
  - apps:
      - cyan-docs:           # Documentation site (Astro)
          - src:
              - books:       # MDX Documentation content
              - components:  # Astro components & demos
              - pages:       # Routes
  -packages:
      - cyan-lit:            # Core Component Library (Lit)
          - src:             # Web Components source
      - cyan-css:            # Design System Styling
          - tokens:          # Design Tokens (CSS Variables)
      - cn-d20-ability-score: # Addon Package
      - cn-dice:              # Addon Package
      - cn-editor:            # Addon Package
      - cn-story-clock:       # Addon Package
  - docs:                    # Project Documentation
      - pbi:                 # Product Backlog Items
      - specs:               # Project Specifications
  - scripts:                 # Utility scripts
  - workflows:               # Agent workflows
```
