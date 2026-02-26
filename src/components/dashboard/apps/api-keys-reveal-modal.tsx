"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Copy, Download, CheckCircle2, ShieldAlert, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ApiKeysRevealModalProps {
    publicKey: string;
    secretKey: string;
    onConfirm: () => void; // called when user confirms they saved the keys
}

export function ApiKeysRevealModal({ publicKey, secretKey, onConfirm }: ApiKeysRevealModalProps) {
    const t = useTranslations("Dashboard.Apps.Form.KeysModal");
    const [copiedPub, setCopiedPub] = useState(false);
    const [copiedSec, setCopiedSec] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const copy = (text: string, type: "pub" | "sec") => {
        navigator.clipboard.writeText(text).then(() => {
            if (type === "pub") {
                setCopiedPub(true);
                setTimeout(() => setCopiedPub(false), 2000);
            } else {
                setCopiedSec(true);
                setTimeout(() => setCopiedSec(false), 2000);
            }
            toast.success(t("copied"));
        });
    };

    const downloadKeys = () => {
        const content = `SharePay API Keys\n=================\n\nPublic Key:\n${publicKey}\n\nSecret Key:\n${secretKey}\n\n⚠️  Keep your secret key safe. Never share it or commit it to version control.`;
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "sharepay-api-keys.txt";
        a.click();
        URL.revokeObjectURL(url);
        toast.success(t("downloaded"));
    };

    const handleConfirm = () => {
        if (!confirmed) {
            setConfirmed(true);
            return;
        }
        onConfirm();
    };

    return (
        // Backdrop — not dismissable on click
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div
                className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center gap-3 p-6 pb-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary shrink-0">
                        <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">{t("title")}</h2>
                        <p className="text-sm text-muted-foreground">{t("appCreated")}</p>
                    </div>
                </div>

                {/* Warning banner */}
                <div className="mx-6 mt-4 flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 px-4 py-3 text-amber-600 dark:text-amber-400">
                    <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
                    <p className="text-xs leading-relaxed">{t("warning")}</p>
                </div>

                {/* Keys */}
                <div className="p-6 space-y-4">

                    {/* Public Key */}
                    <div className="space-y-1.5">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("publicKey")}</p>
                        <div className="flex items-center gap-2">
                            <code className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-mono truncate">
                                {publicKey}
                            </code>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="shrink-0"
                                onClick={() => copy(publicKey, "pub")}
                                title={t("copy")}
                            >
                                {copiedPub
                                    ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>

                    {/* Secret Key */}
                    <div className="space-y-1.5">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("secretKey")}</p>
                        <div className="flex items-center gap-2">
                            <code className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-mono truncate">
                                {secretKey}
                            </code>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="shrink-0"
                                onClick={() => copy(secretKey, "sec")}
                                title={t("copy")}
                            >
                                {copiedSec
                                    ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>

                    {/* Download */}
                    <Button type="button" variant="outline" className="w-full gap-2" onClick={downloadKeys}>
                        <Download className="w-4 h-4" />
                        {t("download")}
                    </Button>
                </div>

                {/* Confirm footer */}
                <div className="px-6 pb-6 space-y-3">
                    {confirmed && (
                        <p className="text-xs text-center text-muted-foreground">{t("confirmOnce")}</p>
                    )}
                    <Button
                        type="button"
                        className={`w-full h-12 font-bold text-sm ${confirmed ? "bg-green-600 hover:bg-green-700" : ""}`}
                        onClick={handleConfirm}
                    >
                        {confirmed ? t("confirmFinal") : t("confirmSaved")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
