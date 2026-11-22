import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "./link";

const meta = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  args: { href: "#docs", children: "Read the docs" }
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InsideText: Story = {
  render: args => (
    <p>
      Vitryla UI is documented in the <Link {...args} /> section.
    </p>
  )
};
