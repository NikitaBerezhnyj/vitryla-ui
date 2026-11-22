import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./heading";

const meta = {
  title: "Components/Heading",
  component: Heading,
  tags: ["autodocs"],
  args: { level: 2, children: "Section title" }
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Levels: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {([1, 2, 3, 4, 5, 6] as const).map(level => (
        <Heading key={level} level={level}>
          Heading level {level}
        </Heading>
      ))}
    </div>
  )
};

export const SizeIndependentOfLevel: Story = {
  render: () => (
    <Heading level={2} size="sm">
      An h2 that looks small
    </Heading>
  )
};
