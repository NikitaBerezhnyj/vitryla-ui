import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
  type Ref
} from "react";
import { Slot, composeEventHandlers, cx, mergeRefs, useControllableState } from "../../utils";
import { Heading, type HeadingProps } from "../heading";
import "./dialog.css";
import { PortalContainerContext } from "../../provider/portal-container";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
  hasDescription: boolean;
  setHasDescription: (value: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(component: string): DialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(`${component} must be used inside <Dialog>`);
  }
  return context;
}

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export function Dialog({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children
}: DialogProps) {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange
  });
  const [hasDescription, setHasDescription] = useState(false);
  const id = useId();

  const value = useMemo<DialogContextValue>(
    () => ({
      open,
      setOpen,
      titleId: `${id}-title`,
      descriptionId: `${id}-description`,
      hasDescription,
      setHasDescription
    }),
    [open, setOpen, id, hasDescription]
  );

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

export interface DialogButtonProps extends ComponentProps<"button"> {
  asChild?: boolean;
}
export type DialogTriggerProps = DialogButtonProps;
export type DialogCloseProps = DialogButtonProps;

function DialogButton({ asChild = false, type = "button", ref, ...props }: DialogButtonProps) {
  if (asChild) {
    return <Slot {...props} ref={ref as Ref<HTMLElement>} />;
  }
  return <button {...props} ref={ref} type={type} />;
}

export function DialogTrigger({ onClick, ...props }: DialogTriggerProps) {
  const { setOpen } = useDialogContext("DialogTrigger");

  return (
    <DialogButton
      aria-haspopup="dialog"
      {...props}
      onClick={composeEventHandlers(onClick, () => setOpen(true))}
    />
  );
}

export function DialogClose({ onClick, ...props }: DialogCloseProps) {
  const { setOpen } = useDialogContext("DialogClose");

  return <DialogButton {...props} onClick={composeEventHandlers(onClick, () => setOpen(false))} />;
}

export function DialogContent({
  className,
  children,
  onClick,
  onCancel,
  onClose,
  ref,
  ...props
}: ComponentProps<"dialog">) {
  const { open, setOpen, titleId, descriptionId, hasDescription } =
    useDialogContext("DialogContent");
  const innerRef = useRef<HTMLDialogElement>(null);
  const [element, setElement] = useState<HTMLDialogElement | null>(null);
  const mergedRef = useMemo(() => mergeRefs(ref, innerRef, setElement), [ref]);

  useEffect(() => {
    const dialog = innerRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <dialog
      aria-labelledby={titleId}
      aria-describedby={hasDescription ? descriptionId : undefined}
      {...props}
      ref={mergedRef}
      className={cx("vitryla-dialog", className)}
      onCancel={composeEventHandlers(onCancel, event => {
        event.preventDefault();
        setOpen(false);
      })}
      onClose={composeEventHandlers(onClose, () => setOpen(false))}
      onClick={composeEventHandlers(onClick, event => {
        if (event.target === event.currentTarget) setOpen(false);
      })}
    >
      <div className="vitryla-dialog-body">
        <PortalContainerContext.Provider value={element}>
          {children}
        </PortalContainerContext.Provider>
      </div>
    </dialog>
  );
}

export type DialogTitleProps = Omit<HeadingProps, "level"> & {
  level?: HeadingProps["level"];
};

export function DialogTitle({ level = 2, ...props }: DialogTitleProps) {
  const { titleId } = useDialogContext("DialogTitle");

  return <Heading size="lg" {...props} level={level} id={titleId} />;
}

export function DialogDescription({ className, ...props }: ComponentProps<"p">) {
  const { descriptionId, setHasDescription } = useDialogContext("DialogDescription");

  useEffect(() => {
    setHasDescription(true);
    return () => setHasDescription(false);
  }, [setHasDescription]);

  return (
    <p {...props} id={descriptionId} className={cx("vitryla-dialog-description", className)} />
  );
}
