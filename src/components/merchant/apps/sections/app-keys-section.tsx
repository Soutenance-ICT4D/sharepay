"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Key, RefreshCw, Sparkles, Copy, CheckCircle2, Loader2, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { type AppKeyEnvironment } from "@/features/merchant/apps/types";

interface AppKeysSectionProps {
    keyPrefix: string | null;
    keyName: string | null;
    keyEnvironment: AppKeyEnvironment | null;
    isLoading?: boolean;
    onGenerateKey?: () => void;
    onRotateKey?: () => void;
    onRevokeKey?: () => void;
}

export function AppKeysSection({ keyPrefix, keyName, keyEnvironment, isLoading = false, onGenerateKey, onRotateKey, onRevokeKey }: AppKeysSectionProps) {
    const t = useTranslations("Dashboard.Apps.Form.APIKeys");
    const [copied, setCopied] = useState(false);
    const [showRevokeModal, setShowRevokeModal] = useState(false);

    const hasKey = !!keyPrefix;

    const handleCopy = () => {
        if (!keyPrefix) return;
        navigator.clipboard.writeText(keyPrefix).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            toast.success(t("copied"));
        });
    };

    const handleConfirmRevoke = () => {
        setShowRevokeModal(false);
        onRevokeKey?.();
    };

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Key className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("title")}</h3>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
                <p className="text-sm text-muted-foreground">{t("description")}</p>

                {hasKey ? (
                    <>
                        {/* Key display */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    {t("activeKey")}{keyName && <span className="normal-case ml-1.5 font-bold text-foreground">: {keyName}</span>}
                                </span>
                                {keyEnvironment && (
                                    <Badge
                                        variant={keyEnvironment === "LIVE" ? "default" : "secondary"}
                                        className={keyEnvironment === "LIVE"
                                            ? "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30"
                                            : "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30"
                                        }
                                    >
                                        {keyEnvironment}
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                                <code className="flex-1 font-mono text-sm text-foreground truncate">
                                    {keyPrefix}
                                    <span className="text-muted-foreground">••••••••••••••••••••</span>
                                </code>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 shrink-0"
                                    onClick={handleCopy}
                                    disabled={isLoading}
                                >
                                    {copied
                                        ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                        : <Copy className="w-3.5 h-3.5" />}
                                </Button>
                            </div>
                        </div>

                        {/* Rotate + Revoke */}
                        <div className="flex justify-end gap-4">
                            {isLoading ? (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    {t("rotateLoading")}
                                </div>
                            ) : (
                                <div className="flex gap-2 shrink-0">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                        onClick={onRotateKey}
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        {t("rotateButton")}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="gap-2 border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-400 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300"
                                        onClick={() => setShowRevokeModal(true)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        {t("revokeButton")}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    /* No key */
                    <div className="flex flex-col items-center justify-center py-8 rounded-xl border-2 border-dashed border-border bg-muted/5 text-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground">{t("noKey")}</p>
                            <p className="text-sm text-muted-foreground mt-0.5">{t("noKeyDesc")}</p>
                        </div>
                        <Button
                            type="button"
                            className="gap-2 font-bold"
                            onClick={onGenerateKey}
                            disabled={isLoading}
                        >
                            {isLoading
                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                : <Key className="w-4 h-4" />
                            }
                            {isLoading ? t("generating") : t("generateButton")}
                        </Button>
                    </div>
                )}
            </div>

            {/* Revoke confirmation modal */}
            <Dialog open={showRevokeModal} onOpenChange={(open) => { if (!open) setShowRevokeModal(false); }}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <div className="flex items-center gap-2 text-destructive mb-2">
                            <AlertTriangle className="h-5 w-5" />
                            <DialogTitle>{t("revokeModalTitle")}</DialogTitle>
                        </div>
                        <DialogDescription>{t("revokeModalDesc")}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button type="button" variant="ghost" onClick={() => setShowRevokeModal(false)}>
                            {t("revokeModalCancel")}
                        </Button>
                        <Button type="button" variant="destructive" className="gap-2" onClick={handleConfirmRevoke}>
                            <Trash2 className="h-4 w-4" />
                            {t("revokeModalConfirm")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}
