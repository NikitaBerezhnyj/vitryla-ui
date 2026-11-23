import {
  createContext,
  useContext,
  useId,
  useMemo,
  type ComponentProps,
  type ReactNode,
  type Ref
} from "react";
import { Slot, cx, toAnchorName } from "../../utils";
import "./popover.css";

interface PopoverContextValue {
  contentId: string;
  anchorName: string;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(component: string): PopoverContextValue {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error(`${component} must be used inside <Popover>`);
  }
  return context;
}

export function Popover({ children }: { children?: ReactNode }) {
  const id = useId();
  const value = useMemo(() => ({ contentId: `${id}-content`, anchorName: toAnchorName(id) }), [id]);

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>;
}

export interface PopoverButtonProps extends ComponentProps<"button"> {
  asChild?: boolean;
}
export type PopoverTriggerProps = PopoverButtonProps;
export type PopoverCloseProps = PopoverButtonProps;

function PopoverButton({ asChild = false, type = "button", ref, ...props }: PopoverButtonProps) {
  if (asChild) {
    return <Slot {...props} ref={ref as Ref<HTMLElement>} />;
  }
  return <button {...props} ref={ref} type={type} />;
}

export function PopoverTrigger({ style, ...props }: PopoverTriggerProps) {
  const { contentId, anchorName } = usePopoverContext("PopoverTrigger");

  return <PopoverButton {...props} popoverTarget={contentId} style={{ anchorName, ...style }} />;
}

export function PopoverClose(props: PopoverCloseProps) {
  const { contentId } = usePopoverContext("PopoverClose");

  return <PopoverButton {...props} popoverTarget={contentId} popoverTargetAction="hide" />;
}

export function PopoverContent({ className, style, ...props }: ComponentProps<"div">) {
  const { contentId, anchorName } = usePopoverContext("PopoverContent");

  return (
    <div
      popover="auto"
      {...props}
      id={contentId}
      className={cx("vitryla-popover", className)}
      style={{ positionAnchor: anchorName, ...style }}
    />
  );
}
