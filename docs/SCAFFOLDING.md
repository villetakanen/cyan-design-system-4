# Project: cyan-design-system-4

This plan outlines the steps to create the foundational structure for the Cyan Design System version 4.0.0. It will be a monorepo managed with pnpm, featuring Lit for web components, Astro for documentation, and a modern toolchain including TypeScript, Biome, Vitest, Lefthook, and Commitlint

### **Phase 1: Core Project Setup**

#### **1.1: Initialize Project and Git Repository**

1. Create the project directory:
    
    ```
    mkdir cyan-design-system-4
    cd cyan-design-system-4
    ```
    
2. Initialize a Git repository:
    
    ```
    git init
    ```
    
3. Create a `.gitignore` file:
    
    ```
    touch .gitignore
    ```
    
4. Add common ignore patterns to `.gitignore`:
    
    ```
    node_modules/
    dist/
    .astro/
    *.log
    .env
    ```


#### **1.2: Set Up pnpm Monorepo Structure**

1. Initialize a `package.json` file at the root:
    
    ```
    pnpm init
    ```
    
2. Create the `pnpm-workspace.yaml` file to define the monorepo structure:
    
    ```
    touch pnpm-workspace.yaml
    ```
    
3. Add the following content to `pnpm-workspace.yaml`:
    
    ```
    packages:
      - 'packages/*'
      - 'apps/*'
    ```
    
