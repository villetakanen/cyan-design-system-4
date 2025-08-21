# Monorepo Migration Plan

**Project**: Cyan Design System v4  
**Current Version**: 4.0.0-beta.3  
**Migration Date**: August 21, 2025  
**Status**: Planning Phase

## Overview

This document outlines the migration plan for consolidating all related components and plugins from separate subrepositories into the main Cyan Design System monorepo as separate packages under the `packages/` directory.

## Current State

As of version 4.0.0-beta.3, the Cyan Design System consists of:

### Integrated Monorepo Packages
- `packages/cyan-lit` (v1.0.0) - Core component library built with Lit
- `packages/cyan-css` (v1.0.0-beta.2) - CSS styles package
- `packages/cn-editor` (v3.0.0-alpha.1) - Rich text editor component with CodeMirror
- `packages/cn-story-clock` (v1.0.0-b3) - Story clock component for PbtA style games

### Applications
- `apps/cyan-docs` (v0.0.1) - Documentation site built with Astro

### Migration Status
⚠️ **MIGRATION NEEDED**: The packages `cn-editor` and `cn-story-clock` are currently separate Git repositories that have been cloned into the packages directory. We need to properly merge these repositories into the monorepo with full Git history preservation.

### External Repositories to Migrate
- **cn-editor**: `https://github.com/villetakanen/cn-editor.git`
  - Current version: 3.0.0-alpha.1
  - Features: CodeMirror-based rich text editor with Markdown support
  - Status: Currently cloned in packages/cn-editor with separate Git history

- **cn-story-clock**: `https://github.com/villetakanen/cn-story-clock.git`  
  - Current version: 1.0.0-b3
  - Features: PbtA style story clock component
  - Status: Currently cloned in packages/cn-story-clock with separate Git history

## Migration Goals

1. **Simplified Management**: Centralize all related components in a single repository
2. **Consistent Tooling**: Use the same build, test, and lint configurations across all packages
3. **Unified Versioning**: Coordinate releases across all components
4. **Better Developer Experience**: Single checkout, unified development workflow

## Action Plan

### Phase 1: Repository Migration with Git History Preservation
- [ ] Remove current cloned packages from packages/ directory
- [ ] Use git subtree or git submodule approach to merge repositories
- [ ] Preserve full Git history for both packages
- [ ] Update remote tracking and ensure clean integration
- [ ] Verify all branches and tags are preserved

### Phase 2: Monorepo Integration  
- [ ] Update root package.json dev script to include cn-editor and cn-story-clock
- [ ] Update root package.json build script to include new packages
- [ ] Ensure consistent tooling across all packages (Biome, TypeScript configs)
- [ ] Standardize testing setup across packages

### Phase 3: Documentation Integration
- [ ] Add cn-editor documentation to cyan-docs
- [ ] Add cn-story-clock documentation to cyan-docs
- [ ] Update main README.md to include all packages
- [ ] Create usage examples in documentation site

### Phase 4: Repository Cleanup
- [ ] Archive external repositories (villetakanen/cn-editor, villetakanen/cn-story-clock)
- [ ] Update any external references to point to monorepo
- [ ] Set up proper release workflow for all packages
- [ ] Tag completion of full monorepo migration

### Phase 5: Version Alignment and Optimization
- [ ] Consider version strategy for unified releases
- [ ] Update GitHub Copilot instructions to include new packages
- [ ] Optimize cross-package development workflow

## Immediate Next Steps

### 1. Update Root Development Scripts
The root `package.json` currently only includes `cyan-lit`, `cyan-css`, and `cyan-docs` in the dev script. We need to add the new packages:

**Current dev script:**
```json
"dev": "concurrently \"pnpm --filter cyan-lit dev\" \"pnpm --filter cyan-css dev\" \"pnpm --filter cyan-docs dev\""
```

**Should become:**
```json
"dev": "concurrently \"pnpm --filter cyan-lit dev\" \"pnpm --filter cyan-css dev\" \"pnpm --filter cn-editor dev\" \"pnpm --filter cn-story-clock dev\" \"pnpm --filter cyan-docs dev\""
```

### 2. Update Build Scripts
Similarly for the build script:

**Current build script:**
```json
"build": "pnpm --filter cyan-lit build && pnpm --filter cyan-css build && pnpm --filter cyan-docs build"
```

**Should include:**
```json
"build": "pnpm --filter cyan-lit build && pnpm --filter cyan-css build && pnpm --filter cn-editor build && pnpm --filter cn-story-clock build && pnpm --filter cyan-docs build"
```

