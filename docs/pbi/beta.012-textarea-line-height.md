# PBI: Fix Textarea Line Height

**User Story:**

As a developer using the Cyan Design System, I want `<textarea>` elements to use text line-height so that multi-line input has proper readability and spacing.

## **Description**

The current `textarea.css` uses `--cn-line-height-ui` (1.25), which is designed for single-line UI elements like buttons and inputs. For multi-line text areas, this creates cramped, hard-to-read content. The production override sets `line-height: var(--cn-line-height-text)` for better readability.

This PBI updates textarea styling to use appropriate line-height for multi-line text content.

## **Why This Override Was Needed**

Textareas are multi-line text input controls, and users need adequate line spacing to read and edit multiple lines of text comfortably. The UI line-height (1.25) is too tight for readability:

- **UI elements (buttons, inputs):** Need compact spacing (`--cn-line-height-ui: 1.25`)
- **Text content (textareas, paragraphs):** Need readable spacing (`--cn-line-height-text: ~1.5`)

The production override recognized this mismatch and applied text line-height to textareas:

```css
textarea {
  line-height: var(--cn-line-height-text);
}
```

The comment in the override mentions a "legacy bug" about separate line heights for text and UI, but the fix is still valid: textareas contain text content, not UI labels, so they should use text line-height.

## **Acceptance Criteria**

1. **CSS Fix:**
   - [ ] Update `packages/cyan-css/src/core/textarea.css`.
   - [ ] Change `line-height: var(--cn-line-height-ui)` to `line-height: var(--cn-line-height-text)`.
   - [ ] Remove any legacy `--cn-line-height-ui` custom property overrides on textarea.

2. **Readability:**
   - [ ] Multi-line text in textareas has comfortable line spacing.
   - [ ] Line height matches other text content (paragraphs, divs).
   - [ ] No visual regression in single-line textarea use.

3. **Token Usage:**
   - [ ] Use `--cn-line-height-text` token.
   - [ ] Do not override with custom `--cn-line-height-ui` values on textarea.

## **Technical Considerations**

- **Current State:** `textarea` uses `--cn-line-height-ui` (designed for buttons/inputs)
- **Problem:** Multi-line text needs more spacing for readability
- **Solution:** Use `--cn-line-height-text` instead
- **Impact:** Improves readability, aligns with text content standards

## **Current vs. Proposed Code**

**Current (textarea.css):**
```css
textarea {
  /* ... */
  line-height: var(--cn-line-height-ui);
  /* ... */
}
```

**Proposed:**
```css
textarea {
  /* ... */
  line-height: var(--cn-line-height-text);
  /* ... */
}
```

## **Example Impact**

Before: Cramped text in textarea
```
Line 1 (tight spacing)
Line 2 (hard to read)
Line 3 (feels cluttered)
```

After: Readable text in textarea
```
Line 1 (comfortable spacing)

Line 2 (easy to read)

Line 3 (clear and open)
```

## **Definition of Done**

- [ ] `textarea` line-height updated to `var(--cn-line-height-text)`.
- [ ] No custom property overrides for line-height on textarea.
- [ ] Multi-line text is readable and comfortable.
- [ ] No visual regressions in existing textareas.
- [ ] Documentation shows textarea examples.
