import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("викликає onClick по кліку", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('за замовчуванням type="button"', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("активується з клавіатури", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
  });
});
