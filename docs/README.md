# Vitryla UI

A React UI kit with composable primitives, theming and accessibility defaults.

- **Native first.** Dialog, Accordion and Popover are built on `<dialog>`, `<details>` and the Popover API.
- **Composable.** Components are made of small parts that you can assemble into your own.
- **Themeable.** Change a few tokens, or switch between light, dark and system themes.
- **Accessible by default.** Labels, descriptions, errors and keyboard support work out of the box.

## Installation

```sh
npm install vitryla-ui react react-dom
```

Vitryla UI requires React 19 or newer. It is published as ESM and includes TypeScript types.

## Setup

Import the styles once at the entry point of your app, and wrap the app in `VitrylaProvider`:

```tsx
import "vitryla-ui/styles.css";
import { Button, VitrylaProvider } from "vitryla-ui";

export function App() {
  return (
    <VitrylaProvider>
      <Button>Hello</Button>
    </VitrylaProvider>
  );
}
```

In Next.js, put the provider in your root layout. Components include the `"use client"` directive, so you can import them from Server Components.

## Forms

`Field` connects a label, a description and an error to the control inside it, including `aria-describedby`, `aria-invalid`, `required` and `disabled`:

```tsx
import { Field, FieldDescription, FieldError, Input, Label } from "vitryla-ui";

<Field invalid={Boolean(error)}>
  <Label>Email</Label>
  <Input type="email" />
  <FieldDescription>We never share your email.</FieldDescription>
  <FieldError>{error}</FieldError>
</Field>;
```

## Composition

Components are built from parts. For example, a dialog:

```tsx
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "vitryla-ui";

<Dialog>
  <DialogTrigger asChild>
    <Button>Edit profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle>Edit profile</DialogTitle>
    <DialogDescription>Make changes to your profile here.</DialogDescription>
    <DialogClose asChild>
      <Button variant="secondary">Cancel</Button>
    </DialogClose>
  </DialogContent>
</Dialog>;
```

`asChild` renders the props onto your own element, for example a router link, instead of the default one.

## Theming

Pass the tokens you want to change to the provider. A color is a string, or an object with a `light` and a `dark` value:

```tsx
<VitrylaProvider
  defaultTheme="system"
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

`theme` can be `light`, `dark` or `system`. Use the `useTheme()` hook to read or change it from a component. The provider does not store the theme, so keep it yourself if you need it to persist.

All tokens are also CSS variables (for example `--vitryla-color-primary`). The library styles live in CSS layers, so your own unlayered CSS always wins.

## Components

Accordion, Badge, Button, Checkbox, Combobox, Dialog, Field, Heading, Input, Label, Link, Popover, Radio, Select, Spinner, Switch, Tabs, Textarea, Tooltip, and VitrylaProvider.

## Accessibility notes

- Inside `Field`, a `Label` names the control. Outside it, give `SelectTrigger` and `ComboboxInput` an `aria-label`.
- Use `DialogTitle` in every `DialogContent`.
- Built-in texts can be translated: `ComboboxInput` takes `clearLabel` and `triggerLabel`, and `Spinner` takes `label`.
- Do not put essential information in a `Tooltip`.

## Browser support

Vitryla UI targets evergreen browsers released since spring 2024:

| Browser               | Minimum version |
| --------------------- | --------------- |
| Chrome and Edge       | 123             |
| Firefox               | 125             |
| Safari and iOS Safari | 17.5            |

Anchored positioning of `Popover` and `Tooltip` needs CSS anchor positioning (Chrome and Edge 125, Firefox 147, Safari 26). Without it, `Popover` appears in the center of the window and `Tooltip` is not shown, while its text stays available to screen readers. No polyfills are bundled.
