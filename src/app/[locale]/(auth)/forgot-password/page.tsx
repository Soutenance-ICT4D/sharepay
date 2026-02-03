"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/core/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
    const t = useTranslations('Auth.ForgotPassword');
    const tLogin = useTranslations('Auth.Login');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Redirect to verify-reset-code
            router.push('/verify-reset-code');
        }, 2000);
    }

    return (
        <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
                <p className="text-sm text-muted-foreground">{t('description')}</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">{tLogin('emailLabel')}</Label>
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        required
                    />
                </div>

                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('submitBtn')}
                </Button>
            </form>

            <div className="text-center text-sm">
                <Link
                    href="/login"
                    className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('backToLogin')}
                </Link>
            </div>
        </div>
    );
}
