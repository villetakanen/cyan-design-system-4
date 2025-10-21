# PBI: Add `.text-warning` Color Utility

**User Story:**

As a developer using the Cyan Design System, I want a `.text-warning` utility class so that I can style text with warning colors for alert and notification content.

## **Description**

The production build requires a `.text-warning` class to display warning-colored text. The design system has color tokens (`--chroma-warning`, `--color-on-error`) but lacks utility classes for applying warning text colors.

This PBI adds `.text-warning` and potentially other semantic text color utilities to the atomics or typography category.

## **Why This Override Was Needed**

The production application needs to display warning messages, error states, or cautionary text using the warning color from the design system. The override was needed because:

1. **Color tokens exist:** `--chroma-warning` is defined in `tokens/colors.css`
2. **Utility classes missing:** No `.text-warning` class to apply the color
3. **Inconsistent implementation:** The override uses `--color-on-error` as fallback, which mixes error and warning concepts

The production override implemented:

```css
.text-warning {
  color: var(--color-on-error, var(--chroma-warning));
  font-weight: bold;
}
```

**Issues with this override:**
- Uses `--color-on-error` (error color) instead of a warning-specific token
- Couples color with font-weight (mixing concerns)
- The fallback to `--chroma-warning` suggests the proper token should be warning-specific

## **Acceptance Criteria**

1. **CSS Implementation:**
   - [ ] Add `.text-warning` to a new file `packages/cyan-css/src/atomics/text-colors.css`.
   - [ ] Use `--chroma-warning` or create `--color-warning` token if needed.
   - [ ] Do NOT include font-weight in the utility (keep it atomic).
   - [x] Added `.text-warning` to `packages/cyan-css/src/atomics/text-color.css`.
   - [x] Created semantic token `--color-warning` in `packages/cyan-css/src/tokens/colors.css` mapped directly to `--chroma-warning`.
   - [x] Utility sets color only (no font-weight).

2. **Semantic Color Utilities:**
   - [ ] Add `.text-warning` for warning messages.
   - [ ] Add `.text-error` for error messages (may already exist).
   - [ ] Add `.text-success` for success messages (may already exist).
   - [ ] Add `.text-info` for informational messages (may already exist).

3. **Token Usage:**
   - [ ] Verify `--chroma-warning` exists and is the appropriate token.
   - [ ] If needed, create semantic color tokens (`--color-warning`, `--color-on-warning`).
   - [ ] Ensure colors meet WCAG contrast requirements in both themes.

4. **Documentation:**
   - [ ] Document semantic text color utilities.
   - [ ] Show examples with warning, error, success, info messages.
   - [ ] Demonstrate light and dark theme support.

## **Technical Considerations**

- **Atomic Principle:** Color utilities should ONLY set color, not font-weight or other properties.
- **Font Weight:** If warning text needs bold weight, that should be a separate class (`.bold` or `.font-weight-bold`).
- **Token Naming:**
  - Current: `--chroma-warning` (direct chroma token)
  - Better: `--color-warning` (semantic color that references chroma)
- **Theming:** Warning colors should work in both light and dark modes.

## **Proposed Implementation**

Implementation used (semantic mapping + atomic utilities):

Tokens (in `packages/cyan-css/src/tokens/colors.css`):

```css
--color-warning: var(--chroma-warning);
```

Atomics (in `packages/cyan-css/src/atomics/text-color.css`):

```css
.text-warning { color: var(--color-warning, var(--chroma-warning)); }
.text-error { color: var(--color-error, var(--chroma-error)); }
.text-success { color: var(--color-success, var(--chroma-primary-60)); }
.text-info { color: var(--color-info, var(--chroma-info)); }
```

## **Example Usage**

```html
<!-- Warning message -->
<p class="text-warning">Warning: This action cannot be undone</p>

<!-- Warning with bold (separate concern) -->
<p class="text-warning bold">Important Warning</p>

<!-- Error message -->
<p class="text-error">Error: Invalid input</p>

<!-- Success message -->
<p class="text-success">Success: Changes saved</p>

<!-- Informational message -->
<p class="text-info">Info: New features available</p>
```

## **Related Utilities to Consider**

While implementing `.text-warning`, consider adding a complete semantic color set:

- `.text-warning` - Warning state (yellow/orange)
- `.text-error` - Error state (red)
- `.text-success` - Success state (green)
- `.text-info` - Informational state (blue)

## **Migration Note**

The production override couples color with font-weight. After implementing this PBI, production code should update to:

**Before:**
```html
<p class="text-warning">Warning text</p>
<!-- Gets bold automatically from override -->
```

**After:**
```html
<p class="text-warning bold">Warning text</p>
<!-- Explicitly combine color and weight utilities -->
```

## **Definition of Done**

- [x] `.text-warning` utility added to `packages/cyan-css/src/atomics/text-color.css`.
- [x] Utility sets ONLY color, not font-weight.
- [x] Semantic token `--color-warning` added and mapped to chroma.
- [x] Semantic set for `.text-error`, `.text-success`, `.text-info` added.
- [ ] Colors meet WCAG contrast requirements (manual verification recommended).
- [x] Documentation updated in this PBI doc with examples.
- [ ] Light and dark theme visual examples can be added to docs site (optional follow-up).