### 3. Package Configuration Standardization
- `cn-editor` uses Biome 2.1.3 (should match root 2.2.0)
- `cn-story-clock` has different script names and testing setup
- Both packages should inherit TypeScript configuration from root

## Git Repository Migration Process

### Current Situation
The packages are currently cloned as separate Git repositories within the packages/ directory:
```
packages/cn-editor/.git      -> https://github.com/villetakanen/cn-editor.git
packages/cn-story-clock/.git -> https://github.com/villetakanen/cn-story-clock.git
```

### Migration Strategy: Clean Integration (No History Preservation)

Since the original repositories will maintain Git history for pre-4.0.0 versions, we'll use a clean integration approach:

#### Step 1: Remove Git Directories
```bash
# From monorepo root
rm -rf packages/cn-editor/.git
rm -rf packages/cn-story-clock/.git
```

#### Step 2: Clean Up Remote References
```bash
# Remove any git-specific files that might cause conflicts
find packages/cn-editor -name ".gitignore" -delete
find packages/cn-story-clock -name ".gitignore" -delete
find packages/cn-editor -name ".gitmodules" -delete
find packages/cn-story-clock -name ".gitmodules" -delete
```

#### Step 3: Add to Main Repository
```bash
git add packages/cn-editor packages/cn-story-clock
git commit -m "feat: integrate cn-editor and cn-story-clock packages into monorepo

- cn-editor v4.0.0-beta.3: CodeMirror-based rich text editor (was v3.0.0-alpha.1)
- cn-story-clock v4.0.0-beta.3: PbtA style story clock component (was v1.0.0-b3)
- Version alignment: All packages now follow 4.0.0-beta.3 unified versioning
- Original git history preserved in external repositories
- Starting fresh integration for v4.0.0+ development"
```

#### Step 4: Update Package Versions
```bash
# Update package.json versions to align with monorepo
# cn-editor: 3.0.0-alpha.1 -> 4.0.0-beta.3
# cn-story-clock: 1.0.0-b3 -> 4.0.0-beta.3
# All other packages -> 4.0.0-beta.3
```

### Benefits of Clean Integration
- ✅ Simple and fast migration
- ✅ Clean monorepo Git history starting from v4.0.0
- ✅ No complex Git subtree operations
- ✅ Original repositories preserve pre-4.0.0 history
- ✅ Clear separation between legacy and monorepo versions
- ✅ Unified versioning: All packages aligned to 4.0.0-beta.3
- ✅ Consistent release coordination across all components

### Package Analysis
Current package versions and configurations:

| Package | Current Version | Post-Migration Version | Build Tool | Testing |
|---------|----------------|------------------------|------------|---------|
| cyan-lit | 1.0.0 | 4.0.0-beta.3 | Vite | Vitest + Playwright |
| cyan-css | 1.0.0-beta.2 | 4.0.0-beta.3 | cpx2 | None |
| cn-editor | 3.0.0-alpha.1 | 4.0.0-beta.3 | Vite | None |
| cn-story-clock | 1.0.0-b3 | 4.0.0-beta.3 | Vite | Vitest + Playwright |
| cyan-docs | 0.0.1 | 4.0.0-beta.3 | Astro | None |

**Version Alignment Strategy**: All packages will be updated to `4.0.0-beta.3` (matching the main monorepo version) to establish unified versioning from the migration point forward.

