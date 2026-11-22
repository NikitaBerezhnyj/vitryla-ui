import type { ComponentProps } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../field/field-context";
import "./input.css";

export type InputProps = ComponentProps<"input">;

export function Input({ className, ref, ...props }: InputProps) {
  const fieldProps = useFieldControlProps(props);

  return <input {...props} {...fieldProps} ref={ref} className={cx("vitryla-input", className)} />;
}
