import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('defaults to type="button"', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("can be activated using the keyboard", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("asChild renders the child element instead of a button", async () => {
    const onClick = vi.fn();
    render(
      <Button asChild onClick={onClick}>
        <a href="#docs">Docs</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: "Docs" });
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(link).not.toHaveAttribute("type");

    await userEvent.click(link);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
