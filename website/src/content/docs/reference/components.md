---
title: Components
description: The list of components, what each one is built on, and where to find its props.
sidebar:
  order: 1
---

Every component has a page in [Storybook](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/) with its props, states and accessibility checks. The props there are generated from the source code, so they are always up to date.

| Component                                                                                                  | Built on                                             |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [Accordion](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-accordion--docs) | `<details>`                                          |
| [Badge](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-badge--docs)         | Native elements                                      |
| [Button](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-button--docs)       | `<button>`, with `asChild`                           |
| [Checkbox](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-checkbox--docs)   | `<input type="checkbox">`                            |
| [Combobox](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-combobox--docs)   | [Base UI](https://base-ui.com)                       |
| [Dialog](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-dialog--docs)       | `<dialog>`                                           |
| [Field](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-field--docs)         | ARIA wiring for labels, descriptions and errors      |
| [Heading](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-heading--docs)     | `<h1>` to `<h6>`                                     |
| [Input](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-input--docs)         | `<input>`                                            |
| [Label](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-label--docs)         | `<label>`                                            |
| [Link](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-link--docs)           | `<a>`, with `asChild`                                |
| [Popover](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-popover--docs)     | Popover API                                          |
| [Radio](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-radio--docs)         | `<input type="radio">`                               |
| [Select](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-select--docs)       | [Base UI](https://base-ui.com)                       |
| [Spinner](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-spinner--docs)     | A status element                                     |
| [Switch](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-switch--docs)       | `<input type="checkbox" role="switch">`              |
| [Tabs](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-tabs--docs)           | WAI-ARIA tabs pattern                                |
| [Textarea](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-textarea--docs)   | `<textarea>`                                         |
| [Tooltip](https://NikitaBerezhnyj.github.io/vitryla-ui/storybook/?path=/docs/components-tooltip--docs)     | Popover API (`manual`) with hover and focus handling |

`VitrylaProvider` and `useTheme` are described in the [Theming](../../guides/theming/) guide.
