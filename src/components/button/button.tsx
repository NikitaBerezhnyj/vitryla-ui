import type { ComponentProps, Ref } from "react";
import { Slot, cx } from "../../utils";
import "./button.css";

export interface ButtonProps extends ComponentProps<"button"> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({
  asChild = false,
  variant = "primary",
  size = "md",
  type = "button",
  className,
  ref,
  ...props
}: ButtonProps) {
  const shared = {
    className: cx("vitryla-button", className),
    "data-variant": variant,
    "data-size": size
  };

  if (asChild) {
    return <Slot {...props} {...shared} ref={ref as Ref<HTMLElement>} />;
  }
  return <button {...props} {...shared} ref={ref} type={type} />;
}
