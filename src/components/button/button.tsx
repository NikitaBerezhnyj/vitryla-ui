import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = "button", ...props }, ref) => <button ref={ref} type={type} {...props} />
);

Button.displayName = "Button";
