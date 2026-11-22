import { render, screen } from "@testing-library/react";
import { Input } from "../input";
import { Label } from "./label";

describe("Label", () => {
  it("associates with a control via htmlFor outside of Field", () => {
    render(
      <>
        <Label htmlFor="name">Name</Label>
        <Input id="name" />
      </>
    );
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
  });
});
