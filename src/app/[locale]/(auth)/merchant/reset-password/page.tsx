"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2, LockKeyhole } from "lucide-react";

import { authService } from "@/features/auth";
import { toast } from "sonner";
import { resolveError, SUCCESS_KEYS } from "@/lib/api/response-codes";

export default function ResetPasswordPage() {
    const t = useTranslations('Auth.ResetPassword');
    const tGlobal = useTranslations();
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || "";
    const resetToken = searchParams.get('token') || "";

    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!email || !resetToken) {
            toast.error(t('errorMissing') || "Missing email or reset token.");
            return;
        }

        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const newPassword = formData.get("newPassword") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (newPassword !== confirmPassword) {
            toast.error(t('errorMatch') || "Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            await authService.resetPassword({ resetToken, newPassword });
            toast.success(tGlobal(`Auth.Success.${SUCCESS_KEYS.AUTH_RESET_PASSWORD}`));
            // Redirect to login
            router.push('/merchant/login');
        } catch (error: any) {
            const { messageKey, values } = resolveError(error);
            toast.error(tGlobal(messageKey, values));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="p-8 space-y-6 text-center">
            <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <LockKeyhole className="h-6 w-6" />
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">{t('title')}</h1>
                <p className="text-sm text-muted-foreground">{t('description')}</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4 text-left">
                <div className="space-y-2">
                    <Label htmlFor="newPassword">{t('labelNew')}</Label>
                    <PasswordInput
                        id="newPassword"
                        placeholder="••••••••"
                        name="newPassword"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('labelConfirm')}</Label>
                    <PasswordInput
                        id="confirmPassword"
                        placeholder="••••••••"
                        name="confirmPassword"
                        required
                    />
                </div>

                <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('submitBtn')}
                </Button>
            </form>
        </div>
    );
}
