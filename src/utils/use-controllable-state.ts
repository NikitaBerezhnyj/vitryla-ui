import { useCallback, useState } from "react";

interface UseControllableStateParams<T> {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}

export function useControllableState<T>({
  value,
  defaultValue,
  onChange
}: UseControllableStateParams<T>) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolledValue;

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const nextValue = typeof next === "function" ? (next as (prev: T) => T)(current) : next;

      if (!isControlled) setUncontrolledValue(nextValue);
      if (!Object.is(nextValue, current)) onChange?.(nextValue);
    },
    [current, isControlled, onChange]
  );

  return [current, setValue] as const;
}
