"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/core/i18n/routing";
import { useState } from "react";
import { Loader2, KeyRound } from "lucide-react";

export default function VerifyResetCodePage() {
    const router = useRouter(); // To navigate to reset-password
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            // On success, redirect to reset-password
            router.push('/reset-password');
        }, 2000);
    }

    return (
        <div className="p-8 space-y-6 text-center">
            <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <KeyRound className="h-6 w-6" />
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Enter Security Code</h1>
                <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your email to verify your identity.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4 text-left">
                <div className="space-y-2 flex flex-col items-center">
                    <Label htmlFor="code" className="sr-only">Code</Label>
                    <InputOTP
                        maxLength={6}
                        render={({ slots }) => (
                            <InputOTPGroup>
                                {slots.map((slot, index) => (
                                    <InputOTPSlot key={index} {...slot} index={index} />
                                ))}
                            </InputOTPGroup>
                        )}
                    />
                </div>

                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify Code
                </Button>
            </form>

            <div className="text-center text-sm">
                <p className="text-muted-foreground">
                    Didn't receive code?{" "}
                    <button className="text-primary hover:underline font-medium" type="button">
                        Resend
                    </button>
                </p>
            </div>
        </div>
    );
}
