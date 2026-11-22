import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, FieldDescription } from "../field";
import { Label } from "../label";
import { Checkbox } from "./checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { "aria-label": "Accept terms" }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true } };
export const Disabled: Story = { args: { disabled: true } };

export const WithLabel: Story = {
  args: { "aria-label": undefined },
  render: args => (
    <Field orientation="horizontal">
      <Checkbox {...args} />
      <Label>Accept terms</Label>
      <FieldDescription>You can change this later in settings.</FieldDescription>
    </Field>
  )
};
