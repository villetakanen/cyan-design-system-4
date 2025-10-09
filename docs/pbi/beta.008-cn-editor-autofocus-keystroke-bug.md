# PBI: cn-editor Intermittent Keystroke Capture Failure

**User Story:**

As a developer using cn-editor in forms and content editors, I want the component to reliably capture keyboard input immediately after initialization and focus, so that users can start typing without clicking the editor first.

---

## Description

The `<cn-editor>` component intermittently fails to capture keyboard input after initialization. The editor appears visually focused (cursor visible, contentDOM has focus styling) but keystrokes are not processed by CodeMirror. However, paste operations (Ctrl+V) work correctly, indicating the issue is specific to keyboard event handling rather than general input processing.

### Symptoms

✅ **Works:**
- Pasting content via Ctrl+V or context menu
- Mouse selection and dragging
- Toolbar button interactions
- Programmatic value setting

❌ **Fails:**
- Typing with keyboard
- Keyboard shortcuts (Ctrl+B, etc.)
- Arrow key navigation
- Enter/Tab key input

🎯 **Visual State:**
- Cursor is visible and blinking
- Editor appears to have focus
- `document.activeElement` points to `contentDOM`
- No console errors

🔄 **Frequency:**
- Intermittent (timing-dependent)
- More likely on page load with autofocus
- More likely after fast navigation
- Browser-independent (affects Chrome, Firefox, Safari)

### Impact

**Severity:** High - Core editing functionality affected

**Affected Scenarios:**
- Pages with `<cn-editor autofocus>` attribute
- Programmatic focus immediately after component creation
- Navigation to pages containing cn-editor
- Multiple editors on the same page
- Rapid tab navigation between form fields

**Affected Applications:**
- Page content editors
- Thread/comment creation forms
- Character description editors
- Any form using cn-editor for markdown input

### Evidence

E2E tests cannot use standard Playwright interaction methods and require this workaround:

```typescript
// From e2e/create-thread.spec.ts
// Set cn-editor content using evaluate with MANUAL event triggering
await page.evaluate((content) => {
  const editor = document.querySelector('cn-editor') as HTMLElement & {
    value?: string;
    dispatchEvent?: (event: Event) => void;
  };
  if (editor && 'value' in editor) {
    editor.value = content;
    // ⚠️ WORKAROUND: Manually trigger events because natural input doesn't work
    editor.dispatchEvent(new Event('input', { bubbles: true }));
    editor.dispatchEvent(new Event('change', { bubbles: true }));
    editor.dispatchEvent(new Event('blur', { bubbles: true }));
  }
}, 'Test content');
```

The fact that natural Playwright `.fill()` or `.type()` methods cannot be used proves the keyboard event handling is broken.

---

## Root Cause Analysis

### Architecture Context

```
<cn-editor>                           // Lit Web Component (host, tabindex="0")
  #shadow-root
    <div #editor-container>           // Container div
      <div class="cm-editor">         // CodeMirror 6 root
        <div contenteditable="true">  // EditorView.contentDOM (receives input)
```

**Focus Flow:**
1. User action → `<cn-editor>` host receives focus event
2. `_handleHostFocus()` intercepts and delegates to CodeMirror
3. Calls `_editorView.focus()` → focuses `contentDOM`
4. CodeMirror keymap extensions process keystrokes

### Primary Root Cause: Autofocus Race Condition

**Timeline of Failure:**

```
0ms   - Component added to DOM (connectedCallback)
1ms   - Browser sees autofocus, fires 'focus' event
2ms   - _handleHostFocus called
3ms   - _editorView is undefined, focus delegation skipped
4ms   - Focus remains on host element
...
50ms  - firstUpdated() runs
51ms  - _editorView created
52ms  - Editor is ready, but focus is on wrong element
```

**The Problem:**

```typescript
// In cn-editor.ts
constructor() {
  super();
  this._internals = this.attachInternals();
  // ⚠️ Focus listener added early
  this.addEventListener('focus', this._handleHostFocus.bind(this));
}

connectedCallback(): void {
  super.connectedCallback();
  if (this.getAttribute('tabindex') === null) {
    this.setAttribute('tabindex', '0');
  }
  // At this point, if autofocus is set, browser fires focus event
  // But _editorView doesn't exist yet!
}

firstUpdated() {
  if (this._editorContainer) {
    // ... setup code ...
    
    // ⚠️ EditorView created HERE, AFTER focus may have already fired
    this._editorView = new EditorView({
      state,
      parent: this._editorContainer,
    });
  }
}

protected _handleHostFocus(_event: FocusEvent) {
  if (this._isDelegatingFocus) {
    return;
  }

  // ⚠️ This check passes (undefined is falsy)
  // ⚠️ But _editorView is undefined! Focus delegation silently fails
  if (
    this._editorView &&
    document.activeElement !== this._editorView.contentDOM
  ) {
    this._isDelegatingFocus = true;
    this._editorView.focus();

    requestAnimationFrame(() => {
      this._isDelegatingFocus = false;
    });
  }
  // Focus event completes, but nothing happened
  // Host element is focused, but contentDOM never received focus
}
```

