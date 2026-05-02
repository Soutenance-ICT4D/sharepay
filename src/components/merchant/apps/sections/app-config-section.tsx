"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoTooltip } from "@/components/ui/info-tooltip";

function isValidUrl(url: string): boolean {
    try {
        const u = new URL(url);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch {
        return false;
    }
}

interface AppConfigSectionProps {
    webhookUrl: string;
    setWebhookUrl: (val: string) => void;
    successUrl: string;
    setSuccessUrl: (val: string) => void;
    cancelUrl: string;
    setCancelUrl: (val: string) => void;
    forceShowErrors?: boolean;
}

export function AppConfigSection({
    webhookUrl,
    setWebhookUrl,
    successUrl,
    setSuccessUrl,
    cancelUrl,
    setCancelUrl,
    forceShowErrors,
}: AppConfigSectionProps) {
    const t = useTranslations("Dashboard.Apps.Form.Configuration");
    const [webhookTouched, setWebhookTouched] = useState(false);
    const [successTouched, setSuccessTouched] = useState(false);
    const [cancelTouched, setCancelTouched] = useState(false);

    const webhookError = (webhookTouched || forceShowErrors) && webhookUrl.trim() !== "" && !isValidUrl(webhookUrl.trim());
    const successError = (successTouched || forceShowErrors) && successUrl.trim() !== "" && !isValidUrl(successUrl.trim());
    const cancelError = (cancelTouched || forceShowErrors) && cancelUrl.trim() !== "" && !isValidUrl(cancelUrl.trim());

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Settings className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("title")}</h3>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                            <Label htmlFor="appWebhookUrl">{t("webhookUrlLabel")}</Label>
                            <InfoTooltip text={t("webhookUrlDesc")} />
                        </div>
                        <Input
                            id="appWebhookUrl"
                            placeholder={t("webhookUrlPlaceholder")}
                            value={webhookUrl}
                            onChange={(e) => setWebhookUrl(e.target.value)}
                            onBlur={() => setWebhookTouched(true)}
                            className={`bg-background ${webhookError ? "border-destructive" : ""}`}
                        />
                        {webhookError && (
                            <p className="text-xs text-destructive">{t("urlInvalid")}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                            <Label htmlFor="appSuccessUrl">{t("successUrlLabel")}</Label>
                            <InfoTooltip text={t("successUrlDesc")} />
                        </div>
                        <Input
                            id="appSuccessUrl"
                            placeholder={t("successUrlPlaceholder")}
                            value={successUrl}
                            onChange={(e) => setSuccessUrl(e.target.value)}
                            onBlur={() => setSuccessTouched(true)}
                            className={`bg-background ${successError ? "border-destructive" : ""}`}
                        />
                        {successError && (
                            <p className="text-xs text-destructive">{t("urlInvalid")}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                            <Label htmlFor="appCancelUrl">{t("cancelUrlLabel")}</Label>
                            <InfoTooltip text={t("cancelUrlDesc")} />
                        </div>
                        <Input
                            id="appCancelUrl"
                            placeholder={t("cancelUrlPlaceholder")}
                            value={cancelUrl}
                            onChange={(e) => setCancelUrl(e.target.value)}
                            onBlur={() => setCancelTouched(true)}
                            className={`bg-background ${cancelError ? "border-destructive" : ""}`}
                        />
                        {cancelError && (
                            <p className="text-xs text-destructive">{t("urlInvalid")}</p>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
