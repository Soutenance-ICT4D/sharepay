"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/core/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2, KeyRound } from "lucide-react";

import { authService } from "@/core/services/auth.service";
import { toast } from "sonner";
import { getAuthErrorMessage } from "@/core/lib/error-codes";

export default function VerifyResetCodePage() {
    const tGlobal = useTranslations();
    // Ideally translations
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || "";

    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState("");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!email) {
            toast.error("Email is missing.");
            return;
        }

        if (code.length < 6) {
            toast.error("Invalid code.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await authService.verifyResetCode({ email, otpCode: code });
            toast.success("Code verified.");
            // response.resetToken contains the token
            router.push(`/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(response.resetToken)}`);
        } catch (error: any) {
            const key = getAuthErrorMessage(error.message || "UNKNOWN_ERROR");
            toast.error(tGlobal(`Auth.Errors.${key}`));
        } finally {
            setIsLoading(false);
        }
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
                        value={code}
                        onChange={(value) => setCode(value)}
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
