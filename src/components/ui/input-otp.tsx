"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"

import { cn } from "@/core/lib/utils"

const InputOTP = React.forwardRef<
    React.ElementRef<typeof OTPInput>,
    React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
    <OTPInput
        ref={ref}
        containerClassName={cn(
            "flex items-center gap-2 has-[:disabled]:opacity-50",
            containerClassName
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
    />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div"> & { index: number; char?: string | null; hasFakeCaret?: boolean; isActive?: boolean }
>(({ index, char: propChar, hasFakeCaret: propFakeCaret, isActive: propIsActive, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext)
    const slot = inputOTPContext.slots?.[index] || {} // Safe access

    // Prefer props if passed (since context might be empty inside render prop if provider isn't set up there)
    // Or prefer context if it exists?
    // In Shadecn/InputOTP logic, usually context drives it. But if context fails, we rely on the props passed from render function.

    const char = propChar ?? slot.char
    const hasFakeCaret = propFakeCaret ?? slot.hasFakeCaret
    const isActive = propIsActive ?? slot.isActive

    // Filter out props that shouldn't be passed to DOM
    // placeholderChar is passed by input-otp in some versions/implementations if spread from accessors
    // We explicitly exclude it from ...rest
    const { placeholderChar, ...divProps } = props as any;

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm transition-all",
                isActive && "z-10 ring-2 ring-ring ring-offset-2",
                className
            )}
            {...divProps}
        >
            {char}

            {hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                </div>
            )}
        </div>
    )
})
InputOTPSlot.displayName = "InputOTPSlot"

export { InputOTP, InputOTPGroup, InputOTPSlot }
