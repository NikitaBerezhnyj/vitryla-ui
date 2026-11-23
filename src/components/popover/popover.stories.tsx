import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../button";
import { Heading } from "../heading";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./popover";

const meta = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  render: () => (
    <div style={{ padding: "4rem 8rem" }}>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Open popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Heading level={3} size="md">
              Dimensions
            </Heading>
            <p style={{ margin: 0 }}>Set the dimensions for the layer.</p>
            <PopoverClose asChild>
              <Button variant="secondary" size="sm">
                Close
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpensAndClosesWithButtons: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const content = canvas.getByText("Set the dimensions for the layer.");

    await expect(content).not.toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "Open popover" }));
    await waitFor(() => expect(content).toBeVisible());

    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(content).not.toBeVisible());
  }
};
