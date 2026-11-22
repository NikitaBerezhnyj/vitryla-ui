import { render, screen } from "@testing-library/react";
import { Link } from "./link";

describe("Link", () => {
  it("renders an anchor with the given href", () => {
    render(<Link href="/docs">Docs</Link>);
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs");
  });

  it("renders props on the child element when asChild is set", () => {
    render(
      <Link asChild className="custom">
        <a href="/docs">Docs</a>
      </Link>
    );
    expect(screen.getByRole("link", { name: "Docs" })).toHaveClass("vitryla-link", "custom");
  });
});