**Result:**
- Host element (`<cn-editor>`) has focus
- CodeMirror's `contentDOM` does NOT have focus
- Keystrokes are captured by host element, but not passed to CodeMirror
- CodeMirror's keymap extensions never receive keyboard events
- Paste works because it uses `navigator.clipboard` API, not keyboard events

### Secondary Issues

#### 1. No Readiness Check

```typescript
if (this._editorView && ...) {
  this._editorView.focus();
}
```

Checks existence but not readiness:
- `contentDOM` might not be created yet
- `contentDOM` might not be connected to document
- Keymap extensions might not be initialized

#### 2. Event Listener Memory Leak

```typescript
firstUpdated() {
  // Creates NEW bound function
  this._editorContainer.addEventListener('focusout', this._handleFocusOut.bind(this));
}

disconnectedCallback() {
  // Creates DIFFERENT bound function - listener never removed!
  this._editorContainer.removeEventListener('focusout', this._handleFocusOut.bind(this));
}
```

#### 3. Race Condition in Focus Guard

```typescript
this._isDelegatingFocus = true;
this._editorView.focus();

requestAnimationFrame(() => {
  this._isDelegatingFocus = false; // Async reset
});
```

If second focus event arrives before `requestAnimationFrame` callback:
- `_isDelegatingFocus` is still `true`
- Second focus attempt is blocked
- Focus can be lost

---

## Proposed Solution

### Fix 1: Guard Against Unready EditorView (Critical)

```typescript
protected _handleHostFocus(_event: FocusEvent) {
  if (this._isDelegatingFocus) {
    return;
  }

  // ✅ Comprehensive readiness check
  if (!this._editorView || 
      !this._editorView.contentDOM || 
      !this._editorView.contentDOM.isConnected) {
    console.warn('[CN-EDITOR] EditorView not ready for focus, deferring...');
    
    // Retry after initialization completes
    requestAnimationFrame(() => {
      if (this._editorView?.contentDOM?.isConnected) {
        this._editorView.focus();
      }
    });
    return;
  }

  if (document.activeElement !== this._editorView.contentDOM) {
    this._isDelegatingFocus = true;
    this._editorView.focus();

    requestAnimationFrame(() => {
      this._isDelegatingFocus = false;
    });
  }
}
```

### Fix 2: Handle Autofocus After Initialization

```typescript
firstUpdated() {
  if (this._editorContainer) {
    // ... existing setup ...

    this._editorView = new EditorView({
      state,
      parent: this._editorContainer,
    });

    // ✅ If component should be focused, ensure it happens AFTER initialization
    if (this.hasAttribute('autofocus') || document.activeElement === this) {
      requestAnimationFrame(() => {
        if (this._editorView?.contentDOM?.isConnected) {
          this._editorView.focus();
        }
      });
    }
  }
}
```

### Fix 3: Fix Event Listener Leak

```typescript
private _boundHandleFocusOut?: (event: FocusEvent) => void;

firstUpdated() {
  if (this._editorContainer) {
    // ✅ Store bound reference
    this._boundHandleFocusOut = this._handleFocusOut.bind(this);
    this._editorContainer.addEventListener('focusout', this._boundHandleFocusOut);
    
    // ... rest of setup
  }
}

disconnectedCallback() {
  super.disconnectedCallback();
  this.removeEventListener('focus', this._handleHostFocus);
  this._editorView?.destroy();
  
  // ✅ Remove correct listener
  if (this._editorContainer && this._boundHandleFocusOut) {
    this._editorContainer.removeEventListener('focusout', this._boundHandleFocusOut);
  }
}
```

### Fix 4: Add Diagnostic Method (Developer Experience)

```typescript
/**
 * Diagnostic method for debugging focus issues
 * Can be called from browser console:
 * document.querySelector('cn-editor').checkEditorHealth()
 */
public checkEditorHealth() {
  const health = {
    hasEditorView: !!this._editorView,
    hasContentDOM: !!this._editorView?.contentDOM,
    contentDOMConnected: this._editorView?.contentDOM?.isConnected || false,
    contentDOMHasFocus: document.activeElement === this._editorView?.contentDOM,
    hostHasFocus: document.activeElement === this,
    isDelegatingFocus: this._isDelegatingFocus,
    value: this.value.substring(0, 50),
  };

  console.table(health);

  // Auto-fix if possible
  if (health.hasEditorView && !health.contentDOMHasFocus) {
    console.warn('⚠️  ContentDOM does not have focus, attempting to fix...');
    this._editorView?.focus();
    setTimeout(() => {
      if (document.activeElement === this._editorView?.contentDOM) {
        console.log('✅ Focus restored successfully');
      } else {
        console.error('❌ Focus restoration failed');
      }
    }, 100);
  }

  return health;
}
```

