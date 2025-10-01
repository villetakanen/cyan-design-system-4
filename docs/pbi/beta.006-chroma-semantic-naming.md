# PBI: Rename Chroma Color Tokens to Semantic Names

**Type:** Breaking Change  
**Priority:** High  
**Version:** 4.0.0-beta.6  
**Effort:** Medium

## User Story

As a developer using the Cyan Design System, I want the color token names to clearly communicate their semantic purpose so that I can easily understand which tokens to use for specific UI states (info, warning, error) without having to reference documentation or memorize abstract letter codes.

## Problem Statement

The current chroma color system uses abstract single-letter names (`--chroma-C`, `--chroma-N`, `--chroma-A`) that are not self-documenting. This creates several issues:

1. **Poor Developer Experience:** Developers must remember that `C` = info/cyan, `N` = neutral/warning, `A` = alert/error
2. **Inconsistent Usage:** Production sites are creating their own overrides because the intent is unclear
3. **Missing/Misnamed Tokens:** The token `--chroma-alert-field-tint` references non-existent `--chroma-alert-tint`. This should be `--background-alert-tint` or `--color-alert-tint` (a semantic color token, not a chroma master token). Production sites are adding workarounds for this.
4. **Legacy Dead Code:** The `-hsl` variants (e.g., `--chroma-C-hsl`) are unused legacy tokens from before `color-mix()` support. They add complexity without providing value.
5. **Incomplete Documentation:** The theming guide doesn't clearly explain these tokens or how to override them
6. **Version 4.0 Opportunity:** Since we're in a pre-release breaking change cycle, this is the right time to fix this

### Current Usage Analysis

Based on grep search, current usage:
- `colors.css`: 10 references to `--chroma-C`, `--chroma-N`, `--chroma-A`
- `chroma.css`: 6 token definitions (3 colors + 3 unused `-hsl` variants)
- `cn-reaction-button.css`: 1 reference to `--chroma-A`
- **No references found** to `-hsl` variants - safe to remove

## Proposed Solution

### 1. Rename Core Chroma Tokens

**Before:**
```css
:root {
  --chroma-C: hsl(170deg, 100%, 20%);
  --chroma-C-hsl: 170, 100%, 20%;  /* legacy - unused */
  --chroma-N: hsl(65deg, 100%, 63%);
  --chroma-N-hsl: 65, 100%, 63%;  /* legacy - unused */
  --chroma-A: hsl(318, 83%, 40%);
  --chroma-A-hsl: 318, 83%, 40%;  /* legacy - unused */
}
```

**After:**
```css
:root {
  /* ============================================
   * CHROMA MASTER COLORS
   * ============================================
   * These are the semantic accent colors that can be overridden
   * to create custom themes. They map to functional UI states:
   * - info: Informational messages, accents (default: teal)
   * - warning: Warning states, caution (default: yellow)
   * - error: Error states, destructive actions (default: magenta)
   * 
   * Note: -hsl variants removed as they're no longer needed with color-mix()
   */
  
  /* Info/Accent Color */
  --chroma-info: hsl(170deg, 100%, 20%);
  
  /* Warning Color */
  --chroma-warning: hsl(65deg, 100%, 63%);
  
  /* Error/Alert Color */
  --chroma-error: hsl(318, 83%, 40%);
}
```

### 2. Add Chroma Tint Tokens and Fix Semantic Color Tints

**A) Add chroma-level tint tokens** for theme master colors:

```css
/* In chroma.css */
:root {
  /* ...color definitions above... */
  
  /* Derived tints for subtle backgrounds (10% opacity) */
  --chroma-info-tint: color-mix(in hsl, var(--chroma-info), transparent 90%);
  --chroma-warning-tint: color-mix(in hsl, var(--chroma-warning), transparent 90%);
  --chroma-error-tint: color-mix(in hsl, var(--chroma-error), transparent 90%);
}
```

**B) Fix misnamed token in colors.css:**

The token `--chroma-alert-field-tint` incorrectly references `--chroma-alert-tint` (which doesn't exist and shouldn't - chroma tokens are master colors, not semantic colors). This should be:

```css
/* In colors.css - BEFORE (incorrect) */
--chroma-alert-field-tint: var(--chroma-alert-tint);

/* AFTER (correct semantic naming) */
--background-alert-tint: color-mix(in hsl, var(--color-alert), transparent 90%);
/* OR alternatively */
--color-alert-tint: color-mix(in hsl, var(--color-alert), transparent 90%);
```

