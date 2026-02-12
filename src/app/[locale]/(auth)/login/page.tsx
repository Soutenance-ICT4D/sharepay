"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/core/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { authService } from "@/core/services/auth.service";
import { toast } from "sonner";

import { getAuthErrorMessage } from "@/core/lib/error-codes";

export default function LoginPage() {
    const t = useTranslations('Auth.Login');
    const tGlobal = useTranslations();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await authService.login({ email, password }, rememberMe);
            toast.success(t('successMessage'));
            router.push('/dashboard');
        } catch (error: any) {
            const key = getAuthErrorMessage(error.message || "UNKNOWN_ERROR");
            toast.error(tGlobal(`Auth.Errors.${key}`));
        } finally {
            setIsSubmitting(false);
        }
    }

    // Separate handler for Google
    async function onGoogleLogin() {
        setIsGoogleLoading(true);
        try {
            await authService.loginWithGoogle();
            toast.success("Logged in with Google");
            router.push('/dashboard');
        } catch (error) {
            toast.error("Google login failed");
        } finally {
            setIsGoogleLoading(false);
        }
    }

    const isLoading = isSubmitting || isGoogleLoading;

    return (
        <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
                <p className="text-sm text-muted-foreground">{t('description')}</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">{t('emailLabel')}</Label>
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        name="email"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">{t('passwordLabel')}</Label>
                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-primary hover:text-primary/80"
                        >
                            {t('forgotPassword')}
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                    />
                </div>

                {/* Remember Me (Optional) */}
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked === true)}
                    />
                    <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {t('rememberMe')}
                    </label>
                </div>

                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('submitBtn')}
                </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                        {t('orContinueWith')}
                    </span>
                </div>
            </div>

            {/* GOOGLE */}
            <div className="flex flex-col gap-4">
                <Button
                    variant="outline"
                    type="button"
                    onClick={onGoogleLogin}
                    disabled={isLoading}
                    className="w-full h-12 gap-3 text-base font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                >
                    {isGoogleLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                    )}
                    Google
                </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
                {t('noAccount')}{" "}
                <Link
                    href="/register"
                    className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                    {t('registerLink')}
                </Link>
            </div>
        </div>
    );
}
