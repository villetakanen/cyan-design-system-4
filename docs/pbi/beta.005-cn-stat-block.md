# PBI: New Component - `cn-stat-block`

**User Story:**

As a developer using the Cyan Design System, I want a flexible `cn-stat-block` component so that I can easily display RPG character statistics in a clean, card-like format with various layout options.

### **Description**

The `cn-stat-block` component will serve as a container for displaying a set of related character statistics (e.g., ability scores, combat stats, skills). It should be designed to be highly composable, allowing developers to slot in different types of stat displays. The component needs to support multiple layout configurations to accommodate different data densities and presentation styles.

This component will be part of the core `@cyan-design/core` package within the `cyan-design-system-4` monorepo.

### **Acceptance Criteria**

1. **Component Scaffolding:**
    
    - [ ] A new Lit-element named `cn-stat-block` is created within the `cyan-design-system-4` package.
        
    - [ ] The component is properly exported and available for use within the design system.
        
2. **Title/Label Functionality:**
    
    - [ ] The component accepts a `label` attribute (e.g., `<cn-stat-block label="Ability Scores">`).
        
    - [ ] The label is displayed as a title for the stat block.
        
    - [ ] An attribute `label-position` can be set to either `"top"` (default) or `"bottom"` to control the title's placement.
        
3. **Content Slotting:**
    
    - [ ] The component has a default `<slot>` that accepts child elements.
        
    - [ ] The component can successfully render various slotted elements, including:
        
        - Standard HTML elements (divs, inputs).
            
        - Other Cyan Design System components (e.g., `cn-d20-ability-score`, view-only inputs).
            
4. **Layout Control:**
    
    - [ ] The component has a `layout` attribute that controls the arrangement of slotted items.
        
    - [ ] The `layout` attribute supports the following values:
        
        - `"rows"` (default): Slotted items are displayed in a single vertical column.
            
        - `"grid-2"`: Slotted items are arranged in a grid with 2 columns.
            
        - `"grid-3"`: Slotted items are arranged in a grid with 3 columns.
            
    - [ ] The grid layouts are responsive and adjust gracefully on smaller viewports.
        
5. **Styling:**
    
    - [ ] The component has a distinct card-like appearance (e.g., border, box-shadow, padding) that aligns with the Cyan Design System's aesthetic.
        
    - [ ] The spacing between slotted items is consistent and managed by the component's internal styles based on the chosen layout.
        
6. **Documentation & Examples:**
    
    - [ ] Storybook documentation is created for `cn-stat-block`.
        
    - [ ] The stories include examples for each `label-position` and `layout` option to clearly demonstrate its functionality.
        

### **Technical Considerations & Implementation Notes**

- **Properties/Attributes:**
    
    - `label: string`: The title of the stat block.
        
    - `labelPosition: 'top' | 'bottom'`: Controls where the label is rendered.
        
    - `layout: 'rows' | 'grid-2' | 'grid-3'`: Controls the layout of slotted content.
        
- **Styling:**
    
    - Use CSS Flexbox or Grid for layout management.
        
    - The component's host element should be styled with `display: block` or `display: inline-block`.
        
    - Use CSS Parts (`::part()`) for the container and label to allow for basic style customization by consumers if needed.
        
- **Structure Example (Internal Template):**
    
    ```
    <div class="stat-block-container" part="container">
      <header part="label" class="label label--top">${this.label}</header>
      <main class="content-wrapper layout--${this.layout}">
        <slot></slot>
      </main>
      <footer part="label" class="label label--bottom">${this.label}</footer>
    </div>
    ```
    
    _(Logic will be needed to conditionally render the header/footer based on `labelPosition`)_.
    

### **Example Usage**

```
<!-- Row Layout (Default) -->
<cn-stat-block label="Attributes">
  <cn-d20-ability-score score="18" modifier="+4" label="Strength"></cn-d20-ability-score>
  <cn-d20-ability-score score="14" modifier="+2" label="Dexterity"></cn-d20-ability-score>
</cn-stat-block>

<!-- 2-Column Grid with label at the bottom -->
<cn-stat-block label="Combat Stats" layout="grid-2" label-position="bottom">
  <div>AC: 16</div>
  <div>HP: 34/34</div>
  <div>Speed: 30ft</div>
  <div>Initiative: +2</div>
</cn-stat-block>
```