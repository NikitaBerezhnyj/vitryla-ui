import type { ComponentProps, Ref } from "react";
import { Slot, cx } from "../../utils";
import "./link.css";

export interface LinkProps extends ComponentProps<"a"> {
  asChild?: boolean;
}

export function Link({ asChild = false, className, ref, children, ...props }: LinkProps) {
  const shared = { className: cx("vitryla-link", className) };

  if (asChild) {
    return (
      <Slot {...props} {...shared} ref={ref as Ref<HTMLElement>}>
        {children}
      </Slot>
    );
  }
  return (
    <a {...props} {...shared} ref={ref}>
      {children}
    </a>
  );
}
