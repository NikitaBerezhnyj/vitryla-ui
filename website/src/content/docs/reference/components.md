---
title: Components
description: The list of components and what each one is built on.
sidebar:
  order: 1
---

Open [Storybook](https://<user>.github.io/vitryla-ui/storybook/) to see every component with its props, states and accessibility checks.

| Component                                  | Built on                                             |
| ------------------------------------------ | ---------------------------------------------------- |
| Button, Link                               | Native `<button>` and `<a>`, with `asChild`          |
| Input, Textarea, Checkbox, Switch, Radio   | Native form elements                                 |
| Label, Field, FieldDescription, FieldError | Native `<label>` and ARIA wiring                     |
| Heading, Badge, Spinner                    | Native elements                                      |
| Accordion                                  | `<details>`                                          |
| Dialog                                     | `<dialog>`                                           |
| Popover                                    | Popover API                                          |
| Tooltip                                    | Popover API (`manual`) with hover and focus handling |
| Tabs                                       | WAI-ARIA tabs pattern                                |
| Select, Combobox                           | [Base UI](https://base-ui.com)                       |
| VitrylaProvider                            | React context and CSS variables                      |
