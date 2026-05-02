"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, ...props }, ref) => {
        const [visible, setVisible] = React.useState(false);

        return (
            <div className="relative">
                <Input
                    type={visible ? "text" : "password"}
                    className={cn("pr-10", className)}
                    ref={ref}
                    {...props}
                />
                <button
                    type="button"
                    tabIndex={-1}
                    aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    onClick={() => setVisible(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    {visible
                        ? <EyeOff className="h-4 w-4" />
                        : <Eye className="h-4 w-4" />
                    }
                </button>
            </div>
        );
    }
);
PasswordInput.displayName = "PasswordInput";
