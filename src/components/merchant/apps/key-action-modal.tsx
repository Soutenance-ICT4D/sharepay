"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { KeyRound, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { type AppKeyEnvironment } from "@/features/merchant/apps/types";

interface KeyActionModalProps {
    mode: "create" | "rotate";
    currentEnvironment?: AppKeyEnvironment | null;
    isLoading?: boolean;
    onSubmit: (name: string, environment: AppKeyEnvironment) => void;
    onCancel: () => void;
}

export function KeyActionModal({ mode, currentEnvironment, isLoading, onSubmit, onCancel }: KeyActionModalProps) {
    const t = useTranslations("Dashboard.Apps.Form.APIKeys.Modal");
    const [name, setName] = useState("");
    const [environment, setEnvironment] = useState<AppKeyEnvironment>(currentEnvironment ?? "LIVE");

    const canSubmit = name.trim().length >= 2 && !isLoading;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        onSubmit(name.trim(), environment);
    };

    return (
        <Dialog open onOpenChange={(open) => { if (!open) onCancel(); }}>
            <DialogContent className="sm:max-w-[440px]">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
                            <KeyRound className="w-5 h-5" />
                        </div>
                        <div>
                            <DialogTitle>
                                {mode === "create" ? t("titleCreate") : t("titleRotate")}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                {mode === "create" ? t("subtitleCreate") : t("subtitleRotate")}
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                {mode === "rotate" && (
                    <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 px-4 py-3 text-amber-600 dark:text-amber-400">
                        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                        <p className="text-xs leading-relaxed">{t("rotateWarning")}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <div className="grid grid-cols-2 gap-3">
                            {(["LIVE", "TEST"] as AppKeyEnvironment[]).map((env) => {
                                const selected = environment === env;
                                return (
                                    <button
                                        key={env}
                                        type="button"
                                        disabled={isLoading}
                                        onClick={() => setEnvironment(env)}
                                        className={`rounded-xl border-2 px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                            selected
                                                ? env === "LIVE"
                                                    ? "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400"
                                                    : "border-amber-400 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                                                : "border-border bg-background text-muted-foreground hover:border-muted-foreground/40"
                                        }`}
                                    >
                                        <p className="font-bold text-sm">{env}</p>
                                        <p className="text-xs mt-0.5 opacity-70">{t(env === "LIVE" ? "envLiveDesc" : "envTestDesc")}</p>
                                    </button>
                                );
                            })}
                        </div>
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
            </DialogContent>
        </Dialog>
    );
}
