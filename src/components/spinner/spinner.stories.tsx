import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"]
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: args => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      {(["sm", "md", "lg"] as const).map(size => (
        <Spinner key={size} {...args} size={size} />
      ))}
    </div>
  )
};
