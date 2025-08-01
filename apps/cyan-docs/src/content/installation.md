# Installation

## Breaking Changes in 4.0.0

**BREAKING CHANGE**: As of version 4.0.0, Cyan Design System is no longer distributed via npm. Instead, we recommend using git submodules to include the design system in your project.

## Installation via Git Submodule

The recommended method of installation is to add this repository as a git submodule to your project:

```zsh
# Add the Cyan Design System as a submodule
git submodule add https://github.com/villetakanen/cyan-design-system-4.git cyan-design-system

# Initialize and update the submodule
git submodule update --init --recursive
```

After adding the submodule, you can import the components directly from the submodule path:

```javascript
// Import Lit components
import './cyan-design-system/packages/cyan-lit/src/index.js';
```

## Alternative: Clone Repository

Alternatively, you can clone the repository directly into your project:

```zsh
git clone https://github.com/villetakanen/cyan-design-system-4.git
```

## Fonts

The Design System uses Lato for headings and Open Sans for body text. These fonts are included as `peerDependencies` of `cyan-css` and should be installed in your project.

You will need to add them to your project's `package.json`. For example, using pnpm:

```bash
pnpm add @fontsource/open-sans lato-font
```

Then, import the fonts in your main application entry point (e.g., a global CSS file or a layout component). For example, in a CSS or Astro style block:

```css
@import '@fontsource/open-sans';
@import 'lato-font/css/lato-font.css';
```

The `cyan-css` package itself does not bundle the fonts, but it defines the `font-family` rules and expects the fonts to be available.

### ALternative Font Sources

You can also use other font sources like Google Fonts or Adobe Fonts. If you choose to use Google Fonts, you can include the following link in your HTML head:

```html
<!-- Google fonts for Cyan-->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto+Mono:wght@500&display=swap" rel="stylesheet">
<!-- end Google fonts for Cyan -->
```

## Migration from 3.x

If you're upgrading from a previous version that used npm, you'll need to:

1. Remove the old npm package: `npm uninstall @11thdeg/cyan-next`
2. Add the git submodule as described above
3. Update your import statements to reference the submodule path
4. Ensure your build process can handle the new file structure
