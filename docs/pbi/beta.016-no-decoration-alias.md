# PBI: Add `.no-decoration` Alias for Text Decoration

**User Story:**

As a developer using the Cyan Design System, I want a `.no-decoration` utility class as an intuitive alias so that the naming is consistent with common CSS conventions and other frameworks.

## **Description**

The production build uses `.no-decoration` to remove text decoration. The design system has `.no-underline` in `atomics/font-style.css`, which does the same thing but with different naming.

While `.no-underline` is semantically accurate (it removes underlines), `.no-decoration` is a more complete name that:
1. Matches the CSS property name (`text-decoration`)
2. Removes all decorations, not just underlines (also strikethrough, overline)
3. Is more familiar to developers coming from other frameworks

This PBI adds `.no-decoration` as an alias to match developer expectations.

## **Why This Override Was Needed**

The production developers expected `.no-decoration` based on:
- **CSS property name:** `text-decoration: none` maps to `.no-decoration`
- **Mental model:** Removing all text decoration, not just underlines
- **Framework familiarity:** Some frameworks use `.no-decoration` or similar

The design system's `.no-underline` is accurate but narrower in naming. Developers may not realize it removes all decorations, not just underlines. The production override provided the expected class name:

```css
.no-decoration {
  text-decoration: none;
}
```

## **Acceptance Criteria**

1. **CSS Implementation:**
   - [ ] Add `.no-decoration` to `packages/cyan-css/src/atomics/font-style.css`.
   - [ ] Apply identical styles as `.no-underline`.
   - [ ] Keep `.no-underline` for backward compatibility.

2. **Consistency:**
   - [ ] Both `.no-decoration` and `.no-underline` set `text-decoration: none`.
   - [ ] Document both classes with note that they are equivalent.

3. **Documentation:**
   - [ ] List both utilities in documentation.
   - [ ] Explain that `.no-decoration` is a more complete/modern alias.
   - [ ] Show examples using both names.

## **Technical Considerations**

- **Backward Compatibility:** Keep `.no-underline` as it may be in use.
- **Semantic Accuracy:** 
  - `.no-underline` = specific to underlines (but also removes all decoration)
  - `.no-decoration` = clear that it removes all text decoration
- **CSS Coverage:** Both classes remove underline, overline, strikethrough, etc.

## **Implementation**

```css
/* Remove all text decoration (underline, overline, strikethrough) */
.no-decoration,
.no-underline {
  text-decoration: none;
}
```

Or as separate declarations for clarity:

```css
.no-decoration {
  text-decoration: none;
}

.no-underline {
  text-decoration: none;
}
```

## **Example Usage**

```html
<!-- Both classes do the same thing -->
<a href="#" class="no-decoration">Link without underline</a>
<a href="#" class="no-underline">Link without underline</a>

<!-- Use with buttons styled as links -->
<button class="no-decoration">Button</button>

<!-- Remove decoration from headings that are links -->
<h2>
  <a href="#" class="no-decoration">Heading Link</a>
</h2>
```

## **Documentation Note**

The documentation should explain:

> **`.no-decoration`** and **`.no-underline`** both remove all text decoration (underline, overline, strikethrough). 
> 
> - Use `.no-decoration` for general text decoration removal
> - Use `.no-underline` if you want to be specific about removing underlines
> - Both classes are functionally identical

## **Definition of Done**

- [ ] `.no-decoration` added to `packages/cyan-css/src/atomics/font-style.css`.
- [ ] `.no-underline` kept for backward compatibility.
- [ ] Both classes set `text-decoration: none`.
- [ ] Documentation lists both utilities.
- [ ] Examples show equivalent usage.