4. Create the directories for packages and applications:
    
    ```
    mkdir packages apps

### 1.3: Configure TypeScriptt

1. Add TypeScript as a root dependency:
    
    ```
    pnpm add -D typescript@latest
    ```
    
2. Create a root `tsconfig.json` file:
    
    ```
    touch tsconfig.json
    ```
    
3. Add a base TypeScript configuration to `tsconfig.json`. This will be extended by the sub-projects.
    
    ```
    {
      "compilerOptions": {
        "target": "ES2022",
        "module": "ES2022",
        "moduleResolution": "node",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "resolveJsonModule": true,
        "isolatedModules": true
      }
    }
    ```

#### **1.4: Set Up Biome**

1. Add Biome as a development dependency:
    
    ```
    pnpm add -D -w -E @biomejs/biome
    pnpm exec biome init
    ```

2. Update the `biome.json` file to enable formatting and linting:
    
    ```json
    {
     ...
      "formatter": {
        "enabled": true,
        "indentStyle": "space"
      },
     ...
    }
    ```
3. Add a script to `package.json` for Biome checks:
    
    ```json
    {
        "scripts": {
            "check": "biome check --write"
        }
    }
    ```
#### **1.5: Configure Lefthook and Commitlint**

1. Add `lefthook` and `commitlint` dependencies:
    
    ```
    pnpm add -D lefthook @commitlint/cli @commitlint/config-conventional
    ```
    
2. Create a `lefthook.yml` configuration file in the project root:
    
    ```
    pre-commit:
      commands:
        lint-and-format:
          run: pnpm biome check --apply .
    
    commit-msg:
      commands:
        commitlint:
          run: pnpm commitlint --edit {1}
    ```
    
3. Create a `commitlint.config.js` file in the project root:
    
    ```
    module.exports = {
      extends: ['@commitlint/config-conventional'],
    };
    ```
    
4. Add a `postinstall` script to the root `package.json` to install Git hooks:
    
    ```
    "scripts": {
      "postinstall": "lefthook install",
      "lint": "biome lint .",
      "format": "biome format --write ."
    }
    ```

### **Phase 2: Lit Component Library**

#### **2.1: Create the Lit Package**

1. Create a directory for the Lit components package:
    
    ```
    mkdir packages/cyan-lit
    cd packages/cyan-lit
    ```
    
2. Initialize a `package.json` file for the Lit package:
    
    ```
    pnpm init
    ```
    
3. Add Lit as a dependency:
    
    ```
    pnpm add lit
    ```
    
4. Add TypeScript and Vitest as development dependencies:
    
    ```
    pnpm add -D typescript vitest
    ```
    
5. Create a `tsconfig.json` that extends the root configuration:
    
    ```json
    {
      "extends": "../../tsconfig.json",
      "compilerOptions": {
        "outDir": "dist",
        "declaration": true,
        "declarationMap": true,
        "experimentalDecorators": true,
        "useDefineForClassFields": false
      },
      "include": ["src/**/*.ts"],
      "exclude": ["node_modules", "dist"]
    }
    ```

#### **2.2: Create a Sample Component**

1. Create the source directory:
    
    ```
    mkdir src
    ```
    
2. Create a sample button component file: `src/cyan-button.ts`
    
    ```typescript
    import { LitElement, html, css } from 'lit';
    import { customElement, property } from 'lit/decorators.js';

    @customElement('cyan-button')
    export class CyanButton extends LitElement {
      @property({ type: String })
      label = 'Button';

      static styles = css`
        :host {
          display: inline-block;
        }
        button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover {
          background-color: #0056b3;
        }
      `;

      render() {
        return html`<button>${this.label}</button>`;
      }
    }
    ```
    
3. Create an index file to export components: `src/index.ts`
    
    ```typescript
    export { CyanButton } from './cyan-button.js';
    ```
    
4. Update `package.json` with proper build configuration:
    
    ```json
    {
      "name": "cyan-lit",
      "version": "1.0.0",
      "description": "Cyan Design System Lit Components",
      "type": "module",
      "main": "dist/index.js",
      "types": "dist/index.d.ts",
      "exports": {
        ".": {
          "import": "./dist/index.js",
          "types": "./dist/index.d.ts"
        }
      },
      "scripts": {
        "build": "tsc",
        "test": "vitest"
      },
      "keywords": ["lit", "web-components", "design-system"],
      "author": "",
      "license": "ISC"
    }
    ```

### **Phase 3: Astro Documentation Site**

#### **3.1: Create the Astro App**

1. Navigate to the apps directory:
    
    ```
    cd ../../apps
    ```
    
2. Create a new Astro project:
    
    ```
    pnpm create astro@latest cyan-docs -- --template minimal
    ```
    
3. Navigate into the new Astro project directory:
    
    ```
    cd cyan-docs
    ```
    
4. Add the design system as a dependency using the workspace protocol:
    
    ```
    pnpm add "cyan-lit@workspace:*"
    ```

#### **3.2: Configure Astro for Web Components**

1. Update the `astro.config.mjs` file to support Lit components:
    
    ```javascript
    import { defineConfig } from 'astro/config';
    import lit from '@astrojs/lit';

    export default defineConfig({
      integrations: [lit()],
    });
    ```
    
2. Add the Lit integration dependency:
    
    ```
    pnpm add @astrojs/lit
    ```

#### **3.3: Create Documentation Pages**

1. Update the main page to showcase the design system components in `src/pages/index.astro`:
    
    ```astro
    ---
    import Layout from '../layouts/Layout.astro';
    import '../../../packages/cyan-lit/dist/index.js';
    ---

    <Layout title="Cyan Design System">
      <main>
        <h1>Cyan Design System</h1>
        <p>Welcome to the Cyan Design System documentation.</p>
        
        <section>
          <h2>Components</h2>
          
          <h3>Button Component</h3>
          <cyan-button label="Default Button"></cyan-button>
          <cyan-button label="Custom Label"></cyan-button>
        </section>
      </main>
    </Layout>
    ```
    
3. Create a basic layout file `src/layouts/Layout.astro`:
    
    ```astro
    ---
    export interface Props {
      title: string;
    }

    const { title } = Astro.props;
    ---

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="description" content="Cyan Design System Documentation" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>{title}</title>
      </head>
      <body>
        <slot />
      </body>
    </html>

    <style>
      html {
        font-family: system-ui, sans-serif;
      }
      body {
        margin: 0;
        padding: 2rem;
        background: #f9f9f9;
      }
      main {
        max-width: 1200px;
        margin: 0 auto;
      }
      h1 {
        color: #333;
        border-bottom: 2px solid #007bff;
        padding-bottom: 0.5rem;
      }
      section {
        margin: 2rem 0;
        padding: 1rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
    </style>
    ```

#### **3.4: Update Package Scripts**

1. Update the root `package.json` to include documentation scripts:
    
    ```json
    {
      "scripts": {
        "postinstall": "lefthook install",
        "lint": "biome lint .",
        "format": "biome format --write .",
        "dev:docs": "pnpm --filter cyan-docs dev",
        "build:docs": "pnpm --filter cyan-docs build",
        "build:components": "pnpm --filter cyan-lit build",
        "build": "pnpm build:components && pnpm build:docs"
      }
    }
    ```

### **Phase 4: Testing with Vitest**

#### **4.1: Configure Vitest for Lit**

1. Navigate to the Lit package directory:
    
    ```
    cd ../../packages/cyan-lit
    ```
    
2. Create a `vitest.config.ts` file:
    
    ```typescript
    import { defineConfig } from 'vitest/config';

    export default defineConfig({
      test: {
        environment: 'jsdom', // or 'happy-dom'
      },
    });
    ```
    
3. Add jsdom as a development dependency for the test environment:
    
    ```
    pnpm add -D jsdom
    ```
    
4. The test script is already configured in the `package.json` of the Lit package:
    
    ```json
    "scripts": {
      "test": "vitest"
    }
    ```

#### **4.2: Create Sample Tests**

1. Create a test file for the button component: `src/cyan-button.test.ts`
    
    ```typescript
    import { describe, it, expect } from 'vitest';
    import { CyanButton } from '../src/cyan-button.js';

    describe('CyanButton', () => {
      it('should create an instance', () => {
        const element = new CyanButton();
        expect(element).toBeInstanceOf(CyanButton);
      });

      it('should have default label', () => {
        const element = new CyanButton();
        expect(element.label).toBe('Button');
      });

      it('should accept custom label', () => {
        const element = new CyanButton();
        element.label = 'Custom Button';
        expect(element.label).toBe('Custom Button');
      });
    });
    ```
    
2. Run the tests to verify the configuration:
    
    ```
    pnpm test
    ```
    
    Or run tests in CI mode (single run without watch):
    
    ```
    pnpm test --run
    ```

#### **4.3: Update Root Package Scripts**

1. Add test scripts to the root `package.json`:
    
    ```json
    {
      "scripts": {
        "postinstall": "lefthook install",
        "lint": "biome lint .",
        "format": "biome format --write .",
        "dev:docs": "pnpm --filter cyan-docs dev",
        "build:docs": "pnpm --filter cyan-docs build",
        "build:components": "pnpm --filter cyan-lit build",
        "build": "pnpm build:components && pnpm build:docs",
        "test": "pnpm --filter cyan-lit test",
        "test:components": "pnpm --filter cyan-lit test"
      }
    }
    ```

### **Phase 5: Headless UI Testing**

#### **5.1: Configure Headless UI Testing**

1. Add the necessary Vitest browser testing packages:
    
    ```
    pnpm add -D @vitest/browser vitest-browser-lit playwright
    ```
    
2. Install Playwright browsers:
    
    ```
    npx playwright install
    ```
    
3. Update `vitest.config.ts` to enable browser testing:
    
    ```typescript
    import { defineConfig } from 'vitest/config';

    export default defineConfig({
      test: {
        browser: {
          enabled: true,
          name: 'chromium',
          provider: 'playwright',
          headless: true,
        },
      },
    });
    ```
    
    Note: The configuration above uses the legacy format for simplicity. For Vitest 3+, you can use the newer `instances` format for more advanced configurations:
    
    ```typescript
    export default defineConfig({
      test: {
        browser: {
          enabled: true,
          instances: [
            {
              browser: 'chromium',
              provider: 'playwright',
              headless: true,
            }
          ],
        },
      },
    });
    ```

#### **5.2: Create Browser Tests**

1. Create a browser-specific test file: `src/cyan-button.browser.test.ts`
    
    ```typescript
    import { describe, it, expect, beforeEach } from 'vitest';
    import './cyan-button.js';

    describe('CyanButton - Browser Tests', () => {
      beforeEach(() => {
        document.body.innerHTML = '';
      });

      it('should render with default label in browser', async () => {
        const element = document.createElement('cyan-button');
        document.body.appendChild(element);
        
        // Wait for the element to be defined and rendered
        await customElements.whenDefined('cyan-button');
        await new Promise(resolve => setTimeout(resolve, 0));
        
        const button = element.shadowRoot?.querySelector('button');
        expect(button).toBeTruthy();
        expect(button?.textContent).toBe('Button');
      });

      it('should render with custom label in browser', async () => {
        const element = document.createElement('cyan-button');
        element.setAttribute('label', 'Click Me');
        document.body.appendChild(element);
        
        await customElements.whenDefined('cyan-button');
        await new Promise(resolve => setTimeout(resolve, 0));
        
        const button = element.shadowRoot?.querySelector('button');
        expect(button).toBeTruthy();
        expect(button?.textContent).toBe('Click Me');
      });

      it('should handle click events', async () => {
        const element = document.createElement('cyan-button');
        element.setAttribute('label', 'Test Button');
        document.body.appendChild(element);
        
        await customElements.whenDefined('cyan-button');
        await new Promise(resolve => setTimeout(resolve, 0));
        
        const button = element.shadowRoot?.querySelector('button');
        expect(button).toBeTruthy();
        
        // Test that the button is clickable
        let clicked = false;
        button?.addEventListener('click', () => {
          clicked = true;
        });
        
        button?.click();
        expect(clicked).toBe(true);
      });

      it('should have proper styling', async () => {
        const element = document.createElement('cyan-button');
        document.body.appendChild(element);
        
        await customElements.whenDefined('cyan-button');
        await new Promise(resolve => setTimeout(resolve, 0));
        
        const button = element.shadowRoot?.querySelector('button');
        expect(button).toBeTruthy();
        
        if (button) {
          const styles = getComputedStyle(button);
          expect(styles.backgroundColor).toBe('rgb(0, 123, 255)'); // #007bff
          expect(styles.color).toBe('rgb(255, 255, 255)'); // white
          // Browser may apply default padding, so let's check it's not empty
          expect(styles.padding).toBeTruthy();
        }
      });
    });
    ```
    
2. Run the tests to verify browser testing works:
    
    ```
    pnpm test --run
    ```

#### **5.3: Benefits of Browser Testing**

Browser testing provides several advantages:

- **Real DOM environment**: Tests run in an actual browser environment with full DOM support
- **Accurate styling**: Computed styles are tested as they would appear to users
- **Shadow DOM support**: Web components' shadow DOM is properly tested
- **Event handling**: Real browser event system for testing interactions
- **Visual debugging**: Screenshots are automatically captured on test failures
- **Multiple browser support**: Can test across Chromium, Firefox, and WebKit

Both unit tests (jsdom) and browser tests run together, providing comprehensive test coverage for different scenarios.

### **Phase 5: Enable Hot Module Replacement (HMR)**

#### **5.1: Install Concurrently**

1. Install concurrently as a root-level development dependency to run multiple commands simultaneously:
    
    ```
    pnpm add -D concurrently -w
    ```

#### **5.2: Add Watch Script to Lit Package**

1. Navigate to the Lit package:
    
    ```
    cd packages/cyan-lit
    ```
    
2. Add a `dev` script to its `package.json` to compile TypeScript in watch mode:
    
    ```json
    "scripts": {
      "build": "tsc",
      "dev": "tsc --watch",
      "test": "vitest"
    }
    ```

### **Phase 6: Final Steps**

#### **6.1: Root-Level Scripts**

1. Navigate to the root of the project:
    
    ```
    cd ../..
    ```
    
2. Update the scripts in the root `package.json` to run commands across all workspaces, including the new concurrent dev command:
    
    ```json
    "scripts": {
      "postinstall": "lefthook install",
      "dev": "concurrently \"pnpm --filter cyan-lit dev\" \"pnpm --filter cyan-docs dev\"",
      "build": "pnpm --filter cyan-lit build && pnpm --filter cyan-docs build",
      "test": "pnpm --recursive test",
      "lint": "biome lint .",
      "format": "biome format --write .",
      "check": "biome check --write ."
    }
    ```
    
    This configuration provides:
    - **`dev`**: Runs both component compilation in watch mode and documentation site simultaneously
    - **`build`**: Builds components first, then documentation (ensuring proper dependency order)
    - **`test`**: Runs tests across all packages recursively
    - **`lint`**: Lints all files in the workspace
    - **`format`**: Formats all files in the workspace
    - **`check`**: Applies Biome formatting and linting fixes automatically

## **Project Setup Complete! 🎉**

The Cyan Design System v4.0.0 is now fully configured with:

### **✅ Core Infrastructure**
- **Monorepo**: pnpm workspace with packages and apps structure
- **TypeScript**: Strict configuration with shared base config
- **Biome**: Fast linting and formatting
- **Git Hooks**: Lefthook with pre-commit formatting and commit message validation
- **Commitlint**: Conventional commit enforcement

### **✅ Component Development**
- **Lit**: Modern web components with TypeScript decorators
- **Hot Module Replacement**: Watch mode compilation for rapid development
- **Testing**: Comprehensive unit and browser testing with Vitest
- **Type Safety**: Full TypeScript support with declaration files

### **✅ Documentation**
- **Astro**: Fast, modern documentation site
- **Component Integration**: Live component demos in documentation
- **Development Server**: Hot reloading for documentation changes

### **✅ Developer Experience**
- **Concurrent Development**: Run components and docs simultaneously with `pnpm dev`
- **One-Command Build**: Sequential building with `pnpm build`
- **Comprehensive Testing**: Browser and unit tests with `pnpm test`
- **Code Quality**: Automated formatting and linting

### **🚀 Getting Started**

```bash
# Development (runs both component watch and docs server)
pnpm dev

# Build everything
pnpm build

# Run all tests
pnpm test

# Format and lint
pnpm check
```

The development server will be available at `http://localhost:4321/` with live component demos and documentation.