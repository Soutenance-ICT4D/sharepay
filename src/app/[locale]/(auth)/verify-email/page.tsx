"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/core/i18n/routing";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2, Mail } from "lucide-react";

export default function VerifyEmailPage() {
    const t = useTranslations('Auth.VerifyEmail');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.push('/login');
        }, 2000);
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
                <p className="text-sm text-muted-foreground">{t('description')} <span className="font-medium text-foreground">user@example.com</span></p>
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
                    {t('submitBtn')}
                </Button>
            </form>

            <div className="text-center text-sm">
                <button className="text-primary hover:underline font-medium" type="button">
                    {t('resend')}
                </button>
            </div>
        </div>
    );
}
