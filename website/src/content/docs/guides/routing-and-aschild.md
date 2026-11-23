---
title: Routing and asChild
description: Render components as your own elements, such as router links.
sidebar:
  order: 3
---

Some components render a default element (`Button` renders a `<button>`). With `asChild`, they render their props onto the element you pass instead. This is how you make a button-looking link that works with your router.

## Router links

```tsx
// Next.js
import Link from "next/link";
import { Button } from "vitryla-ui";

<Button asChild>
  <Link href="/pricing">Pricing</Link>
</Button>;
```

```tsx
// React Router
import { NavLink } from "react-router";
import { Button } from "vitryla-ui";

<Button asChild variant="secondary">
  <NavLink to="/pricing">Pricing</NavLink>
</Button>;
```

`Link` supports `asChild` too, in the same way.

## Where asChild is available

`Button`, `Link`, `DialogTrigger`, `DialogClose`, `PopoverTrigger` and `PopoverClose`. `TooltipTrigger` always works this way: it wraps a single focusable element.

## How props are merged

- `className` and `style` are combined.
- Event handlers from both are called, yours first.
- For any other prop, the value on your element wins.
- Refs are combined.

## Requirements for the child

- It must be a single element, not text and not a fragment.
- It must pass its props and `ref` to a DOM element. Router links do, and so does a component you write with `ComponentProps<'a'>`.

## Disabled links

A link cannot be `disabled`. `aria-disabled="true"` dims it, but it still navigates. If an action is unavailable, render a disabled `Button` instead of a link.
