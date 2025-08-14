# CnAvatar Component

The `<cn-avatar>` component displays a user's avatar. It can show an image, initials from a nickname, or a default placeholder icon.

## Usage

```html
<!-- Avatar with an image -->
<cn-avatar src="/path/to/user-image.png"></cn-avatar>

<!-- Avatar with initials (e.g., "JD") -->
<cn-avatar nick="John Doe"></cn-avatar>

<!-- Default placeholder avatar -->
<cn-avatar></cn-avatar>
```

## Properties

| Property    | Type     | Default | Description                                                                 |
|-------------|----------|---------|-----------------------------------------------------------------------------|
| `src`       | `string` | `''`    | URL to the avatar image. If provided, this will be displayed.              |
| `nick`      | `string` | `''`    | User's nickname. If `src` is not provided and `nick` is, the first two characters of `nick` will be shown. |
| `elevation` | `number` | `0`     | The elevation level of the avatar. This affects the shadow and depth.       |

## Features

- **Image Support**: Display user profile images
- **Initials Fallback**: Show first two characters of nickname when no image is provided
- **Default Icon**: Falls back to avatar icon when neither image nor nickname is available
- **Color Generation**: Automatically generates consistent colors based on nickname hash
- **Elevation Support**: Add shadow depth with elevation levels 1-2
- **Hover Effects**: Interactive hover states
- **Accessibility**: Proper ARIA labels

## CSS Custom Properties

The component uses the following CSS custom properties:

- `--cn-color-avatar-1`: Primary avatar background color
- `--cn-color-avatar-2`: Secondary avatar background color (for color mixing)
- `--cn-line`: Base line height unit
- `--cn-grid`: Base grid unit
- `--shadow-elevation-1`: Box shadow for elevation level 1
- `--shadow-elevation-2`: Box shadow for elevation level 2

## Examples

```html
<!-- Basic avatar with image -->
<cn-avatar src="/example/avatar.webp"></cn-avatar>

<!-- Avatar with initials and elevation -->
<cn-avatar elevation="1" nick="Ville Takanen"></cn-avatar>

<!-- Default avatar with elevation -->
<cn-avatar elevation="2"></cn-avatar>
```
