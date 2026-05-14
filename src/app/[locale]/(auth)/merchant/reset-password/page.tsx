"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Check, Circle, Loader2, LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";

import { authService } from "@/features/auth";
import { toast } from "sonner";
import { resolveError, SUCCESS_KEYS } from "@/lib/api/response-codes";

const PASSWORD_RULES = [
    { key: "length",    test: (p: string) => p.length >= 8 },
    { key: "uppercase", test: (p: string) => /[A-Z]/.test(p) },
    { key: "lowercase", test: (p: string) => /[a-z]/.test(p) },
    { key: "digit",     test: (p: string) => /[0-9]/.test(p) },
    { key: "special",   test: (p: string) => /[@#$%^&+=!*]/.test(p) },
] as const;

export default function ResetPasswordPage() {
    const t = useTranslations('Auth.ResetPassword');
    const tRules = useTranslations('Auth.Register.passwordRules');
    const tGlobal = useTranslations();
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || "";
    const resetToken = searchParams.get('token') || "";

    const [newPassword, setNewPassword]   = useState("");
    const [confirmPassword, setConfirm]   = useState("");
    const [isLoading, setIsLoading]       = useState(false);

    const isPasswordValid = PASSWORD_RULES.every(r => r.test(newPassword));
    const isFormValid     = isPasswordValid && confirmPassword === newPassword && confirmPassword.length > 0;

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!email || !resetToken) {
            toast.error(t('errorMissing') || "Missing email or reset token.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error(t('errorMatch') || "Passwords do not match.");
            return;
        }

        setIsLoading(true);
        try {
            await authService.resetPassword({ resetToken, newPassword });
            toast.success(tGlobal(`Auth.Success.${SUCCESS_KEYS.AUTH_RESET_PASSWORD}`));
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
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    {newPassword.length > 0 && (
                        <ul className="space-y-1 pt-1">
                            {PASSWORD_RULES.map(rule => {
                                const ok = rule.test(newPassword);
                                return (
                                    <li
                                        key={rule.key}
                                        className={cn(
                                            "flex items-center gap-2 text-xs transition-colors duration-200",
                                            ok ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                                        )}
                                    >
                                        {ok
                                            ? <Check className="h-3 w-3 shrink-0" />
                                            : <Circle className="h-3 w-3 shrink-0" />
                                        }
                                        {tRules(rule.key)}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('labelConfirm')}</Label>
                    <PasswordInput
                        id="confirmPassword"
                        placeholder="••••••••"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                    />
                </div>

                <Button className="w-full" type="submit" disabled={isLoading || !isFormValid}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('submitBtn')}
                </Button>
            </form>
        </div>
    );
}
