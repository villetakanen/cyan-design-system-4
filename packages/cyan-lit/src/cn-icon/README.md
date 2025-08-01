# CnIcon Component

A wrapper Lit component for lazy loading of SVG icons with different size options.

## Usage

```html
<cn-icon noun="home"></cn-icon>
<cn-icon noun="settings" small></cn-icon>
<cn-icon noun="star" large></cn-icon>
```

## Properties

| Property  | Type      | Default | Description                                     |
|-----------|-----------|---------|------------------------------------------------|
| `noun`    | `string`  | `''`    | Icon name to load from `/icons/{noun}.svg#icon` |
| `xsmall`  | `boolean` | `false` | Extra small size (16px)                        |
| `small`   | `boolean` | `false` | Small size (24px)                              |
| `large`   | `boolean` | `false` | Large size (48px)                              |
| `xlarge`  | `boolean` | `false` | Extra large size (64px)                        |

## Size Variants

The component supports different size variants through boolean attributes:

- **Default**: 128px (`--cn-icon-size`)
- **XSmall**: 16px (`--cn-icon-size-xsmall`)
- **Small**: 24px (`--cn-icon-size-small`)  
- **Large**: 48px (`--cn-icon-size-large`)
- **XLarge**: 64px (`--cn-icon-size-xlarge`)

## Icon Loading

Icons are loaded from `/icons/{noun}.svg#icon`. If no noun is provided, it defaults to `/icons/design.svg#icon`.

The component expects SVG files with the following structure:
```xml
<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <g id="icon">
    <!-- Icon content -->
  </g>
</svg>
```

## Accessibility

The component automatically includes accessibility features:
- Proper `aria-labelledby` attribute pointing to the icon title
- Title element with the icon name for screen readers
- Semantic SVG structure

## CSS Custom Properties

The component respects the following CSS custom properties:

- `--color-on`: Icon color (defaults to `currentColor`)
- `--cn-icon-size`: Default icon size (128px)
- `--cn-icon-size-xsmall`: Extra small size (16px)
- `--cn-icon-size-small`: Small size (24px)
- `--cn-icon-size-large`: Large size (48px)
- `--cn-icon-size-xlarge`: Extra large size (64px)

## Examples

```html
<!-- Default size icon -->
<cn-icon noun="home"></cn-icon>

<!-- Small icon -->
<cn-icon noun="settings" small></cn-icon>

<!-- Large icon with custom color -->
<cn-icon noun="star" large style="color: gold;"></cn-icon>

<!-- Icon with fallback to default -->
<cn-icon></cn-icon>
```
