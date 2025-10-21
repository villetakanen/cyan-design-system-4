# PBI: Add Negative Margin Atomic Utilities

**User Story:**

As a developer using the Cyan Design System, I want negative margin utility classes so that I can adjust spacing and pull elements outside their natural flow without writing custom CSS.

## **Description**

The production build requires `.mb--2` (negative margin-bottom) to compensate for spacing in certain layouts. The design system already has internal uses of negative margins (e.g., in `content-cards.css` and `content-editor.css`), but these are not exposed as reusable atomic utility classes.

This PBI adds negative margin atomic utilities to match the existing positive margin classes (`.mb-1`, `.mb-2`, etc.) in the `atomics/spacing.css` file.

## **Why This Override Was Needed**

The production application needed to pull elements upward by 2 grid units (`calc(-2 * var(--cn-grid))`) to create tighter visual groupings or to compensate for excessive bottom margins from other components. Without atomic utilities for negative margins, developers had to write custom CSS overrides.

The design system already uses this pattern internally (e.g., `margin-bottom: calc(-2 * var(--cn-grid))` in `utilities/content-editor.css`), proving the need exists, but the utilities weren't available for general use.

## **Acceptance Criteria**

1. **CSS Implementation:**
   - [ ] Add negative margin utilities to `packages/cyan-css/src/atomics/spacing.css`.
   - [ ] Support all directions: `mb--1`, `mb--2`, `mt--1`, `mt--2`, `ml--1`, `ml--2`, `mr--1`, `mr--2`.
   - [ ] Support axis shorthands: `my--1`, `my--2`, `mx--1`, `mx--2`.
   - [ ] Follow same naming pattern as positive margins but with `--` prefix for negative values.

2. **Design Tokens:**
   - [ ] Use existing `--cn-grid` token for calculations.
   - [ ] Use `calc(-1 * var(--cn-grid))` for `--1` variants.
   - [ ] Use `calc(-2 * var(--cn-grid))` for `--2` variants.

3. **Documentation:**
   - [ ] Update spacing documentation to include negative margin examples.
   - [ ] Include use cases (e.g., pulling elements closer, compensating for component margins).
   - [ ] Show light and dark mode examples.

## **Technical Considerations**

- **Naming Convention:** Use `--` prefix for negative values (e.g., `.mb--1`, `.mb--2`).
- **Consistency:** Match the same scale as positive margins (`-1` = 1 grid unit, `-2` = 2 grid units).
- **Scope:** Only implement `-1` and `-2` variants to match existing positive margin scale.
- **Use Cases:** Negative margins are primarily needed for:
  - Pulling cards or sections closer together
  - Compensating for component-level bottom margins
  - Creating overlapping visual effects

## **Example Usage**

```html
<!-- Pull section up to overlap with previous element -->
<section class="mb--2">...</section>

<!-- Compensate for excessive component margin -->
<div class="content-editor mb--2">...</div>

<!-- Tight vertical grouping -->
<div class="my--1">...</div>
```

## **Definition of Done**

- [ ] Negative margin atomics added to `packages/cyan-css/src/atomics/spacing.css`.
- [ ] All directional variants implemented (top, right, bottom, left).
- [ ] Axis shorthands implemented (x, y).
- [ ] Documentation updated with examples.
- [ ] Code follows project conventions.
