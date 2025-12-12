# PBI: New Component - `cn-reply-dialog`

**User Story:**

As a user engaging in a conversation, I want a reply interface that adapts to my device—staying unobtrusive on desktop while becoming focused and keyboard-friendly on mobile—so that I can compose replies comfortably in any context.

## **Description**

Implement the generic `cn-reply-dialog` layout container component as specified in `docs/specs/cn-reply-dialog.md`. This component is responsible for hosting conversation reply forms and managing the presentation logic across varying viewports.

It must implement a "Docked" experience on Desktop (non-blocking) and a "Full & Focused" experience on Mobile (modal, blocking).

## **Acceptance Criteria**

### 1. Component Scaffolding & API
- [x] Create `cn-reply-dialog` as a LitElement component.
- [x] **Properties**:
    - `open` (boolean, reflect): Controls visibility.
    - `mobile` (boolean, internal/reflect): Reflects the current viewport mode.
- [x] **Slots**:
    - `(default)`: For form content.
    - `header`: Optional title/context.
    - `actions`: Submit/Cancel buttons.
- [x] **Events**:
    - Dispatches a `close` event when dismissed.

### 2. Desktop Layout (Docked)
- [x] **Position**: Fixed at the bottom of the viewport, horizontally centered.
- [x] **Dimensions**:
    - Width matches `column-l` (`calc(88 * var(--cn-grid))`).
    - Height defaults to approx 7 rows (`--cn-reply-dialog-height`).
- [x] **Interaction**: Non-blocking (modeless). Users can interact with the page behind the dialog.
- [x] **Animation**: Slide Up entrance (`transform: translateY(100%)` -> `0`).

### 3. Mobile Layout (Fullscreen)
- [x] **Trigger**: Automatically switches to mobile mode based on viewport width (media query or resize observer).
- [x] **Position**: Fullscreen overlay (`fixed`, `inset: 0`).
- [x] **Interaction**: Modal (blocking). Focus is trapped within the dialog.
- [x] **Backdrop**: Uses `backdrop-filter: blur(2px)` and `var(--background-dialog-backdrop)`.
- [x] **Animation**: Fade + Scale entrance.

### 4. Keyboard Handling (Mobile)
- [ ] Ensures form controls remain visible when the virtual keyboard opens.
- [ ] Uses `interactive-widget=resizes-content` or `visualViewport` API listeners to adjust layout.

### 5. Styling & Accessibility
- [x] **Surface**: `var(--color-surface-1)`.
- [x] **Elevation**: `var(--shadow-elevation-2)` for the docked state.
- [x] **Shape**: `var(--cn-border-radius-large)`.
- [x] **A11y**:
    - Mobile: Focus trap active, `Escape` key closes.
    - Desktop: No focus trap, allows tab-out.
    - Role: `dialog` (or compatible structure).

## **Technical Considerations**

- **DOM Structure**: Do unlikely use native `<dialog>` for the *non-blocking* desktop state if it forces modality. Consider a custom implementation or hybrid approach as suggested in the spec.
- **CSS Variables**:
    - `--cn-reply-dialog-height`
    - `--cn-reply-dialog-width`
    - `--cn-reply-dialog-z-index`
- **Dependencies**: Reactivity to screen size changes.

## **Definition of Done**
- [x] Component is implemented in the design system package.
- [x] Documentation and interactive examples added to the Docs App.
- [ ] Verified on Desktop (Chrome/Safari/Firefox).
- [ ] Verified on Mobile Simulator (iOS/Android) for keyboard behavior.
