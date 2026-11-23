import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode
} from "react";
import { Slot, composeEventHandlers, cx, mergeRefs, toAnchorName } from "../../utils";
import "./tooltip.css";

const OPEN_DELAY = 300;
const CLOSE_DELAY = 100;

interface TooltipContextValue {
  open: boolean;
  show: (delay?: number) => void;
  hide: (delay?: number) => void;
  contentId: string;
  anchorName: string;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext(component: string): TooltipContextValue {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error(`${component} must be used inside <Tooltip>`);
  }
  return context;
}

export function Tooltip({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const update = useCallback((next: boolean, delay: number) => {
    clearTimeout(timer.current);
    if (delay === 0) {
      setOpen(next);
    } else {
      timer.current = setTimeout(() => setOpen(next), delay);
    }
  }, []);
  const show = useCallback((delay = 0) => update(true, delay), [update]);
  const hide = useCallback((delay = 0) => update(false, delay), [update]);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const value = useMemo(
    () => ({ open, show, hide, contentId: `${id}-content`, anchorName: toAnchorName(id) }),
    [open, show, hide, id]
  );

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>;
}

export function TooltipTrigger({ children }: { children: ReactNode }) {
  const { show, hide, contentId, anchorName } = useTooltipContext("TooltipTrigger");

  return (
    <Slot
      aria-describedby={contentId}
      style={{ anchorName }}
      onPointerEnter={event => {
        if (event.pointerType !== "touch") show(OPEN_DELAY);
      }}
      onPointerLeave={() => hide(CLOSE_DELAY)}
      onFocus={event => {
        if (event.currentTarget.matches(":focus-visible")) show();
      }}
      onBlur={() => hide()}
    >
      {children}
    </Slot>
  );
}

export function TooltipContent({
  className,
  style,
  onPointerEnter,
  onPointerLeave,
  ref,
  ...props
}: ComponentProps<"div">) {
  const { open, show, hide, contentId, anchorName } = useTooltipContext("TooltipContent");
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = innerRef.current;
    if (!element || !("showPopover" in element)) return;
    const isOpen = element.matches(":popover-open");
    if (open && !isOpen) element.showPopover();
    if (!open && isOpen) element.hidePopover();
  }, [open]);

  return (
    <div
      popover="manual"
      role="tooltip"
      {...props}
      ref={mergeRefs(ref, innerRef)}
      id={contentId}
      className={cx("vitryla-tooltip", className)}
      style={{ positionAnchor: anchorName, ...style }}
      onPointerEnter={composeEventHandlers(onPointerEnter, () => show())}
      onPointerLeave={composeEventHandlers(onPointerLeave, () => hide(CLOSE_DELAY))}
    />
  );
}
