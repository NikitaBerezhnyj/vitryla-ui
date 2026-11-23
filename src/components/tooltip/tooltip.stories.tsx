import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  render: () => (
    <div style={{ padding: "4rem 8rem" }}>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="secondary">Save</Button>
        </TooltipTrigger>
        <TooltipContent>Save your changes</TooltipContent>
      </Tooltip>
    </div>
  )
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShowsOnHover: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Save" });

    await expect(trigger).toHaveAccessibleDescription("Save your changes");

    await userEvent.hover(trigger);
    const tooltip = await canvas.findByRole("tooltip");
    await expect(tooltip).toBeVisible();

    await userEvent.unhover(trigger);
    await waitFor(() => expect(tooltip).not.toBeVisible());
  }
};

export const DismissesOnEscape: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.hover(canvas.getByRole("button", { name: "Save" }));
    const tooltip = await canvas.findByRole("tooltip");
    await expect(tooltip).toBeVisible();

    await userEvent.keyboard("{Escape}");

    await waitFor(() => expect(tooltip).not.toBeVisible());
  }
};

export const ShowsOnKeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.tab();

    await expect(await canvas.findByRole("tooltip")).toBeVisible();
  }
};
