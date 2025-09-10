# `cn-navigation-icon` has to react to attribute changes

**Component**: `@11thdeg/cyan-lit/cn-navigation-icon`  
**Status**: ✅ **RESOLVED**

## Problem Statement

The `cn-navigation-icon` web component does not update its visual representation when its attributes, specifically the `label` attribute, are changed programmatically after the component has been initially rendered.

This is problematic in reactive frameworks like Svelte, where attributes are frequently bound to data stores that are populated asynchronously.

## Steps to Reproduce

1. Render a `<cn-navigation-icon>` in a Svelte component.
2. Bind its `label` attribute to a store that is initially `null` or `undefined`.
   ```svelte
   <script>
     import { someStore } from '@stores/someStore';
   </script>

   <cn-navigation-icon label={$someStore.value}></cn-navigation-icon>
   ```
3. After the component has rendered, update the value in `someStore`.

## Actual Behavior

The `label` attribute on the `<cn-navigation-icon>` DOM element updates correctly, but the component's visible text does not change from its initial (empty) state.

## Expected Behavior

The component should observe changes to its `label` attribute and update its internal state and DOM to reflect the new attribute value. Lit-based components typically handle this reactivity automatically, which may indicate an issue in how the `label` property is declared or observed within the component's implementation.

## Root Cause Analysis

The issue was in the `render()` method of the `cn-navigation-icon` component. The original code used inconsistent conditions:

**Original (buggy) code:**
```typescript
const hasLabel = this.label !== '';
// ...
return html`<cn-icon noun="${this.noun}" ?small=${hasLabel}></cn-icon>
${
  this.label  // <- Different condition here!
    ? html`<div class="navigation-icon-label">${this.label}</div>`
    : ''
}`;
```

**Problem:** When `this.label` was `null` or `undefined`:
- `hasLabel` would be `true` (since `null !== ''` and `undefined !== ''`)
- But `this.label` in the template would be falsy, so no label element would render
- This created inconsistent state where the icon would have `?small=${true}` but no actual label element

## Solution Implemented

**Fixed code:**
```typescript
const hasLabel = this.label && this.label.trim() !== '';
const hasNotification = this.notification && this.notification.trim() !== '';

return html`<cn-icon noun="${this.noun}" ?small=${!!hasLabel}></cn-icon>
${
  hasLabel  // <- Now uses the same condition
    ? html`<div class="navigation-icon-label">${this.label}</div>`
    : ''
}
${
  hasNotification
    ? html`<div class="notification-pill">${this.notification}</div>`
    : ''
}`;
```

**Key Changes:**
1. `hasLabel` now properly checks for truthy values and trims whitespace
2. Template uses the same `hasLabel` condition consistently
3. Added `!!` coercion for the `?small` attribute to ensure boolean value
4. Applied the same fix pattern to `hasNotification` for consistency

## Test Coverage

### Unit Tests (`cn-navigation-icon.test.ts`)
Added comprehensive tests covering:
- Label attribute changes from empty to filled
- Null/undefined value handling (Svelte scenario)
- Whitespace-only label handling
- Dynamic label updates and removals

### Browser Tests (`cn-navigation-icon.browser.test.ts`) 
Added visual behavior tests covering:
- Visual state updates when label changes
- CSS attribute selectors working correctly
- setAttribute vs property assignment
- Icon `small` attribute reactivity

### Documentation Demo
Created interactive demo at `/custom-elements/cn-navigation-icon` showing:
- Live testing of all edge cases
- Visual demonstration of the bug fix
- Educational content about the root cause

## Workaround (No Longer Needed)

~~A temporary workaround in the consuming Svelte application is to force the component to re-mount by wrapping it in a conditional block, ensuring the data is present before the initial render.~~

```svelte
{#if $someStore.value}
  <cn-navigation-icon label={$someStore.value}></cn-navigation-icon>
{/if}
```

**This workaround is no longer necessary** after the fix has been applied.

## Verification

✅ All existing tests pass  
✅ New test cases cover the bug scenario  
✅ Interactive demo confirms fix works  
✅ Component properly reacts to attribute changes  
✅ Compatible with reactive frameworks like Svelte
