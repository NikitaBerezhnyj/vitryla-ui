import type { ComponentProps } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../field/field-context";
import "./switch.css";

export type SwitchProps = Omit<ComponentProps<"input">, "type" | "role">;

export function Switch({ className, ref, ...props }: SwitchProps) {
  const fieldProps = useFieldControlProps(props);

  return (
    <input
      {...props}
      {...fieldProps}
      ref={ref}
      type="checkbox"
      role="switch"
      className={cx("vitryla-switch", className)}
    />
  );
}
