import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Field } from "../field";
import { Label } from "../label";
import { Switch } from "./switch";

describe("Switch", () => {
  it("exposes the switch role", () => {
    render(<Switch aria-label="Wi-Fi" />);
    expect(screen.getByRole("switch", { name: "Wi-Fi" })).toBeInTheDocument();
  });

  it("toggles when clicked", async () => {
    render(<Switch aria-label="Wi-Fi" />);
    const toggle = screen.getByRole("switch");
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
  });

  it("takes its name from the Label inside Field", () => {
    render(
      <Field orientation="horizontal">
        <Switch />
        <Label>Notifications</Label>
      </Field>
    );
    expect(screen.getByRole("switch", { name: "Notifications" })).toBeInTheDocument();
  });
});
