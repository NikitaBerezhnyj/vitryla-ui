import { createRef } from "react";
import { mergeRefs } from "./merge-refs";

describe("mergeRefs", () => {
  it("assigns the element to both object and callback refs", () => {
    const objectRef = createRef<HTMLDivElement>();
    const callbackRef = vi.fn();
    const node = document.createElement("div");

    mergeRefs(objectRef, callbackRef)(node);

    expect(objectRef.current).toBe(node);
    expect(callbackRef).toHaveBeenCalledWith(node);
  });

  it("ignores undefined and null refs", () => {
    const node = document.createElement("div");
    expect(() => mergeRefs(undefined, null)(node)).not.toThrow();
  });
});
