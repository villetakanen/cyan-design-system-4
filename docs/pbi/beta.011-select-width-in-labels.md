# PBI: Fix Select Width Inside Labels

**User Story:**

As a developer using the Cyan Design System, I want `<select>` elements inside `<label>` tags to size naturally so that form controls display correctly without unnecessary width constraints.

## **Description**

The current `label.css` has conflicting rules for `<select>` elements:
- `label select` sets `width: auto` (allowing natural sizing)
- `label` itself sets `width: 100%` on the label container

However, production needs `label select` to have `min-width: auto` and `width: 100%` to properly fill flex containers and form layouts.

This PBI updates the select styling within labels to work correctly in both standalone and flex contexts.

## **Why This Override Was Needed**

The production application uses `<select>` elements inside `<label>` wrappers in flex layouts. The current design system rule sets `width: auto` on selects, which causes them to shrink to content width in flex containers rather than filling available space.

The production override adds:
```css
label select {
  min-width: auto;
  width: 100%;
}
```

This ensures selects:
1. Fill their container width by default (`width: 100%`)
2. Don't enforce a minimum width (`min-width: auto` overrides browser defaults)
3. Work correctly in flex layouts without shrinking

## **Acceptance Criteria**

1. **CSS Fix:**
   - [ ] Update `packages/cyan-css/src/core/label.css`.
   - [ ] Change `label select` from `width: auto` to `width: 100%`.
   - [ ] Add `min-width: auto` to override browser defaults.
   - [ ] Ensure rule doesn't conflict with `label:has(select)` sizing.

2. **Layout Behavior:**
   - [ ] Selects fill their label container by default.
   - [ ] Selects work correctly in flex layouts.
   - [ ] Selects work correctly in grid layouts.
   - [ ] Label sizing with `width: auto` is preserved for label container.

3. **Testing:**
   - [ ] Test select in standalone label.
   - [ ] Test select in flex container with label.
   - [ ] Test select in grid container with label.
   - [ ] Test with various select content lengths.

## **Technical Considerations**

- **Current State:** The design system has competing rules:
  - `label { width: 100%; }` - labels fill container
  - `label:has(select) { width: auto; }` - labels with selects size naturally
  - `label select { width: auto; }` - selects size to content (PROBLEM)

- **Desired State:**
  - Keep label container sizing rules as-is
  - Change select to fill its label container: `width: 100%; min-width: auto;`

- **Why This Matters:**
  - Flex containers: `width: auto` causes selects to shrink
  - Form consistency: Inputs and textareas fill width, selects should too
  - Browser defaults: Some browsers set min-width on selects

## **Current vs. Proposed Code**

**Current (label.css):**
```css
label select {
  width: auto;
}
```

**Proposed:**
```css
label select {
  min-width: auto;
  width: 100%;
}
```

## **Example Usage**

```html
<!-- Select in label should fill width -->
<label>
  Choose an option
  <select>
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</label>

<!-- Select in flex layout -->
<div class="flex">
  <label>
    Filter
    <select>...</select>
  </label>
  <label>
    Sort
    <select>...</select>
  </label>
</div>
```

## **Definition of Done**

- [ ] `label select` rule updated in `packages/cyan-css/src/core/label.css`.
- [ ] Selects fill width in standalone labels.
- [ ] Selects fill width in flex containers.
- [ ] No layout regressions in existing forms.
- [ ] Documentation shows select examples.
