import { render, screen } from "@testing-library/react";
import { Input } from "../input";
import { Label } from "../label";
import { Field, FieldDescription, FieldError } from "./field";

describe("Field", () => {
  it("links the label to the input via a generated id", () => {
    render(
      <Field>
        <Label>Email</Label>
        <Input />
      </Field>
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
  });

  it("links the description to the input with aria-describedby", () => {
    render(
      <Field>
        <Label>Email</Label>
        <Input />
        <FieldDescription>We never share your email</FieldDescription>
      </Field>
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAccessibleDescription(
      "We never share your email"
    );
  });

  it("shows the error and marks the input as invalid when invalid", () => {
    render(
      <Field invalid>
        <Label>Email</Label>
        <Input />
        <FieldDescription>Hint</FieldDescription>
        <FieldError>Email is required</FieldError>
      </Field>
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription("Hint Email is required");
    expect(screen.getByRole("alert")).toHaveTextContent("Email is required");
  });

  it("does not render FieldError when the field is valid", () => {
    render(
      <Field>
        <Label>Email</Label>
        <Input />
        <FieldError>Email is required</FieldError>
      </Field>
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Email" })).toBeValid();
  });

  it("passes required and disabled to the input", () => {
    render(
      <Field required disabled>
        <Label>Email</Label>
        <Input />
      </Field>
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
  });

  it("throws when FieldDescription is used outside of Field", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<FieldDescription>Hint</FieldDescription>)).toThrow(/Field/);
    spy.mockRestore();
  });
});
