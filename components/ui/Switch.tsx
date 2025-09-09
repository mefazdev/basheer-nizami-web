"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const switchVariants = cva(
  "relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors focus:outline-none border border-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gray-500 data-[state=checked]:bg-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof switchVariants> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked = false, onCheckedChange, variant, ...props }, ref) => {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        className={cn(switchVariants({ variant, className }))}
        ref={ref}
        onClick={() => onCheckedChange?.(!checked)}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-gray-800 shadow transition-transform",
            checked ? "translate-x-5   bg-blue-600" : "translate-x-1"
          )}
        />
      </button>
    )
  }
)

Switch.displayName = "Switch"

export { Switch, switchVariants }
