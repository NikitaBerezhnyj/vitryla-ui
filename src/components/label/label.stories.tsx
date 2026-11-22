import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../input";
import { Label } from "./label";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  args: { children: "Email" }
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
  render: args => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <Label {...args} htmlFor="label-story-email" />
      <Input id="label-story-email" type="email" />
    </div>
  )
};
