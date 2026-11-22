import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Field } from "../field";
import { Input } from "./input";

describe("Input", () => {
  it("works without Field", async () => {
    render(<Input aria-label="Name" />);
    const input = screen.getByRole("textbox", { name: "Name" });
    await userEvent.type(input, "Nikita");
    expect(input).toHaveValue("Nikita");
  });

  it("lets explicit props override values from Field", () => {
    render(
      <Field disabled>
        <Input aria-label="Name" disabled={false} />
      </Field>
    );
    expect(screen.getByRole("textbox", { name: "Name" })).toBeEnabled();
  });

  it("merges a custom className with the base class", () => {
    render(<Input aria-label="Name" className="custom" />);
    expect(screen.getByRole("textbox")).toHaveClass("vitryla-input", "custom");
  });
});
