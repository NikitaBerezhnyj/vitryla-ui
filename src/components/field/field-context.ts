import { createContext, useContext } from "react";

type FieldPart = "description" | "error";

export interface FieldContextValue {
  controlId: string;
  descriptionId: string;
  errorId: string;
  describedBy: string | undefined;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
  registerPart: (part: FieldPart) => () => void;
}

export const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext(component: string): FieldContextValue {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error(`${component} must be used inside <Field>`);
  }
  return context;
}

interface ControlProps {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling";
  required?: boolean;
  disabled?: boolean;
}

export function useFieldControlProps(props: ControlProps): ControlProps {
  const field = useContext(FieldContext);
  if (!field) return {};

  const describedBy = [field.describedBy, props["aria-describedby"]].filter(Boolean).join(" ");

  return {
    id: props.id ?? field.controlId,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": props["aria-invalid"] ?? (field.invalid || undefined),
    required: props.required ?? field.required,
    disabled: props.disabled ?? field.disabled
  };
}
