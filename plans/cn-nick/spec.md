# Feature: cn-nick

## Blueprint

### Context

The current implementation of author links (e.g., in reply bubbles) relies on standard anchor tags or framework-specific components like `ProfileLink.svelte`. This renders as a generic link with default underline styling, which can be visually jarring and lacks the "premium" feel of a dedicated identity component within styled containers like reply bubbles.

User identity elements (nicknames) appear frequently throughout the application:
- Reply bubble headers
- Comment attribution
- User lists
- Activity feeds

A consistent, subtle styling for these identity elements will improve visual cohesion and provide a more polished user experience.

### Architecture

**Recommendation: CSS utility class approach (Proposal B)**

After analyzing the codebase, the CSS utility class approach is preferred because:

1. **Simplicity** - No JavaScript overhead; the component has no behavior beyond styling
2. **Flexibility** - Works with both `<a>` and `<span>` elements natively
3. **Consistency** - Follows the pattern established by `.cn-chip` and `.hover-underline`
4. **Framework agnostic** - Works in Svelte, React, plain HTML without wrapper components
5. **No shadow DOM limitations** - Styles integrate naturally with parent containers

#### CSS Class: `.cn-nick`

```css
/* Location: packages/cyan-css/src/utilities/nick.css */

.cn-nick {
  /* Typography */
  font-weight: var(--cn-font-weight-text-strong);  /* 700 - bold */
  font-size: inherit;
  line-height: inherit;
  
  /* Remove link defaults */
  text-decoration: none;
  
  /* Color - subtle, heading-like */
  color: var(--color-text-high);
  
  /* Inline behavior */
  display: inline;
}

/* Interactive states for anchor elements */
a.cn-nick:hover,
a.cn-nick:focus {
  color: var(--color-link-hover);
}

a.cn-nick:active {
  color: var(--color-link-active);
}

/* Focus visible for keyboard navigation */
a.cn-nick:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .cn-nick {
    transition: none;
  }
}
```

#### Usage Examples

```html
<!-- As a link (interactive) -->
<a href="/profile/user123" class="cn-nick">Username</a>

<!-- As static text (deleted user, non-linkable context) -->
<span class="cn-nick">DeletedUser</span>

<!-- Inside a reply bubble -->
<cn-bubble reply>
  <div class="toolbar">
    <a href="/profile/user123" class="cn-nick">Username</a>
    <span class="secondary">replied 2 hours ago</span>
  </div>
  <p>Reply content here...</p>
</cn-bubble>
```

#### Integration Points

- **CSS file**: `packages/cyan-css/src/utilities/nick.css`
- **CSS index**: Add import to `packages/cyan-css/src/utilities/index.css`
- **Tokens used**:
  - `--cn-font-weight-text-strong` (700)
  - `--color-text-high` (high-emphasis text)
  - `--color-link-hover`, `--color-link-active`
  - `--color-border-focus`

#### Documentation

Create documentation page at `apps/cyan-docs/src/books/styles/nick.mdx`:

- Title: "Nick (User Identity)"
- Include light/dark theme demo similar to buttons.mdx pattern
- Show usage with `<a>` and `<span>` elements
- Show integration with `cn-bubble` component
- Document when to use `.cn-nick` vs regular links

### Anti-Patterns

| Anti-Pattern | Why to Avoid |
|--------------|--------------|
| Creating a Web Component | Adds JavaScript overhead for purely visual styling; shadow DOM complicates integration with parent containers |
| Using `!important` overrides | Breaks cascade; makes customization difficult in specific contexts |
| Hardcoding colors | Breaks theme switching; use design tokens exclusively |
| Adding width/sizing properties | Nickname should flow naturally with text; avoid fixed dimensions |
| Complex hover animations | Distracting for a frequently-appearing element; keep interactions subtle |

---

## Contract

### Definition of Done

**CSS Implementation:**
- [ ] `.cn-nick` class defined in `packages/cyan-css/src/utilities/nick.css`
- [ ] Import added to `packages/cyan-css/src/utilities/index.css`

**Functionality:**
- [ ] Works as `<a class="cn-nick">` (interactive)
- [ ] Works as `<span class="cn-nick">` (static)
- [ ] No underline in any state
- [ ] Bold font weight applied
- [ ] Hover changes color only (no underline)
- [ ] Keyboard focus outline visible
- [ ] Works inside `cn-bubble` without conflicts

**Quality:**
- [ ] Uses design tokens for all colors
- [ ] Respects `prefers-reduced-motion`
- [ ] Works in both light and dark themes

**Documentation:**
- [ ] Page created at `apps/cyan-docs/src/books/styles/nick.mdx`
- [ ] Light/dark theme demo included
- [ ] Usage examples for link and static variants
- [ ] Integration example with `cn-bubble`

### Regression Guardrails

| Invariant | Rationale |
|-----------|-----------|
| No text-decoration in any state | Core visual requirement |
| Design tokens for all colors | Theme compatibility |
| `display: inline` | Must flow naturally in text |
| No layout side effects | Drop-in replacement for plain text/links |

### Acceptance Criteria

1. **Link variant**: `<a class="cn-nick" href="...">Name</a>` displays bold, no underline, color shifts on hover
2. **Static variant**: `<span class="cn-nick">Name</span>` displays bold, no underline, non-interactive
3. **Keyboard navigation**: Tab-focusing a link variant shows visible outline
4. **Theme support**: Colors adapt correctly when switching light/dark themes
5. **Bubble integration**: Renders correctly inside `cn-bubble` toolbar areas
