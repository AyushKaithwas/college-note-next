import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-black text-sm py-1 px-5 ease-in-out duration-200",
  {
    variants: {
      variant: {
        default: "bg-primary border border-primary hover:bg-[#FFE072] ",
        outline: "border-[1px] bg-transparent text-white hover:bg-tertiary",
        hover: "border-[1px] hover:bg-hover hover:text-white",
      },
      size: {
        default: "h-8 px-5 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-11 rounded-md px-8 text-lg",
        icon: "h-8 w-8 p-0",
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
