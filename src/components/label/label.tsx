import { useContext, type ComponentProps } from "react";
import { cx } from "../../utils";
import { FieldContext } from "../field/field-context";
import "./label.css";

export type LabelProps = ComponentProps<"label">;

export function Label({ className, htmlFor, children, ...props }: LabelProps) {
  const field = useContext(FieldContext);

  return (
    <label
      {...props}
      htmlFor={htmlFor ?? field?.controlId}
      data-disabled={field?.disabled || undefined}
      className={cx("vitryla-label", className)}
    >
      {children}
      {field?.required && (
        <span aria-hidden="true" className="vitryla-label-required">
          *
        </span>
      )}
    </label>
  );
}
