import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  render: args => (
    <Accordion {...args}>
      <AccordionItem>
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It is built on native details elements.</AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>Can I style it?</AccordionTrigger>
        <AccordionContent>Yes. Override the CSS variables or the classes.</AccordionContent>
      </AccordionItem>
      <AccordionItem>
        <AccordionTrigger>Does it need JavaScript?</AccordionTrigger>
        <AccordionContent>No. Opening and closing is handled by the browser.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Multiple: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByText("Is it accessible?").closest("details");
    const second = canvas.getByText("Can I style it?").closest("details");

    await userEvent.click(canvas.getByText("Is it accessible?"));
    await userEvent.click(canvas.getByText("Can I style it?"));

    await expect(first).toHaveAttribute("open");
    await expect(second).toHaveAttribute("open");
  }
};

export const Single: Story = {
  args: { type: "single" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByText("Is it accessible?").closest("details");
    const second = canvas.getByText("Can I style it?").closest("details");

    await userEvent.click(canvas.getByText("Is it accessible?"));
    await userEvent.click(canvas.getByText("Can I style it?"));

    await waitFor(() => expect(first).not.toHaveAttribute("open"));
    await expect(second).toHaveAttribute("open");
  }
};
