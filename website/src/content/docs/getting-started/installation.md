---
title: Installation
description: Install Vitryla UI and set it up in a React project.
sidebar:
  order: 1
---

[![npm version](https://img.shields.io/npm/v/vitryla-ui)](https://www.npmjs.com/package/vitryla-ui)

Vitryla UI is published on [npm](https://www.npmjs.com/package/vitryla-ui). It is an ESM package with TypeScript types included.

## Requirements

- React 19 or newer
- A modern browser, see [Browser support](../../guides/browser-support/)

## Install

```sh
# npm
npm install vitryla-ui react react-dom

# pnpm
pnpm add vitryla-ui react react-dom

# yarn
yarn add vitryla-ui react react-dom
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

The library works without the provider too (it falls back to the default tokens and the system theme), but then theme switching, token overrides and themed popups are not available.

## Check that it works

If the button has a dark background with light text (or the reverse in a dark system theme), the styles are loaded. If it looks like a plain browser button, see [Troubleshooting](../../guides/troubleshooting/).

## Next.js

Components ship with the `"use client"` directive, so you can import them from Server Components. Put the style import and `VitrylaProvider` in your root layout.

The provider does not store the chosen theme. Keep it yourself (for example in a cookie or `localStorage`) and pass it with the `theme` or `defaultTheme` prop.

## What to read next

- [Forms](../../guides/forms/) for labels, descriptions, errors and validation
- [Theming](../../guides/theming/) to change colors and switch themes
- [Components](../../reference/components/) for the full list, with links to Storybook
