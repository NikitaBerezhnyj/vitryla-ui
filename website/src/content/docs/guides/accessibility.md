---
title: Accessibility
description: What Vitryla UI does for you, and what is still up to you.
sidebar:
  order: 2
---

## What is built in

- **Forms.** `Field` links the label, description and error to the control, and sets `aria-describedby`, `aria-invalid`, `required` and `disabled` for you. `Input`, `Textarea`, `Checkbox`, `Switch`, `Radio`, `Select` and `Combobox` all use it.
- **Native elements.** Dialog uses `<dialog>`, Accordion uses `<details>` and Popover uses the Popover API, so focus, `Esc` and screen reader support come from the browser.
- **Keyboard.** Tabs follow the WAI-ARIA tabs pattern (arrow keys, `Home`, `End`). Select and Combobox are built on Base UI, which handles keyboard navigation and focus.
- **Focus.** Every interactive element shows a visible focus ring based on `:focus-visible`.
- **Motion and contrast.** Animations are removed when the user prefers reduced motion. Colors keep the contrast ratios required by WCAG AA, and form fields have a visible border. Forced colors mode is supported.
- **Document structure.** `Heading` separates the semantic level (`level`) from the visual size (`size`), so you can keep a correct outline.

## What you still need to do

- **Give Select and Combobox a name.** Inside `Field` the `Label` does it. Outside, pass `aria-label` to `SelectTrigger` or `ComboboxInput`.
- **Title your dialogs.** Use `DialogTitle` in every `DialogContent`. It gives the dialog its accessible name.
- **Translate built-in text.** `ComboboxInput` accepts `clearLabel` and `triggerLabel`, and `Spinner` accepts `label`.
- **Do not put essential information in a Tooltip.** Keep it short and plain: it is supplementary, and it does not appear on touch devices.
- **Test with real assistive technology.** Storybook runs automated checks, and they catch only part of the problems.
