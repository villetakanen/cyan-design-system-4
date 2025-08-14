# CnMenu

A dropdown menu component with a trigger button and expandable content area. The menu can be positioned automatically based on viewport position and supports both inline (horizontal dots) and vertical (kebab) orientations.

## Usage

```html
<cn-menu>
  <div>Menu Item 1</div>
  <div>Menu Item 2</div>
  <div>Menu Item 3</div>
</cn-menu>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expanded` | `boolean` | `false` | Whether the menu is currently expanded/open |
| `inline` | `boolean` | `false` | Whether to display horizontal dots (true) or vertical kebab icon (false) |
| `disabled` | `boolean` | `false` | Whether the menu trigger button is disabled |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `menu-toggled` | `{ expanded: boolean }` | Fired when the menu is toggled open or closed |

## Examples

### Basic Menu
```html
<cn-menu>
  <button>Option 1</button>
  <button>Option 2</button>
  <button>Option 3</button>
</cn-menu>
```

### Inline Menu (horizontal dots)
```html
<cn-menu inline>
  <a href="/profile">Profile</a>
  <a href="/settings">Settings</a>
  <a href="/logout">Logout</a>
</cn-menu>
```

### Disabled Menu
```html
<cn-menu disabled>
  <div>Unavailable Option</div>
</cn-menu>
```

### Listening to Events
```javascript
const menu = document.querySelector('cn-menu');
menu.addEventListener('menu-toggled', (event) => {
  console.log('Menu is now:', event.detail.expanded ? 'open' : 'closed');
});
```

## Behavior

- The menu automatically positions itself based on the trigger button's location in the viewport
- Clicking outside the menu will close it
- The menu can be controlled programmatically by setting the `expanded` property
- Menu content is provided via the default slot
- The component uses `cn-icon` for the trigger button icon (requires `cn-icon` to be available)

## Styling

The component uses CSS custom properties for theming:

- `--color-on-surface`: Text color for the trigger button
- `--color-button-text`: Background color for button hover state
- `--color-button-text-hover`: Background color for button hover state
- `--color-button-text-active`: Background color for button active state
- `--color-surface-3`: Background color for the menu content
- `--shadow-elevation-3`: Box shadow for the menu content
- `--cn-grid`: Spacing unit for positioning
- `--cn-border-radius`: Border radius for the menu content
- `--cn-button-size-physical`: Physical size of the trigger button
- `--cn-button-size`: Visual size of the trigger button background

## Dependencies

- Requires `cn-icon` component to be available for the trigger button icons
- Uses `kebab` and `dots` icon nouns from the icon set
