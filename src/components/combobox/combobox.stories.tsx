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
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "./combobox";

interface Fruit {
  value: string;
  label: string;
}

const fruits: Fruit[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" }
];

function FruitCombobox() {
  return (
    <Combobox items={fruits}>
      <ComboboxInput placeholder="Search for a fruit" />
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

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  tags: ["autodocs"]
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <Field>
        <Label>Fruit</Label>
        <FruitCombobox />
        <FieldDescription>Start typing to filter.</FieldDescription>
      </Field>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "Fruit" });

    await expect(input).toHaveAccessibleDescription("Start typing to filter.");

    await userEvent.click(input);
    await userEvent.type(input, "ban");

    const banana = await canvas.findByRole("option", { name: "Banana" });
    await expect(canvas.queryByRole("option", { name: "Apple" })).not.toBeInTheDocument();

    await userEvent.click(banana);

    await waitFor(() => expect(input).toHaveValue("Banana"));
  }
};

export const NoResults: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <Field>
        <Label>Fruit</Label>
        <FruitCombobox />
      </Field>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "Fruit" });

    await userEvent.click(input);
    await userEvent.type(input, "zzz");

    await expect(await canvas.findByText("No fruits found.")).toBeVisible();
  }
};

export const Invalid: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <Field invalid>
        <Label>Fruit</Label>
        <FruitCombobox />
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
        <FruitCombobox />
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
        <DialogDescription>The list opens inside the dialog.</DialogDescription>
        <Field>
          <Label>Fruit</Label>
          <FruitCombobox />
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
    const input = within(dialog).getByRole("combobox", { name: "Fruit" });

    await userEvent.click(input);
    await userEvent.type(input, "che");
    const option = await canvas.findByRole("option", { name: "Cherry" });
    await expect(dialog).toContainElement(option);

    await userEvent.click(option);

    await waitFor(() => expect(input).toHaveValue("Cherry"));
    await expect(dialog).toBeVisible();
  }
};
