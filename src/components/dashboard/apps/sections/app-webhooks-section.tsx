"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Copy, CheckCircle2, RefreshCw } from "lucide-react";

interface AppWebhooksSectionProps {
    webhookUrl: string;
    setWebhookUrl: (val: string) => void;
    webhookSecret: string;
    onGenerateNewSecret: () => void;
}

export function AppWebhooksSection({
    webhookUrl,
    setWebhookUrl,
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
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold">{t("title")}</h3>
                <p className="text-sm text-muted-foreground">{t("description")}</p>
            </div>

            <div className="grid gap-5">
                {/* Webhook URL */}
                <div className="space-y-2">
                    <Label htmlFor="webhookUrl">{t("urlLabel")}</Label>
                    <Input
                        id="webhookUrl"
                        placeholder={t("urlPlaceholder")}
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                    />
                </div>

                {/* Webhook Secret */}
                <div className="space-y-2">
                    <Label>{t("secretLabel")}</Label>
                    <div className="flex gap-2">
                        <Input
                            value={webhookSecret}
                            type={showSecret ? "text" : "password"}
                            readOnly
                            className="font-mono text-sm"
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
                    className="w-full sm:w-auto mt-2"
                    onClick={onGenerateNewSecret}
                >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {t("generateNew")}
                </Button>
            </div>
        </div>
    );
}
