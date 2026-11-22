import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Button" }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: args => (
    <div style={{ display: "flex", gap: 8 }}>
      {(["primary", "secondary", "ghost", "danger"] as const).map(variant => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  )
};

export const Sizes: Story = {
  render: args => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {(["sm", "md", "lg"] as const).map(size => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  )
};

export const Disabled: Story = { args: { disabled: true } };

export const AsLink: Story = {
  render: args => (
    <Button {...args} asChild>
      <a href="#docs">Link styled as a button</a>
    </Button>
  )
};
