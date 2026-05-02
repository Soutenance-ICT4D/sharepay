"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { authService } from "@/features/auth";
import { toast } from "sonner";
import { resolveError } from "@/lib/api/response-codes";
import { PasswordInput } from "@/components/ui/password-input";

export default function SuperAdminLoginPage() {
    const t = useTranslations('Auth.SuperAdminLogin');
    const tAuth = useTranslations('Auth.Login');
    const tGlobal = useTranslations();
    const tNav = useTranslations('Navigation');
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
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
            router.push('/admin-2026/dashboard'); 
        } catch (error: any) {
            const { messageKey, values } = resolveError(error);
            toast.error(tGlobal(messageKey, values));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-muted/30 flex items-center justify-center p-4">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="flex justify-center mb-8">
                    <Link href="/" className="relative w-12 h-12">
                        <Image src="/images/logo_sharepay_bg_remove_svg.svg" alt="SharePay" fill className="object-contain" />
                    </Link>
                </div>

                <div className="bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 space-y-6">
                        <div className="text-center space-y-2">
                            <div className="flex justify-center mb-2">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <ShieldCheck className="w-6 h-6 text-primary" />
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
                                    placeholder="admin_identifiant"
                                    type="text"
                                    name="email"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">{tAuth('passwordLabel')}</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
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
                </div>

            </div>
        </div>
    );
}
