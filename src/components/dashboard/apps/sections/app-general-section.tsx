"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AppGeneralSectionProps {
    name: string;
    setName: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
}

export function AppGeneralSection({
    name,
    setName,
    description,
    setDescription,
}: AppGeneralSectionProps) {
    const t = useTranslations("Dashboard.Apps.Form.General");

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold">{t("title")}</h3>
                <p className="text-sm text-muted-foreground">{t("description")}</p>
            </div>

            <div className="grid gap-4">
                <div className="space-y-2">
                    <Label htmlFor="appName">{t("nameLabel")}</Label>
                    <Input
                        id="appName"
                        placeholder={t("namePlaceholder")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="appDescription">{t("descLabel")}</Label>
                    <Textarea
                        id="appDescription"
                        placeholder={t("descPlaceholder")}
                        className="resize-none h-24"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
