User Story:

As a developer, I want a dedicated layout container for list-based data (e.g., forum topics, activity feeds) so that I can present a list where each item's internal content is split into a configurable number of columns on wider screens.

Acceptance Criteria:

A new CSS component, .content-listing, is added to the cyan-css package.

The container has a main frame for a shared <header>, <footer>, aside, and a .listing-items area.

The .listing-items area must stack <article> elements vertically in a single column on all screen sizes.

Each <article> must use a nested CSS grid for its internal content and be responsive:

On container widths of 620px or less, content must always stack in a single column.

On container widths above 620px, content should reflow into 1, 2, or 3 columns based on modifier classes (e.g., .cols-2, .cols-3) applied to the <article> element.

On mobile viewports, the main frame's vertical layout order must be: header, item listing, aside, and then footer.

An accompanying page is added to the cyan-doc design system book, documenting the new container's usage, structure, and responsive behavior.

The styling must be consistent with the existing design system, using established CSS variables.

Technical Notes:

The component should be built mobile-first.

The .content-listing container should have a max-width of 1365px and be centered on larger screens.

The primary layout mechanism should be CSS Grid. One grid for the outer frame, and a separate nested grid for the content inside each <article>.

Container queries should be attached to a parent container like main-app-content.

Responsive Breakpoints: The component must use the following container query breakpoints:

> 620px: The content within an <article> can reflow from a single stack into multiple columns, if a .cols-* class is present.

> 960px: The main .content-listing layout switches to a sidebar view. At this point, the .listing-items and aside columns should be sized using the golden ratio (approximately 1.618:1).