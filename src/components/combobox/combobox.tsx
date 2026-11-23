import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { cx } from "../../utils";
import { useFieldControlProps } from "../field/field-context";
import { usePortalContainer } from "../../provider/portal-container";
import "../input/input.css";
import "../select/select.css";
import "./combobox.css";

export type ComboboxProps<
  Value,
  Multiple extends boolean | undefined = false
> = BaseCombobox.Root.Props<Value, Multiple>;

export function Combobox<Value, Multiple extends boolean | undefined = false>(
  props: ComboboxProps<Value, Multiple>
) {
  const { required, disabled } = useFieldControlProps(props);

  return (
    <BaseCombobox.Root
      {...props}
      required={required ?? props.required}
      disabled={disabled ?? props.disabled}
    />
  );
}

export type ComboboxInputProps = Omit<BaseCombobox.Input.Props, "className"> & {
  className?: string;
  clearLabel?: string;
  triggerLabel?: string;
};

export function ComboboxInput({
  className,
  clearLabel = "Clear selection",
  triggerLabel = "Open list",
  ...props
}: ComboboxInputProps) {
  const fieldProps = useFieldControlProps(props);

  return (
    <BaseCombobox.InputGroup className="vitryla-combobox-group">
      <BaseCombobox.Input
        {...props}
        {...fieldProps}
        className={cx("vitryla-input", "vitryla-combobox-input", className)}
      />
      <div className="vitryla-combobox-actions">
        <BaseCombobox.Clear
          className="vitryla-combobox-button vitryla-combobox-clear"
          aria-label={clearLabel}
        >
          <span />
        </BaseCombobox.Clear>
        <BaseCombobox.Trigger
          className="vitryla-combobox-button vitryla-combobox-trigger"
          aria-label={triggerLabel}
        >
          <span />
        </BaseCombobox.Trigger>
      </div>
    </BaseCombobox.InputGroup>
  );
}

export type ComboboxContentProps = Omit<BaseCombobox.Popup.Props, "className"> & {
  className?: string;
};

export function ComboboxContent({ className, ...props }: ComboboxContentProps) {
  const container = usePortalContainer();

  return (
    <BaseCombobox.Portal container={container ?? undefined}>
      <BaseCombobox.Positioner
        className="vitryla-select-positioner"
        sideOffset={4}
        positionMethod="fixed"
      >
        <BaseCombobox.Popup {...props} className={cx("vitryla-select-popup", className)} />
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

export type ComboboxEmptyProps = Omit<BaseCombobox.Empty.Props, "className"> & {
  className?: string;
};

export function ComboboxEmpty({ className, children, ...props }: ComboboxEmptyProps) {
  return (
    <BaseCombobox.Empty {...props}>
      <div className={cx("vitryla-combobox-empty", className)}>{children}</div>
    </BaseCombobox.Empty>
  );
}

export type ComboboxListProps = Omit<BaseCombobox.List.Props, "className"> & {
  className?: string;
};

export function ComboboxList({ className, ...props }: ComboboxListProps) {
  return <BaseCombobox.List {...props} className={cx("vitryla-select-list", className)} />;
}

export type ComboboxItemProps = Omit<BaseCombobox.Item.Props, "className"> & {
  className?: string;
};

export function ComboboxItem({ className, children, ...props }: ComboboxItemProps) {
  return (
    <BaseCombobox.Item {...props} className={cx("vitryla-select-item", className)}>
      <BaseCombobox.ItemIndicator className="vitryla-select-item-indicator">
        <span />
      </BaseCombobox.ItemIndicator>
      <span className="vitryla-select-item-text">{children}</span>
    </BaseCombobox.Item>
  );
}
