---
title: Dialogs, popovers and tooltips
description: Choose the right overlay and learn how each one behaves.
sidebar:
  order: 4
---

## Which one to use

| Component        | Use it for                                                  | Notes                                |
| ---------------- | ----------------------------------------------------------- | ------------------------------------ |
| Dialog           | A task that needs the user's full attention                 | Modal: the rest of the page is inert |
| Popover          | A small panel with interactive content, next to its trigger | Closes on outside click and `Esc`    |
| Tooltip          | A short, non-essential hint                                 | Shown on hover and keyboard focus    |
| Select, Combobox | Choosing a value from a list                                | Open their own popup                 |

## Dialog

```tsx
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
</Dialog>
```

- Always include `DialogTitle`: it names the dialog for assistive technology. `DialogDescription` is optional.
- The dialog closes with `Esc`, a click on the backdrop, or a `DialogClose` button. Focus returns to the trigger.
- To control it from your own state, pass `open` and `onOpenChange`:

```tsx
const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogTitle>Saved</DialogTitle>
    <DialogClose asChild>
      <Button>OK</Button>
    </DialogClose>
  </DialogContent>
</Dialog>;
```

- The page behind the dialog can still scroll: native modal dialogs do not lock it.
- `Select` and `Combobox` work inside a dialog: their lists open inside it.

## Popover

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button>Dimensions</Button>
  </PopoverTrigger>
  <PopoverContent role="dialog" aria-label="Dimensions">
    <p>Set the dimensions for the layer.</p>
    <PopoverClose asChild>
      <Button size="sm" variant="secondary">
        Close
      </Button>
    </PopoverClose>
  </PopoverContent>
</Popover>
```

- If the content is a group of controls, give it a role and a name, as above.
- The browser manages opening and closing, so a popover has no `open` prop yet.
- Do not put `Select` or `Combobox` inside a popover: choosing an option counts as a click outside and closes it.

## Tooltip

```tsx
<Tooltip>
  <TooltipTrigger>
    <Button variant="secondary">Save</Button>
  </TooltipTrigger>
  <TooltipContent>Save your changes</TooltipContent>
</Tooltip>
```

- It wraps a single focusable element and links to it with `aria-describedby`.
- It appears after a short hover delay, or immediately on keyboard focus. `Esc` hides it, and you can move the pointer onto it without it disappearing.
- It does not appear on touch screens or on disabled buttons.
- Keep the text short and never put essential information or interactive elements in it.
