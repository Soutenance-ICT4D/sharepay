"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { Loader2, Headphones } from "lucide-react";

import { authService } from "@/features/auth";
import { tokenStorage } from "@/lib/token-storage";
import { toast } from "sonner";
import { resolveError } from "@/lib/api/response-codes";
import { PasswordInput } from "@/components/ui/password-input";

export default function SupportLoginPage() {
    const t = useTranslations('Auth.SupportLogin');
    const tAuth = useTranslations('Auth.Login');
    const tGlobal = useTranslations();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const tokens = tokenStorage.get();
        if (!tokens?.accessToken) return;
        const user = tokenStorage.getUser();
        if (user?.role === "SUPPORT") router.replace("/support/dashboard");
        else if (user?.role === "MERCHANT") router.replace("/merchant/dashboard");
        else if (user?.role === "ADMIN") router.replace("/admin/dashboard");
    }, [router]);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const authData = await authService.login({ email, password }, rememberMe);

            if (authData.user.role !== "SUPPORT") {
                tokenStorage.clear();
                toast.error(tGlobal('Auth.Errors.invalid_credentials'));
                return;
            }

            toast.success(t('successMessage'));
            router.push('/support/dashboard');
        } catch (error: any) {
            const { messageKey, values } = resolveError(error);
            toast.error(tGlobal(messageKey, values));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
                <div className="flex justify-center mb-2">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <Headphones className="w-6 h-6 text-primary" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
                <p className="text-sm text-muted-foreground">{t('description')}</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">{t('loginLabel')}</Label>
                    <Input
                        id="email"
                        placeholder="support@sharepay.com"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">{tAuth('passwordLabel')}</Label>
                    <PasswordInput
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        required
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none"
                    >
                        {tAuth('rememberMe')}
                    </label>
                </div>

                <Button className="w-full h-11" type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('submitBtn')}
                </Button>
            </form>
        </div>
    );
}
