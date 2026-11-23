---
title: Troubleshooting
description: Fixes for the most common problems.
sidebar:
  order: 7
---

## The components look unstyled

Import the stylesheet once at the entry point of your app:

```tsx
import "vitryla-ui/styles.css";
```

In Next.js, put it in the root layout.

## The theme or tokens do not apply to popups

Select and Combobox popups render inside `VitrylaProvider`. If your app is not wrapped in it, they fall back to the default tokens and the system theme. Wrap the whole app, not just a part of it.

## Error: useTheme must be used inside VitrylaProvider

`useTheme()` reads from the provider. Wrap the component tree that calls it in `VitrylaProvider`.

## Select shows a value instead of a label

Pass `items` as `{ value, label }` objects to `Select`.

## A Select or Combobox has no accessible name

Inside a `Field`, the `Label` names it. Outside, give `SelectTrigger` or `ComboboxInput` an `aria-label`.

## A Tooltip never appears

- The trigger must be a single focusable element that accepts event handlers and a `ref`.
- Disabled buttons do not fire pointer events, so a tooltip cannot open on them.
- Browsers without CSS anchor positioning do not show tooltips. See [Browser support](../browser-support/).

## A Popover opens in the middle of the window

The browser does not support CSS anchor positioning yet. See [Browser support](../browser-support/).

## No tab is selected in Tabs

Pass `defaultValue` (or `value`) to `Tabs`, and the same `value` to the matching `TabsTrigger` and `TabsContent`.

## The theme resets on reload

The provider does not store the theme. Save it yourself and pass it back with `theme` or `defaultTheme`.

## Known limitations

- `Select` and `Combobox` cannot be used inside a `Popover`.
- `Popover` cannot be opened from your own state.
- Combobox supports a single value only.
- The page behind an open `Dialog` is not scroll-locked.

Found something else? [Open an issue](https://github.com/NikitaBerezhnyj/vitryla-ui/issues).
