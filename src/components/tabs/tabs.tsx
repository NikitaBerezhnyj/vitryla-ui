import {
  createContext,
  useContext,
  useId,
  useMemo,
  type ComponentProps,
  type KeyboardEvent
} from "react";
import { composeEventHandlers, cx, useControllableState } from "../../utils";
import "./tabs.css";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`${component} must be used inside <Tabs>`);
  }
  return context;
}

export interface TabsProps extends Omit<ComponentProps<"div">, "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  className,
  ...props
}: TabsProps) {
  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue,
    onChange: onValueChange
  });
  const baseId = useId();
  const context = useMemo(() => ({ value, setValue, baseId }), [value, setValue, baseId]);

  return (
    <TabsContext.Provider value={context}>
      <div {...props} className={cx("vitryla-tabs", className)} />
    </TabsContext.Provider>
  );
}

export function TabsList({ className, ...props }: ComponentProps<"div">) {
  return <div role="tablist" {...props} className={cx("vitryla-tabs-list", className)} />;
}

function moveSelection(event: KeyboardEvent<HTMLButtonElement>, setValue: (value: string) => void) {
  if (event.altKey || event.ctrlKey || event.metaKey) return;

  const list = event.currentTarget.closest('[role="tablist"]');
  if (!list) return;

  const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'));
  const index = tabs.indexOf(event.currentTarget);
  const last = tabs.length - 1;
  const rtl = getComputedStyle(list).direction === "rtl";

  const targets: Record<string, number> = {
    [rtl ? "ArrowLeft" : "ArrowRight"]: index === last ? 0 : index + 1,
    [rtl ? "ArrowRight" : "ArrowLeft"]: index === 0 ? last : index - 1,
    Home: 0,
    End: last
  };
  const target = targets[event.key];
  if (target === undefined) return;

  event.preventDefault();
  const next = tabs[target];
  next?.focus();
  if (next?.dataset.value !== undefined) setValue(next.dataset.value);
}

export interface TabsTriggerProps extends Omit<ComponentProps<"button">, "value"> {
  value: string;
}

export function TabsTrigger({ value, className, onClick, onKeyDown, ...props }: TabsTriggerProps) {
  const { value: selected, setValue, baseId } = useTabsContext("TabsTrigger");
  const isSelected = selected === value;

  return (
    <button
      type="button"
      role="tab"
      {...props}
      id={`${baseId}-trigger-${value}`}
      aria-controls={`${baseId}-content-${value}`}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      data-value={value}
      className={cx("vitryla-tabs-trigger", className)}
      onClick={composeEventHandlers(onClick, () => setValue(value))}
      onKeyDown={composeEventHandlers(onKeyDown, event => moveSelection(event, setValue))}
    />
  );
}

export interface TabsContentProps extends Omit<ComponentProps<"div">, "value"> {
  value: string;
}

export function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { value: selected, baseId } = useTabsContext("TabsContent");

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      {...props}
      id={`${baseId}-content-${value}`}
      aria-labelledby={`${baseId}-trigger-${value}`}
      hidden={selected !== value}
      className={cx("vitryla-tabs-content", className)}
    />
  );
}
