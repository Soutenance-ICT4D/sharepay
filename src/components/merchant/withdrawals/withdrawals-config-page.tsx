"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, Zap, AlarmClockCheck, BarChart3, Hand } from "lucide-react";
import { toast } from "sonner";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type WithdrawalConfigType = "manual" | "instant" | "threshold" | "periodic";

interface ConfigOption {
    id: WithdrawalConfigType;
    icon: React.ReactNode;
    recommended?: boolean;
}

const OPTIONS: ConfigOption[] = [
    { id: "manual", icon: <Hand className="h-5 w-5" />, recommended: true },
    { id: "instant", icon: <Zap className="h-5 w-5" /> },
    { id: "threshold", icon: <BarChart3 className="h-5 w-5" /> },
    { id: "periodic", icon: <AlarmClockCheck className="h-5 w-5" /> },
];

export function WithdrawalsConfigPage() {
    const t = useTranslations("Dashboard.Withdrawals");

    const [selected, setSelected] = useState<WithdrawalConfigType>("manual");
    const [threshold, setThreshold] = useState("");
    const [period, setPeriod] = useState("monthly");

    const handleSave = () => {
        toast.success(t("ConfigPage.saved"));
    };

    return (
        <div className="space-y-8">
            {/* Page Heading */}
            <div className="min-w-0">
                <div className="flex items-center gap-3 mb-4">
                    <Link href="/merchant/withdrawals">
                        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground -ml-2">
                            <ArrowLeft className="h-4 w-4" />
                            {t("ConfigPage.back")}
                        </Button>
                    </Link>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground truncate">
                    {t("ConfigPage.title")}
                </h2>
                <p className="text-sm text-muted-foreground font-medium mt-1 truncate">
                    {t("ConfigPage.subtitle")}
                </p>
            </div>

            {/* Config cards */}
            <div className="grid grid-cols-1 gap-4 max-w-2xl">
                {OPTIONS.map((opt) => {
                    const isSelected = selected === opt.id;
                    return (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelected(opt.id)}
                            className={cn(
                                "w-full text-left rounded-xl border-2 p-5 transition-all",
                                isSelected
                                    ? "border-primary bg-primary/5 shadow-sm"
                                    : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
                            )}
                        >
                            <div className="flex items-start gap-4">
                                <div className={cn(
                                    "p-2 rounded-lg shrink-0 mt-0.5",
                                    isSelected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                                )}>
                                    {opt.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={cn(
                                            "font-semibold text-sm sm:text-base",
                                            isSelected ? "text-primary" : "text-foreground"
                                        )}>
                                            {t(`ConfigModal.types.${opt.id}`)}
                                        </span>
                                        {opt.recommended && (
                                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                {t("ConfigPage.recommended")}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                                        {t(`ConfigModal.descriptions.${opt.id}`)}
                                    </p>

                                    {/* Conditional fields */}
                                    {isSelected && opt.id === "threshold" && (
                                        <div className="mt-4 space-y-3">
                                            <div>
                                                <Label className="text-sm font-medium mb-1.5 block">
                                                    {t("ConfigModal.fields.thresholdAmount")}
                                                </Label>
                                                <div className="relative max-w-xs">
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        placeholder={t("ConfigModal.fields.thresholdAmountPlaceholder")}
                                                        value={threshold}
                                                        onChange={(e) => setThreshold(e.target.value)}
                                                        className="h-11 pr-16"
                                                    />
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                                                        FCFA
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {isSelected && opt.id === "periodic" && (
                                        <div className="mt-4 max-w-xs">
                                            <Label className="text-sm font-medium mb-1.5 block">
                                                {t("ConfigModal.fields.period")}
                                            </Label>
                                            <Select value={period} onValueChange={setPeriod}>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="daily">{t("ConfigModal.fields.daily")}</SelectItem>
                                                    <SelectItem value="weekly">{t("ConfigModal.fields.weekly")}</SelectItem>
                                                    <SelectItem value="monthly">{t("ConfigModal.fields.monthly")}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Save */}
            <div className="max-w-2xl">
                <Button
                    size="lg"
                    className="h-12 px-8 text-base font-semibold rounded-xl shadow-md"
                    onClick={handleSave}
                >
                    {t("ConfigModal.fields.save")}
                </Button>
            </div>
        </div>
    );
}
