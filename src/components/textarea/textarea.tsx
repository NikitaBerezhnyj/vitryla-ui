import type { ComponentProps } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../field/field-context";
import "../input/input.css";
import "./textarea.css";

export type TextareaProps = ComponentProps<"textarea">;

export function Textarea({ className, ref, ...props }: TextareaProps) {
  const fieldProps = useFieldControlProps(props);

  return (
    <textarea
      {...props}
      {...fieldProps}
      ref={ref}
      className={cx("vitryla-input", "vitryla-textarea", className)}
    />
  );
}