**Recommendation:** Use `--background-alert-tint` to match the pattern of background tokens.

### 3. Update All References

Update all files that reference the old tokens:

**Files to Update:**
- `packages/cyan-css/src/tokens/colors.css` (10 references to `--chroma-C/N/A`, plus fix `--chroma-alert-field-tint`)
- `packages/cyan-css/src/components/cn-reaction-button.css` (1 reference)

**Example Changes in colors.css:**
```css
/* Before */
--cn-color-info: var(--chroma-C);
--cn-color-warning: var(--chroma-N);
--cn-color-error: var(--chroma-A);
--color-on-alert: light-dark(var(--chroma-A), var(--chroma-A));
--color-button-cta: light-dark(var(--chroma-A), var(--chroma-A));
--chroma-alert-field-tint: var(--chroma-alert-tint); /* incorrect - references non-existent token */

/* After */
--cn-color-info: var(--chroma-info);
--cn-color-warning: var(--chroma-warning);
--cn-color-error: var(--chroma-error);
--color-on-alert: light-dark(var(--chroma-error), var(--chroma-error));
--color-button-cta: light-dark(var(--chroma-error), var(--chroma-error));
--background-alert-tint: color-mix(in hsl, var(--color-alert), transparent 90%); /* fixed semantic token */
```

**Note:** `--color-alert` correctly uses `--chroma-primary-20`, not the error color. This is intentional for the design system's color scheme.

### 4. Update Documentation

**Update:** `apps/cyan-docs/src/books/principles/theming.mdx`

Add a section documenting the chroma tokens:

```markdown
## Chroma Master Colors

The Cyan Design System uses three semantic accent colors for functional UI states:

| Token | Purpose | Default Color | Usage |
|-------|---------|---------------|-------|
| `--chroma-info` | Informational messages, accents | Teal (hsl(170deg, 100%, 20%)) | Info badges, accent elements |
| `--chroma-warning` | Warning states | Yellow (hsl(65deg, 100%, 63%)) | Warning messages, caution states |
| `--chroma-error` | Error states, destructive actions | Magenta (hsl(318, 83%, 40%)) | Error messages, delete buttons |

### Tint Variants

Each chroma color has a `-tint` variant for subtle background usage:

- `--chroma-info-tint`
- `--chroma-warning-tint`
- `--chroma-error-tint`

### Custom Theming Example

```css
:root {
  /* Override with your brand colors */
  --chroma-info: hsl(210, 100%, 50%);      /* Blue */
  --chroma-warning: hsl(30, 100%, 50%);    /* Orange */
  --chroma-error: hsl(0, 85%, 50%);        /* Red */
}
```
```

**Create:** `docs/principles/color-system.md` (comprehensive guide)

### 5. Migration Guide

Add a section to `docs/INTEGRATION-CHECKLIST.md`:

```markdown
## Breaking Changes in v4.0.0

### Chroma Token Renaming

The abstract chroma color tokens have been renamed to semantic names:

| Old Token | New Token | Migration |
|-----------|-----------|-----------|
| `--chroma-C` | `--chroma-info` | Find and replace |
| `--chroma-C-hsl` | ~~Removed~~ | Use `color-mix()` instead |
| `--chroma-N` | `--chroma-warning` | Find and replace |
| `--chroma-N-hsl` | ~~Removed~~ | Use `color-mix()` instead |
| `--chroma-A` | `--chroma-error` | Find and replace |
| `--chroma-A-hsl` | ~~Removed~~ | Use `color-mix()` instead |

**Action Required:** Search your codebase for any direct usage of the old tokens and update them.

**New Tokens:** The following tint variants are now available:
- `--chroma-info-tint` (chroma master level)
- `--chroma-warning-tint` (chroma master level)
- `--chroma-error-tint` (chroma master level)
- `--background-alert-tint` (semantic level - replaces incorrect `--chroma-alert-field-tint`)

**Removed Tokens:** The following legacy tokens are removed:
- `--chroma-C-hsl`, `--chroma-N-hsl`, `--chroma-A-hsl` (not needed with `color-mix()`)

**Note:** If you were using `-hsl` variants, migrate to `color-mix()` for color manipulation.
```

## Acceptance Criteria

### Code Changes

- [ ] `packages/cyan-css/src/tokens/chroma.css` updated with:
  - [ ] Semantic token names (`--chroma-info`, `--chroma-warning`, `--chroma-error`)
  - [ ] Comprehensive documentation comments explaining the system
  - [ ] New tint tokens (`-tint` variants for each color)
  - [ ] **Remove** legacy `-hsl` variants (no longer needed with `color-mix()`)

