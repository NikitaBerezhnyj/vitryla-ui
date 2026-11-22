import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Field } from "../field";
import { Label } from "../label";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("toggles when clicked", async () => {
    render(<Checkbox aria-label="Accept" />);
    const checkbox = screen.getByRole("checkbox", { name: "Accept" });
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("toggles with the Space key", async () => {
    render(<Checkbox aria-label="Accept" />);
    await userEvent.tab();
    await userEvent.keyboard(" ");
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("supports the indeterminate state", () => {
    render(<Checkbox aria-label="Select all" indeterminate />);
    expect(screen.getByRole("checkbox")).toBePartiallyChecked();
  });

  it("is toggled by clicking its label inside Field", async () => {
    render(
      <Field orientation="horizontal">
        <Checkbox />
        <Label>Accept terms</Label>
      </Field>
    );
    await userEvent.click(screen.getByText("Accept terms"));
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeChecked();
  });
});
