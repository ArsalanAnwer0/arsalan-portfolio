import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

// Define button variants using cva
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-gray-800 dark:text-white hover:underline", // White text with hover underline effect
        outline: "text-gray-800 dark:text-white hover:underline", // Similar to default
      },
      size: {
        default: "h-10 px-4 py-2",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Define ButtonProps to include variants and size
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// Button component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className ?? "")}
        ref={ref}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
