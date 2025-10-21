# PBI: Add Flexbox Justify-Content Atomic Utilities

**User Story:**

As a developer using the Cyan Design System, I want atomic utilities for `justify-content` so that I can control flex item alignment without writing custom CSS or relying on composite classes.

## **Description**

The production build requires `.items-end` and `.items-start` classes to control flexbox justification. The design system has `.flex.items-center` and `.flex.items-start` in `atomics/flex.css`, but these are composite classes that set both `align-items` and `justify-content`.

Production needs standalone atomic utilities for `justify-content` that work independently and can be combined with other flex utilities. The override also includes specific rules for toolbar variants and `.cn-chip` elements.

## **Why This Override Was Needed**

The production application needed to:
1. **Right-align toolbar items** without centering them vertically (`.items-end` for `justify-content: flex-end`)
2. **Left-align flex items** with controlled growth (`.items-start` for `justify-content: flex-start`)
3. **Prevent chips from growing** in flex containers (`.flex > .cn-chip { flex: none; }`)

The current design system conflates two concepts:
- **Alignment (cross-axis):** `align-items` - vertical in row layouts
- **Justification (main-axis):** `justify-content` - horizontal in row layouts

The production override separated these concerns:

```css
/* Modern way of saying justify-right */
.items-end,
.toolbar.items-end {
  justify-content: flex-end;
}

.flex.items-start {
  justify-content: flex-start;
}

.flex.items-start > * {
  align-self: flex-start;
  flex-grow: 0;
}
```

## **Acceptance Criteria**

1. **CSS Implementation:**
   - [ ] Add atomic utilities to `packages/cyan-css/src/atomics/flex.css`.
   - [ ] `.justify-start` sets `justify-content: flex-start`.
   - [ ] `.justify-end` sets `justify-content: flex-end`.
   - [ ] `.justify-center` sets `justify-content: center`.
   - [ ] `.justify-between` sets `justify-content: space-between`.

2. **Naming Convention:**
   - [ ] Use `.justify-*` prefix to clearly indicate main-axis alignment.
   - [ ] Keep existing `.items-center` for the composite align+justify pattern.
   - [ ] Update `.items-start` to use `.justify-start` or clarify its purpose.

3. **Component-Specific Rules:**
   - [ ] Add `.flex > .cn-chip { flex: none; }` to prevent chip stretching.
   - [ ] Consider if this should be in chip styles or flex atomics.

4. **Documentation:**
   - [ ] Clarify difference between `align-items` (cross-axis) and `justify-content` (main-axis).
   - [ ] Show examples of justify utilities.
   - [ ] Document when to use composite classes vs. atomic utilities.

## **Technical Considerations**

- **Current Confusion:** `.items-start` and `.items-center` set both `align-items` and `justify-content`, mixing concerns.
- **Atomic Approach:** Separate utilities for each property:
  - `align-items`: `.align-start`, `.align-center`, `.align-end`
  - `justify-content`: `.justify-start`, `.justify-center`, `.justify-end`, `.justify-between`
- **Backward Compatibility:** Keep existing `.items-center` as composite utility for common case.
- **Toolbar Variants:** The override includes `.toolbar.items-end` - evaluate if toolbar should have its own justify utilities.

## **Proposed Atomic Utilities**

```css
/* Justify content (main-axis alignment) */
.justify-start {
  justify-content: flex-start;
}

.justify-center {
  justify-content: center;
}

.justify-end {
  justify-content: flex-end;
}

.justify-between {
  justify-content: space-between;
}

/* Align items (cross-axis alignment) */
.align-start {
  align-items: flex-start;
}

.align-center {
  align-items: center;
}

.align-end {
  align-items: flex-end;
}
```

## **Example Usage**

```html
<!-- Right-aligned toolbar -->
<div class="toolbar justify-end">
  <button>Action</button>
</div>

<!-- Left-aligned flex items -->
<div class="flex justify-start">
  <span>Label</span>
  <span>Value</span>
</div>

<!-- Centered both ways (using composite utility) -->
<div class="flex items-center">
  <cn-icon noun="check"></cn-icon>
</div>

<!-- Custom alignment (using atomic utilities) -->
<div class="flex justify-between align-start">
  <div>Left</div>
  <div>Right</div>
</div>
```

## **Migration Notes**

- **`.items-center`:** Keep as-is (composite utility for common centering pattern)
- **`.items-start`:** Evaluate if this should become `.justify-start` or add clarifying comment
- **`.items-end`:** Not in current system - add as `.justify-end`

## **Definition of Done**

- [ ] Atomic justify-content utilities added to `atomics/flex.css`.
- [ ] Atomic align-items utilities added for completeness.
- [ ] `.flex > .cn-chip { flex: none; }` rule added (or moved to chip styles).
- [ ] Documentation clarifies main-axis vs. cross-axis alignment.
- [ ] Examples show atomic vs. composite utility usage.
- [ ] No breaking changes to existing `.items-center` behavior.
