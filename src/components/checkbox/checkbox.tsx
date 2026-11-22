import { useEffect, useRef, type ComponentProps } from "react";
import { cx, mergeRefs } from "../../utils";
import { useFieldControlProps } from "../field/field-context";
import "./checkbox.css";

export interface CheckboxProps extends Omit<ComponentProps<"input">, "type"> {
  indeterminate?: boolean;
}

export function Checkbox({ indeterminate = false, className, ref, ...props }: CheckboxProps) {
  const fieldProps = useFieldControlProps(props);
  const innerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      {...props}
      {...fieldProps}
      ref={mergeRefs(ref, innerRef)}
      type="checkbox"
      className={cx("vitryla-checkbox", className)}
    />
  );
}
