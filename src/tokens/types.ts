export type Theme = "light" | "dark" | "system";

export type ColorValue = string | { light: string; dark: string };

type ColorToken =
  | "background"
  | "foreground"
  | "muted"
  | "mutedForeground"
  | "border"
  | "primary"
  | "primaryForeground"
  | "danger"
  | "dangerForeground"
  | "focusRing";

export interface TokenOverrides {
  color?: Partial<Record<ColorToken, ColorValue>>;
  radius?: Partial<Record<"sm" | "md" | "lg", string>>;
  font?: Partial<Record<"sans" | "mono", string>>;
}
