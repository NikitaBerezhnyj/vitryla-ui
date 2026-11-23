import { render, screen } from "@testing-library/react";
import { Field, FieldDescription, FieldError } from "../field";
import { Label } from "../label";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  type ComboboxInputProps
} from "./combobox";

interface Fruit {
  value: string;
  label: string;
}

const apple: Fruit = { value: "apple", label: "Apple" };
const banana: Fruit = { value: "banana", label: "Banana" };
const fruits = [apple, banana];

function FruitCombobox({
  defaultValue,
  ...inputProps
}: { defaultValue?: Fruit } & ComboboxInputProps) {
  return (
    <Combobox items={fruits} defaultValue={defaultValue}>
      <ComboboxInput {...inputProps} />
      <ComboboxContent>
        <ComboboxEmpty>No fruits found.</ComboboxEmpty>
        <ComboboxList>
          {(fruit: Fruit) => (
            <ComboboxItem key={fruit.value} value={fruit}>
              {fruit.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

describe("Combobox", () => {
  it("shows the label of the selected item in the input", () => {
    render(<FruitCombobox aria-label="Fruit" defaultValue={banana} />);
    expect(screen.getByRole("combobox", { name: "Fruit" })).toHaveValue("Banana");
  });

  it("takes its name from Label and its description from FieldDescription inside Field", () => {
    render(
      <Field>
        <Label>Fruit</Label>
        <FruitCombobox />
        <FieldDescription>Start typing to filter</FieldDescription>
      </Field>
    );
    expect(screen.getByRole("combobox", { name: "Fruit" })).toHaveAccessibleDescription(
      "Start typing to filter"
    );
  });

  it("marks the input as invalid when the Field is invalid", () => {
    render(
      <Field invalid>
        <Label>Fruit</Label>
        <FruitCombobox />
        <FieldError>Choose a fruit</FieldError>
      </Field>
    );
    expect(screen.getByRole("combobox", { name: "Fruit" })).toBeInvalid();
  });

  it("is disabled when the Field is disabled", () => {
    render(
      <Field disabled>
        <Label>Fruit</Label>
        <FruitCombobox />
      </Field>
    );
    expect(screen.getByRole("combobox", { name: "Fruit" })).toBeDisabled();
  });

  it("uses custom accessible names for the clear and open buttons", () => {
    render(
      <FruitCombobox
        aria-label="Fruit"
        defaultValue={apple}
        clearLabel="Reset fruit"
        triggerLabel="Show fruits"
      />
    );
    expect(screen.getByRole("button", { name: "Reset fruit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show fruits" })).toBeInTheDocument();
  });
});
