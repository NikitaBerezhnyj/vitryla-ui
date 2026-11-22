import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Radio } from "./radio";

function Plans() {
  return (
    <fieldset>
      <legend>Plan</legend>
      <Radio name="plan" value="free" aria-label="Free" />
      <Radio name="plan" value="pro" aria-label="Pro" />
    </fieldset>
  );
}

describe("Radio", () => {
  it("selects only one option within the same name", async () => {
    render(<Plans />);
    await userEvent.click(screen.getByRole("radio", { name: "Free" }));
    await userEvent.click(screen.getByRole("radio", { name: "Pro" }));
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Free" })).not.toBeChecked();
  });

  it("moves the selection with arrow keys", async () => {
    render(<Plans />);
    await userEvent.tab();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
  });

  it("exposes the group name from the legend", () => {
    render(<Plans />);
    expect(screen.getByRole("group", { name: "Plan" })).toBeInTheDocument();
  });
});
