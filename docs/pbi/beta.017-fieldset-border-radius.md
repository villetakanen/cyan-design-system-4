# PBI: Add Border Radius and Border Styling to Fieldset

**User Story:**

As a developer using the Cyan Design System, I want `<fieldset>` elements to have consistent border-radius and border styling so that form groupings match the visual design of other components.

## **Description**

The production build adds border-radius and border styling to `<fieldset>` elements to match the design system's rounded aesthetic. Currently, fieldsets receive browser default styling (square corners, generic border).

This PBI adds proper fieldset styling to match design system tokens for borders and border-radius.

## **Why This Override Was Needed**

The production application uses `<fieldset>` elements to group related form controls. Browser default fieldset styling includes:
- Square corners (no border-radius)
- 2px groove border (outdated visual style)
- Inconsistent appearance across browsers

The production override applied design system styling:

```css
fieldset {
  border-radius: var(--cn-border-radius-medium);
  border: 1px solid var(--color-border);
}
```

This ensures:
1. **Consistent border-radius** matching other components (cards, inputs, buttons)
2. **Modern border styling** using design system border color
3. **Theme integration** with `--color-border` token supporting light/dark modes

## **Acceptance Criteria**

1. **CSS Implementation:**
   - [ ] Create `packages/cyan-css/src/core/fieldset.css`.
   - [ ] Add `border-radius: var(--cn-border-radius-medium)` to fieldset.
   - [ ] Add `border: 1px solid var(--color-border)` to fieldset.
   - [ ] Reset browser default border styling.

2. **Design Tokens:**
   - [ ] Use `--cn-border-radius-medium` for rounded corners.
   - [ ] Use `--color-border` for border color.
   - [ ] Support light and dark themes.

3. **Additional Styling:**
   - [ ] Consider padding adjustments for fieldset content.
   - [ ] Style `<legend>` element appropriately.
   - [ ] Ensure nested inputs/labels align correctly.

4. **Documentation:**
   - [ ] Add fieldset examples to form documentation.
   - [ ] Show fieldset with legend and form controls.
   - [ ] Demonstrate light and dark theme support.

## **Technical Considerations**

- **Browser Defaults:** Reset browser fieldset styling (groove border, unusual padding).
- **Legend Styling:** The `<legend>` element inside fieldset may need additional styling for proper appearance.
- **Padding:** Fieldsets typically need internal padding for content spacing.
- **Existing Usage:** Check if any existing components rely on default fieldset styling.

## **Proposed Implementation**

```css
fieldset {
  border: 1px solid var(--color-border);
  border-radius: var(--cn-border-radius-medium);
  padding: var(--cn-grid);
  margin: 0;
  margin-bottom: var(--cn-grid);
}

legend {
  padding: 0 calc(var(--cn-grid) * 0.5);
  font-weight: var(--cn-font-weight-heading, bold);
  font-size: var(--cn-font-size-caption);
  color: var(--color-on-label);
}
```

## **Example Usage**

```html
<!-- Basic fieldset -->
<fieldset>
  <legend>Contact Information</legend>
  <label>
    Email
    <input type="email" name="email">
  </label>
  <label>
    Phone
    <input type="tel" name="phone">
  </label>
</fieldset>

<!-- Fieldset with radio group -->
<fieldset>
  <legend>Subscription Type</legend>
  <label>
    <input type="radio" name="subscription" value="free">
    Free
  </label>
  <label>
    <input type="radio" name="subscription" value="premium">
    Premium
  </label>
</fieldset>

<!-- Nested in form -->
<form>
  <fieldset>
    <legend>Billing Address</legend>
    <label>Street<input type="text"></label>
    <label>City<input type="text"></label>
    <label>ZIP<input type="text"></label>
  </fieldset>
  <button type="submit">Submit</button>
</form>
```

## **Integration with Existing Styles**

The design system has this fieldset reference in `utilities/toolbar.css`:

```css
fieldset > .toolbar {
  /* toolbar styles inside fieldset */
}
```

The new fieldset styling should work seamlessly with existing toolbar integration.

## **Browser Reset Needed**

Browsers have varying default fieldset styles:

```css
/* Browser defaults to override */
fieldset {
  min-inline-size: auto; /* Override Chrome's min-width: min-content */
  border: /* override 2px groove or similar */
  padding: /* override default padding */
}
```

## **Definition of Done**

- [ ] `packages/cyan-css/src/core/fieldset.css` created.
- [ ] Fieldset has border-radius using `--cn-border-radius-medium`.
- [ ] Fieldset has border using `--color-border`.
- [ ] Browser default styles reset appropriately.
- [ ] Legend element styled for consistency.
- [ ] Padding and spacing work with nested form controls.
- [ ] Form documentation page updated with fieldset examples.
- [ ] Light and dark theme support verified.
