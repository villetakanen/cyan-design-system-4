# Specification: generic Reply Dialog (`cn-reply-dialog`)

## 1. Overview
The `cn-reply-dialog` is a layout container component designed to host conversation reply forms. It manages the presentation of the reply interface across different viewports, implementing a "Docked" experience on Desktop and a "Full & Focused" experience on Mobile.

**Core Responsiblity:** Layout and State management of the container (Open/Close/Docked/Fullscreen). It does **NOT** handle the form submission logic; strictly orchestration of slotted content.

## 2. User Experience Requirements

### 2.1. Desktop (Docked Overlay)
*   **Position:** Fixed at the bottom of the viewport, centered horizontally (`left: 50%`, `transform: translateX(-50%)`).
*   **Interaction:** "Non-blocking" (Modeless). The user should be able to scroll the underlying conversation or interact with other page elements while the dialog is open.
*   **Dimensions:**
    *   Height: Approximately 7 text rows (defined via CSS variable for flexibility).
    *   Width: Matches `column-l` from the design system (`calc(88 * var(--cn-grid))`).
*   **Behavior:** Persists until explicitly closed or submitted.

### 2.2. Mobile (Fullscreen Focused)
*   **Position:** Full screen overlay (`fixed`, `inset: 0`).
*   **Interaction:** Modal (Blocking). Focus is trapped within the dialog context to prevent background distractions.
*   **Keyboard Handling:** CRITICAL. The layout must adapt to the virtual keyboard. The form controls must remain visible and not be covered by the OS keyboard.
    *   Use `interactive-widget=resizes-content` media query or `visualViewport` API listeners if necessary to ensure the content area shrinks, keeping the input + buttons above the keyboard.

## 3. Technical Specification

### 3.1. API Surface
**Tag:** `<cn-reply-dialog>`

**Properties:**
*   `open` (boolean, reflect): Controls visibility.
*   `mobile` (boolean, internal state): Reflects current viewport mode (controlled by resize observer or media query).

**Slots:**
*   `(default)`: The form content (textarea, inputs).
*   `header`: Optional title or context area (e.g., "Replying to...").
*   `actions`: The submit/cancel buttons (if not part of the form slot).

**Events:**
*   `close`: Fired when the dialog is dismissed (via close button or backdrop click in mobile). Aligns with the native `<dialog>` `close` event.

### 3.2. Architecture & Styling

*   **DOM Structure:**
    *   Likely NOT using the native `<dialog>` element for the Desktop "Non-blocking" state, as `<dialog open>` is persistent but `<dialog>.showModal()` is blocking. We might use `<dialog>` with `show()` (modeless) for desktop and `showModal()` for mobile, or a custom implementation using `position: fixed`.
    *   *Recommendation:* Use a custom `div` with `role="dialog"` (and `aria-modal="false"` desktop / `aria-modal="true"` mobile) for maximum layout control, explicitly managing focus trap on mobile.

*   **CSS Variables (Theming):**
    *   `--cn-reply-dialog-height`: Default `calc(40 * var(--cn-grid))` (approx 10 rows).
    *   `--cn-reply-dialog-width`: Default `calc(88 * var(--cn-grid))` (Matches `column-l`).
    *   `--cn-reply-dialog-z-index`: Default `1000`.

### 3.3. Accessibility (a11y)
*   **Mobile:** Must trap focus. `Escape` key closes.
*   **Desktop:** Must NOT trap focus (allow tab-out).
*   **Screen Readers:** Announce as a dialog.

## 4. Visual Design Strategy
Derived from the "Avionics" design system patterns observed in `dialog.css` and `buttons.css`.

### 4.1. Aesthetics
*   **Surface:** Use `var(--color-surface-1)` to match standard panel/dialog backgrounds.
*   **Elevation:** `var(--shadow-elevation-2)` is critical for the "Docked" state to separate it from the underlying content.
*   **Shape:** Adhere to `var(--cn-border-radius-large)` for the container corners.
    *   *Note:* Ensure the internal `textarea` borders align with or nest correctly within this radius. Textarea generic styles (`0 var(--border-radius-medium) 0 0`) may need an override (`border-radius: var(--cn-border-radius-medium)`) to look balanced in a floating dock.
*   **Controls:**
    *   **Submit:** Primary Gradient Button (`.cta` or standard).
    *   **Cancel:** Text or Secondary Button to reduce visual noise.

### 4.2. Motion & Transitions
*   **Entrance (Desktop):** Slide Up `transform: translateY(100%)` -> `0`. Ease-out (`cubic-bezier(0.2, 0.8, 0.2, 1)`).
*   **Entrance (Mobile):** Fade + Scale (`opacity: 0; scale: 0.95` -> `1`).
*   **Exit:** Inverse of entrance. Fast (approx 150-200ms).

### 4.3. Thematic Consistency
*   Ensure the component uses `var(--cn-grid)` for all padding/margins to maintain vertical rhythm.
*   Backdrop (Mobile only): `backdrop-filter: blur(2px)` with `var(--background-dialog-backdrop)` to focus attention.

## 5. Implementation Strategy (Phase 1)
1.  **Scaffold:** Create generic component structure.
2.  **Desktop Layout:** Implement fixed bottom positioning and valid z-indexing.
3.  **Mobile Layout:** Implement media-query based full-screen switch.
4.  **Keyboard Logic:** Test virtual keyboard behavior. Ensure `bottom` constraints respect the visual viewport.

## 6. Mobile Keyboard constraints
*   When keyboard opens on mobile, the viewport height shrinks.
*   The generic container must use `dvh` (Dynamic Viewport Height) or listen to `visualViewport.height` to ensure the "bottom" is actually the top of the keyboard, not the bottom of the screen (under the keyboard).

## 7. Open Questions / Assumptions
*   *Assumption:* The slotted form handles its own "Submit" events and closes the dialog via prop update from the parent.
*   *Question:* Should the desktop version be expandable? (Start at 7 rows, expand to fit content?) -> *Decision:* V1 is fixed/scrollable internally.

---
*Signed: @Architect*
