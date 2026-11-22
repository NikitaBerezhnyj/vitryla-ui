import { render, screen } from "@testing-library/react";
import { Heading } from "./heading";

describe("Heading", () => {
  it("renders the heading element for the given level", () => {
    render(<Heading level={2}>Title</Heading>);
    expect(screen.getByRole("heading", { level: 2, name: "Title" })).toBeInTheDocument();
  });

  it("derives the default size from the level", () => {
    render(<Heading level={1}>Title</Heading>);
    expect(screen.getByRole("heading")).toHaveAttribute("data-size", "2xl");
  });

  it("keeps the visual size independent from the level", () => {
    render(
      <Heading level={2} size="sm">
        Title
      </Heading>
    );
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveAttribute("data-size", "sm");
  });
});
