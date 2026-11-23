import { toAnchorName } from "./anchor-name";

describe("toAnchorName", () => {
  it("creates a dashed ident from a React id", () => {
    expect(toAnchorName(":r1:")).toBe("--vitryla-anchor-r1");
    expect(toAnchorName("«r2»")).toBe("--vitryla-anchor-r2");
  });
});
