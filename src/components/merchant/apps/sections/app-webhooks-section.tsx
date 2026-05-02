"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Copy, CheckCircle2, RefreshCw, Webhook } from "lucide-react";

interface AppWebhooksSectionProps {
    webhookSecret: string;
    onGenerateNewSecret: () => void;
    // URL removed from props since it's handled in Configuration section
}

export function AppWebhooksSection({
    webhookSecret,
    onGenerateNewSecret
}: AppWebhooksSectionProps) {
    const t = useTranslations("Dashboard.Apps.Form.Webhooks");
    const [showSecret, setShowSecret] = useState(false);
    const [copiedSec, setCopiedSec] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(webhookSecret);
        setCopiedSec(true);
        setTimeout(() => setCopiedSec(false), 2000);
    };

    return (
        <section>
            <div className="flex items-center gap-2 mb-6">
                <Webhook className="text-primary w-6 h-6" />
                <h3 className="text-lg font-bold">{t("title")}</h3>
            </div>

            <div className="grid gap-6 bg-card p-6 rounded-xl border border-border shadow-sm">

                {/* Webhook Secret */}
                <div className="space-y-4">
                    <Label>{t("secretLabel")}</Label>
                    <div className="flex gap-2">
                        <Input
                            value={webhookSecret}
                            type={showSecret ? "text" : "password"}
                            readOnly
                            className="font-mono text-sm bg-background"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setShowSecret(!showSecret)}
                        >
                            {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            onClick={handleCopy}
                        >
                            {copiedSec ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={onGenerateNewSecret}
                >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {t("generateNew")}
                </Button>

            </div>
        </section>
    );
}
