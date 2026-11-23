import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../button";
import { Field } from "../field";
import { Input } from "../input";
import { Label } from "../label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "./dialog";

async function openDialog(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: "Open dialog" }));
  return canvas.findByRole("dialog", { name: "Edit profile" });
}

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: { onOpenChange: fn() },
  render: args => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Make changes to your profile here.</DialogDescription>
        <Field>
          <Label>Name</Label>
          <Input defaultValue="Jane Doe" />
        </Field>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Save</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpensAndClosesWithButtons: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const dialog = await openDialog(canvasElement);

    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAccessibleDescription("Make changes to your profile here.");
    await expect(args.onOpenChange).toHaveBeenCalledWith(true);

    await userEvent.click(canvas.getByRole("button", { name: "Cancel" }));

    await waitFor(() => expect(dialog).not.toBeVisible());
    await expect(args.onOpenChange).toHaveBeenLastCalledWith(false);
  }
};

export const ClosesOnBackdropClick: Story = {
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement);

    await userEvent.click(dialog);

    await waitFor(() => expect(dialog).not.toBeVisible());
  }
};

export const ClosesOnCancelEvent: Story = {
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement);

    // The browser fires `cancel` when Escape is pressed
    dialog.dispatchEvent(new Event("cancel", { cancelable: true }));

    await waitFor(() => expect(dialog).not.toBeVisible());
  }
};

function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open controlled dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Controlled dialog</DialogTitle>
          <DialogDescription>Its state lives in the parent component.</DialogDescription>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Open controlled dialog" }));
    const dialog = await canvas.findByRole("dialog", { name: "Controlled dialog" });

    await userEvent.click(canvas.getByRole("button", { name: "Close" }));

    await waitFor(() => expect(dialog).not.toBeVisible());
  }
};
