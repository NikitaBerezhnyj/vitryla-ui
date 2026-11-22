import { tokensToStyle } from "./tokens-to-style";

describe("tokensToStyle", () => {
  it("converts camelCase keys to kebab-case CSS variables", () => {
    expect(tokensToStyle({ color: { primaryForeground: "#fff" } })).toEqual({
      "--vitryla-color-primary-foreground": "#fff"
    });
  });

  it("converts values for two themes into light-dark()", () => {
    expect(tokensToStyle({ color: { primary: { light: "#ec4899", dark: "#f472b6" } } })).toEqual({
      "--vitryla-color-primary": "light-dark(#ec4899, #f472b6)"
    });
  });

  it("returns an empty object when no tokens are provided", () => {
    expect(tokensToStyle()).toEqual({});
  });
});
