---
title: Browser support
description: Which browsers Vitryla UI supports and what degrades in older ones.
sidebar:
  order: 3
---

Vitryla UI targets evergreen browsers released since spring 2024:

| Browser               | Minimum version |
| --------------------- | --------------- |
| Chrome and Edge       | 123             |
| Firefox               | 125             |
| Safari and iOS Safari | 17.5            |

The tokens use `light-dark()` and the overlays use the Popover API, which sets these limits. Older browsers are not supported.

## Features that degrade gracefully

| Feature                                    | Needs                                                                | Without it                                                                                                         |
| ------------------------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Anchored position of Popover and Tooltip   | CSS anchor positioning (Chrome and Edge 125, Firefox 147, Safari 26) | Popover appears in the center of the window. Tooltip is not shown, and its text stays available to screen readers. |
| One open item in `Accordion type="single"` | `name` on `<details>`                                                | Behaves like `type="multiple"`.                                                                                    |

Two other points to keep in mind. The object form of a color token (`{ light, dark }`) needs `light-dark()`, so it follows the same minimum versions. And no polyfills are bundled: if you need an older browser, add the ones you need in your app.
