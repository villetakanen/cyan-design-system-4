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
