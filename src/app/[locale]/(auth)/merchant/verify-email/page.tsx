"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useState } from "react";
import { Loader2, Mail, RefreshCw } from "lucide-react";

import { authService } from "@/features/auth";
import { useResendCountdown } from "@/features/auth";
import { toast } from "sonner";
import { resolveError, SUCCESS_KEYS } from "@/lib/api/response-codes";

export default function VerifyEmailPage() {
    const t = useTranslations('Auth.VerifyEmail');
    const tGlobal = useTranslations();
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || "";

    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [code, setCode] = useState("");
    const { timeLeft, isCountingDown, startCountdown } = useResendCountdown('verify_email');

    async function onResend() {
        if (isResending || isCountingDown) return;
        if (!email) {
            toast.error(tGlobal('Auth.Errors.validation_error') || t('errorMissing'));
            return;
        }
        setIsResending(true);
        try {
            await authService.resendOtp(email);
            toast.success(tGlobal(`Auth.Success.${SUCCESS_KEYS.AUTH_RESEND_OTP}`));
            startCountdown();
        } catch (error: any) {
            const { messageKey, values } = resolveError(error);
            toast.error(tGlobal(messageKey, values));
        } finally {
            setIsResending(false);
        }
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!email) {
            toast.error(t('errorMissing'));
            return;
        }

        if (code.length < 6) {
            toast.error(tGlobal('Auth.Errors.invalid_otp'));
            return;
        }

        setIsLoading(true);

        try {
            await authService.verifyEmail({ email, otp: code });
            toast.success(tGlobal(`Auth.Success.${SUCCESS_KEYS.AUTH_VERIFY_EMAIL}`));
            router.push('/merchant/login');
        } catch (error: any) {
            const { messageKey, values } = resolveError(error);
            toast.error(tGlobal(messageKey, values));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="p-4 sm:p-8 space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-10 w-10" />
                </div>
            </div>

            <div className="space-y-3 text-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                    {t('title')}
                </h1>
                <p className="text-muted-foreground text-pretty max-w-sm mx-auto leading-relaxed">
                    {t.rich('description', {
                        email: email,
                        emp: (chunks) => <span className="font-semibold text-primary">{chunks}</span>
                    })}
                </p>
            </div>

            <div className="flex flex-col items-center space-y-8">
                <form onSubmit={onSubmit} className="w-full flex flex-col items-center space-y-8">
                    <InputOTP
                        maxLength={6}
                        value={code}
                        onChange={(value) => setCode(value)}
                        render={({ slots }) => (
                            <InputOTPGroup className="gap-2 sm:gap-3">
                                {slots.map((slot, index) => (
                                    <InputOTPSlot 
                                        key={index} 
                                        {...slot} 
                                        index={index} 
                                        className="h-12 w-10 sm:h-14 sm:w-12 text-lg font-bold border-2 rounded-lg data-[active=true]:border-primary transition-all"
                                    />
                                ))}
                            </InputOTPGroup>
                        )}
                    />

                    <Button className="w-full h-12 text-base font-semibold" type="submit" disabled={isLoading || code.length < 6}>
                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                        {t('submitBtn')}
                    </Button>
                </form>

                <div className="flex flex-col items-center gap-3">
                    <p className="text-sm text-muted-foreground">
                        {t('notReceived')}
                    </p>
                    <Button
                        variant="link"
                        className="h-auto p-0 font-semibold text-primary flex items-center"
                        onClick={onResend}
                        disabled={isResending || isLoading || isCountingDown}
                    >
                        {isResending ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                            <RefreshCw className={`h-4 w-4 mr-2 ${isCountingDown ? '' : 'hover:scale-110 transition-transform'}`} />
                        )}
                        {t('resend')}
                        {isCountingDown && (
                            <span className="ml-2 font-mono">
                                ({timeLeft}s)
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
