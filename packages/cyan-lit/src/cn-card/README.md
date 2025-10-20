# cn-card

A flexible card component for displaying content with optional cover images, icons, titles, and actions.

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `elevation` | `number` | `1` | Card elevation level (0-3) |
| `cover` | `string` | `undefined` | URL for the cover image |
| `noun` | `string` | `''` | Icon name to display |
| `title` | `string` | `''` | Card title |
| `description` | `string` | `''` | Card description (currently unused in favor of slotted content) |
| `href` | `string` | `''` | Link URL for the card or title |
| `notify` | `boolean` | `false` | Shows notification indicator |
| `alert` | `boolean` | `false` | Shows alert indicator |

## Slots

| Slot | Description |
|------|-------------|
| default | Main content area (typically text content) |
| `actions` | Action buttons or links |

## Usage

### Basic Card
```html
<cn-card title="Basic Card">
  This is the content of the card.
</cn-card>
```

### Card with Cover Image
```html
<cn-card 
  title="Card with Cover" 
  cover="/path/to/image.jpg"
  noun="star">
  This card has a cover image and an icon.
</cn-card>
```

### Card with Actions
```html
<cn-card title="Card with Actions">
  This card has action buttons.
  <button slot="actions">Primary Action</button>
  <button slot="actions">Secondary Action</button>
</cn-card>
```

### Linked Card
```html
<cn-card 
  title="Linked Card" 
  href="/destination"
  cover="/path/to/image.jpg">
  This entire card is clickable.
</cn-card>
```

### Card with Notifications
```html
<cn-card title="Notification Card" notify>
  This card has a notification indicator.
</cn-card>

<cn-card title="Alert Card" alert>
  This card has an alert indicator.
</cn-card>
```

### Different Elevations
```html
<cn-card elevation="0" title="Flat Card">Bordered card with no shadow</cn-card>
<cn-card elevation="1" title="Default Card">Default elevation</cn-card>
<cn-card elevation="2" title="Raised Card">Higher elevation</cn-card>
<cn-card elevation="3" title="Floating Card">Highest elevation</cn-card>
```

## CSS Custom Properties

The card component uses CSS custom properties for theming:

- `--cn-card-background`: Card background color
- `--cn-card-box-shadow`: Card shadow
- `--cn-border-radius-card`: Card border radius

## Accessibility

- Card titles are properly structured using `h4` elements
- Cover images have empty alt attributes as they are decorative
- Icons use the `cn-icon` component which includes proper accessibility attributes
- When cards are linked, the link relationship is clear through the href attribute
