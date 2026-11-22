import type { ComponentProps } from "react";
import { cx } from "../../utils";
import "./badge.css";

export interface BadgeProps extends ComponentProps<"span"> {
  variant?: "neutral" | "primary" | "danger";
}

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return <span {...props} className={cx("vitryla-badge", className)} data-variant={variant} />;
}
