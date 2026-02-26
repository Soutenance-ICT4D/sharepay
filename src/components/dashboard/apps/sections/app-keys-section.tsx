"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Key, RefreshCw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface AppKeysSectionProps {
    publicKeyPrefix: string;   // ex: "pk_live_a1b2c3"
    secretKeyPrefix: string;   // ex: "sk_live_d4e5f6"
    onRegenerateKeys?: () => void;
}

export function AppKeysSection({ publicKeyPrefix, secretKeyPrefix, onRegenerateKeys }: AppKeysSectionProps) {
    const t = useTranslations("Dashboard.Apps.Form.APIKeys");
    const [isConfirmingRegen, setIsConfirmingRegen] = useState(false);

    const handleRegenClick = () => {
        if (!isConfirmingRegen) {
            setIsConfirmingRegen(true);
            return;
        }
        // Confirmed — trigger the actual regen
        onRegenerateKeys?.();
        setIsConfirmingRegen(false);
        toast.success(t("regenSuccess"));
    };

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Key className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("title")}</h3>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">

                {/* Keys display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* Public Key */}
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">{t("publicKey")}</Label>
                        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm">
                            <span className="text-foreground">{publicKeyPrefix}</span>
                            <span className="text-muted-foreground tracking-widest">••••••••••••</span>
                        </div>
                    </div>

                    {/* Secret Key */}
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">{t("secretKey")}</Label>
                        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm">
                            <span className="text-foreground">{secretKeyPrefix}</span>
                            <span className="text-muted-foreground tracking-widest">••••••••••••</span>
                        </div>
                    </div>

                </div>

                {/* Regen section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
                    <div className="space-y-0.5">
                        <p className="text-sm font-medium">{t("regenTitle")}</p>
                        <p className="text-xs text-muted-foreground">{t("regenDesc")}</p>
                    </div>

                    {isConfirmingRegen ? (
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-medium">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                {t("regenConfirmMessage")}
                            </div>
                            <Button type="button" variant="destructive" size="sm" onClick={handleRegenClick}>
                                {t("regenConfirm")}
                            </Button>
                            <Button type="button" variant="ghost" size="sm" onClick={() => setIsConfirmingRegen(false)}>
                                {t("regenCancel")}
                            </Button>
                        </div>
                    ) : (
                        <Button type="button" variant="outline" size="sm" className="shrink-0 gap-2" onClick={handleRegenClick}>
                            <RefreshCw className="w-4 h-4" />
                            {t("regenButton")}
                        </Button>
                    )}
                </div>

            </div>
        </section>
    );
}
