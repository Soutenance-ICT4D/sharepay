"use client";

import { useTranslations } from "next-intl";
import { AppWindow } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AppGeneralSectionProps {
    name: string;
    setName: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
    siteUrl: string;
    setSiteUrl: (val: string) => void;
}

export function AppGeneralSection({
    name,
    setName,
    description,
    setDescription,
    siteUrl,
    setSiteUrl,
}: AppGeneralSectionProps) {
    const t = useTranslations("Dashboard.Apps.Form.General");

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <AppWindow className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("title")}</h3>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="appName">
                        {t("nameLabel")} <span className="text-primary">*</span>
                    </Label>
                    <Input
                        id="appName"
                        placeholder={t("namePlaceholder")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-background focus:ring-primary"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="appDescription">
                        {t("descLabel")} <span className="text-primary">*</span>
                    </Label>
                    <textarea
                        id="appDescription"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={t("descPlaceholder")}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="appSiteUrl">{t("siteUrlLabel")}</Label>
                    <Input
                        id="appSiteUrl"
                        placeholder={t("siteUrlPlaceholder")}
                        type="url"
                        value={siteUrl}
                        onChange={(e) => setSiteUrl(e.target.value)}
                        className="bg-background focus:ring-primary"
                    />
                </div>
            </div>
        </section>
    );
}
