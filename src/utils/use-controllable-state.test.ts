import { act, renderHook } from "@testing-library/react";
import { useControllableState } from "./use-controllable-state";

describe("useControllableState", () => {
  it("updates internal state and calls onChange when uncontrolled", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: "a", onChange }));

    act(() => result.current[1]("b"));

    expect(result.current[0]).toBe("b");
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("does not update its value internally and only calls onChange when controlled", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({ value: "a", defaultValue: "x", onChange })
    );

    act(() => result.current[1]("b"));

    expect(result.current[0]).toBe("a");
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("does not call onChange when the value remains unchanged", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: "a", onChange }));

    act(() => result.current[1]("a"));

    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 1 }));

    act(() => result.current[1](prev => prev + 1));

    expect(result.current[0]).toBe(2);
  });
});
