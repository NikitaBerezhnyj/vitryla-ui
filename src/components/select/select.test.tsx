import { render, screen } from "@testing-library/react";
import { Field, FieldDescription, FieldError } from "../field";
import { Label } from "../label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" }
];

function FruitSelect({ defaultValue }: { defaultValue?: string }) {
  return (
    <Select items={fruits} defaultValue={defaultValue}>
      <SelectTrigger placeholder="Select a fruit" />
      <SelectContent>
        {fruits.map(fruit => (
          <SelectItem key={fruit.value} value={fruit.value}>
            {fruit.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("shows the placeholder when nothing is selected", () => {
    render(
      <Select items={fruits}>
        <SelectTrigger aria-label="Fruit" placeholder="Select a fruit" />
      </Select>
    );
    expect(screen.getByRole("combobox", { name: "Fruit" })).toHaveTextContent("Select a fruit");
  });

  it("shows the label of the selected item", () => {
    render(
      <Select items={fruits} defaultValue="banana">
        <SelectTrigger aria-label="Fruit" />
      </Select>
    );
    expect(screen.getByRole("combobox", { name: "Fruit" })).toHaveTextContent("Banana");
  });

  it("takes its name from Label and its description from FieldDescription inside Field", () => {
    render(
      <Field>
        <Label>Fruit</Label>
        <FruitSelect />
        <FieldDescription>Pick your favorite</FieldDescription>
      </Field>
    );
    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    expect(trigger).toHaveAccessibleDescription("Pick your favorite");
  });

  it("marks the trigger as invalid when the Field is invalid", () => {
    render(
      <Field invalid>
        <Label>Fruit</Label>
        <FruitSelect />
        <FieldError>Choose a fruit</FieldError>
      </Field>
    );
    expect(screen.getByRole("combobox", { name: "Fruit" })).toBeInvalid();
  });

  it("is disabled when the Field is disabled", () => {
    render(
      <Field disabled>
        <Label>Fruit</Label>
        <FruitSelect />
      </Field>
    );
    expect(screen.getByRole("combobox", { name: "Fruit" })).toHaveAttribute("data-disabled");
  });
});
