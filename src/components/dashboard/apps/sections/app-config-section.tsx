"use client";

import { useTranslations } from "next-intl";
import { Settings, FlaskConical, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AppConfigSectionProps {
    status: string;
    setStatus: (val: string) => void;
    webhookUrl: string;
    setWebhookUrl: (val: string) => void;
    fallbackUrl?: string;
    setFallbackUrl?: (val: string) => void;
    readOnly?: boolean;   // when true, env cannot be changed
}

export function AppConfigSection({
    status,
    setStatus,
    webhookUrl,
    setWebhookUrl,
    fallbackUrl = "",
    setFallbackUrl,
    readOnly = false,
}: AppConfigSectionProps) {
    const t = useTranslations("Dashboard.Apps.Form.Configuration");

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Settings className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("title")}</h3>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">

                {/* ── Environment selector ─────────────────────────────── */}
                <div className="space-y-3">
                    <Label>
                        {t("environmentLabel")} <span className="text-primary">*</span>
                    </Label>
                    <div className="grid grid-cols-2 gap-3">

                        {/* SANDBOX */}
                        <button
                            type="button"
                            onClick={() => !readOnly && setStatus("SANDBOX")}
                            disabled={readOnly}
                            className={cn(
                                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-200",
                                readOnly ? "cursor-default" : "hover:border-primary/60",
                                status === "SANDBOX"
                                    ? "border-primary bg-primary/5"
                                    : "border-border bg-background opacity-60"
                            )}
                        >
                            <div className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                                status === "SANDBOX" ? "bg-amber-500/15 text-amber-500" : "bg-muted text-muted-foreground"
                            )}>
                                <FlaskConical className="w-5 h-5" />
                            </div>
                            <div>
                                <p className={cn("font-bold text-sm tracking-wide", status === "SANDBOX" ? "text-foreground" : "text-muted-foreground")}>
                                    SANDBOX
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">{t("envTestDesc")}</p>
                            </div>
                            {status === "SANDBOX" && (
                                <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">
                                    Actif
                                </span>
                            )}
                        </button>

                        {/* PRODUCTION */}
                        <button
                            type="button"
                            onClick={() => !readOnly && setStatus("PRODUCTION")}
                            disabled={readOnly}
                            className={cn(
                                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-200",
                                readOnly ? "cursor-default" : "hover:border-primary/60",
                                status === "PRODUCTION"
                                    ? "border-primary bg-primary/5"
                                    : "border-border bg-background opacity-60"
                            )}
                        >
                            <div className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                                status === "PRODUCTION" ? "bg-green-500/15 text-green-500" : "bg-muted text-muted-foreground"
                            )}>
                                <Zap className="w-5 h-5" />
                            </div>
                            <div>
                                <p className={cn("font-bold text-sm tracking-wide", status === "PRODUCTION" ? "text-foreground" : "text-muted-foreground")}>
                                    PRODUCTION
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">{t("envLiveDesc")}</p>
                            </div>
                            {status === "PRODUCTION" && (
                                <span className="text-[10px] font-semibold bg-green-500/20 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">
                                    Actif
                                </span>
                            )}
                        </button>

                    </div>
                </div>

                {/* ── Webhook URL ──────────────────────────────────────── */}
                <div className="space-y-2">
                    <Label htmlFor="appWebhookUrl">{t("webhookUrlLabel")}</Label>
                    <Input
                        id="appWebhookUrl"
                        placeholder={t("webhookUrlPlaceholder")}
                        type="url"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        className="bg-background"
                    />
                    <p className="text-xs text-muted-foreground">{t("webhookUrlDesc")}</p>
                </div>

                {/* ── Fallback URL ─────────────────────────────────────── */}
                <div className="space-y-2">
                    <Label htmlFor="appFallbackUrl">{t("fallbackUrlLabel")}</Label>
                    <Input
                        id="appFallbackUrl"
                        placeholder={t("fallbackUrlPlaceholder")}
                        type="url"
                        value={fallbackUrl}
                        onChange={(e) => setFallbackUrl?.(e.target.value)}
                        className="bg-background"
                    />
                    <p className="text-xs text-muted-foreground">{t("fallbackUrlDesc")}</p>
                </div>

            </div>
        </section>
    );
}
