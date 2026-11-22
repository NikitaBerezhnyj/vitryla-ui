import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../input";
import { Label } from "../label";
import { Field, FieldDescription, FieldError } from "./field";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  render: args => (
    <Field {...args}>
      <Label>Email</Label>
      <Input type="email" placeholder="you@example.com" />
      <FieldDescription>We never share your email.</FieldDescription>
      <FieldError>Enter a valid email address.</FieldError>
    </Field>
  )
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Required: Story = { args: { required: true } };
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true } };
