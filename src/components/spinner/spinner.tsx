import type { ComponentProps } from "react";
import { cx } from "../../utils";
import "./spinner.css";

export interface SpinnerProps extends ComponentProps<"span"> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function Spinner({ label = "Loading", size = "md", className, ...props }: SpinnerProps) {
  return (
    <span role="status" {...props} className={cx("vitryla-spinner", className)} data-size={size}>
      <span className="vitryla-visually-hidden">{label}</span>
    </span>
  );
}
