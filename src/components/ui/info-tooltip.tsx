"use client";

import { Info } from "lucide-react";

interface InfoTooltipProps {
    text: string;
}

export function InfoTooltip({ text }: InfoTooltipProps) {
    return (
        <span className="relative group inline-flex items-center">
            <Info className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help" />
            <span
                role="tooltip"
                className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 w-56 rounded-lg border border-border bg-popover px-3 py-2 text-xs leading-relaxed text-popover-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-normal"
            >
                {text}
            </span>
        </span>
    );
}
