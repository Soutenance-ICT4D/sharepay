"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Copy, CheckCircle2 } from "lucide-react";

interface AppKeysSectionProps {
    publicKey: string;
    secretKey: string;
}

export function AppKeysSection({ publicKey, secretKey }: AppKeysSectionProps) {
    const t = useTranslations("Dashboard.Apps.Form.APIKeys");
    const [showSecret, setShowSecret] = useState(false);
    const [copiedPub, setCopiedPub] = useState(false);
    const [copiedSec, setCopiedSec] = useState(false);

    const handleCopy = (text: string, type: 'public' | 'secret') => {
        navigator.clipboard.writeText(text);
        if (type === 'public') {
            setCopiedPub(true);
            setTimeout(() => setCopiedPub(false), 2000);
        } else {
            setCopiedSec(true);
            setTimeout(() => setCopiedSec(false), 2000);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold">{t("title")}</h3>
                <p className="text-sm text-muted-foreground">{t("description")}</p>
            </div>

            <div className="grid gap-5">
                {/* Public Key */}
                <div className="space-y-2">
                    <Label>{t("publicKey")}</Label>
                    <div className="flex gap-2">
                        <Input value={publicKey} readOnly className="font-mono text-sm" />
                        <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            onClick={() => handleCopy(publicKey, 'public')}
                        >
                            {copiedPub ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                {/* Secret Key */}
                <div className="space-y-2">
                    <Label>{t("secretKey")}</Label>
                    <div className="flex gap-2">
                        <Input
                            value={secretKey}
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
                            onClick={() => handleCopy(secretKey, 'secret')}
                        >
                            {copiedSec ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
