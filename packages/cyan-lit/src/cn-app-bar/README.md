# CnAppBar Component

A flexible app bar component that supports different modes and configurations.

## Usage

```html
<cn-app-bar title="My App"></cn-app-bar>
```

## Properties

| Property    | Type      | Default | Description                                    |
|-------------|-----------|---------|------------------------------------------------|
| `noun`      | `string`  | `''`    | Icon name to display (when not in modal mode) |
| `title`     | `string`  | `''`    | Main title text                                |
| `shortTitle`| `string`  | `''`    | Short title for smaller screens               |
| `mode`      | `BarMode` | `''`    | App bar mode: `'sticky'`, `'modal'`, or `''`  |
| `scrolled`  | `boolean` | `false` | Whether the page is scrolled (auto-managed)   |

## Modes

### Default Mode (`mode=""`)
- Transparent background
- Static positioning
- Shows noun icon and actions

### Sticky Mode (`mode="sticky"`)
- Becomes sticky at top of viewport
- Changes background when scrolled
- Shows shadow when scrolled

### Modal Mode (`mode="modal"`)
- Always sticky positioning
- Shows back button instead of noun icon
- Hides action slot
- Special modal background

## CSS Custom Properties

The component uses CSS custom properties (tokens) for styling:

| Property | Default | Description |
|----------|---------|-------------|
| `--cn-app-bar-height` | `3.5rem` | App bar height |
| `--cn-app-bar-font-size` | `1.25rem` | Title font size |
| `--cn-app-bar-font-weight` | `500` | Title font weight |
| `--cn-app-bar-letter-spacing` | `0.25px` | Title letter spacing |
| `--cn-app-bar-padding-horizontal` | `var(--cn-gap)` | Horizontal padding |
| `--cn-app-bar-gap` | `var(--cn-gap)` | Gap between elements |
| `--cn-app-bar-background` | `transparent` | Default background |
| `--cn-app-bar-color` | `var(--cn-color-primary)` | Text color |
| `--cn-app-bar-background-sticky` | `var(--cn-color-surface)` | Sticky background |
| `--cn-app-bar-background-modal` | `var(--cn-color-surface-variant)` | Modal background |
| `--cn-app-bar-border-radius` | `0 0 0 var(--cn-border-radius-large)` | Border radius |
| `--cn-app-bar-shadow` | `0 2px 4px rgba(0, 0, 0, 0.1)` | Shadow |

## Examples

### Basic App Bar
```html
<cn-app-bar title="My Application">
  <button>Menu</button>
</cn-app-bar>
```

### App Bar with Icon
```html
<cn-app-bar noun="home" title="Home Page">
  <button>Settings</button>
</cn-app-bar>
```

### Sticky App Bar with Responsive Title
```html
<cn-app-bar 
  mode="sticky" 
  title="Long Application Name" 
  short-title="App">
  <button>Profile</button>
</cn-app-bar>
```

### Modal App Bar
```html
<cn-app-bar mode="modal" title="Settings"></cn-app-bar>
```

## Responsive Behavior

- On screens ≤620px: Uses mobile height and removes border radius
- Title automatically switches between `title` and `shortTitle` based on screen size
- `.sm-hidden` class hides content on small screens
- `.md-hidden` class hides content on medium+ screens

## Dependencies

This component expects:
- `cn-icon` component for displaying icons
- CSS design tokens to be loaded
- Proper font families defined in CSS custom properties
