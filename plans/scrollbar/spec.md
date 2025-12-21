# Feature: Scrollbar Visibility

## Blueprint

### Context

The current design system hides the main body scrollbar via `preflight.css`:

```css
body::-webkit-scrollbar {
  display: none;
}
```

This creates a clean, app-like aesthetic but has drawbacks:
- Users lose visual feedback about scroll position and content length
- Some users find hidden scrollbars disorienting or inaccessible
- Power users expect visible scroll indicators

Meanwhile, specific components like `nav#tray` already use visible scrollbars with `scrollbar-color`, showing the design system can accommodate visible scrollbars.

**User request**: Replace the hidden scrollbar with a semi-transparent scrollbar - transparent track (background) with visible thumb (scroller).

### Architecture

**Approach: Replace hidden scrollbar with styled visible scrollbar as the default**

This is a breaking change from the hidden scrollbar behavior, but aligns with user expectations and accessibility.

#### Design Tokens

```css
/* Location: packages/cyan-css/src/tokens/scrollbar.css */

:root {
  /* Scrollbar dimensions */
  --cn-scrollbar-width: 8px;
  --cn-scrollbar-border-radius: 4px;
  
  /* Track (background) - transparent */
  --color-scrollbar-track: transparent;
  
  /* Thumb (scroller) - semi-transparent, adapts to theme */
  --color-scrollbar-thumb: light-dark(
    color-mix(in hsl, var(--chroma-surface-70), transparent 50%),
    color-mix(in hsl, var(--chroma-surface-40), transparent 50%)
  );
  
  /* Thumb hover - slightly more opaque */
  --color-scrollbar-thumb-hover: light-dark(
    color-mix(in hsl, var(--chroma-surface-70), transparent 30%),
    color-mix(in hsl, var(--chroma-surface-40), transparent 30%)
  );
}
```

#### Core Styles

Update `preflight.css` to replace the hidden scrollbar with styled visible scrollbar:

```css
/* Location: packages/cyan-css/src/core/preflight.css */

/* Remove this: */
/* body::-webkit-scrollbar {
  display: none;
} */

/* Add scrollbar styling for all elements */

/* Standard property (Firefox) */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--color-scrollbar-thumb) var(--color-scrollbar-track);
}

/* Webkit browsers (Chrome, Safari, Edge) */
::-webkit-scrollbar {
  width: var(--cn-scrollbar-width);
  height: var(--cn-scrollbar-width);
}

::-webkit-scrollbar-track {
  background: var(--color-scrollbar-track);
  border-radius: var(--cn-scrollbar-border-radius);
}

::-webkit-scrollbar-thumb {
  background: var(--color-scrollbar-thumb);
  border-radius: var(--cn-scrollbar-border-radius);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-scrollbar-thumb-hover);
}

::-webkit-scrollbar-corner {
  background: var(--color-scrollbar-track);
}
```

#### Integration Points

- **Token file**: `packages/cyan-css/src/tokens/scrollbar.css`
- **Token index**: Add import to `packages/cyan-css/src/tokens/index.css`
- **Core update**: Modify `packages/cyan-css/src/core/preflight.css`
- **Documentation**: `apps/cyan-docs/src/books/styles/scrollbar.mdx`

#### Migration of Existing Components

Update these components to use the new tokens (removes duplication):
- `nav#tray` in `tray.css` - remove hardcoded `scrollbar-color`, will inherit global styles
- `cn-lightbox` - remove unused `--cn-lightbox-scrollbar-color` token

### Anti-Patterns

| Anti-Pattern | Why to Avoid |
|--------------|--------------|
| Fixed pixel colors | Breaks theme switching; must use `light-dark()` or tokens |
| Opaque scrollbar track | Obscures content; transparent track is subtler |
| Very thin scrollbar (< 6px) | Hard to grab/click; accessibility concern |
| Animations on scrollbar | Distracting; scrollbars should be utilitarian |

---

## Contract

### Definition of Done

**Tokens:**
- [ ] Scrollbar tokens defined in `packages/cyan-css/src/tokens/scrollbar.css`
- [ ] Import added to `packages/cyan-css/src/tokens/index.css`
- [ ] Tokens work with `light-dark()` for theme support

**Core Styles:**
- [ ] Remove `body::-webkit-scrollbar { display: none; }` from `preflight.css`
- [ ] Add global scrollbar styling to `preflight.css`
- [ ] Works in WebKit browsers (Chrome, Safari, Edge)
- [ ] Works in Firefox via `scrollbar-color`/`scrollbar-width`

**Functionality:**
- [ ] Transparent track (background)
- [ ] Semi-transparent thumb (visible scroller)
- [ ] Thumb becomes more visible on hover
- [ ] Applies to all scrollable elements globally

**Quality:**
- [ ] Uses design tokens for all values
- [ ] Respects light/dark theme
- [ ] Minimum 8px width for accessibility

**Cleanup:**
- [ ] Remove hardcoded `scrollbar-color` from `tray.css`
- [ ] Remove unused `--cn-lightbox-scrollbar-color` from `cn-lightbox.css`

**Documentation:**
- [ ] Page created at `apps/cyan-docs/src/books/styles/scrollbar.mdx`
- [ ] Light/dark theme demo included
- [ ] Documents token customization options

### Regression Guardrails

| Invariant | Rationale |
|-----------|-----------|
| Must use design tokens | Theme compatibility |
| Track must be transparent | Core visual requirement |
| Thumb must be semi-transparent | Subtle, non-intrusive appearance |
| Minimum 8px width | Accessibility/usability |

### Acceptance Criteria

1. **Visible by default**: All scrollable elements show the styled scrollbar
2. **Transparent track**: The scrollbar track/background is fully transparent
3. **Semi-transparent thumb**: The scrollbar thumb is visible but not opaque (~50% opacity)
4. **Hover feedback**: Thumb becomes more visible when hovered (~70% opacity)
5. **Theme support**: Colors adapt correctly in light and dark modes
6. **Cross-browser**: Works in Chrome, Safari, Firefox, and Edge
7. **Customizable**: Apps can override via `--color-scrollbar-thumb` etc.
