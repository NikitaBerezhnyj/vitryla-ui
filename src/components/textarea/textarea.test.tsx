import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Field, FieldDescription } from "../field";
import { Label } from "../label";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("accepts typed text", async () => {
    render(<Textarea aria-label="Bio" />);
    const textarea = screen.getByRole("textbox", { name: "Bio" });
    await userEvent.type(textarea, "Hello");
    expect(textarea).toHaveValue("Hello");
  });

  it("is linked to the label and description inside Field", () => {
    render(
      <Field>
        <Label>Bio</Label>
        <Textarea />
        <FieldDescription>Tell us about yourself</FieldDescription>
      </Field>
    );
    expect(screen.getByRole("textbox", { name: "Bio" })).toHaveAccessibleDescription(
      "Tell us about yourself"
    );
  });
});
