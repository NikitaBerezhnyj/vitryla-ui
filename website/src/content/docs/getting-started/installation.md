---
title: Installation
description: Install Vitryla UI and set it up in a React project.
sidebar:
  order: 1
---

## Requirements

- React 19 or newer
- A modern browser, see [Browser support](../../guides/browser-support/)

## Install

```sh
npm install vitryla-ui react react-dom
```

## Set up

Import the styles once, at the entry point of your app, and wrap the app in `VitrylaProvider`:

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

The provider applies the theme and your token overrides. Popups such as Select and Combobox render inside it, so they keep the same theme.

## A first form

Field connects a label, a description and an error to the control inside it. You do not need to write ids or `aria-*` attributes yourself.

```tsx
import { Field, FieldDescription, FieldError, Input, Label } from "vitryla-ui";

<Field invalid={Boolean(error)}>
  <Label>Email</Label>
  <Input type="email" />
  <FieldDescription>We never share your email.</FieldDescription>
  <FieldError>{error}</FieldError>
</Field>;
```

## Next.js

Components ship with the `"use client"` directive, so you can import them from Server Components. Put `VitrylaProvider` in your root layout.

The provider does not store the chosen theme. Keep it yourself (for example in a cookie or `localStorage`) and pass it with the `theme` or `defaultTheme` prop.
