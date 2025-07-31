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