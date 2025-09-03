# cn-d20-ability-score

A LitElement component for displaying D&D 5e ability scores. Can be used as a display component or an interactive input field.

## Usage

* `<cn-d20-ability-score>` renders a standard ability score with default value 10 (modifier +0).
* `<cn-d20-ability-score base="15">` renders an ability score with value 15 (modifier +2).
* `<cn-d20-ability-score interactive>` renders an interactive input field for entering ability scores.
* `<cn-d20-ability-score interactive base="12" min="8" max="20">` renders an interactive field with custom limits.

## Events

The component dispatches a `score-change` event when the score is changed in interactive mode:

```typescript
element.addEventListener('score-change', (event) => {
  console.log('Base score:', event.detail.base);
  console.log('Modifier:', event.detail.modifier);
});
```

## Background

This element was created as part of the `cyan-design-system`, but it can also be used as a standalone component in any project. The `cyan-design-system` overrides various CSS variables, but all these variables are defined as CSS custom properties with sensible default values for light and dark themes.
