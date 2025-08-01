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
| `--cn-app-bar-height` | `calc(var(--cn-grid) * 14)` | App bar height (56px) |
| `--cn-app-bar-mobile-height` | `calc(var(--cn-grid) * 12)` | Mobile app bar height (48px) |
| `--cn-app-bar-font-size` | `calc(var(--cn-grid) * 4.5)` | Title font size (18px) |
| `--cn-app-bar-font-weight` | `300` | Title font weight |
| `--cn-app-bar-letter-spacing` | `calc(var(--cn-grid) * 0.0625)` | Title letter spacing (0.25px) |
| `--cn-app-bar-padding-horizontal` | `var(--cn-gap)` | Horizontal padding |
| `--cn-app-bar-gap` | `var(--cn-gap)` | Gap between elements |
| `--cn-app-bar-background` | `transparent` | Default background |
| `--cn-app-bar-color` | `var(--color-text)` | Text color (auto light/dark theme) |
| `--cn-app-bar-background-sticky` | `var(--color-surface)` | Sticky background (auto light/dark theme) |
| `--cn-app-bar-background-modal` | `var(--color-surface-2)` | Modal background (elevated surface, auto theme) |
| `--cn-app-bar-border-radius` | `0 0 0 var(--cn-border-radius-large)` | Border radius |
| `--cn-app-bar-shadow` | `0 2px 4px rgba(0, 0, 0, 0.1)` | Shadow |

### Color System

The app-bar component now uses the **chroma** color palette with advanced theming capabilities:

#### Light/Dark Theme Support
- Uses `light-dark()` CSS function for automatic theme switching
- Colors automatically adapt based on user's system preference
- No JavaScript required for theme switching

#### Color Architecture
- **Surface levels**: Multiple elevation levels (surface, surface-1, surface-2, etc.)
- **Semantic colors**: Text, headings, links with high/low contrast variants
- **Interactive states**: Hover, focus, active states with proper accessibility
- **Material Design 3**: Follows modern color science and accessibility standards

#### App Bar Color Usage
- `--cn-app-bar-color`: Uses `--color-text` (automatically themes)
- `--cn-app-bar-background-sticky`: Uses `--color-surface` (automatically themes)
- `--cn-app-bar-background-modal`: Uses `--color-surface-2` (elevated surface)

This provides automatic dark/light theme support with no additional configuration needed!

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
- **Chroma color palette** and sophisticated color system to be loaded
- CSS design tokens (units, fonts, colors) to be loaded
- Proper font families defined in CSS custom properties

The component integrates with the Cyan Design System's advanced color architecture:
- **Automatic theming**: Uses `light-dark()` for seamless theme switching
- **Surface elevation**: Multiple surface levels for proper visual hierarchy
- **Accessibility-first**: All color combinations meet WCAG contrast requirements
- **Material Design 3**: Modern color science with sophisticated blending
- **Zero-config themes**: Dark/light modes work automatically based on system preference