### Workspace Configuration
The project uses `pnpm` workspace configuration defined in `pnpm-workspace.yaml`:
```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

### Build System
- All packages use Vite/Astro aliases for cross-package imports
- No traditional workspace dependencies - packages are linked via aliases
- Unified scripts in root package.json for development and building

### Testing Strategy
- Each package maintains its own test configuration
- Root `pnpm test` runs all package tests recursively
- Both unit tests (jsdom) and browser tests (Playwright) supported

### Code Quality
- Unified Biome configuration in root `biome.json`
- Lefthook Git hooks for pre-commit quality checks
- Conventional commit messages enforced via commitlint

## Package Structure Standards

Each package should follow this structure:
```
packages/{package-name}/
├── package.json
├── tsconfig.json
├── vite.config.ts (if needed)
├── vitest.config.ts (if testing)
├── README.md
├── src/
│   ├── index.ts
│   └── {component-files}
└── {other-config-files}
```

## Dependencies Management

### Development Dependencies
- Shared dev dependencies (TypeScript, Biome, etc.) in root package.json
- Package-specific dev dependencies in individual package.json files
- No cross-package dependencies - use Vite aliases instead

### Runtime Dependencies
- Each package manages its own runtime dependencies
- Lit components use Lit as a peer dependency
- CSS packages have no runtime dependencies

## Version Strategy

### Post-Migration Unified Versioning
After migration completion, all packages will be aligned to **4.0.0-beta.3** to establish:
- **Consistent release coordination** across all components
- **Clear version boundary** between legacy (external repos) and monorepo development
- **Simplified dependency management** within the design system
- **Unified changelog and release notes** for the entire system

### Version Migration Plan
| Component | Current | Target | Rationale |
|-----------|---------|---------|-----------|
| cyan-design-system-4 | 4.0.0-beta.3 | 4.0.0-beta.3 | Root version (unchanged) |
| cyan-lit | 1.0.0 | 4.0.0-beta.3 | Align with design system |
| cyan-css | 1.0.0-beta.2 | 4.0.0-beta.3 | Align with design system |
| cn-editor | 3.0.0-alpha.1 | 4.0.0-beta.3 | Major bump for monorepo integration |
| cn-story-clock | 1.0.0-b3 | 4.0.0-beta.3 | Major bump for monorepo integration |
| cyan-docs | 0.0.1 | 4.0.0-beta.3 | Align with design system |

### Future Versioning Strategy
- **Coordinated releases**: All packages version together
- **Semantic versioning**: Breaking changes bump all packages
- **Beta/RC coordination**: Pre-release versions stay synchronized
- **Individual hotfixes**: Patch versions may diverge when needed for specific packages

## Risk Mitigation

### Backup Strategy
- All existing repositories will remain available during migration
- Full git history preservation for all packages
- Rollback plan to separate repositories if needed

### Testing Strategy
- Comprehensive testing before any deprecation
- Parallel development environment for validation
- Staged rollout with documentation site first

## Success Criteria

- [x] Git integration completed with no nested .git directories
- [ ] All packages version-aligned to 4.0.0-beta.3
- [ ] All packages included in root dev/build scripts
- [ ] All packages follow consistent configuration patterns
- [ ] All tests pass across all packages
- [ ] Documentation site includes all packages
- [ ] External repositories archived/deprecated with clear migration notes
- [ ] Single repository development workflow established
- [ ] Unified versioning strategy implemented
- [ ] No functionality lost during migration

## Immediate Action Items

### High Priority
1. **Execute clean Git integration** by removing .git directories and committing packages - *(.git and .gitignore files removed)*
2. **Align all package versions** to 4.0.0-beta.3 for unified versioning
3. **Update root package.json scripts** to include cn-editor and cn-story-clock
4. **Verify all functionality** works after migration and version alignment

### Medium Priority
1. **Archive external repositories** with clear "migrated to monorepo" messaging
2. **Standardize configurations** across packages (Biome versions, TypeScript configs)
3. **Add missing tests** to cn-editor package  
4. **Integrate packages into documentation site**

### Low Priority
1. **Create unified development guide** in README emphasizing 4.0.0+ monorepo development
2. **Add GitHub Copilot instructions** for new packages
3. **Plan coordinated release strategy** for future versions

## Timeline

**Current Status**: Ready for clean integration - no Git history preservation needed

**Simplified Migration Schedule**:
- **Phase 1 (30 minutes)**: Clean integration by removing .git directories and committing to main repo
- **Phase 2 (30 minutes)**: Update build scripts and workspace integration  
- **Phase 3 (1 hour)**: Testing and validation
- **Phase 4 (15 minutes)**: Archive external repositories and update references

**Total Time**: ~2 hours

## Notes

**Simplified Migration Approach**: Since the original repositories will maintain the Git history for pre-4.0.0 versions, we can use a clean integration approach:

1. **Remove Git metadata** from cloned packages
2. **Commit as new packages** to the main monorepo
3. **Start fresh Git history** for v4.0.0+ development
4. **Archive external repos** with clear "migrated to monorepo" messaging

This approach provides:
- **Clear version boundary**: Pre-4.0.0 = external repos, 4.0.0+ = monorepo
- **Simple migration**: No complex Git operations required
- **Clean history**: Monorepo history starts fresh with integration commit
- **Historical preservation**: Original repos remain available for reference

The result is a clean, maintainable monorepo structure where all future development (v4.0.0+) happens in the unified repository, while historical versions remain accessible in the original repositories.
