"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

interface AmountInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    className?: string;
    currency?: string;
}

export function AmountInput({ value, onChange, disabled, className, currency }: AmountInputProps) {
    const localeSelection = useLocale();
    const [displayValue, setDisplayValue] = useState("");

    // Configuration based on locale
    const isFr = localeSelection === "fr";
    const thousandSeparator = isFr ? " " : ",";
    const decimalSeparator = isFr ? "," : ".";

    // Format number for display
    const formatForDisplay = (val: string) => {
        if (!val) return "";

        // Remove existing thousands separators and normalize decimal separator
        const cleanVal = val.split(thousandSeparator).join("").replace(isFr ? "." : ",", decimalSeparator);

        const [intPart, decPart] = cleanVal.split(decimalSeparator);

        // Format integer part
        const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

        if (decPart !== undefined) {
            return `${formattedInt}${decimalSeparator}${decPart.slice(0, 2)}`; // Limit to 2 decimals
        }

        return formattedInt;
    };

    useEffect(() => {
        if (value) {
            // value is a string from parent, but represents a number
            // We need to handle potential dots/commas if passed as string
            const normalized = value.split(",").join(".");
            const parts = normalized.split(".");
            let display = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
            if (parts[1] !== undefined) {
                display += `${decimalSeparator}${parts[1]}`;
            }
            setDisplayValue(display);
        } else {
            setDisplayValue("");
        }
    }, [value, thousandSeparator, decimalSeparator]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputVal = e.target.value;

        // Allow only digits and the allowed decimal separator
        const allowedChars = new RegExp(`[^0-9${decimalSeparator}]`, "g");
        inputVal = inputVal.replace(allowedChars, "");

        // Prevent multiple decimal separators
        const parts = inputVal.split(decimalSeparator);
        if (parts.length > 2) {
            inputVal = parts[0] + decimalSeparator + parts.slice(1).join("");
        }

        setDisplayValue(formatForDisplay(inputVal));

        // Convert to standard float string/number for parent
        const standardValue = inputVal.replace(decimalSeparator, ".");
        onChange(standardValue);
    };

    const handleBlur = () => {
        if (!displayValue) return;
        setDisplayValue(formatForDisplay(displayValue));
    };

    return (
        <div className="relative group">
            <Input
                type="text"
                value={displayValue}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={disabled}
                placeholder="0"
                className={cn(
                    "text-3xl font-bold h-16 pl-4 border-2 transition-all focus-visible:ring-primary/20",
                    "disabled:bg-muted/30 disabled:opacity-100 disabled:cursor-not-allowed",
                    "text-primary caret-primary",
                    currency && "pr-24", // Ensure enough space for currency suffix
                    className
                )}
            />
            {currency && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground group-hover:text-primary/70 transition-colors pointer-events-none">
                    {currency}
                </div>
            )}
        </div>
    );
}
