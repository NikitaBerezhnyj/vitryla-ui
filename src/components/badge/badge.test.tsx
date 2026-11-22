import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("uses the neutral variant by default", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toHaveAttribute("data-variant", "neutral");
  });

  it("sets the variant as a data attribute", () => {
    render(<Badge variant="danger">Failed</Badge>);
    expect(screen.getByText("Failed")).toHaveAttribute("data-variant", "danger");
  });
});
