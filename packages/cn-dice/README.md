# cn-dice

A LitElement component that renders a die with a height matching the line-height. The die value can be set manually or rolled randomly.

## Usage

* `<cn-dice>` renders a standard six-sided die, with value 6 by default. 
* `<cn-dice value="3">` renders a six sided die with value 3.
* `<cn-dice sides="10">` renders a ten-sided die with value 10.
* `<cn-dice sides="20" value="12">` renders a twenty-sided die with value 12.
* `<cn-dice sides="20" roll>` renders a twenty-sided die with value ? and rolls it on click.

## Background

This element was created as part of the `cyan-design-system`, but it can also be used as a standalone component in any project. The `cyan-design-system` overrides various CSS variables, but all these variables are defined as CSS custom properties with sensible default values for light and dark themes.
