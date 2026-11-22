import { render, screen } from "@testing-library/react";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("exposes a status role with the default label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
  });

  it("uses a custom label", () => {
    render(<Spinner label="Saving" />);
    expect(screen.getByRole("status")).toHaveTextContent("Saving");
  });

  it("sets the size as a data attribute", () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole("status")).toHaveAttribute("data-size", "lg");
  });
});
