# CnToggleButton Component

A toggle button component built with Lit that follows accessibility best practices.

## Usage

```html
<cn-toggle-button label="Enable notifications"></cn-toggle-button>
<cn-toggle-button label="Dark mode" pressed></cn-toggle-button>
<cn-toggle-button label="Disabled option" disabled></cn-toggle-button>
```

## Properties

| Property    | Type      | Default   | Description                                    |
|-------------|-----------|-----------|-----------------------------------------------|
| `label`     | `string`  | `''`      | The text label displayed on the button       |
| `pressed`   | `boolean` | `false`   | Whether the toggle is currently pressed/on   |
| `disabled`  | `boolean` | `false`   | Whether the toggle is disabled                |
| `ariaPressed` | `string` | `'false'` | ARIA pressed state (automatically managed)   |

## Events

| Event    | Description                                    |
|----------|-----------------------------------------------|
| `change` | Fired when the toggle state changes          |

## Accessibility

The component follows WAI-ARIA toggle button patterns:

- Uses `role="button"` and `aria-pressed` attributes
- Supports keyboard interaction (Enter and Space keys)
- Properly manages focus with `tabindex="0"`
- Dispatches standard `change` events

## Styling

The component uses CSS custom properties for theming:

- `--background-toggle-button-off`: Background when toggle is off
- `--background-toggle-button`: Background when toggle is on  
- `--color-on-toggle-button-off`: Slider color when toggle is off
- `--color-on-toggle-button`: Slider color when toggle is on
- `--cn-grid`: Base grid unit for sizing
- `--cn-font-family-ui`, `--cn-font-weight-ui`, etc.: Typography tokens

## Examples

### Basic Toggle
```html
<cn-toggle-button label="Enable feature"></cn-toggle-button>
```

### Pre-selected Toggle
```html
<cn-toggle-button label="Auto-save" pressed></cn-toggle-button>
```

### Disabled Toggle
```html
<cn-toggle-button label="Premium feature" disabled></cn-toggle-button>
```

### JavaScript Interaction
```javascript
const toggle = document.querySelector('cn-toggle-button');
toggle.addEventListener('change', (event) => {
  console.log('Toggle is now:', event.target.pressed);
});
```
