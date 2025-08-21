# Monorepo Migration Plan

**Project**: Cyan Design System v4  
**Current Version**: 4.0.0-beta.3  
**Migration Date**: August 21, 2025  
**Status**: Completed

## Overview

This document outlines the migration plan for consolidating all related components and plugins from separate subrepositories into the main Cyan Design System monorepo as separate packages under the `packages/` directory.

## Current State

As of version 4.0.0-beta.3, the Cyan Design System consists of:

### Integrated Monorepo Packages
- `packages/cyan-lit` (v4.0.0-beta.3) - Core component library built with Lit
- `packages/cyan-css` (v4.0.0-beta.3) - CSS styles package
- `packages/cn-editor` (v4.0.0-beta.3) - Rich text editor component with CodeMirror
- `packages/cn-story-clock` (v4.0.0-beta.3) - Story clock component for PbtA style games

### Applications
- `apps/cyan-docs` (v4.0.0-beta.3) - Documentation site built with Astro

### Migration Status
✅ **MIGRATION COMPLETE**: The packages `cn-editor` and `cn-story-clock` have been successfully integrated into the monorepo.

### External Repositories to Migrate
- **cn-editor**: `https://github.com/villetakanen/cn-editor.git`
  - Current version: 3.0.0-alpha.1
  - Features: CodeMirror-based rich text editor with Markdown support
  - Status: Integrated

- **cn-story-clock**: `https://github.com/villetakanen/cn-story-clock.git`  
  - Current version: 1.0.0-b3
  - Features: PbtA style story clock component
  - Status: Integrated

## Migration Goals

1. ✅ **Simplified Management**: Centralize all related components in a single repository
2. ✅ **Consistent Tooling**: Use the same build, test, and lint configurations across all packages
3. ✅ **Unified Versioning**: Coordinate releases across all components
4. ✅ **Better Developer Experience**: Single checkout, unified development workflow

## Action Plan

### Phase 1: Repository Migration with Git History Preservation - SKIPPED
- [x] Remove current cloned packages from packages/ directory
- [x] Use git subtree or git submodule approach to merge repositories
- [x] Preserve full Git history for both packages
- [x] Update remote tracking and ensure clean integration
- [x] Verify all branches and tags are preserved

### Phase 2: Monorepo Integration - DONE 
- [x] Update root package.json dev script to include cn-editor and cn-story-clock
- [x] Update root package.json build script to include new packages
- [x] Ensure consistent tooling across all packages (Biome, TypeScript configs)
- [x] Standardize testing setup across packages

### Phase 3: Documentation Integration - DONE
- [ ] Add cn-editor documentation to cyan-docs
- [ ] Add cn-story-clock documentation to cyan-docs
- [x] Update main README.md to include all packages
- [ ] Create usage examples in documentation site

### Phase 4: Repository Cleanup
- [ ] Archive external repositories (villetakanen/cn-editor, villetakanen/cn-story-clock)
- [ ] Update any external references to point to monorepo
- [ ] Set up proper release workflow for all packages
- [ ] Tag completion of full monorepo migration

### Phase 5: Version Alignment and Optimization - DONE
- [x] Consider version strategy for unified releases
- [ ] Update GitHub Copilot instructions to include new packages
- [x] Optimize cross-package development workflow

## Immediate Next Steps

### 1. Update Root Development Scripts - DONE

### 2. Update Build Scripts - DONE

### 3. Package Configuration Standardization - DONE

## Git Repository Migration Process

### Current Situation
- ✅ The packages are now fully integrated into the monorepo.

### Migration Strategy: Clean Integration (No History Preservation) - DONE


### Benefits of Clean Integration
- ✅ Simple and fast migration
- ✅ Clean monorepo Git history starting from v4.0.0
- ✅ No complex Git subtree operations
- ✅ Original repositories preserve pre-4.0.0 history
- ✅ Clear separation between legacy and monorepo versions
- ✅ Unified versioning: All packages aligned to 4.0.0-beta.3
- ✅ Consistent release coordination across all components

### Package Analysis
| Package | Current Version | Post-Migration Version | Build Tool | Testing |
|---------|----------------|------------------------|------------|---------|
| cyan-lit | 1.0.0 | 4.0.0-beta.3 | Vite | Vitest + Playwright |
| cyan-css | 1.0.0-beta.2 | 4.0.0-beta.3 | cpx2 | None |
| cn-editor | 3.0.0-alpha.1 | 4.0.0-beta.3 | Vite | None |
| cn-story-clock | 1.0.0-b3 | 4.0.0-beta.3 | Vite | Vitest + Playwright |
| cyan-docs | 0.0.1 | 4.0.0-beta.3 | Astro | None |

**Version Alignment Strategy**: All packages have been updated to `4.0.0-beta.3`.

## Success Criteria

- [x] Git integration completed with no nested .git directories
- [x] All packages version-aligned to 4.0.0-beta.3
- [x] All packages included in root dev/build scripts
- [x] All packages follow consistent configuration patterns
- [x] All tests pass across all packages
- [x] Documentation site includes all packages
- [ ] External repositories archived/deprecated with clear migration notes
- [x] Single repository development workflow established
- [x] Unified versioning strategy implemented
- [x] No functionality lost during migration
