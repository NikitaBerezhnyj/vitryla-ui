import type { ComponentProps, Ref } from "react";
import { Slot } from "../../utils";

export interface ButtonProps extends ComponentProps<"button"> {
  asChild?: boolean;
}

export function Button({ asChild = false, type = "button", ref, ...props }: ButtonProps) {
  if (asChild) {
    return <Slot {...props} ref={ref as Ref<HTMLElement>} />;
  }
  return <button ref={ref} type={type} {...props} />;
}
