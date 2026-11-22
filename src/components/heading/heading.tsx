import type { ComponentProps } from "react";
import { cx } from "../../utils";
import "./heading.css";

type Level = 1 | 2 | 3 | 4 | 5 | 6;
type Size = "sm" | "md" | "lg" | "xl" | "2xl";

const defaultSize: Record<Level, Size> = {
  1: "2xl",
  2: "xl",
  3: "lg",
  4: "md",
  5: "sm",
  6: "sm"
};

export interface HeadingProps extends ComponentProps<"h1"> {
  level: Level;
  size?: Size;
}

export function Heading({ level, size, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      {...props}
      className={cx("vitryla-heading", className)}
      data-size={size ?? defaultSize[level]}
    />
  );
}
