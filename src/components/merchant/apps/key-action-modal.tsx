"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { KeyRound, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type AppKeyEnvironment } from "@/features/merchant/apps/types";

interface KeyActionModalProps {
    mode: "create" | "rotate";
    isLoading?: boolean;
    onSubmit: (name: string, environment: AppKeyEnvironment) => void;
    onCancel: () => void;
}

export function KeyActionModal({ mode, isLoading, onSubmit, onCancel }: KeyActionModalProps) {
    const t = useTranslations("Dashboard.Apps.Form.APIKeys.Modal");
    const [name, setName] = useState("");
    const [environment, setEnvironment] = useState<AppKeyEnvironment>("LIVE");

    const canSubmit = name.trim().length >= 2 && !isLoading;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit(name.trim(), environment);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div
                className="relative w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center gap-3 p-6 pb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
                        <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">
                            {mode === "create" ? t("titleCreate") : t("titleRotate")}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {mode === "create" ? t("subtitleCreate") : t("subtitleRotate")}
                        </p>
                    </div>
                </div>

                {/* Rotation warning */}
                {mode === "rotate" && (
                    <div className="mx-6 flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 px-4 py-3 text-amber-600 dark:text-amber-400">
                        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                        <p className="text-xs leading-relaxed">{t("rotateWarning")}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="key-name">{t("keyNameLabel")}</Label>
                        <Input
                            id="key-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t("keyNamePlaceholder")}
                            maxLength={100}
                            autoFocus
                            disabled={isLoading}
                        />
                        <p className="text-xs text-muted-foreground text-right">{name.length}/100</p>
                    </div>

                    <div className="space-y-1.5">
                        <Label>{t("environmentLabel")}</Label>
                        <Select
                            value={environment}
                            onValueChange={(v) => setEnvironment(v as AppKeyEnvironment)}
                            disabled={isLoading}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="LIVE">{t("envLive")}</SelectItem>
                                <SelectItem value="TEST">{t("envTest")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            className="flex-1"
                            onClick={onCancel}
                            disabled={isLoading}
                        >
                            {t("cancel")}
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 gap-2"
                            disabled={!canSubmit}
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {mode === "create" ? t("submitCreate") : t("submitRotate")}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
