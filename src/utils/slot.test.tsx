import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Slot } from "./slot";

describe("Slot", () => {
  it("passes props to its child element", () => {
    render(
      <Slot aria-label="slot-label" data-slot="yes">
        <button>Click</button>
      </Slot>
    );
    const button = screen.getByRole("button", { name: "slot-label" });
    expect(button).toHaveAttribute("data-slot", "yes");
  });

  it("merges className and style props", () => {
    render(
      <Slot className="from-slot" style={{ color: "red", margin: 1 }}>
        <button className="from-child" style={{ color: "blue" }}>
          Click
        </button>
      </Slot>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("from-slot", "from-child");
    expect(button).toHaveStyle({ color: "rgb(0, 0, 255)", margin: "1px" });
  });

  it("calls event handlers in order: child first, then slot", async () => {
    const calls: string[] = [];
    render(
      <Slot onClick={() => calls.push("slot")}>
        <button onClick={() => calls.push("child")}>Click</button>
      </Slot>
    );
    await userEvent.click(screen.getByRole("button"));
    expect(calls).toEqual(["child", "slot"]);
  });

  it("merges the slot and child refs", () => {
    const slotRef = createRef<HTMLElement>();
    const childRef = createRef<HTMLButtonElement>();
    render(
      <Slot ref={slotRef}>
        <button ref={childRef}>Click</button>
      </Slot>
    );
    const button = screen.getByRole("button");
    expect(slotRef.current).toBe(button);
    expect(childRef.current).toBe(button);
  });

  it("throws an error when the child is not a valid React element", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Slot>Plain text</Slot>)).toThrow(/Slot/);
    spy.mockRestore();
  });
});
