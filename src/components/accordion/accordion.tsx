import { createContext, useContext, useId, type ComponentProps } from "react";
import { cx } from "../../utils";
import "./accordion.css";

const AccordionContext = createContext<string | undefined>(undefined);

export interface AccordionProps extends ComponentProps<"div"> {
  type?: "single" | "multiple";
}

export function Accordion({ type = "multiple", className, ...props }: AccordionProps) {
  const name = useId();

  return (
    <AccordionContext.Provider value={type === "single" ? name : undefined}>
      <div {...props} className={cx("vitryla-accordion", className)} />
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends ComponentProps<"details"> {
  defaultOpen?: boolean;
}

export function AccordionItem({ defaultOpen, className, ...props }: AccordionItemProps) {
  const name = useContext(AccordionContext);

  return (
    <details
      name={name}
      open={defaultOpen}
      {...props}
      className={cx("vitryla-accordion-item", className)}
    />
  );
}

export function AccordionTrigger({ className, ...props }: ComponentProps<"summary">) {
  return <summary {...props} className={cx("vitryla-accordion-trigger", className)} />;
}

export function AccordionContent({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cx("vitryla-accordion-content", className)} />;
}
