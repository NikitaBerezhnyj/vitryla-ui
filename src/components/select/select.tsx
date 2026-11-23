import { Select as BaseSelect } from "@base-ui/react/select";
import { cx } from "../../utils";
import { useFieldControlProps } from "../field/field-context";
import { usePortalContainer } from "../../provider/portal-container";
import "./select.css";

export type SelectProps<
  Value,
  Multiple extends boolean | undefined = false
> = BaseSelect.Root.Props<Value, Multiple>;

export function Select<Value, Multiple extends boolean | undefined = false>(
  props: SelectProps<Value, Multiple>
) {
  const { id, required, disabled } = useFieldControlProps(props);

  return (
    <BaseSelect.Root
      {...props}
      id={id ?? props.id}
      required={required ?? props.required}
      disabled={disabled ?? props.disabled}
    />
  );
}

export type SelectTriggerProps = Omit<BaseSelect.Trigger.Props, "className" | "children"> & {
  className?: string;
  placeholder?: string;
};

export function SelectTrigger({ placeholder, className, ...props }: SelectTriggerProps) {
  const field = useFieldControlProps(props);

  return (
    <BaseSelect.Trigger
      {...props}
      aria-describedby={field["aria-describedby"] ?? props["aria-describedby"]}
      aria-invalid={field["aria-invalid"] ?? props["aria-invalid"]}
      className={cx("vitryla-select-trigger", className)}
    >
      <BaseSelect.Value className="vitryla-select-value" placeholder={placeholder} />
      <BaseSelect.Icon className="vitryla-select-icon" aria-hidden="true" />
    </BaseSelect.Trigger>
  );
}

export type SelectContentProps = Omit<BaseSelect.Popup.Props, "className"> & {
  className?: string;
};

export function SelectContent({ className, children, ...props }: SelectContentProps) {
  const container = usePortalContainer();

  return (
    <BaseSelect.Portal container={container ?? undefined}>
      <BaseSelect.Positioner
        className="vitryla-select-positioner"
        sideOffset={4}
        alignItemWithTrigger={false}
        positionMethod="fixed"
      >
        <BaseSelect.Popup {...props} className={cx("vitryla-select-popup", className)}>
          <BaseSelect.List className="vitryla-select-list">{children}</BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export type SelectItemProps = Omit<BaseSelect.Item.Props, "className"> & {
  className?: string;
};

export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item {...props} className={cx("vitryla-select-item", className)}>
      <BaseSelect.ItemIndicator className="vitryla-select-item-indicator" />
      <BaseSelect.ItemText className="vitryla-select-item-text">{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}
