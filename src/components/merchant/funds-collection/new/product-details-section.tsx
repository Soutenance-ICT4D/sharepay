"use client";

import { Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useApps } from "@/features/merchant/apps";

const TITLE_MAX = 50;
const DESC_MAX = 150;

interface ProductDetailsSectionProps {
    appId: string;
    setAppId: (value: string) => void;
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
}

export function ProductDetailsSection({
    appId,
    setAppId,
    title,
    setTitle,
    description,
    setDescription,
}: ProductDetailsSectionProps) {
    const t = useTranslations('Dashboard.FundsCollection.New');

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Link2 className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("sectionProduct")}</h3>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-4">
                <div className="space-y-2">
                    <Label>{t("appLabel")}</Label>
                    <Select value={appId || undefined} onValueChange={setAppId}>
                        <SelectTrigger>
                            <SelectValue placeholder={t("appNone")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="__empty__" disabled className="text-muted-foreground">
                                {t("appEmpty")}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <Label htmlFor="title">
                                {t("nameLabel")} <span className="text-primary">*</span>
                            </Label>
                            <InfoTooltip text={t("nameTooltip")} />
                        </div>
                        <span className={`text-xs tabular-nums ${title.length >= TITLE_MAX ? "text-destructive" : "text-muted-foreground"}`}>
                            {title.length}/{TITLE_MAX}
                        </span>
                    </div>
                    <Input
                        id="title"
                        placeholder={t("namePlaceholder")}
                        value={title}
                        onChange={(e) => setTitle(e.target.value.slice(0, TITLE_MAX))}
                        maxLength={TITLE_MAX}
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <Label htmlFor="desc">{t("descLabel")}</Label>
                            <InfoTooltip text={t("descTooltip")} />
                        </div>
                        <span className={`text-xs tabular-nums ${description.length >= DESC_MAX ? "text-destructive" : "text-muted-foreground"}`}>
                            {description.length}/{DESC_MAX}
                        </span>
                    </div>
                    <Textarea
                        id="desc"
                        placeholder={t("descPlaceholder")}
                        value={description}
                        onChange={(e) => setDescription(e.target.value.slice(0, DESC_MAX))}
                        maxLength={DESC_MAX}
                        className="min-h-[80px] resize-none"
                    />
                </div>
            </div>
        </section>
    );
}
