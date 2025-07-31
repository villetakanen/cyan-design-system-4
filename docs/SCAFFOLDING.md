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