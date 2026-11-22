import type { ComponentProps } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../field/field-context";
import "./radio.css";

export type RadioProps = Omit<ComponentProps<"input">, "type">;

export function Radio({ className, ref, ...props }: RadioProps) {
  const fieldProps = useFieldControlProps(props);

  return (
    <input
      {...props}
      {...fieldProps}
      ref={ref}
      type="radio"
      className={cx("vitryla-radio", className)}
    />
  );
}
