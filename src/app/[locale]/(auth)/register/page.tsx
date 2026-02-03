"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/core/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
    const t = useTranslations('Auth.Register');
    const tLogin = useTranslations('Auth.Login'); // Reuse labels like email/password
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Handle registration logic here
            router.push('/verify-email');
        }, 2000);
    }

    return (
        <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
                <p className="text-sm text-muted-foreground">{t('description')}</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                {/* Full Name field could be added here, currently sticking to email/password for simplicity or we can add Name later */}

                <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                        id="fullname"
                        placeholder="John Doe"
                        type="text"
                        autoCapitalize="words"
                        autoComplete="name"
                        autoCorrect="off"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">{tLogin('emailLabel')}</Label>
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">{tLogin('passwordLabel')}</Label>
                    <Input
                        id="password"
                        type="password"
                        required
                    />
                </div>

                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('submitBtn')}
                </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
                {t('haveAccount')}{" "}
                <Link
                    href="/login"
                    className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                    {t('loginLink')}
                </Link>
            </div>
        </div>
    );
}
