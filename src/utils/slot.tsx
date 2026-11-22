import { cloneElement, isValidElement, type HTMLAttributes, type Ref } from "react";
import { mergeRefs } from "./merge-refs";

type AnyProps = Record<string, unknown>;

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
}

const isEventHandler = (key: string) => /^on[A-Z]/.test(key);

function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  const merged: AnyProps = { ...slotProps, ...childProps };

  for (const [key, slotValue] of Object.entries(slotProps)) {
    const childValue = childProps[key];

    if (
      isEventHandler(key) &&
      typeof slotValue === "function" &&
      typeof childValue === "function"
    ) {
      merged[key] = (...args: unknown[]) => {
        childValue(...args);
        slotValue(...args);
      };
    } else if (key === "style") {
      merged.style = { ...(slotValue as object), ...(childValue as object) };
    } else if (key === "className") {
      merged.className = [slotValue, childValue].filter(Boolean).join(" ");
    }
  }

  return merged;
}

export function Slot({ children, ref, ...slotProps }: SlotProps) {
  if (!isValidElement<AnyProps & { ref?: Ref<HTMLElement> }>(children)) {
    throw new Error("Slot очікує один React-елемент як дочірній");
  }

  return cloneElement(children, {
    ...mergeProps(slotProps, children.props),
    ref: mergeRefs(ref, children.props.ref)
  });
}
