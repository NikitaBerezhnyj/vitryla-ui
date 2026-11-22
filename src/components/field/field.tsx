import { useCallback, useEffect, useId, useMemo, useState, type ComponentProps } from "react";
import { cx } from "../../utils";
import { FieldContext, useFieldContext, type FieldContextValue } from "./field-context";
import "./field.css";

export interface FieldProps extends ComponentProps<"div"> {
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export function Field({
  invalid = false,
  required = false,
  disabled = false,
  className,
  ...props
}: FieldProps) {
  const id = useId();
  const [parts, setParts] = useState({ description: false, error: false });

  const registerPart = useCallback((part: "description" | "error") => {
    setParts(prev => ({ ...prev, [part]: true }));
    return () => setParts(prev => ({ ...prev, [part]: false }));
  }, []);

  const value = useMemo<FieldContextValue>(() => {
    const descriptionId = `${id}-description`;
    const errorId = `${id}-error`;
    const describedBy = [parts.description && descriptionId, parts.error && errorId]
      .filter(Boolean)
      .join(" ");

    return {
      controlId: `${id}-control`,
      descriptionId,
      errorId,
      describedBy: describedBy || undefined,
      invalid,
      required,
      disabled,
      registerPart
    };
  }, [id, parts, invalid, required, disabled, registerPart]);

  return (
    <FieldContext.Provider value={value}>
      <div
        {...props}
        className={cx("vitryla-field", className)}
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
      />
    </FieldContext.Provider>
  );
}

export function FieldDescription({ className, ...props }: ComponentProps<"p">) {
  const { descriptionId, registerPart } = useFieldContext("FieldDescription");

  useEffect(() => registerPart("description"), [registerPart]);

  return <p {...props} id={descriptionId} className={cx("vitryla-field-description", className)} />;
}

export function FieldError({ className, ...props }: ComponentProps<"p">) {
  const { errorId, invalid, registerPart } = useFieldContext("FieldError");

  useEffect(() => (invalid ? registerPart("error") : undefined), [invalid, registerPart]);

  if (!invalid) return null;

  return (
    <p {...props} id={errorId} role="alert" className={cx("vitryla-field-error", className)} />
  );
}
