import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

// Fix empty interface by extending HTML button attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // You can add additional props here if needed
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      children,
      // Remove or use the unused variables
      // disabled,
      // type,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          `
            w-auto
            rounded-full
            bg-black
            border-transparent
            px-5
            py-3
            text-white
            font-semibold
            hover:opacity-75
            transition
            `,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;