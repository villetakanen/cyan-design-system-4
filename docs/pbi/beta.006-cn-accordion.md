# PBI: New Component - `cn-accordion`

**User Story:**

As a developer using the Cyan Design System, I want a Material 3 style accordion component so that I can create expandable/collapsible content sections with smooth animations and accessible interactions.

### **Description**

The `cn-accordion` component will provide an expandable/collapsible container following Material Design 3 principles. It should support both controlled and uncontrolled states, keyboard navigation, and accessibility features. The component will consist of a header (always visible) and a content area that expands/collapses with smooth animations.

This component will be part of the core `cyan-lit` package within the `cyan-design-system-4` monorepo, with supporting design tokens added to the `cyan-css` package.

### **Acceptance Criteria**

1. **Component Scaffolding:**
    
    - [x] A new Lit-element named `cn-accordion` is created within the `cyan-lit` package.
        
    - [x] The component is properly exported from `packages/cyan-lit/src/index.ts`.
        
    - [x] Unit tests (`cn-accordion.test.ts`) are created for basic functionality.
        
    - [x] Browser tests (`cn-accordion.browser.test.ts`) are created for animations and interactions.
        
2. **Basic Functionality:**
    
    - [x] The component accepts a `label` attribute for the header text.
        
    - [x] The component has an `expanded` boolean attribute/property to control open/closed state.
        
    - [x] Clicking the header toggles the expanded state.
        
    - [x] The component emits a `cn-accordion-toggle` custom event when the state changes.
        
    - [x] The event detail includes the new `expanded` state.
        
3. **Content Slotting:**
    
    - [x] The component has a named `header` slot for custom header content (optional).
        
    - [x] The component has a default slot for the expandable content.
        
    - [x] If the `header` slot is used, it takes precedence over the `label` attribute.
        
4. **Visual Design (Material 3 Style):**
    
    - [x] The header has a clear clickable appearance with appropriate hover states.
        
    - [x] An expand/collapse icon (chevron or similar) is displayed in the header.
        
    - [x] The icon rotates smoothly when toggling between expanded/collapsed states.
        
    - [x] Content area expands/collapses with a smooth height transition animation.
        
    - [x] The component follows Material 3 spacing, elevation, and visual hierarchy.
        
5. **Accessibility:**
    
    - [x] The header has `role="button"` and appropriate ARIA attributes.
        
    - [x] The component uses `aria-expanded` to indicate the current state.
        
    - [x] The content area has `aria-hidden` when collapsed.
        
    - [ ] Keyboard navigation is fully supported:
        
        - [ ] `Enter` and `Space` toggle the accordion.
            
        - [ ] `Tab` moves focus to/from the accordion header (needs `tabindex="0"`).
            
    - [~] Screen reader announcements are clear and informative.
        
6. **Design Tokens (cyan-css):**
    
    - [x] CSS custom properties are added to `cyan-css` for:
        
        - `--cn-accordion-background`: Background color of the accordion.
            
        - `--cn-accordion-border`: Border styling.
            
        - `--cn-accordion-header-background`: Header background color.
            
        - `--cn-accordion-header-background-hover`: Header hover state.
            
        - `--cn-accordion-header-text`: Header text color.
            
        - `--cn-accordion-padding`: Content padding.
            
        - `--cn-accordion-transition-duration`: Animation duration.
            
        - `--cn-accordion-icon-size`: Size of the expand/collapse icon.
            
7. **Documentation:**
    
    - [x] Documentation page created at `apps/cyan-docs/src/books/custom-elements/cn-accordion.mdx`.
        
    - [x] Documentation includes:
        
        - [x] Component overview and use cases.
            
        - [x] Live examples (expanded, collapsed, custom header).
            
        - [x] API reference table (properties, attributes, events, CSS custom properties).
            
        - [ ] Accessibility notes.
            
        - [ ] Light and dark mode examples.
            

### **Technical Considerations & Implementation Notes**

- **Properties/Attributes:**
    
    - `label: string`: The text displayed in the header (if no header slot provided).
        
    - `expanded: boolean`: Whether the accordion is expanded (default: `false`).
        
    - `disabled: boolean`: Whether the accordion is interactive (optional).
        
- **Events:**
    
    - `cn-accordion-toggle`: Dispatched when the accordion state changes.
        
        - Detail: `{ expanded: boolean }`
            
- **Styling:**
    
    - Use CSS Grid or Flexbox for header layout (label + icon).
        
    - Use CSS transitions for smooth expand/collapse animations.
        
    - Consider using `grid-template-rows` transition for height animation.
        
    - Use CSS Parts for customization:
        
        - `part="header"`: The header container.
            
        - `part="content"`: The content container.
            
        - `part="icon"`: The expand/collapse icon.
            
- **Animation Approach:**
    
    - Use `max-height` or `grid-template-rows` for smooth transitions.
        
    - Consider using the Web Animations API for more control if needed.
        
    - Ensure animations respect `prefers-reduced-motion` for accessibility.
        
- **Icon:**
    
    - Use an SVG chevron icon inline in the component.
        
    - Rotate the icon 180deg when expanded using CSS transforms.
        

### **Example Usage**

```html
<!-- Basic usage with label attribute -->
<cn-accordion label="Section 1">
  <p>This is the expandable content.</p>
</cn-accordion>

<!-- Pre-expanded state -->
<cn-accordion label="Section 2" expanded>
  <p>This content is visible by default.</p>
</cn-accordion>

<!-- Custom header using slot -->
<cn-accordion>
  <span slot="header">
    <strong>Custom Header</strong> with <em>formatting</em>
  </span>
  <div>
    <h3>Rich Content</h3>
    <p>You can put any content here.</p>
  </div>
</cn-accordion>

<!-- Listening to toggle events -->
<cn-accordion 
  label="Interactive Section"
  @cn-accordion-toggle="${(e) => console.log('Expanded:', e.detail.expanded)}"
>
  <p>Content here.</p>
</cn-accordion>
```

### **Testing Strategy**

- **Unit Tests (`cn-accordion.test.ts`):**
    
    - Verify default property values.
        
    - Test that clicking toggles the `expanded` property.
        
    - Test that the `cn-accordion-toggle` event is dispatched.
        
    - Verify ARIA attributes are correct.
        
    - Test keyboard interactions (Enter, Space).
        
- **Browser Tests (`cn-accordion.browser.test.ts`):**
    
    - Verify the icon rotates when toggling.
        
    - Test that content animates smoothly.
        
    - Verify computed styles for expanded/collapsed states.
        
    - Test hover states.
        

### **Dependencies**

- Lit 3.x
- TypeScript
- Vitest (for testing)
- Playwright (for browser tests)

### **Definition of Done**

- [ ] Component implemented in `packages/cyan-lit/src/cn-accordion.ts`.
- [ ] Component exported from `packages/cyan-lit/src/index.ts`.
- [ ] Unit tests pass with good coverage.
- [ ] Browser tests pass.
- [ ] Design tokens added to `cyan-css`.
- [ ] Documentation page created and published.
- [ ] All acceptance criteria met.
- [ ] Code reviewed and follows project conventions.
- [ ] No accessibility violations detected.