---

## Acceptance Criteria

### Core Functionality

- [ ] `<cn-editor autofocus>` reliably captures keystrokes on page load
- [ ] Programmatic `editor.focus()` works immediately after component creation
- [ ] Focus after navigation from another page works correctly
- [ ] Multiple editors on same page work with tab navigation
- [ ] Rapid focus changes (tab key spam) handled correctly
- [ ] No console warnings about focus delegation in normal operation

### Browser Compatibility

- [ ] Works in Chrome/Chromium
- [ ] Works in Firefox
- [ ] Works in Safari

### Testing

- [ ] E2E tests can use natural Playwright `.fill()` and `.type()` methods
- [ ] E2E tests no longer need manual event dispatch workarounds
- [ ] Unit tests cover autofocus initialization timing
- [ ] Browser tests verify focus delegation under various conditions
- [ ] `checkEditorHealth()` diagnostic method reports healthy state

### Code Quality

- [ ] Event listener memory leaks fixed
- [ ] No race conditions in focus guard mechanism
- [ ] Comprehensive readiness checks before focus delegation
- [ ] Proper error handling and diagnostic logging

---

## Testing Strategy

### Manual Testing Checklist

Create `test-autofocus-bug.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script type="module">
    import '@11thdeg/cn-editor';
  </script>
</head>
<body>
  <h1>Test: Autofocus Keystroke Bug</h1>
  
  <cn-editor autofocus placeholder="Try typing immediately when page loads..."></cn-editor>
  
  <p><strong>Test Steps:</strong></p>
  <ol>
    <li>Refresh page</li>
    <li>Immediately try typing (within 100-200ms of load)</li>
    <li>Verify text appears without clicking</li>
    <li>Open console and run: <code>document.querySelector('cn-editor').checkEditorHealth()</code></li>
    <li>Verify all health checks pass</li>
  </ol>
</body>
</html>
```

### Automated Testing

**Unit Tests** (`cn-editor.test.ts`):
- Test focus delegation when EditorView is not ready
- Test autofocus attribute handling
- Test event listener cleanup
- Test focus guard race condition handling

**Browser Tests** (`cn-editor.browser.test.ts`):
- Test actual keyboard input capture after autofocus
- Test contentDOM receives focus correctly
- Test multiple rapid focus changes
- Test navigation scenarios

**Integration Tests** (`cn-editor.integration.test.ts`):
- Test Playwright `.fill()` method works
- Test standard form interaction patterns
- Test multiple editors on one page

---

## Workaround for Consumers (Until Fixed)

Consumers can work around the issue:

```typescript
// Wait for initialization before focusing
import { onMount } from 'svelte';

let editorRef: HTMLElement;

onMount(() => {
  // Wait two animation frames to ensure CodeMirror is ready
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      editorRef?.focus();
    });
  });
});
```

Or in E2E tests, continue using the manual event dispatch pattern.

---

## Priority Justification

**High Priority because:**

1. Affects core editing functionality across all consuming applications
2. Intermittent nature makes it hard for users to understand what's wrong
3. Users see a "focused" editor but cannot type - extremely frustrating UX
4. No error messages or visual feedback that something is wrong
5. Workarounds in every consuming application are complex and brittle
6. E2E tests cannot use standard testing patterns

---

## Related Files

- `packages/cn-editor/src/cn-editor.ts` - Main component implementation
- `packages/cn-editor/src/cnEditorConfig.ts` - State creation
- `packages/cn-editor/FORM-INTEGRATION-FIX.md` - Previous form integration work
- `packages/cn-editor/src/cn-editor.test.ts` - Unit tests
- `packages/cn-editor/src/cn-editor.integration.test.ts` - Integration tests

---

## Dependencies

- No new package dependencies required
- Fix is internal to cn-editor component
- May require testing infrastructure updates for new test cases

---

## Definition of Done

- [ ] All four proposed fixes implemented and tested
- [ ] All acceptance criteria met
- [ ] Unit tests pass with new test coverage
- [ ] Browser tests pass with keyboard input verification
- [ ] Integration tests updated to use standard Playwright methods
- [ ] Manual testing checklist completed on Chrome, Firefox, Safari
- [ ] `checkEditorHealth()` diagnostic method available
- [ ] Documentation updated with focus behavior details
- [ ] Code reviewed and follows project conventions
- [ ] No memory leaks detected
- [ ] pelilauta-17 project updated to remove workarounds
- [ ] E2E tests in consuming applications can be simplified

---

**Contact:** pelilauta-17 development team  
**Reported:** October 9, 2025  
**Status:** Ready for implementation  
**Estimated Fix Time:** 1-2 days development + testing
