"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/core/i18n/routing";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2, Mail } from "lucide-react";

import { authService } from "@/core/services/auth.service";
import { toast } from "sonner";
import { getAuthErrorMessage } from "@/core/lib/error-codes";

export default function VerifyEmailPage() {
    const t = useTranslations('Auth.VerifyEmail');
    const tGlobal = useTranslations();
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || "";

    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [code, setCode] = useState("");

    async function onResend() {
        if (!email) return;
        setIsResending(true);
        try {
            await authService.resendOtp(email);
            toast.success(t('successMessage'));
        } catch (error: any) {
            const key = getAuthErrorMessage(error.message || "UNKNOWN_ERROR");
            toast.error(tGlobal(`Auth.Errors.${key}`));
        } finally {
            setIsResending(false);
        }
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!email) {
            toast.error("Email is missing. Please register again.");
            return;
        }

        if (code.length < 6) {
            toast.error(tGlobal('Auth.Errors.invalid_otp'));
            return;
        }

        setIsLoading(true);

        try {
            await authService.verifyEmail({ email, otpCode: code });
            toast.success(t('successMessage'));
            router.push('/login');
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
                    <Mail className="h-6 w-6" />
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
                <p className="text-sm text-muted-foreground">{t('description')} <span className="font-medium text-foreground">{email}</span></p>
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
                    {t('submitBtn')}
                </Button>
            </form>

            <div className="text-center text-sm">
                <button
                    className="text-primary hover:underline font-medium disabled:opacity-50"
                    type="button"
                    onClick={onResend}
                    disabled={isResending || isLoading}
                >
                    {isResending ? <Loader2 className="h-3 w-3 animate-spin inline mr-1" /> : null}
                    {t('resend')}
                </button>
            </div>
        </div>
    );
}
