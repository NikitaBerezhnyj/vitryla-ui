import { cx } from "./cx";

describe("cx", () => {
  it("joins truthy class names and skips falsy values", () => {
    expect(cx("a", false, undefined, null, "b")).toBe("a b");
  });
});
