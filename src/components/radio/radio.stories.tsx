import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "../field";
import { Label } from "../label";
import { Radio } from "./radio";

const meta = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  args: { name: "story-radio", "aria-label": "Option" }
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };

export const Group: Story = {
  args: { "aria-label": undefined },
  render: () => (
    <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
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
  )
};
