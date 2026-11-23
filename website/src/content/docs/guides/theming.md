---
title: Theming
description: Change colors, radii and fonts, and switch between light and dark themes.
sidebar:
  order: 1
---

## Override tokens

All visual values are CSS variables called tokens. Pass the ones you want to change to `VitrylaProvider`:

```tsx
<VitrylaProvider
  tokens={{
    color: {
      primary: { light: "#db2777", dark: "#f472b6" },
      primaryForeground: { light: "#ffffff", dark: "#1a0f14" }
    },
    radius: { md: "12px" }
  }}
>
  <App />
</VitrylaProvider>
```

A color is either a string, used in both themes, or an object with a `light` and a `dark` value. When you change a color, check that text on top of it still has enough contrast (4.5:1 for regular text).

## Available tokens

| Group  | Token               | CSS variable                                 |
| ------ | ------------------- | -------------------------------------------- |
| color  | `background`        | `--vitryla-color-background`                 |
| color  | `foreground`        | `--vitryla-color-foreground`                 |
| color  | `muted`             | `--vitryla-color-muted`                      |
| color  | `mutedForeground`   | `--vitryla-color-muted-foreground`           |
| color  | `border`            | `--vitryla-color-border`                     |
| color  | `inputBorder`       | `--vitryla-color-input-border`               |
| color  | `primary`           | `--vitryla-color-primary`                    |
| color  | `primaryForeground` | `--vitryla-color-primary-foreground`         |
| color  | `danger`            | `--vitryla-color-danger`                     |
| color  | `dangerForeground`  | `--vitryla-color-danger-foreground`          |
| color  | `focusRing`         | `--vitryla-color-focus-ring`                 |
| radius | `sm`, `md`, `lg`    | `--vitryla-radius-sm`, `-md`, `-lg`          |
| font   | `sans`, `mono`      | `--vitryla-font-sans`, `--vitryla-font-mono` |

Keep `inputBorder` at least 3:1 against the background: it is the visible edge of form fields.

## Light, dark and system themes

```tsx
<VitrylaProvider defaultTheme="system">
```

`theme` can be `light`, `dark` or `system`. With `system`, the browser decides and there is no flash on load. Use `theme` with `onThemeChange` for a controlled theme, or `useTheme()` to change it from a component:

```tsx
import { useTheme } from "vitryla-ui";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Toggle theme</button>
  );
}
```

## Override with plain CSS

The library styles live in CSS layers (`vitryla.tokens`, `vitryla.base`, `vitryla.components`). Your own unlayered CSS always wins, so you do not need to fight specificity:

```css
:root {
  --vitryla-color-primary: #0f766e;
}

/* Variants and sizes are exposed as data attributes */
.vitryla-button[data-variant="primary"] {
  --vitryla-button-bg: #0f766e;
}
```
