import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "../dialog";
import { Field, FieldDescription, FieldError } from "../field";
import { Label } from "../label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "grape", label: "Grape" }
];

function FruitSelect() {
  return (
    <Select items={fruits}>
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

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"]
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <Field>
        <Label>Fruit</Label>
        <FruitSelect />
        <FieldDescription>Pick your favorite.</FieldDescription>
      </Field>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox", { name: "Fruit" });

    await expect(trigger).toHaveAccessibleDescription("Pick your favorite.");

    await userEvent.click(trigger);
    await userEvent.click(await canvas.findByRole("option", { name: "Banana" }));

    await waitFor(() => expect(trigger).toHaveTextContent("Banana"));
  }
};

export const Invalid: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <Field invalid>
        <Label>Fruit</Label>
        <FruitSelect />
        <FieldError>Choose a fruit.</FieldError>
      </Field>
    </div>
  )
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <Field disabled>
        <Label>Fruit</Label>
        <FruitSelect />
      </Field>
    </div>
  )
};

export const InsideDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Favorite fruit</DialogTitle>
        <DialogDescription>The select list opens inside the dialog.</DialogDescription>
        <Field>
          <Label>Fruit</Label>
          <FruitSelect />
        </Field>
        <DialogClose asChild>
          <Button variant="secondary">Done</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Open dialog" }));
    const dialog = await canvas.findByRole("dialog", { name: "Favorite fruit" });
    const trigger = within(dialog).getByRole("combobox", { name: "Fruit" });

    await userEvent.click(trigger);
    const option = await canvas.findByRole("option", { name: "Cherry" });
    await expect(dialog).toContainElement(option);

    await userEvent.click(option);

    await waitFor(() => expect(trigger).toHaveTextContent("Cherry"));
    await expect(dialog).toBeVisible();
  }
};
