# PBI: New Utility Class - `cn-chip`

**User Story:**

As a developer using the Cyan Design System, I want a Material Design inspired chip style for `<a>` and `<span>` elements so that I can create clickable tags for navigation and filtering.

### **Description**

The `cn-chip` utility class will provide Material Design inspired chip styling for native HTML elements (`<a>`, `<span>`, `<button>`). Chips are compact elements that represent an input, attribute, or action. They can be used for tags, filters, or other small interactive elements.

This will be implemented as a CSS utility class in the `cyan-css` package within the `cyan-design-system-4` monorepo. The class should work with both `<a href="">` links and non-interactive `<span>` elements, with appropriate hover and active states for interactive variants.

### **Acceptance Criteria**

1. **CSS Implementation:**
    
    - [ ] A new utility class `.cn-chip` is created in the `cyan-css` package.
        
    - [ ] The class is organized in the appropriate CSS category (likely `utilities` or `components`).
        
    - [ ] The class applies to `<a>`, `<span>`, and `<button>` elements.
        
2. **Visual Design (Material Design Style):**
    
    - [ ] Chips have rounded corners (pill-shaped).
        
    - [ ] Appropriate padding for compact, readable appearance.
        
    - [ ] Clear background color that distinguishes chips from regular text.
        
    - [ ] Border or subtle elevation for visual separation.
        
    - [ ] Typography is sized for compact display while maintaining readability.
        
    - [ ] Chips work in both light and dark themes.
        
3. **Interactive States:**
    
    - [ ] Clickable variants (`<a>`, `<button>`) have hover states.
        
    - [ ] Clickable variants have active/pressed states.
        
    - [ ] Focus states are clearly visible for keyboard navigation.
        
    - [ ] Non-interactive variants (`<span>`) do not show hover effects.
        
    - [ ] Respects `prefers-reduced-motion` for transitions.
        
4. **Design Tokens:**
    
    - [ ] Use existing design tokens from `cyan-css`:
        
        - `--cn-border-radius-large` or `--cn-border-radius-xl`: For pill-shaped appearance.
            
        - `--cn-grid` / `--cn-gap`: For spacing and padding.
            
        - `--color-button-text` / `--color-button-text-hover`: For background colors.
            
        - Existing chroma tokens for theming support.
            
    - [ ] No chip-specific tokens needed - reuse existing design system tokens.

5. **Color Variants:**
    
    - [ ] Color variants should use existing utility classes (e.g., `.primary`, `.call-to-action`).
        
    - [ ] The `.cn-chip` class should work seamlessly when combined with existing color utilities.
        
    - [ ] No chip-specific color variant classes needed.
        
6. **Documentation:**    - [ ] Documentation page created at `apps/cyan-docs/src/books/utilities/cn-chip.mdx`.
        
    - [ ] Documentation includes:
        
        - [ ] Overview and use cases.
            
        - [ ] Live examples with `<a>`, `<span>`, and `<button>` elements.
            
        - [ ] Examples showing clickable tags and filter patterns.
            
        - [ ] Reference to which existing design tokens are used.
            
        - [ ] Light and dark mode examples.
            
        - [ ] Accessibility notes.
            

### **Technical Considerations & Implementation Notes**

- **Styling Approach:**
    
    - Use display: `inline-flex` for better content alignment and icon support.
        
    - Consider `gap` property for spacing between text and potential icons.
        
    - Use relative units (rem, em) for scalability.
        
    - Ensure sufficient contrast ratios (WCAG AA minimum).
        
    - Reuse existing design tokens:
        
        - Border radius: `--cn-border-radius-large` or `--cn-border-radius-xl` for pill shape.
            
        - Padding: Based on `--cn-grid` (e.g., `calc(var(--cn-grid) * 1)` vertical, `calc(var(--cn-grid) * 2)` horizontal).
            
        - Colors: Reuse button text colors (`--color-button-text`, etc.) or similar existing tokens.
        
- **Interactive Behavior:**
    
    - Use `:hover`, `:active`, `:focus-visible` pseudo-classes.
        
    - Reset default link styles (underline, color) for `<a>` elements.
        
    - Maintain native button/link semantics for accessibility.
        
- **Accessibility:**
    
    - Ensure sufficient color contrast for text.
        
    - Provide visible focus indicators.
        
    - Support keyboard navigation naturally through native elements.
        
    - Consider adding `role="button"` guidance for non-semantic usage.
        
- **Integration:**
    
    - Works with existing Cyan Design System color schemes.
        
    - Compatible with other utility classes.
        
    - Can be combined with spacing utilities, etc.
        

### **Example Usage**

```html
<!-- Clickable tag links -->
<a href="/tag/fiction" class="cn-chip">Fiction</a>
<a href="/tag/adventure" class="cn-chip">Adventure</a>
<a href="/tag/sci-fi" class="cn-chip">Sci-Fi</a>

<!-- Non-interactive tags -->
<span class="cn-chip">Read-only Tag</span>
<span class="cn-chip">Status: Active</span>

<!-- Filter buttons -->
<button class="cn-chip" type="button">Filter: All</button>
<button class="cn-chip" type="button">Filter: Recent</button>

<!-- Combined with existing utility classes -->
<div class="flex gap-xs">
  <a href="/tag/rpg" class="cn-chip">RPG</a>
  <a href="/tag/fantasy" class="cn-chip">Fantasy</a>
  <a href="/tag/magic" class="cn-chip">Magic</a>
</div>

<!-- Using existing color utilities -->
<a href="/featured" class="cn-chip primary">Featured</a>
<a href="/action" class="cn-chip call-to-action">Take Action</a>
```

### **Testing Strategy**

- **Visual Testing:**
    
    - Verify appearance in light and dark modes.
        
    - Test hover, active, and focus states.
        
    - Verify appearance with different text lengths.
        
    - Test with `<a>`, `<span>`, and `<button>` elements.
        
- **Accessibility Testing:**
    
    - Verify color contrast meets WCAG AA standards.
        
    - Test keyboard navigation and focus visibility.
        
    - Verify screen reader compatibility.
        
- **Integration Testing:**
    
    - Test chips within different container layouts.
        
    - Verify compatibility with other utility classes.
        
    - Test responsive behavior at different viewport sizes.
        

### **Dependencies**

- cyan-css package
- Existing design token system
- Theme infrastructure (light/dark mode support)

### **Definition of Done**

- [ ] `.cn-chip` utility class implemented in `cyan-css`.
- [ ] Uses existing design tokens (no new tokens created).
- [ ] Works correctly with `<a>`, `<span>`, and `<button>` elements.
- [ ] All interactive states (hover, active, focus) implemented.
- [ ] Supports light and dark themes.
- [ ] Documentation page created and published.
- [ ] All acceptance criteria met.
- [ ] Accessibility requirements verified.
- [ ] Code reviewed and follows project conventions.
