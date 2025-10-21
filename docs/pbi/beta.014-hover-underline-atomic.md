# PBI: Add `.hover-underline` Atomic Utility

**User Story:**

As a developer using the Cyan Design System, I want a `.hover-underline` utility class so that I can add text underlines on hover for links and interactive elements without writing custom CSS.

## **Description**

The production build needs a `.hover-underline` class to add underline decoration on hover. This is a common pattern for text links and interactive elements that should indicate interactivity visually without a default underline.

This is a simple atomic utility that applies `text-decoration: underline` only on hover state.

## **Why This Override Was Needed**

The production application has text elements (likely links or buttons) that should:
1. **Not** have underlines by default (to maintain clean design)
2. **Show** underlines on hover (to indicate interactivity)

This is a standard accessibility pattern - providing visual feedback on hover helps users understand which elements are interactive. The override was needed because the design system lacks this simple atomic utility:

```css
.hover-underline:hover {
  text-decoration: underline;
}
```

Common use cases:
- Links in navigation menus
- Text-based buttons
- Interactive table cells
- Card titles that are clickable

## **Acceptance Criteria**

1. **CSS Implementation:**
  - [x] Add `.hover-underline` as `packages/cyan-css/src/atomics/hover-underline.css` and import it from `packages/cyan-css/src/atomics/index.css`.
  - [x] Apply `text-decoration: underline` only on `:hover`/`:focus` state.
  - [x] No underline in default state.

2. **Interaction:**
   - [ ] Works on `<a>`, `<button>`, and `<span>` elements.
   - [ ] Respects `prefers-reduced-motion` (underline appears without transition).
   - [ ] Works with existing color and typography utilities.

3. **Related Utilities:**
   - [ ] Complements existing `.no-underline` utility.
   - [ ] Can be combined with other text utilities.

## **Technical Considerations**

- **File Location:** Implemented as `packages/cyan-css/src/atomics/hover-underline.css` and imported by the atomics index.
- **Simplicity:** This is a pure atomic utility - just one property on hover.
- **No Transition:** Avoid transition on underline appearance (respects reduced motion by default).

## **Implementation**

The atomic is implemented in `packages/cyan-css/src/atomics/hover-underline.css`.

Key rules:

```css
.hover-underline { text-decoration: none; display: inline; }
.hover-underline:hover, .hover-underline:focus { text-decoration: underline; }
```

## **Example Usage**

```html
<!-- Navigation link without default underline -->
<a href="/about" class="no-underline hover-underline">About Us</a>

<!-- Button styled as text -->
<button class="no-underline hover-underline" type="button">
  View details
</button>

<!-- Card title that's clickable -->
<a href="/article" class="no-underline hover-underline">
  <h3>Article Title</h3>
</a>

<!-- Table cell with hover underline -->
<td>
  <a href="/edit" class="hover-underline">Edit</a>
</td>
```

## **Pairing with `.no-underline`**

The design system already has `.no-underline` in `atomics/font-style.css`:

```css
.no-underline {
  text-decoration: none;
}
```

The new `.hover-underline` complements this by providing hover-only underlines:

```html
<!-- Common pattern: no default underline, underline on hover -->
<a href="#" class="no-underline hover-underline">Link</a>
```

## **Definition of Done**

- [x] `.hover-underline` added as `packages/cyan-css/src/atomics/hover-underline.css` and imported in the atomics index.
- [x] Underline appears only on hover/focus state.
- [x] Works with interactive elements (links, buttons, spans).
- [x] Documentation includes examples and pairing with `.no-underline`.
