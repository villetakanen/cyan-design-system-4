# PBI: Replace Open Sans with Lato Font

## User Story

As a developer using the Cyan Design System, I want the system to use Lato as the primary font instead of Open Sans, so that the visual consistency is improved and I have a more streamlined font dependency.

## Background

This is a breaking change that removes the Open Sans dependency and replaces it with Lato across the entire design system. The change affects both the font family declarations and peer dependencies.

## Acceptance Criteria

### Font Family Updates
- [ ] Update `--cn-font-family` token to use "Lato" as the primary font, removing "Open Sans"
- [ ] Remove `--cn-font-family-headings` token to consolidate to a single font token
- [ ] Update all CSS that references `--cn-font-family-headings` to use `--cn-font-family` instead
- [ ] Update typography CSS to account for lato-font being served via npm package
- [ ] Maintain proper fallback font stack with system fonts

### Dependency Management
- [ ] Remove `@fontsource/open-sans` from peerDependencies in `packages/cyan-css/package.json`
- [ ] Keep `lato-font` as a peerDependency (already present)
- [ ] Update any documentation that references Open Sans font installation

### Documentation Updates
- [ ] Update cyan-docs with the font change in the changelog/breaking changes
- [ ] Document that projects using cyan-css need to include `lato-font` dependency
- [ ] Update installation documentation to show how to properly import lato-font from npm
- [ ] Update any font-related documentation or examples
- [ ] Provide examples of how to import and use lato-font in different project setups
- [ ] Update `llms.md` with new font usage instructions for AI assistants

### Validation
- [ ] Verify that all text rendering uses Lato as primary font
- [ ] Test font rendering across different browsers and devices
- [ ] Ensure proper fallback behavior when Lato is not available

## Technical Notes

**Breaking Change**: Projects currently using `@fontsource/open-sans` will need to:
1. Remove `@fontsource/open-sans` dependency
2. Add `lato-font` dependency if not already present
3. Update any custom font imports in their applications

**Font Stack Changes**:
- Before: Two tokens - `--cn-font-family: "Open Sans", "Lato", ...system fonts` and `--cn-font-family-headings: "Lato", ...system fonts`
- After: Single token - `--cn-font-family: "Lato", ...system fonts`

**Dependencies**:
- Lato Font package: https://github.com/betsol/lato-font
- This package provides web font files and CSS for Lato font family via npm
- Projects will need to import lato-font CSS (e.g., `import 'lato-font/css/lato-font.css'`)
- The package includes all font weights and styles needed for the design system

## Definition of Done

- [ ] All font family CSS variables updated to use single `--cn-font-family` token with Lato as primary
- [ ] `--cn-font-family-headings` token removed and all references updated
- [ ] Open Sans removed from peerDependencies
- [ ] Documentation updated to reflect breaking change
- [ ] Changes documented in cyan-docs changelog
- [ ] Visual regression testing completed
- [ ] Package version bumped appropriately for breaking change

## Impact Assessment

**Breaking Change Severity**: Medium
- Affects visual appearance of all text
- Requires dependency changes in consuming projects
- Migration path is straightforward but mandatory

**Migration Guide Needed**: Yes
- Document how to remove Open Sans and add Lato font
- Provide step-by-step npm installation: `npm install lato-font`
- Show how to import lato-font CSS in different build systems (Vite, Webpack, etc.)
- Include examples for different project types (React, Vue, vanilla JS, etc.)
- Provide before/after examples
- Include troubleshooting for font loading issues
