---
title: Forms
description: Build accessible forms with Field, and handle validation.
sidebar:
  order: 2
---

## Field

`Field` wraps one control with its label, description and error. It generates the ids and sets `aria-describedby`, `aria-invalid`, `required` and `disabled` on the control, so you do not write them yourself.

```tsx
<Field invalid={Boolean(error)} required>
  <Label>Email</Label>
  <Input name="email" type="email" />
  <FieldDescription>We never share your email.</FieldDescription>
  <FieldError>{error}</FieldError>
</Field>
```

- `FieldError` renders only when the field is `invalid`.
- `required` adds a visual marker to the label and the `required` attribute to the control.
- `disabled` disables the control and dims the label.

Do not set `id` on the control inside a `Field`: the field links the label to it by its own id.

## Supported controls

`Input`, `Textarea`, `Select` and `Combobox` work inside `Field` with no extra code. For `Checkbox`, `Switch` and `Radio`, place the control first and the label next to it:

```tsx
<Field orientation="horizontal">
  <Checkbox name="terms" />
  <Label>I accept the terms</Label>
  <FieldDescription>You can change this later in settings.</FieldDescription>
</Field>
```

For a group of radios, use a native `fieldset` with a `legend`, and give each radio its own `Field`:

```tsx
<fieldset>
  <legend>Plan</legend>
  <Field orientation="horizontal">
    <Radio name="plan" value="free" defaultChecked />
    <Label>Free</Label>
  </Field>
  <Field orientation="horizontal">
    <Radio name="plan" value="pro" />
    <Label>Pro</Label>
  </Field>
</fieldset>
```

## A complete example

```tsx
import { useState, type FormEvent } from "react";
import {
  Button,
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "vitryla-ui";

const countries = [
  { value: "ua", label: "Ukraine" },
  { value: "pl", label: "Poland" },
  { value: "de", label: "Germany" }
];

export function SignUpForm() {
  const [emailError, setEmailError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!String(data.get("email")).includes("@")) {
      setEmailError("Enter a valid email address.");
      return;
    }

    setEmailError("");
    // send the data to your server
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field invalid={Boolean(emailError)} required>
        <Label>Email</Label>
        <Input name="email" type="email" />
        <FieldDescription>We never share your email.</FieldDescription>
        <FieldError>{emailError}</FieldError>
      </Field>

      <Field>
        <Label>Country</Label>
        <Select name="country" items={countries}>
          <SelectTrigger placeholder="Select a country" />
          <SelectContent>
            {countries.map(country => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field orientation="horizontal">
        <Checkbox name="terms" />
        <Label>I accept the terms</Label>
      </Field>

      <Button type="submit">Create account</Button>
    </form>
  );
}
```

## Select and Combobox

- Pass `items` as `{ value, label }` objects to `Select` and `Combobox`. Without `items`, `Select` shows the raw value instead of the label.
- `Select` takes a `name`, so its value is part of the form data.
- The list in `Combobox` is a function that renders one item, which lets it filter the items for you:

```tsx
<Combobox items={fruits}>
  <ComboboxInput placeholder="Search for a fruit" />
  <ComboboxContent>
    <ComboboxEmpty>No fruits found.</ComboboxEmpty>
    <ComboboxList>
      {fruit => (
        <ComboboxItem key={fruit.value} value={fruit}>
          {fruit.label}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

`Combobox` accepts only values from the list. Control its value with `value` and `onValueChange`.
