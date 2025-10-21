# PBI: Add `.sr-only` Screen Reader Utility Class

**User Story:**

As a developer using the Cyan Design System, I want a standardized `.sr-only` utility class so that I can provide accessible content to screen readers without displaying it visually, following web accessibility best practices.

## **Description**

The production build includes a `.sr-only` class for hiding content visually while keeping it accessible to screen readers. The design system has `.screen-reader-only` in `atomics/hidden.css`, but production code uses the more common `.sr-only` naming convention.

This PBI adds `.sr-only` as an alias to the existing screen reader class to match industry-standard naming conventions (used by Bootstrap, Tailwind, and most accessibility guides).

## **Why This Override Was Needed**

The production application needed to hide content visually while keeping it accessible to assistive technologies. This is a critical accessibility pattern used for:
- Skip navigation links
- Form labels that are visually redundant
- Additional context for icon-only buttons
- Status messages for screen readers

The design system has `.screen-reader-only`, but developers expect the shorter, more common `.sr-only` class name, which is the de facto standard in the web development community. Rather than forcing developers to remember a non-standard class name, the production override implemented the expected naming.

## **Acceptance Criteria**

1. **CSS Implementation:**
   - [ ] Add `.sr-only` class to `packages/cyan-css/src/atomics/hidden.css`.
   - [ ] Apply identical styling to existing `.screen-reader-only` class.
   - [ ] Use modern clip-path approach (not just legacy clip).
   - [ ] Handle `:focus` and `:active` states to show content when keyboard-focused.

2. **Accessibility Requirements:**
   - [ ] Content is completely hidden from visual display.
   - [ ] Content remains in the accessibility tree for screen readers.
   - [ ] Focused elements become visible for keyboard navigation.
   - [ ] Meets WCAG 2.1 guidelines for accessible hidden content.

3. **Documentation:**
   - [ ] Document `.sr-only` in accessibility utilities page.
   - [ ] Include use cases (skip links, icon labels, status messages).
   - [ ] Show examples with form labels and icon buttons.
   - [ ] Explain when to use vs. `aria-label`.

## **Technical Considerations**

- **Modern Approach:** Use both `clip` and `clip-path` for broad browser support.
- **Focus Handling:** The `.sr-only:not(:focus):not(:active)` selector ensures focused elements become visible.
- **Positioning:** Absolute positioning removes from layout without affecting page flow.
- **Dimensions:** 1px size ensures compatibility with older screen readers while being visually hidden.

## **Implementation Details**

The class should use this proven pattern:

```css
.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

## **Example Usage**

```html
<!-- Skip navigation link -->
<a href="#main" class="sr-only">Skip to main content</a>

<!-- Icon button with accessible label -->
<button>
  <cn-icon noun="delete"></cn-icon>
  <span class="sr-only">Delete item</span>
</button>

<!-- Form label that's visually redundant -->
<label>
  <span class="sr-only">Email address</span>
  <input type="email" placeholder="Email address">
</label>

<!-- Status message for screen readers -->
<div aria-live="polite" class="sr-only">
  Item added to cart
</div>
```

## **Definition of Done**

- [ ] `.sr-only` class added to `packages/cyan-css/src/atomics/hidden.css`.
- [ ] Focus and active states properly handled.
- [ ] Documentation page updated with accessibility examples.
- [ ] Examples show common use cases (skip links, icon labels).
- [ ] Code follows WCAG 2.1 best practices.