- [ ] `packages/cyan-css/src/tokens/colors.css` updated with:
  - [ ] All 10 references to `--chroma-C/N/A` updated to semantic names
  - [ ] Fix `--chroma-alert-field-tint` → `--background-alert-tint` with proper color-mix definition
  
- [ ] All component references updated in:
  - [ ] `packages/cyan-css/src/components/cn-reaction-button.css` (1 reference)

- [ ] No remaining references to old tokens:
  - [ ] No `--chroma-C` found in workspace
  - [ ] No `--chroma-N` found in workspace
  - [ ] No `--chroma-A` found in workspace
  - [ ] No `-hsl` variants for info/warning/error in workspace

### Documentation

- [ ] `apps/cyan-docs/src/books/principles/theming.mdx` updated with:
  - [ ] Table showing chroma tokens with semantic names
  - [ ] Usage examples for each token
  - [ ] Custom theming example
  - [ ] Tint variant documentation

- [ ] Migration guide created/updated:
  - [ ] Added to `docs/INTEGRATION-CHECKLIST.md`
  - [ ] Clear before/after examples
  - [ ] Search and replace instructions

- [ ] Color system principles documented:
  - [ ] Explanation of the three-color semantic system
  - [ ] When to use each color
  - [ ] Override strategy for custom themes

### Testing & Validation

- [ ] Visual inspection of docs site:
  - [ ] All color tokens render correctly
  - [ ] No console errors about undefined CSS variables
  - [ ] Theme switcher demo still works

- [ ] Build validation:
  - [ ] `pnpm build` succeeds without errors
  - [ ] No CSS variable warnings in build output

- [ ] Component verification:
  - [ ] `cn-reaction-button` renders correctly
  - [ ] All components using chroma tokens display properly
  - [ ] Light/dark mode switching works

- [ ] Documentation site review:
  - [ ] Theming page renders correctly
  - [ ] Color examples display properly
  - [ ] Code samples are accurate

## Technical Considerations

### Breaking Change Impact

**Severity:** Medium - Only affects users who directly reference chroma tokens  
**Mitigation:** Clear migration guide with find-and-replace instructions

### Affected Users

- Internal packages (all updated as part of this PBI)
- External consumers who override chroma tokens in their themes
- Production sites with custom overrides (like pelilauta16)

### Rollback Plan

If issues are discovered post-merge:
1. The old tokens can be temporarily aliased to new tokens for one version
2. Deprecation warnings can be added
3. Full removal in v4.1.0

### Search Pattern for Validation

```bash
# Ensure no old tokens remain
grep -r "--chroma-C" packages/
grep -r "--chroma-N" packages/
grep -r "--chroma-A" packages/

# Verify -hsl variants are removed (should find none for info/warning/error)
grep -r "\-hsl:" packages/cyan-css/src/tokens/chroma.css | grep -E "(info|warning|error)"
```

## Implementation Order

1. **Update `chroma.css`** - Rename tokens, add documentation, **remove `-hsl` variants**
2. **Add tint tokens** - Add the missing derived tokens
3. **Update `colors.css`** - Replace all references
4. **Update `cn-reaction-button.css`** - Replace reference
5. **Update documentation** - Theming guide and principles
6. **Add migration guide** - Integration checklist updates (note `-hsl` removal)
7. **Validation** - Build, visual inspection, grep verification

## Related Issues

- Fixes production override requirement from `sandbox/pelilauta16-overrides.css`
- Addresses misnamed `--chroma-alert-field-tint` token that references non-existent `--chroma-alert-tint`
- Improves developer experience for v4.0.0 release
- Clarifies distinction between chroma master tokens (theme level) and semantic color tokens (application level)

## Notes

- This is a **breaking change** appropriate for the 4.0.0 major version
- No backward compatibility aliases will be provided (clean break)
- This should be completed before 4.0.0 stable release
- Consider announcing this change in release notes prominently

### Token Naming Clarity

**Important distinction:**
- **Chroma tokens** (`--chroma-*`): Master/theme-level colors that can be overridden for branding
- **Semantic tokens** (`--color-*`, `--background-*`): Application-level tokens that reference chroma tokens

The bug with `--chroma-alert-field-tint` occurred because it mixed these layers - using a "chroma-" prefix for what should be a semantic token. The fix renames it to `--background-alert-tint` to maintain proper token hierarchy.

This should be documented clearly in the theming guide to prevent similar confusion in the future.
