# PBI: Scrollbar Visibility and Token Unification

## Summary

Replace the hidden scrollbar with a semi-transparent visible scrollbar as the design system default, and unify all scrollbar-related tokens across packages.

## User Story

As a user of applications built with the Cyan Design System, I want to see a subtle scrollbar so that I can understand my scroll position and content length without the jarring appearance of default browser scrollbars.

## Spec Reference

See `plans/scrollbar/spec.md` for full architectural details.

## Scope

### 1. Create Scrollbar Tokens

**File:** `packages/cyan-css/src/tokens/scrollbar.css`

Define design tokens:
- `--cn-scrollbar-width` (8px)
- `--cn-scrollbar-border-radius` (4px)
- `--color-scrollbar-track` (transparent)
- `--color-scrollbar-thumb` (semi-transparent, theme-aware)
- `--color-scrollbar-thumb-hover` (more opaque on hover)

**File:** `packages/cyan-css/src/tokens/index.css`

Add import for scrollbar tokens.

### 2. Update Core Preflight

**File:** `packages/cyan-css/src/core/preflight.css`

- Remove: `body::-webkit-scrollbar { display: none; }`
- Add: Global scrollbar styling using new tokens (WebKit + Firefox)

### 3. Fix Tokens in cyan-css

**File:** `packages/cyan-css/src/core/tray.css`

- Remove: `scrollbar-color: var(--color-elevation-4) var(--color-elevation-1);`
- Tray will inherit global scrollbar styles

**File:** `packages/cyan-css/src/components/cn-lightbox.css`

- Remove: `--cn-lightbox-scrollbar-color: var(--color-secondary);`
- Unused token, lightbox will inherit global styles

### 4. Fix Tokens in cyan-lit

**File:** `packages/cyan-lit/src/cn-lightbox/index.ts`

- Remove: `scrollbar-color: var(--cn-lightbox-scrollbar-color) transparent;`
- Will inherit global styles

**File:** `packages/cyan-lit/src/cn-lightbox/styles.css`

- Remove: `--cn-lightbox-scrollbar-color: var(--color-secondary);`

### 5. Documentation

**File:** `apps/cyan-docs/src/books/styles/scrollbar.mdx`

Create documentation page covering:
- Visual demo in light/dark themes
- Token reference
- Customization options

## Files Changed

| Package | File | Change |
|---------|------|--------|
| cyan-css | `src/tokens/scrollbar.css` | Create |
| cyan-css | `src/tokens/index.css` | Add import |
| cyan-css | `src/core/preflight.css` | Replace hidden with visible |
| cyan-css | `src/core/tray.css` | Remove hardcoded scrollbar-color |
| cyan-css | `src/components/cn-lightbox.css` | Remove unused token |
| cyan-lit | `src/cn-lightbox/index.ts` | Remove scrollbar-color |
| cyan-lit | `src/cn-lightbox/styles.css` | Remove unused token |
| cyan-docs | `src/books/styles/scrollbar.mdx` | Create |

## Acceptance Criteria

- [ ] Scrollable elements show semi-transparent scrollbar by default
- [ ] Scrollbar track is transparent
- [ ] Scrollbar thumb is ~50% opacity, increases on hover
- [ ] Works in Chrome, Safari, Firefox, Edge
- [ ] Light/dark theme support
- [ ] No duplicate scrollbar styling across packages
- [ ] All scrollbar styling uses centralized tokens
- [ ] Documentation published

## Breaking Changes

- **Hidden scrollbar removed**: Applications that relied on hidden scrollbars will now show visible scrollbars
- **Removed tokens**: `--cn-lightbox-scrollbar-color` removed (was not widely used)

## Testing

1. Build cyan-css and cyan-lit packages
2. Verify scrollbar appears on scrollable content
3. Test hover state on scrollbar thumb
4. Toggle light/dark theme, verify colors adapt
5. Test in Chrome, Safari, Firefox
6. Run existing tests to ensure no regressions
