"use client";

import { Settings2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface AdvancedOptionsSectionProps {
    thankYouMessage: string;
    setThankYouMessage: (value: string) => void;
    expiresAt: string;
    setExpiresAt: (value: string) => void;
    collectCustomerInfo: boolean;
    setCollectCustomerInfo: (value: boolean) => void;
    expiresAtError?: string;
}

export function AdvancedOptionsSection({
    thankYouMessage,
    setThankYouMessage,
    expiresAt,
    setExpiresAt,
    collectCustomerInfo,
    setCollectCustomerInfo,
    expiresAtError,
}: AdvancedOptionsSectionProps) {
    const t = useTranslations('Dashboard.FundsCollection.New');
    // minimum = now (rounded to the minute) so the browser picker blocks past dates
    const minDateTime = new Date(Math.ceil(Date.now() / 60000) * 60000)
        .toISOString()
        .slice(0, 16);

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Settings2 className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("sectionOptions")}</h3>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                            <Label>{t("thankYouLabel")}</Label>
                            <InfoTooltip text={t("thankYouTooltip")} />
                        </div>
                        <Textarea
                            placeholder={t("thankYouPlaceholder")}
                            value={thankYouMessage}
                            onChange={(e) => setThankYouMessage(e.target.value)}
                            className="min-h-[80px] resize-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                            <Label>{t("expiresLabel")}</Label>
                            <InfoTooltip text={t("expiresTooltip")} />
                        </div>
                        <Input
                            type="datetime-local"
                            value={expiresAt}
                            min={minDateTime}
                            onChange={(e) => setExpiresAt(e.target.value)}
                            className={expiresAtError ? "border-destructive" : ""}
                        />
                        {expiresAtError && <p className="text-xs text-destructive">{expiresAtError}</p>}
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border/50">
                    <div className="flex items-center gap-1.5">
                        <Label htmlFor="collect" className="cursor-pointer font-medium text-sm">
                            {t("collectLabel")}
                        </Label>
                        <InfoTooltip text={t("collectTooltip")} />
                    </div>
                    <Checkbox
                        id="collect"
                        checked={collectCustomerInfo}
                        onCheckedChange={(v) => setCollectCustomerInfo(v === true)}
                    />
                </div>
            </div>
        </section>
    );
}
