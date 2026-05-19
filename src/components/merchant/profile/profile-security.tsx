"use client";

import { useState } from "react";
import { Shield, KeyRound, Loader2, Check, Circle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { accountService } from "@/lib/services/account.service";
import { isApiError } from "@/lib/api/error";

interface ProfileSecurityProps {
    isOAuth?:   boolean;
    isLoading?: boolean;
}

function ProfileSecuritySkeleton() {
    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Skeleton className="w-6 h-6 rounded" />
                <Skeleton className="h-6 w-44" />
            </div>
            <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex gap-4">
                        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-28" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </div>
                    <Skeleton className="h-9 w-40 rounded-xl shrink-0" />
                </div>
            </div>
        </section>
    );
}

function ChangePasswordForm({ onClose }: { onClose: () => void }) {
    const t    = useTranslations("Dashboard.Profile.Security");
    const [current,  setCurrent]  = useState("");
    const [next,     setNext]     = useState("");
    const [showCurr, setShowCurr] = useState(false);
    const [showNext, setShowNext] = useState(false);
    const [saving,   setSaving]   = useState(false);
    const [done,     setDone]     = useState(false);
    const [error,    setError]    = useState<string | null>(null);

    const passwordRules = [
        { key: "length",    test: (p: string) => p.length >= 8 },
        { key: "uppercase", test: (p: string) => /[A-Z]/.test(p) },
        { key: "lowercase", test: (p: string) => /[a-z]/.test(p) },
        { key: "digit",     test: (p: string) => /[0-9]/.test(p) },
        { key: "special",   test: (p: string) => /[@#$%^&+=!*]/.test(p) },
    ] as const;

    const isPasswordValid = passwordRules.every(r => r.test(next));
    const valid = current.length > 0 && isPasswordValid && next !== current;

    const handleSubmit = async () => {
        setSaving(true);
        setError(null);
        try {
            await accountService.changePassword({ currentPassword: current, newPassword: next });
            setDone(true);
            setTimeout(onClose, 1500);
        } catch (e) {
            setError(isApiError(e) ? e.message : t("genericError"));
        } finally {
            setSaving(false);
        }
    };

    if (done) {
        return (
            <div className="flex flex-col items-center gap-3 py-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <Check className="w-6 h-6 text-emerald-500" />
                </div>
                <p className="font-semibold text-sm text-emerald-600 dark:text-emerald-400">{t("passwordUpdated")}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 mt-4 border-t border-border pt-4">
            <div className="space-y-1.5">
                <Label className="text-xs">{t("currentPassword")}</Label>
                <div className="relative">
                    <Input
                        type={showCurr ? "text" : "password"}
                        value={current}
                        onChange={(e) => setCurrent(e.target.value)}
                        className="pr-10"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurr(!showCurr)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showCurr ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            <div className="space-y-1.5">
                <Label className="text-xs">{t("newPassword")}</Label>
                <div className="relative">
                    <Input
                        type={showNext ? "text" : "password"}
                        value={next}
                        onChange={(e) => setNext(e.target.value)}
                        className="pr-10"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNext(!showNext)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showNext ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {next.length > 0 && (
                    <ul className="space-y-1 pt-1">
                        {passwordRules.map(rule => {
                            const ok = rule.test(next);
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
                                    {t(`passwordRules.${rule.key}` as Parameters<typeof t>[0])}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex gap-2 justify-end">
                <Button variant="ghost" size="sm" onClick={onClose} disabled={saving}>{t("cancel")}</Button>
                <Button
                    size="sm"
                    onClick={handleSubmit}
                    disabled={!valid || saving}
                    className="gap-1.5 font-bold rounded-lg"
                >
                    {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    {t("confirm")}
                </Button>
            </div>
        </div>
    );
}

export function ProfileSecurity({ isOAuth = false, isLoading }: ProfileSecurityProps) {
    const t = useTranslations("Dashboard.Profile.Security");
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    if (isLoading) return <ProfileSecuritySkeleton />;

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Shield className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("title")}</h3>
            </div>

            <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex gap-4">
                        <div className="bg-blue-500/10 p-2.5 rounded-lg h-fit">
                            <KeyRound className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-base">{t("passwordTitle")}</p>
                            {isOAuth ? (
                                <p className="text-sm text-muted-foreground">{t("oauthDesc")}</p>
                            ) : (
                                <p className="text-sm text-muted-foreground">{t("passwordDesc")}</p>
                            )}
                        </div>
                    </div>
                    {!isOAuth && !showPasswordForm && (
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto font-bold rounded-xl border-input"
                            onClick={() => setShowPasswordForm(true)}
                        >
                            {t("passwordChange")}
                        </Button>
                    )}
                </div>
                {!isOAuth && showPasswordForm && (
                    <ChangePasswordForm onClose={() => setShowPasswordForm(false)} />
                )}
            </div>
        </section>
    );
}
