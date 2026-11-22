import type { CSSProperties } from "react";
import type { ColorValue, TokenOverrides } from "../tokens/types";

const toKebab = (name: string) => name.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`);

const toCssValue = (value: ColorValue) =>
  typeof value === "string" ? value : `light-dark(${value.light}, ${value.dark})`;

export function tokensToStyle(tokens: TokenOverrides = {}): CSSProperties {
  const style: Record<string, string> = {};

  for (const [group, values] of Object.entries(tokens)) {
    const entries = Object.entries(values ?? {}) as [string, ColorValue | undefined][];

    for (const [name, value] of entries) {
      if (value === undefined) continue;
      style[`--vitryla-${group}-${toKebab(name)}`] = toCssValue(value);
    }
  }

  return style as CSSProperties;
}
