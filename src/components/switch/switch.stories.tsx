import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "../field";
import { Label } from "../label";
import { Switch } from "./switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { "aria-label": "Notifications" }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };

export const WithLabel: Story = {
  args: { "aria-label": undefined },
  render: args => (
    <Field orientation="horizontal">
      <Switch {...args} />
      <Label>Notifications</Label>
    </Field>
  )
};
